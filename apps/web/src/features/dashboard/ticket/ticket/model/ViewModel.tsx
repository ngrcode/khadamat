// viewModel.ts
import * as Yup from 'yup';
import { formatDateFields } from '@/utils/formatDateFields';
import { TicketSearchParams } from '../types';
import { QUERY_TICKET } from '@/constants/endPoint/ticket';
import { getTicketTotalCount, mapTicketItems } from '../mapper';

export const DATE_FIELDS = [];

export const getInitialValues = (): TicketSearchParams => ({});

export const getValidationSchema = () =>
  Yup.object({});

export interface DataTablesRequest {
  draw: number;
  start: number;
  length: number;
  search: {
    value: string;
    regex: boolean;
  };
  columns: Array<{
    data: string;
    name: string;
    searchable: boolean;
    orderable: boolean;
    search: {
      value: string;
      regex: boolean;
    };
  }>;
  order: Array<{
    column: number;
    dir: 'asc' | 'desc';
  }>;
}

const DEFAULT_COLUMNS = [
  { data: 'id', name: '', searchable: true, orderable: true },
  { data: 'senderFullName', name: '', searchable: true, orderable: true },
  { data: 'senderId', name: '', searchable: true, orderable: true },
  { data: 'stateTitle', name: '', searchable: true, orderable: true },
  { data: 'stateId', name: '', searchable: true, orderable: true },
  { data: 'assignedToUserId', name: '', searchable: true, orderable: true },
  { data: 'created', name: '', searchable: true, orderable: true },
  { data: 'lastUpdateDateTime', name: '', searchable: true, orderable: true },
];

export const buildQueryParams = (
  search: any,
  pagination: { pageIndex: number; pageSize: number },
  extra?: { sortField?: any; sortOrder?: 'asc' | 'desc'; filters?: Record<string, any> },
  method?: 'get' | 'post'
): DataTablesRequest => {

  const start = (pagination.pageIndex - 1) * pagination.pageSize;
  const length = pagination.pageSize;

  const globalSearch = search?.globalSearch || search?.search?.value || '';

  const columns = DEFAULT_COLUMNS.map((col) => {
    const filterValue = extra?.filters?.[col.data] || '';
    return {
      ...col,
      search: {
        value: filterValue,
        regex: false,
      },
    };
  });

  let order: Array<{ column: number; dir: 'asc' | 'desc' }> = [];

  if (extra?.sortField && extra?.sortOrder) {
    const columnIndex = DEFAULT_COLUMNS.findIndex(col => col.data === extra.sortField);
    if (columnIndex !== -1) {
      order = [{ column: columnIndex, dir: extra.sortOrder }];
    }
  }

  if (order.length === 0) {
    order = [{ column: 0, dir: 'asc' }];
  }

  return {
    draw: 1,
    start,
    length,
    search: {
      value: globalSearch,
      regex: false,
    },
    columns,
    order,
  };
};

export const buildQueryKey = (
  search: TicketSearchParams,
  pagination: { pageIndex: number; pageSize: number },
  extra?: any[]
) => {
  return [
    QUERY_TICKET,
    search,
    pagination.pageIndex,
    pagination.pageSize,
    ...(extra || []),
  ];
};

export const formatSearchDates = (
  search: TicketSearchParams
): TicketSearchParams => formatDateFields(search, DATE_FIELDS);

export const selectData = (response: any, pageSize: number = 10) => {
  if (!response) {
    return {
      items: [],
      totalCount: 0,
      hasMore: false,
    };
  }

  const items = mapTicketItems(response);
  const totalCount = getTicketTotalCount(response, items);

  return {
    items,
    totalCount,
    hasMore: items.length >= pageSize,
  };
};
