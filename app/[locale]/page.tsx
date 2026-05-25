import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{t('home')}</h1>
      <p className="mt-4 text-lg text-muted-foreground">LabLink — content coming in Phase 3.</p>
    </div>
  );
}
