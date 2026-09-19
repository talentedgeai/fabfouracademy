/**
 * Admin-only single-person API, gated by middleware.ts like the rest of
 * /api/admin/*. Backs the side panel on /admin/people.
 *
 *   GET    → person + inquiries + email history + activity log
 *   PATCH  → { ok_to_contact: boolean } subscribe / unsubscribe
 *   DELETE → hard delete (cascades inquiries, email_sends, activity_log)
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type Params = { params: Promise<{ id: string }> }

const SONG_PREFIX = 'Favorite Beatles song:'

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params

  const [person, inquiries, sends, sendCount, activity] = await Promise.all([
    supabase.from('people').select('*').eq('id', id).maybeSingle(),
    supabase
      .from('inquiries')
      .select('id, type, subject, message, source, status, created_at')
      .eq('person_id', id)
      .order('created_at', { ascending: true }),
    supabase
      .from('email_sends')
      .select('id, campaign, reference, status, created_at, delivered_at, first_opened_at, first_clicked_at')
      .eq('person_id', id)
      .order('created_at', { ascending: false })
      .limit(15),
    supabase.from('email_sends').select('id', { count: 'exact', head: true }).eq('person_id', id),
    supabase
      .from('activity_log')
      .select('id, action, details, created_at')
      .eq('person_id', id)
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  if (person.error) return NextResponse.json({ error: person.error.message }, { status: 500 })
  if (!person.data) return NextResponse.json({ error: 'Person not found' }, { status: 404 })

  // The signup form stores the song as a line in the first inquiry's message.
  let favoriteSong: string | null = null
  for (const i of inquiries.data ?? []) {
    const line = (i.message ?? '').split('\n').find((l: string) => l.startsWith(SONG_PREFIX))
    if (line) {
      favoriteSong = line.slice(SONG_PREFIX.length).trim()
      break
    }
  }

  // unsubscribe_token is a credential for the public unsubscribe link; keep it server-side.
  const { unsubscribe_token: _token, ...safePerson } = person.data

  return NextResponse.json({
    person: safePerson,
    favoriteSong,
    inquiries: inquiries.data ?? [],
    sends: sends.data ?? [],
    sendCount: sendCount.count ?? 0,
    activity: activity.data ?? [],
  })
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params
  const body = await req.json().catch(() => ({}))
  if (typeof body.ok_to_contact !== 'boolean') {
    return NextResponse.json({ error: 'ok_to_contact must be true or false' }, { status: 400 })
  }

  const { error } = await supabase
    .from('people')
    .update({ ok_to_contact: body.ok_to_contact })
    .eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const { error } = await supabase.from('people').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
