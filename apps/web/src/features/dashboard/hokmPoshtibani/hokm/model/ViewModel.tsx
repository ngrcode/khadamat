import * as Yup from 'yup';
import { formatDateFields } from '@/utils/formatDateFields';
import { QUERY_HOKM } from '@/constants/endPoint/hokm';
import { getHokmItems, getHokmTotalCount, mapHokmItems } from '../mapper';
import type { HokmSearchParams } from '../types';

export const DATE_FIELDS: Array<keyof HokmSearchParams> = [];

export const getInitialValues = (): HokmSearchParams => ({});

export const getValidationSchema = () => Yup.object({});

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
  { data: 'title', name: '', searchable: true, orderable: true },
  { data: 'year', name: '', searchable: true, orderable: true },
];

export const buildQueryParams = (
  search: HokmSearchParams,
  pagination: { pageIndex: number; pageSize: number },
  extra?: { sortField?: string; sortOrder?: 'asc' | 'desc'; filters?: Record<string, any> },
): DataTablesRequest => {
  const start = (pagination.pageIndex - 1) * pagination.pageSize;
  const length = pagination.pageSize;
  const globalSearch = (search as any)?.globalSearch || (search as any)?.search?.value || '';

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

  const sortColumnIndex = extra?.sortField
    ? DEFAULT_COLUMNS.findIndex((col) => col.data === extra.sortField)
    : -1;

  return {
    draw: 1,
    start,
    length,
    search: {
      value: globalSearch,
      regex: false,
    },
    columns,
    order: [
      {
        column: sortColumnIndex >= 0 ? sortColumnIndex : 1,
        dir: extra?.sortOrder || 'desc',
      },
    ],
  };
};

export const buildQueryKey = (
  search: HokmSearchParams,
  pagination: { pageIndex: number; pageSize: number },
  extra?: any[],
) => [
  QUERY_HOKM,
  search,
  pagination.pageIndex,
  pagination.pageSize,
  ...(extra || []),
];

export const formatSearchDates = (
  search: HokmSearchParams,
): HokmSearchParams => formatDateFields(search, DATE_FIELDS);

export const selectData = (response: any, pageSize: number = 10) => {
  const rawItems = getHokmItems(response);
  const items = mapHokmItems(response);
  const totalCount = getHokmTotalCount(response, rawItems);

  return {
    items,
    totalCount,
    hasMore: items.length >= pageSize,
  };
};
