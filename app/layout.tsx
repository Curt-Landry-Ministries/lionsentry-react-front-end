import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import './css/style.css'

import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/app/components/tailwind-indicator'
import { Providers } from '@/app/components/providers'
import { Toaster } from '@/app/components/ui/sonner'

import { Header } from '@/app/components/header'
import Banner from '@/app/components/banner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: 'Ambassador Hub',
    template: `%s - Next.js AI Chatbot`
  },
  description: 'An AI-powered chatbot template built with Next.js and Vercel.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      {true ? (
        <body
          className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
        >
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
              {/* <Header /> */}
              {children}
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      ) : (
        <body
          className={cn(
            'font-sans antialiased',
            GeistSans.variable,
            GeistMono.variable
          )}
        >
          <Toaster position="top-center" />
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50">
                {children}
              </main>
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      )}
    </html>
  )
}
