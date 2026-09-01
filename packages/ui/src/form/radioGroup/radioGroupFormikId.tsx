import React from 'react'
import { Radio } from 'antd'
import { FieldProps } from 'formik'

interface Option {
  id: string | number
  value: string
}

interface FormikRadioGroupProps extends FieldProps {
  label: string
  options: Option[]
}

export const RadioGroupFormikId: React.FC<FormikRadioGroupProps> = ({
  field,
  label,
  options,
}) => {
  return (
    <div>
      <label className='pl-4'>{label}</label>
      <Radio.Group
        {...field}
        value={field.value}
        onChange={(e) => {
          const selectedOption = options.find(
            (option) => option.id === e.target.value
          )
          field.onChange({
            target: {
              name: field.name,
              value: selectedOption?.id,
            },
          })
        }}
      >
        {options.map((option) => (
          <Radio key={option.id} value={option.id}>
            {option.value}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  )
}
