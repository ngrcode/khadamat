import { type NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api')) return NextResponse.next();

  const token = request.cookies.get('token')?.value;
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost ?? request.headers.get('host') ?? request.nextUrl.host;
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const proto = forwardedProto ?? (request.nextUrl.protocol === 'https:' ? 'https' : 'http');
  const origin = process.env.PUBLIC_APP_URL ?? `${proto}://${host}`;
  if (token && (pathname === '/' || pathname === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', origin));
  }
  if (!token && pathname === '/') return NextResponse.redirect(new URL('/login', origin));
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
