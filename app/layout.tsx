import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, Geist } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SiteShell } from '@/components/site-shell'
import { getHomepage } from '@/lib/sanity'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant' })

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomepage()
  return {
    title: home?.seo?.title || home?.title || 'WUCH FILMS — Independent moving image',
    description: home?.seo?.description || home?.intro || 'WUCH FILMS is an independent film house.',
    generator: 'WUCH FILMS',
    robots: home?.seo?.noIndex ? 'noindex' : undefined,
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${cormorant.variable}`}><body className="antialiased"><SiteShell>{children}</SiteShell>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
