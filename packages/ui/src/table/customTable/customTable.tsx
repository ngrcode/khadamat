// components/Table/customTable/CustomTable.tsx

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Table, Modal, Space, Button, Tooltip, Input,
  Dropdown, Badge, Tag, Divider, Drawer, Menu,
  Row, Col, Card, Typography, Skeleton, Progress
} from 'antd';
import type { TableProps } from 'antd';
import type { MenuProps } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { t } from '@repo/i18n';
import { useLanguage } from '@repo/i18n/react';
import { useTableMutation, useToast } from '../../providers/UiConfigProvider';
import { ActionColumn } from '../action/actionColumn';
import type { ActionColumnAction } from '../action/actionColumn';
import {
  ReloadOutlined, FileExcelOutlined, PrinterOutlined,
  FullscreenOutlined, FullscreenExitOutlined, SearchOutlined,
  SettingOutlined, CopyOutlined, EyeOutlined, EyeInvisibleOutlined,
  DeleteOutlined, EditOutlined, ExportOutlined, SaveOutlined,
  UndoOutlined, RedoOutlined, ClearOutlined,
  FilePdfOutlined, FileTextOutlined,
  FilterOutlined,
  BarChartOutlined, ExpandOutlined, CompressOutlined,
  ExclamationCircleOutlined, LoadingOutlined,
  MinusSquareOutlined, PlusSquareOutlined,
  HolderOutlined, DragOutlined,
} from '@ant-design/icons';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

// ==================== Types ====================
interface CustomTableProps<T> {
  [key: string]: any;
  columns: any[];
  dataSource: T[];
  rowKey: string | ((record: T) => string);
  loading?: boolean;
  scroll?: { x?: string | number; y?: string | number };
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  title?: string;
  subtitle?: string;
  sortField?: string | number;
  sortOrder?: 'ascend' | 'descend' | null;
  onSortChange?: (field: any, order: any) => void;
  filters?: any;
  onFilterChange?: (filters: any) => void;
  enableRowDrag?: boolean;
  onRowDragEnd?: (activeIndex: number, overIndex: number, data: any[]) => void;
  enableColumnDrag?: boolean;
  onColumnDragEnd?: (columns: string[]) => void;
  responsive?: boolean;
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
  showMaximize?: boolean;
  showExportPDF?: boolean;
  onExportPDF?: () => void;
  showExportCSV?: boolean;
  onExportCSV?: () => void;
  onEdit?: boolean;
  onDelete?: boolean;
  onDetail?: boolean;
  onDetailData?: boolean;
  onCopy?: boolean;
  setModalVisibleEdit?: (record: T) => void;
  setModalVisibleDetail?: (record: T) => void;
  setModalVisibleDetailData?: (record: T) => void;
  setModalVisibleDelete?: (record: T) => void;
  onBatchDelete?: (records: T[]) => void;
  onBatchExport?: (records: T[]) => void;
  deleteProps?: any;
  activeProps?: any;
  showRefresh?: boolean;
  onRefresh?: () => void;
  showExport?: boolean;
  onExport?: () => void;
  showPrint?: boolean;
  onPrint?: () => void;
  showFullscreen?: boolean;
  showDensity?: boolean;
  onDensityChange?: (size: string) => void;
  showSearch?: boolean;
  showColumnSettings?: boolean;
  showFilterPanel?: boolean;
  showSaveSettings?: boolean;
  showResetSettings?: boolean;
  showRowSize?: boolean;
  showStatistics?: boolean;
  showExpandAll?: boolean;
  showRowSelection?: boolean;
  onSelectionChange?: (selectedKeys: React.Key[], selectedRows: T[]) => void;
  maxSelection?: number;
  expandable?: any;
  showSummary?: boolean;
  summaryData?: Record<string, any>;
  showContextMenu?: boolean;
  enableKeyboardNavigation?: boolean;
  settingsKey?: string;
  className?: string;
  style?: React.CSSProperties;
  isError?: boolean;
  onRetry?: () => void;
  emptyText?: string;
  errorText?: string;
  onRowClick?: (record: T) => void;
  onRowDoubleClick?: (record: T) => void;
  customActions?: ActionColumnAction<T>[];
}

// ==================== Sortable Row Component ====================
const SortableRow: React.FC<any> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999, background: '#e6f7ff', opacity: 0.8 } : {}),
  };

  return React.createElement(
    'tr',
    { ...props, ref: setNodeRef, style, ...attributes },
    React.Children.map(props.children, (child) => {
      if ((child as React.ReactElement)?.key === 'drag-handle') {
        return React.cloneElement(child as React.ReactElement, {
          children: React.createElement(HolderOutlined, { ...listeners, style: { cursor: 'grab', color: '#999' } }),
        });
      }
      return child;
    })
  );
};

// ==================== Progress Cell ====================
const ProgressCell: React.FC<{ value: number; max?: number }> = ({ value, max = 100 }) => {
  const percent = Math.min((value / max) * 100, 100);
  return React.createElement(
    'div',
    { style: { width: '100%' } },
    React.createElement(Progress, {
      percent: Math.round(percent),
      size: 'small',
      strokeColor: percent > 80 ? '#52c41a' : percent > 50 ? '#1890ff' : '#faad14',
      format: () => `${value.toLocaleString('fa-IR')}`
    })
  );
};

