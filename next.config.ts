import type { NextConfig } from "next";
import withPWA from 'next-pwa';

// PWA configuration
const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
};

// Create the final config
const nextConfig = withPWA(pwaConfig)({
  reactStrictMode: true,
  images: {
    domains: ['image-domain.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
  }
});

export default nextConfig;