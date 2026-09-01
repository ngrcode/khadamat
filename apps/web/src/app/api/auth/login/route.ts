import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = () => {
  const baseUrl =
    process.env.BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';
  return new URL('api/1/Connect/token', baseUrl).toString();
};

const getErrorMessage = (data: any, fallback: string) =>
  data?.reason ?? data?.title ?? data?.message ?? data?.error ?? fallback;

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

    const contentType = backendResponse.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
      ? await backendResponse.json()
      : { message: await backendResponse.text() };

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

    // Do NOT Set-Cookie here. On IIS/HTTP a Secure cookie can be created and then
    // the browser will not send it, causing a login↔dashboard refresh loop.
    // The client sets a non-Secure cookie from accessToken.
    return NextResponse.json({
      isAdmin: data?.isAdmin ?? data?.object?.isAdmin ?? false,
      panelMenu: data?.panelMenu ?? data?.object?.panelMenu ?? '',
      userName,
      firstLogin: data?.firstLogin ?? data?.object?.firstLogin ?? false,
      accessToken,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'Login failed' },
      { status: 500 },
    );
  }
}
