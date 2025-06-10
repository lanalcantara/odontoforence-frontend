import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import type { ReactNode } from "react"
import Head from "next/head" // 👈 IMPORTANTE

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  generator: 'v0.dev',
  title: "Sistema de Gestão Pericial",
  description: "Sistema de gestão de laudos e relatórios periciais",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 w-full overflow-x-hidden">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
