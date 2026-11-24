import type { Metadata } from "next";
import Header from "@/components/header";
import ContactContent from "@/components/contact-content";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/language-context";
import { client } from "@/lib/sanity/sanity.client";
import { siteSettingsQuery, contactPageQuery } from "@/lib/sanity/sanity.queries";

export const metadata: Metadata = {
  title: "Contact & Nominate | ENQU SET NIQU SET",
  description: "Get in touch to nominate a resilient woman, explore sponsorship opportunities, host storytelling circles, or join our community rhythm.",
};

export default async function ContactPage() {
  let siteSettings: any = null;
  let pageContent: any = null;
  try {
    const [settings, content] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(contactPageQuery),
    ]);
    siteSettings = settings;
    pageContent = content;
  } catch (err) {
    console.error("Sanity site settings/contact query error:", err);
  }

  return (
    <LanguageProvider initialSettings={siteSettings} pageContent={pageContent}>
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          <ContactContent />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  );
}
