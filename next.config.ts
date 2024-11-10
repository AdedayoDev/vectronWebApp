import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  images: {
    domains: ['image-domain.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
  }
};

export default withPWA({
  ...nextConfig,
  dest: 'public'
} as const);
