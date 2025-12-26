import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProgramsHighlight from "@/components/programs-highlight";
import MentorsHighlight from "@/components/mentors-highlight";
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

export default function Home() {
  // Read images from public folders (server-side)
  const session6Dir = path.join(process.cwd(), "public", "images", "Session6");
  const session7Dir = path.join(process.cwd(), "public", "images", "Session7");

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

  const session6Images = readPublicImages(session6Dir, "/images/Session6");
  const session7Images = readPublicImages(session7Dir, "/images/Session7");

  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <HeroSection />

        <LogoCloudSection />
        {/* <AwardsShowcase /> */}
        <FilmRealScroll
          previousImages={session6Images}
          upcomingImages={session7Images}
        />
        <AboutSection />
        <ProgramsHighlight />
        <MentorsHighlight />
        <GalleryHighlight />
        <ContactHighlight />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
