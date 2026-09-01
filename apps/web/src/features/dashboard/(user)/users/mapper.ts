import { createMapper } from "@/components/Table/mappers/createMapper";
import { formatters } from "@/components/Table/mappers/formatters";

// ------------------------------------------------------------
// ۱. تعریف نوع خروجی برای هر آیتم پرسنلی (همه فیلدها)
// ------------------------------------------------------------
interface PersonnelItem {
  id: string;
  userId: string;
  employment_id: string;
  first_name: string;
  last_name: string;
  maratial_status: string;
  father_name: string | null;
  nationality: string;
  passport_number: string | null;
  photo: string;
  photo_a_path: string;
  present_address: string | null;
  city: string | null;
  country_id: string;
  mobile: string;
  phone: string;
  center_names: string;
  unit_name: string;
  email: string;
  designations_id: string | null;
  joining_date: string;
  status: number;
  barberShop: number;
  velenjakReservation: number;
  gender: string;
  date_of_birth: string | null;
  firstLogin: boolean;
  personnelIdBank: string | null;
  militaryService: string;
  unitId: number;
  birthCertificateNumber: string | null;
  degreeEducation: string | null;
  ticketCreate: boolean;
  ticketId: number;
}

// ------------------------------------------------------------
// ۲. ساخت مپر با استفاده از createMapper (همه فیلدها)
// ------------------------------------------------------------
const personnelMapper = createMapper<PersonnelItem>({
  id: {
    source: 'id',
  },
  userId: {
    source: 'userId',
    formatter: formatters.number,
  },
  employment_id: {
    source: 'employment_id',
  },
  first_name: {
    source: 'first_name',
  },
  last_name: {
    source: 'last_name',
  },
  maratial_status: {
    source: 'maratial_status',
    formatter: (value: string) => {
      const statusMap: Record<string, string> = {
        '1': 'مجرد',
        '2': 'متاهل',

      };
      return statusMap[value] || value;
    },
  },
  father_name: {
    source: 'father_name',
  },
  nationality: {
    source: 'nationality',
  },
  passport_number: {
    source: 'passport_number',
  },
  photo: {
    source: 'photo',
  },
  photo_a_path: {
    source: 'photo_a_path',
  },
  present_address: {
    source: 'present_address',
  },
  city: {
    source: 'city',
  },
  country_id: {
    source: 'country_id',
  },
  mobile: {
    source: 'mobile',
    formatter: formatters.mobile,
  },
  phone: {
    source: 'phone',
    formatter: formatters.mobile,
  },
  center_names: {
    source: 'center_names',
  },
  unit_name: {
    source: 'unit_name',
  },
  email: {
    source: 'email',
  },
  designations_id: {
    source: 'designations_id',
  },
  joining_date: {
    source: 'joining_date',
    formatter: (value: string) => {
      if (!value) return null;
      // تبدیل تاریخ میلادی به شمسی
      try {
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        return date.toLocaleDateString('fa-IR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      } catch {
        return value;
      }
    },
  },
  status: {
    source: 'status',
    formatter: (value: number) => {
      return value === 1 ? 'فعال' : 'غیرفعال';
    },
  },
  barberShop: {
    source: 'barberShop',
    formatter: (value: number) => value === 1 ? 'بله' : 'خیر',
  },
  velenjakReservation: {
    source: 'velenjakReservation',
    formatter: (value: number) => value === 1 ? 'بله' : 'خیر',
  },
  gender: {
    source: 'gender',
    formatter: (value: string) => {
      return value === '1' ? 'مرد' : 'زن';
    },
  },
  date_of_birth: {
    source: 'date_of_birth',
    formatter: (value: string) => {
      if (!value) return null;
      try {
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        return date.toLocaleDateString('fa-IR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      } catch {
        return value;
      }
    },
  },
  firstLogin: {
    source: 'firstLogin',
    formatter: (value: boolean) => value ? 'بله' : 'خیر',
  },
  personnelIdBank: {
    source: 'personnelIdBank',
  },
  militaryService: {
    source: 'militaryService',
    formatter: (value: string) => {
      const statusMap: Record<string, string> = {
        'Default': 'نامشخص',
        'Completed': 'پایان خدمت',
        'Exempt': 'معاف',
        'Serving': 'در حال خدمت',
      };
      return statusMap[value] || value;
    },
  },
  unitId: {
    source: 'unitId',
    formatter: formatters.number,
  },
  birthCertificateNumber: {
    source: 'birthCertificateNumber',
  },
  degreeEducation: {
    source: 'degreeEducation',
  },
  ticketCreate: {
    source: 'ticketCreate',
    formatter: (value: boolean) => value ? 'بله' : 'خیر',
  },
  ticketId: {
    source: 'ticketId',
    formatter: formatters.number,
  },
});


export const selectFunction = (data: any) => {
  const items = data?.result?.items ||
    data?.result?.info ||
    data?.items ||
    data?.info ||
    (Array.isArray(data) ? data : []);

  const totalCount = data?.result?.totalCount ||
    data?.totalCount ||
    items.length;

  return {
    Items: items.map(personnelMapper),
    TotalCount: totalCount,
  };
};