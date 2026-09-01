'use client';

import {
  InboxOutlined,
  PaperClipOutlined,
  ReloadOutlined,
  SendOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Empty, Modal, Spin, Tag, Typography } from 'antd';
import { Field } from 'formik';
import { useEffect, useRef } from 'react';

import { CustomButton, FormikWrapper, TextAreaFormik } from '@repo/ui';
import { getPortalServiceByKey } from '@/features/dashboard/services';
import type { RequestModalProps } from '@/features/dashboard/shared/genericRequest/types';

import { useMessagesRequestViewModel } from '../model/ViewModel';
import type { MessageTicket, TicketResponseDetail } from '../types';

const getTicketTitle = (ticket: MessageTicket) =>
  ticket.senderFullName || `تیکت ${ticket.id ?? '-'}`;

const getResponseText = (response: TicketResponseDetail) =>
  response.text?.trim() || response.attachmentFiles || response.urlFile || 'بدون متن';

const isAdminMessage = (response: TicketResponseDetail) => {
  const senderName = response.senderFullName?.trim().toLowerCase() ?? '';

  return senderName === 'admin' || senderName === 'ادمین';
};

export function MessagesRequestModal({ open, onClose }: RequestModalProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const service = getPortalServiceByKey('messages');
  const {
    isMounted,
    isLoadingTickets,
    isUploadingFile,
    tickets,
    ticketResponse,
    selectedTicket,
    selectedTicketId,
    selectedTicketMessages,
    setSelectedTicketId,
    initialValues,
    validationSchema,
    loadTickets,
    handleSubmit,
    handleFileChange,
  } = useMessagesRequestViewModel({ open });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' });
  }, [selectedTicketId, selectedTicketMessages.length]);

  if (!isMounted || !service) return null;

  return (
    <Modal
      title={
        <div className="portal-modal-title">
          <span className="portal-modal-icon">{service.icon}</span>
          <div>
            <Typography.Title level={5} className="!mb-1 !text-slate-800">
              صندوق پیام‌ها
            </Typography.Title>
            <Typography.Text className="!text-xs !text-slate-500">
              گفتگوهای صندوق پیام‌ها
            </Typography.Text>
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={1040}
      className="portal-request-modal"
      destroyOnHidden
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="min-h-[520px] rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div>
              <Typography.Text className="block !font-bold !text-slate-800">
                تیکت‌ها
              </Typography.Text>
              <Typography.Text className="block !text-xs !text-slate-500">
                {tickets.length ? `${tickets.length} گفتگو` : 'در حال دریافت گفتگوها'}
              </Typography.Text>
            </div>
            <Button
              aria-label="بروزرسانی تیکت‌ها"
              icon={<ReloadOutlined />}
              loading={isLoadingTickets}
              onClick={() => void loadTickets()}
            />
          </div>

          <div className="max-h-[460px] overflow-y-auto p-3">
            {isLoadingTickets && !tickets.length ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <Spin />
              </div>
            ) : tickets.length ? (
              <div className="flex flex-col gap-2">
                {tickets.map((ticket) => {
                  const isSelected = ticket.id === selectedTicketId;

                  return (
                    <Button
                      key={ticket.id}
                      type="text"
                      className={`!h-auto !w-full !rounded-xl !p-3 !text-right ${
                        isSelected ? '!bg-white !shadow-sm' : '!bg-transparent'
                      }`}
                      onClick={() => setSelectedTicketId(ticket.id ?? null)}
                    >
                      <span className="flex w-full flex-col gap-2">
                        <span className="flex items-start justify-between gap-2">
                          <span className="min-w-0 truncate text-sm font-bold text-slate-800">
                            {getTicketTitle(ticket)}
                          </span>
                          {ticket.stateTitle && (
                            <Tag color={ticket.stateId === 2 ? 'green' : 'blue'}>
                              {ticket.stateTitle}
                            </Tag>
                          )}
                        </span>
                        <span className="text-xs text-slate-500">
                          شماره تیکت: {ticket.id ?? '-'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {ticket.created ?? ticket.lastUpdateDateTime ?? '-'}
                        </span>
                      </span>
                    </Button>
                  );
                })}
              </div>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="پیامی برای نمایش وجود ندارد."
              />
            )}
          </div>
        </aside>

        <section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {selectedTicket ? (
            <>
              <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf3ff] text-lg text-[#1d6fd8]">
                    <InboxOutlined />
                  </span>
                  <div>
                    <Typography.Text className="block !font-bold !text-slate-800">
                      {getTicketTitle(selectedTicket)}
                    </Typography.Text>
                    <Typography.Text className="block !text-xs !text-slate-500">
                      تیکت {selectedTicket.id ?? '-'} | {selectedTicket.created ?? '-'}
                    </Typography.Text>
                  </div>
                </div>
                {selectedTicket.stateTitle && (
                  <Tag color={selectedTicket.stateId === 2 ? 'green' : 'blue'}>
                    {selectedTicket.stateTitle}
                  </Tag>
                )}
              </div>

              <div className="portal-messages-list max-h-[330px] flex-1 overflow-y-auto bg-slate-50/70">
                {selectedTicketMessages.length ? (
                  selectedTicketMessages.map((response) => {
                    const isAdmin = isAdminMessage(response);

                    return (
                      <div
                        key={response.id}
                        className={`portal-message-row ${
                          isAdmin ? '' : 'portal-message-row-end'
                        }`}
                      >
                        <div className="portal-message-avatar">
                          <UserOutlined />
                        </div>
                        <div className="portal-message-content">
                          <span className="portal-message-sender">
                            {response.senderFullName || 'بدون نام'}
                          </span>
                          <div
                            className={`portal-message-bubble break-words whitespace-pre-wrap ${
                              isAdmin ? '' : 'portal-message-bubble-own'
                            }`}
                          >
                            {getResponseText(response)}
                            {(response.urlFile || response.attachmentFiles) && (
                              <div className="mt-2 flex items-center gap-2 text-xs text-[#1d6fd8]">
                                <PaperClipOutlined />
                                <span>{response.attachmentFiles || response.urlFile}</span>
                              </div>
                            )}
                          </div>
                          <span className="portal-message-time">
                            {response.entryDateTime ?? '-'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="جزئیات پیامی برای این تیکت ثبت نشده است."
                  />
                )}
                <div ref={messagesEndRef} />
              </div>

              {ticketResponse?.type === 'Error' && (
                <Alert
                  type="warning"
                  showIcon
                  className="!m-4 !mb-0"
                  message={ticketResponse.description ?? 'خطا در دریافت اطلاعات'}
                />
              )}

              <div className="border-t border-slate-200 p-4">
                <FormikWrapper
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values }) => (
                    <div className="grid gap-3">
                      <Field
                        name="text"
                        label="پیغام جدید"
                        component={TextAreaFormik}
                        placeholder="متن پیام را وارد کنید"
                        maxLength={2000}
                        style={{ minHeight: 92 }}
                      />
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <Button
                            icon={<UploadOutlined />}
                            loading={isUploadingFile}
                            onClick={() =>
                              document.getElementById('ticket-file-input')?.click()
                            }
                            className="!h-11 !rounded-xl"
                          >
                            آپلود فایل
                          </Button>
                          <input
                            id="ticket-file-input"
                            type="file"
                            className="hidden"
                            onChange={(event) => {
                              void handleFileChange(event.target.files?.[0]);
                              event.target.value = '';
                            }}
                          />
                        </div>
                        <CustomButton
                          label="ارسال پیام"
                          loading={isSubmitting}
                          disabled={!values.text.trim()}
                          animated={false}
                          icon={<SendOutlined />}
                          className="!h-11 !mt-10 !rounded-xl !border-none !bg-[#1d6fd8] !px-8 !text-white !shadow-none"
                        />
                      </div>
                    </div>
                  )}
                </FormikWrapper>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="برای مشاهده گفتگو، یک تیکت را انتخاب کنید."
              />
            </div>
          )}
        </section>
      </div>
    </Modal>
  );
}
