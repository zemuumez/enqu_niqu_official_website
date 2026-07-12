import type { Metadata } from "next"
import Header from "@/components/header"
import ProgramsContent from "@/components/programs-content"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Programs & Initiatives | ENQU SET NIQU SET",
  description: "Learn about our bi-annual thematic award events, storytelling podcast, and key initiatives designed to celebrate and support quiet contributors.",
};

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
