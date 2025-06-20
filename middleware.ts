import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirects from './middleware-redirects.json';

// Add this to verify middleware is being loaded
console.log('Middleware loaded with', redirects.length, 'redirects');

export function middleware(request: NextRequest) {
  // Log every request to verify middleware is running
  console.log('Middleware executing for:', request.url);

  const { pathname, search } = request.nextUrl;
  const fullPath = pathname + search;

  // Log the full path we're checking
  console.log('Checking path:', fullPath);

  // Test with a simple hardcoded redirect first
  if (pathname === '/test-redirect') {
    console.log('Test redirect matched');
    return NextResponse.redirect(new URL('/products?url=pc-mangalsutra', request.url));
  }

  // Find the first matching redirect
  const match = redirects.find(
    (r: { source: string; destination: string }) => {
      // Remove domain if present in the source
      const sourcePath = r.source.replace('https://www.whpjewellers.com', '');
      const matches = sourcePath === fullPath;
      if (matches) {
        console.log('Found matching redirect:', r);
      }
      return matches;
    }
  );

  if (match) {
    console.log('Applying redirect:', match);
    const url = request.nextUrl.clone();
    const [path, query] = match.destination.split('?');
    url.pathname = path;
    url.search = query ? `?${query}` : '';
    return NextResponse.redirect(url, 308);
  }

  console.log('No redirect match found');
  return NextResponse.next();
}

// Update matcher to include all paths
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
}; 
