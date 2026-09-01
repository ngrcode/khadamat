import { createNumberSorter, createStringSorter, createDateSorter } from '../hook/useTableSorters';
import { renderNumber, renderCurrency, renderText } from '../renderers/tableRenderers';

interface ColumnOptions {
        title: string;
        field: string;
        width?: number;
        type?: 'string' | 'number' | 'date';
        sortable?: boolean;
        ellipsis?: boolean;

        // UI styling
        className?: string;
        headerClassName?: string;
        cellClassName?: string;

        // UX upgrade (optional but powerful)
        fixed?: 'left' | 'right';

        // Custom renderer
        render?: (value: any, record?: any, index?: number) => React.ReactNode;
}

export const createColumn = ({
        title,
        field,
        width,
        type = 'string',
        sortable = false,
        ellipsis = false,
        className,
        headerClassName,
        cellClassName,
        fixed,
        render: customRender,
}: ColumnOptions) => ({
        title,
        dataIndex: field,
        key: field,
        width,
        align: 'center' as const,
        ellipsis,
        fixed,

        className: `transition-all ${className || ''}`,

        onHeaderCell: () => ({
                className: [
                        'kg-table-header font-semibold',
                        'py-3 px-2',
                        'transition-colors',
                        headerClassName,
                ]
                        .filter(Boolean)
                        .join(' '),
        }),

        onCell: (_record: any, _index: number) => ({
                className: [
                        'transition-all py-2 px-2',
                        cellClassName,
                ]
                        .filter(Boolean)
                        .join(' '),
        }),

        ...(sortable && {
                sorter: type === 'number'
                        ? createNumberSorter(field)
                        : type === 'date'
                                ? createDateSorter(field)
                                : createStringSorter(field),
        }),

        ...(type === 'number' && !customRender && {
                render: renderNumber,
        }),

        ...(customRender && {
                render: customRender,
        }),
});
