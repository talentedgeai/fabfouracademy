/**
 * Daily Words of Wisdom — admin-only delivery.
 *
 * Sends today's WoW post to the inboxes in ADMIN_EMAILS. Independent of the
 * broader subscriber-list broadcast (Stream B owns /api/cron/daily-wow once
 * the people-table-wide email pipeline lands). This route exists so Dan gets
 * his own daily reminder before the public list goes live.
 *
 * Trigger: Vercel Cron at 13:00 UTC daily (06:00 PT during PDT, 05:00 PT
 * during PST). Vercel Cron runs in UTC only; the time will drift by an hour
 * across DST boundaries — adjust the schedule in vercel.json if that matters.
 *
 * Manual trigger:
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *     'http://localhost:3001/api/cron/admin-daily-wow'
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getTodaysPost } from '@/lib/wow-utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

type WowPost = NonNullable<ReturnType<typeof getTodaysPost>>

function renderEmail(post: WowPost, siteUrl: string): string {
  const url = `${siteUrl.replace(/\/$/, '')}/words-of-wisdom-content/${post.slug}`
  const paragraphs = post.content
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#222;">${escapeHtml(p)}</p>`
    )
    .join('')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(post.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f5f0;font-family:Georgia,'Times New Roman',serif;color:#222;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
            <tr>
              <td style="padding:32px 36px 8px;">
                <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#CF4B27;">${escapeHtml(post.series)}</p>
                <h1 style="margin:12px 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:1.2;color:#000;">${escapeHtml(post.title)}</h1>
                <p style="margin:0;font-size:15px;color:#666;font-style:italic;">${escapeHtml(post.subtitle)}</p>
              </td>
            </tr>
            ${
              post.imageUrl
                ? `<tr><td style="padding:16px 36px;"><img src="${escapeHtml(post.imageUrl)}" alt="${escapeHtml(post.imageAlt || post.title)}" style="width:100%;height:auto;border-radius:6px;display:block;" /></td></tr>`
                : ''
            }
            <tr>
              <td style="padding:8px 36px 24px;">${paragraphs}</td>
            </tr>
            <tr>
              <td style="padding:0 36px 24px;">
                <div style="padding:18px 20px;border-left:3px solid #CF4B27;background:#faf6ef;">
                  <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#CF4B27;">Daily Challenge</p>
                  <p style="margin:0;font-size:15px;line-height:1.6;color:#333;">${escapeHtml(post.dailyChallenge)}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 24px;">
                <div style="padding:18px 20px;border-left:3px solid #2E758D;background:#eef4f6;">
                  <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2E758D;">Reflections</p>
                  <p style="margin:0;font-size:15px;line-height:1.6;color:#333;">${escapeHtml(post.reflectionQuestions)}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px;text-align:center;">
                <a href="${escapeHtml(url)}" style="display:inline-block;padding:13px 26px;background:#38393A;color:#fff;text-decoration:none;border-radius:4px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;">Read on the site</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 36px 28px;border-top:1px solid #eee;text-align:center;">
                <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#999;">Fab Four Academy · Daily Words of Wisdom · admin preview</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function GET(request: NextRequest) {
  const expected = process.env.CRON_SECRET
  if (!expected) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 })
  }
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const post = getTodaysPost()
  if (!post) {
    return NextResponse.json({ error: 'No WoW post available for today' }, { status: 404 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  const adminEmails = process.env.ADMIN_EMAILS

  if (!apiKey || !from || !adminEmails) {
    return NextResponse.json(
      { error: 'Missing RESEND_API_KEY, EMAIL_FROM, or ADMIN_EMAILS' },
      { status: 500 }
    )
  }

  const recipients = adminEmails
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  if (recipients.length === 0) {
    return NextResponse.json({ error: 'ADMIN_EMAILS is empty' }, { status: 500 })
  }

  const siteUrl = process.env.SITE_URL || 'https://fabfouracademy.com'
  const html = renderEmail(post, siteUrl)
  const subject = `Today's Words of Wisdom: ${post.title}`

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from,
    to: recipients,
    subject,
    html,
  })

  if (error) {
    console.error('admin-daily-wow send error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    sent_to: recipients,
    post_slug: post.slug,
    message_id: data?.id ?? null,
  })
}
