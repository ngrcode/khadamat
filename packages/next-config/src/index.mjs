/** @type {import('next').NextConfig} */
const defaultBackendEnv = {
  BASE_URL: 'https://portal2.kh-poshtibani.ir/',
  BASE_EXCEL_URL: 'https://portal2.kh-poshtibani.ir',
  NEXT_PUBLIC_BASE_URL: 'https://portal2.kh-poshtibani.ir/',
  NEXT_PUBLIC_BASE_EXCEL_URL: 'https://portal2.kh-poshtibani.ir',
  BASE_IMG: 'https://portal2.kh-poshtibani.ir/',
  BASE_file: 'https://portal2.kh-poshtibani.ir/',
};

const sharedTranspilePackages = [
  '@repo/auth',
  '@repo/i18n',
  '@repo/theme',
  '@repo/utils',
  '@repo/react-query',
  '@repo/ui',
];

export function createNextConfig(overrides = {}) {
  return {
    typescript: {
      ignoreBuildErrors: true,
    },
    poweredByHeader: false,
    generateEtags: false,
    compress: true,
    reactStrictMode: false,
    transpilePackages: sharedTranspilePackages,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '172.20.10.3',
          port: '443',
          pathname: '/**',
        },
      ],
      formats: ['image/avif', 'image/webp'],
    },
    env: defaultBackendEnv,
    ...overrides,
  };
}