// ==================== Mini Chart ====================
const MiniChart: React.FC<{ data: number[]; type: 'line' | 'bar'; color?: string; width?: number; height?: number }> =
  ({ data, type, color = '#6366f1', width = 80, height = 30 }) => {
    if (!data || data.length === 0) return React.createElement('span', null, '---');
    const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
    if (type === 'bar') {
      return React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'flex-end', gap: 1, height, width } },
        data.slice(0, 6).map((val, i) =>
          React.createElement('div', {
            key: i,
            style: {
              width: `${100 / data.length}%`,
              height: `${((val - min) / range) * 100}%`,
              backgroundColor: color,
              borderRadius: '2px 2px 0 0',
              minHeight: 2
            }
          })
        )
      );
    }
    if (type === 'line') {
      const points = data.slice(0, 8).map((val, i) => `${(i / (data.length - 1)) * width},${height - ((val - min) / range) * height}`).join(' ');
      return React.createElement(
        'svg',
        { width, height },
        React.createElement('polyline', { points, fill: 'none', stroke: color, strokeWidth: 2 }),
        data.slice(0, 8).map((val, i) =>
          React.createElement('circle', {
            key: i,
            cx: (i / (data.length - 1)) * width,
            cy: height - ((val - min) / range) * height,
            r: 2,
            fill: color
          })
        )
      );
    }
    return null;
  };

