import { NextRequest, NextResponse } from 'next/server';

const getBackendUrl = ({
  text,
  ticketId,
  assignUserId,
}: {
  text: string;
  ticketId: number;
  assignUserId?: number;
}) => {
  const baseUrl =
    process.env.TICKET_BASE_URL ?? 'https://portal2.kh-poshtibani.ir/';
  const url = new URL('api/1/Ticket/CreateResponse', baseUrl);
  url.searchParams.set('text', text);
  url.searchParams.set('ticketId', String(ticketId));

  if (Number.isFinite(assignUserId)) {
    url.searchParams.set('assignUserId', String(assignUserId));
  }

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
    const body = await request.json().catch(() => ({}));
    const text = String(body?.text ?? '').trim();
    const ticketId = Number(body?.ticketId);
    const assignUserId =
      body?.assignUserId === undefined || body?.assignUserId === null
        ? undefined
        : Number(body.assignUserId);

    if (!text) {
      return NextResponse.json(
        { message: 'text is required' },
        { status: 400 },
      );
    }

    if (!Number.isFinite(ticketId)) {
      return NextResponse.json(
        { message: 'ticketId is required' },
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

    const backendResponse = await fetch(
      getBackendUrl({ text, ticketId, assignUserId }),
      {
        method: 'POST',
        headers,
        cache: 'no-store',
      },
    );
    const data = await readBackendData(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: getErrorMessage(data, 'CreateResponse request failed') },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(typeof data === 'string' ? { info: data } : data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? 'CreateResponse request failed' },
      { status: 500 },
    );
  }
}
