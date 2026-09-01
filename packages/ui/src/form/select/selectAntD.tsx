import React from 'react';
import { Select } from 'antd';

interface SelectAntDesignProps {
  options: any[];
  placeholder?: string;
  mode?: 'multiple' | 'tags';
  style?: React.CSSProperties;
  variant?: 'filled' | 'outlined' | 'borderless';
  value?: any;
  defaultValue?: any;
  onChange?: (value: any, option: any) => void;
  onBlur?: () => void;
  status?: 'error' | 'warning';
  height?: number;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
}

const SelectAntDesign: React.FC<SelectAntDesignProps> = ({
  options,
  placeholder,
  mode,
  style,
  variant = 'outlined',
  value,
  defaultValue,
  onChange,
  onBlur,
  status,
  height,
  disabled = false,
  loading = false,
  allowClear = true,
}) => {
  const selectStyle: React.CSSProperties = {
    width: '100%',
    ...style,
    ...(height ? { height } : null),
  };

  return (
    <Select
      className={`w-full app-form-select app-form-select--${variant}`}
      placeholder={placeholder}
      mode={mode}
      value={value}
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      onBlur={onBlur}
      status={status}
      disabled={disabled}
      loading={loading}
      allowClear={allowClear}
      variant={variant === 'borderless' ? 'borderless' : variant === 'filled' ? 'filled' : 'outlined'}
      style={selectStyle}
      getPopupContainer={(trigger) => trigger.parentElement ?? document.body}
    />
  );
};

export default SelectAntDesign;
