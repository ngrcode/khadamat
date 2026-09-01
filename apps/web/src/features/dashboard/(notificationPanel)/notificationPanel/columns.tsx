import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import { Button, Tooltip, Space, Typography, Switch } from 'antd';
import {
  DownloadOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

// ========== توابع کمکی ==========
const renderPublishStatus = (isPublished: boolean | number, record: any) => {
  const published = typeof isPublished === 'number' ? isPublished === 1 : isPublished;

  const handleChange = (checked: boolean) => {
    // if (onStatusChange) onStatusChange(record.id, checked);
  };

  return (
    <Switch
      checked={published}
      checkedChildren={t('statusActive')}
      unCheckedChildren={t('statusInactive')}
      onChange={handleChange}
      className={`
        [&_.ant-switch-handle]:!bg-gradient-gold
        [&_.ant-switch-handle]:!shadow-glow-gold
        [&.ant-switch-checked]:!bg-green-500
        [&:not(.ant-switch-checked)]:!bg-red-500
        [&.ant-switch-checked]:hover:!bg-green-600
        [&:not(.ant-switch-checked)]:hover:!bg-red-600
        transition-all duration-300
      `}
    />
  );
};

const renderString = (value: unknown) =>
  value != null ? String(value) : '---';

const renderDate = (value: string) => {
  if (!value) return '---';
  return (
    <Space>
      <CalendarOutlined className="text-primary-400" />
      <Text className="text-neutral-700">{value}</Text>
    </Space>
  );
};

// ========== تعریف ستون‌ها ==========
export const getColumns = (
  pagination?: { current: number; size: number },
) => [
    {
      title: t('row'),
      dataIndex: 'row',
      key: 'row',
      width: 96,
      align: 'center' as const,
      className: 'text-neutral-500 font-medium',
      render: (_: any, __: any, index: number) =>
        pagination
          ? (pagination.current - 1) * pagination.size + index + 1
          : index + 1,
    },

    createColumn({
      title: t('id'),
      field: 'id',
      width: 50,
      type: 'number',
      sortable: true,
      className: 'text-neutral-700 font-mono',
      headerClassName: 'bg-primary-100 text-primary-800 font-serif',
      render: (value: any) => (
        <Tooltip title={t('uniqueId')}>
          <Text className="font-mono text-primary-600">{value ?? '---'}</Text>
        </Tooltip>
      ),
    }),

    createColumn({
      title: t('title'),
      field: 'title',
      width: 70,
      type: 'string',
      sortable: true,
      ellipsis: true,
      className: 'font-serif text-neutral-800',
      headerClassName: 'bg-primary-100 text-primary-800 font-serif',
      render: (value: unknown) => {
        const str = renderString(value);
        return (
          <Tooltip title={str}>
            <Text ellipsis className="font-serif text-neutral-800">
              {str}
            </Text>
          </Tooltip>
        );
      },
    }),

    createColumn({
      title: t('startedAt'),
      field: 'startedAtString',
      width: 90,
      type: 'string',
      sortable: true,
      className: 'text-neutral-600',
      headerClassName: 'bg-primary-100 text-primary-800 font-serif',
      render: renderDate,
    }),

    createColumn({
      title: t('finishedAt'),
      field: 'finishedAtString',
      width: 90,
      type: 'string',
      sortable: true,
      className: 'text-neutral-600',
      headerClassName: 'bg-primary-100 text-primary-800 font-serif',
      render: renderDate,
    }),

    {
      title: t('status'),
      dataIndex: 'isPublished',
      key: 'isPublished',
      width: 130,
      align: 'center' as const,
      render: (value: boolean | number, record: any) =>
        renderPublishStatus(value, record),
    },

    {
      title: t('export'),
      key: 'attachFile',
      dataIndex: 'attachFile',
      width: 200,
      align: 'center' as const,
      headerClassName: 'bg-primary-100 text-primary-800 font-serif',
      render: (_: any, record: any) => {
        if (!record.attachFile || record.attachFile === 'اطلاعاتی موجود نیست') {
          return (
            <Text type="secondary" className="text-sm">
              {t('fileNotFound')}
            </Text>
          );
        }

        const fileUrl = `${process.env.BASE_URL ?? ''}/${record.attachFile}`;

        return (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-gold hover:bg-gradient-gold-hover border-none text-white shadow-glow-gold"
          >
            {t('download')}
          </Button>
        );
      },
    },
  ];
