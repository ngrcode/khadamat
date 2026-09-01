import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  NumberOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Space, Tag, Tooltip, Typography } from 'antd';

import { RequestLeaveRow } from './types';

const { Paragraph, Text } = Typography;

const noData = () => t('noData') || '---';

const renderTextValue = (value?: string | number | null) => {
  if (value === undefined || value === null || value === '') return noData();
  return <Text>{value}</Text>;
};

const renderLongText = (value?: string | null) => {
  const text = value?.trim();
  if (!text) return noData();

  return (
    <Tooltip title={text}>
      <Paragraph className="!m-0 text-neutral-700" ellipsis={{ rows: 2 }}>
        {text}
      </Paragraph>
    </Tooltip>
  );
};

const renderDate = (value?: string | null) => (
  <Space size="small">
    <CalendarOutlined className="text-primary-400" />
    {renderTextValue(value)}
  </Space>
);

const renderTime = (value?: string | null) => (
  <Space size="small">
    <ClockCircleOutlined className="text-primary-400" />
    {renderTextValue(value)}
  </Space>
);

const renderConfirm = (value?: boolean | null) =>
  value ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      {t('yes')}
    </Tag>
  ) : (
    <Tag icon={<CloseCircleOutlined />} color="default">
      {t('no')}
    </Tag>
  );

const renderStatus = (_: string, record?: RequestLeaveRow) => {
  const colorMap: Record<number, string> = {
    0: 'default',
    1: 'success',
    2: 'error',
    3: 'warning',
  };

  return (
    <Tag color={colorMap[record?.status ?? -1] ?? 'default'}>
      {record?.statusLabel || noData()}
    </Tag>
  );
};

const renderLeaveType = (_: string, record?: RequestLeaveRow) => {
  const normalized = String(record?.enumRequestLeave ?? '').toLowerCase();
  const color = normalized === '0' || normalized === 'hourly' ? 'processing' : 'purple';

  return <Tag color={color}>{record?.enumRequestLeaveLabel || noData()}</Tag>;
};

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
    title: t('employeeFullName'),
    field: 'employeeFullName',
    width: 170,
    sortable: true,
    ellipsis: true,
    render: (value: string, record?: RequestLeaveRow) => (
      <Tooltip title={`${value || noData()} - ${record?.employmentId ?? noData()}`}>
        <Space size="small">
          <UserOutlined className="text-primary-400" />
          <Text>{value || noData()}</Text>
        </Space>
      </Tooltip>
    ),
  }),

  createColumn({
    title: t('firstName'),
    field: 'firstName',
    width: 120,
    sortable: true,
    render: renderTextValue,
  }),

  createColumn({
    title: t('lastName'),
    field: 'lastName',
    width: 140,
    sortable: true,
    render: renderTextValue,
  }),

  createColumn({
    title: t('employmentId'),
    field: 'employmentId',
    width: 130,
    sortable: true,
    render: renderTextValue,
  }),

  createColumn({
    title: t('employeeId'),
    field: 'employeeId',
    width: 110,
    type: 'number',
    sortable: true,
    render: (value: number) => (
      <Space size="small">
        <NumberOutlined className="text-primary-400" />
        <Text>{value ?? noData()}</Text>
      </Space>
    ),
  }),

  createColumn({
    title: t('startedAt'),
    field: 'startedAt',
    width: 140,
    sortable: true,
    render: renderDate,
  }),

  createColumn({
    title: t('finishedAt'),
    field: 'finishedAt',
    width: 140,
    sortable: true,
    render: renderDate,
  }),

  createColumn({
    title: t('startTime'),
    field: 'startTime',
    width: 190,
    sortable: true,
    render: renderTime,
  }),

  createColumn({
    title: t('endTime'),
    field: 'endtime',
    width: 190,
    sortable: true,
    render: renderTime,
  }),

  createColumn({
    title: t('requestLeaveType'),
    field: 'enumRequestLeaveLabel',
    width: 130,
    sortable: true,
    render: renderLeaveType,
  }),

  createColumn({
    title: t('requestLeaveCategory'),
    field: 'typeLabel',
    width: 150,
    sortable: true,
    render: (value: string) => <Tag color="blue">{value || noData()}</Tag>,
  }),

  createColumn({
    title: t('details'),
    field: 'details',
    width: 260,
    ellipsis: true,
    render: renderLongText,
  }),

  createColumn({
    title: t('description'),
    field: 'description',
    width: 260,
    ellipsis: true,
    render: renderLongText,
  }),

  createColumn({
    title: t('created'),
    field: 'created',
    width: 140,
    sortable: true,
    render: renderDate,
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
    title: t('isConfirm'),
    field: 'isConfirm',
    width: 120,
    sortable: true,
    render: renderConfirm,
  }),

  createColumn({
    title: t('isConfirmint'),
    field: 'isConfirmint',
    width: 130,
    type: 'number',
    sortable: true,
    render: (value: number) => (
      <Tag color={value === 1 ? 'success' : 'default'}>{value ?? noData()}</Tag>
    ),
  }),

  createColumn({
    title: t('isResponse'),
    field: 'isResponse',
    width: 120,
    sortable: true,
    render: renderConfirm,
  }),

  createColumn({
    title: t('requestLeaveRawType'),
    field: 'enumRequestLeave',
    width: 120,
    sortable: true,
    render: (value: number | string) => (
      <Space size="small">
        <InfoCircleOutlined className="text-primary-400" />
        {renderTextValue(value)}
      </Space>
    ),
  }),

  createColumn({
    title: t('requestLeaveRawCategory'),
    field: 'type',
    width: 120,
    type: 'number',
    sortable: true,
    render: (value: number) => (
      <Space size="small">
        <FileTextOutlined className="text-primary-400" />
        {renderTextValue(value)}
      </Space>
    ),
  }),
];
