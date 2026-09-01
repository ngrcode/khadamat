import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { AuthProvider } from '@repo/auth/react';
import { LanguageProvider } from '@repo/i18n/react';
import { Providers } from '@repo/react-query/provider';
import { ThemeProvider } from '@repo/theme';
import { AdminUiConfigProvider } from '@/providers/AdminUiConfigProvider';
import RouteFavicon from '@/components/RouteFavicon';
import { ThemedTopLoader } from '@/components/ThemedTopLoader';

import './globals.css';

export const metadata: Metadata = {
  title: 'پنل مدیریت | خدمات گستر',
  description: 'سامانه مدیریت خدمات گستر بانک رفاه',
  icons: {
    icon: '/loading-center.svg',
    shortcut: '/loading-center.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#3a1571',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('khadamat-appearance-v3')||'{}');var t=s.theme==='dark'?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.documentElement.style.backgroundColor=t==='dark'?'#0c111a':'#f3f5f8'}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <RouteFavicon />
        <Providers>
          <AdminUiConfigProvider>
            <AntdRegistry>
              <ThemeProvider>
                <ConfigProvider direction="rtl">
                  <LanguageProvider>
                    <AuthProvider>
                      <ThemedTopLoader />
                      {children}
                    </AuthProvider>
                  </LanguageProvider>
                </ConfigProvider>
              </ThemeProvider>
            </AntdRegistry>
          </AdminUiConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
