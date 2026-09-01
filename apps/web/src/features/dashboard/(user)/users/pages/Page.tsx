// UsersReport.tsx
'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MessageOutlined } from '@ant-design/icons';
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
import { GET_USERS_URL, QUERY_USERS } from '@/constants/endPoint/users';
import { employeeDelete, employeeGetAllEmployee } from '@/generated/api/employee/employee';
import type { Commons } from '@/generated/api/model';

const UsersReport = () => {
  const { userType } = useAuthStore();
  const router = useRouter();

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

      await employeeDelete({ Id: Number(id) }, { headers });
      showSuccess(t('deleteSuccess'));
    } catch (error) {
      console.error('Delete error:', error);
      showError(t('deleteError'));
      throw error;
    }
  }, [headers]);

  const handleChatWithUser = useCallback((record: any) => {
    const id = record?.id || record?.Id || record?.userId || record?.employeeId;
    const numericId = Number(id);

    if (!Number.isFinite(numericId) || numericId <= 0) {
      showError(t('recordIdNotFound'));
      return;
    }

    router.push(`/dashboard/users/${numericId}`);
  }, [router]);

  const vm = useReportViewModel<WageMonthlySearchParams>({
    url: GET_USERS_URL,
    getInitialValues,
    getValidationSchema,
    buildQueryParams,
    buildQueryKey,
    formatDateFields: formatSearchDates,
    selectData,
    getColumns,
    requestFn: (params) => employeeGetAllEmployee(params as Commons, { headers }),
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
        title: t('users'),
        showDownload: false,
        subtitle: t('usersReportSubtitle'),
        rowKey: 'id',
        scrollX: 1520,
        settingsKey: QUERY_USERS,
        enableRowDrag: true,
        enableColumnDrag: true,
        rowActions: [
          {
            key: 'chatWithUser',
            title: t('chatWithUser'),
            icon: <MessageOutlined />,
            onClick: handleChatWithUser,
            type: 'link',
            className:
              'text-[rgb(var(--color-primary-rgb))] hover:text-[var(--color-primary)] hover:scale-110 transition-all duration-300',
          },
        ],
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
          showSaveSettings: true,
          showResetSettings: true,
          showRowSize: false,
          showExport: false,
          showExportCSV: false,
          showExportPDF: false,
          showPrint: true,
          showStatistics: true,
          showContextMenu: true,
          enableKeyboardNavigation: true,
          showFullscreen: true,
          showMaximize: true,
          showDarkMode: false,
        },
      }}
    />
  );
};

export default UsersReport;
