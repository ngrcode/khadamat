export type HumanResourcesModalKey = 'hokm-detail' | 'installment-deduction';

export type HokmDetailFormValues = {
  year: string;
};

export type HokmDetailField = {
  value?: string | number | null;
  dictionaryTitle?: string | null;
};

export type HokmDetailInfo = {
  personnelInfo?: HokmDetailField[] | null;
  salaryBenefit?: HokmDetailField[] | null;
  loanInfo?: HokmDetailField[] | null;
  deduction?: HokmDetailField[] | null;
  efficiency?: HokmDetailField[] | null;
  sumDeduction?: string | number | null;
  sumLoan?: string | number | null;
  sumSalary?: string | number | null;
  payable?: string | number | null;
  sumInstallmentsLoan?: string | number | null;
};

export type HokmDetailResponse = {
  info: HokmDetailInfo | string | null;
  doTime?: string | null;
  description?: string | null;
  type?: string | null;
};

export type InstallmentDeductionFormValues = {
  fullName: string;
  facilities: string;
  organizationName: string;
  branchName: string;
};
