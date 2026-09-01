'use client';

import { Modal, Typography } from 'antd';
import type { ReactNode } from 'react';


import { useInstallmentDeductionRequestViewModel } from '../model/ViewModel';
import { FormikWrapper } from '@repo/ui';

export function InstallmentDeductionRequestModal({
  open,
  onClose,
  onBack,
  icon,
}: {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  icon: ReactNode;
}) {
  const { isMounted, initialValues, validationSchema, handleSubmit } =
    useInstallmentDeductionRequestViewModel({ onClose });

  if (!isMounted) return null;

  return (
    <Modal
      title={
        <div className="portal-modal-title">
          <span className="portal-modal-icon">{icon}</span>
          <div>
            <Typography.Title level={5} className="!mb-1 !text-slate-800">
              گواهی کسر اقساط
            </Typography.Title>
            <Typography.Text className="!text-xs !text-slate-500">
              اطلاعات درخواست گواهی را تکمیل کنید.
            </Typography.Text>
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={720}
      className="portal-request-modal"
      destroyOnHidden
    >
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
        <> به زودی </>
        )}
      </FormikWrapper>
    </Modal>
  );
}
