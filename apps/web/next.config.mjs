/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@sk/shared', '@sk/ui'],
};

export default nextConfig;
