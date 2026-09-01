export interface HokmSearchParams {
  fromDate?: string;
  toDate?: string;
}

export interface HokmApiItem {
  title?: string | null;
  year?: number | string | null;
}

export interface HokmRow extends HokmApiItem {
  id: string;
  titleLabel: string;
  yearLabel: string;
}

export interface HokmListResponse {
  info?: HokmApiItem[] | null;
  data?: HokmApiItem[] | null;
  items?: HokmApiItem[] | null;
  total?: number;
  totalCount?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  result?: {
    info?: HokmApiItem[] | null;
    data?: HokmApiItem[] | null;
    items?: HokmApiItem[] | null;
    total?: number;
    totalCount?: number;
    recordsTotal?: number;
    recordsFiltered?: number;
  } | null;
}
