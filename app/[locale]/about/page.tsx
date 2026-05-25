import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
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
      <section className="bg-background py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
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

      <section className="bg-muted/40 py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('valuesHeading')}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {valueCards.map(({ icon: Icon, titleKey, descKey }) => (
              <Card key={titleKey}>
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

      <section className="bg-background py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-foreground">{t('regulatoryHeading')}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{t('regulatoryText')}</p>
        </div>
      </section>

      <Cta />
    </>
  );
}
