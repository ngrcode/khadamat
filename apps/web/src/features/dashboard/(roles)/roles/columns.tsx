import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import {
  IdcardOutlined,
  MenuOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Space, Tag, Tooltip, Typography } from 'antd';

import { RoleRow } from './types';

const { Paragraph, Text } = Typography;

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
    title: t('id'),
    field: 'id',
    width: 100,
    type: 'number',
    sortable: true,
    className: 'text-neutral-700 font-mono',
    render: (value: number) => (
      <Space size="small">
        <IdcardOutlined className="text-primary-400" />
        <Text className="font-mono text-primary-600">{value ?? noData()}</Text>
      </Space>
    ),
  }),

  createColumn({
    title: t('roleName'),
    field: 'name',
    width: 220,
    sortable: true,
    ellipsis: true,
    render: (value: string | null) => (
      <Space size="small">
        <SafetyCertificateOutlined className="text-primary-400" />
        <Text>{value || noData()}</Text>
      </Space>
    ),
  }),

  createColumn({
    title: t('panelMenu'),
    field: 'panelMenu',
    width: 360,
    sortable: true,
    ellipsis: true,
    render: (_: string | null, record?: RoleRow) => {
      if (!record?.panelMenu) {
        return <Tag color="default">{record?.panelMenuLabel || t('panelMenuEmpty')}</Tag>;
      }

      return (
        <Tooltip title={record.panelMenu}>
          <Space size="small" className="w-full">
            <MenuOutlined className="text-primary-400" />
            <Paragraph className="!m-0 text-neutral-700" ellipsis={{ rows: 2 }}>
              {record.panelMenu}
            </Paragraph>
          </Space>
        </Tooltip>
      );
    },
  }),
];
