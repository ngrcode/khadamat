import { NextResponse } from 'next/server';

export type LogoutCookieConfig = {
  names?: string[];
};

const DEFAULT_COOKIE_NAMES = ['token', 'refreshToken', 'reshToken'];

export function createLogoutHandler(config: LogoutCookieConfig = {}) {
  const cookieNames = config.names ?? DEFAULT_COOKIE_NAMES;

  return async function POST() {
    const response = NextResponse.json({ ok: true });

    cookieNames.forEach((name) => {
      response.cookies.set(name, '', {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      });
    });

    return response;
  };
}
