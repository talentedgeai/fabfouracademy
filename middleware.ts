import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Supabase Auth gate for /admin/* and /api/admin/*. A visitor must be signed
// in AND carry app_metadata.role = 'admin' (only settable with the secret key,
// see scripts/create-admin.mjs). Pages redirect to /admin/login; API routes 401.
// /admin/login and the forgot/reset pages under it stay open.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user?.app_metadata?.role === 'admin') return response

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.redirect(new URL('/admin/login', request.url))
}

export const config = {
  // /admin/* covers the dashboard pages; /api/admin/* covers admin-only API
  // routes (read/edit/delete). Public form-submit /api/contacts (POST) stays
  // open by design.
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
