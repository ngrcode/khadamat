import { t } from '@/components';
import {
  BarbershopApiItem,
  BarbershopListResponse,
  BarbershopRow,
} from './types';

const normalizeText = (value?: string | null) => value?.replace(/\s+/g, ' ').trim() || null;

const getBarbershopItems = (
  data: BarbershopListResponse | BarbershopApiItem[] | any,
): BarbershopApiItem[] => {
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

export const getBarbershopTotalCount = (
  data: BarbershopListResponse | BarbershopApiItem[] | any,
  items: BarbershopApiItem[],
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

export const getNumericBooleanLabel = (value?: number | boolean | null) => {
  if (value === undefined || value === null) return t('noData');
  return value === 1 || value === true ? t('yes') : t('no');
};

export const getEmployeeStatusLabel = (status?: number | null) => {
  if (status === 1) return t('statusActive');
  if (status === 0) return t('statusInactive');

  return status === undefined || status === null ? t('noData') : String(status);
};

export const mapBarbershopItem = (item: BarbershopApiItem): BarbershopRow => {
  const firstName = normalizeText(item.first_name) ?? '';
  const lastName = normalizeText(item.last_name) ?? '';
  const fullName = `${firstName} ${lastName}`.trim() || t('noData');

  return {
    ...item,
    first_name: firstName || null,
    last_name: lastName || null,
    father_name: normalizeText(item.father_name),
    center_names: normalizeText(item.center_names),
    unit_name: normalizeText(item.unit_name),
    fullName,
    statusLabel: getEmployeeStatusLabel(item.status),
    barberShopLabel: getNumericBooleanLabel(item.barberShop),
    velenjakReservationLabel: getNumericBooleanLabel(item.velenjakReservation),
    firstLoginLabel: getNumericBooleanLabel(item.firstLogin),
    ticketCreateLabel: getNumericBooleanLabel(item.ticketCreate),
  };
};

export const mapBarbershopItems = (
  data: BarbershopListResponse | BarbershopApiItem[] | any,
) => getBarbershopItems(data).map(mapBarbershopItem);
