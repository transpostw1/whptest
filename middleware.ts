import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirects from './middleware-redirects.json';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const fullPath = pathname + search;

  console.log('Checking path:', fullPath); // Debug log

  // Find the first matching redirect
  const match = redirects.find(
    (r: { source: string; destination: string }) => {
      // Remove domain if present in the source
      const sourcePath = r.source.replace('https://www.whpjewellers.com', '');
      console.log('Comparing with:', sourcePath); // Debug log
      return sourcePath === fullPath;
    }
  );

  if (match) {
    console.log('Found match:', match); // Debug log
    const url = request.nextUrl.clone();
    const [path, query] = match.destination.split('?');
    url.pathname = path;
    url.search = query ? `?${query}` : '';
    return NextResponse.redirect(url, 308);
  }

  console.log('No match found'); // Debug log
  return NextResponse.next();
}

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
