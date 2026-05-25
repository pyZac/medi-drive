import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lablink-courier.de';
const routes = ['', '/about', '/services', '/contact', '/impressum', '/datenschutz'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${route}`])
        ),
      },
    }))
  );
}
