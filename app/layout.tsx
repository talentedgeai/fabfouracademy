import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fab Four Academy — Leadership Through The Beatles',
  description:
    "Dan Absher teaches leadership and teamwork through the lens of The Beatles' remarkable story.",
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'Fab Four Academy',
    description:
      'Leadership, harmony, and human-centered excellence — through the lens of The Beatles.',
    url: 'https://www.fabfouracademy.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
