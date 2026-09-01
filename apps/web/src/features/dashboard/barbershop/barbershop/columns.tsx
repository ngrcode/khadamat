import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import {
  BankOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  IdcardOutlined,
  MailOutlined,
  NumberOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Space, Tag, Tooltip, Typography } from 'antd';

import { BarbershopRow } from './types';

const { Text } = Typography;

const noData = () => t('noData') || '---';

const renderTextValue = (value?: string | number | null) => {
  if (value === undefined || value === null || value === '') return noData();
  return <Text>{value}</Text>;
};

const renderStatus = (_: number | null, record?: BarbershopRow) => (
  <Tag
    icon={record?.status === 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
    color={record?.status === 1 ? 'success' : 'default'}
  >
    {record?.statusLabel || noData()}
  </Tag>
);

const renderPermission = (value?: number | null) => (
  <Tag
    icon={value === 1 ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
    color={value === 1 ? 'success' : 'default'}
  >
    {value === undefined || value === null ? noData() : value === 1 ? t('yes') : t('no')}
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
    width: 90,
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
    title: t('userId'),
    field: 'userId',
    width: 110,
    type: 'number',
    sortable: true,
    render: (value: number) => (
      <Space size="small">
        <NumberOutlined className="text-primary-400" />
        {renderTextValue(value)}
      </Space>
    ),
  }),

  createColumn({
    title: t('employmentId'),
    field: 'employment_id',
    width: 130,
    sortable: true,
    render: renderTextValue,
  }),

  createColumn({
    title: t('fullName'),
    field: 'fullName',
    width: 190,
    sortable: true,
    ellipsis: true,
    render: (value: string, record?: BarbershopRow) => (
      <Tooltip title={`${value || noData()} - ${record?.employment_id ?? noData()}`}>
        <Space size="small">
          <UserOutlined className="text-primary-400" />
          <Text>{value || noData()}</Text>
        </Space>
      </Tooltip>
    ),
  }),

  createColumn({
    title: t('nationalCode'),
    field: 'nationality',
    width: 140,
    sortable: true,
    render: renderTextValue,
  }),

  createColumn({
    title: t('mobile'),
    field: 'mobile',
    width: 120,
    sortable: true,
    render: (value: string) => (
      <Space size="small">
        <PhoneOutlined className="text-primary-400" />
        {renderTextValue(value)}
      </Space>
    ),
  }),

  createColumn({
    title: t('email'),
    field: 'email',
    width: 190,
    sortable: true,
    ellipsis: true,
    render: (value: string) => (
      <Tooltip title={value || noData()}>
        <Space size="small">
          <MailOutlined className="text-primary-400" />
          <Text ellipsis>{value || noData()}</Text>
        </Space>
      </Tooltip>
    ),
  }),

  createColumn({
    title: t('unitName'),
    field: 'unit_name',
    width: 240,
    sortable: true,
    ellipsis: true,
    render: (value: string) => (
      <Tooltip title={value || noData()}>
        <Space size="small">
          <BankOutlined className="text-primary-400" />
          <Text ellipsis>{value || noData()}</Text>
        </Space>
      </Tooltip>
    ),
  }),

  createColumn({
    title: t('barbershopPermission'),
    field: 'barberShop',
    width: 140,
    type: 'number',
    sortable: true,
    render: renderPermission,
  }),

  createColumn({
    title: t('velenjakReservationPermission'),
    field: 'velenjakReservation',
    width: 160,
    type: 'number',
    sortable: true,
    render: renderPermission,
  }),

  createColumn({
    title: t('dateOfBirth'),
    field: 'date_of_birth',
    width: 130,
    sortable: true,
    render: renderTextValue,
  }),

  createColumn({
    title: t('joiningDate'),
    field: 'joining_date',
    width: 170,
    sortable: true,
    render: renderTextValue,
  }),

  createColumn({
    title: t('status'),
    field: 'status',
    width: 120,
    type: 'number',
    sortable: true,
    render: renderStatus,
  }),

  createColumn({
    title: t('ticketCreate'),
    field: 'ticketCreate',
    width: 130,
    sortable: true,
    render: (_: boolean | null, record?: BarbershopRow) => (
      <Space size="small">
        <TeamOutlined className="text-primary-400" />
        <Text>{record?.ticketCreateLabel || noData()}</Text>
      </Space>
    ),
  }),

];
