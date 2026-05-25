import { getTranslations } from 'next-intl/server';

const badges = [
  { icon: 'gpp_good', titleKey: 'badge1', descKey: 'badge1Desc' },
  { icon: 'description', titleKey: 'badge2', descKey: 'badge2Desc' },
  { icon: 'security', titleKey: 'badge3', descKey: 'badge3Desc' },
  { icon: 'badge', titleKey: 'badge4', descKey: 'badge4Desc' },
] as const;

export async function TrustBadges() {
  const t = await getTranslations('home.trust');

  return (
    <section className="border-y border-outline-variant/30 bg-surface-container-low py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal mb-12 text-center text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
          {t('heading')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="reveal flex items-start gap-4">
              <div className="pulse-icon rounded-full bg-white p-3 text-secondary shadow-md">
                <span className="material-symbols-outlined" aria-hidden="true">
                  {icon}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary">{t(titleKey)}</h3>
                <p className="mt-1 text-xs text-on-surface-variant">
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
