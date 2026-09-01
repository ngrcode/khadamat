import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input } from 'antd';
import React from 'react';
import { FieldProps } from 'formik';
import { cn } from '@repo/utils/cn';

interface FormInputProps extends FieldProps {
  label: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  showPasswordToggle?: boolean;
  prefix?: React.ReactNode;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  labelColor?: string;
  stylesButtonsForm?: string;
  stylesInputPassword?: string;
  stylesInput?: string;
  labelStyle?: React.CSSProperties;
  showLabel?: boolean;
  icon?: any;
  disabled?: boolean;
  required?: boolean; // Required prop to show a red asterisk
}

const FormInput: React.FC<FormInputProps> = ({
  field,
  form,
  label,
  type = 'text',
  showPasswordToggle = false,
  prefix,
  minLength,
  maxLength,
  placeholder,
  labelColor,
  labelStyle,
  showLabel = true,
  disabled = false,
  stylesButtonsForm,
  stylesInputPassword,
  stylesInput,
  icon,
  required = false, // default to false
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const error = form.errors[field.name] && form.touched[field.name];

  return (
    <Form.Item
      label={
        showLabel && (
          <span
            className="app-form-label"
            style={{ color: labelColor, ...labelStyle }}
          >
            {required && <span className="text-red-500 pl-2"> * </span>}
            {label}
          </span>
        )
      }
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      validateStatus={error ? 'error' : ''}
      help={error ? form.errors[field.name] : null}
      className={cn(`${stylesButtonsForm} w-full app-form-field`)}
    >
      {type === 'password' && showPasswordToggle ? (
        <Input.Password
          {...field}
          prefix={prefix}
          style={{ width: '100%' }}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          className={cn(`${stylesInputPassword} w-full app-form-control`)}
          disabled={disabled}
        />
      ) : (
        <Input
          {...field}
          type={type}
          prefix={prefix}
          disabled={disabled}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          className={cn(`${stylesInput} w-full app-form-control`)}
        />
      )}
    </Form.Item>
  );
};

export default FormInput;
