import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to successfully complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  experimental: {
    // Use native ES modules for faster builds
    esmExternals: true,
  },
  
  // TypeScript optimizations
  typescript: {
    // Don't run type checking during build (rely on pre-build checks)
    ignoreBuildErrors: false,
  },
  
  // Webpack optimizations for faster builds
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable webpack caching for faster rebuilds
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
      
      // Optimize resolve for faster module resolution
      config.resolve.symlinks = false;
      config.resolve.cacheWithContext = false;
    }
    
    return config;
  },
  
  
  // Image optimization (if using next/image)
  images: {
    unoptimized: false, // Keep optimized for better performance
  },
};

export default nextConfig;
