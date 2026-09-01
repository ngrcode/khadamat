import { Modal } from 'antd';
import { useEffect } from 'react';
import { t } from '@repo/i18n';
import { cn } from '@repo/utils/cn';
import CustomButton from '../formButton';
import FormikWrapper from '../../formik/formikWrapper';
import { CloseOutlined } from '@ant-design/icons';

interface CommonModalFormProps {
  title: string;
  widthModal?: string;
  visible: boolean;
  onCancel: () => void;
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any) => Promise<void>;
  buttonLabel: string;
  isModified?: boolean;
  checkIfModified?: (values: any) => void;
  children: React.ReactNode;
  enableReinitialize?: boolean;
}

export const CommonModalForm: React.FC<CommonModalFormProps> = ({
  title,
  visible,
  onCancel,
  initialValues,
  validationSchema,
  onSubmit,
  buttonLabel,
  isModified = true,
  checkIfModified,
  children,
  enableReinitialize,
  widthModal = null
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {/* Decorative gold line */}
            <div className="w-1 h-8 bg-gradient-gold rounded-full" />

            <div>
              <h2 className="text-xl font-bold text-neutral-800 m-0">
                {title}
              </h2>
              <p className="text-xs text-neutral-400 m-0 mt-0.5 font-normal">
                {t('pleaseEnterInformation')}
              </p>
            </div>
          </div>

          {/* Optional: Decorative gold icon or badge */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-gold/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            </div>
          </div>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={widthModal === "full" ? "100vw" : '70%'}
      closeIcon={
        <CloseOutlined className="text-neutral-400 hover:text-gold transition-colors duration-300 text-lg" />
      }
      bodyStyle={{
        height: widthModal === "full" ? "90vh" : "auto",
        padding: '0',
        overflow: 'auto',
      }}
      style={{
        top: 0,
        left: 0,
        padding: 0,
      }}
      className="common-modal-gold"
    >
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await onSubmit(values);
            onCancel();
          } finally {
            actions.setSubmitting(false);
          }
        }}
        enableReinitialize={enableReinitialize}
      >
        {(formikProps) => {
          useEffect(() => {
            if (checkIfModified) {
              checkIfModified(formikProps.values);
            }
          }, [formikProps.values]);

          return (
            <div className={`${widthModal === "full" ? 'h-[90vh]' : ''} flex flex-col justify-between`}>
              {/* Your form content */}
              <div className="p-6">
                {children}
              </div>

              {/* Buttons section with gold theme */}
              <div className="flex flex-row gap-4 p-6 border-t border-neutral-200 bg-gradient-to-r from-neutral-50 to-primary-50/30 rounded-b-lg">
                <div className="basis-1/2">
                  <CustomButton
                    type="default"
                    shape="round"
                    size="large"
                    onClick={onCancel}
                    label={t('cancel')}
                    className={cn(
                      'w-full transition-all duration-300',
                      'border-2 border-neutral-300 hover:border-gold',
                      'text-neutral-600 hover:text-gold',
                      'bg-white hover:bg-primary-50',
                      'font-medium'
                    )}
                  />
                </div>
                <div className="basis-1/2">
                  <CustomButton
                    type="primary"
                    label={buttonLabel}
                    loading={formikProps.isSubmitting}
                    shape="round"
                    size="large"
                    className={cn(
                      'w-full transition-all duration-300',
                      'bg-gradient-gold hover:bg-gradient-gold-hover',
                      'text-white font-medium',
                      'shadow-glow-gold hover:shadow-xl',
                      'border-0',
                      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
                    )}
                    onClick={formikProps.handleSubmit}
                    disabled={!isModified || formikProps.isSubmitting}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </FormikWrapper>

      <style jsx global>{`
        .common-modal-gold .ant-modal-header {
          border-bottom: 2px solid #f0ece4;
          padding: 20px 24px;
          background: linear-gradient(to right, #ffffff, #fbf9f1);
          border-radius: 12px 12px 0 0;
        }
        
        .common-modal-gold .ant-modal-content {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        
        .common-modal-gold .ant-modal-close {
          top: 20px;
          right: 20px;
        }
        
        .common-modal-gold .ant-modal-close:hover {
          background: rgba(212, 160, 36, 0.1);
          border-radius: 50%;
        }
        
        /* Gold gradient animation for decorative elements */
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </Modal>
  );
};
