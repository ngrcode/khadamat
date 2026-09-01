'use client'

import React from 'react'
import { Typography } from 'antd'
import { t } from '@repo/i18n'
import styles from './loading.module.css'

const ClubLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className={styles.container}>
        <div className={styles.loader}>
          <span />
          <span />
          <span />
          <span />
        </div>

        <Typography.Title
          level={4}
          className="!mt-8 !mb-2 !text-center !text-[#2444B7]"
        >
          سازمان خدمات گستر
        </Typography.Title>

        <Typography.Text className="block text-center text-gray-500">
          {t('pleaseWait')}
        </Typography.Text>
      </div>
    </div>
  )
}

export default ClubLoading