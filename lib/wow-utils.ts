import { POSTS } from '@/app/words-of-wisdom-content/posts'
import type { WOWPost } from '@/app/words-of-wisdom-content/posts'
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
 */
export function getTodaysPost(): WOWPost | null {
  const today    = new Date()
  const todayKey = dateKey(today)

  const exact = POSTS.find(p => dateKey(parsePostDate(p.published)) === todayKey)
  if (exact) return exact

  // Most recent post on or before today
  const past = POSTS
    .filter(p => parsePostDate(p.published) <= today)
    .sort((a, b) => parsePostDate(b.published).getTime() - parsePostDate(a.published).getTime())

  return past[0] ?? POSTS[POSTS.length - 1] ?? null
}

/**
 * Returns the N most recent WOW posts that are before today (not today itself).
 */
export function getRecentPosts(n = 3): WOWPost[] {
  const today    = new Date()
  const todayKey = dateKey(today)

  return POSTS
    .filter(p => {
      const d = parsePostDate(p.published)
      return dateKey(d) !== todayKey && d < today
    })
    .sort((a, b) => parsePostDate(b.published).getTime() - parsePostDate(a.published).getTime())
    .slice(0, n)
}

/**
 * Returns the monthly theme post whose month+year matches a given WOW published date.
 * e.g. "April 28, 2026" → looks for MonthlyPost with month === "April 2026"
 * Falls back to the most recent available monthly post.
 */
export function getMonthlyPostForDate(published: string): MonthlyPost | null {
  const d         = parsePostDate(published)
  const monthYear = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`

  return (
    MONTHLY_POSTS.find(p => p.month === monthYear) ??
    MONTHLY_POSTS[MONTHLY_POSTS.length - 1] ??
    null
  )
}

/**
 * Returns the monthly theme post for the current month.
 * Falls back to the most recent available monthly post.
 */
export function getTodaysMonthlyPost(): MonthlyPost | null {
  const today     = new Date()
  const monthYear = `${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`

  return (
    MONTHLY_POSTS.find(p => p.month === monthYear) ??
    MONTHLY_POSTS[MONTHLY_POSTS.length - 1] ??
    null
  )
}
