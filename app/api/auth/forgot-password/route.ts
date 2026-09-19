import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendTransactionalEmail } from '@/lib/email'

// Emails an admin a one-time link to /admin/login/reset. Always answers ok so
// the form cannot be used to find out which addresses are admins.
export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({}))
  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Enter your email address.' }, { status: 400 })
  }

  const { data } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email: email.trim().toLowerCase(),
  })

  if (data?.user?.app_metadata?.role === 'admin' && data.properties?.hashed_token) {
    const link = new URL('/admin/login/reset', request.url)
    link.searchParams.set('token_hash', data.properties.hashed_token)
    await sendTransactionalEmail({
      to: data.user.email!,
      subject: 'Reset your Fab Four admin password',
      html: `<p>Someone asked to reset the password for your Fab Four Academy admin account.</p>
<p><a href="${link.toString()}">Choose a new password</a></p>
<p>The link works once and expires in an hour. If this wasn't you, ignore this email.</p>`,
    })
  }

  return NextResponse.json({ ok: true })
}
