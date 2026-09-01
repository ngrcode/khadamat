import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = (id: string) => {
  const baseUrl =
    process.env.EMPLOYEE_BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';
  const url = new URL('api/1/Employee/Show', baseUrl);
  url.searchParams.set('id', id);

  return url.toString();
};

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')?.trim();

    if (!id) {
      return NextResponse.json(
        { message: 'id is required' },
        { status: 400 },
      );
    }

    const token = request.cookies.get('token')?.value;
    const headers = new Headers({
      accept: 'application/json',
    });

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const backendResponse = await fetch(getBackendUrl(id), {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    const contentType = backendResponse.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
      ? await backendResponse.json().catch(() => ({}))
      : await backendResponse.text();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: typeof data === 'string' ? data : data?.message },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data ?? {});
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'Employee show request failed' },
      { status: 500 },
    );
  }
}
