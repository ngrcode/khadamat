'use client';

import { Form } from 'antd';
import type { FormItemProps } from 'antd';
import type { ReactNode } from 'react';

export type FormFieldProps = FormItemProps & { children: ReactNode };

export function FormField({ children, ...props }: FormFieldProps) {
  return <Form.Item {...props}>{children}</Form.Item>;
}
