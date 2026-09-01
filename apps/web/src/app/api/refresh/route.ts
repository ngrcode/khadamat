import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const getRefreshUrl = () => {
  const baseUrl = process.env.BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';
  return new URL('v1/auth/refreshToken', baseUrl).toString();
};

const isSecureRequest = (_request: NextRequest) => {
  if (process.env.COOKIE_SECURE === 'true') return true;
  if (process.env.COOKIE_SECURE === 'false') return false;
  return false;
};

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const oldRefreshToken =
    cookieStore.get('refreshToken')?.value ?? cookieStore.get('reshToken')?.value;

  if (!oldRefreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  try {
    const response = await fetch(getRefreshUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieStore.get('token')?.value || ''}`,
      },
      body: JSON.stringify({ refreshToken: oldRefreshToken }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Refresh failed' }, { status: 401 });
    }

    const data = await response.json();
    const newAccessToken =
      data.token ?? data.access_token ?? data.object?.token ?? data.object?.access_token;

    if (!newAccessToken) {
      return NextResponse.json({ message: 'No access token in response' }, { status: 500 });
    }

    const secure = isSecureRequest(request);
    const nextResponse = NextResponse.json({ ok: true });
    nextResponse.cookies.set('token', newAccessToken, {
      httpOnly: false,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    const newRefreshToken = data.refreshToken ?? data.refresh_token;
    if (newRefreshToken) {
      nextResponse.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json({ message: 'Refresh error' }, { status: 500 });
  }
}
