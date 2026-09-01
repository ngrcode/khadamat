'use client';

import { CalendarOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Empty, Modal, Spin, Typography } from 'antd';
import { useMemo, useState } from 'react';

import { useTranslate } from '@repo/i18n/react';
import { SectionHeader } from './SectionHeader';
import type { DashboardNotificationPanel } from '../types';

const stripHtml = (value?: string | null) =>
  (value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getNotificationText = (notification?: DashboardNotificationPanel | null) =>
  notification?.excerpt?.trim() ||
  stripHtml(notification?.body) ||
  notification?.title?.trim() ||
  '';

export function EventsCard({
  notifications,
  isLoading,
}: {
  notifications: DashboardNotificationPanel[];
  isLoading: boolean;
}) {
  const translate = useTranslate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const latestNotification = useMemo(
    () => notifications[notifications.length - 1] ?? null,
    [notifications],
  );
  const latestText = getNotificationText(latestNotification);

  return (
    <div className="portal-card portal-events-card">
      <SectionHeader
        title={translate('dashboardUpcomingEvents')}
        icon={<CalendarOutlined />}
        showAll={notifications.length > 0}
        onShowAll={() => setIsModalOpen(true)}
      />

      <div className="portal-event-body">
        {isLoading ? (
          <div className="flex min-h-[160px] items-center justify-center">
            <Spin />
          </div>
        ) : latestNotification ? (
          <>
            <Typography.Paragraph className="portal-text-title !mb-4 !text-sm !leading-7">
              {latestNotification.title}
            </Typography.Paragraph>

            {latestText && latestText !== latestNotification.title && (
              <Typography.Paragraph className="portal-text-body !mb-4 !text-xs !leading-6">
                {latestText}
              </Typography.Paragraph>
            )}

            <div className="portal-event-footer">
              {latestNotification.attachFile && (
                <button type="button" className="portal-attachment-badge">
                  <PaperClipOutlined />
                  {translate('dashboardHasAttachment')}
                </button>
              )}
              <div className="portal-event-meta">
                <span className="portal-event-date">
                  {latestNotification.startedAtString ??
                    latestNotification.finishedAtString ??
                    '-'}
                </span>
                <button
                  type="button"
                  className="portal-more-link"
                  onClick={() => setIsModalOpen(true)}
                >
                  {translate('dashboardMore')}
                </button>
              </div>
            </div>
          </>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={translate('dashboardNoEvents')}
          />
        )}
      </div>

      <Modal
        title={translate('dashboardAllUpcomingEvents')}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={760}
        className="portal-request-modal"
      >
        <div className="grid max-h-[520px] gap-3 overflow-y-auto">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className="portal-bulletin-item rounded-xl p-4"
            >
              <Typography.Text className="portal-text-title block !font-bold !leading-7">
                {notification.title}
              </Typography.Text>
              <Typography.Text className="portal-text-body mt-2 block !text-xs !leading-6">
                {getNotificationText(notification)}
              </Typography.Text>
              <span className="portal-text-meta mt-3 block text-xs">
                {notification.startedAtString ?? notification.finishedAtString ?? '-'}
              </span>
            </article>
          ))}
        </div>
      </Modal>
    </div>
  );
}
