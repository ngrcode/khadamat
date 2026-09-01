export type TicketResponseDetail = {
  id?: number;
  responsibleId?: number;
  text?: string | null;
  urlFile?: string | null;
  isSender?: boolean;
  senderFullName?: string | null;
  entryDateTime?: string | null;
  attachmentFiles?: string | null;
};

export type MessageTicket = {
  id?: number;
  lastUpdateDateTime?: string | null;
  senderFullName?: string | null;
  senderId?: number;
  stateTitle?: string | null;
  stateId?: number;
  assignedToUserId?: number;
  created?: string | null;
  responseDetail?: TicketResponseDetail[] | null;
};

export type GetMyTicketResponse = {
  info?: MessageTicket[] | null;
  statusCode?: number;
  doTime?: string | null;
  description?: string | null;
  type?: string | null;
};

export type CreateTicketResponsePayload = {
  text: string;
  ticketId: number;
  assignUserId?: number;
};

export type AttachTicketFilePayload = {
  ticketId: number;
  file: File;
};

export type MessageResponseFormValues = {
  text: string;
};
