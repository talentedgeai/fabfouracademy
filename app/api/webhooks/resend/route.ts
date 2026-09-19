/**
 * Resend webhook: delivery / open / click / bounce / complaint tracking.
 *
 * Verifies the Svix signature with RESEND_WEBHOOK_SECRET, then hands the event
 * to record_email_event() (migration 003), which stamps the matching
 * email_sends row by resend_id and unsubscribes the person on a bounce or
 * complaint. Events for emails we never logged (inquiry notifications, admin
 * copies) match no row and are ignored.
 */

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const TRACKED = new Set([
  'email.delivered',
  'email.opened',
  'email.clicked',
  'email.bounced',
  'email.complained',
])

export async function POST(req: Request) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'RESEND_WEBHOOK_SECRET not configured' }, { status: 500 })
  }

  const payload = await req.text()
  let event
  try {
    event = new Resend(process.env.RESEND_API_KEY || 're_unused').webhooks.verify({
      payload,
      headers: {
        id: req.headers.get('svix-id') ?? '',
        timestamp: req.headers.get('svix-timestamp') ?? '',
        signature: req.headers.get('svix-signature') ?? '',
      },
      webhookSecret,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  if (!TRACKED.has(event.type) || !('email_id' in event.data)) {
    return NextResponse.json({ ignored: event.type })
  }

  const { error } = await supabase.rpc('record_email_event', {
    p_resend_id: event.data.email_id,
    p_type: event.type,
    p_at: event.created_at,
  })
  if (error) {
    console.error('[webhooks/resend] record_email_event failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
