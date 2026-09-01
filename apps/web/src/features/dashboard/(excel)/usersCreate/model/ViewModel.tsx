import {
  Yup,
  t,
  useEffect,
  useQueryClient,
  useState,
  useSubmitFormData,
} from '@/components';
import { useRouter } from 'next/navigation';

const CREATE_EXCEL_URL = 'api/1.0/RequestLeave/ImportExcel';
const QUERY_EXCEL = 'excel';

export interface ExcelFormValues {
  File: File | null;
  Month: string;
  Year: string;
  SheetName: string;
  NameId: string;
  LastNameId: string;
  NationalId: string;
  PersonnelCodeId: string;
  PersonnelInfo: string;
  Deduction: string;
  SalaryBenefit: string;
  LoanInformation: string;
  Efficiency: string;
  PersonnelInfoStart: string;
  PersonnelInfoEnd: string;
  DeductionStart: string;
  DeductionEnd: string;
  SalaryBenefitStart: string;
  SalaryBenefitEnd: string;
  LoanInformationStart: string;
  LoanInformationEnd: string;
  EfficiencyStart: string;
  EfficiencyEnd: string;
  TotalPayment: string;
  TotalIncome: string;
  TotalDeductions: string;
  TotalLoan: string;
}

export const useAddViewModel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [initialValues] = useState<ExcelFormValues>({
    File: null,
    Month: '',
    Year: '',
    SheetName: '',
    NameId: '3',
    LastNameId: '4',
    NationalId: '1',
    PersonnelCodeId: '2',
    PersonnelInfo: '',
    Deduction: '',
    SalaryBenefit: '',
    LoanInformation: '',
    Efficiency: '',
    PersonnelInfoStart: '5',
    PersonnelInfoEnd: '9',
    DeductionStart: '10',
    DeductionEnd: '14',
    SalaryBenefitStart: '15',
    SalaryBenefitEnd: '27',
    LoanInformationStart: '34',
    LoanInformationEnd: '41',
    EfficiencyStart: '29',
    EfficiencyEnd: '32',
    TotalPayment: '',
    TotalIncome: '',
    TotalDeductions: '',
    TotalLoan: '',
  });

  const validationSchema = Yup.object({
    File: Yup.mixed()
      .required('فایل الزامی است')
      .test('fileSize', t('fileSize') || 'حجم فایل بیش از حد مجاز است', (value: any) => {
        if (!value) return false;
        return value.size <= 150 * 1024 * 1024;
      })
      .test('fileType', 'فرمت فایل باید اکسل باشد', (value: any) => {
        if (!value) return false;

        const supportedTypes = [
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];

        return supportedTypes.includes(value.type);
      }),

    Year: Yup.mixed().required('سال الزامی است'),
    Month: Yup.mixed().required('ماه الزامی است'),

    NameId: Yup.number().required('ستون نام الزامی است'),
    LastNameId: Yup.number().required('ستون نام خانوادگی الزامی است'),
    NationalId: Yup.number().required('ستون کد ملی الزامی است'),
    PersonnelCodeId: Yup.number().required('ستون کد پرسنلی الزامی است'),

    PersonnelInfoStart: Yup.number().required('از ستون الزامی است'),
    PersonnelInfoEnd: Yup.number().required('تا ستون الزامی است'),
    DeductionStart: Yup.number().required('از ستون الزامی است'),
    DeductionEnd: Yup.number().required('تا ستون الزامی است'),
    SalaryBenefitStart: Yup.number().required('از ستون الزامی است'),
    SalaryBenefitEnd: Yup.number().required('تا ستون الزامی است'),
    LoanInformationStart: Yup.number().required('از ستون الزامی است'),
    LoanInformationEnd: Yup.number().required('تا ستون الزامی است'),
    EfficiencyStart: Yup.number().required('از ستون الزامی است'),
    EfficiencyEnd: Yup.number().required('تا ستون الزامی است'),
  });

  const { submitFormData, sendData, infoData } = useSubmitFormData();

  useEffect(() => {
    if (sendData) {
      router.push('/dashboard/excel');
    }
  }, [sendData, router]);

  const onSubmit = async (values: ExcelFormValues) => {
    const excelData = {
      File: values.File,
      Month: values.Month || null,
      Year: values.Year || null,
      SheetName: values.SheetName || null,
      NameId: values.NameId,
      LastNameId: values.LastNameId,
      NationalId: values.NationalId,
      PersonnelCodeId: values.PersonnelCodeId,
      PersonnelInfo: values.PersonnelInfo || null,
      PersonnelInfoStart: values.PersonnelInfoStart,
      PersonnelInfoEnd: values.PersonnelInfoEnd,
      Deduction: values.Deduction || null,
      DeductionStart: values.DeductionStart,
      DeductionEnd: values.DeductionEnd,
      SalaryBenefit: values.SalaryBenefit || null,
      SalaryBenefitStart: values.SalaryBenefitStart,
      SalaryBenefitEnd: values.SalaryBenefitEnd,
      LoanInformation: values.LoanInformation || null,
      LoanInformationStart: values.LoanInformationStart,
      LoanInformationEnd: values.LoanInformationEnd,
      Efficiency: values.Efficiency || null,
      EfficiencyStart: values.EfficiencyStart,
      EfficiencyEnd: values.EfficiencyEnd,
      TotalPayment: values.TotalPayment || null,
      TotalIncome: values.TotalIncome || null,
      TotalDeductions: values.TotalDeductions || null,
      TotalLoan: values.TotalLoan || null,
    };

    await submitFormData(excelData, {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? process.env.BASE_URL ?? '',
      endpoint: CREATE_EXCEL_URL,
      queryKey: QUERY_EXCEL,
    });

    await queryClient.invalidateQueries({
      queryKey: [QUERY_EXCEL],
    });
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    sendData,
    infoData,
  };
};