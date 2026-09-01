import React from 'react';
import { FieldProps } from 'formik';
import { DatePicker as DatePickerJalali, JalaliLocaleListener } from 'antd-jalali';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/lib/locale/fa_IR';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import { Header3 } from '../../headers/header3';
import { TimePicker } from 'antd';

// Extend Day.js with Jalaliday for Jalali calendar support
dayjs.extend(jalaliday);

interface PersianDatePickerFormikProps {
  label?: string;
  value: any;
  onChange: (date: any) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  status?: 'error' | 'warning';
  disabledDate?: (current: dayjs.Dayjs) => boolean;
  showTime?: boolean;
  format?: string;
}

// Unified PersianDatePickerFormik component that works with both Formik and standalone usage
const PersianDatePickerFormik: React.FC<PersianDatePickerFormikProps & Partial<FieldProps>> = ({
  label = '',
  value,
  onChange,
  placeholder = 'تاریخ را انتخاب کنید',
  className,
  style,
  status,
  field,
  form,
  disabledDate,
  showTime = true,
  format = 'YYYY/MM/DD HH:mm',
  ...props
}) => {
  // Determine if the component is being used with Formik
  const isFormik = !!(field && form);

  // Handle date change for both Formik and standalone usage
  const handleDateChange = (date: any) => {
    if (isFormik) {
      if (date && dayjs(date).isValid()) {
        // Format date with time in the required format: '1405/03/25T15:51'
        const formattedDate = dayjs(date)
          .locale('fa')
          .format('YYYY/MM/DD[T]HH:mm');
        form.setFieldValue(field.name, formattedDate);
      } else {
        form.setFieldValue(field.name, null);
      }
    } else {
      if (date && dayjs(date).isValid()) {
        const formattedDate = dayjs(date)
          .locale('fa')
          .format('YYYY/MM/DD[T]HH:mm');
        onChange(formattedDate);
      } else {
        onChange(null);
      }
    }
  };

  // Parse the value based on whether it's used with Formik or standalone
  const getCurrentValue = () => {
    const dateValue = isFormik ? field.value : value;

    if (!dateValue) return null;

    // Check if value is in format '1405/03/25T15:51'
    if (typeof dateValue === 'string' && dateValue.includes('T')) {
      const [datePart, timePart] = dateValue.split('T');
      const [year, month, day] = datePart.split('/').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);

      return dayjs()
        .year(year)
        .month(month - 1)
        .date(day)
        .hour(hour || 0)
        .minute(minute || 0)
        .second(0)
        .locale('fa');
    }

    // Try to parse as Jalali date
    if (typeof dateValue === 'string') {
      const parsed = dayjs(dateValue, { jalali: true });
      if (parsed.isValid()) {
        return parsed;
      }
    }

    return null;
  };

  const currentValue = getCurrentValue();

  return (
    <div className="date-picker-form-group app-form-field flex flex-col w-full" data-field-name={isFormik ? field?.name : undefined}>
      {label ? <Header3 title={label} /> : null}

      <ConfigProvider locale={fa_IR} direction="rtl">
        <JalaliLocaleListener />
        <DatePickerJalali
          value={currentValue}
          onChange={handleDateChange}
          placeholder={placeholder}
          className={`app-form-control app-form-datepicker w-full ${className || ''}`}
          style={style}
          status={status || (isFormik && form?.touched?.[field!.name] && form?.errors?.[field!.name] ? 'error' : undefined)}
          disabledDate={disabledDate}
          showTime={showTime}
          format={format}
          {...props}
        />
      </ConfigProvider>

      {isFormik && form.touched[field.name] && form.errors[field.name] ? (
        <div className="mt-2 text-sm text-red-500">
          {form.errors[field.name] as string}
        </div>
      ) : null}
    </div>
  );
};

export default PersianDatePickerFormik;