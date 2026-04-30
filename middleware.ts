import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic-auth gate for /admin/*. Set ADMIN_PASSWORD in env. Username is ignored.
export function middleware(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD

  if (!expected) {
    return new NextResponse('ADMIN_PASSWORD not configured', { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Fab Four Admin"' },
    })
  }

  let pass = ''
  try {
    const base64 = authHeader.slice(6).trim()
    const decoded = atob(base64)
    pass = decoded.split(':').slice(1).join(':')
  } catch {
    return new NextResponse('Invalid auth header', { status: 400 })
  }

  if (pass === expected) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Fab Four Admin"' },
  })
}

export const config = {
  // /admin/* covers the dashboard pages; /api/admin/* covers admin-only API
  // routes (read/edit/delete). Public form-submit /api/contacts (POST) stays
  // open by design.
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
