// viewModel.ts
import * as Yup from 'yup';
import { formatDateFields } from '@/utils/formatDateFields';
import { WageMonthlySearchParams } from '../types';
import { QUERY_REQUESTLEAVE } from '@/constants/endPoint/requestLeave';

export const DATE_FIELDS = [];

export const getInitialValues = () => ({});

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
  { data: 'first_name', name: '', searchable: true, orderable: true },
  { data: 'last_name', name: '', searchable: true, orderable: true },
  { data: 'employment_id', name: '', searchable: true, orderable: true },
  { data: 'userId', name: '', searchable: true, orderable: true },
  { data: 'terminalId', name: '', searchable: true, orderable: true },
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
  search: WageMonthlySearchParams,
  pagination: { pageIndex: number; pageSize: number },
  extra?: any[]
) => {
  return [
    QUERY_REQUESTLEAVE,
    search,
    pagination.pageIndex,
    pagination.pageSize,
    ...(extra || []),
  ];
};

export const formatSearchDates = (
  search: WageMonthlySearchParams
): WageMonthlySearchParams => formatDateFields(search, DATE_FIELDS);

// ✅ selectData اصلاح شده با پشتیبانی از hasMore
export const selectData = (response: any, pageSize: number = 10) => {
  // حالت DataTables استاندارد
  if (response?.data && Array.isArray(response.data)) {
    const items = response.data;
    const total = response.recordsTotal || response.recordsFiltered || 0;
    return {
      items: items,
      totalCount: total,
      hasMore: items.length >= pageSize
    };
  }

  // حالت آرایه
  if (Array.isArray(response)) {
    const items = response;
    const total = items.length > 0 ? Number(items[0]?.rowCount ?? 0) : items.length;
    return {
      items: items,
      totalCount: total || 500, // اگر total نداشتیم، 500 به عنوان fallback
      hasMore: items.length >= pageSize
    };
  }

  // حالت result
  if (response?.result) {
    const items = response.result.info || response.result.data || [];
    const total = response.result.totalCount || response.result.total ||
      (items.length > 0 ? Number(items[0]?.rowCount ?? 0) : 0);
    return {
      items: items,
      totalCount: total || 500,
      hasMore: items.length >= pageSize
    };
  }

  // حالت data
  if (response?.data) {
    const items = response.data;
    return {
      items: items,
      totalCount: response.totalCount || response.total || items.length,
      hasMore: items.length >= pageSize
    };
  }

  // حالت پیش‌فرض
  return {
    items: response?.items || response?.data || [],
    totalCount: response?.totalCount || response?.total || 0,
    hasMore: false
  };
};
