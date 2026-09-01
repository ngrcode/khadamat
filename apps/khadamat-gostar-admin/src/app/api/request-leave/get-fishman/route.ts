import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = (year: string, month: string) => {
  const baseUrl =
    process.env.FISHMAN_BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';
  const url = new URL('api/1/RequestLeave/GetFishman', baseUrl);
  url.searchParams.set('year', year);
  url.searchParams.set('month', month);

  return url.toString();
};

export async function POST(request: NextRequest) {
  try {
    const year = request.nextUrl.searchParams.get('year')?.trim();
    const month = request.nextUrl.searchParams.get('month')?.trim();

    if (!year || !month) {
      return NextResponse.json(
        { message: 'year and month are required' },
        { status: 400 },
      );
    }

    const token = request.cookies.get('token')?.value;
    const headers = new Headers({
      accept: 'text/plain',
    });

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const backendResponse = await fetch(getBackendUrl(year, month), {
      method: 'POST',
      headers,
      body: '',
      cache: 'no-store',
    });

    const responseHeaders = new Headers();
    const contentType = backendResponse.headers.get('content-type');
    const contentDisposition = backendResponse.headers.get('content-disposition');

    if (contentType) {
      responseHeaders.set('content-type', contentType);
    }

    if (contentDisposition) {
      responseHeaders.set('content-disposition', contentDisposition);
    }

    return new NextResponse(await backendResponse.arrayBuffer(), {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'GetFishman request failed' },
      { status: 500 },
    );
  }
}
