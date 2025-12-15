import Header from "@/components/header"
import ProgramsContent from "@/components/programs-content"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

export default function ProgramsPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          <ProgramsContent />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
