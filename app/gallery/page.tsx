import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/language-context";
import Header from "@/components/header";
import GalleryContent from "@/components/gallery-content";
import { getSessionImages, getAvailableSessions } from "@/lib/gallery-utils";
import { client } from "@/lib/sanity/sanity.client";
import { gallerySessionsQuery, siteSettingsQuery } from "@/lib/sanity/sanity.queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gathering Gallery & Archive | ENQU SET NIQU SET",
  description: "Explore photos and moments from our bi-annual gatherings, storytelling circles, and award evenings honoring resilient women.",
};

export default async function GalleryPage() {
  // Try to load images from Sanity CMS
  let sessionsData: { session: number; images: string[] }[] = [];
  let siteSettings: any = null;

  try {
    const [sanityData, settingsData] = await Promise.all([
      client.fetch(gallerySessionsQuery),
      client.fetch(siteSettingsQuery),
    ]);
    siteSettings = settingsData;
    if (sanityData && sanityData.length > 0) {
      sessionsData = sanityData.map((s: any) => ({
        session: s.session,
        images: s.images || [],
      }));
    }
  } catch (err) {
    console.error("Sanity gallery/settings fetch error, using local fallback:", err);
  }

  // Fallback to static folders if Sanity is empty/configured incorrectly
  if (sessionsData.length === 0) {
    const availableSessions = getAvailableSessions();
    sessionsData = availableSessions.map((sessionNum) => ({
      session: sessionNum,
      images: getSessionImages(sessionNum),
    }));
  }

  return (
    <LanguageProvider initialSettings={siteSettings}>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <GalleryContent sessionsData={sessionsData} />
        </main>
      </div>
    </LanguageProvider>
  );
}

