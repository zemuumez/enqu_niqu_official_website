import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/language-context";
import Header from "@/components/header";
import BootcampContent from "@/components/bootcamp-content";
import { client } from "@/lib/sanity/sanity.client";
import { siteSettingsQuery, bootcampPageQuery } from "@/lib/sanity/sanity.queries";

export const metadata: Metadata = {
  title: "Leadership Bootcamp | ENQU SET NIQU SET",
  description: "Join our transformational leadership bootcamps designed for women to explore self-awareness, build resilience, and discover their inner power.",
};

export default async function BootcampPage() {
  let siteSettings: any = null;
  let pageContent: any = null;
  try {
    const [settings, content] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(bootcampPageQuery),
    ]);
    siteSettings = settings;
    pageContent = content;
  } catch (err) {
    console.error("Sanity site settings/bootcamp query error:", err);
  }

  return (
    <LanguageProvider initialSettings={siteSettings} pageContent={pageContent}>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <BootcampContent />
        </main>
      </div>
    </LanguageProvider>
  );
}
