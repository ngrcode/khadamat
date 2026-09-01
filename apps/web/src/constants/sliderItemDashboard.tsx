'use client'

import React from 'react'

type IconKey =
  | 'PieChartOutlined'
  | 'DesktopOutlined'
  | 'UserOutlined'
  | 'TeamOutlined'
  | 'FileOutlined'
  | 'AppstoreAddOutlined'
  | 'ProfileOutlined'
  | 'EditOutlined'
  | 'SolutionOutlined'
  | 'NotificationOutlined'
  | 'DollarOutlined'
  | 'TagsOutlined'
  | 'ShareAltOutlined'
  | 'AuditOutlined'
  | 'ScheduleOutlined'
  | 'BarChartOutlined'
  | 'TrophyOutlined'
  | 'WalletOutlined'
  | 'FormOutlined'
  | 'LineChartOutlined'
  | 'InfoCircleOutlined'
  | 'UsergroupAddOutlined'
  | 'CommentOutlined'
  | 'FolderOpenOutlined'
  | 'FileSearchOutlined'
  | 'FileTextOutlined'
  | 'FileProtectOutlined'
  | 'TransactionOutlined'
  | 'FundOutlined'
  | 'AmazonOutlined'
  | 'MenuOutlined'
  |'QuestionCircleOutlined'
  |'FileDoneOutlined'
  |'DollarCircleOutlined'
  |'StarOutlined'
  

export interface MenuItem {
  label: string | React.ReactNode // Support both string and JSX in label
  key: string
  icon?: IconKey
  url?: string
  children?: MenuItem[]
  rolls?:any
}

export const SliderItemDashboard: MenuItem[] = [
  {
    key: '1',
    label: 'ثبت نام',
    icon: 'AppstoreAddOutlined',
    url: '/admin/register',
    rolls: ['ADMIN', 'BRANCH_AGENT'],
  },
  {
    key: '2',
    label: 'تعریف نماینده',
    icon: 'PieChartOutlined',
    url: '#',
    rolls: ['ADMIN'],
    children: [
      {
        key: '34',
        label: 'نماینده شعبه',
        url: '/admin/branchcontroller',
        icon: 'ProfileOutlined',
        rolls: ['ADMIN'],
      },
      {
        key: '35',
        label: 'نماینده استان',
        url: '/admin/provincecontroller',
        icon: 'NotificationOutlined',
        rolls: ['ADMIN'],
      },
      {
        key: '36',
        label: 'ناظر فنی',
        url: '/admin/supervisorcontroller',
        icon: 'NotificationOutlined',
        rolls: ['ADMIN'],
      },
    ],
  },
  {
    key: '3',
    label: 'لیست  اسناد',
    icon: 'UsergroupAddOutlined',
    url: '/admin/legallist',
    rolls: ['ADMIN', 'PROVINCE_AGENT'],
    children: [
      {
        key: '36',
        label: 'حقوقی',
        url: '/admin/legallist',
        icon: 'ProfileOutlined',
        rolls: ['ADMIN', 'PROVINCE_AGENT'],
      },
      {
        key: '37',
        label: 'حقیقی',
        url: '/admin/reallist',
        icon: 'NotificationOutlined',
        rolls: ['ADMIN', 'PROVINCE_AGENT'],
      },
    ],
  },
  {
    key: '4',
    label: 'لیست اسناد شعب',
    icon: 'UsergroupAddOutlined',
    url: '/admin/realbybranch',
    rolls: ['BRANCH_AGENT'],
    children: [
      {
        key: '37',
        label: 'حقیقی',
        url: '/admin/realbybranch',
        icon: 'ProfileOutlined',
        rolls: ['BRANCH_AGENT'],
      },
      {
        key: '38',
        label: 'حقیقی',
        url: '/admin/listbranch',
        icon: 'NotificationOutlined',
        rolls: ['BRANCH_AGENT'],
      },
    ],
  },
  {
    key: '5',
    label: 'کارمزد نگهداشت',
    icon: 'AppstoreAddOutlined',
    url: '/admin/wageMonthly',
    rolls: ['ADMIN',"STATISTICS"],
  },
  {
    key: '6',
    label: 'تجمعی ترمینال',
    icon: 'AppstoreAddOutlined',
    url: '/admin/sumAllTerminals',
    rolls: ['ADMIN'],
  },
  {
    key: '7',
    label: 'به تفکیک نوع خدمت',
    icon: 'AppstoreAddOutlined',
    url: '/admin/reportProcessCode',
    rolls: ['ADMIN',"STATISTICS"],
  },
  {
    key: '8',
    label: 'تراکنش شاخص',
    icon: 'AppstoreAddOutlined',
    url: '/admin/reportIndexTransaction',
    rolls: ['ADMIN', "FUNCTIONALITY"],
  }, 
   {
    key: '8',
    label: 'کارمزد ماهیانه',
    icon: 'AppstoreAddOutlined',
     url: '/admin/keepWageMonthly',
     rolls: ['ADMIN', "STATISTICS"],
  },
];
