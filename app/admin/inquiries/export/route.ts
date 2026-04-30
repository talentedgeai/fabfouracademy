import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface InquiryRow {
  id: string
  type: string
  status: string
  subject: string | null
  message: string | null
  source: string | null
  source_site: string
  created_at: string
  person_id: string
  person_name: string | null
  person_email: string
  person_phone: string | null
  person_company: string | null
  person_role: string | null
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''
  const s = String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const type = sp.get('type')
  const status = sp.get('status')

  const { data, error } = await supabase.rpc('get_inquiries', {
    p_type: type || null,
    p_status: status || null,
    p_source_site: null,
    p_limit: 5000,
    p_offset: 0,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = (data ?? []) as InquiryRow[]

  const header = [
    'created_at',
    'type',
    'status',
    'name',
    'email',
    'phone',
    'company',
    'role',
    'source',
    'source_site',
    'subject',
    'message',
    'inquiry_id',
    'person_id',
  ]

  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(
      [
        r.created_at,
        r.type,
        r.status,
        r.person_name,
        r.person_email,
        r.person_phone,
        r.person_company,
        r.person_role,
        r.source,
        r.source_site,
        r.subject,
        r.message,
        r.id,
        r.person_id,
      ]
        .map(csvEscape)
        .join(',')
    )
  }

  const csv = lines.join('\n') + '\n'
  const filename = `fab-four-inquiries-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
