import fs from "fs";
import path from "path";
import { execSync } from "child_process";

interface AuditResult {
  check: string;
  status: "PASS" | "WARN" | "FAIL";
  message: string;
}

const results: AuditResult[] = [];

function addResult(check: string, status: AuditResult["status"], message: string) {
  results.push({ check, status, message });
  const icon = status === "PASS" ? "✅" : status === "WARN" ? "⚠️" : "❌";
  console.log(`${icon} [${status}] ${check}: ${message}`);
}

function checkWriteToken() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    addResult(
      "SANITY_WRITE_TOKEN",
      "WARN",
      "SANITY_WRITE_TOKEN is not set. Backup/restore scripts will not work."
    );
  } else {
    addResult(
      "SANITY_WRITE_TOKEN",
      "PASS",
      "SANITY_WRITE_TOKEN is set as a server-side env variable."
    );
  }

  // Check it's not exposed client-side
  const envFiles = [".env", ".env.local", ".env.production", ".env.development"];
  for (const envFile of envFiles) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      if (content.includes("NEXT_PUBLIC_SANITY_WRITE_TOKEN") || content.includes("NEXT_PUBLIC_SANITY_TOKEN")) {
        addResult(
          "Client-Side Token Exposure",
          "FAIL",
          `${envFile} exposes a write token with NEXT_PUBLIC_ prefix! This is a critical security vulnerability.`
        );
      }
    }
  }

  addResult(
    "Client-Side Token Exposure",
    "PASS",
    "No SANITY_WRITE_TOKEN found with NEXT_PUBLIC_ prefix."
  );
}

function checkGitignore() {
  const gitignorePath = path.join(process.cwd(), ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    addResult("Gitignore", "FAIL", ".gitignore file not found.");
    return;
  }

  const content = fs.readFileSync(gitignorePath, "utf-8");
  const lines = content.split("\n").map((l) => l.trim());

  // Check .env files are ignored
  const envIgnored = lines.some(
    (l) => l === ".env" || l === ".env*" || l === ".env.local"
  );
  if (envIgnored) {
    addResult("Env Files Gitignored", "PASS", ".env files are properly gitignored.");
  } else {
    addResult(
      "Env Files Gitignored",
      "FAIL",
      ".env files are NOT gitignored. Tokens may be committed to git!"
    );
  }

  // Check backups/ is ignored
  const backupsIgnored = lines.some(
    (l) => l === "backups/" || l === "backups" || l === "/backups"
  );
  if (backupsIgnored) {
    addResult("Backups Gitignored", "PASS", "backups/ directory is gitignored.");
  } else {
    addResult(
      "Backups Gitignored",
      "WARN",
      "backups/ directory is NOT gitignored. Backup data may be committed."
    );
  }
}

function checkForCommittedTokens() {
  try {
    const gitLog = execSync(
      'git log --all -p --diff-filter=A -- "*.env" "*.env.local" "*.env.production" 2>/dev/null || true',
      { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 }
    );

    if (gitLog.includes("SANITY_WRITE_TOKEN") || gitLog.includes("SANITY_TOKEN")) {
      addResult(
        "Tokens in Git History",
        "FAIL",
        "Potential Sanity tokens found in git history! Consider rotating tokens and cleaning git history."
      );
    } else {
      addResult(
        "Tokens in Git History",
        "PASS",
        "No Sanity tokens found in git history."
      );
    }
  } catch {
    addResult(
      "Tokens in Git History",
      "WARN",
      "Could not check git history (not a git repo or git not available)."
    );
  }

  // Check source files for hardcoded tokens
  const srcDirs = ["src", "app", "pages", "lib", "components", "scripts"];
  let hardcodedTokenFound = false;

  for (const dir of srcDirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = getAllFiles(dirPath);
    for (const file of files) {
      if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")) {
        const content = fs.readFileSync(file, "utf-8");
        // Look for patterns like token: "sk..." or hardcoded Sanity tokens
        if (/token\s*[:=]\s*["']sk[a-zA-Z0-9]+["']/.test(content)) {
          addResult(
            "Hardcoded Tokens",
            "FAIL",
            `Potential hardcoded token found in ${path.relative(process.cwd(), file)}`
          );
          hardcodedTokenFound = true;
        }
      }
    }
  }

  if (!hardcodedTokenFound) {
    addResult("Hardcoded Tokens", "PASS", "No hardcoded Sanity tokens found in source files.");
  }
}

