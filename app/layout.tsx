import type React from "react"
import type { Metadata } from "next"
import { Manrope, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SmoothScroll from "@/components/smooth-scroll"
import LoadingScreen from "@/components/loading-screen"
import Cursor from "@/components/cursor"
import ScrollProgress from "@/components/scroll-progress"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ዕንቁ ሴት ንቁ ሴት | ENQU SET NIQU SET – Awakening the Gems Within Women",
  description:
    "Award-driven empowerment platform recognizing, amplifying, and celebrating resilient women whose stories deserve the spotlight.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body className={manrope.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScroll>
            <LoadingScreen />
            <Cursor />
            <ScrollProgress />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
