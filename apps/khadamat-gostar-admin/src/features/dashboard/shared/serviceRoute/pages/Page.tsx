'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import type { ReactNode } from 'react';

import type { PortalService } from '@/features/dashboard/services';

export function ServiceRouteView({
  service,
  onBack,
  children,
}: {
  service: PortalService;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <main className="portal-service-page">
      <section className="portal-service-shell">
        <button type="button" className="portal-back-btn" onClick={onBack}>
          <ArrowRightOutlined />
          بازگشت به داشبورد
        </button>

        <div className="portal-service-card">
          <span className="portal-service-icon">{service.icon}</span>
          <Typography.Title level={3} className="!mb-2 !text-slate-800">
            {service.label}
          </Typography.Title>
          <Typography.Paragraph className="!mb-0 !text-sm !leading-7 !text-slate-600">
            {service.description}
          </Typography.Paragraph>
        </div>
      </section>

      {children}
    </main>
  );
}
