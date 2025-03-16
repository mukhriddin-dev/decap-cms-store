import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FavoritesProvider } from "@/contexts/favorites-context"

export const metadata: Metadata = {
  title: "NovoToys - Bolalar o'yinchoqlari",
  description: "Sifatli va xavfsiz bolalar o'yinchoqlari",
  openGraph: {
    title: "NovoToys - Bolalar o'yinchoqlari",
    description: "Sifatli va xavfsiz bolalar o'yinchoqlari",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NovoToys",
      },
    ],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="novo-toys-theme"
        >
          <FavoritesProvider>{children}</FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'