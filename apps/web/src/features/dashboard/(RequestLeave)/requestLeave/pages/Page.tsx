// UsersReport.tsx
'use client';

import React, { useCallback, useMemo } from 'react';
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
import { WageMonthlySearchParams } from '../types';
import ReportPage from '@/components/Table/reportPage/reportPage';
import DetailModal from '@/components/Table/detailModal/detailModal';
import { Edit } from '../edit/pages/Page';
import { message } from 'antd';
import DeleteModal from '@/components/Table/customTable/delete/delete';
import { showError, showSuccess } from '@/hook/useToust';
import { GET_REQUESTLEAVE_URL, QUERY_REQUESTLEAVE } from '@/constants/endPoint/requestLeave';
import { requestLeaveDelete, requestLeaveIndex } from '@/generated/api/request-leave/request-leave';
import type { Commons } from '@/generated/api/model';

const RequestLeaveReport = () => {
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

      await requestLeaveDelete({ Id: Number(id) }, { headers });
      showSuccess(t('deleteSuccess'));
    } catch (error) {
      console.error('Delete error:', error);
      showError(t('deleteError'));
      throw error;
    }
  }, [headers]);

  const vm = useReportViewModel<WageMonthlySearchParams>({
    url: GET_REQUESTLEAVE_URL,
    getInitialValues,
    getValidationSchema,
    buildQueryParams,
    buildQueryKey,
    formatDateFields: formatSearchDates,
    selectData,
    getColumns,
    requestFn: (params) => requestLeaveIndex(params as Commons, { headers }),
    rowKey: 'id',
    fetchOnMount: true,
    method: 'post',
    headers,
    onDelete: handleDelete,
  });

  return (
    <ReportPage<WageMonthlySearchParams>
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
        title: t('requestLeave'),
        showDownload: false,
        subtitle: t('requestLeaveReportSubtitle'),
        rowKey: 'id',
        scrollX: 1400,
        settingsKey: QUERY_REQUESTLEAVE,
        enableRowDrag: true,
        enableColumnDrag: true,
        pageSizeOptions: [10, 20, 50, 100, 200, 400],
        showNextPrevButtons: true,
        features: {
          onDetail: true,
          onEdit: true,
          onDelete: true,
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

export default RequestLeaveReport;
