import Header from "@/components/header"
import ContactContent from "@/components/contact-content"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

export default function ContactPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <div className="pt-20">
          <ContactContent />
        </div>
        <Footer />
      </main>
    </LanguageProvider>
  )
}
