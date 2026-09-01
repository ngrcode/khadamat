import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

const getBackendUrl = (path: string[], search: string) => {
  const baseUrl = process.env.BASE_URL ?? 'http://62.60.165.23:50051/';
  const url = new URL(path.join('/'), baseUrl);
  url.search = search;
  return url;
};

const buildHeaders = (request: NextRequest) => {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (!HOP_BY_HOP_HEADERS.has(normalizedKey) && normalizedKey !== 'cookie') {
      headers.set(key, value);
    }
  });

  headers.set('accept', headers.get('accept') ?? 'application/json');

  const token = cookies().get('token')?.value;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

async function proxyRequest(
  request: NextRequest,
  context: { params: { path?: string[] } },
) {
  const path = context.params.path ?? [];
  const targetUrl = getBackendUrl(path, request.nextUrl.search);
  const method = request.method.toUpperCase();
  const hasBody = method !== 'GET' && method !== 'HEAD';

  const backendResponse = await fetch(targetUrl, {
    method,
    headers: buildHeaders(request),
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: 'no-store',
  });

  const responseHeaders = new Headers();
  backendResponse.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
