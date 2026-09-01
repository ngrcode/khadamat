import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import { Button, Tooltip, Space, Typography, Switch, Tag } from 'antd';
import { DownloadOutlined, CalendarOutlined } from '@ant-design/icons';
import { renderText } from '@/components/Table/renderers/tableRenderers';
import { getCurrentLanguage } from '@repo/i18n';

const { Text } = Typography;

// ========== توابع کمکی ==========
const renderPublishStatus = (
  isPublished: boolean,
  record: any,
  onStatusChange?: (id: number, status: boolean) => void
) => {
  const handleChange = (checked: boolean) => {
    if (onStatusChange) onStatusChange(record.id, checked);
  };

  return (
    <Switch
      checked={isPublished}
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

const renderDate = (value: string) => {
  // بررسی تاریخ نامعتبر (پیش‌فرض دات‌نت یا خالی)
  if (!value || value === '0001-01-01T00:00:00' || value === '0001-01-01') {
    return '---';
  }

  try {
    // فرمت کردن تاریخ به شمسی یا میلادی
    const date = new Date(value);
    if (isNaN(date.getTime())) return '---';

    // نمایش به فرمت میلادی (یا می‌توانید به شمسی تبدیل کنید)
    const localeMap = { fa: 'fa-IR', ar: 'ar-SA', en: 'en-US', fr: 'fr-FR' } as const;
    const formatted = date.toLocaleDateString(localeMap[getCurrentLanguage()], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <Space>
        <CalendarOutlined className="text-primary-400" />
        <Text className="text-neutral-700">{formatted}</Text>
      </Space>
    );
  } catch {
    return '---';
  }
};

const renderStatus = (status: number) => {
  const statusMap = {
    0: { color: 'default', text: t('statusInactive') },
    1: { color: 'processing', text: t('statusActive') },
  };

  const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap[0];

  return (
    <Tag color={statusInfo.color} className="px-3 py-1 rounded-full">
      {statusInfo.text}
    </Tag>
  );
};

// ========== تعریف ستون‌ها ==========
export const getColumns = (
  pagination?: { current: number; size: number },
  onStatusChange?: (id: number, status: boolean) => void
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
      width: 80,
      type: 'number',
      sortable: true,
      className: 'text-neutral-700 font-mono',
      render: (value: any) => (
        <Tooltip title={t('uniqueId')}>
          <Text className="font-mono text-primary-600">{value ?? '---'}</Text>
        </Tooltip>
      ),
    }),

    createColumn({
      title: t('title'),
      field: 'title',
      width: 200,
      type: 'string',
      sortable: true,
      ellipsis: true,
      className: 'font-serif text-neutral-800',
      render: (value: unknown) => {
        const str = renderText(value);
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
      title: t('body'),
      field: 'body',
      width: 250,
      type: 'string',
      ellipsis: true,
      className: 'text-neutral-600',
      render: (value: unknown) => {
        const str = renderText(value);
        return (
          <Tooltip title={str}>
            <Text ellipsis className="text-neutral-600">
              {str}
            </Text>
          </Tooltip>
        );
      },
    }),

    createColumn({
      title: t('created'),
      field: 'created',
      width: 150,
      type: 'string',
      sortable: true,
      className: 'text-neutral-600',
      render: renderDate,
    }),

    createColumn({
      title: t('lastModified'),
      field: 'lastModified',
      width: 150,
      type: 'string',
      sortable: true,
      className: 'text-neutral-600',
      render: (value: string) => renderDate(value),
    }),

    // createColumn({
    //   title: t('createdBy') || 'ایجاد کننده',
    //   field: 'createdBy',
    //   width: 120,
    //   type: 'string',
    //   sortable: true,
    //   className: 'text-neutral-600',
    //   render: (value: unknown) => renderText(value),
    // }),

    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center' as const,
      render: (value: number) => renderStatus(value),
    },

    // {
    //   title: t('publish') || 'انتشار',
    //   dataIndex: 'isPublished',
    //   key: 'isPublished',
    //   width: 130,
    //   align: 'center' as const,
    //   render: (value: boolean, record: any) =>
    //     renderPublishStatus(value, record, onStatusChange),
    // },
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
