import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  scope: '/'
})(nextConfig as any);
