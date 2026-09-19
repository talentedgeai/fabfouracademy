// Create admin logins, or reset the password of existing ones.
//
//   node --env-file=.env.local scripts/create-admin.mjs dan@example.com dave@example.com
//
// For each email: generates a random password, creates the Supabase Auth user
// (or updates it if it exists), and sets app_metadata.role = 'admin', which is
// what middleware.ts checks. Passwords are printed once and stored nowhere.

import { randomBytes } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env
const emails = process.argv.slice(2).map((e) => e.toLowerCase())

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY || emails.length === 0) {
  console.error('Usage: node --env-file=.env.local scripts/create-admin.mjs <email> [...]')
  console.error('Requires SUPABASE_URL and SUPABASE_SECRET_KEY.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
})

const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 })
if (listError) {
  console.error('Could not list users:', listError.message)
  process.exit(1)
}

for (const email of emails) {
  const password = randomBytes(15).toString('base64url')
  const existing = list.users.find((u) => u.email?.toLowerCase() === email)
  const attrs = { password, email_confirm: true, app_metadata: { role: 'admin' } }

  const { error } = existing
    ? await supabase.auth.admin.updateUserById(existing.id, attrs)
    : await supabase.auth.admin.createUser({ email, ...attrs })

  if (error) {
    console.error(`${email}: FAILED - ${error.message}`)
    process.exitCode = 1
  } else {
    console.log(`${email}  ${existing ? '(password reset)' : '(created)'}  password: ${password}`)
  }
}
