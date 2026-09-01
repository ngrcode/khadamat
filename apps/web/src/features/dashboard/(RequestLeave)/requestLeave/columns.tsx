import { t } from '@/components';
import { createColumn } from '@/components/Table/factories/createColumn';
import { Button, Tooltip, Space, Typography, Switch, Tag, Avatar, Badge } from 'antd';
import {
  DownloadOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  IdcardOutlined
} from '@ant-design/icons';

const { Text } = Typography;

// ========== توابع کمکی ==========

// رندر وضعیت تاهل
const renderMaritalStatus = (status: string | null) => {
  if (!status) return '---';

  const statusMap: Record<string, { color: string; text: string }> = {
    '1': { color: 'blue', text: t('single') },
    '2': { color: 'green', text: t('married') },
    '3': { color: 'orange', text: t('divorced') },
    '4': { color: 'purple', text: t('widowed') },
  };

  const info = statusMap[status] || { color: 'default', text: t('unknown') };
  return <Tag color={info.color}>{info.text}</Tag>;
};

// رندر جنسیت
const renderGender = (gender: string | null) => {
  if (!gender) return '---';

  const genderMap: Record<string, { icon: React.ReactNode; text: string }> = {
    '1': { icon: <UserOutlined />, text: t('male') },
    '2': { icon: <UserOutlined />, text: t('female') },
  };

  const info = genderMap[gender] || { icon: null, text: t('unknown') };
  return (
    <Space>
      {info.icon}
      <span>{info.text}</span>
    </Space>
  );
};

// رندر وضعیت کاربر
const renderStatus = (status: number) => {
  const statusMap: Record<number, { color: string; text: string }> = {
    0: { color: 'default', text: t('statusInactive') },
    1: { color: 'success', text: t('statusActive') },
    2: { color: 'error', text: t('blocked') },
    3: { color: 'warning', text: t('pending') },
  };

  const info = statusMap[status] || { color: 'default', text: t('unknown') };
  return <Tag color={info.color}>{info.text}</Tag>;
};

// رندر تاریخ با فرمت فارسی
const renderDate = (value: string) => {
  if (!value) return '---';

  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '---';

    const formatted = date.toLocaleDateString('fa-IR', {
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

// رندر عکس پروفایل
const renderPhoto = (photoUrl: string) => {
  if (!photoUrl || photoUrl.includes('no-profile.png')) {
    return <Avatar icon={<UserOutlined />} className="bg-primary-200" />;
  }

  return (
    <Avatar
      src={photoUrl}
      className="border-2 border-primary-300"
      icon={<UserOutlined />}
    />
  );
};

// رندر اطلاعات تماس
const renderContactInfo = (mobile: string, phone: string, email: string) => {
  return (
    <Space direction="vertical" size="small" className="w-full">
      {mobile && (
        <Space size="small">
          <PhoneOutlined className="text-primary-400" />
          <Text className="text-neutral-700 text-sm">{mobile}</Text>
        </Space>
      )}
      {phone && phone !== mobile && (
        <Space size="small">
          <PhoneOutlined className="text-primary-300" />
          <Text className="text-neutral-500 text-sm">{phone}</Text>
        </Space>
      )}
      {email && (
        <Space size="small">
          <MailOutlined className="text-primary-400" />
          <Text className="text-neutral-700 text-sm" ellipsis>{email}</Text>
        </Space>
      )}
    </Space>
  );
};

// ========== تعریف ستون‌ها ==========
export const getColumns = (
  pagination?: { current: number; size: number }
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

    // عکس پروفایل
    {
      title: t('photo'),
      dataIndex: 'photo',
      key: 'photo',
      width: 60,
      align: 'center' as const,
      render: (value: string) => renderPhoto(value),
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
      title: t('employmentId'),
      field: 'employment_id',
      width: 120,
      type: 'string',
      sortable: true,
      className: 'text-neutral-700 font-mono',
      render: (value: any) => (
        <Tooltip title={t('employmentId')}>
          <Text className="font-mono text-primary-600 font-bold">{value ?? '---'}</Text>
        </Tooltip>
      ),
    }),

    createColumn({
      title: t('fullName'),
      field: 'first_name',
      width: 120,
      type: 'string',
      sortable: true,
      className: 'text-neutral-800 font-serif',
      render: (value: any, record: any) => {
        const fullName = `${record.first_name || ''} ${record.last_name || ''}`.trim() || '---';
        return (
          <Tooltip title={fullName}>
            <Text className="font-serif text-neutral-800 font-medium">
              {fullName}
            </Text>
          </Tooltip>
        );
      },
    }),

    // createColumn({
    //   title: t('gender') || 'جنسیت',
    //   field: 'gender',
    //   width: 80,
    //   type: 'string',
    //   sortable: true,
    //   className: 'text-neutral-600',
    //   render: (value: string) => renderGender(value),
    // }),

    // createColumn({
    //   title: t('maritalStatus') || 'وضعیت تاهل',
    //   field: 'maratial_status',
    //   width: 110,
    //   type: 'string',
    //   sortable: true,
    //   className: 'text-neutral-600',
    //   render: (value: string) => renderMaritalStatus(value),
    // }),

    createColumn({
      title: t('mobile'),
      field: 'mobile',
      width: 120,
      type: 'string',
      sortable: true,
      className: 'text-neutral-700 font-mono',
      render: (value: string) => (
        <Space>
          <PhoneOutlined className="text-primary-400" />
          <Text className="font-mono">{value || '---'}</Text>
        </Space>
      ),
    }),

   

    createColumn({
      title: t('unitName'),
      field: 'unit_name',
      width: 120,
      type: 'string',
      sortable: true,
      ellipsis: true,
      className: 'text-neutral-600',
      render: (value: string) => (
        <Tooltip title={value}>
          <Space>
            <EnvironmentOutlined className="text-primary-400" />
            <Text ellipsis className="text-neutral-600">
              {value || '---'}
            </Text>
          </Space>
        </Tooltip>
      ),
    }),

    createColumn({
      title: t('email'),
      field: 'email',
      width: 120,
      type: 'string',
      sortable: true,
      ellipsis: true,
      className: 'text-neutral-600',
      render: (value: string) => (
        <Tooltip title={value}>
          <Space>
            <MailOutlined className="text-primary-400" />
            <Text ellipsis className="text-neutral-600">
              {value || '---'}
            </Text>
          </Space>
        </Tooltip>
      ),
    }),

    // createColumn({
    //   title: t('centerNames') || 'مرکز',
    //   field: 'center_names',
    //   width: 180,
    //   type: 'string',
    //   sortable: true,
    //   ellipsis: true,
    //   className: 'text-neutral-600',
    //   render: (value: string) => (
    //     <Tooltip title={value}>
    //       <Text ellipsis className="text-neutral-600">
    //         {value || '---'}
    //       </Text>
    //     </Tooltip>
    //   ),
    // }),

    // createColumn({
    //   title: t('joiningDate') || 'تاریخ استخدام',
    //   field: 'joining_date',
    //   width: 100,
    //   type: 'string',
    //   sortable: true,
    //   className: 'text-neutral-600',
    //   render: (value: string) => renderDate(value),
    // }),

    // {
    //   title: t('status') || 'وضعیت',
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 100,
    //   align: 'center' as const,
    //   render: (value: number) => renderStatus(value),
    // },

  
  ];
