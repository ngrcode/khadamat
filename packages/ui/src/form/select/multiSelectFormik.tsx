import React from 'react';
import { Select, Form } from 'antd';
import { FieldProps } from 'formik';
import type { SelectProps } from 'antd';
import { Header3 } from '../../headers/header3';

interface MultiSelectFormikProps extends FieldProps {
  label?: string;
  title?: string;
  options: SelectProps['options'];
  placeholder?: string;
}

const MultiSelectFormik: React.FC<MultiSelectFormikProps> = ({
  field,
  form,
  label,
  title,
  options,
  placeholder,
}) => {
  const handleChange = (value: number[]) => {
    form.setFieldValue(field.name, value);
  };

  const heading = title || label || '';
  const showError = Boolean(form.touched[field.name] && form.errors[field.name]);

  return (
    <Form.Item
      className="w-full app-form-select-item"
      validateStatus={showError ? 'error' : undefined}
      help={showError ? (form.errors[field.name] as string) : undefined}
    >
      {heading ? <Header3 title={heading} /> : null}

      <div data-field-name={field.name}>
        <Select
          mode="multiple"
          allowClear
          className="w-full app-form-select"
          style={{ width: '100%' }}
          placeholder={placeholder}
          value={field.value || []}
          onChange={handleChange}
          onBlur={() => form.setFieldTouched(field.name, true)}
          options={options}
          status={showError ? 'error' : undefined}
        />
      </div>
    </Form.Item>
  );
};

export default MultiSelectFormik;
