import { NextRequest, NextResponse } from 'next/server';

export type AuthMiddlewareConfig = {
  loginPath?: string;
  dashboardPath?: string;
  matcher?: string[];
  /** When false, dashboard auth is handled by client SessionGuard (needed for IIS/HTTP cookie issues). */
  enforceDashboardAuth?: boolean;
};

const DEFAULT_CONFIG: Required<AuthMiddlewareConfig> = {
  loginPath: '/login',
  dashboardPath: '/dashboard',
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  enforceDashboardAuth: true,
};

const getPublicOrigin = (request: NextRequest) => {
  if (process.env.PUBLIC_APP_URL) {
    return process.env.PUBLIC_APP_URL.replace(/\/$/, '');
  }

  const forwardedHost = request.headers
    .get('x-forwarded-host')
    ?.split(',')[0]
    ?.trim();
  const host =
    forwardedHost ||
    request.headers.get('host') ||
    request.nextUrl.host;

  const referer = request.headers.get('referer') ?? '';
  const forwardedProto = request.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim()
    .toLowerCase();

  let proto = 'http';
  if (referer.startsWith('https://')) {
    proto = 'https';
  } else if (referer.startsWith('http://')) {
    proto = 'http';
  } else if (forwardedProto === 'https' || forwardedProto === 'http') {
    proto = forwardedProto;
  } else if (request.nextUrl.protocol === 'https:') {
    proto = 'https';
  }

  if (!host) {
    return request.nextUrl.origin;
  }

  return `${proto}://${host}`;
};

export function createAuthMiddleware(config: AuthMiddlewareConfig = {}) {
  const { loginPath, dashboardPath, enforceDashboardAuth } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  return function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    const origin = getPublicOrigin(request);

    if (token && (pathname === '/' || pathname === loginPath)) {
      return NextResponse.redirect(new URL(dashboardPath, origin));
    }

    if (
      enforceDashboardAuth &&
      !token &&
      pathname.startsWith(dashboardPath)
    ) {
      const loginUrl = new URL(loginPath, origin);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!token && pathname === '/') {
      return NextResponse.redirect(new URL(loginPath, origin));
    }

    return NextResponse.next();
  };
}

export const middleware = createAuthMiddleware();

export const config = {
  matcher: DEFAULT_CONFIG.matcher,
};
