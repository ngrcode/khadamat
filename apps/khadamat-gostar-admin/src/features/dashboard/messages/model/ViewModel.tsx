'use client';

import { message } from 'antd';
import type { FormikHelpers } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { useServiceRouteViewModel } from '@/features/dashboard/shared/serviceRoute/model/ViewModel';

import { attachTicketFile, createTicketResponse, getMyTickets } from '../api';
import type {
  GetMyTicketResponse,
  MessageResponseFormValues,
  MessageTicket,
} from '../types';

const messageResponseValidationSchema = Yup.object({
  text: Yup.string().trim().required('متن پیام الزامی است.'),
});

export const useMessagesViewModel = () =>
  useServiceRouteViewModel('messages');

export const useMessagesRequestViewModel = ({ open }: { open: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [tickets, setTickets] = useState<MessageTicket[]>([]);
  const [ticketResponse, setTicketResponse] =
    useState<GetMyTicketResponse | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedTicket = useMemo(
    () =>
      tickets.find((ticket) => ticket.id === selectedTicketId) ??
      tickets[0] ??
      null,
    [selectedTicketId, tickets],
  );

  const selectedTicketMessages = useMemo(
    () =>
      [...(selectedTicket?.responseDetail ?? [])].sort((first, second) => {
        if (first.id === undefined || second.id === undefined) return 0;

        return first.id - second.id;
      }),
    [selectedTicket],
  );

  const initialValues = useMemo<MessageResponseFormValues>(
    () => ({
      text: '',
    }),
    [],
  );

  const loadTickets = useCallback(async () => {
    setIsLoadingTickets(true);

    try {
      const response = await getMyTickets();
      const responseTickets = Array.isArray(response.info) ? response.info : [];

      setTicketResponse(response);
      setTickets(responseTickets);
      setSelectedTicketId((currentTicketId) => {
        if (
          currentTicketId &&
          responseTickets.some((ticket) => ticket.id === currentTicketId)
        ) {
          return currentTicketId;
        }

        return responseTickets[0]?.id ?? null;
      });
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در دریافت صندوق پیام‌ها');
    } finally {
      setIsLoadingTickets(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      void loadTickets();
    }
  }, [loadTickets, open]);

  const handleSubmit = async (
    values: MessageResponseFormValues,
    helpers: FormikHelpers<MessageResponseFormValues>,
  ) => {
    try {
      const ticketId = selectedTicket?.id;
      const assignUserId =
        selectedTicket?.senderId ?? selectedTicket?.assignedToUserId;

      if (!ticketId) {
        throw new Error('ابتدا یک تیکت را انتخاب کنید.');
      }

      await createTicketResponse({
        text: values.text.trim(),
        ticketId,
        assignUserId,
      });
      helpers.resetForm();
      message.success('پیام ارسال شد.');
      await loadTickets();
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در ارسال پیام');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const handleFileChange = async (file?: File) => {
    if (!file) return;

    try {
      const ticketId = selectedTicket?.id;

      if (!ticketId) {
        throw new Error('ابتدا یک تیکت را انتخاب کنید.');
      }

      setIsUploadingFile(true);
      await attachTicketFile({ ticketId, file });
      message.success('فایل پیام آپلود شد.');
      await loadTickets();
    } catch (error: any) {
      message.error(error?.message ?? 'خطا در آپلود فایل پیام');
    } finally {
      setIsUploadingFile(false);
    }
  };

  return {
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
    validationSchema: messageResponseValidationSchema,
    loadTickets,
    handleSubmit,
    handleFileChange,
  };
};
