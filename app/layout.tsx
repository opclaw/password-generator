import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://password-generator.vercel.app'),
  alternates: {
    canonical: 'https://password-generator.vercel.app',
  },
  title: 'Password Generator — Secure Random Passwords | Free Tool',
  description: 'Generate secure random passwords with custom length and character options. Free password generator.',
  keywords: ['password generator', 'random password', 'secure password', 'password maker'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://password-generator.vercel.app',
    siteName: 'Password Generator',
    title: 'Password Generator — Secure Random Passwords',
    description: 'Generate secure random passwords.',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'Password Generator — Secure Random Passwords',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator',
    description: 'Generate secure random passwords.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Password Generator',
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Custom length, Character options, Secure generation, Copy to clipboard',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
