import type { WOWPost } from '@/app/words-of-wisdom-content/posts'
import { fetchWOWPosts } from '@/lib/google-doc-fetcher'
import { MONTHLY_POSTS } from '@/app/attitude-perspective/posts'
import type { MonthlyPost } from '@/app/attitude-perspective/posts'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

/**
 * Parse a published date string into a Date anchored to the current year.
 * Supports: "April 28" | "April 28, 2026" | "April 2026" | "April"
 * Year is always ignored — content reuses year over year by month+day only.
 */
export function parsePostDate(str: string): Date {
  const currentYear = new Date().getFullYear()
  const parts = str.trim().split(/[\s,]+/).filter(Boolean)
  const monthIndex = MONTH_NAMES.indexOf(parts[0])
  if (monthIndex === -1) return new Date(str)

  if (parts.length >= 2) {
    const second = parseInt(parts[1], 10)
    // second part ≤ 31 → it's a day; > 31 → it's a year (legacy), use day 1
    const day = second <= 31 ? second : 1
    return new Date(currentYear, monthIndex, day)
  }

  return new Date(currentYear, monthIndex, 1)
}

/** Month+day key, year-independent */
function mdKey(d: Date): string {
  return `${d.getMonth()}-${d.getDate()}`
}

/**
 * Returns the WOW post whose month+day matches today.
 * Falls back to the most recent past post if no exact match exists.
 * Fetches live from Google Doc (1-hour server cache).
 */
export async function getTodaysPost(): Promise<WOWPost | null> {
  const posts    = await fetchWOWPosts()
  const today    = new Date()
  const todayKey = mdKey(today)

  const exact = posts.find(p => mdKey(parsePostDate(p.published)) === todayKey)
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
  const todayKey = mdKey(today)

  return posts
    .filter(p => {
      const d = parsePostDate(p.published)
      return mdKey(d) !== todayKey && d < today
    })
    .sort((a, b) => parsePostDate(b.published).getTime() - parsePostDate(a.published).getTime())
    .slice(0, n)
}

/**
 * Returns the MonthlyPost with a youtubeId closest to the current month.
 * Walks backwards from current month so the most recent available one wins.
 */
function latestMonthlyWithVideo(): MonthlyPost | null {
  const currentMonth = new Date().getMonth()
  const sorted = [...MONTHLY_POSTS].sort((a, b) => {
    const aIdx = MONTH_NAMES.indexOf(a.month.split(/\s+/)[0])
    const bIdx = MONTH_NAMES.indexOf(b.month.split(/\s+/)[0])
    const aDist = (currentMonth - aIdx + 12) % 12
    const bDist = (currentMonth - bIdx + 12) % 12
    return aDist - bDist
  })
  return sorted.find(p => Boolean(p.youtubeId)) ?? sorted[0] ?? null
}

/**
 * Returns the monthly theme post whose month name matches a given WOW published date.
 * Year-independent — matches "April" regardless of year in the month field.
 *
 * Fallback chain:
 *   1. Exact month name match WITH a youtubeId
 *   2. Closest prior MonthlyPost that has a youtubeId
 */
export function getMonthlyPostForDate(published: string): MonthlyPost | null {
  const d         = parsePostDate(published)
  const monthName = MONTH_NAMES[d.getMonth()]

  const exactWithVideo = MONTHLY_POSTS.find(
    p => p.month.startsWith(monthName) && Boolean(p.youtubeId),
  )
  if (exactWithVideo) return exactWithVideo

  return latestMonthlyWithVideo()
}

/**
 * Returns the monthly theme post for the current month.
 * Year-independent — matches by month name only.
 */
export function getTodaysMonthlyPost(): MonthlyPost | null {
  const monthName = MONTH_NAMES[new Date().getMonth()]

  const exactWithVideo = MONTHLY_POSTS.find(
    p => p.month.startsWith(monthName) && Boolean(p.youtubeId),
  )
  if (exactWithVideo) return exactWithVideo

  return latestMonthlyWithVideo()
}
