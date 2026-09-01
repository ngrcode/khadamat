'use client';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';

import { useTranslate } from '@repo/i18n/react';
import type { PortalService, PortalServiceKey } from '@/features/dashboard/services';
import type { AccountInfo } from '../types';

export function ProfileCard({
  userName,
  accountInfo,
  quickActions,
  onActionClick,
}: {
  userName: string;
  accountInfo: AccountInfo | null;
  quickActions: PortalService[];
  onActionClick: (serviceKey: PortalServiceKey) => void;
}) {
  const translate = useTranslate();
  const unitName = accountInfo?.unit_name || accountInfo?.center_names;
  const photo = accountInfo?.photo || accountInfo?.photo_a_path || undefined;

  return (
    <div className="portal-profile-card">
      <div className="portal-profile-header">
        <div className="portal-profile-avatar">
          <Avatar
            size={86}
            src={photo}
            icon={<UserOutlined />}
            className="!bg-transparent !text-white"
          />
        </div>
        <Typography.Title level={4} className="!mb-0 !text-white !font-bold">
          {userName}
        </Typography.Title>
        {unitName && (
          <Typography.Text className="!text-center !text-xs !leading-6 !text-white/85">
            {unitName}
          </Typography.Text>
        )}
        <div className="portal-profile-meta">
          {accountInfo?.employment_id && (
            <span>
              {translate('dashboardProfileCode')} {accountInfo.employment_id}
            </span>
          )}
          {accountInfo?.mobile && <span>{accountInfo.mobile}</span>}
        </div>
      </div>

      <div className="portal-quick-grid">
        {quickActions.map((action) => (
          <button
            key={action.key}
            type="button"
            className="portal-quick-action"
            aria-label={action.label}
            onClick={() => onActionClick(action.key)}
          >
            <span className="portal-quick-icon">{action.icon}</span>
            <span className="portal-quick-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
