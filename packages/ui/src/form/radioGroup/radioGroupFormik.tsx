import React from 'react'
import { Radio } from 'antd'
import { FieldProps } from 'formik'

interface FormikRadioGroupProps extends FieldProps {
  label: string // Label for the radio group
  options: string[] // Array of options to render
  defaultValue?: string // Default value prop
}

export const RadioGroupFormik: React.FC<FormikRadioGroupProps> = ({
  field,
  label,
  options,
  defaultValue,
}) => {
  return (
    <div>
      <label className='pl-4'>{label}</label>
      <Radio.Group
        {...field}
        value={field.value || defaultValue} // Use defaultValue if field.value is not set
        onChange={field.onChange}
      >
        {options.map((option, index) => (
          <Radio key={index} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  )
}
