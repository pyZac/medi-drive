import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { FlaskConical, Repeat, Zap, Package, Thermometer, type LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Cta } from '@/components/sections/cta';

type ServiceDef = {
  key: string;
  icon: LucideIcon;
};

const services: ServiceDef[] = [
  { key: 'diagnosticTransport', icon: FlaskConical },
  { key: 'routineRuns', icon: Repeat },
  { key: 'urgentPickup', icon: Zap },
  { key: 'supplyDelivery', icon: Package },
  { key: 'tempControlled', icon: Thermometer },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  return (
    <>
      <section className="bg-background py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('heading')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t('intro')}</p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map(({ key, icon: Icon }) => (
              <Card key={key}>
                <CardHeader>
                  <Icon className="size-8 text-primary mb-2" aria-hidden="true" />
                  <CardTitle>{t(`${key}.title`)}</CardTitle>
                  <CardDescription>{t(`${key}.desc`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{t(`${key}.includes`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
