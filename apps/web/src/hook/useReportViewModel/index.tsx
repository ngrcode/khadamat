// hook/useReportViewModel.ts
'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useAxiosQuery } from '@/hook/useAxsios/useAxiosQuery';
import * as Yup from 'yup';
import useDownloadExcelGetValues from '../useDownloadExcel';
import {
        getApiErrorMessageFromUnknown,
        getEmptyDataMessageFromResponse,
} from '@/utils/apiError';
import { useLanguage } from '@/configs/language/languageProvider';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface PaginationState {
        current: number;
        pageSize: number;
        total: number;
        hasMore: boolean; // ✅ اضافه شده برای تشخیص وجود داده‌های بیشتر
}

export interface ReportViewModelOptions<TSearch extends Record<string, any>> {
        url: string;
        getInitialValues: () => TSearch;
        getValidationSchema: (userType?: string) => Yup.AnyObjectSchema;
        buildQueryParams: (
                search: TSearch,
                pagination: { pageIndex: number; pageSize: number },
                extra?: { sortField?: any; sortOrder?: 'asc' | 'desc'; filters?: Record<string, any> },
                method?: 'get' | 'post'
        ) => Record<string, any>;
        buildQueryKey: (
                search: TSearch,
                pagination: { pageIndex: number; pageSize: number },
                extra?: any[]
        ) => any[];
        formatDateFields?: (search: TSearch) => TSearch;
        excelExport?: {
                url: string;
                buildParams: (search: TSearch) => Record<string, any>;
        };
        getColumns: (pagination: { current: number; size: number }) => any[];
        selectData?: (response: any, pageSize?: number) => { items: any[]; totalCount: number; hasMore?: boolean };
        requestFn?: (queryParams: Record<string, any>) => Promise<any>;
        rowKey?: string;
        fetchOnMount?: boolean;
        method?: 'get' | 'post';
        headers?: Record<string, string>;
        onDelete?: (record: any) => Promise<void> | void;
        onBatchDelete?: (records: any[]) => Promise<void> | void;
}

const normalizeItems = (value: any): any[] => {
        if (Array.isArray(value)) return value;
        if (value === undefined || value === null) return [];
        return [value];
};

