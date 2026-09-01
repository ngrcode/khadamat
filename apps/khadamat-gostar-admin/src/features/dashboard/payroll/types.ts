export type PayrollFormValues = {
  year: string;
  month: string;
};

export type PayrollStatementField = {
  value?: string | number | null;
  dictionaryTitle?: string | null;
};

export type PayrollStatementInfo = {
  personnelInfo?: PayrollStatementField[] | null;
  salaryBenefit?: PayrollStatementField[] | null;
  loanInfo?: PayrollStatementField[] | null;
  deduction?: PayrollStatementField[] | null;
  efficiency?: PayrollStatementField[] | null;
  sumDeduction?: string | number | null;
  sumLoan?: string | number | null;
  sumSalary?: string | number | null;
  payable?: string | number | null;
  sumInstallmentsLoan?: string | number | null;
};

export type PayrollStatementResponse = {
  info: PayrollStatementInfo | string | null;
  doTime?: string | null;
  description?: string | null;
  type?: string | null;
};
