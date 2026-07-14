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
import PatternDevider from "@/components/pattern-divider";
import { LanguageProvider } from "@/contexts/language-context";
import fs from "fs";
import path from "path";
import { client } from "@/lib/sanity/sanity.client";
import { gallerySessionsQuery, siteSettingsQuery } from "@/lib/sanity/sanity.queries";

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

  let sessionNowImages: string[] = [];
  let sessionLastImages: string[] = [];
  let allSessions: any[] = [];

  try {
    const sanityData = await client.fetch(gallerySessionsQuery);
    if (sanityData && sanityData.length > 0) {
      allSessions = sanityData;
      const session8 = sanityData.find((s: any) => s.session === 8);
      const session7 = sanityData.find((s: any) => s.session === 7);
      if (session8) sessionNowImages = session8.images || [];
      if (session7) sessionLastImages = session7.images || [];
    }
  } catch (err) {
    console.error("Sanity query error on Home page film reel, using local:", err);
  }

  if (sessionNowImages.length === 0) {
    sessionNowImages = readPublicImages(sessionNowDir, "/images/Session8");
  }
  if (sessionLastImages.length === 0) {
    sessionLastImages = readPublicImages(sessionLastDir, "/images/Session7");
  }


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
        <HeroSection />

        <LogoCloudSection />
        {/* <AwardsShowcase /> */}
        <FilmRealScroll
          previousImages={sessionNowImages}
          upcomingImages={sessionLastImages}
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
