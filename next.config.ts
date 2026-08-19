import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  // pdfjs-dist's own internal dynamic import of its worker script breaks
  // under Turbopack bundling ("Setting up fake worker failed") — excluding
  // it from bundling lets it load via plain Node require at runtime instead,
  // same as it would in an unbundled script.
  serverExternalPackages: ['pdfjs-dist'],
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
