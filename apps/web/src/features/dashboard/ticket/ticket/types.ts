export interface TicketSearchParams {
  fromDate?: string;
  toDate?: string;
  globalSearch?: string;
}

export interface TicketResponseDetail {
  id: number;
  responsibleId: number;
  text: string;
  urlFile: string | null;
  isSender: boolean;
  senderFullName: string;
  entryDateTime: string;
  attachmentFiles: string;
}

export interface TicketApiItem {
  id: number;
  lastUpdateDateTime: string | null;
  senderFullName: string;
  senderId: number;
  stateTitle: string;
  stateId: number;
  assignedToUserId: number;
  created: string;
  responseDetail: TicketResponseDetail[];
}

export interface TicketRow extends TicketApiItem {
  responseCount: number;
  firstMessage: string;
  lastMessage: string;
  lastResponderFullName: string;
  lastResponseDate: string;
  hasAttachment: boolean;
}

export interface TicketListResponse {
  info?: TicketApiItem[];
  data?: TicketApiItem[];
  items?: TicketApiItem[];
  total?: number;
  totalCount?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  result?: {
    info?: TicketApiItem[];
    data?: TicketApiItem[];
    items?: TicketApiItem[];
    total?: number;
    totalCount?: number;
    recordsTotal?: number;
    recordsFiltered?: number;
  };
}
