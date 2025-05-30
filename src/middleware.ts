import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import redirects from './config/redirects.json'

// The redirects are now iterated through, no need for a map

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Iterate through redirects and check for a match
  for (const redirect of redirects.redirects) {
    // Basic pattern matching: check if the pathname starts with the source
    // For more complex patterns (like :path*), you might need a regex library
    // or more sophisticated matching logic here.
    // For simplicity, this example checks for exact match or startsWith for dynamic segments.
    
    let sourcePattern = redirect.source;
    
    // Remove trailing slash from sourcePattern unless it's just '/'
    if (sourcePattern.length > 1 && sourcePattern.endsWith('/')) {
      sourcePattern = sourcePattern.slice(0, -1);
    }

    let cleanPathname = pathname;
    // Remove trailing slash from pathname unless it's just '/'
    if (cleanPathname.length > 1 && cleanPathname.endsWith('/')) {
      cleanPathname = cleanPathname.slice(0, -1);
    }

    // Check for exact match or if the source pattern is a prefix (for dynamic paths)
    if (cleanPathname === sourcePattern || (sourcePattern.endsWith(':path*') && cleanPathname.startsWith(sourcePattern.replace(':path*', '')))) {
      
      // Construct the destination URL
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