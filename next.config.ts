import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/Images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withWorkflow(nextConfig);
