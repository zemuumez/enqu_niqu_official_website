import type { Metadata } from "next";
import Header from "@/components/header";
import ProgramsContent from "@/components/programs-content";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/language-context";
import { client } from "@/lib/sanity/sanity.client";
import { siteSettingsQuery, programsPageQuery } from "@/lib/sanity/sanity.queries";

export const metadata: Metadata = {
  title: "Programs & Initiatives | ENQU SET NIQU SET",
  description: "Learn about our bi-annual thematic award events, storytelling podcast, and key initiatives designed to celebrate and support quiet contributors.",
};

export default async function ProgramsPage() {
  let siteSettings: any = null;
  let pageContent: any = null;
  try {
    const [settings, content] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(programsPageQuery),
    ]);
    siteSettings = settings;
    pageContent = content;
  } catch (err) {
    console.error("Sanity site settings/programs query error:", err);
  }

  return (
    <LanguageProvider initialSettings={siteSettings} pageContent={pageContent}>
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          <ProgramsContent />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  );
}
