import { NextRequest, NextResponse } from 'next/server';

const TOKEN_COOKIE_NAME = 'token';
const REFRESH_COOKIE_NAME = 'refreshToken';

const getBackendUrl = () => {
  const baseUrl = process.env.BASE_URL ?? 'http://62.60.165.23:50051/';
  return new URL('api/1/Connect/token', baseUrl).toString();
};

const getAccountShowUrl = (token: string) => {
  const baseUrl =
    process.env.ACCOUNT_BASE_URL ??
    process.env.BASE_URL ??
    'https://portal2.kh-poshtibani.ir/';
  const url = new URL('api/1/Account/Show', baseUrl);
  url.searchParams.set('token', token);

  return url.toString();
};

const getErrorMessage = (data: any, fallback: string) =>
  data?.reason ?? data?.title ?? data?.message ?? data?.error ?? fallback;

const isSecureRequest = (_request: NextRequest) => {
  if (process.env.COOKIE_SECURE === 'true') return true;
  if (process.env.COOKIE_SECURE === 'false') return false;
  return false;
};

const readBackendData = async (response: Response) => {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userName = String(body?.userName ?? '').trim();
    const password = String(body?.password ?? '');

    if (!userName || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 },
      );
    }

    const backendResponse = await fetch(getBackendUrl(), {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
      cache: 'no-store',
    });

    const data = await readBackendData(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: getErrorMessage(data, 'Login failed') },
        { status: backendResponse.status },
      );
    }

    const accessToken =
      data?.access_token ??
      data?.token ??
      data?.object?.access_token ??
      data?.object?.token;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Token was not received' },
        { status: 502 },
      );
    }

    const refreshToken =
      data?.refreshToken ??
      data?.refresh_token ??
      data?.object?.refreshToken ??
      data?.object?.refresh_token;

    const accountResponse = await fetch(getAccountShowUrl(accessToken), {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });
    const accountData = await readBackendData(accountResponse);

    if (!accountResponse.ok) {
      return NextResponse.json(
        { message: getErrorMessage(accountData, 'Account show failed') },
        { status: accountResponse.status },
      );
    }

    const accountResult = accountData?.result ?? accountData ?? {};
    const accountInfo = accountResult?.info ?? accountData?.info ?? null;

    const response = NextResponse.json({
      isAdmin: data?.isAdmin ?? data?.object?.isAdmin ?? false,
      panelMenu: data?.panelMenu ?? data?.object?.panelMenu ?? '',
      userName,
      firstLogin:
        accountInfo?.firstLogin ??
        data?.firstLogin ??
        data?.object?.firstLogin ??
        false,
      accountShow: accountData,
      accountInfo,
    });

    const secure = isSecureRequest(request);

    response.cookies.set(TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: false,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    if (refreshToken) {
      response.cookies.set(REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'Login failed' },
      { status: 500 },
    );
  }
}
