import { createNextConfig } from '@repo/next-config';

/** @type {import('next').NextConfig} */
const nextConfig = createNextConfig({
  output: 'standalone',
});

export default nextConfig;