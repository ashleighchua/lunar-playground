import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thelunarplayground.com';

  return [
    { url: baseUrl, lastModified: '2026-03-03', changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/birth-report`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/your-chart`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/compatibility`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/astrocartography`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/transit`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/today`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/bazi`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/chinese-zodiac`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/human-design`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/numerology`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/shop`, lastModified: '2026-03-03', changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: '2026-03-02', changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/reviews`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: '2026-03-03', changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: '2026-03-03', changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: '2026-03-03', changeFrequency: 'yearly', priority: 0.2 },
  ];
}
