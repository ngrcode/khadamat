import { WifiOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { t } from '@/configs/language';

const OfflinePage = () => (
  <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(var(--color-primary-rgb),0.16),rgba(var(--color-accent-rgb),0.1)),rgb(var(--background-end-rgb))] p-6">
    <section className="kg-card max-w-md p-8 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(var(--color-primary-rgb),0.14)] text-3xl text-[var(--color-primary)]">
        <WifiOutlined />
      </div>
      <h1 className="mb-3 text-2xl font-bold text-[rgb(var(--foreground-rgb))]">
        {t('offlineTitle')}
      </h1>
      <p className="kg-muted mb-6 leading-7">
        {t('offlineDescription')}
      </p>
      <Button type="primary" icon={<ReloadOutlined />} href="/dashboard">
        {t('retry')}
      </Button>
    </section>
  </main>
);

export default OfflinePage;
