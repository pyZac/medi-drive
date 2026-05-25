import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import { TriangleAlert } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, pathname: '/impressum', title: t('impressumTitle'), description: t('impressumDescription') });
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('impressum');

  return (
    <section className="bg-background py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{t('heading')}</h1>

        {/* Placeholder notice — MUST be removed when real legal copy is supplied */}
        <div
          role="alert"
          className="mt-8 flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p className="text-sm">{t('notice')}</p>
        </div>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground">
          <div>
            <h2 className="text-base font-semibold text-foreground">{t('operatorHeading')}</h2>
            <p className="mt-2 whitespace-pre-line">{t('companyName')}</p>
            <p className="mt-1 whitespace-pre-line">{t('address')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('contactHeading')}</h2>
            <p className="mt-2">{t('phone')}</p>
            <p>{t('email')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('registrationHeading')}</h2>
            <p className="mt-2 whitespace-pre-line">{t('registration')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('vatHeading')}</h2>
            <p className="mt-2">{t('vat')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('directorHeading')}</h2>
            <p className="mt-2">{t('director')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