const defaultSelectData = (response: any, pageSize: number = 10): { items: any[]; totalCount: number; hasMore: boolean } => {
        if (!response) return { items: [], totalCount: 0, hasMore: false };

        if (Array.isArray(response)) {
                return {
                        items: response,
                        totalCount: response.length > 0 ? Number(response[0]?.rowCount ?? 0) : response.length,
                        hasMore: response.length >= pageSize // ✅ اگر تعداد آیتم‌ها برابر با سایز صفحه باشد، احتمالاً داده‌های بیشتری وجود دارد
                };
        }

        if (response.info !== undefined) {
                const items = normalizeItems(response.info);
                return {
                        items,
                        totalCount: Number(response.totalCount ?? response.total ?? response.recordsTotal ?? response.recordsFiltered ?? items.length),
                        hasMore: items.length >= pageSize
                };
        }

        if (response.Items && Array.isArray(response.Items)) {
                return {
                        items: response.Items,
                        totalCount: Number(response.TotalCount ?? response.totalCount ?? response.total ?? 0),
                        hasMore: response.Items.length >= pageSize
                };
        }

        if (response.result) {
                const items = response.result.info || response.result.data || [];
                return {
                        items: items,
                        totalCount: response.TotalCount || response.result.totalCount || response.result.total || 0,
                        hasMore: items.length >= pageSize
                };
        }

        return { items: [], totalCount: 0, hasMore: false };
};

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useReportViewModel<TSearch extends Record<string, any>>(
        options: ReportViewModelOptions<TSearch>
) {
        const {
                url,
                getInitialValues,
                getValidationSchema,
                buildQueryParams,
                buildQueryKey,
                formatDateFields = (s) => s,
                excelExport,
                getColumns,
                selectData = defaultSelectData,
                requestFn,
                rowKey = 'id',
                fetchOnMount = false,
                method = 'post',
                headers = {},
                onDelete,
                onBatchDelete,
        } = options;

        const { language } = useLanguage();

        // ── state ──────────────────────────────────
        const [pagination, setPagination] = useState<PaginationState>({
                current: 1,
                pageSize: 10,
                total: 0,
                hasMore: false
        });
        const [sortField, setSortField] = useState<string | undefined>(undefined);
        const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
        const [filters, setFilters] = useState<Record<string, any>>({});
        const [modalVisibleDetail, setModalVisibleDetailRaw] = useState<any>(false);
        const [modalVisibleEdit, setModalVisibleEditRaw] = useState<any>(false);
        const [modalVisibleDelete, setModalVisibleDeleteRaw] = useState<any>(false);
        const [search, setSearch] = useState<TSearch>(getInitialValues);
        const [resetTrigger, setResetTrigger] = useState(0);
        const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(fetchOnMount);

        const prevSortField = useRef(sortField);
        const prevSortOrder = useRef(sortOrder);
        const prevFilters = useRef(filters);

        const formattedSearch = useMemo(() => formatDateFields(search), [search, formatDateFields]);

        const sortOrderApi = sortOrder === 'ascend' ? 'asc' : sortOrder === 'descend' ? 'desc' : undefined;

        // ✅ ساخت queryParams با توجه به متد
        const queryParams = useMemo(
                () =>
                        buildQueryParams(
                                formattedSearch,
                                {
                                        pageIndex: pagination.current,
                                        pageSize: pagination.pageSize
                                },
                                { sortField, sortOrder: sortOrderApi, filters },
                                method
                        ),
                [formattedSearch, pagination.current, pagination.pageSize, sortField, sortOrderApi, filters, method, buildQueryParams]
        );

        const queryKey = useMemo(
                () => [
                        ...buildQueryKey(formattedSearch, {
                                pageIndex: pagination.current,
                                pageSize: pagination.pageSize
                        }),
                        sortField,
                        sortOrder,
                        filters,
                        resetTrigger,
                        method,
                ],
                [formattedSearch, pagination.current, pagination.pageSize, sortField, sortOrder, filters, resetTrigger, method, buildQueryKey]
        );

        // ── query ──────────────────────────────────
        const requestParams = useMemo(() => {
                if (method === 'get') {
                        return queryParams;
                }
                return {};
        }, [method, queryParams]);

        const requestBody = useMemo(() => {
                if (method === 'post') {
                        return queryParams;
                }
                return undefined;
        }, [method, queryParams]);

        const query = useAxiosQuery({
                url,
                queryKey,
                params: requestParams,
                body: requestBody,
                queryFn: requestFn ? () => requestFn(queryParams) : undefined,
                enabled: isSearchEnabled,
                method,
                headers,
        });

        // ✅ استفاده از selectData با pageSize
        const emptyErrorMessage = useMemo(() => {
                const fromData = getEmptyDataMessageFromResponse(query.data);
                if (fromData) {
                        return fromData;
                }

                if (query.isError) {
                        return getApiErrorMessageFromUnknown(query.error);
                }

                return undefined;
        }, [query.data, query.isError, query.error]);

        const { items: formatedData, totalCount, hasMore } = useMemo(() => {
                let result = selectData(query.data, pagination.pageSize);
                if ((!result.items || result.items.length === 0) && query.data?.info !== undefined) {
                        result = defaultSelectData(query.data, pagination.pageSize);
                }
                return {
                        items: result.items || [],
                        totalCount: result.totalCount || 0,
                        hasMore: result.hasMore || false
                };
        }, [query.data, selectData, pagination.pageSize]);

        // ✅ بروزرسانی pagination با مقادیر جدید
        useEffect(() => {
                if (totalCount > 0 && totalCount !== pagination.total) {
                        setPagination((prev) => ({
                                ...prev,
                                total: totalCount,
                                hasMore: hasMore
                        }));
                } else if (hasMore !== pagination.hasMore) {
                        setPagination((prev) => ({
                                ...prev,
                                hasMore: hasMore
                        }));
                }
        }, [totalCount, hasMore, pagination.total, pagination.hasMore]);

        const columns = useMemo(
                () => getColumns({ current: pagination.current, size: pagination.pageSize }),
                [pagination.current, pagination.pageSize, getColumns, language]
        );

        const { handleDownloadExcelGetValues: downloadExcelRaw, isLoadingExcelGetValues: excelLoading } =
                useDownloadExcelGetValues();

        const downloadExcel = useCallback(() => {
                if (!excelExport) return;
                downloadExcelRaw(excelExport.url, excelExport.buildParams(formattedSearch));
        }, [downloadExcelRaw, formattedSearch, excelExport]);

        // ✅ توابع صفحه‌بندی
        const nextPage = useCallback(() => {
                if (formatedData.length > 0 && hasMore) {
                        setPagination(prev => ({
                                ...prev,
                                current: prev.current + 1,
                                hasMore: true
                        }));
                        // فعال کردن دوباره کوئری برای صفحه بعد
                        setIsSearchEnabled(true);
                }
        }, [formatedData.length, hasMore]);

        const prevPage = useCallback(() => {
                if (pagination.current > 1) {
                        setPagination(prev => ({
                                ...prev,
                                current: Math.max(1, prev.current - 1)
                        }));
                        setIsSearchEnabled(true);
                }
        }, [pagination.current]);

        const handleOnSubmit = useCallback(
                (values: TSearch) => {
                        setSearch(formatDateFields(values));
                        setIsSearchEnabled(true);
                        setPagination((prev) => ({
                                ...prev,
                                current: 1,
                                hasMore: false
                        }));
                        setSortField(undefined);
                        setSortOrder(null);
                        setFilters({});
                        setResetTrigger((n) => n + 1);
                },
                [formatDateFields]
        );

        const handleReset = useCallback(() => {
                setSearch(getInitialValues());
                setIsSearchEnabled(fetchOnMount);
                setPagination({
                        current: 1,
                        pageSize: 10,
                        total: 0,
                        hasMore: false
                });
                setSortField(undefined);
                setSortOrder(null);
                setFilters({});
                setResetTrigger((n) => n + 1);
        }, [getInitialValues, fetchOnMount]);

        const onPageChange = useCallback((page: number, pageSize: number) => {
                setPagination((prev) => ({
                        ...prev,
                        current: page,
                        pageSize,
                        hasMore: page > prev.current ? true : prev.hasMore // اگر به صفحه بعد رفتیم، hasMore رو true بذار
                }));
                setIsSearchEnabled(true);
        }, []);

        const handleSortChange = useCallback(
                (field: any, order: any) => {
                        if (field === undefined && order === undefined) return;
                        if (field === prevSortField.current && order === prevSortOrder.current) return;
                        prevSortField.current = field;
                        prevSortOrder.current = order;
                        setSortField(field);
                        setSortOrder(order);
                        if (field !== undefined || order !== undefined) {
                                setPagination((prev) => ({
                                        ...prev,
                                        current: 1,
                                        hasMore: false
                                }));
                                setIsSearchEnabled(true);
                        }
                },
                []
        );

        const handleFilterChange = useCallback((newFilters: any) => {
                const newStr = JSON.stringify(newFilters ?? {});
                if (newStr === JSON.stringify(prevFilters.current ?? {})) return;
                prevFilters.current = newFilters;
                const hasActive = newFilters && Object.values(newFilters).some(
                        (v: any) => v !== null && v !== undefined && v !== '' && (!Array.isArray(v) || v.length > 0)
                );
                setFilters(newFilters ?? {});
                if (hasActive) {
                        setPagination((prev) => ({
                                ...prev,
                                current: 1,
                                hasMore: false
                        }));
                        setIsSearchEnabled(true);
                }
        }, []);

        const setModalVisibleDetail = useCallback((value: any) => {
                setModalVisibleDetailRaw(value);
        }, []);

        const setModalVisibleEdit = useCallback((value: any) => {
                setModalVisibleEditRaw(value);
        }, []);

        const setModalVisibleDelete = useCallback((value: any) => {
                setModalVisibleDeleteRaw(value);
        }, []);

        const refetch = useCallback(() => query.refetch(), [query.refetch]);

        return {
                // داده‌ها
                formatedData,
                columns,
                totalCount,
                rowKey,

                // وضعیت‌ها — فقط وقتی هنوز دیتای کش‌شده نداریم لودینگ بلوک‌کننده نشان بده
                isLoading: query.isLoading && query.data === undefined,
                isFetching: query.isFetching,
                isError: query.isError,
                error: query.error,
                errorMessage: emptyErrorMessage,
                emptyErrorMessage,
                isSearchEnabled,

                // صفحه‌بندی
                pagination,
                onPageChange,
                hasMore,
                nextPage,
                prevPage,

                // مرتب‌سازی
                sortField,
                sortOrder,
                handleSortChange,

                // فیلترها
                filters,
                handleFilterChange,

                // جستجو
                handleOnSubmit,
                handleReset,
                initialValues: getInitialValues(),
                validationSchema: getValidationSchema,

                // اکسل
                downloadExcel,
                excelLoading,

                // مودال‌ها
                modalVisibleDetail,
                setModalVisibleDetail,
                modalVisibleEdit,
                setModalVisibleEdit,
                modalVisibleDelete,
                setModalVisibleDelete,

                // عملیات‌ها
                onDelete,
                onBatchDelete,
                refetch,
        };
}
