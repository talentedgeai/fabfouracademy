/**
 * Server actions for /admin/newsletter.
 *
 * Auth note: middleware.ts gates /admin/* via HTTP basic auth; by the time
 * a server action fires, the request has already passed that gate.
 */

'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function setContactConsent(
  personId: string,
  okToContact: boolean,
) {
  if (!personId) {
    return { ok: false, error: 'Missing person id' as const }
  }

  const { error } = await supabase
    .from('people')
    .update({ ok_to_contact: okToContact })
    .eq('id', personId)

  if (error) {
    console.error('[newsletter/setContactConsent]', error)
    return { ok: false, error: error.message }
  }

  revalidatePath('/admin/newsletter')
  revalidatePath('/admin/people')
  revalidatePath('/admin')
  return { ok: true as const }
}
