import { TicketApiItem, TicketListResponse, TicketRow } from './types';

const getTicketItems = (data: TicketListResponse | TicketApiItem[] | any): TicketApiItem[] => {
  if (Array.isArray(data)) return data;

  return (
    data?.info ??
    data?.data ??
    data?.items ??
    data?.result?.info ??
    data?.result?.data ??
    data?.result?.items ??
    []
  );
};

export const getTicketTotalCount = (
  data: TicketListResponse | TicketApiItem[] | any,
  items: TicketApiItem[]
) => {
  if (Array.isArray(data)) return items.length;

  return (
    data?.recordsTotal ??
    data?.recordsFiltered ??
    data?.totalCount ??
    data?.total ??
    data?.result?.recordsTotal ??
    data?.result?.recordsFiltered ??
    data?.result?.totalCount ??
    data?.result?.total ??
    items.length
  );
};

export const mapTicketItem = (ticket: TicketApiItem): TicketRow => {
  const responseDetail = Array.isArray(ticket.responseDetail)
    ? ticket.responseDetail
    : [];
  const firstResponse = responseDetail[0];
  const lastResponse = responseDetail[responseDetail.length - 1];

  return {
    ...ticket,
    responseDetail,
    responseCount: responseDetail.length,
    firstMessage: firstResponse?.text ?? '',
    lastMessage: lastResponse?.text ?? '',
    lastResponderFullName:
      lastResponse?.senderFullName ?? ticket.senderFullName ?? '',
    lastResponseDate:
      ticket.lastUpdateDateTime ?? lastResponse?.entryDateTime ?? ticket.created ?? '',
    hasAttachment: responseDetail.some(
      (item) => Boolean(item.urlFile) || Boolean(item.attachmentFiles)
    ),
  };
};

export const mapTicketItems = (
  data: TicketListResponse | TicketApiItem[] | any
) => getTicketItems(data).map(mapTicketItem);
