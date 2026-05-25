import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { ServiceHighlights } from '@/components/sections/service-highlights';
import { TrustBadges } from '@/components/sections/trust-badges';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Cta } from '@/components/sections/cta';

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
