import { MenuProps } from 'antd'
import Link from 'next/link'
import { t } from '@/configs/language'

export const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link target="_blank" rel="noopener noreferrer" href="https://refah-bank.ir" >
        {t('refahBankPortal')}
      </ Link >
    ),
  },
]
