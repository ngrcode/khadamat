'use client';

import {
  AuditOutlined,
  BankOutlined,
  FileDoneOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';

import { getPortalServiceByKey } from '@/features/dashboard/services';
import type { RequestModalProps } from '@/features/dashboard/shared/genericRequest/types';

import { HokmDetailRequestModal } from './HokmDetailRequestModal';
import { InstallmentDeductionRequestModal } from './InstallmentDeductionRequestModal';
import { useHumanResourcesRequestModalViewModel } from '../model/ViewModel';

export function HumanResourcesRequestModal({ open, onClose }: RequestModalProps) {
  const service = getPortalServiceByKey('human-resources');
  const { activeModal, openModal, backToMenu, closeAll } =
    useHumanResourcesRequestModalViewModel({ onClose });

  if (!service) return null;

  return (
    <>
      <Modal
        title={
          <div className="portal-modal-title">
            <span className="portal-modal-icon">{service.icon}</span>
            <div>
              <Typography.Title level={5} className="!mb-1 !text-slate-800">
                منابع انسانی
              </Typography.Title>
              <Typography.Text className="!text-xs !text-slate-500">
                نوع درخواست منابع انسانی را انتخاب کنید.
              </Typography.Text>
            </div>
          </div>
        }
        open={open && !activeModal}
        onCancel={closeAll}
        footer={null}
        centered
        width={720}
        className="portal-request-modal"
        destroyOnHidden
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            type="default"
            className="!h-auto !rounded-2xl !border !border-slate-200 !bg-white !p-5 !text-right !shadow-sm transition hover:!border-[#1d6fd8]"
            onClick={() => openModal('hokm-detail')}
          >
            <span className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf3ff] text-xl text-[#1d6fd8]">
                <FileDoneOutlined />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-bold text-slate-800">
                  احکام کارگزینی
                </span>
                <span className="mt-2 block whitespace-normal text-xs leading-6 text-slate-500">
                  دریافت جزئیات حکم کارگزینی بر اساس سال.
                </span>
              </span>
            </span>
          </Button>

          <Button
            type="default"
            className="!h-auto !rounded-2xl !border !border-slate-200 !bg-white !p-5 !text-right !shadow-sm transition hover:!border-[#1d6fd8]"
            onClick={() => openModal('installment-deduction')}
          >
            <span className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf3ff] text-xl text-[#1d6fd8]">
                <SafetyCertificateOutlined />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-bold text-slate-800">
                  گواهی کسر اقساط
                </span>
                <span className="mt-2 block whitespace-normal text-xs leading-6 text-slate-500">
                  ثبت درخواست صدور گواهی کسر اقساط.
                </span>
              </span>
            </span>
          </Button>
        </div>
      </Modal>

      <HokmDetailRequestModal
        open={open && activeModal === 'hokm-detail'}
        onClose={closeAll}
        onBack={backToMenu}
        icon={<AuditOutlined />}
      />

      <InstallmentDeductionRequestModal
        open={open && activeModal === 'installment-deduction'}
        onClose={closeAll}
        onBack={backToMenu}
        icon={<BankOutlined />}
      />
    </>
  );
}
