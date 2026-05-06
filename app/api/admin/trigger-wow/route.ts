import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import { supabase } from '@/lib/supabase'
import { getTodaysPost } from '@/lib/wow-utils'
import DailyWow from '@/emails/DailyWow'
import { sendTransactionalEmail } from '@/lib/email'

// Protected by Basic Auth middleware (same as all /api/admin/* routes)
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SITE_URL = process.env.SITE_URL || 'https://fabfouracademy.com'

type SubscriberRow = {
  id: string
  email: string
  name: string | null
  unsubscribe_token: string
}

export async function POST() {
  console.log('[trigger-wow] EMAIL_FROM:', process.env.EMAIL_FROM)
  console.log('[trigger-wow] RESEND_API_KEY set:', !!process.env.RESEND_API_KEY)
  const post = getTodaysPost()
  if (!post) {
    return NextResponse.json({ ok: false, reason: 'no_post_today' }, { status: 404 })
  }

  const { data: peopleRows, error: peopleError } = await supabase
    .from('people')
    .select('id, email, name, unsubscribe_token')
    .eq('ok_to_contact', true)

  if (peopleError) {
    return NextResponse.json({ ok: false, reason: 'db_error', detail: peopleError.message }, { status: 500 })
  }

  const subscribers = (peopleRows ?? []) as SubscriberRow[]
  if (subscribers.length === 0) {
    return NextResponse.json({ ok: false, reason: 'no_subscribers' })
  }

  const personIds = subscribers.map((p) => p.id)
  const { data: alreadySentRows } = await supabase
    .from('email_sends')
    .select('person_id')
    .eq('campaign', 'daily_wow')
    .eq('reference', post.slug)
    .in('person_id', personIds)

  const alreadySent = new Set((alreadySentRows ?? []).map((r) => r.person_id as string))

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

    console.log('[trigger-wow] sending to:', person.email)
    const result = await sendTransactionalEmail({
      to: person.email,
      subject: `${post.title} — Fab Four Academy`,
      html,
    })
    console.log('[trigger-wow] send result:', JSON.stringify(result))

    if (result.ok) {
      await supabase.from('email_sends').insert({
        person_id: person.id,
        email: person.email,
        campaign: 'daily_wow',
        reference: post.slug,
        resend_id: result.id ?? null,
        status: 'sent',
      })
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
    ok: true,
    post: { slug: post.slug, title: post.title },
    total: subscribers.length,
    sent,
    skipped,
    failed,
  })
}
