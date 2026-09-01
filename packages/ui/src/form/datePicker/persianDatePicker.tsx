import React from 'react';
import { DatePicker as DatePickerJalali, JalaliLocaleListener } from 'antd-jalali';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/lib/locale/fa_IR';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

// Extend Day.js with Jalaliday for Jalali calendar support
dayjs.extend(jalaliday);

interface PersianDatePickerProps {
  value: any;
  onChange: (date: any) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  status?: 'error' | 'warning'; // Add status prop for error or warning
}

// Separate Persian DatePicker Component
const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'تاریخ را انتخاب کنید',
  className,
  style,
  status, // New status prop
  ...props
}) => {
  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      {/* JalaliLocaleListener برای مدیریت تاریخ شمسی */}
      <JalaliLocaleListener />
      <DatePickerJalali
        value={value ? dayjs(value) : null} // اطمینان از اینکه value یک شیء dayjs است
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        style={style}
        status={status} // Pass status to DatePicker
        {...props}
      />
    </ConfigProvider>
  );
};

export default PersianDatePicker;
