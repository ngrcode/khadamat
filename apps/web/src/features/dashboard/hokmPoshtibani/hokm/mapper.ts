import { t } from '@/components';
import { HokmApiItem, HokmListResponse, HokmRow } from './types';

const normalizeText = (value?: string | number | null) =>
  value === undefined || value === null ? null : String(value).replace(/\s+/g, ' ').trim();

export const getHokmItems = (
  data: HokmListResponse | HokmApiItem[] | any,
): HokmApiItem[] => {
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

export const getHokmTotalCount = (
  data: HokmListResponse | HokmApiItem[] | any,
  items: HokmApiItem[],
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

export const mapHokmItem = (item: HokmApiItem, index: number): HokmRow => {
  const title = normalizeText(item.title);
  const year = normalizeText(item.year);

  return {
    ...item,
    id: year || title || String(index + 1),
    title: title || null,
    year: item.year ?? null,
    titleLabel: title || t('noData'),
    yearLabel: year || t('noData'),
  };
};

export const mapHokmItems = (
  data: HokmListResponse | HokmApiItem[] | any,
) => getHokmItems(data).map(mapHokmItem);
