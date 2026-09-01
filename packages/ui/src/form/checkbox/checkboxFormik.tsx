import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import React from 'react';

import { FieldProps } from 'formik';

import { cn } from '@repo/utils/cn';

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  classNameLabel?: string;
}

const CheckboxFormik: React.FC<CustomCheckboxProps & FieldProps> = ({
  field,
  form,
  label,
  classNameLabel,
  className,
  ...restProps
}) => {
  const error = form.errors[field.name] as string | undefined;
  const touched = form.touched[field.name] as boolean | undefined;
  const showError = Boolean(touched && error);

  return (
    <div
      className={cn('app-form-checkbox', showError && 'app-form-checkbox--error')}
      data-field-name={field.name}
    >
      <Checkbox
        id={field.name}
        className={cn('app-form-checkbox__control', className)}
        checked={Boolean(field.value)}
        onChange={(e) => {
          form.setFieldValue(field.name, e.target.checked);
          form.setFieldTouched(field.name, true, false);
        }}
        onBlur={() => form.setFieldTouched(field.name, true)}
        {...restProps}
      >
        <span className={cn('app-form-checkbox__label', classNameLabel)}>
          {label}
        </span>
      </Checkbox>
      {showError ? (
        <div className="app-form-checkbox__error">{error}</div>
      ) : null}
    </div>
  );
};

export default CheckboxFormik;
