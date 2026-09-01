type NullableString = string | null;

export interface EmployeeFormValues {
  id: string;
  employment_id: string;
  first_name: string;
  birthCertificateNumber: string;
  degreeEducation: string;
  last_name: string;
  father_name: string;
  nationality: string;
  passport_number: string;
  present_address: string;
  city: string;
  country_id: string;
  mobile: string;
  phone: string;
  unitId: number | null;
  center_names: string;
  email: string;
  designations_id: string;
  joining_date: string;
  status: number | string | null;
  gender: string;
  date_of_birth: string;
  personnelIdBank: string;
  maratial_status: string;
}

export interface EmployeeAdminPayload {
  id: NullableString;
  employment_id: NullableString;
  first_name: NullableString;
  birthCertificateNumber: NullableString;
  degreeEducation: NullableString;
  last_name: NullableString;
  father_name: NullableString;
  nationality: NullableString;
  passport_number: NullableString;
  present_address: NullableString;
  city: NullableString;
  country_id: NullableString;
  mobile: NullableString;
  phone: NullableString;
  unitId: number | null;
  center_names: NullableString;
  email: NullableString;
  designations_id: NullableString;
  joining_date: NullableString;
  status: number;
  gender: NullableString;
  date_of_birth: NullableString;
  personnelIdBank: NullableString;
  maratial_status: NullableString;
}

const toFormString = (value: unknown) =>
  value === undefined || value === null ? '' : String(value);

const toNullableString = (value: unknown): NullableString => {
  if (value === undefined || value === null) return null;

  if (
    typeof value === 'object' &&
    value !== null &&
    'format' in value &&
    typeof (value as { format?: unknown }).format === 'function'
  ) {
    return (value as { format: (format?: string) => string }).format('YYYY/MM/DD');
  }

  const stringValue = String(value).trim();
  return stringValue ? stringValue : null;
};

const toNullableNumber = (value: unknown): number | null => {
  if (value === undefined || value === null || value === '') return null;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const normalizeStatus = (value: unknown): number => {
  if (value === true || value === 'true') return 1;
  if (value === false || value === 'false') return 0;
  if (value === 'فعال' || value === 'Active') return 1;
  if (value === 'غیرفعال' || value === 'Inactive') return 0;

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 1;
};

const normalizeGender = (value: unknown): NullableString => {
  if (value === 'مرد' || value === 'Male') return '1';
  if (value === 'زن' || value === 'Female') return '2';
  return toNullableString(value);
};

const normalizeMaritalStatus = (value: unknown): NullableString => {
  if (value === 'مجرد' || value === 'Single') return '1';
  if (value === 'متاهل' || value === 'Married') return '2';
  return toNullableString(value);
};

export const emptyEmployeeFormValues: EmployeeFormValues = {
  id: '',
  employment_id: '',
  first_name: '',
  birthCertificateNumber: '',
  degreeEducation: '',
  last_name: '',
  father_name: '',
  nationality: '',
  passport_number: '',
  present_address: '',
  city: '',
  country_id: '',
  mobile: '',
  phone: '',
  unitId: null,
  center_names: '',
  email: '',
  designations_id: '',
  joining_date: '',
  status: 1,
  gender: '',
  date_of_birth: '',
  personnelIdBank: '',
  maratial_status: '',
};

export const buildEmployeeInitialValues = (
  source?: Partial<Record<keyof EmployeeFormValues, unknown>> | null,
): EmployeeFormValues => ({
  id: toFormString(source?.id),
  employment_id: toFormString(source?.employment_id),
  first_name: toFormString(source?.first_name),
  birthCertificateNumber: toFormString(source?.birthCertificateNumber),
  degreeEducation: toFormString(source?.degreeEducation),
  last_name: toFormString(source?.last_name),
  father_name: toFormString(source?.father_name),
  nationality: toFormString(source?.nationality),
  passport_number: toFormString(source?.passport_number),
  present_address: toFormString(source?.present_address),
  city: toFormString(source?.city),
  country_id: toFormString(source?.country_id),
  mobile: toFormString(source?.mobile),
  phone: toFormString(source?.phone),
  unitId: toNullableNumber(source?.unitId),
  center_names: toFormString(source?.center_names),
  email: toFormString(source?.email),
  designations_id: toFormString(source?.designations_id),
  joining_date: toFormString(source?.joining_date),
  status: normalizeStatus(source?.status),
  gender: normalizeGender(source?.gender) ?? '',
  date_of_birth: toFormString(source?.date_of_birth),
  personnelIdBank: toFormString(source?.personnelIdBank),
  maratial_status: normalizeMaritalStatus(source?.maratial_status) ?? '',
});

export const buildEmployeePayload = (
  values: EmployeeFormValues,
): EmployeeAdminPayload => ({
  id: toNullableString(values.id),
  employment_id: toNullableString(values.employment_id),
  first_name: toNullableString(values.first_name),
  birthCertificateNumber: toNullableString(values.birthCertificateNumber),
  degreeEducation: toNullableString(values.degreeEducation),
  last_name: toNullableString(values.last_name),
  father_name: toNullableString(values.father_name),
  nationality: toNullableString(values.nationality),
  passport_number: toNullableString(values.passport_number),
  present_address: toNullableString(values.present_address),
  city: toNullableString(values.city),
  country_id: toNullableString(values.country_id),
  mobile: toNullableString(values.mobile),
  phone: toNullableString(values.phone),
  unitId: toNullableNumber(values.unitId),
  center_names: toNullableString(values.center_names),
  email: toNullableString(values.email),
  designations_id: toNullableString(values.designations_id),
  joining_date: toNullableString(values.joining_date),
  status: normalizeStatus(values.status),
  gender: normalizeGender(values.gender),
  date_of_birth: toNullableString(values.date_of_birth),
  personnelIdBank: toNullableString(values.personnelIdBank),
  maratial_status: normalizeMaritalStatus(values.maratial_status),
});
