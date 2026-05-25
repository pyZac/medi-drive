import { getTranslations } from 'next-intl/server';

const steps = [
  { num: 1, titleKey: 'step1Title', descKey: 'step1Desc' },
  { num: 2, titleKey: 'step2Title', descKey: 'step2Desc' },
  { num: 3, titleKey: 'step3Title', descKey: 'step3Desc' },
] as const;

export async function HowItWorks() {
  const t = await getTranslations('home.howItWorks');

  return (
    <section className="bg-muted/40 py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('heading')}
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3" role="list">
          {steps.map(({ num, titleKey, descKey }) => (
            <li key={num} className="flex flex-col gap-4">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm"
                aria-hidden="true"
              >
                {num}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t(titleKey)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(descKey)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
