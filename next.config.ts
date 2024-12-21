
// // export default withPWA(pwaConfig)(nextConfig);
// import type { NextConfig } from "next";
// import type { PWAConfig } from 'next-pwa';

// // Import withPWA this way to avoid TypeScript errors
// const withPWA = require('next-pwa');

// // PWA configuration
// const pwaConfig: PWAConfig = {
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development'
// };

// const config: NextConfig = {
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

// // Export the composed configuration
// export default withPWA(pwaConfig)(config) as NextConfig;


import type { NextConfig } from "next";
import type { PWAConfig } from "next-pwa";

// Import withPWA this way to avoid TypeScript errors
const withPWA = require("next-pwa");

// PWA configuration
const pwaConfig: PWAConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image-domain.com",
        pathname: "/**", // Allow all paths from this domain
      },
    ],
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

// Export the composed configuration
export default withPWA(pwaConfig)(config) as NextConfig;
