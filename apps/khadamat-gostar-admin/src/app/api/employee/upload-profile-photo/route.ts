import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = () => {
  const baseUrl =
    process.env.EMPLOYEE_BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';

  return new URL('api/1/Employee/UploadProfilePhoto', baseUrl).toString();
};

const getErrorMessage = (data: any, fallback: string) =>
  data?.reason ?? data?.title ?? data?.message ?? data?.error ?? fallback;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = request.cookies.get('token')?.value;
    const headers = new Headers({
      accept: 'application/json',
    });

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const backendResponse = await fetch(getBackendUrl(), {
      method: 'POST',
      headers,
      body: formData,
      cache: 'no-store',
    });

    const contentType = backendResponse.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
      ? await backendResponse.json().catch(() => ({}))
      : await backendResponse.text();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: getErrorMessage(data, 'Profile photo upload failed') },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data ?? {});
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'Profile photo upload failed' },
      { status: 500 },
    );
  }
}
