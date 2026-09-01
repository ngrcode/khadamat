import React from 'react'

import { Formik, FormikConfig, FormikProps, FormikValues } from 'formik'
import { Form as FormikForm } from 'formik'

interface FormikWrapperProps<T> extends FormikConfig<T> {
  children: (formikProps: FormikProps<T>) => React.ReactNode
}

const FormikWrapper = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  enableReinitialize,
  children,
}: any) => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => {
        return (<FormikForm>
          {typeof children === 'function' ? children(formikProps) : children}
        </FormikForm>)
      }}
    </Formik>
  )
}

export default FormikWrapper
