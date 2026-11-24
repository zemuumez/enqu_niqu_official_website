import fs from "fs";
import path from "path";
import readline from "readline";

interface BackupData {
  exportedAt: string;
  projectId: string;
  dataset: string;
  documentCount: number;
  documents: any[];
}

function parseArgs() {
  const args = process.argv.slice(2);
  const flags = {
    filePath: "",
    dryRun: false,
    force: false,
  };

  for (const arg of args) {
    if (arg === "--dry-run") {
      flags.dryRun = true;
    } else if (arg === "--force") {
      flags.force = true;
    } else if (!arg.startsWith("--")) {
      flags.filePath = arg;
    }
  }

  return flags;
}

async function confirm(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

async function restore() {
  const { filePath, dryRun, force } = parseArgs();

  if (!filePath) {
    console.error("❌ Usage: npm run sanity:restore -- <backup-file.json> [--dry-run] [--force]");
    console.error("");
    console.error("Options:");
    console.error("  --dry-run   Show what would be restored without making changes");
    console.error("  --force     Skip confirmation prompt");
    console.error("");
    console.error("Example:");
    console.error("  npm run sanity:restore -- backups/backup-2024-03-11T12-00-00.json");
    console.error("  npm run sanity:restore -- backups/backup-2024-03-11T12-00-00.json --dry-run");
    process.exit(1);
  }

  // Resolve file path
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Backup file not found: ${resolvedPath}`);
    process.exit(1);
  }

  // Read backup file
  console.log(`📂 Reading backup file: ${resolvedPath}`);
  const fileContent = fs.readFileSync(resolvedPath, "utf-8");
  let backupData: BackupData;

  try {
    backupData = JSON.parse(fileContent);
  } catch {
    console.error("❌ Failed to parse backup file. Ensure it is valid JSON.");
    process.exit(1);
  }

  if (!backupData.documents || !Array.isArray(backupData.documents)) {
    console.error("❌ Invalid backup file format. Missing 'documents' array.");
    process.exit(1);
  }

  // Environment variables
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-11";

  if (!projectId || !token) {
    console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN");
    console.error("Set them in .env.local or pass them as environment variables.");
    process.exit(1);
  }

  // Summary
  const typeCounts: Record<string, number> = {};
  backupData.documents.forEach((doc: any) => {
    typeCounts[doc._type] = (typeCounts[doc._type] || 0) + 1;
  });

  console.log("\n📊 Restore Summary:");
  console.log(`   Backup created: ${backupData.exportedAt}`);
  console.log(`   Source project: ${backupData.projectId}`);
  console.log(`   Source dataset: ${backupData.dataset}`);
  console.log(`   Target project: ${projectId}`);
  console.log(`   Target dataset: ${dataset}`);
  console.log(`   Total documents: ${backupData.documentCount}`);
  console.log("\n   Documents by type:");
  Object.entries(typeCounts).forEach(([type, count]) =>
    console.log(`     ${type}: ${count}`)
  );

  if (dryRun) {
    console.log("\n🔍 DRY RUN — No changes will be made.");
    console.log("\nDocuments that would be restored:");
    backupData.documents.forEach((doc: any) => {
      console.log(`  [${doc._type}] ${doc._id} — ${doc.title || doc.name || "(no title)"}`);
    });
    console.log("\n✅ Dry run complete. No documents were modified.");
    return;
  }

  // Confirmation
  if (!force) {
    console.log("");
    const confirmed = await confirm(
      `⚠️  This will overwrite/restore ${backupData.documentCount} documents in "${dataset}". Continue?`
    );
    if (!confirmed) {
      console.log("❌ Restore cancelled.");
      process.exit(0);
    }
  }

  console.log(`\n🔄 Restoring ${backupData.documents.length} documents...`);

  // Batch mutate via Sanity HTTP API
  const mutateUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

  // Process in chunks of 50 documents
  const chunkSize = 50;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < backupData.documents.length; i += chunkSize) {
    const chunk = backupData.documents.slice(i, i + chunkSize);
    const mutations = chunk.map((doc: any) => ({
      createOrReplace: doc,
    }));

    try {
      const res = await fetch(mutateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mutations }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Sanity Mutation API error (${res.status}): ${errorText}`);
      }

      successCount += chunk.length;
      console.log(`  ✅ Restored batch ${Math.floor(i / chunkSize) + 1} (${chunk.length} documents)`);
    } catch (err: any) {
      errorCount += chunk.length;
      console.error(`  ❌ Failed batch ${Math.floor(i / chunkSize) + 1}: ${err.message}`);
    }
  }

  console.log(`\n📊 Restore complete:`);
  console.log(`   ✅ Succeeded: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
}

restore().catch((err) => {
  console.error("❌ Restore failed:", err.message || err);
  process.exit(1);
});
