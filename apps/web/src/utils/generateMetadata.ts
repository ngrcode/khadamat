import type { Metadata } from 'next';
import type {
  AbsoluteString,
  DefaultTemplateString,
} from 'next/dist/lib/metadata/types/metadata-types';

interface GenerateMetadataOptions {
  withSuffix?: boolean;
  noIndex?: boolean;
}

const APP_NAME = 'پنل ادمین';
const SITE_NAME = 'پنل ادمین';
const SITE_URL = 'https://report.rptd.ir/';
const DEFAULT_IMAGE = '/images/og-image.jpg';

export default function generateMetadata(
  metadata?: Partial<Metadata>,
  options?: GenerateMetadataOptions
): Metadata {
  let title: string | DefaultTemplateString | AbsoluteString =
    metadata?.title ?? APP_NAME;

  if (options?.withSuffix && title) {
    title = `${title.toString()} | ${APP_NAME}`;
  }

  const description =
    metadata?.description ??
    'سامانه مدیریت، گزارش‌گیری و کنترل عملیات';

  const url =
    metadata?.alternates?.canonical?.toString() ??
    SITE_URL;

  return {
    metadataBase:
      metadata?.metadataBase ??
      new URL(SITE_URL),

    applicationName: APP_NAME,

    title,

    description,

    keywords: metadata?.keywords ?? [
      'پنل ادمین',
      'مدیریت',
      'گزارش',
      'داشبورد',
      'سامانه',
    ],

    authors: metadata?.authors ?? [
      {
        name: APP_NAME,
        url: SITE_URL,
      },
    ],

    creator: APP_NAME,

    publisher: APP_NAME,

    category: 'Business',

    referrer: 'origin-when-cross-origin',

    generator: 'Next.js',

    alternates: {
      canonical: url,
      languages: {
        fa: '/',
        en: '/en',
      },
      ...metadata?.alternates,
    },

    robots: options?.noIndex
      ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      }
      : {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },

    openGraph: {
      title: title.toString(),
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fa_IR',
      type: 'website',

      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: title.toString(),
        },
      ],

      ...metadata?.openGraph,
    },

    twitter: {
      card: 'summary_large_image',
      title: title.toString(),
      description,

      images: [DEFAULT_IMAGE],

      creator: '@admin',

      ...metadata?.twitter,
    },

    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: 'any',
        },
      ],

      shortcut: ['/favicon.ico'],

      apple: [
        {
          url: '/apple-touch-icon.png',
          sizes: '180x180',
        },
      ],

      ...metadata?.icons,
    },

    verification: {
      google: 'google-verification-code',
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-verification-code',

      ...metadata?.verification,
    },

    appleWebApp: {
      capable: true,
      title: APP_NAME,
      statusBarStyle: 'default',
    },

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    manifest: '/manifest.json',

    archives: metadata?.archives,
    assets: metadata?.assets,
    bookmarks: metadata?.bookmarks,

    other: {
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=5',
      themeColor: '#3a1571',
      ...metadata?.other,
    },

    ...metadata,
  };
}
