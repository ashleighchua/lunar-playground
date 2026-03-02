import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/order-success'],
    },
    sitemap: 'https://thelunarplayground.com/sitemap.xml',
  };
}
