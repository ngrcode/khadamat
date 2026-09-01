import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
  MessageOutlined,
  PaperClipOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Space, Tag, Tooltip, Typography } from 'antd';

import { TicketRow } from './types';

const { Paragraph, Text } = Typography;

const noData = () => t('noData') || '---';

const renderLongText = (value?: string) => {
  const text = value?.trim();
  if (!text) return noData();

  return (
    <Tooltip title={text}>
      <Paragraph
        className="!m-0 text-right text-neutral-700"
        ellipsis={{ rows: 2 }}
      >
        {text}
      </Paragraph>
    </Tooltip>
  );
};

const renderState = (stateTitle: string, record?: TicketRow) => {
  const colorMap: Record<number, string> = {
    2: 'success',
    5: 'processing',
  };

  return (
    <Tag color={colorMap[record?.stateId ?? 0] ?? 'default'}>
      {stateTitle || noData()}
    </Tag>
  );
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
    title: t('sender'),
    field: 'senderFullName',
    width: 190,
    sortable: true,
    ellipsis: true,
    render: (value: string, record?: TicketRow) => (
      <Tooltip title={`${value || noData()} - ${record?.senderId ?? noData()}`}>
        <Space size="small">
          <UserOutlined className="text-primary-400" />
          <Text className="text-neutral-800">{value || noData()}</Text>
        </Space>
      </Tooltip>
    ),
  }),

  createColumn({
    title: t('ticketStatus'),
    field: 'stateTitle',
    width: 130,
    sortable: true,
    render: renderState,
  }),

  createColumn({
    title: t('createdDate'),
    field: 'created',
    width: 170,
    sortable: true,
    render: (value: string) => (
      <Space size="small">
        <CalendarOutlined className="text-primary-400" />
        <Text className="text-neutral-700">{value || noData()}</Text>
      </Space>
    ),
  }),

  createColumn({
    title: t('lastUpdate'),
    field: 'lastResponseDate',
    width: 160,
    sortable: true,
    render: (value: string) => (
      <Space size="small">
        <ClockCircleOutlined className="text-primary-400" />
        <Text className="text-neutral-700">{value || noData()}</Text>
      </Space>
    ),
  }),

  createColumn({
    title: t('firstMessage'),
    field: 'firstMessage',
    width: 280,
    ellipsis: true,
    render: renderLongText,
  }),

  createColumn({
    title: t('lastMessage'),
    field: 'lastMessage',
    width: 280,
    ellipsis: true,
    render: renderLongText,
  }),

  createColumn({
    title: t('messageCount'),
    field: 'responseCount',
    width: 120,
    type: 'number',
    sortable: true,
    render: (value: number) => (
      <Badge
        count={value ?? 0}
        showZero
        overflowCount={999}
        color="var(--color-primary)"
      />
    ),
  }),

  createColumn({
    title: t('lastResponder'),
    field: 'lastResponderFullName',
    width: 180,
    ellipsis: true,
    render: (value: string) => (
      <Tooltip title={value || noData()}>
        <Text>{value || noData()}</Text>
      </Tooltip>
    ),
  }),

  createColumn({
    title: t('attachment'),
    field: 'hasAttachment',
    width: 100,
    render: (value: boolean) =>
      value ? (
        <Tag icon={<PaperClipOutlined />} color="blue">
          {t('hasAttachment')}
        </Tag>
      ) : (
        <Tag>{t('noAttachment')}</Tag>
      ),
  }),
];
