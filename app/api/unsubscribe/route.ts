/**
 * Unsubscribe handler.
 *
 * Triggered when a recipient clicks the unsubscribe link in the daily WOW
 * email. The link carries a per-person UUID token from people.unsubscribe_token.
 *
 * Flow:
 *   1. Read ?token=<uuid> from query.
 *   2. Update people set ok_to_contact = false where unsubscribe_token = ?.
 *   3. Redirect to /unsubscribe?status=ok|invalid|error so the user lands on a
 *      friendly confirmation page.
 *
 * Idempotent: re-clicking the link is a no-op (status remains false).
 */

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url))
  }

  const { data, error } = await supabase
    .from('people')
    .update({ ok_to_contact: false })
    .eq('unsubscribe_token', token)
    .select('email')

  if (error) {
    console.error('[unsubscribe] update error:', error)
    return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url))
  }

  if (!data || data.length === 0) {
    // Token didn't match any row — could be tampered, expired, or already
    // unsubscribed and the row deleted. Show invalid state.
    return NextResponse.redirect(new URL('/unsubscribe?status=invalid', req.url))
  }

  return NextResponse.redirect(new URL('/unsubscribe?status=ok', req.url))
}
