import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirects from './middleware-redirects.json';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const fullPath = pathname + search;

  // Find the first matching redirect
  const match = redirects.find(
    (r: { source: string; destination: string }) => r.source === fullPath
  );

  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = match.destination.split('?')[0];
    url.search = match.destination.split('?')[1] ? '?' + match.destination.split('?')[1] : '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 
