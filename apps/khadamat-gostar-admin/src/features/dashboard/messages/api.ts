import type {
  AttachTicketFilePayload,
  CreateTicketResponsePayload,
  GetMyTicketResponse,
} from './types';

const readErrorMessage = async (response: Response, fallback: string) => {
  const text = await response.text();

  if (!text) return fallback;

  try {
    const data = JSON.parse(text);

    return data?.message ?? data?.description ?? fallback;
  } catch {
    return text;
  }
};

const normalizeGetMyTicketResponse = (data: any): GetMyTicketResponse => {
  const response = data?.result ?? data ?? {};

  return {
    info: Array.isArray(response.info) ? response.info : [],
    statusCode: response.statusCode ?? data?.statusCode,
    doTime: response.doTime ?? data?.doTime,
    description: response.description ?? data?.description,
    type: response.type ?? data?.type,
  };
};

export const getMyTickets = async (): Promise<GetMyTicketResponse> => {
  const response = await fetch('/api/ticket/get-my-ticket', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'خطا در دریافت صندوق پیام‌ها'));
  }

  return normalizeGetMyTicketResponse(await response.json());
};

export const createTicketResponse = async (
  payload: CreateTicketResponsePayload,
) => {
  const response = await fetch('/api/ticket/create-response', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'خطا در ارسال پیام'));
  }

  return response.json().catch(() => ({}));
};

export const attachTicketFile = async ({
  ticketId,
  file,
}: AttachTicketFilePayload) => {
  const formData = new FormData();
  formData.append('ticketId', String(ticketId));
  formData.append('file', file);

  const response = await fetch('/api/ticket/attach-file-user', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'خطا در آپلود فایل پیام'));
  }

  return response.json().catch(() => ({}));
};
