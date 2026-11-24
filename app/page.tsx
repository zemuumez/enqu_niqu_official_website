import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProgramsHighlight from "@/components/programs-highlight";
import PersonsHighlight from "@/components/persons-highlight";
import GalleryHighlight from "@/components/gallery-highlight";
import ContactHighlight from "@/components/contact-highlight";
import Footer from "@/components/footer";
import LogoCloudSection from "@/components/logo-cloud-section";
import AwardsShowcase from "@/components/awards-showcase";
import FilmRealScroll from "@/components/film-reel-scroll";
import { LanguageProvider } from "@/contexts/language-context";
import fs from "fs";
import path from "path";
import { client } from "@/lib/sanity/sanity.client";
import { gallerySessionsQuery, siteSettingsQuery, homePageQuery } from "@/lib/sanity/sanity.queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Read images from public folders (server-side)
  const sessionLastDir = path.join(
    process.cwd(),
    "public",
    "images",
    "Session7"
  );
  const sessionNowDir = path.join(
    process.cwd(),
    "public",
    "images",
    "Session8"
  );

  const readPublicImages = (dir: string, publicBase: string) => {
    try {
      const files = fs.readdirSync(dir || "");
      return files
        .filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f))
        .map((f) => `${publicBase}/${f}`);
    } catch (e) {
      return [] as string[];
    }
  };

  let siteSettings: any = null;
  let homePageContent: any = null;
  let allSessions: any[] = [];

  try {
    const [settings, homeContent, galleryData] = await Promise.all([
      client.fetch(siteSettingsQuery),
      client.fetch(homePageQuery),
      client.fetch(gallerySessionsQuery),
    ]);
    siteSettings = settings;
    homePageContent = homeContent;
    if (galleryData && galleryData.length > 0) {
      allSessions = galleryData;
    }
  } catch (err) {
    console.error("Sanity queries error on Home page:", err);
  }

  // Filter valid sessions that have uploaded images, sorted descending (highest session first)
  const validSessions = allSessions
    .filter((s: any) => Array.isArray(s.images) && s.images.length > 0)
    .sort((a: any, b: any) => (Number(b.session) || 0) - (Number(a.session) || 0));

  // Determine current session: CMS override if set, else newest session with images (e.g. Session 9)
  const cmsCurrent = homePageContent?.filmReelCurrentSession;
  const cmsPrevious = homePageContent?.filmReelPreviousSession;

  const currentSessionObj =
    (cmsCurrent ? validSessions.find((s: any) => Number(s.session) === Number(cmsCurrent)) : null) ||
    validSessions[0] ||
    null;

  // Determine previous session: CMS override if set, else the session immediately prior (e.g. Session 8)
  const remainingSessions = validSessions.filter(
    (s: any) => !currentSessionObj || Number(s.session) !== Number(currentSessionObj.session)
  );

  const previousSessionObj =
    (cmsPrevious ? validSessions.find((s: any) => Number(s.session) === Number(cmsPrevious)) : null) ||
    remainingSessions[0] ||
    validSessions[1] ||
    null;

  let currentSessionImages: string[] = currentSessionObj?.images || [];
  let previousSessionImages: string[] = previousSessionObj?.images || [];

  if (currentSessionImages.length === 0) {
    currentSessionImages = readPublicImages(sessionNowDir, "/images/Session9");
  }
  if (previousSessionImages.length === 0) {
    previousSessionImages = readPublicImages(sessionLastDir, "/images/Session8");
  }

  return (
    <LanguageProvider initialSettings={siteSettings} pageContent={homePageContent}>
      <main className="min-h-screen">
        <Header />
        <HeroSection />

        <LogoCloudSection />
        {/* <AwardsShowcase /> */}
        <FilmRealScroll
          currentImages={currentSessionImages}
          previousImages={previousSessionImages}
        />
        <AboutSection />
        <ProgramsHighlight />
        <PersonsHighlight />
        <GalleryHighlight sessions={allSessions} />
        <ContactHighlight />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
