import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple session verification for middleware (edge compatible)
// Since we can't use node:crypto easily here, we'll just check if the cookie exists 
// and let the server components do the deeper verification if needed, 
// OR we can use the Web Crypto API if we want.
// For MVP, checking existence and a simple format is a start.

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Protect /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect /admin/login to /admin/dashboard if already logged in
  if (pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
