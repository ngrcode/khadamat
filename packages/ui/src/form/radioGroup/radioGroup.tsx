import React from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'

interface RadioOption {
  label: string
  value: string | number // Can be string or number
}

interface FormikRadioGroupProps {
  field: any // Field props provided by Formik
  form: any  // Form props provided by Formik
  label?: string // Optional label for the radio group
  options: RadioOption[] // Options for the radio group
}

const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({
  field,
  form,
  label,
  options,
}) => {
  const handleChange = (e: RadioChangeEvent) => {
    form.setFieldValue(field.name, e.target.value) // Update Formik value
  }

  return (
    <div className='flex flex-col gap-2'>
      {label && <label>{label}</label>}

      <Radio.Group {...field} onChange={handleChange} value={field.value}>
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>

      {/* Display error message if field is touched and has an error */}
      {form.touched[field.name] && form.errors[field.name] ? (
        <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
      ) : null}
    </div>
  )
}

export default FormikRadioGroup
