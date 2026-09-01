import { t } from '@/components';
import { persianMonthTranslationKeys } from '@/configs/language/months';
import { ExcelApiItem, ExcelListResponse, ExcelRow } from './types';

export const normalizeExcelValue = (value?: string | number | null) => {
  if (value === undefined || value === null) return null;

  const normalized = String(value).replace(/\s+/g, ' ').trim();
  return normalized || null;
};

export const getExcelMonthLabel = (month?: string | null) => {
  const normalized = normalizeExcelValue(month);
  if (!normalized) return t('noData');

  const translationKey = persianMonthTranslationKeys[normalized];
  return translationKey ? t(translationKey) : normalized;
};

export const getExcelYearLabel = (year?: string | null) =>
  normalizeExcelValue(year) ?? t('noData');

const getExcelItems = (
  data: ExcelListResponse | ExcelApiItem[] | any,
): ExcelApiItem[] => {
  if (Array.isArray(data)) return data;

  return (
    data?.result?.info ??
    data?.result?.data ??
    data?.result?.items ??
    data?.info ??
    data?.data ??
    data?.items ??
    []
  );
};

export const getExcelTotalCount = (
  data: ExcelListResponse | ExcelApiItem[] | any,
  items: ExcelApiItem[],
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

export const mapExcelItem = (item: ExcelApiItem): ExcelRow => {
  const month = normalizeExcelValue(item.month);
  const year = normalizeExcelValue(item.year);

  return {
    ...item,
    month,
    year,
    period: [month, year].filter(Boolean).join(' ') || null,
  };
};

export const mapExcelItems = (
  data: ExcelListResponse | ExcelApiItem[] | any,
) => getExcelItems(data).map(mapExcelItem);
