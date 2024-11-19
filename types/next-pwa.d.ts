declare module 'next-pwa' {
    import { NextConfig } from 'next';
  
    export interface PWAConfig {
      dest?: string;
      register?: boolean;
      skipWaiting?: boolean;
      disable?: boolean;
      publicExcludes?: string[];
      buildExcludes?: string[];
      scope?: string;
      sw?: string;
      runtimeCaching?: Array<{
        urlPattern: RegExp | string;
        handler: string;
        options?: Record<string, any>;
      }>;
      [key: string]: any;
    }
  
    export default function withPWA(config: NextConfig & PWAConfig): NextConfig;
  }