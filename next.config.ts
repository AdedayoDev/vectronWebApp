// import type { NextConfig } from "next";
// import withPWA from 'next-pwa';

// // PWA configuration
// const pwaConfig = {
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development'
// };

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['image-domain.com'],
//   },
//   experimental: {
//     serverActions: {
//       bodySizeLimit: '2mb'
//     },
//   }
// };

// export default withPWA(pwaConfig)(nextConfig);
import type { NextConfig } from "next";
import type { PWAConfig } from 'next-pwa';

// Import withPWA this way to avoid TypeScript errors
const withPWA = require('next-pwa');

// PWA configuration
const pwaConfig: PWAConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
};

const config: NextConfig = {
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

// Export the composed configuration
export default withPWA(pwaConfig)(config) as NextConfig;