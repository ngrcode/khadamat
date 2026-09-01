// domain/types.ts

export interface TerminalPerformance {
  id: string;
  branchCode: string;
  administrationCode: string;
  areaCode: string;
  installDate: string;
  accountId: string;
  nationalId: string;
}

export interface TerminalPerformanceResponse {
  Items: TerminalPerformance[];
  TotalCount: number;
}

export interface SearchParams {
  branchCode?: string;
  administrationCode?: string;
  areaCode?: string;
  installDate?: string;
  accountId?: string;
  nationalId?: string;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}