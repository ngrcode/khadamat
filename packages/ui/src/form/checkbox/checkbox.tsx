import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import React from 'react';

import { cn } from '@repo/utils/cn';

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  classNameLabel: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  onChange,
  classNameLabel,
  ...restProps
}) => {
  const handleChange: CheckboxProps['onChange'] = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Checkbox onChange={handleChange} {...restProps}>
      <span className={cn(classNameLabel, 'bg-text-white')}>{label}</span>
    </Checkbox>
  );
};
