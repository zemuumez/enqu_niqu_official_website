import fs from "fs";
import path from "path";

async function backup() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-11";

  if (!projectId || !token) {
    console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN");
    console.error("Set them in .env.local or pass them as environment variables.");
    process.exit(1);
  }

  console.log(`📦 Starting backup for Project: ${projectId}, Dataset: ${dataset}`);

  const docTypes = [
    "homePage",
    "programsPage",
    "foundersPage",
    "galleryPage",
    "bootcampPage",
    "contactPage",
    "siteSettings",
    "program",
    "founder",
    "gallerySession",
    "contactSubmission",
    "awardEvent",
    "sponsor",
  ];
  const query = `*[_type in [${docTypes.map((t) => `"${t}"`).join(",")}]]`;

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Sanity API error (${res.status}): ${errorText}`);
  }

  const jsonResponse = await res.json();
  const documents = jsonResponse.result || [];
  console.log(`📄 Found ${documents.length} documents`);

  // Create backups directory
  const backupsDir = path.join(process.cwd(), "backups");
  if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir, { recursive: true });

  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);

  // JSON backup
  const jsonPath = path.join(backupsDir, `backup-${timestamp}.json`);
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        projectId,
        dataset,
        documentCount: documents.length,
        documents,
      },
      null,
      2
    )
  );
  console.log(`✅ JSON backup saved: ${jsonPath}`);

  // NDJSON backup (native Sanity import format)
  const ndjsonPath = path.join(backupsDir, `backup-${timestamp}.ndjson`);
  const ndjsonContent = documents
    .map((doc: any) => JSON.stringify(doc))
    .join("\n");
  fs.writeFileSync(ndjsonPath, ndjsonContent);
  console.log(`✅ NDJSON backup saved: ${ndjsonPath}`);

  // Summary
  const typeCounts: Record<string, number> = {};
  documents.forEach((doc: any) => {
    typeCounts[doc._type] = (typeCounts[doc._type] || 0) + 1;
  });
  console.log("\n📊 Document counts by type:");
  Object.entries(typeCounts).forEach(([type, count]) =>
    console.log(`   ${type}: ${count}`)
  );
}

backup().catch((err) => {
  console.error("❌ Backup failed:", err.message || err);
  process.exit(1);
});