function checkCSPHeaders() {
  const middlewarePath = path.join(process.cwd(), "middleware.ts");
  const middlewareJsPath = path.join(process.cwd(), "middleware.js");

  if (fs.existsSync(middlewarePath) || fs.existsSync(middlewareJsPath)) {
    const filePath = fs.existsSync(middlewarePath) ? middlewarePath : middlewareJsPath;
    const content = fs.readFileSync(filePath, "utf-8");

    if (content.includes("Content-Security-Policy")) {
      addResult("CSP Headers", "PASS", "Content-Security-Policy header found in middleware.");
    } else {
      addResult(
        "CSP Headers",
        "WARN",
        "Middleware exists but no Content-Security-Policy header found."
      );
    }

    if (content.includes("X-Frame-Options")) {
      addResult("X-Frame-Options", "PASS", "X-Frame-Options header found in middleware.");
    } else {
      addResult("X-Frame-Options", "WARN", "X-Frame-Options header not found in middleware.");
    }

    if (content.includes("X-Content-Type-Options")) {
      addResult(
        "X-Content-Type-Options",
        "PASS",
        "X-Content-Type-Options header found in middleware."
      );
    } else {
      addResult(
        "X-Content-Type-Options",
        "WARN",
        "X-Content-Type-Options header not found in middleware."
      );
    }
  } else {
    addResult(
      "Security Middleware",
      "FAIL",
      "No middleware.ts or middleware.js found. Security headers are not being set."
    );
  }
}

function checkDatasetVisibility() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!projectId) {
    addResult("Dataset Visibility", "WARN", "Cannot check — NEXT_PUBLIC_SANITY_PROJECT_ID not set.");
    return;
  }

  // Check if dataset is "production" (the default)
  if (dataset === "production") {
    addResult(
      "Dataset Visibility",
      "WARN",
      `Using default "production" dataset. Consider creating a separate dataset for development/staging.`
    );
  } else {
    addResult(
      "Dataset Visibility",
      "PASS",
      `Using non-default dataset: "${dataset}".`
    );
  }

  // Note: Checking actual visibility requires an authenticated API call
  addResult(
    "Dataset Public Access",
    "WARN",
    `Verify dataset "${dataset}" visibility in Sanity management console (manage.sanity.io). Set to "private" if content should not be publicly readable.`
  );
}

function checkNextConfig() {
  const configPath = path.join(process.cwd(), "next.config.mjs");
  const configJsPath = path.join(process.cwd(), "next.config.js");

  const filePath = fs.existsSync(configPath) ? configPath : fs.existsSync(configJsPath) ? configJsPath : null;

  if (!filePath) {
    addResult("Next.js Config", "WARN", "No next.config.mjs or next.config.js found.");
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");

  if (content.includes("headers")) {
    addResult("Security Headers in Config", "PASS", "Security headers configuration found in next.config.");
  } else {
    addResult(
      "Security Headers in Config",
      "WARN",
      "No security headers found in next.config. Consider adding them as a fallback."
    );
  }
}

function getAllFiles(dirPath: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      getAllFiles(fullPath, files);
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

async function runAudit() {
  console.log("🔒 Sanity CMS Security Audit");
  console.log("=".repeat(50));
  console.log("");

  checkWriteToken();
  console.log("");

  checkGitignore();
  console.log("");

  checkForCommittedTokens();
  console.log("");

  checkCSPHeaders();
  console.log("");

  checkDatasetVisibility();
  console.log("");

  checkNextConfig();

  // Final report
  console.log("");
  console.log("=".repeat(50));
  console.log("📋 SECURITY AUDIT REPORT");
  console.log("=".repeat(50));

  const passed = results.filter((r) => r.status === "PASS").length;
  const warnings = results.filter((r) => r.status === "WARN").length;
  const failed = results.filter((r) => r.status === "FAIL").length;

  console.log(`\n   ✅ Passed:   ${passed}`);
  console.log(`   ⚠️  Warnings: ${warnings}`);
  console.log(`   ❌ Failed:   ${failed}`);
  console.log(`   📊 Total:    ${results.length}`);

  if (failed > 0) {
    console.log("\n🚨 CRITICAL ISSUES FOUND:");
    results
      .filter((r) => r.status === "FAIL")
      .forEach((r) => console.log(`   ❌ ${r.check}: ${r.message}`));
  }

  if (warnings > 0) {
    console.log("\n⚠️  WARNINGS:");
    results
      .filter((r) => r.status === "WARN")
      .forEach((r) => console.log(`   ⚠️  ${r.check}: ${r.message}`));
  }

  console.log("");

  if (failed > 0) {
    console.log("❌ Audit completed with failures. Please address critical issues above.");
    process.exit(1);
  } else if (warnings > 0) {
    console.log("⚠️  Audit completed with warnings. Review and address if possible.");
  } else {
    console.log("✅ All security checks passed!");
  }
}

runAudit().catch((err) => {
  console.error("❌ Audit failed:", err);
  process.exit(1);
});
