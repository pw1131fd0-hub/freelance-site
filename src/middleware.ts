import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/request'

// Note: In some Edge runtimes, we'd need to use Web Crypto.
// But for this project's deployment target, we assume Node.js support or we'll provide a compatible check.
// Since we are running in a environment with better-sqlite3, we are in Node.js.

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Protect /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Deeper verification could be done here if we had a Web Crypto version of verifySession
    // For now, we rely on server actions/components to do the final verification 
    // but we can at least check if it looks like a signed token (payload.signature)
    const parts = sessionToken.split('.')
    if (parts.length !== 2) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('session')
      return response
    }
  }

  // Redirect /admin/login to /admin/dashboard if already logged in
  if (pathname === '/admin/login' && sessionToken) {
    const parts = sessionToken.split('.')
    if (parts.length === 2) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
