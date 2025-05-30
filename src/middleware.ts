import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import redirects from './config/redirects.json'

// Create a Map for O(1) lookup of redirects
const redirectMap = new Map(
  redirects.redirects.map((redirect) => [redirect.source, redirect])
)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path matches any redirect
  const redirect = redirectMap.get(pathname)
  
  if (redirect) {
    // Create the destination URL
    const destination = new URL(redirect.destination, request.url)
    
    // Preserve query parameters if they exist
    request.nextUrl.searchParams.forEach((value, key) => {
      destination.searchParams.set(key, value)
    })

    // Return the redirect response
    return NextResponse.redirect(destination, {
      status: redirect.permanent ? 308 : 307
    })
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 