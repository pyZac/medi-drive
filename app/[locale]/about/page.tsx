import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import { Target, Clock, ShieldCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Cta } from '@/components/sections/cta';

const valueCards = [
  { icon: Target, titleKey: 'val1Title', descKey: 'val1Desc' },
  { icon: Clock, titleKey: 'val2Title', descKey: 'val2Desc' },
  { icon: ShieldCheck, titleKey: 'val3Title', descKey: 'val3Desc' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, pathname: '/about', title: t('aboutTitle'), description: t('aboutDescription') });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <>
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="reveal text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('heading')}
          </h1>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground">{t('missionHeading')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('missionText')}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground">{t('storyHeading')}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t('storyText')}</p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="reveal text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('valuesHeading')}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {valueCards.map(({ icon: Icon, titleKey, descKey }) => (
              <Card key={titleKey} className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <Icon className="size-8 text-primary mb-2" aria-hidden="true" />
                  <CardTitle>{t(titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{t(descKey)}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-foreground">{t('regulatoryHeading')}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t('regulatoryText')}</p>
        </div>
      </section>

      <Cta />
    </>
  );
}
