import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ALLOWED_TYPES = ['general', 'keynote', 'consultation', 'newsletter'] as const;
type InquiryType = (typeof ALLOWED_TYPES)[number];

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const type = body.type as string | undefined;
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const source = typeof body.source === 'string' ? body.source.trim() : '';

  if (!email) {
    return NextResponse.json({ error: 'Missing required field: email' }, { status: 400 });
  }
  if (!type) {
    return NextResponse.json({ error: 'Missing required field: type' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(type as InquiryType)) {
    return NextResponse.json(
      { error: `Invalid type: must be one of ${ALLOWED_TYPES.join(', ')}` },
      { status: 400 }
    );
  }
  if (!source) {
    return NextResponse.json({ error: 'Missing required field: source' }, { status: 400 });
  }

  const firstName = typeof body.first_name === 'string' ? body.first_name.trim() : '';
  const lastName = typeof body.last_name === 'string' ? body.last_name.trim() : '';
  const explicitName = typeof body.name === 'string' ? body.name.trim() : '';
  const name = explicitName || [firstName, lastName].filter(Boolean).join(' ') || null;

  const phone = typeof body.phone === 'string' ? body.phone.trim() || null : null;
  const company = typeof body.organization === 'string' ? body.organization.trim() || null : null;
  const userMessage = typeof body.message === 'string' ? body.message.trim() : '';
  const favoriteSong = typeof body.favorite_song === 'string' ? body.favorite_song.trim() : '';

  // Schema v1 has no metadata column on inquiries, so we encode favorite_song
  // into the message field. Phase 3 can promote this to structured columns.
  const messageParts: string[] = [];
  if (userMessage) messageParts.push(userMessage);
  if (favoriteSong) messageParts.push(`Favorite Beatles song: ${favoriteSong}`);
  const message = messageParts.length ? messageParts.join('\n\n') : null;

  const sourceSite =
    typeof body.source_site === 'string' && body.source_site.trim()
      ? body.source_site.trim()
      : 'fabfouracademy.com';

  try {
    const { data: inquiryId, error } = await supabase.rpc('submit_inquiry', {
      p_name: name,
      p_email: email,
      p_type: type,
      p_phone: phone,
      p_company: company,
      p_role: null,
      p_subject: null,
      p_message: message,
      p_source: source,
      p_source_site: sourceSite,
    });

    if (error) {
      console.error('submit_inquiry error:', error);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }

    // TODO: notify Dan of the new inquiry once Stream B lands lib/notify.ts.
    // Pattern (do NOT enable until lib/notify.ts exists and is reviewed):
    //   const { data: detail } = await supabase.rpc('get_inquiry_detail', { p_inquiry_id: inquiryId });
    //   if (detail && detail.length > 0) notifyNewInquiry(detail[0]).catch(console.error);

    return NextResponse.json({ success: true, id: inquiryId }, { status: 200 });
  } catch (err) {
    console.error('POST /api/contacts unexpected error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
