import { customInstance } from '@/configs/httpService/orval/customInstance';
import type { SubmitTicketResponseDto, TicketDetailDto } from '@/generated/api/model';

export interface TicketDetailResult {
  info?: TicketDetailDto | null;
  statusCode?: number;
  doTime?: string | null;
  description?: string | null;
  type?: string | null;
}

export interface TicketDetailResponse {
  status?: string;
  result?: TicketDetailResult | null;
  info?: TicketDetailDto | null;
  statusCode?: number;
  doTime?: string | null;
  description?: string | null;
  type?: string | null;
}

export const ticketDetailQueryKey = (ticketId: number) =>
  ['ticket-detail', ticketId] as const;

export const getTicketDetail = (ticketId: number) =>
  customInstance<TicketDetailResponse>({
    url: '/api/1.0/Ticket/GetMyTicketDetail',
    method: 'GET',
    params: { ticketId },
  });

export const createTicketResponse = ({
  ticketId,
  text,
}: {
  ticketId: number;
  text: string;
}) =>
  customInstance<SubmitTicketResponseDto>({
    url: '/api/1.0/Ticket/CreateResponse',
    method: 'POST',
    params: {
      ticketId,
      text,
    },
  });

export const attachTicketFile = ({
  ticketId,
  file,
}: {
  ticketId: number;
  file: File;
}) => {
  const formData = new FormData();
  formData.append('file', file);

  return customInstance<void>({
    url: '/api/1.0/Ticket/attachFile',
    method: 'POST',
    params: { ticketId },
    data: formData,
  });
};

export const selectTicketDetail = (response?: TicketDetailResponse | null) =>
  response?.result?.info ?? response?.info ?? null;
