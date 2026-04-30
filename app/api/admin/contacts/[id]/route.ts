/**
 * Admin-only single-inquiry API. Mounted under /api/admin/* so middleware.ts
 * (HTTP basic auth via ADMIN_PASSWORD) gates it; the public POST handler at
 * /api/contacts stays open for form submissions.
 *
 *   GET    /api/admin/contacts/[id] → full inquiry + person via get_inquiry_detail RPC
 *   PATCH  /api/admin/contacts/[id] → update inquiry status (and/or person fields)
 *   DELETE /api/admin/contacts/[id] → hard delete (cascades activity log + email_sends)
 *
 * Uses the secret-key supabase client so RLS is bypassed.
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const VALID_STATUSES = [
  'new_lead',
  'contacted',
  'discovery_call',
  'proposal',
  'won',
  'lost',
] as const

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params

  const { data, error } = await supabase.rpc('get_inquiry_detail', {
    p_inquiry_id: id,
  })

  if (error) {
    console.error('[api/contacts/[id]] get_inquiry_detail error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const row = (data ?? [])[0]
  if (!row) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
  }

  return NextResponse.json({ inquiry: row })
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const status = typeof body.status === 'string' ? body.status : null
  const personUpdates = (body.person ?? null) as
    | Record<string, unknown>
    | null

  // ── Status update via RPC (validates + updates inquiries.status)
  if (status) {
    if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      return NextResponse.json(
        {
          error: `Invalid status. Allowed: ${VALID_STATUSES.join(', ')}`,
        },
        { status: 400 },
      )
    }

    const { error: stageError } = await supabase.rpc(
      'update_inquiry_status',
      { p_inquiry_id: id, p_status: status },
    )
    if (stageError) {
      console.error('[api/contacts/[id]] update_inquiry_status error:', stageError)
      return NextResponse.json({ error: stageError.message }, { status: 500 })
    }
  }

  // ── Person field updates via RPC (only fields that the RPC accepts)
  if (personUpdates) {
    // We need person_id from the inquiry to call update_person.
    const { data: detail, error: detailError } = await supabase.rpc(
      'get_inquiry_detail',
      { p_inquiry_id: id },
    )
    if (detailError) {
      console.error('[api/contacts/[id]] get_inquiry_detail (for update) error:', detailError)
      return NextResponse.json({ error: detailError.message }, { status: 500 })
    }
    const row = (detail ?? [])[0]
    if (!row) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
    }

    const { error: personError } = await supabase.rpc('update_person', {
      p_person_id: row.person_id,
      p_name:    typeof personUpdates.name    === 'string' ? personUpdates.name    : null,
      p_email:   typeof personUpdates.email   === 'string' ? personUpdates.email   : null,
      p_phone:   typeof personUpdates.phone   === 'string' ? personUpdates.phone   : null,
      p_company: typeof personUpdates.company === 'string' ? personUpdates.company : null,
      p_role:    typeof personUpdates.role    === 'string' ? personUpdates.role    : null,
    })
    if (personError) {
      console.error('[api/contacts/[id]] update_person error:', personError)
      return NextResponse.json({ error: personError.message }, { status: 500 })
    }
  }

  // Return the fresh detail row.
  const { data: refreshed } = await supabase.rpc('get_inquiry_detail', {
    p_inquiry_id: id,
  })

  return NextResponse.json({ ok: true, inquiry: (refreshed ?? [])[0] ?? null })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const { error } = await supabase.from('inquiries').delete().eq('id', id)
  if (error) {
    console.error('[api/contacts/[id]] delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
