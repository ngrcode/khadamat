import { CalendarOutlined, FileTextOutlined, NumberOutlined } from '@ant-design/icons';
import { Space, Tag, Typography } from 'antd';
import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import type { HokmRow } from './types';

const { Text } = Typography;

export const getColumns = (
  pagination?: { current: number; size: number },
) => [
  {
    title: t('row'),
    dataIndex: 'row',
    key: 'row',
    width: 96,
    align: 'center' as const,
    render: (_: unknown, __: HokmRow, index: number) =>
      pagination
        ? (pagination.current - 1) * pagination.size + index + 1
        : index + 1,
  },
  createColumn({
    title: t('hokmTitle'),
    field: 'titleLabel',
    width: 320,
    type: 'string',
    sortable: true,
    ellipsis: true,
    render: (value: string) => (
      <Space>
        <FileTextOutlined className="text-primary-400" />
        <Text ellipsis>{value || t('noData')}</Text>
      </Space>
    ),
  }),
  createColumn({
    title: t('hokmYear'),
    field: 'yearLabel',
    width: 140,
    type: 'number',
    sortable: true,
    render: (value: string) => (
      <Tag color="blue" icon={<CalendarOutlined />}>
        {value || t('noData')}
      </Tag>
    ),
  }),
  createColumn({
    title: t('recordId'),
    field: 'id',
    width: 120,
    type: 'string',
    sortable: true,
    render: (value: string) => (
      <Space>
        <NumberOutlined className="text-primary-400" />
        <Text className="font-mono">{value || t('noData')}</Text>
      </Space>
    ),
  }),
];
