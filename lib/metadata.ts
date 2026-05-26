import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lablink-courier.de';

export function buildMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = `${SITE_URL}/${locale}${pathname}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${pathname}`])
  );
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'LabLink',
      locale,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'LabLink — Medical Courier',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}
