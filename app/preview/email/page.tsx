/**
 * Dev-only preview page — renders the two email templates inline so we can
 * iterate visually without sending real mail.
 *
 * Renders each at desktop (600px) and mobile (375px) widths via iframe so
 * media-query and width-dependent styling can be inspected at a glance.
 *
 * NOT linked from the public nav. Reachable at /preview/email during dev.
 */

import { render } from '@react-email/render'
import { getTodaysPost } from '@/lib/wow-utils'
import DailyWow from '@/emails/DailyWow'
import InquiryNotification, {
  type InquiryDetail,
} from '@/emails/InquiryNotification'

const FAKE_INQUIRY: InquiryDetail = {
  id: '00000000-0000-0000-0000-000000000000',
  person_name: 'Sarah Mitchell',
  person_email: 'sarah.mitchell@example.com',
  person_phone: '+1 (415) 555-0142',
  type: 'keynote',
  subject: 'Keynote inquiry — Q3 leadership offsite',
  message:
    'Hi Dan,\n\nWe are organising a Q3 leadership offsite for ~120 senior managers in Austin and your Beatles framing of leadership keeps coming up in our planning conversations. Would love to explore a 60-minute keynote with Q&A.\n\nDates flexible mid-July to early-August. Looking forward to connecting.\n\n— Sarah',
  source: '/book-dan-absher',
  created_at: new Date().toISOString(),
}

export const dynamic = 'force-dynamic'

export default async function EmailPreviewPage() {
  const post = getTodaysPost()

  const dailyWowHtml = post
    ? await render(DailyWow({ post, unsubscribeUrl: 'https://fabfouracademy.com/unsubscribe?token=PREVIEW' }))
    : null

  const inquiryHtml = await render(
    InquiryNotification({ inquiry: FAKE_INQUIRY }),
  )

  return (
    <main style={pageStyles.page}>
      <header style={pageStyles.header}>
        <h1 style={pageStyles.h1}>Email previews</h1>
        <p style={pageStyles.lede}>
          Dev-only preview of every email template the site sends. Each is rendered at
          desktop (600px) and mobile (375px) widths. No mail is sent from this page.
        </p>
      </header>

      <PreviewSection
        title="Daily Words of Wisdom"
        subtitle={
          post
            ? `Today's post: "${post.title}" (${post.published})`
            : 'No post available — getTodaysPost() returned null'
        }
        html={dailyWowHtml}
      />

      <PreviewSection
        title="Inquiry notification (admin)"
        subtitle="Sent to ADMIN_EMAILS when /api/contacts receives a new inquiry"
        html={inquiryHtml}
      />
    </main>
  )
}

function PreviewSection({
  title,
  subtitle,
  html,
}: {
  title: string
  subtitle: string
  html: string | null
}) {
  return (
    <section style={pageStyles.section}>
      <div style={pageStyles.sectionHeader}>
        <h2 style={pageStyles.h2}>{title}</h2>
        <p style={pageStyles.subtitle}>{subtitle}</p>
      </div>

      {html ? (
        <div style={pageStyles.frames}>
          <FramePane label="Desktop · 600px" html={html} width={600} />
          <FramePane label="Mobile · 375px" html={html} width={375} />
        </div>
      ) : (
        <p style={pageStyles.empty}>(nothing to render)</p>
      )}
    </section>
  )
}

function FramePane({
  label,
  html,
  width,
}: {
  label: string
  html: string
  width: number
}) {
  return (
    <div style={{ ...pageStyles.frameWrap, width }}>
      <div style={pageStyles.frameLabel}>{label}</div>
      <iframe
        title={label}
        srcDoc={html}
        style={{ ...pageStyles.frame, width, height: 900 }}
      />
    </div>
  )
}

const pageStyles = {
  page: {
    backgroundColor: '#eceff1',
    fontFamily:
      '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
    minHeight: '100vh',
    padding: '32px 24px 64px',
  } satisfies React.CSSProperties,
  header: {
    margin: '0 auto 32px',
    maxWidth: '1280px',
  } satisfies React.CSSProperties,
  h1: {
    color: '#1a1a1a',
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 8px',
  } satisfies React.CSSProperties,
  lede: {
    color: '#7f8c8d',
    fontSize: '14px',
    lineHeight: 1.5,
    margin: 0,
  } satisfies React.CSSProperties,
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    margin: '0 auto 32px',
    maxWidth: '1280px',
    padding: '24px',
  } satisfies React.CSSProperties,
  sectionHeader: {
    borderBottom: '1px solid #e0e4e7',
    margin: '0 0 24px',
    paddingBottom: '16px',
  } satisfies React.CSSProperties,
  h2: {
    color: '#1a1a1a',
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 4px',
  } satisfies React.CSSProperties,
  subtitle: {
    color: '#7f8c8d',
    fontSize: '13px',
    margin: 0,
  } satisfies React.CSSProperties,
  frames: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '24px',
  } satisfies React.CSSProperties,
  frameWrap: {
    flexShrink: 0,
  } satisfies React.CSSProperties,
  frameLabel: {
    color: '#7f8c8d',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    margin: '0 0 8px',
    textTransform: 'uppercase' as const,
  } satisfies React.CSSProperties,
  frame: {
    backgroundColor: '#ffffff',
    border: '1px solid #cfd6da',
    borderRadius: '4px',
  } satisfies React.CSSProperties,
  empty: {
    color: '#7f8c8d',
    fontSize: '14px',
    fontStyle: 'italic' as const,
    margin: 0,
  } satisfies React.CSSProperties,
}
