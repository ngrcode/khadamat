import { customInstance } from '@/configs/httpService/orval/customInstance';
import type { SubmitTicketResponse } from '@/generated/api/model';

export interface CreateTicketForUserPayload {
  assignUserId: number;
  text: string;
}

export const createTicketForUser = ({
  assignUserId,
  text,
}: CreateTicketForUserPayload) =>
  customInstance<SubmitTicketResponse>({
    url: '/api/1.0/Ticket/Create',
    method: 'POST',
    params: {
      text,
      assignUserId,
    },
  });
