import type { Metadata } from "next"
import Header from "@/components/header"
import ContactContent from "@/components/contact-content"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Contact & Nominate | ENQU SET NIQU SET",
  description: "Get in touch to nominate a resilient woman, explore sponsorship opportunities, host storytelling circles, or join our community rhythm.",
};

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
