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
import { LanguageProvider } from "@/contexts/language-context";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <LogoCloudSection />
        <AwardsShowcase />
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
