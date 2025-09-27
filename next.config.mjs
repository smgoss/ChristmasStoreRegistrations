/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@aws-sdk'],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;