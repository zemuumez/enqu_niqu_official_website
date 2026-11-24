import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "enqu_niqu_studio",
  title: "ENQU SET NIQU SET Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title("Content Manager")
          .items([
            // ── 1. PAGES (PAGE-BY-PAGE WITH SECTIONS) ──────────────────
            S.listItem()
              .title("Pages (Edit by Page)")
              .child(
                S.list()
                  .title("Select a Page to Edit")
                  .items([
                    S.listItem()
                      .title("🏠 Home Page")
                      .child(
                        S.document()
                          .schemaType("homePage")
                          .documentId("homePage")
                          .title("Home Page Sections")
                      ),
                    S.listItem()
                      .title("💡 Initiatives Page")
                      .child(
                        S.document()
                          .schemaType("programsPage")
                          .documentId("programsPage")
                          .title("Initiatives Page Sections")
                      ),
                    S.listItem()
                      .title("👥 Founders & Voices Page")
                      .child(
                        S.document()
                          .schemaType("foundersPage")
                          .documentId("foundersPage")
                          .title("Founders Page Sections")
                      ),
                    S.listItem()
                      .title("🖼️ Gallery Page")
                      .child(
                        S.document()
                          .schemaType("galleryPage")
                          .documentId("galleryPage")
                          .title("Gallery Page Sections")
                      ),
                    S.listItem()
                      .title("🚀 Inside ENQU SET (Bootcamp) Page")
                      .child(
                        S.document()
                          .schemaType("bootcampPage")
                          .documentId("bootcampPage")
                          .title("Inside ENQU SET Page Sections")
                      ),
                    S.listItem()
                      .title("✉️ Contact Page")
                      .child(
                        S.document()
                          .schemaType("contactPage")
                          .documentId("contactPage")
                          .title("Contact Page Sections")
                      ),
                  ])
              ),

            // ── 2. GLOBAL SITE SETTINGS & FOOTER ──────────────────────
            S.listItem()
              .title("⚙️ Global Settings & Footer")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Global Settings, Social & Footer")
              ),

            S.divider(),

            // ── 3. COLLECTIONS (LIST ITEMS) ───────────────────────────
            S.listItem()
              .title("🏆 Programs & Initiatives")
              .child(
                S.documentTypeList("program").title("All Programs & Initiatives")
              ),

            S.listItem()
              .title("🎖️ Award Events")
              .child(
                S.documentTypeList("awardEvent").title("All Award Events")
              ),

            S.listItem()
              .title("👤 Founders & Team Profiles")
              .child(
                S.documentTypeList("founder").title("All Founders & Profiles")
              ),

            S.listItem()
              .title("📸 Gallery Sessions (Photos)")
              .child(
                S.documentTypeList("gallerySession").title("All Gallery Sessions")
              ),

            S.listItem()
              .title("🤝 Partners & Sponsors")
              .child(
                S.documentTypeList("sponsor").title("All Partners & Sponsors")
              ),

            S.divider(),

            // ── 4. INBOX ──────────────────────────────────────────────
            S.listItem()
              .title("📬 Contact Submissions")
              .child(
                S.documentTypeList("contactSubmission").title("Incoming Messages")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
