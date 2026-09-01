export interface ExcelSearchParams {
  fromDate?: string;
  toDate?: string;
  globalSearch?: string;
}

export type WageMonthlySearchParams = ExcelSearchParams;

export interface ExcelApiItem {
  id?: number;
  month?: string | null;
  year?: string | null;
}

export interface ExcelRow extends ExcelApiItem {
  month?: string | null;
  year?: string | null;
  period?: string | null;
}

export interface ExcelListResponse {
  status?: string;
  info?: ExcelApiItem[];
  data?: ExcelApiItem[];
  items?: ExcelApiItem[];
  total?: number;
  totalCount?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  result?: {
    info?: ExcelApiItem[];
    data?: ExcelApiItem[];
    items?: ExcelApiItem[];
    total?: number;
    totalCount?: number;
    recordsTotal?: number;
    recordsFiltered?: number;
    statusCode?: number;
    doTime?: string | null;
    description?: string | null;
    type?: string | null;
  };
}
