import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import redirects from './config/redirects.json'

// The redirects are now iterated through, no need for a map

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Log the incoming pathname
  console.log(`Incoming pathname: ${pathname}`);

  // Iterate through redirects and check for a match
  for (const redirect of redirects.redirects) {
    let sourcePattern = redirect.source;
    
    // Log the source pattern being checked
    console.log(`Checking source pattern: ${sourcePattern}`);

    // Remove trailing slash from sourcePattern unless it's just '/'
    if (sourcePattern.length > 1 && sourcePattern.endsWith('/')) {
      sourcePattern = sourcePattern.slice(0, -1);
    }

    let cleanPathname = pathname;
    // Remove trailing slash from pathname unless it's just '/'
    if (cleanPathname.length > 1 && cleanPathname.endsWith('/')) {
      cleanPathname = cleanPathname.slice(0, -1);
    }
    
    // Log cleaned paths for comparison
    console.log(`Cleaned pathname: ${cleanPathname}, Cleaned source: ${sourcePattern}`);

    // Check for exact match or if the source pattern is a prefix (for dynamic paths)
    if (cleanPathname === sourcePattern || (sourcePattern.endsWith(':path*') && cleanPathname.startsWith(sourcePattern.replace(':path*', '')))) {
      
      console.log(`Match found for source: ${redirect.source}`);

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
  
  console.log(`No redirect match found for ${pathname}`);
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