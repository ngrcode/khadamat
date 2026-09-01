// HokmReport.tsx
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
import { HokmSearchParams } from '../types';
import ReportPage from '@/components/Table/reportPage/reportPage';
import DetailModal from '@/components/Table/detailModal/detailModal';
import { Edit } from '../edit/pages/Page';
import { message } from 'antd';
import DeleteModal from '@/components/Table/customTable/delete/delete';
import { showError, showSuccess } from '@/hook/useToust';
import { DELETE_HOKM_URL, GET_HOKM_URL, QUERY_HOKM } from '@/constants/endPoint/hokm';
import { employeeDeleteHokm, employeeGetHokmGrid } from '@/generated/api/employee/employee';
import type { Commons } from '@/generated/api/model';

const HokmReport = () => {
  const { userType } = useAuthStore();

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }), []);

  const handleDelete = useCallback(async (record: any) => {
    try {
      const year = record?.year || record?.Year || record?.id || record?.Id;

      if (!year) {
        message.error(t('recordIdNotFound'));
        throw new Error('Record year not found');
      }

      await employeeDeleteHokm({ year: Number(year) }, { headers });
      showSuccess(t('deleteSuccess'));
    } catch (error) {
      console.error('Delete error:', error);
      showError(t('deleteError'));
      throw error;
    }
  }, [headers]);

  const vm = useReportViewModel<HokmSearchParams>({
    url: GET_HOKM_URL,
    getInitialValues,
    getValidationSchema,
    buildQueryParams,
    buildQueryKey,
    formatDateFields: formatSearchDates,
    selectData,
    getColumns,
    requestFn: (params) => employeeGetHokmGrid(params as Commons, { headers }),
    rowKey: 'id',
    fetchOnMount: true,
    method: 'post',
    headers,
    onDelete: handleDelete,
  });

  return (
    <ReportPage<HokmSearchParams>
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
        title: t('hokm'),
        showDownload: false,
        subtitle: t('hokmReportSubtitle'),
        rowKey: 'id',
        scrollX: 720,
        settingsKey: QUERY_HOKM,
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

export default HokmReport;
