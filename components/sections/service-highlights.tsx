import { getTranslations } from 'next-intl/server';

const cards = [
  { icon: 'science', titleKey: 'card1Title', descKey: 'card1Desc' },
  { icon: 'package_2', titleKey: 'card2Title', descKey: 'card2Desc' },
  { icon: 'schedule', titleKey: 'card3Title', descKey: 'card3Desc' },
] as const;

export async function ServiceHighlights() {
  const t = await getTranslations('home.highlights');

  return (
    <section id="services" className="bg-surface py-20 px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t('heading')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-secondary-container" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="magnetic-card reveal group rounded-2xl border border-outline-variant bg-surface-container-lowest p-8"
            >
              <div className="pulse-icon mb-6 flex size-14 items-center justify-center rounded-xl bg-primary/5 text-secondary">
                <span
                  className="material-symbols-outlined text-4xl"
                  aria-hidden="true"
                >
                  {icon}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                {t(titleKey)}
              </h3>
              <p className="mb-6 text-on-surface-variant">{t(descKey)}</p>
              <div className="h-1 w-0 rounded-full bg-secondary-container transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
