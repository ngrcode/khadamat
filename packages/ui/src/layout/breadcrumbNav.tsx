import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Breadcrumb, Skeleton } from 'antd'

import React from 'react'

import Link from 'next/link'
import { useTheme } from '@repo/theme'

interface BreadcrumbNavProps {
  items: { title: string; href?: string }[]
}



const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
    const { toggleTheme, theme } = useTheme()
  

  const breadcrumbItems = [
    {
      title: (
        <Link href="/">
          <UserOutlined className="text-text-400 hover:text-text-hover transition-colors duration-300" />
        </Link>
      ),
    },
    ...items.map((item) => ({
      title: item.href ? (
        <Link
          className="text-text-200 hover:text-text-400 hover:underline transition-colors duration-300"
          href={item.href}
        >
          {item.title}
        </Link>
      ) : (
        <span className="text-text-200">{item.title}</span>
      ),
    })),
  ]

  return (
 <div
  className={`p-4 rounded-lg mb-4 ${
    theme === 'dark' ? 'bg-breadcrumb-dark' : 'bg-breadcrumb-light'
  }`}
>
  <Breadcrumb items={breadcrumbItems} separator=" " />
</div>



  )
}

export default BreadcrumbNav
