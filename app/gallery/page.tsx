import { LanguageProvider } from "@/contexts/language-context"
import Header from "@/components/header"
import GalleryContent from "@/components/gallery-content"

export default function GalleryPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <GalleryContent /> {/* Uses bg-surface */}
        </main>
      </div>
    </LanguageProvider>
  )
}
