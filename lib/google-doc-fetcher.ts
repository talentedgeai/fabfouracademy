import type { WOWPost } from '@/app/words-of-wisdom-content/posts'

const DOC_ID = '100xm2UVwrEfPfxyBhhRmI4YA9VqZ7wbPC4kn3BMHnIk'
const EXPORT_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=html`

// ── HTML helpers ─────────────────────────────────────────────────────────────

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/ /g, ' ')
    .trim()
}

function extractParas(html: string): string[] {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => stripTags(m[1]).trim())
    .filter(p => p.length > 0)
}

// ── Date parsing ─────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

function parseDate(str: string): Date | null {
  // "June 2, 2026" or "June 2" or "June 2026"
  const parts = str.trim().split(/[\s,]+/).filter(Boolean)
  const monthIdx = MONTH_NAMES.indexOf(parts[0])
  if (monthIdx === -1) return null
  const year = parts.find(p => /^\d{4}$/.test(p))
  const day  = parts.find(p => /^\d{1,2}$/.test(p))
  if (!year) return null
  return new Date(parseInt(year), monthIdx, day ? parseInt(day) : 1)
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Parser ───────────────────────────────────────────────────────────────────

function parseDocHTML(html: string): WOWPost[] {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const body = bodyMatch ? bodyMatch[1] : html

  // Split into sections by <h2 … >
  const rawSections = body.split(/<h2[^>]*>/i)

  const posts: WOWPost[] = []

  for (let i = 1; i < rawSections.length; i++) {
    const section = rawSections[i]

    // Date comes before closing </h2>
    const h2Close = section.indexOf('</h2>')
    if (h2Close === -1) continue
    const dateStr = stripTags(section.slice(0, h2Close)).trim()
    const date = parseDate(dateStr)
    if (!date) continue                     // skip non-date headings

    const afterHeading = section.slice(h2Close + 5)
    const paras = extractParas(afterHeading)

    // Also grab any blockquote text as quote
    const bqMatch = afterHeading.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i)
    const quote = bqMatch ? stripTags(bqMatch[1]).trim() : ''

    // Parse labeled fields
    let title = '', subtitle = '', imageUrl = '', imageAlt = ''
    const contentParas: string[] = []

    let pastLabels = false
    for (const para of paras) {
      if (para.startsWith('Title: '))            { title    = para.slice(7).trim();  continue }
      if (para.startsWith('Subtitle/Snippet: ')) { subtitle = para.slice(18).trim(); continue }
      if (para.startsWith('Image URL: '))        { imageUrl = para.slice(11).trim(); continue }
      if (para.startsWith('Image Alt: '))        { imageAlt = para.slice(11).trim(); continue }
      if (para.startsWith('Monthly Theme: '))    { pastLabels = true; continue }
      // Skip until we've seen at least a title
      if (!title) continue
      // Short unlabelled line right after title = quote/subtitle (already handled above)
      if (!pastLabels && !subtitle && para.length < 120) { subtitle = para; continue }
      if (para.length > 15) {
        pastLabels = true
        contentParas.push(para)
      }
    }

    if (!title) continue   // malformed section

    posts.push({
      slug:               toSlug(title),
      title,
      published:          dateStr,
      series:             'The Wisdom of the Beatles',
      subtitle:           subtitle || quote,
      imageUrl,
      imageAlt,
      content:            contentParas,
      dailyChallenge:     '',
      reflectionQuestions:'',
    })
  }

  return posts
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch all WOW posts from the published Google Doc.
 * Result is cached by Next.js data cache for 1 hour.
 */
export async function fetchWOWPosts(): Promise<WOWPost[]> {
  try {
    const res = await fetch(EXPORT_URL, {
      next: { revalidate: 3600 },   // 1-hour server-side cache
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()
    return parseDocHTML(html)
  } catch (err) {
    console.error('[google-doc-fetcher] failed:', err)
    // Fall back to static posts so the site never breaks
    const { POSTS } = await import('@/app/words-of-wisdom-content/posts')
    return POSTS
  }
}
