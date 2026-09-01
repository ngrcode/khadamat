import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import {
  CalendarOutlined,
  FileExcelOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Space, Tag, Typography } from 'antd';

import { getExcelMonthLabel, getExcelYearLabel } from './mapper';
import { ExcelRow } from './types';

const { Text } = Typography;

const noData = () => t('noData') || '---';

export const getColumns = (pagination?: { current: number; size: number }) => [
  {
    title: t('row'),
    dataIndex: 'row',
    key: 'row',
    width: 96,
    align: 'center' as const,
    className: 'text-neutral-500 font-medium',
    render: (_: any, __: any, index: number) =>
      pagination ? (pagination.current - 1) * pagination.size + index + 1 : index + 1,
  },

  createColumn({
    title: t('excelRecordId'),
    field: 'id',
    width: 110,
    type: 'number',
    sortable: true,
    className: 'text-neutral-700 font-mono',
    render: (value: number) => (
      <Space size="small">
        <NumberOutlined className="text-primary-400" />
        <Text className="font-mono text-primary-600">{value ?? noData()}</Text>
      </Space>
    ),
  }),

  createColumn({
    title: t('excelMonth'),
    field: 'month',
    width: 160,
    sortable: true,
    render: (value: string | null) => (
      <Tag icon={<CalendarOutlined />} color={value ? 'processing' : 'default'}>
        {getExcelMonthLabel(value)}
      </Tag>
    ),
  }),

  createColumn({
    title: t('excelYear'),
    field: 'year',
    width: 120,
    sortable: true,
    render: (value: string | null) => (
      <Tag color={value ? 'success' : 'default'}>{getExcelYearLabel(value)}</Tag>
    ),
  }),

  createColumn({
    title: t('excelPeriod'),
    field: 'period',
    width: 220,
    sortable: false,
    render: (_: string | null, record?: ExcelRow) => {
      const month = getExcelMonthLabel(record?.month);
      const year = getExcelYearLabel(record?.year);
      const hasPeriod = Boolean(record?.month || record?.year);

      return (
        <Space size="small">
          <FileExcelOutlined className="text-primary-400" />
          <Text>{hasPeriod ? `${month} ${year}`.trim() : noData()}</Text>
        </Space>
      );
    },
  }),
];
