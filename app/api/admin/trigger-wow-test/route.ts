/**
 * Daily WoW — test broadcast (admin-only).
 *
 * Sends today's Words of Wisdom to a fixed list of TEST_RECIPIENTS, regardless
 * of their public.people.ok_to_contact value. Lets the operator validate
 * rendering, sender domain, unsubscribe link, etc., without flipping consent
 * flags on the real contact list.
 *
 * Differences from /api/admin/trigger-wow:
 *   - Hardcoded recipient list (TEST_RECIPIENTS below).
 *   - Bypasses ok_to_contact check.
 *   - Logs to email_sends under campaign='daily_wow_test' so it never collides
 *     with the real daily_wow idempotency guard. The 11:00 UTC cron will still
 *     send the same post to these recipients later (assuming they opt in).
 */

import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import { supabase } from '@/lib/supabase'
import { getTodaysPost } from '@/lib/wow-utils'
import DailyWow from '@/emails/DailyWow'
import { sendTransactionalEmail } from '@/lib/email'

// Protected by Basic Auth middleware (same as all /api/admin/* routes).
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SITE_URL = process.env.SITE_URL || 'https://fabfouracademy.com'

// The fixed test list. Adjust here if you want different recipients.
const TEST_RECIPIENTS = [
  'khang.h.nguyen@edge8.ai',
  'anh.pham@edge8.ai',
]

type PersonRow = {
  id: string
  email: string
  name: string | null
  unsubscribe_token: string
}

export async function POST() {
  console.log('[trigger-wow-test] EMAIL_FROM:', process.env.EMAIL_FROM)
  console.log('[trigger-wow-test] recipients:', TEST_RECIPIENTS)

  const post = await getTodaysPost()
  if (!post) {
    return NextResponse.json({ ok: false, reason: 'no_post_today' }, { status: 404 })
  }

  const { data: peopleRows, error: peopleError } = await supabase
    .from('people')
    .select('id, email, name, unsubscribe_token')
    .in('email', TEST_RECIPIENTS)

  if (peopleError) {
    return NextResponse.json(
      { ok: false, reason: 'db_error', detail: peopleError.message },
      { status: 500 },
    )
  }

  const recipients = (peopleRows ?? []) as PersonRow[]
  if (recipients.length === 0) {
    return NextResponse.json({
      ok: false,
      reason: 'test_recipients_not_in_db',
      expected: TEST_RECIPIENTS,
    }, { status: 404 })
  }

  let sent = 0
  let failed = 0
  const results: Array<{ email: string; ok: boolean; reason?: string }> = []

  for (const person of recipients) {
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${person.unsubscribe_token}`
    const html = await render(DailyWow({ post, unsubscribeUrl }))

    const result = await sendTransactionalEmail({
      to: person.email,
      subject: `${post.title} — Fab Four Academy`,
      html,
    })

    if (result.ok) {
      sent++
      results.push({ email: person.email, ok: true })
      await supabase.from('email_sends').insert({
        person_id: person.id,
        email: person.email,
        campaign: 'daily_wow_test',
        reference: post.slug,
        resend_id: result.id ?? null,
        status: 'sent',
      })
    } else {
      failed++
      const reason = 'reason' in result ? result.reason : 'unknown'
      const message = 'message' in result ? (result as { message?: string }).message : undefined
      results.push({ email: person.email, ok: false, reason, message })
      await supabase.from('email_sends').insert({
        person_id: person.id,
        email: person.email,
        campaign: 'daily_wow_test',
        reference: post.slug,
        status: 'failed',
        metadata: { reason, message },
      })
    }
  }

  return NextResponse.json({
    ok: failed === 0,
    post: { slug: post.slug, title: post.title },
    total: recipients.length,
    sent,
    failed,
    results,
  })
}
