import React from 'react'
import { FieldProps } from 'formik'
import CustomTextArea from './textArea' // Import your custom TextArea component
import { Typography } from 'antd'

const { Text } = Typography // Ant Design Text component for error display

interface CustomTextAreaFormikProps {
  maxLength?: number
  disabledResize?: boolean
  placeholder?: string
  label?: string
  style?: React.CSSProperties
}

const textAreaFormik: React.FC<CustomTextAreaFormikProps & FieldProps> = ({
  field,
  form,
  maxLength,
  disabledResize = true,
  placeholder,
  label,
  style,
  ...props
}) => {
  // Handle change for Formik
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldValue(field.name, e.target.value) // Update the Formik form value
  }

  const error = form.errors[field.name] as string | undefined
  const touched = form.touched[field.name] as boolean | undefined

  return (
    <div className="text-area-form-group app-form-field" data-field-name={field.name}>
      {label && (
        <label htmlFor={field.name} className="app-form-label">
          {label}
        </label>
      )}
      <CustomTextArea
        value={field.value}
        onChange={handleChange}
        maxLength={maxLength}
        disabledResize={disabledResize}
        placeholder={placeholder}
        style={style}
        className="app-form-control"
        {...props}
      />

      {touched && error && <Text type="danger" style={{ marginTop: '0.5rem' }}>{error}</Text>}
    </div>
  )
}

export default textAreaFormik
