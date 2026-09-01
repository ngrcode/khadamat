import React, { useEffect } from 'react';
import { FieldProps } from 'formik';
import { Form } from 'antd';
import SelectAntDesign from './selectAntD';
import { Header3 } from '../../headers/header3';

interface SelectOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
}

interface SelectFormikProps {
  options: SelectOption[];
  placeholder?: string;
  title?: string;
  allowClear?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  variant?: 'filled' | 'outlined' | 'borderless';
  labelColor?: string;
  labelStyle?: React.CSSProperties;
  required?: boolean;
  returnObject?: boolean;
  defaultValue?: any;
}

const SelectFormik: React.FC<SelectFormikProps & FieldProps> = ({
  field,
  form,
  options,
  placeholder,
  title = '',
  disabled = false,
  loading = false,
  variant = 'outlined',
  style,
  labelColor,
  labelStyle,
  required = false,
  returnObject = false,
  defaultValue,
}) => {
  const error = form.errors[field.name] as string | undefined;
  const touched = form.touched[field.name] as boolean | undefined;
  const showError = Boolean(touched && error);

  useEffect(() => {
    const isEmpty =
      field.value === undefined ||
      field.value === null ||
      field.value === '';

    if (isEmpty && defaultValue !== undefined) {
      form.setFieldValue(field.name, defaultValue);
    }
  }, [defaultValue, field.name]);

  const handleChange = (value: any, option: any) => {
    if (returnObject) {
      if (Array.isArray(option)) {
        form.setFieldValue(
          field.name,
          option.map((item) => ({
            value: item.value,
            label: item.label,
          }))
        );
      } else {
        form.setFieldValue(
          field.name,
          option
            ? {
              value: option.value,
              label: option.label,
            }
            : null
        );
      }
    } else {
      form.setFieldValue(field.name, value);
    }
  };

  const getValue = () => {
    if (returnObject) {
      return field.value?.value;
    }

    return field.value === '' ? undefined : field.value;
  };

  return (
    <Form.Item
      label={
        title ? (
          <span
            style={{
              color: labelColor,
              ...labelStyle,
            }}
            className="text-xs"
          >
            {required && <span className="text-red-500">*</span>}
            <Header3 title={title} />
          </span>
        ) : null
      }
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      validateStatus={showError ? 'error' : undefined}
      help={showError ? error : null}
      className="w-full app-form-select-item"
      htmlFor={field.name}
    >
      <div data-field-name={field.name}>
        <SelectAntDesign
          options={options}
          placeholder={placeholder}
          variant={variant}
          value={getValue()}
          onChange={handleChange}
          onBlur={() => form.setFieldTouched(field.name, true)}
          status={showError ? 'error' : undefined}
          disabled={disabled}
          loading={loading}
          style={style}
        />
      </div>
    </Form.Item>
  );
};

export default SelectFormik;