// ==================== Main Component ====================
function CustomTable<T extends object>(props: CustomTableProps<T>) {
  const { direction } = useLanguage();
  const dropdownPlacement = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  const {
    columns = [], dataSource = [], rowKey = 'id', loading = false, scroll, size = 'middle', bordered = false, title, subtitle,
    sortField, sortOrder, onSortChange, filters, onFilterChange,
    enableRowDrag = false, onRowDragEnd,
    enableColumnDrag = false, onColumnDragEnd,
    responsive = true, mobileBreakpoint = 768, tabletBreakpoint = 1024,
    showMaximize = false,
    showExportPDF = false, onExportPDF, showExportCSV = false, onExportCSV,
    onEdit = false, onDelete = false, onDetail = false, onDetailData = false, onCopy = false,
    setModalVisibleEdit, setModalVisibleDetail, setModalVisibleDetailData,
    setModalVisibleDelete,
    onBatchDelete, onBatchExport,
    deleteProps, activeProps,
    showRefresh = false, onRefresh, showExport = false, onExport, showPrint = false, onPrint,
    showFullscreen = false, showDensity = false, onDensityChange, showSearch = false,
    showColumnSettings = false, showFilterPanel = false, showSaveSettings = false, showResetSettings = false,
    showRowSize = false, showStatistics = false, showExpandAll = false,
    showRowSelection = false, onSelectionChange, maxSelection,
    expandable,
    showSummary = false, summaryData,
    showContextMenu = false,
    enableKeyboardNavigation = false,
    settingsKey,
    className = '', style,
    isError = false, onRetry, emptyText, errorText,
    onRowClick, onRowDoubleClick,
    customActions = [],
    ...restProps
  } = props;

  // ==================== STATE ====================
  const [recordToDelete, setRecordToDelete] = useState<T | null>(null);
  const [recordToActivate, setRecordToActivate] = useState<T | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentSize, setCurrentSize] = useState<'small' | 'middle' | 'large'>(() => {
    if (!settingsKey || typeof window === 'undefined') return size;

    const savedDensity = localStorage.getItem(`${settingsKey}_density`);
    return savedDensity === 'small' || savedDensity === 'middle' || savedDensity === 'large'
      ? savedDensity
      : size;
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuRecord, setContextMenuRecord] = useState<T | null>(null);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [hoveredRow, setHoveredRow] = useState<React.Key | null>(null);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(-1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [orderedData, setOrderedData] = useState<T[]>([]);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [dragColumnKey, setDragColumnKey] = useState<string | null>(null);
  const [dropTargetKey, setDropTargetKey] = useState<string | null>(null);
  const [localSortField, setLocalSortField] = useState<string>();
  const [localSortOrder, setLocalSortOrder] = useState<'ascend' | 'descend' | null>(null);
  const isMobile = windowWidth < mobileBreakpoint;
  const isTablet = windowWidth >= mobileBreakpoint && windowWidth < tabletBreakpoint;

  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    if (settingsKey) {
      try {
        const saved = localStorage.getItem(`table_settings_${settingsKey}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed.visibleColumns || columns.map(col => col.key || col.dataIndex).filter(Boolean);
        }
      } catch (e) { }
    }
    return columns.map(col => col.key || col.dataIndex).filter(Boolean);
  });

  // ==================== HOOKS ====================
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useToast();
  const deleteMutation = useTableMutation(deleteProps?.urlDelete);
  const activateMutation = useTableMutation(activeProps?.urlActive);

  const rowSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { setOrderedData(dataSource); }, [dataSource]);

  useEffect(() => {
    if (loading) { setSkeletonLoading(true); }
    else { const timer = setTimeout(() => setSkeletonLoading(false), 300); return () => clearTimeout(timer); }
  }, [loading]);

  useEffect(() => {
    if (columnOrder.length === 0 && columns.length > 0) {
      const initialOrder = columns
        .filter(col => { const key = col.key || col.dataIndex; return key !== 'action' && key !== 'row' && key !== 'drag-handle'; })
        .map(col => col.key || col.dataIndex).filter(Boolean);
      setColumnOrder(initialOrder);
    }
  }, [columns]);

  // ==================== COMPUTED VALUES ====================
  const hasActions =
    onEdit ||
    onDelete ||
    onDetail ||
    onDetailData ||
    onCopy ||
    customActions.length > 0;
  const hasBatchOperations = onBatchDelete || onBatchExport;

  const orderedColumns = useMemo(() => {
    if (columnOrder.length === 0) return columns;
    const columnMap = new Map(columns.map(col => [(col.key || col.dataIndex), col]));
    const ordered = columnOrder.map(key => columnMap.get(key)).filter(Boolean);
    const remaining = columns.filter(col => !columnOrder.includes(col.key || col.dataIndex));
    return [...ordered, ...remaining];
  }, [columns, columnOrder]);

  const responsiveColumns = useMemo(() => {
    if (!responsive) return orderedColumns;
    if (isMobile) return orderedColumns.slice(0, 3);
    if (isTablet) return orderedColumns.slice(0, 5);
    return orderedColumns;
  }, [responsive, isMobile, isTablet, orderedColumns]);

  const filteredColumns = useMemo(() => {
    return responsiveColumns.filter(col => {
      const key = col.key || col.dataIndex;
      if (key === 'action' || key === 'row' || key === 'rowNumber' || key === 'drag-handle') return true;
      return visibleColumns.includes(key);
    });
  }, [responsiveColumns, visibleColumns]);

  const columnDragIds = useMemo(() => {
    return filteredColumns
      .filter(col => { const key = col.key || col.dataIndex; return key !== 'action' && key !== 'row' && key !== 'rowNumber' && key !== 'drag-handle'; })
      .map(col => col.key || col.dataIndex).filter(Boolean);
  }, [filteredColumns]);

  // ==================== COLUMN DRAG HANDLERS (Native HTML5) ====================
  const handleColumnDragStart = useCallback((e: React.DragEvent, columnKey: string) => {
    e.dataTransfer.setData('text/plain', columnKey);
    e.dataTransfer.effectAllowed = 'move';
    setDragColumnKey(columnKey);
  }, []);

  const handleColumnDragOver = useCallback((e: React.DragEvent, columnKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetKey(columnKey);
  }, []);

  const handleColumnDragLeave = useCallback(() => {
    setDropTargetKey(null);
  }, []);

  const handleColumnDrop = useCallback((e: React.DragEvent, targetColumnKey: string) => {
    e.preventDefault();
    const sourceColumnKey = e.dataTransfer.getData('text/plain');

    if (sourceColumnKey && sourceColumnKey !== targetColumnKey) {
      setColumnOrder(prev => {
        const oldIndex = prev.indexOf(sourceColumnKey);
        const newIndex = prev.indexOf(targetColumnKey);
        if (oldIndex !== -1 && newIndex !== -1) {
          const newOrder = arrayMove(prev, oldIndex, newIndex);
          onColumnDragEnd?.(newOrder);
          return newOrder;
        }
        return prev;
      });
    }

    setDragColumnKey(null);
    setDropTargetKey(null);
  }, [onColumnDragEnd]);

  const handleColumnDragEndNative = useCallback(() => {
    setDragColumnKey(null);
    setDropTargetKey(null);
  }, []);

  // ==================== ENHANCED COLUMNS ====================
  const enhancedColumns = useMemo(() => {
    let mainColumns = [...filteredColumns];
    let rowColumn: any = null;
    let actionColumn: any = null;

    const rowIndex = mainColumns.findIndex(col => col.key === 'row');
    if (rowIndex !== -1) {
      rowColumn = mainColumns[rowIndex];
      mainColumns = mainColumns.filter(col => col.key !== 'row');
    }

    const actionIndex = mainColumns.findIndex(col => col.key === 'action');
    if (actionIndex !== -1) {
      actionColumn = mainColumns[actionIndex];
      mainColumns = mainColumns.filter(col => col.key !== 'action');
    }

    let cols = [...mainColumns];

    if (enableRowDrag) {
      cols.unshift({
        title: '', key: 'drag-handle', width: 40, align: 'center' as const,
        render: () => React.createElement(HolderOutlined, { style: { cursor: 'grab', color: '#999' } }),
      });
    }

    if (rowColumn) {
      cols.unshift({
        ...rowColumn,
        fixed: undefined,
      });
    }

    cols = cols.map(col => {
      if (col.key === 'drag-handle' || col.key === 'action' || col.key === 'row') return col;

      const columnKey = col.key || col.dataIndex;
      let enhancedCol = { ...col };

      if (enhancedCol.fixed) {
        enhancedCol.fixed = undefined;
      }

      if (enableColumnDrag && columnDragIds.includes(columnKey)) {
        enhancedCol.title = React.createElement(
          'div',
          {
            draggable: true,
            onDragStart: (e: React.DragEvent) => handleColumnDragStart(e, columnKey),
            onDragOver: (e: React.DragEvent) => handleColumnDragOver(e, columnKey),
            onDragLeave: handleColumnDragLeave,
            onDrop: (e: React.DragEvent) => handleColumnDrop(e, columnKey),
            onDragEnd: handleColumnDragEndNative,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'grab',
              opacity: dragColumnKey === columnKey ? 0.4 : 1,
              borderLeft: dropTargetKey === columnKey && dragColumnKey !== columnKey ? '3px solid #6366f1' : '3px solid transparent',
              borderRight: dropTargetKey === columnKey && dragColumnKey !== columnKey ? '3px solid #6366f1' : '3px solid transparent',
              padding: '4px 8px',
              borderRadius: 4,
              transition: 'all 0.2s ease',
              backgroundColor: dropTargetKey === columnKey ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              userSelect: 'none',
            }
          },
          React.createElement(HolderOutlined, { style: { fontSize: 12, color: dragColumnKey === columnKey ? '#6366f1' : '#999' } }),
          React.createElement('span', null, col.title)
        );
      }

      if (col.showTooltip !== false && col.key !== 'row') {
        const originalRender = col.render;
        enhancedCol.render = (value: any, record: any, index: number) => {
          const displayValue = originalRender ? originalRender(value, record, index) : value;
          return React.createElement(
            Tooltip,
            { title: value, placement: 'topLeft', mouseEnterDelay: 0.5 },
            React.createElement('span', { style: { display: 'block' } }, displayValue)
          );
        };
      }

      if (col.format === 'chart' && col.chartType) {
        enhancedCol.render = (value: any) => {
          if (Array.isArray(value)) return React.createElement(MiniChart, { data: value, type: col.chartType, color: col.chartColor });
          return React.createElement('span', null, value);
        };
      }

      if (col.format === 'progress') {
        enhancedCol.render = (value: any) => React.createElement(ProgressCell, { value: Number(value) || 0 });
      }

      return enhancedCol;
    });

    // ==================== ACTION COLUMN ====================
    if (hasActions) {
      const actionCount =
        [onEdit, onDelete, onDetail, onDetailData, onCopy].filter(Boolean).length +
        customActions.length;

      cols.push({
        title: t('action'), key: 'action', align: 'center' as const, width: Math.max(100, actionCount * 44),
        fixed: undefined,
        render: (_: any, record: T) => React.createElement(ActionColumn as React.ComponentType<any>, {
          record,
          onEdit: onEdit ? () => setModalVisibleEdit?.(record) : undefined,
          onDelete: onDelete ? () => {
            if (setModalVisibleDelete) {
              setModalVisibleDelete(record);
            } else {
              setRecordToDelete(record);
            }
          } : undefined,
          onDetail: onDetail ? () => setModalVisibleDetail?.(record) : undefined,
          onDetailData: onDetailData ? () => setModalVisibleDetailData?.(record) : undefined,
          onCopy: onCopy ? () => {
            navigator.clipboard.writeText(JSON.stringify(record, null, 2));
            showSuccess(t('copiedToClipboard'));
          } : undefined,
          onActive: activeProps?.onActive ? () => setRecordToActivate(record) : undefined,
          activeProps,
          customActions,
        }),
      });
    } else if (actionColumn) {
      cols.push({ ...actionColumn, fixed: undefined });
    }

    return cols;
  }, [filteredColumns, hasActions, enableRowDrag, enableColumnDrag, columnDragIds, dragColumnKey, dropTargetKey,
    handleColumnDragStart, handleColumnDragOver, handleColumnDragLeave, handleColumnDrop, handleColumnDragEndNative,
    onEdit, onDelete, onDetail, onDetailData, onCopy, setModalVisibleEdit, setModalVisibleDetail,
    setModalVisibleDetailData, setModalVisibleDelete, activeProps, customActions]);

  const filteredDataSource = useMemo(() => {
    if (!searchText || !showSearch) return orderedData;
    return orderedData.filter(item => Object.values(item as any).some(value => value !== null && value !== undefined && value.toString().toLowerCase().includes(searchText.toLowerCase())));
  }, [orderedData, searchText, showSearch]);

  const sortedDataSource = useMemo(() => {
    if (!sortField || !sortOrder) {
      return filteredDataSource;
    }

    return [...filteredDataSource].sort((a: any, b: any) => {
      const sortKey = String(sortField);
      const aValue = a?.[sortKey];
      const bValue = b?.[sortKey];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (
        typeof aValue === 'number' ||
        typeof bValue === 'number'
      ) {
        const result = Number(aValue) - Number(bValue);
        return sortOrder === 'ascend' ? result : -result;
      }

      const result = String(aValue).localeCompare(
        String(bValue),
        'fa',
        {
          numeric: true,
          sensitivity: 'base',
        }
      );

      return sortOrder === 'ascend' ? result : -result;
    });
  }, [filteredDataSource, sortField, sortOrder]);

  const summaryRow = useMemo(() => {
    if (!showSummary || !summaryData) return undefined;
    return () => React.createElement(
      Table.Summary.Row,
      null,
      enhancedColumns.map((col, index) =>
        React.createElement(Table.Summary.Cell, { key: col.key || index, index, align: 'center' },
          React.createElement(Typography.Text, { strong: true }, summaryData[col.dataIndex as string] || '')
        )
      )
    );
  }, [showSummary, summaryData, enhancedColumns]);

  const statistics = useMemo(() => {
    if (!showStatistics || dataSource.length === 0) return null;
    return { totalRecords: dataSource.length, selectedRecords: selectedRowKeys.length };
  }, [showStatistics, dataSource, selectedRowKeys]);

  const activeFilterTags = useMemo(() => {
    const tags: any[] = [];
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          tags.push({ key, label: columns.find(col => col.dataIndex === key)?.title || key, value: Array.isArray(value) ? value.join(', ') : value });
        }
      });
    }
    return tags;
  }, [filters, columns]);

  const columnSettingsMenu: MenuProps['items'] = columns
    .filter(col => { const key = col.key || col.dataIndex; return key !== 'action' && key !== 'row' && key !== 'rowNumber' && key !== 'drag-handle'; })
    .map(col => {
      const key = col.key || col.dataIndex;
      return {
        key,
        label: React.createElement('div', { className: 'flex items-center justify-between gap-4', style: { minWidth: 150 } },
          React.createElement('span', null, col.title),
          visibleColumns.includes(key) ? React.createElement(EyeOutlined, { className: 'text-green-500' }) : React.createElement(EyeInvisibleOutlined, { className: 'text-gray-400' })
        ),
        onClick: () => setVisibleColumns(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]),
      };
    });

  // ==================== ROW DRAG HANDLERS ====================
  const handleRowDragStart = useCallback(() => { }, []);

  const handleRowDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setOrderedData(prev => {
        const oldIndex = prev.findIndex((item: any) => (item as any)[rowKey as string] === active.id);
        const newIndex = prev.findIndex((item: any) => (item as any)[rowKey as string] === over?.id);
        const newData = arrayMove(prev, oldIndex, newIndex);
        onRowDragEnd?.(oldIndex, newIndex, newData);
        return newData;
      });
    }
  }, [rowKey, onRowDragEnd]);

  // ==================== OTHER HANDLERS ====================
  const toggleFullscreen = useCallback(() => setIsFullscreen(prev => !prev), []);
  const toggleMaximize = useCallback(() => setIsMaximized(prev => !prev), []);
  const handleDensityChange = useCallback((newSize: 'small' | 'middle' | 'large') => {
    setCurrentSize(newSize);
    if (settingsKey) localStorage.setItem(`${settingsKey}_density`, newSize);
    onDensityChange?.(newSize);
  }, [onDensityChange, settingsKey]);

  const handleCopy = useCallback(() => {
    if (selectedRowKeys.length > 0) {
      const selectedData = dataSource.filter((item: any) => selectedRowKeys.includes(item[rowKey as string]));
      navigator.clipboard.writeText(JSON.stringify(selectedData, null, 2));
      showSuccess(t('copiedToClipboard'));
    }
  }, [selectedRowKeys, dataSource, rowKey]);

  const handleDelete = useCallback(async () => {
    if (!recordToDelete || !deleteProps) return;
    try {
      setUndoStack(prev => [...prev, { action: 'delete', record: recordToDelete }]); setRedoStack([]);
      const deleteId = deleteProps.getDeleteId(recordToDelete);
      await deleteMutation.mutateAsync({ id: deleteId, method: 'DELETE' });
      queryClient.invalidateQueries({ queryKey: [deleteProps.urlDelete] });
      setRecordToDelete(null); showSuccess(t('deletedSuccessfully'));
    } catch (error) { showError(t('errorOccurred')); }
  }, [recordToDelete, deleteProps, deleteMutation, queryClient]);

  const handleActivate = useCallback(async () => {
    if (!recordToActivate || !activeProps) return;
    try {
      const activePayload = activeProps.getActivePayload(recordToActivate);
      await activateMutation.mutateAsync(activePayload);
      queryClient.invalidateQueries({ queryKey: [activeProps.urlActive] });
      setRecordToActivate(null); showSuccess(t('activatedSuccessfully'));
    } catch (error) { showError(t('errorOccurred')); }
  }, [recordToActivate, activeProps, activateMutation, queryClient]);

  const handleTableChange: TableProps<T>['onChange'] = useCallback(
    (pag, fil, sort) => {
      if (fil && onFilterChange) {
        onFilterChange(fil);
      }

      const sorterResult = Array.isArray(sort)
        ? sort[0]
        : sort;

      setLocalSortField(
        sorterResult?.field as string
      );

      setLocalSortOrder(
        (sorterResult?.order as
          | 'ascend'
          | 'descend'
          | null) ?? null
      );
    },
    [onFilterChange]
  );

  const handleExportCSV = useCallback(() => {
    if (onExportCSV) { onExportCSV(); return; }
    try {
      const exportCols = filteredColumns.filter(col => col.dataIndex !== 'action' && col.dataIndex !== 'row' && col.key !== 'drag-handle');
      const headers = exportCols.map(col => col.title);
      const rows = orderedData.map(item => exportCols.map(col => { const val = (item as any)[col.dataIndex]; return val !== null && val !== undefined ? `"${val}"` : ''; }).join(','));
      const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = `export_${new Date().toISOString().slice(0, 10)}.csv`; link.click();
      URL.revokeObjectURL(url); showSuccess(t('exportCSVSuccess'));
    } catch (error) { showError(t('exportCSVError')); }
  }, [onExportCSV, filteredColumns, orderedData]);

  const handleExportPDF = useCallback(() => { if (onExportPDF) { onExportPDF(); return; } window.print(); }, [onExportPDF]);
  const handleRowClick = useCallback((record: T) => { if (onRowClick) onRowClick(record); }, [onRowClick]);
  const handleRowDoubleClick = useCallback((record: T) => { if (onRowDoubleClick) onRowDoubleClick(record); else if (onDetail && setModalVisibleDetail) setModalVisibleDetail(record); }, [onRowDoubleClick, onDetail, setModalVisibleDetail]);

  const handleContextMenu = useCallback((event: React.MouseEvent, record: T) => {
    if (!showContextMenu) return;
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuRecord(record);
    setContextMenuVisible(true);
  }, [showContextMenu]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!enableKeyboardNavigation) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setFocusedRowIndex(prev => Math.min(prev + 1, dataSource.length - 1)); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setFocusedRowIndex(prev => Math.max(prev - 1, 0)); }
    else if (event.key === 'Enter' && focusedRowIndex >= 0) { const record = dataSource[focusedRowIndex]; if (record && onDetail && setModalVisibleDetail) setModalVisibleDetail(record); }
  }, [enableKeyboardNavigation, dataSource, focusedRowIndex, onDetail, setModalVisibleDetail]);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1)); setRedoStack(prev => [...prev, lastAction]);
    showSuccess(t('undoSuccessful'));
  }, [undoStack]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const lastAction = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1)); setUndoStack(prev => [...prev, lastAction]);
    showSuccess(t('redoSuccessful'));
  }, [redoStack]);

  const handleExpandAll = useCallback(() => {
    setExpandedRowKeys(prev => prev.length === dataSource.length ? [] : dataSource.map(item => (item as any)[rowKey as string]));
  }, [dataSource, rowKey]);

  const resetSettings = useCallback(() => {
    if (!settingsKey) return;
    localStorage.removeItem(`table_settings_${settingsKey}`);
    localStorage.removeItem(`${settingsKey}_density`);
    setVisibleColumns(columns.map(col => col.key || col.dataIndex).filter(Boolean));
    setColumnOrder([]); setCurrentSize(size);
    showSuccess(t('settingsReset'));
  }, [settingsKey, columns, size]);

  // ==================== COMPONENTS ====================
  const showToolbar = showRefresh || showExport || showExportPDF || showExportCSV || showPrint || showFullscreen || showSearch || showColumnSettings || showFilterPanel || title || showStatistics || showSaveSettings || showResetSettings || showExpandAll || showMaximize || undoStack.length > 0 || redoStack.length > 0 || enableColumnDrag;

  // ==================== RENDER TABLE ====================
  const renderTable = () => React.createElement(Table as React.ComponentType<any>, {
    ...restProps,
    columns: enhancedColumns,
    dataSource: sortedDataSource,
    rowKey: rowKey,
    loading: loading ? { indicator: React.createElement(LoadingOutlined, { style: { fontSize: 24 }, spin: true }), spinning: true } : false,
    scroll: scroll || { x: 'max-content' },
    size: currentSize,
    bordered: bordered,
    pagination: false, // ✅ Disabled pagination
    onChange: handleTableChange,
    expandable: expandable ? { ...expandable, expandedRowKeys, onExpandedRowsChange: (keys: React.Key[]) => setExpandedRowKeys(keys) } : undefined,
    rowSelection: showRowSelection ? {
      selectedRowKeys,
      onChange: (keys: React.Key[], rows: T[]) => {
        if (maxSelection && keys.length > maxSelection) { showError(`${t('maxSelection')}: ${maxSelection}`); return; }
        setSelectedRowKeys(keys);
        onSelectionChange?.(keys, rows);
      },
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
    } : undefined,
    components: enableRowDrag ? { body: { row: SortableRow } } : undefined,
    onRow: (record: T, index?: number) => ({
      onClick: () => handleRowClick(record),
      onDoubleClick: () => handleRowDoubleClick(record),
      onContextMenu: (e: React.MouseEvent) => handleContextMenu(e, record),
      onMouseEnter: () => setHoveredRow((record as any)[rowKey as string]),
      onMouseLeave: () => setHoveredRow(null),
      className: `${index !== undefined && index % 2 === 0 ? 'table-row-even' : 'table-row-odd'} ${hoveredRow === (record as any)[rowKey as string] ? 'table-row-hovered' : ''} ${focusedRowIndex === index ? 'table-row-focused' : ''}`,
      style: focusedRowIndex === index ? { backgroundColor: '#e6f7ff' } : undefined,
    }),
    summary: summaryRow,
    locale: {
      emptyText: isError ? (
        React.createElement('div', { className: 'py-8 text-center' },
          React.createElement(ExclamationCircleOutlined, { className: 'text-4xl text-red-500 mb-2' }),
          React.createElement('p', { className: 'report-muted' }, errorText || t('errorLoadingData')),
          onRetry && React.createElement(Button, { type: 'primary', onClick: onRetry, className: 'mt-2' }, t('retry'))
        )
      ) : (
        React.createElement('div', { className: 'py-8 text-center' },
          React.createElement(FileTextOutlined, { className: 'text-4xl mb-2', style: { color: 'var(--color-primary)' } }),
          React.createElement('p', { className: 'report-muted' }, emptyText || t('noData'))
        )
      ),
    }
  });

  // ==================== RENDER ====================
  return React.createElement(
    'div',
    {
      className: `custom-table-container density-${currentSize} ${isFullscreen ? 'fullscreen' : ''} ${isMaximized ? 'maximized' : ''} ${isMobile ? 'mobile-view' : ''} ${className}`,
      dir: direction,
      style: style,
      onKeyDown: handleKeyDown,
      tabIndex: enableKeyboardNavigation ? 0 : undefined
    },
    showToolbar && React.createElement('div', { className: 'table-toolbar' },
      React.createElement('div', { className: 'table-toolbar__layout' },
        React.createElement('div', { className: 'table-toolbar__heading' },
          title && React.createElement('div', { className: 'min-w-0' },
            React.createElement(Typography.Title, { level: isMobile ? 5 : 4, className: 'm-0' }, title),
            subtitle && !isMobile && React.createElement(Typography.Text, { type: 'secondary', className: 'text-xs' }, subtitle)
          ),
          showRowSelection && selectedRowKeys.length > 0 && React.createElement(Badge, { count: selectedRowKeys.length },
            React.createElement(Button, { size: 'small', icon: React.createElement(CopyOutlined, null), onClick: handleCopy }, t('selected'))
          ),
          activeFilterTags.length > 0 && React.createElement('div', { className: 'flex items-center gap-1 flex-wrap' },
            activeFilterTags.map(tag => React.createElement(Tag, { key: tag.key, closable: true, onClose: () => { if (onFilterChange) { const newFilters = { ...filters }; delete newFilters[tag.key]; onFilterChange(newFilters); } }, color: 'blue', className: 'text-xs' }, `${tag.label}: ${tag.value}`)),
            React.createElement(Button, { type: 'link', size: 'small', onClick: () => onFilterChange?.({}) }, t('clearAll'))
          )
        ),
        React.createElement(Space, { wrap: true, size: 'small', className: 'table-toolbar__controls' },
          showSearch && React.createElement(Input, {
            placeholder: t('searchInTable'),
            allowClear: true,
            size: 'middle',
            className: 'table-toolbar__search',
            value: searchText,
            onChange: (e) => setSearchText(e.target.value),
            prefix: React.createElement(SearchOutlined, { className: 'table-toolbar__search-icon', 'aria-hidden': true }),
            'aria-label': t('searchInTable')
          }),
          undoStack.length > 0 && React.createElement(Tooltip, { title: t('undo') }, React.createElement(Button, { icon: React.createElement(UndoOutlined, null), onClick: handleUndo, size: 'small' })),
          redoStack.length > 0 && React.createElement(Tooltip, { title: t('redo') }, React.createElement(Button, { icon: React.createElement(RedoOutlined, null), onClick: handleRedo, size: 'small' })),
          showRefresh && React.createElement(Tooltip, { title: t('refresh') }, React.createElement(Button, { icon: React.createElement(ReloadOutlined, null), onClick: onRefresh, size: 'small' })),
          showFilterPanel && React.createElement(Tooltip, { title: t('advancedFilters') }, React.createElement(Button, { icon: React.createElement(FilterOutlined, null), onClick: () => setShowFilterDrawer(true), size: 'small', type: activeFilterTags.length > 0 ? 'primary' : 'default' })),
          showColumnSettings && React.createElement(Dropdown, { menu: { items: columnSettingsMenu }, trigger: ['click'], placement: dropdownPlacement }, React.createElement(Tooltip, { title: t('columnSettings') }, React.createElement(Button, { icon: React.createElement(SettingOutlined, null), size: 'middle', 'aria-label': t('columnSettings') }))),
          showStatistics && React.createElement(Tooltip, { title: t('statistics') }, React.createElement(Button, { icon: React.createElement(BarChartOutlined, null), onClick: () => setShowStatisticsModal(true), size: 'small' })),
          showExpandAll && expandable && React.createElement(Tooltip, { title: t('expandAll') }, React.createElement(Button, { icon: expandedRowKeys.length > 0 ? React.createElement(CompressOutlined, null) : React.createElement(ExpandOutlined, null), onClick: handleExpandAll, size: 'small' })),
          showExport && React.createElement(Tooltip, { title: t('exportExcel') }, React.createElement(Button, { icon: React.createElement(FileExcelOutlined, null), onClick: onExport, size: 'small' })),
          showExportPDF && React.createElement(Tooltip, { title: t('exportPDF') }, React.createElement(Button, { icon: React.createElement(FilePdfOutlined, null), onClick: handleExportPDF, size: 'small' })),
          showExportCSV && React.createElement(Tooltip, { title: t('exportCSV') }, React.createElement(Button, { icon: React.createElement(FileTextOutlined, null), onClick: handleExportCSV, size: 'small' })),
          showPrint && React.createElement(Tooltip, { title: t('print') }, React.createElement(Button, { icon: React.createElement(PrinterOutlined, null), onClick: onPrint, size: 'small' })),
          showMaximize && React.createElement(Tooltip, { title: isMaximized ? t('minimize') : t('maximize') }, React.createElement(Button, { icon: isMaximized ? React.createElement(MinusSquareOutlined, null) : React.createElement(PlusSquareOutlined, null), onClick: toggleMaximize, size: 'small' })),
          showFullscreen && React.createElement(Tooltip, { title: isFullscreen ? t('exitFullscreen') : t('fullscreen') }, React.createElement(Button, { icon: isFullscreen ? React.createElement(FullscreenExitOutlined, null) : React.createElement(FullscreenOutlined, null), onClick: toggleFullscreen, size: 'small' })),
          enableColumnDrag && React.createElement(Tag, { color: 'green', icon: React.createElement(DragOutlined, null) }, t('dragColumns')),
          hasBatchOperations && selectedRowKeys.length > 0 && React.createElement(React.Fragment, null,
            React.createElement(Divider, { type: 'vertical' }),
            onBatchExport && React.createElement(Tooltip, { title: t('batchExport') }, React.createElement(Button, { icon: React.createElement(ExportOutlined, null), size: 'small', onClick: () => { const selected = dataSource.filter((item: any) => selectedRowKeys.includes(item[rowKey as string])); onBatchExport(selected); } }, t('export')))
          )
        )
      )
    ),
    skeletonLoading ? React.createElement('div', { className: 'p-4' }, React.createElement(Skeleton, { active: true, paragraph: { rows: 10 } }))
      : enableRowDrag ? React.createElement(DndContext, { sensors: rowSensors, collisionDetection: closestCenter, onDragStart: handleRowDragStart, onDragEnd: handleRowDragEnd, modifiers: [restrictToVerticalAxis] },
        React.createElement(SortableContext as React.ComponentType<any>, { items: filteredDataSource.map(item => (item as any)[rowKey as string]), strategy: verticalListSortingStrategy }, renderTable())
      ) : renderTable(),
    showContextMenu && contextMenuVisible && React.createElement(Modal, {
      open: contextMenuVisible,
      onCancel: () => setContextMenuVisible(false),
      footer: null,
      closable: false,
      style: { position: 'fixed', top: contextMenuPosition.y, left: contextMenuPosition.x },
      width: 200,
      mask: false,
      className: 'context-menu-modal'
    },
      React.createElement(Menu, {
        items: [
          { key: 'detail', icon: React.createElement(EyeOutlined, null), label: t('viewDetails'), onClick: () => { if (contextMenuRecord && setModalVisibleDetail) setModalVisibleDetail(contextMenuRecord); setContextMenuVisible(false); } },
          ...(onEdit ? [{ key: 'edit', icon: React.createElement(EditOutlined, null), label: t('edit'), onClick: () => { if (contextMenuRecord && setModalVisibleEdit) setModalVisibleEdit(contextMenuRecord); setContextMenuVisible(false); } }] : []),
          ...(onCopy ? [{ key: 'copy', icon: React.createElement(CopyOutlined, null), label: t('copy'), onClick: () => { if (contextMenuRecord) { navigator.clipboard.writeText(JSON.stringify(contextMenuRecord, null, 2)); showSuccess(t('copiedToClipboard')); } setContextMenuVisible(false); } }] : []),
          { type: 'divider' as const },
        ]
      })
    ),
    showStatistics && React.createElement(Modal, {
      title: t('statistics'),
      open: showStatisticsModal,
      onCancel: () => setShowStatisticsModal(false),
      footer: null
    },
      statistics && React.createElement('div', { className: 'p-4' },
        React.createElement(Row, { gutter: [16, 16] },
          React.createElement(Col, { span: 12 },
            React.createElement(Card, { size: 'small' },
              React.createElement(Typography.Text, { type: 'secondary' }, t('totalRecords')),
              React.createElement(Typography.Title, { level: 4, className: 'mt-2' }, statistics.totalRecords.toLocaleString('fa-IR'))
            )
          ),
          React.createElement(Col, { span: 12 },
            React.createElement(Card, { size: 'small' },
              React.createElement(Typography.Text, { type: 'secondary' }, t('selectedRecords')),
              React.createElement(Typography.Title, { level: 4, className: 'mt-2' }, statistics.selectedRecords.toLocaleString('fa-IR'))
            )
          )
        )
      )
    ),
    deleteProps && React.createElement(Modal, {
      open: !!recordToDelete,
      onOk: handleDelete,
      onCancel: () => setRecordToDelete(null),
      title: deleteProps.titleDelete,
      okText: t('yes'),
      cancelText: t('no'),
      confirmLoading: deleteMutation.isPending,
      okButtonProps: { danger: true }
    }, deleteProps.deleteFN),
    activeProps && React.createElement(Modal, {
      open: !!recordToActivate,
      onOk: handleActivate,
      onCancel: () => setRecordToActivate(null),
      title: activeProps.titleActive,
      okText: t('yes'),
      cancelText: t('no'),
      confirmLoading: activateMutation.isPending
    }, activeProps.activeFN),
    React.createElement('style', { jsx: true, global: true }, `
      .custom-table-container{transition:all .3s ease;background:var(--app-card-bg);color:rgb(var(--foreground-rgb));border:1px solid var(--app-card-border);border-radius:var(--app-radius);overflow:hidden;box-shadow:var(--glass-shadow)}
      .custom-table-container.fullscreen{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1050;background:var(--app-surface);padding:24px;border-radius:0}
      .custom-table-container.maximized{position:fixed;top:80px;left:20px;right:20px;bottom:20px;z-index:1040;padding:16px}
      .table-toolbar{display:flex;align-items:center;padding:14px 16px;background:linear-gradient(135deg,rgba(var(--color-primary-rgb),.12),transparent 42%),var(--app-surface-alt);color:rgb(var(--foreground-rgb));border-bottom:1px solid var(--table-border-color);position:sticky;top:0;z-index:10;backdrop-filter:blur(14px)}
      .table-toolbar__layout{display:flex;align-items:center;justify-content:space-between;gap:18px;width:100%}
      .table-toolbar__heading{display:flex;align-items:center;flex:1;min-width:180px;gap:8px;flex-wrap:wrap}
      .table-toolbar__controls{display:flex!important;align-items:center;justify-content:flex-end;padding:6px;border:1px solid rgba(var(--color-primary-rgb),.13);border-radius:12px;background:rgba(var(--color-primary-rgb),.035)}
      .table-toolbar__controls .ant-space-item{display:flex;align-items:center}
      .table-toolbar__controls .ant-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:9px!important;min-width:34px;height:34px}
      .table-toolbar__icon-button{color:var(--color-primary)!important;background:rgba(var(--color-primary-rgb),.09)!important}
      .table-toolbar__icon-button:hover{background:rgba(var(--color-primary-rgb),.17)!important}
      .table-toolbar__search{width:clamp(210px,25vw,330px)!important;height:38px;border-radius:999px!important;padding-inline:14px!important}
      .table-toolbar__search-icon{color:var(--color-primary);font-size:16px;margin-inline-end:4px}
      .table-toolbar__select{min-width:124px}
      .table-toolbar__select .ant-select-selector{height:38px!important;border-radius:999px!important;align-items:center}
      .table-toolbar .ant-typography{color:var(--app-text)!important}
      .table-toolbar .ant-btn,.table-toolbar .ant-select-selector,.table-toolbar .ant-input-affix-wrapper{border-color:rgba(var(--color-primary-rgb),.22)!important;background:var(--app-card-bg)!important;color:var(--app-text)!important;box-shadow:0 8px 22px rgba(var(--color-primary-rgb),.06)}
      .table-toolbar .ant-btn:hover,.table-toolbar .ant-input-affix-wrapper:hover{border-color:rgba(var(--color-primary-rgb),.48)!important;box-shadow:0 10px 28px rgba(var(--color-primary-rgb),.12)}
      .table-row-even{background-color:var(--table-row-even-bg)}.table-row-odd{background-color:var(--table-row-odd-bg)}
      .table-row-hovered{background-color:var(--ant-table-hover-bg)!important}
      .table-row-focused{outline:2px solid var(--color-primary);outline-offset:-2px}
      .table-row-even:hover,.table-row-odd:hover{background-color:var(--ant-table-hover-bg)!important;cursor:pointer}
      .custom-table-container.density-small .ant-table-thead>tr>th,.custom-table-container.density-small .ant-table-tbody>tr>td{padding:7px 10px!important;font-size:12px}
      .custom-table-container.density-middle .ant-table-thead>tr>th,.custom-table-container.density-middle .ant-table-tbody>tr>td{padding:12px 14px!important;font-size:14px}
      .custom-table-container.density-large .ant-table-thead>tr>th,.custom-table-container.density-large .ant-table-tbody>tr>td{padding:17px 18px!important;font-size:15px}
      .ant-table-thead>tr>th[draggable="true"]:active{cursor:grabbing!important}
      .ant-table-thead>tr>th[draggable="true"]:hover{background-color:var(--ant-table-hover-bg)!important}
      .ant-table-pagination{margin:16px 0!important}
      .ant-pagination-item-active{background:var(--color-primary)!important;border-color:var(--color-primary)!important;border-radius:6px!important}
      .ant-pagination-item-active a{color:#fff!important}
      .ant-pagination-options-quick-jumper input{width:50px;text-align:center}
      .ant-table-thead>tr>th{background:linear-gradient(180deg,rgba(var(--color-primary-rgb),.13),transparent),var(--ant-table-thead-bg)!important;color:var(--ant-table-thead-color)!important;font-weight:800;text-align:center!important;border-bottom:1px solid var(--table-border-color)!important;box-shadow:inset 0 -1px 0 rgba(var(--color-primary-rgb),.18)}
      .ant-table-thead .ant-table-column-sorter{color:rgba(var(--color-primary-rgb),.7)!important}
      .context-menu-modal .ant-modal-content{padding:4px!important;border-radius:8px}
      @media(max-width:900px){.table-toolbar__layout{align-items:stretch;flex-direction:column}.table-toolbar__controls{justify-content:flex-start;width:100%}.table-toolbar__search{flex:1;min-width:180px;width:auto!important}}
      @media(max-width:768px){.mobile-view .table-toolbar{padding:10px}.mobile-view .table-toolbar__heading{min-width:0}.mobile-view .table-toolbar__controls{gap:4px;padding:5px}.mobile-view .table-toolbar__search{width:100%!important;flex-basis:100%}.mobile-view .ant-table{font-size:12px}}
      @media print{.table-toolbar,.ant-pagination,.ant-table-column-sorter{display:none!important}.custom-table-container{box-shadow:none;border-radius:0}}
    `)
  );
}

export default CustomTable;
