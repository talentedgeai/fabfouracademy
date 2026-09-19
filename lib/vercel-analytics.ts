// Server-only reader for the Vercel Web Analytics API.
// https://vercel.com/docs/analytics/web-analytics-api

const BASE = 'https://api.vercel.com/v1/query/web-analytics/visits'

export type AnalyticsRow = {
  pageviews: number
  visitors: number
  timestamp?: string
  [dimension: string]: string | number | undefined
}

export type AnalyticsResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: 'not_configured' | 'not_enabled' | 'error'; message: string }

async function query<T>(
  endpoint: 'count' | 'aggregate',
  params: Record<string, string>,
): Promise<AnalyticsResult<T>> {
  const token = process.env.VERCEL_API_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  if (!token || !projectId) {
    const missing = [!token && 'VERCEL_API_TOKEN', !projectId && 'VERCEL_PROJECT_ID'].filter(Boolean)
    return { ok: false, reason: 'not_configured', message: `Not connected to Vercel yet: ${missing.join(' and ')} is not set.` }
  }

  const qs = new URLSearchParams({ projectId, ...params })
  if (process.env.VERCEL_TEAM_ID) qs.set('teamId', process.env.VERCEL_TEAM_ID)

  const res = await fetch(`${BASE}/${endpoint}?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  })
  if (res.status === 404) {
    return { ok: false, reason: 'not_enabled', message: 'Web Analytics is not enabled on the Vercel project.' }
  }
  if (res.status === 401 || res.status === 403) {
    return { ok: false, reason: 'not_configured', message: 'Vercel rejected VERCEL_API_TOKEN (expired, or no access to the team).' }
  }
  if (!res.ok) {
    return { ok: false, reason: 'error', message: `Vercel API returned ${res.status}` }
  }
  const json = await res.json()
  return { ok: true, data: json.data as T }
}

export function getTotals(since: string, until: string) {
  return query<{ pageviews: number; visitors: number }>('count', { since, until })
}

export function getBreakdown(by: string, since: string, until: string, limit = 10) {
  return query<AnalyticsRow[]>('aggregate', { by, since, until, limit: String(limit) })
}
