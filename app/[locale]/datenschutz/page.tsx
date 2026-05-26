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
  return buildMetadata({ locale, pathname: '/datenschutz', title: t('datenschutzTitle'), description: t('datenschutzDescription') });
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('datenschutz');

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
            <h2 className="text-base font-semibold text-foreground">{t('controllerHeading')}</h2>
            <p className="mt-2">{t('controllerText')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('collectHeading')}</h2>
            <p className="mt-2">{t('collectText')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('legalBasisHeading')}</h2>
            <p className="mt-2">{t('legalBasisText')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('retentionHeading')}</h2>
            <p className="mt-2">{t('retentionText')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('rightsHeading')}</h2>
            <p className="mt-2">{t('rightsText')}</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">{t('contactHeading')}</h2>
            <p className="mt-2">{t('contactText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
