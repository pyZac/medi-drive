import { getTranslations } from 'next-intl/server';

const steps = [
  { num: 1, titleKey: 'step1Title', descKey: 'step1Desc', highlight: false },
  { num: 2, titleKey: 'step2Title', descKey: 'step2Desc', highlight: false },
  { num: 3, titleKey: 'step3Title', descKey: 'step3Desc', highlight: true },
] as const;

export async function HowItWorks() {
  const t = await getTranslations('home.howItWorks');

  return (
    <section id="process" className="overflow-hidden bg-surface py-20 px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal mb-16 text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {t('heading')}
        </h2>
        <div className="relative grid gap-12 md:grid-cols-3">
          {steps.map(({ num, titleKey, descKey, highlight }, idx) => (
            <div
              key={num}
              className="reveal group relative z-10 flex flex-col items-center text-center"
            >
              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-8 hidden h-0.5 md:block"
                  style={{
                    left: 'calc(50% + 2.5rem)',
                    width: 'calc(100% - 5rem)',
                    backgroundImage:
                      'repeating-linear-gradient(to right, #00e3fd 0, #00e3fd 10px, transparent 10px, transparent 20px)',
                    zIndex: -1,
                  }}
                />
              )}
              <div
                className={[
                  'mb-6 flex size-16 items-center justify-center rounded-full border-4 border-surface text-xl font-bold shadow-xl transition-transform group-hover:scale-110',
                  highlight
                    ? 'bg-secondary-container text-primary'
                    : 'bg-primary text-secondary-container',
                ].join(' ')}
              >
                {num}
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                {t(titleKey)}
              </h3>
              <p className="text-on-surface-variant">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
