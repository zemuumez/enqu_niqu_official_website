import { LanguageProvider } from "@/contexts/language-context";
import Header from "@/components/header";
import GalleryContent from "@/components/gallery-content";
import { getSessionImages, getAvailableSessions } from "@/lib/gallery-utils";

export default function GalleryPage() {
  // Dynamically load images from session folders
  const availableSessions = getAvailableSessions();
  const sessionsData = availableSessions.map((sessionNum) => ({
    session: sessionNum,
    images: getSessionImages(sessionNum),
  }));

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
