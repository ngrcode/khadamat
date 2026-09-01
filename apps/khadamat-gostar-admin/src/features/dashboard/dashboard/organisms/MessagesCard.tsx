'use client';

import { InboxOutlined, UserOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';

import { useTranslate } from '@repo/i18n/react';
import { SectionHeader } from './SectionHeader';
import type { DashboardMessage } from '../types';

export function MessagesCard({
  messages,
  isLoading,
  onShowAll,
}: {
  messages: DashboardMessage[];
  isLoading: boolean;
  onShowAll: () => void;
}) {
  const translate = useTranslate();

  return (
    <div className="portal-card portal-messages-card">
      <SectionHeader
        title={translate('dashboardLatestMessages')}
        icon={<InboxOutlined />}
        showAll
        onShowAll={onShowAll}
      />

      <div className="portal-messages-list">
        {isLoading ? (
          <div className="flex min-h-[340px] items-center justify-center">
            <Spin />
          </div>
        ) : messages.length ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`portal-message-row ${
                message.align === 'end' ? 'portal-message-row-end' : ''
              }`}
            >
              <div className="portal-message-avatar">
                <UserOutlined />
              </div>
              <div className="portal-message-content">
                <span className="portal-message-sender">{message.sender}</span>
                <div
                  className={`portal-message-bubble ${
                    message.align === 'end' ? 'portal-message-bubble-own' : ''
                  }`}
                >
                  {message.text}
                </div>
                <span className="portal-message-time">{message.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex min-h-[340px] items-center justify-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={translate('dashboardNoMessages')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
