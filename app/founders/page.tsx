import type { Metadata } from "next";
import Header from "@/components/header";
import PersonsContent from "@/components/persons-content";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: "Founders & Voices | ENQU SET NIQU SET",
  description: "Meet the team and founders driving ENQU SET NIQU SET, a platform dedicated to centering women, celebrating resilience, and building community trust.",
};

export default function PersonsPage() {
  return (
    <LanguageProvider>
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
