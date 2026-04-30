/**
 * Daily Words of Wisdom — broadcast handler.
 *
 * Triggered by Vercel Cron at 11:00 UTC daily (~07:00 EDT / 06:00 EST).
 * See website/vercel.json for the schedule.
 *
 * Flow:
 *   1. Verify Authorization: Bearer $CRON_SECRET (Vercel adds this header).
 *   2. Load today's WOWPost via getTodaysPost().
 *   3. Fetch active subscribers (ok_to_contact = true).
 *   4. For each, skip if already sent today's post (email_sends has unique
 *      index on (person_id, campaign='daily_wow', reference=post.slug)).
 *      Otherwise render template with their unsubscribe URL, send via Resend,
 *      record in email_sends.
 *   5. Return summary { sent, skipped, failed, total, post }.
 *
 * Manual trigger (dev): set CRON_SECRET in .env.local and:
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *     'http://localhost:3000/api/cron/daily-wow'
 *
 * The route also accepts ?dryRun=true to preview the recipient list and the
 * post that would be sent without firing any emails.
 */

import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import { supabase } from '@/lib/supabase'
import { getTodaysPost } from '@/lib/wow-utils'
import DailyWow from '@/emails/DailyWow'
import { sendTransactionalEmail } from '@/lib/email'

// Vercel Cron requires a non-static handler.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SITE_URL = process.env.SITE_URL || 'https://fabfouracademy.com'

function isAuthorised(req: Request): boolean {
  if (!process.env.CRON_SECRET) return false
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${process.env.CRON_SECRET}`
}

type SubscriberRow = {
  id: string
  email: string
  name: string | null
  unsubscribe_token: string
}

export async function GET(req: Request) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const url = new URL(req.url)
  const dryRun = url.searchParams.get('dryRun') === 'true'

  const post = getTodaysPost()
  if (!post) {
    return NextResponse.json(
      { error: 'getTodaysPost() returned null' },
      { status: 500 },
    )
  }

  // 1. Active subscribers
  const { data: peopleRows, error: peopleError } = await supabase
    .from('people')
    .select('id, email, name, unsubscribe_token')
    .eq('ok_to_contact', true)

  if (peopleError) {
    console.error('[cron/daily-wow] people fetch error:', peopleError)
    return NextResponse.json(
      { error: peopleError.message, stage: 'fetch_people' },
      { status: 500 },
    )
  }

  const subscribers = (peopleRows ?? []) as SubscriberRow[]
  if (subscribers.length === 0) {
    return NextResponse.json({
      post: { slug: post.slug, title: post.title },
      sent: 0,
      skipped: 0,
      failed: 0,
      total: 0,
      note: 'No active subscribers',
    })
  }

  // 2. Already-sent set (for idempotency on re-runs)
  const personIds = subscribers.map((p) => p.id)
  const { data: alreadySentRows, error: sendsError } = await supabase
    .from('email_sends')
    .select('person_id')
    .eq('campaign', 'daily_wow')
    .eq('reference', post.slug)
    .in('person_id', personIds)

  if (sendsError) {
    console.error('[cron/daily-wow] sends fetch error:', sendsError)
    return NextResponse.json(
      { error: sendsError.message, stage: 'fetch_sends' },
      { status: 500 },
    )
  }

  const alreadySent = new Set(
    (alreadySentRows ?? []).map((r) => r.person_id as string),
  )

  // 3. Dry-run short-circuit
  if (dryRun) {
    const toSend = subscribers.filter((p) => !alreadySent.has(p.id))
    return NextResponse.json({
      dryRun: true,
      post: { slug: post.slug, title: post.title, published: post.published },
      total: subscribers.length,
      would_send_to: toSend.map((p) => ({
        id: p.id,
        email: p.email,
        name: p.name,
      })),
      already_sent_count: alreadySent.size,
    })
  }

  // 4. Send loop
  let sent = 0
  let skipped = 0
  let failed = 0

  for (const person of subscribers) {
    if (alreadySent.has(person.id)) {
      skipped++
      continue
    }

    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${person.unsubscribe_token}`
    const html = await render(DailyWow({ post, unsubscribeUrl }))

    const result = await sendTransactionalEmail({
      to: person.email,
      subject: `${post.title} — Fab Four Academy`,
      html,
    })

    if (result.ok) {
      const { error: insertError } = await supabase.from('email_sends').insert({
        person_id: person.id,
        email: person.email,
        campaign: 'daily_wow',
        reference: post.slug,
        resend_id: result.id ?? null,
        status: 'sent',
      })
      if (insertError) {
        // Email went out but log failed — record but don't double-send.
        console.error('[cron/daily-wow] log insert failed:', insertError)
      }
      sent++
    } else {
      await supabase.from('email_sends').insert({
        person_id: person.id,
        email: person.email,
        campaign: 'daily_wow',
        reference: post.slug,
        status: 'failed',
        metadata: { reason: 'reason' in result ? result.reason : 'unknown' },
      })
      failed++
    }
  }

  return NextResponse.json({
    post: { slug: post.slug, title: post.title, published: post.published },
    total: subscribers.length,
    sent,
    skipped,
    failed,
  })
}
