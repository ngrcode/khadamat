'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
  MessageOutlined,
  PaperClipOutlined,
  ReloadOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Empty,
  Input,
  Skeleton,
  Space,
  Tag,
  Typography,
  Upload,
  message,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

import { t } from '@/configs/language';
import { useLanguage } from '@/configs/language/languageProvider';
import { showError, showSuccess } from '@/hook/useToust';
import type { ResponseDetailDto } from '@/generated/api/model';

import {
  attachTicketFile,
  createTicketResponse,
  getTicketDetail,
  selectTicketDetail,
  ticketDetailQueryKey,
} from '../api';

const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;

interface TicketDetailViewProps {
  ticketId: number | null;
}

const getAttachmentUrl = (path?: string | null) => {
  const filePath = path?.trim();
  if (!filePath) return null;
  if (/^https?:\/\//i.test(filePath)) return filePath;

  const baseUrl = process.env.BASE_URL ?? '';
  const separator = baseUrl.endsWith('/') || filePath.startsWith('/') ? '' : '/';
  return `${baseUrl}${separator}${filePath}`;
};

const TicketMessage = ({ item }: { item: ResponseDetailDto }) => {
  const isSender = item.isSender === true;
  const attachmentUrl = getAttachmentUrl(item.urlFile || item.attachmentFiles);

  return (
    <div className={`flex gap-3 ${isSender ? 'justify-end' : 'justify-start'}`}>
      {!isSender && (
        <Avatar
          icon={<UserOutlined />}
          className="bg-[var(--app-surface-alt)] text-[var(--app-text)]"
        />
      )}

      <div
        className={[
          'max-w-[min(760px,88%)] rounded-2xl border px-4 py-3 shadow-sm',
          isSender
            ? 'border-[rgba(var(--color-primary-rgb),0.26)] bg-[rgba(var(--color-primary-rgb),0.1)]'
            : 'border-[var(--table-border-color)] bg-[var(--app-surface-alt)]',
        ].join(' ')}
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <Text strong className="text-[var(--app-text)]">
            {item.senderFullName || t('unknown')}
          </Text>
          <Text className="text-xs text-[var(--app-muted)]">
            {item.entryDateTime || t('noData')}
          </Text>
        </div>

        <Paragraph className="!mb-0 whitespace-pre-wrap text-[var(--app-text)]">
          {item.text || t('noData')}
        </Paragraph>

        {attachmentUrl && (
          <a
            href={attachmentUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--table-border-color)] px-3 py-1.5 text-sm text-[rgb(var(--color-primary-rgb))] transition hover:bg-[rgba(var(--color-primary-rgb),0.08)]"
          >
            <PaperClipOutlined />
            {t('viewAttachment')}
          </a>
        )}
      </div>

      {isSender && (
        <Avatar
          icon={<UserOutlined />}
          className="bg-[rgba(var(--color-primary-rgb),0.16)] text-[rgb(var(--color-primary-rgb))]"
        />
      )}
    </div>
  );
};

