import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'

const SplashCursor = dynamic(
  () => import('@/components/ui/splash-cursor').then((mod) => mod.SplashCursor),
  { ssr: false }
)

const inter = Inter({ subsets: ['latin'], weight: ['200','300'] })

export const metadata: Metadata = {
  title: "Diwen Huang",
  description: 'Aspiring CS + AI major based in Vancouver',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <SplashCursor />
          <div className="relative z-10 pointer-events-auto">
            {children}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
