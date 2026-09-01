'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CustomTable } from '@repo/ui';
import { t } from '@repo/i18n';

type UserRow = {
  key: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
};

const mockUsers: UserRow[] = [
  { key: '1', name: 'علی محمدی', role: 'مدیر', status: 'active' },
  { key: '2', name: 'سارا احمدی', role: 'اپراتور', status: 'active' },
  { key: '3', name: 'رضا کریمی', role: 'کاربر', status: 'inactive' },
];

const columns: ColumnsType<UserRow> = [
  { title: t('userName'), dataIndex: 'name', key: 'name' },
  { title: 'نقش', dataIndex: 'role', key: 'role' },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    key: 'status',
    render: (status: UserRow['status']) => (
      <span className={status === 'active' ? 'text-primary-600' : 'text-neutral-400'}>
        {status === 'active' ? 'فعال' : 'غیرفعال'}
      </span>
    ),
  },
];

export default function UsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Typography.Title level={3} style={{ margin: 0 }}>
          {t('user')}
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />}>
          کاربر جدید
        </Button>
      </div>

      <Card className="admin-card">
        <CustomTable columns={columns} dataSource={mockUsers} pagination={false} />
      </Card>
    </div>
  );
}
