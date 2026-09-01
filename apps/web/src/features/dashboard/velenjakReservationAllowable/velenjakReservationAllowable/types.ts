export interface VelenjakReservationAllowableSearchParams {
  fromDate?: string;
  toDate?: string;
  globalSearch?: string;
}

export interface VelenjakReservationAllowableApiItem {
  id?: number;
  userId?: number | null;
  employment_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  maratial_status?: string | null;
  father_name?: string | null;
  nationality?: string | null;
  passport_number?: string | null;
  photo?: string | null;
  photo_a_path?: string | null;
  present_address?: string | null;
  city?: string | null;
  country_id?: string | null;
  mobile?: string | null;
  phone?: string | null;
  center_names?: string | null;
  unit_name?: string | null;
  email?: string | null;
  designations_id?: string | null;
  joining_date?: string | null;
  status?: number | null;
  barberShop?: number | null;
  velenjakReservation?: number | null;
  gender?: string | null;
  date_of_birth?: string | null;
  firstLogin?: boolean | null;
  personnelIdBank?: string | null;
  militaryService?: string | null;
  unitId?: number | null;
  birthCertificateNumber?: string | null;
  degreeEducation?: string | null;
  ticketCreate?: boolean | null;
  ticketId?: number | null;
}

export interface VelenjakReservationAllowableRow
  extends VelenjakReservationAllowableApiItem {
  fullName: string;
  statusLabel: string;
  barberShopLabel: string;
  velenjakReservationLabel: string;
  firstLoginLabel: string;
  ticketCreateLabel: string;
}

export interface VelenjakReservationAllowableListResponse {
  status?: string;
  info?: VelenjakReservationAllowableApiItem[] | null;
  data?: VelenjakReservationAllowableApiItem[] | null;
  items?: VelenjakReservationAllowableApiItem[] | null;
  total?: number;
  totalCount?: number;
  recordsTotal?: number;
  recordsFiltered?: number;
  result?: {
    info?: VelenjakReservationAllowableApiItem[] | null;
    data?: VelenjakReservationAllowableApiItem[] | null;
    items?: VelenjakReservationAllowableApiItem[] | null;
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
