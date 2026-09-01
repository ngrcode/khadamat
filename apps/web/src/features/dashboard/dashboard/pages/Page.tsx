'use client';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DashboardOutlined,
  FileExcelOutlined,
  LoadingOutlined,
  RiseOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Progress, Space, Typography } from 'antd';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { ReactNode } from 'react';
import { cn } from '@/lib/talwindeMergeCn';
import { t } from '@/configs/language';
import { useLanguage } from '@/configs/language/languageProvider';
import useDashboard, { DashboardGroup, DashboardModule } from '../model/ViewModel';
import { useTheme } from '@/contexts/app/themeContext';

const { Text, Title } = Typography;

const cardMotion = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const StatCard = ({
  title,
  value,
  caption,
  icon,
}: {
  title: string;
  value: number | string;
  caption: string;
  icon: ReactNode;
}) => (
  <motion.div variants={cardMotion} className="kg-card p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <Text className="kg-muted block">{title}</Text>
        <div className="mt-2 text-2xl font-bold text-[rgb(var(--foreground-rgb))]">
          {typeof value === 'number' ? <CountUp end={value} duration={0.9} /> : value}
        </div>
        <Text className="kg-muted mt-2 block text-xs">{caption}</Text>
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--app-radius)] bg-[rgba(var(--color-primary-rgb),0.12)] text-[var(--color-primary)]">
        {icon}
      </div>
    </div>
  </motion.div>
);

const DistributionChart = ({
  groups,
  conicGradient,
  totalModules,
}: {
  groups: DashboardGroup[];
  conicGradient: string;
  totalModules: number;
}) => (
  <motion.div variants={cardMotion} className="kg-card p-5">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
      <div className="relative mx-auto h-44 w-44 shrink-0 rounded-full p-4"
        style={{ background: `conic-gradient(${conicGradient || 'var(--color-primary) 0% 100%'})` }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[var(--app-surface)] text-center shadow-inner">
          <span className="text-3xl font-bold text-[rgb(var(--foreground-rgb))]">
            <CountUp end={totalModules} duration={0.9} />
          </span>
          <span className="kg-muted text-xs">{t('dashboardModules')}</span>
        </div>
      </div>

      <div className="grid flex-1 gap-3">
        {groups.map((group) => {
          const percent = totalModules ? Math.round((group.count / totalModules) * 100) : 0;
          return (
            <div key={group.key}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <Space size={8}>
                  <span className="h-3 w-3 rounded-full" style={{ background: group.color }} />
                  <Text className="!text-[rgb(var(--foreground-rgb))]">{group.label}</Text>
                </Space>
                <Text className="kg-muted">{group.count}</Text>
              </div>
              <Progress
                percent={percent}
                showInfo={false}
                strokeColor={group.color}
                trailColor="rgba(148, 163, 184, 0.18)"
              />
            </div>
          );
        })}
      </div>
    </div>
  </motion.div>
);

const QuickAction = ({
  module,
  isRtl,
}: {
  module: DashboardModule;
  isRtl: boolean;
}) => (
  <Link
    href={module.href}
    className="group flex min-h-[72px] items-center justify-between gap-3 rounded-[var(--app-radius)] border border-[var(--app-card-border)] bg-[var(--app-surface)] px-4 py-3 text-[rgb(var(--foreground-rgb))] transition hover:border-[var(--color-primary)] hover:bg-[rgba(var(--color-primary-rgb),0.08)]"
  >
    <div className="min-w-0">
      <Text strong className="block truncate !text-[rgb(var(--foreground-rgb))]">{module.title}</Text>
      <Text className="kg-muted text-xs">{t(`dashboardGroup_${module.group}` as any)}</Text>
    </div>
    {isRtl ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
  </Link>
);

export default function Dashboard() {
  const {
    handleExportExcel,
    isLoadingExcelGetValues,
    modules,
    groups,
    quickActions,
    conicGradient,
    busiestGroup,
    totalModules,
  } = useDashboard();
  const { direction } = useLanguage();
  const { appearance } = useTheme();
  const isRtl = direction === 'rtl';
  const listLimit = { FEW: 3, STANDARD: 4, MANY: 6 }[appearance.dashboardListLimit];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.06 },
        },
      }}
      dir={direction}
      className={cn('min-h-[calc(100vh-110px)] text-[rgb(var(--foreground-rgb))]')}
    >
      {appearance.showDashboardHeader && <motion.section
        variants={cardMotion}
        className="relative overflow-hidden rounded-[calc(var(--app-radius)+10px)] border border-[var(--app-card-border)] bg-[linear-gradient(135deg,rgba(var(--color-primary-rgb),0.12),rgba(var(--color-accent-rgb),0.07),transparent)] p-5 md:p-7"
      >
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <Space
              className="
        w-fit
        rounded-full
        bg-[rgba(var(--color-primary-rgb),0.12)]
        px-3
        py-1
        text-[var(--color-primary)]
      "
            >
              <DashboardOutlined />
              <Text className="!mb-0 !text-[var(--color-primary)]">
                {t('dashboardDescription')}
              </Text>
            </Space>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleExportExcel}
            loading={isLoadingExcelGetValues}
            icon={
              isLoadingExcelGetValues ? (
                <LoadingOutlined />
              ) : (
                <FileExcelOutlined />
              )
            }
            className="
      !h-12
      w-full
      md:w-auto
      lg:min-w-[220px]
      !font-semibold
    "
          >
            {t('dashboardExportEmployees')}
          </Button>
        </div>
      </motion.section>}

      {appearance.showDashboardMetrics && <motion.section
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.06 },
          },
        }}
        className="metric-grid mt-5"
      >
        <StatCard
          title={t('dashboardModules')}
          value={totalModules}
          caption={t('dashboardModulesCaption')}
          icon={<DashboardOutlined />}
        />
        <StatCard
          title={t('dashboardPeople')}
          value={groups.find((group) => group.key === 'people')?.count || 0}
          caption={t('dashboardPeopleCaption')}
          icon={<TeamOutlined />}
        />
        <StatCard
          title={t('dashboardBusiestGroup')}
          value={busiestGroup?.label || t('noData')}
          caption={t('dashboardBusiestGroupCaption')}
          icon={<RiseOutlined />}
        />
        <StatCard
          title={t('dashboardSecurity')}
          value={t('dashboardSecurityValue')}
          caption={t('dashboardSecurityCaption')}
          icon={<SafetyCertificateOutlined />}
        />
      </motion.section>}

      <div className={cn('mt-5 grid gap-5', appearance.dashboardLayout === 'SPLIT' && 'xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]')}>
        {appearance.showDashboardDistribution && <DistributionChart
          groups={groups}
          conicGradient={conicGradient}
          totalModules={totalModules}
        />}

        {appearance.showDashboardQuickActions && <motion.div variants={cardMotion} className="kg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <Text strong className="block !text-[rgb(var(--foreground-rgb))]">{t('dashboardQuickActions')}</Text>
              <Text className="kg-muted text-xs">{t('dashboardQuickActionsCaption')}</Text>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {quickActions.slice(0, listLimit).map((module) => (
              <QuickAction key={`${module.href}-${module.title}`} module={module} isRtl={isRtl} />
            ))}
          </div>
        </motion.div>}
      </div>


    </motion.div>
  );
}
