// ReportPage.tsx
'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { t } from '@repo/i18n';
import CustomTable from '../customTable/customTable';
import CustomTableWrapper from '../customTableWrapper/CustomTableWrapper';
import { Spin, Empty, message, Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Collaps from '../../form/collaps/collaps';
import type { ActionColumnAction } from '../../action/actionColumn';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ReportPageConfig {
        filterHeader?: string;
        title?: string;
        filterShow?: boolean;
        subtitle?: string;
        rowKey?: string;
        scrollX?: number;
        showDownload?: boolean;
        pageSizeOptions?: number[];
        settingsKey?: string;
        enableRowDrag?: boolean;
        enableColumnDrag?: boolean;
        rowActions?: ActionColumnAction<any>[];
        showNextPrevButtons?: boolean;
        features?: Partial<{
                showRefresh: boolean;
                showFullscreen: boolean;
                showDensity: boolean;
                showSearch: boolean;
                showColumnSettings: boolean;
                showFilterPanel: boolean;
                showSaveSettings: boolean;
                showResetSettings: boolean;
                showDarkMode: boolean;
                showRowSize: boolean;
                showStatistics: boolean;
                showExpandAll: boolean;
                showRowSelection: boolean;
                showContextMenu: boolean;
                enableKeyboardNavigation: boolean;
                showMaximize: boolean;
                showExport: boolean;
                showExportPDF: boolean;
                showExportCSV: boolean;
                showPrint: boolean;
                onDetail: boolean;
                onEdit: boolean;
                onDelete: boolean;
                onCopy: boolean;
        }>;
}

export interface ReportPageProps<TSearch extends Record<string, any> = any> {
        vm: {
                handleOnSubmit: (values: TSearch) => void;
                handleReset: () => void;
                initialValues: TSearch;
                validationSchema: (userType?: any) => any;
                isLoading: boolean;
                isError: boolean;
                isSearchEnabled?: boolean;
                errorMessage?: string;
                emptyErrorMessage?: string;
                formatedData: any[];
                columns: any[];
                downloadExcel: () => void;
                excelLoading: boolean;
                pagination: { current: number; pageSize: number; total: number; hasMore: boolean };
                onPageChange: (page: number, pageSize: number) => void;
                hasMore: boolean;
                nextPage: () => void;
                prevPage: () => void;
                sortField: any;
                sortOrder: any;
                handleSortChange: (field: any, order: any) => void;
                filters: Record<string, any>;
                handleFilterChange: (filters: any) => void;
                modalVisibleDetail: any;
                setModalVisibleDetail: (value: any) => void;
                modalVisibleEdit?: any;
                setModalVisibleEdit?: (value: any) => void;
                modalVisibleDelete?: any;
                setModalVisibleDelete?: (value: any) => void;
                refetch: () => void;
                rowKey?: string;
                onDelete?: (record: any) => Promise<void> | void;
                onBatchDelete?: (records: any[]) => Promise<void> | void;
        };
        userType?: any;
        filterFields: React.ReactNode;
        renderDetailModal?: (record: any, onClose: () => void) => React.ReactNode;
        renderEditModal?: (record: any, onClose: () => void) => React.ReactNode;
        renderDeleteModal?: (record: any, onClose: () => void) => React.ReactNode;
        config?: ReportPageConfig;
}

// ─────────────────────────────────────────────
// Default config
// ─────────────────────────────────────────────
const DEFAULT_CONFIG: Required<ReportPageConfig> = {
        filterHeader: 'filter',
        title: '',
        filterShow: false,
        subtitle: '',
        rowKey: 'id',
        scrollX: 1800,
        showDownload: true,
        pageSizeOptions: [10, 20, 50, 100, 200, 400, 600, 800, 1000],
        settingsKey: 'report',
        enableRowDrag: false,
        enableColumnDrag: false,
        rowActions: [],
        showNextPrevButtons: false,
        features: {
                showRefresh: false,
                showFullscreen: true,
                showDensity: false,
                showSearch: true,
                showColumnSettings: true,
                showFilterPanel: false,
                showSaveSettings: true,
                showResetSettings: true,
                showDarkMode: true,
                showRowSize: false,
                showStatistics: true,
                showExpandAll: false,
                showRowSelection: false,
                showContextMenu: false,
                enableKeyboardNavigation: true,
                showMaximize: true,
                showExport: true,
                showExportPDF: true,
                showExportCSV: true,
                showPrint: true,
                onDetail: true,
                onEdit: false,
                onDelete: false,
                onCopy: true,
        },
};

const CollapsComponent = Collaps as React.ComponentType<any>;

// ─────────────────────────────────────────────
// CSV helper
// ─────────────────────────────────────────────
function buildCsv(columns: any[], rows: any[]): string {
        const exportCols = columns.filter(
                (col) => col.dataIndex !== 'action' && col.dataIndex !== 'row'
        );
        const headers = exportCols.map((col) => col.title ?? col.dataIndex);
        const csvRows = rows.map((item) =>
                exportCols
                        .map((col) => {
                                const val = item[col.dataIndex];
                                return val !== null && val !== undefined ? `"${val}"` : '';
                        })
                        .join(',')
        );
        return '\uFEFF' + [headers.join(','), ...csvRows].join('\n');
}

function downloadBlob(content: string, filename: string, mimeType: string) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function ReportPage<TSearch extends Record<string, any> = any>({
        vm,
        userType,
        filterFields,
        renderDetailModal,
        renderEditModal,
        renderDeleteModal,
        config: configProp,
}: ReportPageProps<TSearch>) {
        const cfg: Required<ReportPageConfig> = {
                ...DEFAULT_CONFIG,
                ...configProp,
                features: { ...DEFAULT_CONFIG.features, ...(configProp?.features ?? {}) },
        };

        const schema = useMemo(() => vm.validationSchema(userType), [userType, vm.validationSchema]);
        const handleCloseDetailModal = useCallback(() => vm.setModalVisibleDetail(false), [vm.setModalVisibleDetail]);
        const handleCloseEditModal = useCallback(() => {
                vm.setModalVisibleEdit?.(false);
        }, [vm.setModalVisibleEdit]);
        const handleCloseDeleteModal = useCallback(() => {
                vm.setModalVisibleDelete?.(false);
        }, [vm.setModalVisibleDelete]);

        // ── Delete handler ────────────────────────
        const handleDelete = useCallback(async (record: any) => {
                if (vm.onDelete) {
                        try {
                                await vm.onDelete(record);
                                message.success(t('deleteSuccess'));
                                vm.refetch();
                        } catch (error) {
                                message.error(t('deleteError'));
                                console.error('Delete error:', error);
                        }
                } else {
                        Modal.confirm({
                                title: t('confirmDelete'),
                                icon: <ExclamationCircleOutlined />,
                                content: t('deleteConfirmationMessage'),
                                okText: t('yes'),
                                cancelText: t('no'),
                                onOk: async () => {
                                        message.success(t('deleteSuccess'));
                                        vm.refetch();
                                },
                        });
                }
        }, [vm]);

        // ── Batch delete handler ──────────────────
        const handleBatchDelete = useCallback(async (records: any[]) => {
                if (vm.onBatchDelete) {
                        try {
                                await vm.onBatchDelete(records);
                                message.success(`${records.length} ${t('recordsDeleted')}`);
                                vm.refetch();
                        } catch (error) {
                                message.error(t('deleteError'));
                                console.error('Batch delete error:', error);
                        }
                } else {
                        Modal.confirm({
                                title: t('confirmBatchDelete'),
                                icon: <ExclamationCircleOutlined />,
                                content: t('batchDeleteConfirmationMessage', { count: records.length }),
                                okText: t('yes'),
                                cancelText: t('no'),
                                onOk: async () => {
                                        message.success(`${records.length} ${t('recordsDeleted')}`);
                                        vm.refetch();
                                },
                        });
                }
        }, [vm]);

        // ── export handlers ────────────────────────
        const handleExportCSV = useCallback(() => {
                try {
                        const csv = buildCsv(vm.columns, vm.formatedData);
                        downloadBlob(csv, `report_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
                        message.success(t('csvExportSuccess'));
                } catch {
                        message.error(t('csvExportError'));
                }
        }, [vm.columns, vm.formatedData]);

        const handleExportPDF = useCallback(() => {
                message.info(t('preparingPrintForPrint'));
                setTimeout(() => window.print(), 500);
        }, []);

        const handleBatchExport = useCallback((records: any[]) => {
                try {
                        const csv = buildCsv(vm.columns, records);
                        downloadBlob(csv, `selected_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
                        message.success(`${records.length} ${t('recordsExported')}`);
                } catch {
                        message.error(t('exportError'));
                }
        }, [vm.columns]);

        // ── misc handlers ──────────────────────────
        const handleRowDragEnd = useCallback((activeIndex: number, overIndex: number) => {
                message.success(`${t('rowMoved')}: ${activeIndex + 1} → ${overIndex + 1}`);
        }, []);

        const handleColumnDragEnd = useCallback((newOrder: string[]) => {
                message.success(t('columnOrderChanged'));
                try { localStorage.setItem(`${cfg.settingsKey}_columns_order`, JSON.stringify(newOrder)); } catch { }
        }, [cfg.settingsKey]);

        const handleDensityChange = useCallback((size: string) => {
                try { localStorage.setItem(`${cfg.settingsKey}_density`, size); } catch { }
        }, [cfg.settingsKey]);

        const handleRowClick = useCallback((_record: any) => { }, []);
        const handleRowDoubleClick = useCallback((record: any) => {
                vm.setModalVisibleDetail(record);
        }, [vm.setModalVisibleDetail]);

        const handleSelectionChange = useCallback((_keys: React.Key[], _rows: any[]) => { }, []);

        // ── render ─────────────────────────────────
        return (
                <div className={`report-page report-page--${cfg.settingsKey}`}>
                        {/* ── Filter bar ─────────────────────── */}
                        {cfg.filterShow && (
                                <CollapsComponent
                                        initialValues={vm.initialValues}
                                        validationSchema={schema}
                                        onSubmit={vm.handleOnSubmit}
                                        onReset={vm.handleReset}
                                        header={t(cfg.filterHeader)}
                                        handleDownload={vm.downloadExcel}
                                        handleDownloadshow={
                                                vm.isSearchEnabled !== undefined
                                                        ? vm.isSearchEnabled && cfg.showDownload
                                                        : cfg.showDownload
                                        }
                                        loading={vm.excelLoading}
                                >
                                        {filterFields}
                                </CollapsComponent>
                        )}

                        {/* ── Table area ─────────────────────── */}
                        <div className="pt-4 px-2">
                                {vm.isLoading ? (
                                        <div className="report-surface flex flex-col justify-center items-center h-64">
                                                <div className="flex gap-2">
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                                                        <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-300"></div>
                                                </div>
                                                <div className="report-muted mt-4 text-sm font-medium">{t('loading')}</div>
                                                <div className="report-muted mt-1 text-xs">{t('pleaseWait')}</div>
                                        </div>
                                ) : vm.isError ? (
                                        <div className="report-surface flex justify-center items-center h-64">
                                                <Empty
                                                        description={vm.errorMessage || vm.emptyErrorMessage || t('errorLoadingData')}
                                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                />
                                        </div>
                                ) : vm.formatedData.length > 0 ? (
                                        <div className="report-surface overflow-hidden">
                                                <CustomTableWrapper
                                                        table={
                                                                <CustomTable
                                                                        // Basic
                                                                        columns={vm.columns}
                                                                        dataSource={vm.formatedData}
                                                                        rowKey={vm.rowKey ?? cfg.rowKey}
                                                                        loading={vm.isLoading || vm.excelLoading}
                                                                        title={cfg.title || t(cfg.settingsKey)}
                                                                        subtitle={cfg.subtitle}
                                                                        scroll={{ x: cfg.scrollX }}
                                                                        size="middle"
                                                                        bordered={false}
                                                                        // Pagination
                                                                        pagination={vm.pagination}
                                                                        onPageChange={vm.onPageChange}
                                                                        showSizeChanger
                                                                        pageSizeOptions={cfg.pageSizeOptions}
                                                                        showQuickJumper
                                                                        showTotal
                                                                        hasMore={vm.hasMore}
                                                                        onNextPage={vm.nextPage}
                                                                        onPrevPage={vm.prevPage}
                                                                        showNextPrevButtons={cfg.showNextPrevButtons}
                                                                        // Sort & filter
                                                                        sortField={vm.sortField}
                                                                        sortOrder={vm.sortOrder}
                                                                        onSortChange={vm.handleSortChange}
                                                                        filters={vm.filters}
                                                                        onFilterChange={vm.handleFilterChange}
                                                                        // Drag
                                                                        enableRowDrag={cfg.enableRowDrag}
                                                                        onRowDragEnd={handleRowDragEnd}
                                                                        enableColumnDrag={cfg.enableColumnDrag}
                                                                        onColumnDragEnd={handleColumnDragEnd}
                                                                        // Responsive
                                                                        responsive
                                                                        mobileBreakpoint={768}
                                                                        tabletBreakpoint={1024}
                                                                        // Export
                                                                        onExport={vm.downloadExcel}
                                                                        onExportPDF={handleExportPDF}
                                                                        onExportCSV={handleExportCSV}
                                                                        // Actions
                                                                        setModalVisibleDetail={vm.setModalVisibleDetail}
                                                                        onEdit={!!cfg.features?.onEdit}
                                                                        setModalVisibleEdit={vm.setModalVisibleEdit}
                                                                        onDelete={!!cfg.features?.onDelete}
                                                                        setModalVisibleDelete={vm.setModalVisibleDelete}
                                                                        customActions={cfg.rowActions}
                                                                        // Batch
                                                                        onBatchDelete={handleBatchDelete}
                                                                        onBatchExport={handleBatchExport}
                                                                        // Toolbar
                                                                        onRefresh={vm.refetch}
                                                                        onDensityChange={handleDensityChange}
                                                                        settingsKey={cfg.settingsKey}
                                                                        // Error
                                                                        isError={vm.isError}
                                                                        onRetry={vm.refetch}
                                                                        emptyText={vm.emptyErrorMessage || vm.errorMessage || t('noData')}
                                                                        errorText={vm.errorMessage || vm.emptyErrorMessage || t('errorLoadingData')}
                                                                        // Callbacks
                                                                        onRowClick={handleRowClick}
                                                                        onRowDoubleClick={handleRowDoubleClick}
                                                                        onSelectionChange={handleSelectionChange}
                                                                        // Spread all feature flags
                                                                        {...cfg.features}
                                                                        maxSelection={100}
                                                                />
                                                        }
                                                        modalActive={
                                                                (vm.modalVisibleDetail && renderDetailModal
                                                                        ? renderDetailModal(vm.modalVisibleDetail, handleCloseDetailModal)
                                                                        : null) ||
                                                                (vm.modalVisibleEdit && renderEditModal
                                                                        ? renderEditModal(vm.modalVisibleEdit, handleCloseEditModal)
                                                                        : null) ||
                                                                (vm.modalVisibleDelete && renderDeleteModal
                                                                        ? renderDeleteModal(vm.modalVisibleDelete, handleCloseDeleteModal)
                                                                        : null)
                                                        }
                                                />

                                                {cfg.showNextPrevButtons && (
                                                        <div className="flex justify-between items-center p-4 border-t border-[var(--table-border-color)] bg-[var(--app-surface-alt)]">
                                                                <div className="report-muted text-sm">
                                                                        {t('page')} {vm.pagination.current} - {vm.formatedData.length} {t('records')}
                                                                </div>
                                                                <Space>

                                                                       
                                                                        <Button
                                                                                icon={<RightOutlined />}

                                                                                onClick={vm.prevPage}
                                                                                disabled={vm.pagination.current === 1}
                                                                                size="middle"
                                                                        >
                                                                                {t('previousPage')}
                                                                        </Button>
                                                                                        <span className="px-3 py-1 bg-blue-500 text-white rounded-md font-medium">
                                                                                                {vm.pagination.current}
                                                                                        </span>
                                                                        <Button
                                                                                                icon={<LeftOutlined />}                                                         onClick={vm.nextPage}
                                                                                disabled={!vm.hasMore || vm.formatedData.length < vm.pagination.pageSize}
                                                                                size="middle"
                                                                        >
                                                                                {t('nextPage')}
                                                                        </Button>
                                                                </Space>
                                                        </div>
                                                )}
                                        </div>
                                ) : !vm.isLoading ? (
                                        <div className="report-surface flex flex-col justify-center items-center h-64">
                                                <Empty
                                                        description={vm.emptyErrorMessage || vm.errorMessage || t('noData')}
                                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                />
                                        </div>
                                ) : null}
                        </div>
                </div>
        );
}

export default ReportPage;
