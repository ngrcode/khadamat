import type { Metadata } from 'next';

import MessagesView from '@/features/dashboard/messages/pages/Page';

export const metadata: Metadata = {
  title: 'صندوق پیام‌ها | خدمات گستر',
  description: 'ارسال و پیگیری پیام‌ها',
};

export default function MessagesPage() {
  return <MessagesView />;
}
