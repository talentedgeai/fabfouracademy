import type { WOWPost } from '@/app/words-of-wisdom-content/posts'

const DOC_ID = '100xm2UVwrEfPfxyBhhRmI4YA9VqZ7wbPC4kn3BMHnIk'
const EXPORT_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=html`

// ── HTML helpers ─────────────────────────────────────────────────────────────

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  ndash: '–', mdash: '—', hellip: '…', copy: '©',
  reg: '®', trade: '™', deg: '°', eacute: 'é',
}

function decodeEntities(str: string): string {
  return str
    .replace(/&([a-zA-Z]+);/g, (m, name) =>
      Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name) ? NAMED_ENTITIES[name] : m,
    )
    .replace(/&#(\d+);/g, (_m, code) => String.fromCodePoint(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, code) => String.fromCodePoint(parseInt(code, 16)))
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, '')).trim()
}

/**
 * Rewrite Google Drive share / view URLs to the Google CDN form so they
 * render reliably in transactional emails.
 *
 *   https://drive.google.com/uc?export=view&id=FILE_ID    ─┐
 *   https://drive.google.com/uc?id=FILE_ID&export=view     │
 *   https://drive.google.com/file/d/FILE_ID/view?...       ├──► https://lh3.googleusercontent.com/d/FILE_ID=w1200
 *   https://drive.google.com/open?id=FILE_ID               │
 *   https://docs.google.com/uc?export=view&id=FILE_ID     ─┘
 *
 * `drive.google.com/uc?export=view` issues multiple 302 redirects, returns
 * HTML virus-scan interstitials for non-tiny files, and frequently doesn't
 * send a proper image Content-Type — Gmail/Outlook image proxies drop the
 * <img>. `lh3.googleusercontent.com/d/...` is the same backing CDN Google
 * Docs itself uses for inline images: single hop, proper MIME, hotlinkable.
 *
 * Non-Drive URLs (Wix, S3, Cloudinary, anything else) pass through unchanged.
 */
function normalizeImageUrl(url: string): string {
  if (!url) return url
  try {
    const u = new URL(url)
    const host = u.hostname.toLowerCase()
    if (!host.endsWith('drive.google.com') && !host.endsWith('docs.google.com')) {
      return url
    }
    // /file/d/<FILE_ID>/(view|edit|preview)?...
    const fileMatch = u.pathname.match(/\/file\/d\/([^/]+)/)
    const fileId = fileMatch ? fileMatch[1] : u.searchParams.get('id')
    if (!fileId) return url
    return `https://lh3.googleusercontent.com/d/${fileId}=w1200`
  } catch {
    return url
  }
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
      if (para.startsWith('Image URL: '))        { imageUrl = normalizeImageUrl(para.slice(11).trim()); continue }
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

    // ── Extract Daily Challenge and Reflection from content paragraphs ──
    // Support explicit labels OR auto-detect from paragraph patterns:
    //   Daily Challenge  → labeled "Daily Challenge: ..." OR starts with "Today"
    //   Reflection       → labeled "Reflection Questions: ..." OR last para containing "?"
    let dailyChallenge = ''
    let reflectionQuestions = ''
    const bodyParas: string[] = []

    for (const para of contentParas) {
      if (para.startsWith('Daily Challenge: ')) {
        dailyChallenge = para.slice(17).trim()
      } else if (para.startsWith('Reflection Questions: ')) {
        reflectionQuestions = para.slice(22).trim()
      } else {
        bodyParas.push(para)
      }
    }

    // Auto-detect if not explicitly labeled
    if (!dailyChallenge) {
      const idx = bodyParas.findIndex(p => /^today[,\s]/i.test(p))
      if (idx !== -1) { dailyChallenge = bodyParas.splice(idx, 1)[0] }
    }
    if (!reflectionQuestions) {
      // Last paragraph that contains a question mark
      for (let j = bodyParas.length - 1; j >= 0; j--) {
        if (bodyParas[j].includes('?') && bodyParas[j].length > 40) {
          reflectionQuestions = bodyParas.splice(j, 1)[0]
          break
        }
      }
    }

    posts.push({
      slug:               toSlug(title),
      title,
      published:          dateStr,
      series:             'The Wisdom of the Beatles',
      subtitle:           subtitle || quote,
      imageUrl,
      imageAlt,
      content:            bodyParas,
      dailyChallenge,
      reflectionQuestions,
    })
  }

  return posts
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch all WOW posts from the published Google Doc.
 * Result is cached by Next.js data cache for 60 seconds, so edits to the
 * doc appear on the site within about a minute.
 */
export async function fetchWOWPosts(): Promise<WOWPost[]> {
  try {
    const res = await fetch(EXPORT_URL, {
      next: { revalidate: 60 },   // 60-second server-side cache
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
