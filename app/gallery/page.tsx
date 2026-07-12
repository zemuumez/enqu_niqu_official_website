import { LanguageProvider } from "@/contexts/language-context";
import Header from "@/components/header";
import GalleryContent from "@/components/gallery-content";
import { getSessionImages, getAvailableSessions } from "@/lib/gallery-utils";
import { client } from "@/lib/sanity/sanity.client";
import { gallerySessionsQuery } from "@/lib/sanity/sanity.queries";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Try to load images from Sanity CMS
  let sessionsData: { session: number; images: string[] }[] = [];

  try {
    const sanityData = await client.fetch(gallerySessionsQuery);
    if (sanityData && sanityData.length > 0) {
      sessionsData = sanityData.map((s: any) => ({
        session: s.session,
        images: s.images || [],
      }));
    }
  } catch (err) {
    console.error("Sanity gallery fetch error, using local fallback:", err);
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
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <GalleryContent sessionsData={sessionsData} />
        </main>
      </div>
    </LanguageProvider>
  );
}

