import { cn } from '@repo/utils/cn';
import { useEffect } from 'react';
import { t } from '@repo/i18n';
import CustomButton from '../formButton';
import FormikWrapper from '../../formik/formikWrapper';
import { ReactNode } from "react"
import { FormikHelpers, FormikProps } from "formik"

interface CommonFormProps {
  title: string
  initialValues: any
  validationSchema: any
  onSubmit: (values: any, actions: FormikHelpers<any>) => Promise<void>
  buttonLabel?: any
  checkIfModified?: (values: any) => void
  children: ReactNode
  isModified?: boolean
  enableReinitialize?: boolean
  classNameButton?: string
  classNameHeder?: string
  classNameChildren?: string
  classNameCustomButton?: string
  showTitle?: boolean
}

const buildTouchedMap = (values: Record<string, unknown>) => {
  const touched: Record<string, unknown> = {}

  Object.keys(values || {}).forEach((key) => {
    const value = values[key]
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof File)) {
      touched[key] = buildTouchedMap(value as Record<string, unknown>)
    } else {
      touched[key] = true
    }
  })

  return touched
}

const scrollToFirstError = (errors: Record<string, unknown>) => {
  if (typeof document === 'undefined') return

  const firstKey = Object.keys(errors || {})[0]
  if (!firstKey) return

  const byDataAttr = document.querySelector(`[data-field-name="${firstKey}"]`)
  const byName = document.querySelector(`[name="${firstKey}"]`)
  const byId = document.getElementById(firstKey)
  const target = (byDataAttr || byName || byId) as HTMLElement | null

  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const focusable = target.querySelector(
    'input, textarea, select, button, .ant-select-selector, .ant-upload',
  ) as HTMLElement | null

  focusable?.focus?.({ preventScroll: true })
}

export const CommonForm: React.FC<CommonFormProps> = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  buttonLabel,
  checkIfModified,
  children,
  isModified = true,
  enableReinitialize = false,
  classNameButton = "",
  classNameHeder = "",
  classNameChildren = "",
  classNameCustomButton = "",
  showTitle = true,
}) => {
  return (
    <FormikWrapper
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        try {
          await onSubmit(values, actions)
        } finally {
          actions.setSubmitting(false)
        }
      }}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps: FormikProps<any>) => {
        useEffect(() => {
          if (checkIfModified) {
            checkIfModified(formikProps.values)
          }
        }, [formikProps.values])

        const handleSave = async () => {
          const errors = await formikProps.validateForm()
          const hasErrors = Object.keys(errors || {}).length > 0

          if (hasErrors) {
            formikProps.setTouched(buildTouchedMap(formikProps.values), true)
            requestAnimationFrame(() => scrollToFirstError(errors as Record<string, unknown>))
            return
          }

          formikProps.handleSubmit()
        }

        return (
          <div className="app-common-form w-full rounded-2xl shadow-lg overflow-hidden">
            {showTitle && (
              <div className={cn(
                "app-common-form__header px-6 py-4 border-b",
                classNameHeder
              )}>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                  <h2 className="app-common-form__title text-xl font-bold m-0">
                    {title}
                  </h2>
                </div>
              </div>
            )}

            <div className={cn(
              "app-common-form__body p-6",
              classNameChildren
            )}>
              {children}
            </div>

            <div className={cn(
              "app-common-form__footer px-6 py-4 border-t",
              classNameButton
            )}>
              <div className={cn(
                "flex justify-end",
                classNameCustomButton
              )}>
                <CustomButton
                  type="primary"
                  label={buttonLabel || t('save')}
                  loading={formikProps.isSubmitting}
                  shape="round"
                  size="large"
                  className={cn(
                    "min-w-[150px] transition-all duration-300",
                    "bg-gradient-gold hover:bg-gradient-gold-hover",
                    "text-white font-medium",
                    "shadow-glow-gold hover:shadow-xl",
                    "border-0",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
                    classNameCustomButton
                  )}
                  onClick={() => {
                    void handleSave()
                  }}
                  disabled={!isModified || formikProps.isSubmitting}
                />
              </div>
            </div>
          </div>
        )
      }}
    </FormikWrapper>
  )
}
