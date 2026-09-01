import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import type { Metadata, Viewport } from 'next'
import { ReactNode, Suspense } from 'react'

import { Providers } from '@/configs/httpService/reactQuery/rqProvider'
import { AppContextProvider } from '@/configs/providers/appContextProvider'

import './globals.css'
import ToastProvider from '@/lib/reactToastify/toastProvider'
import NextTopLoader from 'nextjs-toploader'
import { AuthProvider } from '@/contexts/app/authContext'
import ThemeProvider from '@/contexts/app/themeContext'
import { LanguageProvider } from '@/configs/language/languageProvider'
import PwaLifecycle from '@/components/pwa/PwaLifecycle'
import { AppUiConfigProvider } from '@/providers/AppUiConfigProvider'
import RouteFavicon from '@/components/RouteFavicon'
import { RouteTransition } from '@/components/RouteTransition'

export const metadata: Metadata = {
  title: 'سامانه خدمات گستر',
  description: 'سامانه خدمات گستر بانک رفاه',
  icons: {
    icon: '/loading-center.svg',
    shortcut: '/loading-center.svg',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'سامانه خدمات گستر',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: '#3a1571',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=JSON.parse(localStorage.getItem('khadamat-appearance-v3')||'{}');var t=s.theme==='dark'?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.documentElement.style.backgroundColor=t==='dark'?'#0c111a':'#f3f5f8'}catch(e){}})()` }} />
      </head>
      <body>
        <RouteFavicon />
        <AppContextProvider>
          <ToastProvider>
            <AntdRegistry>
              <ConfigProvider
                direction="rtl"
                theme={{
                  token: {
                    fontFamily: "IranSans",
                  },
                }}
              >
                <Providers>
                  <AppUiConfigProvider>
                  <ThemeProvider>
                    <LanguageProvider>
                      <AuthProvider>
                        <NextTopLoader
                          color="#e5007d"
                          initialPosition={0.08}
                          crawlSpeed={200}
                          height={4}
                          crawl={true}
                          showSpinner={false}
                          easing="ease"
                          speed={200}
                          shadow="0 0 50px #3a1571,0 0 7px #e5007d"
                          zIndex={1600}
                        />
                        <PwaLifecycle />
                        <Suspense fallback={null}>
                          <RouteTransition />
                        </Suspense>
                        {children}
                      </AuthProvider>
                    </LanguageProvider>
                  </ThemeProvider>
                  </AppUiConfigProvider>
                </Providers>
              </ConfigProvider>
            </AntdRegistry>
          </ToastProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}