const TicketDetailView = ({ ticketId }: TicketDetailViewProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { direction } = useLanguage();
  const [replyText, setReplyText] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const isValidTicketId = Number.isFinite(ticketId) && Number(ticketId) > 0;
  const numericTicketId = Number(ticketId);

  const query = useQuery({
    queryKey: isValidTicketId ? ticketDetailQueryKey(numericTicketId) : ['ticket-detail', 'invalid'],
    queryFn: () => getTicketDetail(numericTicketId),
    enabled: isValidTicketId,
  });

  const createResponseMutation = useMutation({
    mutationFn: createTicketResponse,
  });

  const attachFileMutation = useMutation({
    mutationFn: attachTicketFile,
  });

  const ticket = useMemo(() => selectTicketDetail(query.data), [query.data]);
  const messages = useMemo(
    () => (Array.isArray(ticket?.responseDetail) ? ticket.responseDetail : []),
    [ticket?.responseDetail],
  );

  const selectedFile = fileList[0]?.originFileObj as File | undefined;
  const isSubmitting =
    createResponseMutation.isPending || attachFileMutation.isPending;

  const handleUploadChange = useCallback(({ fileList: nextFileList }: { fileList: UploadFile[] }) => {
    setFileList(nextFileList.slice(-1));
  }, []);

  const refreshTicket = useCallback(async () => {
    if (!isValidTicketId) return;
    await queryClient.invalidateQueries({
      queryKey: ticketDetailQueryKey(numericTicketId),
    });
  }, [isValidTicketId, numericTicketId, queryClient]);

  const handleSubmit = useCallback(async () => {
    if (!isValidTicketId) return;

    const text = replyText.trim();
    if (!text && !selectedFile) {
      message.warning(t('ticketReplyRequired'));
      return;
    }

    try {
      if (text) {
        await createResponseMutation.mutateAsync({
          ticketId: numericTicketId,
          text,
        });
      }

      if (selectedFile) {
        await attachFileMutation.mutateAsync({
          ticketId: numericTicketId,
          file: selectedFile,
        });
      }

      setReplyText('');
      setFileList([]);
      showSuccess(t('ticketReplySent'));
      await refreshTicket();
    } catch (error) {
      showError(t('ticketReplyError'));
    }
  }, [
    attachFileMutation,
    createResponseMutation,
    isValidTicketId,
    numericTicketId,
    refreshTicket,
    replyText,
    selectedFile,
  ]);

  if (!isValidTicketId) {
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
                onClick={() => router.push('/dashboard/ticket')}
              >
                {t('backToTickets')}
              </Button>
              <div>
                <Title level={4} className="!mb-1 !text-[var(--app-text)]">
                  {t('ticketDetailTitle')} #{numericTicketId}
                </Title>
                <Text className="text-[var(--app-muted)]">
                  {t('ticketDetailSubtitle')}
                </Text>
              </div>
            </Space>

            <Space size={10} wrap>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => query.refetch()}
                loading={query.isFetching}
              >
                {t('refresh')}
              </Button>
              <Tag color={ticket?.stateId === 5 ? 'processing' : 'success'}>
                {ticket?.stateTitle || t('unknown')}
              </Tag>
            </Space>
          </div>
        </div>

        {query.isLoading ? (
          <div className="space-y-4 p-4 md:p-6">
            <Skeleton active paragraph={{ rows: 3 }} />
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        ) : query.isError ? (
          <div className="flex min-h-[360px] items-center justify-center p-6">
            <Empty description={t('errorLoadingData')}>
              <Button onClick={() => query.refetch()} icon={<ReloadOutlined />}>
                {t('retry')}
              </Button>
            </Empty>
          </div>
        ) : (
          <>
            <div className="grid gap-3 border-b border-[var(--table-border-color)] p-4 md:grid-cols-4 md:p-6">
              <div className="rounded-xl bg-[var(--app-surface-alt)] p-3">
                <Text className="block text-xs text-[var(--app-muted)]">{t('sender')}</Text>
                <Text strong>{ticket?.senderFullName || t('noData')}</Text>
              </div>
              <div className="rounded-xl bg-[var(--app-surface-alt)] p-3">
                <Text className="block text-xs text-[var(--app-muted)]">{t('createdDate')}</Text>
                <Text strong>{ticket?.created || t('noData')}</Text>
              </div>
              <div className="rounded-xl bg-[var(--app-surface-alt)] p-3">
                <Text className="block text-xs text-[var(--app-muted)]">{t('assignedToUserId')}</Text>
                <Text strong>{ticket?.assignedToUserId ?? t('noData')}</Text>
              </div>
              <div className="rounded-xl bg-[var(--app-surface-alt)] p-3">
                <Text className="block text-xs text-[var(--app-muted)]">{t('messageCount')}</Text>
                <Text strong>{messages.length}</Text>
              </div>
            </div>

            <div className="min-h-[360px] space-y-4 p-4 md:p-6">
              {messages.length > 0 ? (
                messages.map((item, index) => (
                  <TicketMessage key={item.id ?? index} item={item} />
                ))
              ) : (
                <div className="flex min-h-[240px] items-center justify-center">
                  <Empty description={t('ticketNoResponses')} />
                </div>
              )}
            </div>

            <div className="border-t border-[var(--table-border-color)] bg-[var(--app-surface-alt)] p-4 md:p-6">
              <div className="mb-3 flex items-center gap-2">
                <MessageOutlined className="text-[rgb(var(--color-primary-rgb))]" />
                <Text strong>{t('sendTicketReply')}</Text>
              </div>

              <TextArea
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                placeholder={t('ticketReplyPlaceholder')}
                autoSize={{ minRows: 4, maxRows: 8 }}
                disabled={isSubmitting}
                className="!bg-[var(--app-surface)] !text-[var(--app-text)]"
              />

              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Space wrap>
                  <Upload
                    maxCount={1}
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleUploadChange}
                    onRemove={() => {
                      setFileList([]);
                      return true;
                    }}
                  >
                    <Button icon={<PaperClipOutlined />} disabled={isSubmitting}>
                      {fileList.length ? t('changeFile') : t('attachTicketFile')}
                    </Button>
                  </Upload>

                  {fileList.length > 0 && (
                    <Tag icon={<FileTextOutlined />} color="blue">
                      {fileList[0]?.name}
                    </Tag>
                  )}
                </Space>

                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSubmit}
                  loading={isSubmitting}
                >
                  {t('sendReply')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketDetailView;
