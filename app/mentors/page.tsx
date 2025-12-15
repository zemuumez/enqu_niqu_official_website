import Header from "@/components/header"
import MentorsContent from "@/components/mentors-content"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

export default function MentorsPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          <MentorsContent />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
