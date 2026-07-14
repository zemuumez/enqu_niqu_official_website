import type { Metadata } from "next";
import Header from "@/components/header";
import PersonsContent from "@/components/persons-content";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/language-context";
import { client } from "@/lib/sanity/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity/sanity.queries";

export const metadata: Metadata = {
  title: "Founders & Voices | ENQU SET NIQU SET",
  description: "Meet the team and founders driving ENQU SET NIQU SET, a platform dedicated to centering women, celebrating resilience, and building community trust.",
};

export default async function PersonsPage() {
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
          <PersonsContent />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  );
}
