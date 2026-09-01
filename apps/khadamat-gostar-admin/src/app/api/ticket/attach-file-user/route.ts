import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = (ticketId: string) => {
  const baseUrl =
    process.env.TICKET_BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';
  const url = new URL('api/1/Ticket/attachFileUser', baseUrl);
  url.searchParams.set('ticketId', ticketId);

  return url.toString();
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
  data?.reason ?? data?.title ?? data?.message ?? data?.error ?? data?.description ?? fallback;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const ticketId = String(formData.get('ticketId') ?? '').trim();
    const file = formData.get('file');

    if (!ticketId) {
      return NextResponse.json(
        { message: 'ticketId is required' },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: 'file is required' },
        { status: 400 },
      );
    }

    const backendFormData = new FormData();
    backendFormData.append('ticketId', ticketId);
    backendFormData.append('file', file);

    const token = request.cookies.get('token')?.value;
    const headers = new Headers({
      accept: 'application/json',
    });

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const backendResponse = await fetch(getBackendUrl(ticketId), {
      method: 'POST',
      headers,
      body: backendFormData,
      cache: 'no-store',
    });
    const data = await readBackendData(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: getErrorMessage(data, 'attachFileUser request failed') },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(typeof data === 'string' ? { info: data } : data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'attachFileUser request failed' },
      { status: 500 },
    );
  }
}
