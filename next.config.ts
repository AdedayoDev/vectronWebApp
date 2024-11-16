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

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
};

// Combine configurations correctly
export default withPWA(nextConfig)(pwaConfig);