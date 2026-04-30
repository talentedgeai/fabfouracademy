/**
 * Daily Words of Wisdom email — sent to the community list each morning.
 *
 * Brand: cream background, fab-black text, serif headings, sans body, generous
 * spacing. Editorial / Beatles-vintage feel — see docs/brand/design-rules.md.
 *
 * Renders the live WOWPost shape directly. The unsubscribe link is wired to
 * a token URL passed in by the cron handler at send time.
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { WOWPost } from '@/app/words-of-wisdom-content/posts'

const SITE_URL = process.env.SITE_URL || 'https://fabfouracademy.com'

// Wix raw URLs are 200KB+ PNGs that Gmail's image proxy sometimes drops on
// first display. Wix's media transform delivers a sized JPEG (~20KB) which
// proxies reliably and renders crisp at the target width. If the URL isn't a
// Wix raw media URL, return it untouched.
function transformImageUrl(url: string, width: number, height: number) {
  if (!url) return url
  const isWixRaw = /^https?:\/\/static\.wixstatic\.com\/media\/[^/]+~mv2\.(?:png|jpe?g|webp)(?:\?.*)?$/i.test(url)
  if (!isWixRaw) return url
  return `${url.split('?')[0]}/v1/fill/w_${width},h_${height},al_c,q_85/file.jpg`
}

const HERO_WIDTH = 600
const HERO_HEIGHT = 400

// Colour tokens mirror docs/brand/design-rules.md.
const colors = {
  black: '#1a1a1a',
  cream: '#f5f0e8',
  red: '#c0392b',
  gold: '#d4a843',
  warmGray: '#7f8c8d',
}

const fonts = {
  serif: '"Georgia", "Iowan Old Style", "Times New Roman", serif',
  sans: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
}

type Props = {
  post: WOWPost
  unsubscribeUrl: string
}

export default function DailyWow({ post, unsubscribeUrl }: Props) {
  const previewText = post.subtitle || `Today's Words of Wisdom: ${post.title}`
  const postUrl = `${SITE_URL}/daily-words-of-wisdom/${post.slug}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Masthead */}
          <Section style={masthead}>
            <Text style={mastheadText}>FAB FOUR ACADEMY</Text>
            <Text style={mastheadDate}>{post.published}</Text>
          </Section>

          <Hr style={hrAccent} />

          {/* Title block */}
          <Section style={section}>
            <Text style={series}>{post.series}</Text>
            <Heading as="h1" style={title}>
              {post.title}
            </Heading>
            <Text style={subtitle}>{post.subtitle}</Text>
          </Section>

          {/* Hero image */}
          {post.imageUrl ? (
            <Section style={imageWrap}>
              <Img
                src={transformImageUrl(post.imageUrl, HERO_WIDTH, HERO_HEIGHT)}
                alt={post.imageAlt}
                width={HERO_WIDTH}
                height={HERO_HEIGHT}
                style={image}
              />
            </Section>
          ) : null}

          {/* Body */}
          <Section style={section}>
            {post.content.map((para, i) => (
              <Text key={i} style={paragraph}>
                {para}
              </Text>
            ))}
          </Section>

          {/* Daily challenge */}
          <Section style={callout}>
            <Text style={calloutLabel}>Today&apos;s Challenge</Text>
            <Text style={calloutBody}>{post.dailyChallenge}</Text>
          </Section>

          {/* Reflection */}
          <Section style={calloutAlt}>
            <Text style={calloutLabel}>Reflection</Text>
            <Text style={calloutBody}>{post.reflectionQuestions}</Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Link href={postUrl} style={ctaButton}>
              Read on Fab Four Academy
            </Link>
          </Section>

          <Hr style={hrFooter} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You&apos;re receiving this because you joined the Fab Four
              Academy community list. One short reflection a day, every day.
            </Text>
            <Text style={footerText}>
              <Link href={SITE_URL} style={footerLink}>
                fabfouracademy.com
              </Link>
              {' · '}
              <Link href={unsubscribeUrl} style={footerLink}>
                unsubscribe
              </Link>
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
  backgroundColor: colors.cream,
  margin: '0 auto',
  maxWidth: '600px',
  padding: '32px 24px 48px',
}

const masthead: React.CSSProperties = {
  textAlign: 'center',
  paddingBottom: '8px',
}

const mastheadText: React.CSSProperties = {
  color: colors.black,
  fontFamily: fonts.serif,
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '4px',
  margin: 0,
}

const mastheadDate: React.CSSProperties = {
  color: colors.warmGray,
  fontFamily: fonts.sans,
  fontSize: '12px',
  letterSpacing: '1px',
  margin: '4px 0 0',
  textTransform: 'uppercase',
}

const hrAccent: React.CSSProperties = {
  borderColor: colors.red,
  borderTopWidth: '2px',
  margin: '16px 0 24px',
}

const section: React.CSSProperties = {
  padding: '8px 0',
}

const series: React.CSSProperties = {
  color: colors.gold,
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '2px',
  margin: '0 0 8px',
  textTransform: 'uppercase',
}

const title: React.CSSProperties = {
  color: colors.black,
  fontFamily: fonts.serif,
  fontSize: '36px',
  fontWeight: 700,
  lineHeight: '1.15',
  letterSpacing: '-0.5px',
  margin: '0 0 12px',
}

const subtitle: React.CSSProperties = {
  color: colors.black,
  fontFamily: fonts.serif,
  fontSize: '18px',
  fontStyle: 'italic',
  lineHeight: '1.4',
  margin: '0 0 24px',
}

const imageWrap: React.CSSProperties = {
  margin: '8px 0 24px',
  textAlign: 'center',
}

const image: React.CSSProperties = {
  borderRadius: '4px',
  display: 'block',
  height: 'auto',
  margin: '0 auto',
  maxWidth: '100%',
  // outlook + dark-mode quirks
  border: 0,
  outline: 'none',
  textDecoration: 'none',
}

const paragraph: React.CSSProperties = {
  color: colors.black,
  fontFamily: fonts.sans,
  fontSize: '16px',
  lineHeight: '1.65',
  margin: '0 0 16px',
}

const callout: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderLeft: `4px solid ${colors.red}`,
  margin: '24px 0 16px',
  padding: '20px 24px',
}

const calloutAlt: React.CSSProperties = {
  ...callout,
  borderLeft: `4px solid ${colors.gold}`,
  margin: '16px 0 24px',
}

const calloutLabel: React.CSSProperties = {
  color: colors.warmGray,
  fontFamily: fonts.sans,
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '2px',
  margin: '0 0 8px',
  textTransform: 'uppercase',
}

const calloutBody: React.CSSProperties = {
  color: colors.black,
  fontFamily: fonts.serif,
  fontSize: '17px',
  fontStyle: 'italic',
  lineHeight: '1.5',
  margin: 0,
}

const ctaSection: React.CSSProperties = {
  margin: '32px 0 16px',
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
  padding: '14px 28px',
  textDecoration: 'none',
  textTransform: 'uppercase',
}

const hrFooter: React.CSSProperties = {
  borderColor: colors.warmGray,
  borderTopWidth: '1px',
  margin: '32px 0 16px',
  opacity: 0.3,
}

const footer: React.CSSProperties = {
  textAlign: 'center',
}

const footerText: React.CSSProperties = {
  color: colors.warmGray,
  fontFamily: fonts.sans,
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '4px 0',
}

const footerLink: React.CSSProperties = {
  color: colors.warmGray,
  textDecoration: 'underline',
}
