export interface WageMonthlySearchParams {
  fromDate?: string;
  toDate?: string;
}

export interface WageKeepRow {
  agency: string;
  branch: string;
  guildCode: string;
  jobTitle: string;
  keepWage: string;
  keepWageTitle: string;
  merchantName: string;
  province: string;
  terminalId: string;
  transactionAmount: number;
  transactionCount: number;
}
