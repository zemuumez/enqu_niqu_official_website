import type { Metadata } from "next"
import Header from "@/components/header"
import ProgramsContent from "@/components/programs-content"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { client } from "@/lib/sanity/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity/sanity.queries";

export const metadata: Metadata = {
  title: "Programs & Initiatives | ENQU SET NIQU SET",
  description: "Learn about our bi-annual thematic award events, storytelling podcast, and key initiatives designed to celebrate and support quiet contributors.",
};

export default async function ProgramsPage() {
  let siteSettings: any = null;
  try {
    siteSettings = await client.fetch(siteSettingsQuery);
  } catch (err) {
    console.error("Sanity site settings query error:", err);
  }

  return (
    <LanguageProvider initialSettings={siteSettings}>
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          <ProgramsContent />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
