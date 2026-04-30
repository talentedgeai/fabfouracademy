/**
 * Admin notification when a new inquiry lands in /api/contacts.
 *
 * Plain editorial layout — readable in a phone Mail app, clear "type" badge,
 * one-tap mailto reply. Sent only to ADMIN_EMAILS, never to a buyer.
 *
 * The InquiryDetail shape is the row returned by the submit_inquiry RPC
 * (see Stream A's /api/contacts handler). Stream A passes this exact shape
 * at integration; the type is mirrored in lib/notify.ts.
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export type InquiryDetail = {
  id: string
  person_name: string | null
  person_email: string
  person_phone?: string | null
  type: string
  subject: string | null
  message: string | null
  source: string | null
  created_at: string
}

const colors = {
  black: '#1a1a1a',
  cream: '#f5f0e8',
  red: '#c0392b',
  gold: '#d4a843',
  warmGray: '#7f8c8d',
  white: '#ffffff',
}

const fonts = {
  serif: '"Georgia", "Iowan Old Style", "Times New Roman", serif',
  sans: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
}

const typeColors: Record<string, string> = {
  newsletter: colors.gold,
  keynote: colors.red,
  consultation: colors.red,
  coaching: colors.red,
  general: colors.warmGray,
}

type Props = {
  inquiry: InquiryDetail
}

export default function InquiryNotification({ inquiry }: Props) {
  const name = inquiry.person_name || '(no name)'
  const badgeColor = typeColors[inquiry.type] || colors.warmGray
  const replySubject = encodeURIComponent(
    `Re: ${inquiry.subject || `Your ${inquiry.type} inquiry`}`,
  )
  const replyUrl = `mailto:${inquiry.person_email}?subject=${replySubject}`
  const previewText = `New ${inquiry.type} inquiry from ${name}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={section}>
            <Text style={kicker}>NEW INQUIRY</Text>
            <Heading as="h1" style={heading}>
              {name}
            </Heading>
            <Text style={{ ...badge, backgroundColor: badgeColor }}>
              {inquiry.type.toUpperCase()}
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Contact details */}
          <Section style={section}>
            <Text style={fieldLabel}>Email</Text>
            <Text style={fieldValue}>
              <Link href={`mailto:${inquiry.person_email}`} style={link}>
                {inquiry.person_email}
              </Link>
            </Text>

            {inquiry.person_phone ? (
              <>
                <Text style={fieldLabel}>Phone</Text>
                <Text style={fieldValue}>
                  <Link href={`tel:${inquiry.person_phone}`} style={link}>
                    {inquiry.person_phone}
                  </Link>
                </Text>
              </>
            ) : null}

            {inquiry.subject ? (
              <>
                <Text style={fieldLabel}>Subject</Text>
                <Text style={fieldValue}>{inquiry.subject}</Text>
              </>
            ) : null}

            {inquiry.message ? (
              <>
                <Text style={fieldLabel}>Message</Text>
                <Text style={messageBlock}>{inquiry.message}</Text>
              </>
            ) : null}

            <Text style={fieldLabel}>Source</Text>
            <Text style={fieldValue}>{inquiry.source || '(unknown)'}</Text>

            <Text style={fieldLabel}>Received</Text>
            <Text style={fieldValue}>
              {new Date(inquiry.created_at).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Text>
          </Section>

          {/* Reply CTA */}
          <Section style={ctaSection}>
            <Link href={replyUrl} style={ctaButton}>
              Reply to {name}
            </Link>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footerText}>
              Inquiry id: {inquiry.id} · From fabfouracademy.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ─── styles ─────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: colors.cream,
  fontFamily: fonts.sans,
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  backgroundColor: colors.white,
  margin: '24px auto',
  maxWidth: '600px',
  padding: '32px 28px 40px',
  borderRadius: '4px',
}

const section: React.CSSProperties = {
  padding: '4px 0',
}

const kicker: React.CSSProperties = {
  color: colors.warmGray,
  fontFamily: fonts.sans,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '2px',
  margin: 0,
  textTransform: 'uppercase',
}

const heading: React.CSSProperties = {
  color: colors.black,
  fontFamily: fonts.serif,
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '1.2',
  margin: '4px 0 12px',
}

const badge: React.CSSProperties = {
  borderRadius: '3px',
  color: colors.white,
  display: 'inline-block',
  fontFamily: fonts.sans,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  margin: 0,
  padding: '4px 10px',
}

const hr: React.CSSProperties = {
  borderColor: colors.warmGray,
  borderTopWidth: '1px',
  margin: '20px 0',
  opacity: 0.25,
}

const fieldLabel: React.CSSProperties = {
  color: colors.warmGray,
  fontFamily: fonts.sans,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  margin: '12px 0 2px',
  textTransform: 'uppercase',
}

const fieldValue: React.CSSProperties = {
  color: colors.black,
  fontFamily: fonts.sans,
  fontSize: '15px',
  lineHeight: '1.5',
  margin: 0,
}

const messageBlock: React.CSSProperties = {
  ...fieldValue,
  backgroundColor: colors.cream,
  borderLeft: `3px solid ${colors.gold}`,
  margin: '4px 0 0',
  padding: '12px 14px',
  whiteSpace: 'pre-wrap',
}

const link: React.CSSProperties = {
  color: colors.black,
  textDecoration: 'underline',
}

const ctaSection: React.CSSProperties = {
  margin: '24px 0 8px',
  textAlign: 'center',
}

const ctaButton: React.CSSProperties = {
  backgroundColor: colors.black,
  borderRadius: '4px',
  color: colors.cream,
  display: 'inline-block',
  fontFamily: fonts.sans,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '1px',
  padding: '12px 24px',
  textDecoration: 'none',
  textTransform: 'uppercase',
}

const footerText: React.CSSProperties = {
  color: colors.warmGray,
  fontFamily: fonts.sans,
  fontSize: '11px',
  margin: 0,
  textAlign: 'center',
}
