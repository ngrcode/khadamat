import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import {
  ApartmentOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Space, Tag, Typography } from 'antd';

import { UnitEmployeeRow } from './types';

const { Text } = Typography;

const noData = () => t('noData') || '---';

const renderStatus = (_: number | null, record?: UnitEmployeeRow) => (
  <Tag
    icon={record?.status === 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
    color={record?.status === 1 ? 'success' : 'default'}
  >
    {record?.statusLabel || noData()}
  </Tag>
);

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
    title: t('id'),
    field: 'id',
    width: 100,
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
    title: t('unitEmployeeTitle'),
    field: 'title',
    width: 260,
    sortable: true,
    ellipsis: true,
    render: (value: string | null) => (
      <Space size="small">
        <ApartmentOutlined className="text-primary-400" />
        <Text>{value || noData()}</Text>
      </Space>
    ),
  }),

  createColumn({
    title: t('status'),
    field: 'status',
    width: 130,
    type: 'number',
    sortable: true,
    render: renderStatus,
  }),
];
