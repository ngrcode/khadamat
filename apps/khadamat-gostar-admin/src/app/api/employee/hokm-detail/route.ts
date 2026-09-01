import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = (year: string) => {
  const baseUrl =
    process.env.EMPLOYEE_BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';
  const url = new URL('api/1/Employee/HokmDetail', baseUrl);
  url.searchParams.set('year', year);

  return url.toString();
};

export async function GET(request: NextRequest) {
  try {
    const year = request.nextUrl.searchParams.get('year')?.trim();

    if (!year) {
      return NextResponse.json(
        { message: 'year is required' },
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

    const backendResponse = await fetch(getBackendUrl(year), {
      method: 'GET',
      headers,
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
      { message: error?.message ?? 'HokmDetail request failed' },
      { status: 500 },
    );
  }
}
