'use client';

import { BellOutlined } from '@ant-design/icons';
import { Empty, Spin, Typography } from 'antd';

import { useTranslate } from '@repo/i18n/react';
import { SectionHeader } from './SectionHeader';
import type { DashboardNotification } from '../types';

const stripHtml = (value?: string | null) =>
  (value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function BulletinCard({
  notifications,
  isLoading,
}: {
  notifications: DashboardNotification[];
  isLoading: boolean;
}) {
  const translate = useTranslate();

  return (
    <div className="portal-card portal-bulletin-card">
      <SectionHeader title={translate('dashboardBulletin')} icon={<BellOutlined />} />
      <div className="portal-bulletin-list">
        {isLoading ? (
          <div className="portal-bulletin-empty">
            <Spin />
          </div>
        ) : notifications.length ? (
          notifications.slice(0, 4).map((notification) => (
            <article key={notification.id} className="portal-bulletin-item">
              <Typography.Text className="portal-text-title block !text-sm !font-bold !leading-7">
                {notification.title}
              </Typography.Text>
              {stripHtml(notification.body) && (
                <Typography.Text className="portal-text-body mt-1 block !text-xs !leading-6">
                  {stripHtml(notification.body)}
                </Typography.Text>
              )}
              <span className="portal-text-meta mt-2 block text-xs">
                {notification.created ?? '-'}
              </span>
            </article>
          ))
        ) : (
          <div className="portal-bulletin-empty">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={translate('dashboardNoBulletins')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
