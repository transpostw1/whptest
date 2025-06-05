import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const redirects: { [key: string]: string } = {
  
  
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const redirectTo = redirects[pathname];

  if (redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url, 308); 
  }

  return NextResponse.next();
}