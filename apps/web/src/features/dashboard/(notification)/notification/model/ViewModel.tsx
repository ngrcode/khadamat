import * as Yup from 'yup';
import { formatDateFields } from '@/utils/formatDateFields';
import { WageMonthlySearchParams } from '../types';
import { QUERY_NOTIFICATION } from '@/constants/endPoint/notification';
import { selectFunction } from '../mapper';

export const DATE_FIELDS = [];

export const getInitialValues = () => ({});

export const getValidationSchema = () =>
  Yup.object({});

export const buildQueryParams = (
  
) => ({});

export const buildQueryKey = (
  search: WageMonthlySearchParams,
) => [
    QUERY_NOTIFICATION,
    search,
  ];

export const formatSearchDates = (
  search: WageMonthlySearchParams
): WageMonthlySearchParams => formatDateFields(search, DATE_FIELDS);

export const selectData = (response: any) => {
  const result = selectFunction(response);

  return {
    items: result?.Items ?? [],
    totalCount: result?.TotalCount ?? 0,
  };
};
