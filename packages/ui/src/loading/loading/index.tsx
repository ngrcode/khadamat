'use client';

import { Typography } from 'antd';
import React from 'react';
import { t } from '@repo/i18n';

export function ClubLoading({ isLoading }: { isLoading: boolean }): JSX.Element {
  if (!isLoading) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md backdrop-filter" />

      <div className="relative z-10 flex flex-col items-center p-8 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin" />
        </div>

        <Typography.Title
          level={5}
          className="!text-blue-600 !mb-0 !font-medium"
        >
          {t('pleaseWait')}
        </Typography.Title>
        <Typography.Text className="text-blue-500/80 text-sm mt-1">
          {t('loadingData')}
        </Typography.Text>
      </div>
    </div>
  );
}
