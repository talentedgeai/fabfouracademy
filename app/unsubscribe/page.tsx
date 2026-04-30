/**
 * Unsubscribe confirmation page.
 *
 * Reached after the /api/unsubscribe handler runs and redirects with
 * ?status=ok | invalid | error. Renders a calm editorial message —
 * brand-consistent, no tone of panic.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Unsubscribe | Fab Four Academy',
  description: 'Manage your Fab Four Academy email subscription.',
  robots: { index: false, follow: false },
}

type SearchParams = { status?: string }

const COPY: Record<string, { headline: string; body: string }> = {
  ok: {
    headline: "You're unsubscribed.",
    body: "We've stopped sending the daily Words of Wisdom to this email. We're sorry to see you go — if it was a mistake, drop us a note and we'll get you back on the list.",
  },
  invalid: {
    headline: 'Hmm, that link looks off.',
    body: "We couldn't match that unsubscribe link to a subscriber. It may have already been used, or the URL got mangled in transit. If you'd still like to opt out, reply to any daily email and we'll handle it manually.",
  },
  error: {
    headline: 'Something went wrong on our end.',
    body: 'Sorry — we hit an error trying to process your unsubscribe. Please try the link in your email again, or reply to any daily email and we will sort it out.',
  },
  default: {
    headline: 'Manage your subscription',
    body: 'Click the unsubscribe link in any Fab Four Academy daily email to opt out of the list.',
  },
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { status } = await searchParams
  const copy = COPY[status ?? 'default'] ?? COPY.default

  return (
    <>
      <Navbar />
      <main style={pageStyles.page}>
        <div style={pageStyles.card}>
          <p style={pageStyles.kicker}>FAB FOUR ACADEMY</p>
          <h1 style={pageStyles.headline}>{copy.headline}</h1>
          <p style={pageStyles.body}>{copy.body}</p>

          <div style={pageStyles.actions}>
            <Link href="/" style={pageStyles.link}>
              Return to fabfouracademy.com →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

const colors = {
  black: '#1a1a1a',
  cream: '#f5f0e8',
  warmGray: '#7f8c8d',
  red: '#c0392b',
}

const pageStyles = {
  page: {
    backgroundColor: colors.cream,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: '64px 24px',
  } satisfies React.CSSProperties,
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    maxWidth: '560px',
    padding: '40px 32px',
    textAlign: 'center' as const,
    width: '100%',
  } satisfies React.CSSProperties,
  kicker: {
    color: colors.warmGray,
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '3px',
    margin: '0 0 12px',
    textTransform: 'uppercase' as const,
  } satisfies React.CSSProperties,
  headline: {
    color: colors.black,
    fontFamily: 'Georgia, "Iowan Old Style", serif',
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
    margin: '0 0 16px',
  } satisfies React.CSSProperties,
  body: {
    color: colors.black,
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    lineHeight: 1.6,
    margin: '0 0 28px',
  } satisfies React.CSSProperties,
  actions: {
    borderTop: `1px solid ${colors.cream}`,
    paddingTop: '20px',
  } satisfies React.CSSProperties,
  link: {
    color: colors.red,
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textDecoration: 'none',
  } satisfies React.CSSProperties,
}
