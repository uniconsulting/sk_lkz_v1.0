import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@sk/shared', '@sk/ui'],
};

export default nextConfig;
