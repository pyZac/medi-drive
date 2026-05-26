import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/hero';
import { ServiceHighlights } from '@/components/sections/service-highlights';
import { TrustBadges } from '@/components/sections/trust-badges';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Cta } from '@/components/sections/cta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, pathname: '', title: t('homeTitle'), description: t('homeDescription') });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServiceHighlights />
      <TrustBadges />
      <HowItWorks />
      <Cta />
    </>
  );
}
