import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = () => {
  const baseUrl =
    process.env.NOTIFICATION_BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';

  return new URL('api/1/NotificationPanel/Active', baseUrl).toString();
};

const readBackendData = async (response: Response) => {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const getErrorMessage = (data: any, fallback: string) =>
  data?.reason ??
  data?.title ??
  data?.message ??
  data?.error ??
  data?.description ??
  fallback;

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const headers = new Headers({
      accept: 'application/json',
    });

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const backendResponse = await fetch(getBackendUrl(), {
      method: 'GET',
      headers,
      cache: 'no-store',
    });
    const data = await readBackendData(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: getErrorMessage(data, 'NotificationPanel active failed') },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(typeof data === 'string' ? { info: data } : data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'NotificationPanel active failed' },
      { status: 500 },
    );
  }
}
