// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectsData from '../middleware-redirects.json'; 


interface RedirectItem {
    source: string;
    destination: string;
}


const redirectsMap: Record<string, string> = {};
(redirectsData as RedirectItem[]).forEach(item => {
    redirectsMap[item.source] = item.destination;
});

export async function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    
    
    if (pathname.startsWith('/products')) {
        return NextResponse.next();
    }
    
    
    const fullPath = pathname + search;
    
    console.log('🔄 Middleware checking:', fullPath);
    if (redirectsMap[fullPath]) {
        const redirectUrl = new URL(redirectsMap[fullPath], request.url);
        console.log(`✅ Redirecting: ${fullPath} -> ${redirectUrl.pathname}${redirectUrl.search}`);
        return NextResponse.redirect(redirectUrl, 301);
    }
    
    if (redirectsMap[pathname]) {
        const redirectUrl = new URL(redirectsMap[pathname], request.url);
        console.log(`✅ Redirecting: ${pathname} -> ${redirectUrl.pathname}${redirectUrl.search}`);
        return NextResponse.redirect(redirectUrl, 301);
    }
    
    console.log('❌ No redirect found for:', pathname);
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
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};