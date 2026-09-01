import { Yup, t, useQueryClient, useState } from '@/components';
import { QUERY_USERS } from '@/constants/endPoint/users';
import { useAxiosMutation } from '@/hook/useAxsios/useAxiosMutation';
import { useRouter } from 'next/navigation';

// تعریف نوع برای داده‌های فرم
interface EmployeeFormValues {
  employment_id: string;
  first_name: string;
  last_name: string;
  maratial_status: string;
  father_name: string;
  nationality: string;
  passport_number: string;
  present_address: string;
  city: string;
  country_id: string;
  mobile: string;
  phone: string;
  center_names: string;
  unitId: number;
  email: string;
  designations_id: string;
  joining_date: string;
  status: number;
  barberShop: number;
  velenjakReservation: number;
  gender: string; // تغییر نوع به string
  date_of_birth: string;
  personnelIdBank: string;
  militaryService: string;
  password: string;
  birthCertificateNumber: string;
  degreeEducation: string;
}

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // مقادیر اولیه فرم - تمام فیلدها با مقدار پیش‌فرض
  const [initialValues] = useState<EmployeeFormValues>({
    employment_id: '',
    first_name: '',
    last_name: '',
    maratial_status: '',
    father_name: '',
    nationality: '',
    passport_number: '',
    present_address: '',
    city: '',
    country_id: '',
    mobile: '',
    phone: '',
    center_names: '',
    unitId: 0,
    email: '',
    designations_id: '',
    joining_date: '',
    status: 1,
    barberShop: 0,
    velenjakReservation: 0,
    gender: '', // مقدار اولیه رشته خالی
    date_of_birth: '',
    personnelIdBank: '',
    militaryService: 'Default',
    password: '',
    birthCertificateNumber: '',
    degreeEducation: '',
  });

  // تعیین اعتبارسنجی فیلدها با Yup
  const validationSchema = Yup.object({
    // first_name: Yup.string().required(t('required')),
    // last_name: Yup.string().required(t('required')),
    // father_name: Yup.string().required(t('required')),
    // email: Yup.string().email(t('invalidEmail')).required(t('required')),
    // mobile: Yup.string().required(t('required')),
    // password: Yup.string().required(t('required')),
    // employment_id: Yup.string().required(t('required')),
    // passport_number: Yup.string().required(t('required')),
    // nationality: Yup.string().required(t('required')),
    // present_address: Yup.string().required(t('required')),
    // city: Yup.string().required(t('required')),
    // country_id: Yup.string().required(t('required')),
    // designations_id: Yup.string().required(t('required')),
    // joining_date: Yup.string().required(t('required')),
    // date_of_birth: Yup.string().required(t('required')),
    // maratial_status: Yup.string().required(t('required')),
    // gender: Yup.string().required(t('required')), // اعتبارسنجی به عنوان رشته
    // degreeEducation: Yup.string().required(t('required')),
    // personnelIdBank: Yup.string().required(t('required')),
    // birthCertificateNumber: Yup.string().required(t('required')),
  });

  // هوک برای ارسال داده به API
  const { mutateAsync } = useAxiosMutation('/api/1.0/Employee/create'); // استفاده از آدرس صحیح

  // تابع کمکی برای فرمت‌دهی تاریخ
  const formatDate = (date: string): string => {
    if (!date) return '';
    // اگر تاریخ شامل T00:00 است، آن را به فرمت صحیح تبدیل کن
    if (date.includes('T00:00')) {
      // اگر دو بار T00:00 وجود دارد، یکی را حذف کن
      const parts = date.split('T00:00');
      return parts[0]; // فقط قسمت اول را برمی‌گرداند
    }
    // اگر تاریخ به فرمت "1405/03/31" است، T00:00 را اضافه کن
    if (date.includes('/')) {
      return `${date}T00:00`;
    }
    return date;
  };

  // تابع ارسال فرم
  const onSubmit = async (values: EmployeeFormValues) => {
    // ساخت آبجکت داده برای ارسال به سرور
    // const employeeData = {
    //   employment_id: values.employment_id || '',
    //   first_name: values.first_name || '',
    //   last_name: values.last_name || '',
    //   maratial_status: values.maratial_status || '',
    //   father_name: values.father_name || '',
    //   nationality: values.nationality || '',
    //   passport_number: values.passport_number || '',
    //   present_address: values.present_address || '',
    //   city: values.city || '',
    //   country_id: values.country_id || '',
    //   mobile: values.mobile || '',
    //   phone: values.phone || '',
    //   center_names: values.center_names || '',
    //   unitId: Number(values.unitId) || 0,
    //   email: values.email || '',
    //   designations_id: values.designations_id || '',
    //   joining_date: formatDate(values.joining_date), // فرمت صحیح تاریخ
    //   status: Number(values.status) || 1,
    //   barberShop: Number(values.barberShop) || 0,
    //   velenjakReservation: Number(values.velenjakReservation) || 0,
    //   gender: String(values.gender), // تبدیل به رشته
    //   date_of_birth: formatDate(values.date_of_birth), // فرمت صحیح تاریخ
    //   personnelIdBank: values.personnelIdBank || '',
    //   militaryService: values.militaryService || 'Default',
    //   password: values.password || '',
    //   birthCertificateNumber: values.birthCertificateNumber || '',
    //   degreeEducation: values.degreeEducation || '',
    // };
    const employeeData = {
      first_name: "test",
      last_name: "test",
      date_of_birth: "1405/03/31",
      gender: "",
      maratial_status: "",
      email: "takhtkehammad@gmail.com",
      mobile: "",
      phone: "",
      present_address: "",
      employment_id: "123141431",
      joining_date: "1405/03/31",
      designations_id: "",
      unitId: 1,
      status: 1,
      birthCertificateNumber: "",
      passport_number: "",
      nationality: "",
      country_id: "",
      city: "",
      center_names: "",
      password: "12123123"
    };
    console.log('Sending data:', JSON.stringify(employeeData, null, 2));

    try {
      // ارسال داده به سرور
      const response = await mutateAsync(employeeData);

      // router.push('/dashboard/user');
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_USERS],
      // });
    } catch (error: any) {
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};