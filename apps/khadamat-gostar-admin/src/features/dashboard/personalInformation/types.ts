export type EmployeeProfileInfo = {
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
  father_name?: string | null;
  date_of_birth?: string | null;
  birthCertificateNumber?: string | null;
  passport_number?: string | null;
  password?: string | null;
  maratial_status?: string | null;
  gender?: string | null;
  mobile?: string | null;
  present_address?: string | null;
  photo?: string | null;
  photo_a_path?: string | null;
};

export type EmployeeShowResponse = {
  info?: EmployeeProfileInfo | null;
  description?: string | null;
  type?: string | null;
  doTime?: string | null;
  statusCode?: number;
};

export type PersonalInformationFormValues = {
  id: string;
  first_name: string;
  last_name: string;
  father_name: string;
  date_of_birth: string;
  birthCertificateNumber: string;
  passport_number: string;
  password: string;
  maratial_status: string;
  gender: string;
  mobile: string;
  present_address: string;
};

export type EmployeeUpdatePayload = {
  id: number;
  maratial_status: string;
  mobile: string;
  password: string;
  present_address: string;
};
