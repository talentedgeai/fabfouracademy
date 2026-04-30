/**
 * Email send wrappers — Resend.
 *
 * Required env vars (Stream A owns .env.local.example; this file documents
 * what we read but does not modify the env file):
 *   RESEND_API_KEY    — Resend project API key.
 *   EMAIL_FROM        — From line, e.g. "Fab Four Academy <hello@fabfouracademy.com>".
 *   ADMIN_EMAILS      — Comma-separated list of admin recipients for
 *                       inquiry notifications. Falls back to dave@edge8.co.
 *
 * Two exports:
 *   sendEmailNotification — admin-only: new inquiries, member events, errors.
 *   sendTransactionalEmail — single recipient: daily WoW, signup confirmations.
 *
 * Behaviour when RESEND_API_KEY is missing: warn and no-op. Lets local dev
 * run without secrets and lets preview pages render templates without sending.
 */

import { Resend } from 'resend'

const DEFAULT_FROM = 'Fab Four Academy <hello@fabfouracademy.com>'
const DEFAULT_ADMIN = 'dave@edge8.co'

export async function sendEmailNotification({
  subject,
  html,
}: {
  subject: string
  html: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not configured — skipping admin notification.')
    return { ok: false as const, reason: 'no_api_key' as const }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || DEFAULT_FROM,
      to: (process.env.ADMIN_EMAILS || DEFAULT_ADMIN)
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean),
      subject,
      html,
    })
    return { ok: true as const, id: result.data?.id }
  } catch (error) {
    console.error('[email] Admin notification failed:', error)
    return { ok: false as const, reason: 'send_failed' as const, error }
  }
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  replyTo,
  bcc,
}: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
  bcc?: string | string[]
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not configured — skipping transactional email.')
    return { ok: false as const, reason: 'no_api_key' as const }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || DEFAULT_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
      bcc,
    })
    return { ok: true as const, id: result.data?.id }
  } catch (error) {
    console.error('[email] Transactional email failed:', error)
    return { ok: false as const, reason: 'send_failed' as const, error }
  }
}
