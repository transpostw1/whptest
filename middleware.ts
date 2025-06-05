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

  // Test with a simple hardcoded redirect first
  if (pathname === '/test-redirect') {
    return NextResponse.redirect(new URL('/products?url=pc-mangalsutra', request.url));
  }

  // Find the first matching redirect
  const match = redirects.find(
    (r: { source: string; destination: string }) => {
      // Remove domain if present in the source
      const sourcePath = r.source.replace('https://www.whpjewellers.com', '');
      return sourcePath === fullPath;
    }
  );

  if (match) {
    const url = request.nextUrl.clone();
    const [path, query] = match.destination.split('?');
    url.pathname = path;
    url.search = query ? `?${query}` : '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Update matcher to be more specific and include test path
export const config = {
  matcher: [
    '/test-redirect',
    '/jewellery-for-women/:path*',
    '/product/:path*',
    '/prime-products/:path*',
    '/section/:path*',
    '/products/:path*'
  ]
}; 
