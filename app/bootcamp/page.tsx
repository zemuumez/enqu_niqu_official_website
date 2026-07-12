import type { Metadata } from "next"
import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/header"
import BootcampContent from "@/components/bootcamp-content"

export const metadata: Metadata = {
  title: "Leadership Bootcamp | ENQU SET NIQU SET",
  description: "Join our transformational leadership bootcamps designed for women to explore self-awareness, build resilience, and discover their inner power.",
};

export default function BootcampPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <BootcampContent /> {/* Uses bg-surface */}
        </main>
      </div>
    </LanguageProvider>
  )
}
