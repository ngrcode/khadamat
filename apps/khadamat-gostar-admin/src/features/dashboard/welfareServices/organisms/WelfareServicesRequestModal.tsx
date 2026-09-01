'use client';

import { HeartOutlined } from '@ant-design/icons';
import { Modal, Typography } from 'antd';

import { getPortalServiceByKey } from '@/features/dashboard/services';
import type { RequestModalProps } from '@/features/dashboard/shared/genericRequest/types';

export function WelfareServicesRequestModal({
  open,
  onClose,
}: RequestModalProps) {
  const service = getPortalServiceByKey('welfare-services');

  if (!service) return null;

  return (
    <Modal
      title={
        <div className="portal-modal-title">
          <span className="portal-modal-icon">{service.icon}</span>
          <Typography.Title level={5} className="!mb-0 !text-slate-800">
            خدمات رفاهی
          </Typography.Title>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={520}
      className="portal-request-modal"
      destroyOnHidden
    >
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf3ff] text-3xl text-[#1d6fd8]">
          <HeartOutlined />
        </span>
        <Typography.Title level={4} className="!mb-0 !text-slate-800">
          به زودی
        </Typography.Title>
      </div>
    </Modal>
  );
}
