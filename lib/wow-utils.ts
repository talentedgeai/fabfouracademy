import type { WOWPost } from '@/app/words-of-wisdom-content/posts'
import { fetchWOWPosts } from '@/lib/google-doc-fetcher'
import { MONTHLY_POSTS } from '@/app/attitude-perspective/posts'
import type { MonthlyPost } from '@/app/attitude-perspective/posts'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

/**
 * Parse "April 28, 2026" or "April 2026" → Date (local timezone, no UTC offset issues)
 */
export function parsePostDate(str: string): Date {
  const parts = str.split(/[\s,]+/).filter(Boolean)
  if (parts.length >= 3) {
    const month = MONTH_NAMES.indexOf(parts[0])
    const day   = parseInt(parts[1], 10)
    const year  = parseInt(parts[2], 10)
    return new Date(year, month, day)
  }
  if (parts.length === 2) {
    const month = MONTH_NAMES.indexOf(parts[0])
    const year  = parseInt(parts[1], 10)
    return new Date(year, month, 1)
  }
  return new Date(str)
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

/**
 * Returns the WOW post whose published date matches today.
 * Falls back to the most recent past post if no exact match exists yet.
 * Fetches live from Google Doc (1-hour server cache).
 */
export async function getTodaysPost(): Promise<WOWPost | null> {
  const posts    = await fetchWOWPosts()
  const today    = new Date()
  const todayKey = dateKey(today)

  const exact = posts.find(p => dateKey(parsePostDate(p.published)) === todayKey)
  if (exact) return exact

  const past = posts
    .filter(p => parsePostDate(p.published) <= today)
    .sort((a, b) => parsePostDate(b.published).getTime() - parsePostDate(a.published).getTime())

  return past[0] ?? posts[posts.length - 1] ?? null
}

/**
 * Returns the N most recent WOW posts before today (not today itself).
 * Fetches live from Google Doc (1-hour server cache).
 */
export async function getRecentPosts(n = 3): Promise<WOWPost[]> {
  const posts    = await fetchWOWPosts()
  const today    = new Date()
  const todayKey = dateKey(today)

  return posts
    .filter(p => {
      const d = parsePostDate(p.published)
      return dateKey(d) !== todayKey && d < today
    })
    .sort((a, b) => parsePostDate(b.published).getTime() - parsePostDate(a.published).getTime())
    .slice(0, n)
}

/**
 * Returns the most recent MonthlyPost (sorted by month date) that has a
 * non-empty youtubeId. Falls back to the most recent MonthlyPost regardless
 * of video, and finally to null. Used as the fallback when the current month
 * doesn't have an entry yet — so daily emails always get *some* video card.
 */
function latestMonthlyWithVideo(): MonthlyPost | null {
  const sortedByDateDesc = [...MONTHLY_POSTS].sort((a, b) =>
    parsePostDate(b.month).getTime() - parsePostDate(a.month).getTime(),
  )
  return (
    sortedByDateDesc.find(p => Boolean(p.youtubeId)) ??
    sortedByDateDesc[0] ??
    null
  )
}

/**
 * Returns the monthly theme post whose month+year matches a given WOW published date.
 * e.g. "April 28, 2026" → looks for MonthlyPost with month === "April 2026"
 *
 * Fallback chain (so a daily email never loses its video card mid-month):
 *   1. Exact month match WITH a youtubeId
 *   2. Most recent MonthlyPost (by month date) that has a youtubeId
 *   3. Most recent MonthlyPost regardless of video, then null
 */
export function getMonthlyPostForDate(published: string): MonthlyPost | null {
  const d         = parsePostDate(published)
  const monthYear = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`

  const exactWithVideo = MONTHLY_POSTS.find(
    p => p.month === monthYear && Boolean(p.youtubeId),
  )
  if (exactWithVideo) return exactWithVideo

  return latestMonthlyWithVideo()
}

/**
 * Returns the monthly theme post for the current month.
 * Same fallback chain as getMonthlyPostForDate — always returns a video-bearing
 * monthly when one exists in the catalogue.
 */
export function getTodaysMonthlyPost(): MonthlyPost | null {
  const today     = new Date()
  const monthYear = `${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`

  const exactWithVideo = MONTHLY_POSTS.find(
    p => p.month === monthYear && Boolean(p.youtubeId),
  )
  if (exactWithVideo) return exactWithVideo

  return latestMonthlyWithVideo()
}
