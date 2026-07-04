import { MONTHLY_POSTS } from '@/app/attitude-perspective/posts'
import type { MonthlyPost } from '@/app/attitude-perspective/posts'

const DOC_ID = '1gOWXq8x9D465u060X8-OLQMOq0YhvbrflrzOXgQVg8o'
const EXPORT_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=html`

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .trim()
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ''))
}

function monthToSlug(month: string): string {
  return month.toLowerCase().replace(/\s+/g, '-')
}

function parseDocHTML(html: string): MonthlyPost[] {
  const posts: MonthlyPost[] = []

  // Collect all heading + paragraph elements in order
  type Elem = { tag: string; text: string }
  const elements: Elem[] = []
  const elemRegex = /<(h[1-6]|p)[^>]*>(.*?)<\/\1>/gs
  let m: RegExpExecArray | null
  while ((m = elemRegex.exec(html)) !== null) {
    const text = stripTags(m[2])
    if (text) elements.push({ tag: m[1], text })
  }

  // Walk elements, splitting on H1 month headings
  let i = 0
  while (i < elements.length) {
    const el = elements[i]
    if (el.tag !== 'h1' || !/^[A-Za-z]+ \d{4}$/.test(el.text)) {
      i++
      continue
    }

    const month = el.text
    i++

    let title = ''
    let youtubeId = ''
    let subtitle = ''
    let boxTitle = ''
    const intro: string[] = []
    const sections: MonthlyPost['sections'] = []
    const faq: { q: string; a: string }[] = []

    type Phase = 'header' | 'intro' | 'section' | 'faq'
    let phase: Phase = 'header'
    let currentSection: MonthlyPost['sections'][0] | null = null

    const saveSection = () => {
      if (currentSection) {
        sections.push(currentSection)
        currentSection = null
      }
    }

    while (i < elements.length) {
      const cur = elements[i]

      // Stop at next month H1
      if (cur.tag === 'h1' && /^[A-Za-z]+ \d{4}$/.test(cur.text)) break

      if (cur.tag === 'h2') {
        saveSection()
        if (cur.text === 'FAQ') {
          phase = 'faq'
        } else {
          phase = 'section'
          currentSection = { heading: cur.text, blocks: [], reflection: '' }
        }
        i++
        continue
      }

      const t = cur.text

      if (phase === 'header') {
        if (t.startsWith('Hero Title:')) {
          title = t.replace(/^Hero Title:\s*/, '')
        } else if (t.startsWith('YouTube ID:')) {
          youtubeId = t.replace(/^YouTube ID:\s*/, '').split(/\s/)[0]
        } else if (t.startsWith('Box Title:')) {
          boxTitle = t.replace(/^Box Title:\s*/, '')
        } else if (t.startsWith('Box Description:')) {
          subtitle = t.replace(/^Box Description:\s*/, '')
          phase = 'intro'
        } else if (title && youtubeId) {
          // unlabelled paragraph after header fields → intro
          phase = 'intro'
          intro.push(t)
        }
        i++
        continue
      }

      if (phase === 'intro') {
        intro.push(t)
        i++
        continue
      }

      if (phase === 'section' && currentSection) {
        if (t.startsWith('Reflection:')) {
          currentSection.reflection = t.replace(/^Reflection:\s*/, '')
        } else {
          currentSection.blocks.push({ type: 'p', text: t })
        }
        i++
        continue
      }

      if (phase === 'faq') {
        // The doc often concatenates all Q/A pairs into one paragraph.
        // Split on " Q: " boundaries first, then parse each chunk.
        const chunks = t.split(/(?<!\bA)\s+Q:\s+/)
        for (const chunk of chunks) {
          const clean = chunk.replace(/^Q:\s*/, '')
          const aIdx = clean.search(/\s+A:\s+/)
          if (aIdx !== -1) {
            faq.push({ q: clean.slice(0, aIdx).trim(), a: clean.slice(aIdx).replace(/^\s*A:\s*/, '').trim() })
          } else if (clean.startsWith('A:') && faq.length > 0 && faq[faq.length - 1].a === '') {
            faq[faq.length - 1].a = clean.replace(/^A:\s*/, '').trim()
          } else if (clean && !clean.startsWith('A:')) {
            faq.push({ q: clean.trim(), a: '' })
          }
        }
        i++
        continue
      }

      i++
    }

    saveSection()

    if (!title || !youtubeId) continue

    // Keep imageUrl from static data if available; otherwise use the shared default
    const existing = MONTHLY_POSTS.find((p) => p.slug === monthToSlug(month))
    const imageUrl =
      existing?.imageUrl ??
      'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png'

    const closingCta =
      existing?.closingCta ??
      'Discover how timeless music translates into practical leadership principles at [Fab Four Academy](https://www.fabfouracademy.com/). [Join the Fab Four Academy Community](/join-fab-four-community) and [pre-order The Fab Four Pillars of Excellence](/dan-absher-books).'

    const relatedLinks = existing?.relatedLinks ?? [
      { label: 'Join the Fab Four Academy Community', href: '/join-fab-four-community' },
      { label: 'Pre-order The Fab Four Pillars of Excellence', href: '/dan-absher-books' },
    ]

    posts.push({
      slug: monthToSlug(month),
      month,
      series: 'Attitude & Perspective: Monthly Deep Dive',
      imageUrl,
      title,
      subtitle,
      ...(boxTitle ? { boxTitle } : {}),
      youtubeId,
      intro,
      sections,
      faq,
      closingCta,
      relatedLinks,
    })
  }

  return posts
}

export async function fetchMonthlyPosts(): Promise<MonthlyPost[]> {
  try {
    const res = await fetch(EXPORT_URL, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()
    const parsed = parseDocHTML(html)
    if (parsed.length === 0) throw new Error('No posts parsed from doc')
    return parsed
  } catch (err) {
    console.error('[monthly-theme-fetcher] falling back to static posts:', err)
    return MONTHLY_POSTS
  }
}
