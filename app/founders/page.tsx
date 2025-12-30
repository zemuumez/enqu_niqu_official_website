import Header from "@/components/header";
import PersonsContent from "@/components/persons-content";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/contexts/language-context";

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
