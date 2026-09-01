'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { t } from '@/components';
import { useAuthStore } from '@/store/authStore';
import { useReportViewModel } from '@/hook/useReportViewModel';
import { getColumns } from '../columns';
import {
  getInitialValues,
  getValidationSchema,
  buildQueryParams,
  buildQueryKey,
  formatSearchDates,
  selectData,
} from '../model/ViewModel';
import { TicketSearchParams } from '../types';
import ReportPage from '@/components/Table/reportPage/reportPage';
import DetailModal from '@/components/Table/detailModal/detailModal';
import { Edit } from '../edit/pages/Page';
import { message } from 'antd';
import DeleteModal from '@/components/Table/customTable/delete/delete';
import { showError, showSuccess } from '@/hook/useToust';
import { GET_TICKET_URL, QUERY_TICKET } from '@/constants/endPoint/ticket';
import { MessageOutlined } from '@ant-design/icons';
import {
  ticketDelete,
  ticketGetAllTicket,
} from '@/generated/api/ticket/ticket';
import type { Commons } from '@/generated/api/model';

const TicketReport = () => {
  const router = useRouter();
  const { userType } = useAuthStore();

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }), []);

  const handleDelete = useCallback(async (record: any) => {
    try {
      const id = record?.id || record?.terminalId || record?.Id;

      if (!id) {
        message.error(t('recordIdNotFound'));
        throw new Error('Record ID not found');
      }

      await ticketDelete({ Id: Number(id) }, { headers });
      showSuccess(t('deleteSuccess'));
    } catch (error) {
      console.error('Delete error:', error);
      showError(t('deleteError'));
      throw error;
    }
  }, [headers]);

  const handleReply = useCallback((record: any) => {
    const id = record?.id || record?.ticketId || record?.Id;

    if (!id) {
      message.error(t('recordIdNotFound'));
      return;
    }

    router.push(`/dashboard/ticket/${id}`);
  }, [router]);

  const rowActions = useMemo(() => [
    {
      key: 'ticket-reply',
      title: t('replyTicket'),
      icon: <MessageOutlined />,
      onClick: handleReply,
      className: 'text-emerald-600 hover:text-emerald-700 hover:scale-110 transition-all duration-300',
    },
  ], [handleReply]);

  const vm = useReportViewModel<TicketSearchParams>({
    url: GET_TICKET_URL,
    getInitialValues,
    getValidationSchema,
    buildQueryParams,
    buildQueryKey,
    formatDateFields: formatSearchDates,
    selectData,
    getColumns,
    requestFn: (params) => ticketGetAllTicket(params as Commons, { headers }),
    rowKey: 'id',
    fetchOnMount: true,
    method: 'post',
    headers,
    onDelete: handleDelete,
  });

  return (
    <ReportPage<TicketSearchParams>
      vm={vm}
      userType={userType}
      filterFields={false}
      renderDetailModal={(record, onClose) => (
        <DetailModal
          data={record}
          onClose={onClose}
          title={t('details')}
          size="full"
        />
      )}
      renderEditModal={(record, onClose) => (
        <Edit
          record={record}
          onClose={onClose}
          onSuccess={vm.refetch}
        />
      )}
      renderDeleteModal={(record, onClose) => (
        <DeleteModal
          record={record}
          onClose={onClose}
          onConfirm={async () => {
            await handleDelete(record);
            onClose();
            vm.refetch();
          }}
          loading={false}
        />
      )}
      config={{
        filterHeader: 'filter',
        title: t('ticket'),
        showDownload: false,
        subtitle: t('ticketReportSubtitle'),
        rowKey: 'id',
        scrollX: 1400,
        settingsKey: QUERY_TICKET,
        rowActions,
        enableRowDrag: true,
        enableColumnDrag: true,
        pageSizeOptions: [10, 20, 50, 100, 200, 400],
        showNextPrevButtons: true,
        features: {
          onDetail: true,
          onEdit: false,
          onDelete: false,
          onCopy: true,
          showRowSelection: true,
          showRefresh: true,
          showDensity: false,
          showSearch: true,
          showColumnSettings: true,
          showExport: false,
          showExportCSV: false,
          showExportPDF: false,
          showStatistics: true,
          showMaximize: true,
          showDarkMode: false,
        },
      }}
    />
  );
};

export default TicketReport;
