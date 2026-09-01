'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MessageOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Empty, Input, Space, Typography, message } from 'antd';

import { t } from '@/configs/language';
import { useLanguage } from '@/configs/language/languageProvider';
import { showError, showSuccess } from '@/hook/useToust';

import { createTicketForUser } from '../api';

const { Text, Title } = Typography;
const { TextArea } = Input;

interface UserTicketChatViewProps {
  userId: number | null;
}

const UserTicketChatView = ({ userId }: UserTicketChatViewProps) => {
  const router = useRouter();
  const { direction } = useLanguage();
  const [ticketText, setTicketText] = useState('');

  const numericUserId = Number(userId);
  const isValidUserId = Number.isFinite(numericUserId) && numericUserId > 0;
  const trimmedText = useMemo(() => ticketText.trim(), [ticketText]);

  const createTicketMutation = useMutation({
    mutationFn: createTicketForUser,
  });

  const handleBack = useCallback(() => {
    router.push('/dashboard/users');
  }, [router]);

  const handleSubmit = useCallback(async () => {
    if (!isValidUserId) {
      message.warning(t('invalidUserId'));
      return;
    }

    if (!trimmedText) {
      message.warning(t('messageTextRequired'));
      return;
    }

    try {
      await createTicketMutation.mutateAsync({
        assignUserId: numericUserId,
        text: trimmedText,
      });
      setTicketText('');
      showSuccess(t('ticketUserMessageSent'));
    } catch (error) {
      showError(t('ticketUserMessageError'));
    }
  }, [createTicketMutation, isValidUserId, numericUserId, trimmedText]);

  if (!isValidUserId) {
    return (
      <div className="p-4">
        <div className="report-surface flex min-h-[320px] items-center justify-center">
          <Empty description={t('recordIdNotFound')} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 pb-8 pt-4 md:px-4">
      <div className="report-surface overflow-hidden">
        <div className="border-b border-[var(--table-border-color)] bg-[var(--app-surface-alt)] px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Space size={12} wrap>
              <Button
                icon={direction === 'rtl' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
                onClick={handleBack}
              >
                {t('backToUsers')}
              </Button>

              <Avatar
                size={46}
                icon={<MessageOutlined />}
                className="bg-[rgba(var(--color-primary-rgb),0.16)] text-[rgb(var(--color-primary-rgb))]"
              />

              <div>
                <Title level={4} className="!mb-1 !text-[var(--app-text)]">
                  {t('userTicketTitle')} #{numericUserId}
                </Title>
                <Text className="text-[var(--app-muted)]">
                  {t('userTicketSubtitle')}
                </Text>
              </div>
            </Space>

            <Space size={8} wrap className="rounded-xl border border-[var(--table-border-color)] bg-[var(--app-card-bg)] px-3 py-2">
              <UserOutlined className="text-[rgb(var(--color-primary-rgb))]" />
              <Text className="text-[var(--app-muted)]">{t('selectedUserId')}</Text>
              <Text strong className="font-mono text-[var(--app-text)]">
                {numericUserId}
              </Text>
            </Space>
          </div>
        </div>

        <div className="grid gap-4 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-[var(--table-border-color)] bg-[var(--app-card-bg)] p-4 shadow-sm md:p-5">
            <Space size={10} className="mb-4">
              <Avatar
                icon={<MessageOutlined />}
                className="bg-[rgba(var(--color-primary-rgb),0.12)] text-[rgb(var(--color-primary-rgb))]"
              />
              <div>
                <Text strong className="block text-[var(--app-text)]">
                  {t('messageText')}
                </Text>
                <Text className="text-xs text-[var(--app-muted)]">
                  {t('createTicketForUser')}
                </Text>
              </div>
            </Space>

            <TextArea
              value={ticketText}
              onChange={(event) => setTicketText(event.target.value)}
              placeholder={t('messageTextPlaceholder')}
              autoSize={{ minRows: 7, maxRows: 12 }}
              maxLength={1200}
              showCount
              className="!bg-[var(--app-surface)] !text-[var(--app-text)]"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Text className="text-xs text-[var(--app-muted)]">
                {t('ticketCreateHint')}
              </Text>

              <Button
                type="primary"
                size="large"
                icon={<SendOutlined />}
                loading={createTicketMutation.isPending}
                disabled={!trimmedText}
                onClick={handleSubmit}
                className="min-w-[140px]  "
              >
                {t('sendMessage')}
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--table-border-color)] bg-[var(--app-surface-alt)] p-4 md:p-5">
            <Avatar
              size={52}
              icon={<UserOutlined />}
              className="mb-4 bg-[rgba(var(--color-primary-rgb),0.16)] text-[rgb(var(--color-primary-rgb))]"
            />
            <Title level={5} className="!mb-2 !text-[var(--app-text)]">
              {t('ticketUserConversation')}
            </Title>
            <Text className="block text-[var(--app-muted)]">
              {t('ticketUserConversationCaption')}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTicketChatView;
