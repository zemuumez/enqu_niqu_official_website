import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/header"
import BootcampContent from "@/components/bootcamp-content"

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
