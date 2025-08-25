import type React from "react"
// Supports weights 100-900
import '@fontsource-variable/montserrat';
// Supports weights 300-800
import '@fontsource-variable/open-sans';
import "./globals.css"

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <title>Genisys - AI-Powered Solana Token Creation</title>
        <meta
          name="description"
          content="Create Solana tokens with AI for rapid launches. Professional DeFi platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="generator" content="v0.app" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
