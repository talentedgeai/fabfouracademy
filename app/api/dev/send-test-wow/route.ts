/**
 * Dev-only test-send endpoint for the Daily WoW email.
 *
 * Usage:
 *   GET /api/dev/send-test-wow?to=dhajdu@gmail.com
 *
 * Renders today's WOW post via @/emails/DailyWow and sends to the address
 * passed in `?to`. Returns the Resend response id on success.
 *
 * Gated to non-production NODE_ENV. Returns 404 in prod so this route can
 * never be triggered by an outside request after deploy.
 *
 * Requires RESEND_API_KEY in .env.local. EMAIL_FROM defaults to
 * "Fab Four Academy <onboarding@resend.dev>" — Resend's verified sandbox
 * sender, which lets you send before verifying fabfouracademy.com.
 */

import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import DailyWow from '@/emails/DailyWow'
import { sendTransactionalEmail } from '@/lib/email'
import { getTodaysPost } from '@/lib/wow-utils'

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const url = new URL(req.url)
  const to = url.searchParams.get('to')

  if (!to) {
    return NextResponse.json(
      { error: 'Missing ?to=email query param' },
      { status: 400 },
    )
  }

  const post = getTodaysPost()
  if (!post) {
    return NextResponse.json(
      { error: 'getTodaysPost() returned null — no WOWPost available' },
      { status: 500 },
    )
  }

  const html = await render(
    DailyWow({
      post,
      unsubscribeUrl: 'https://fabfouracademy.com/unsubscribe?token=TEST',
    }),
  )

  const result = await sendTransactionalEmail({
    to,
    subject: `${post.title} — Fab Four Academy`,
    html,
  })

  return NextResponse.json({
    sent_to: to,
    post: { slug: post.slug, title: post.title, published: post.published },
    result,
  })
}
