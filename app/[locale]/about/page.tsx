import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';

const excellenceCards = [
  { icon: 'medical_services', titleKey: 'excellence1Title', descKey: 'excellence1Desc' },
  { icon: 'hub', titleKey: 'excellence2Title', descKey: 'excellence2Desc' },
  { icon: 'verified', titleKey: 'excellence3Title', descKey: 'excellence3Desc' },
] as const;

const complianceBadges = [
  { icon: 'workspace_premium', titleKey: 'compliance1Title', descKey: 'compliance1Desc' },
  { icon: 'ac_unit', titleKey: 'compliance2Title', descKey: 'compliance2Desc' },
  { icon: 'shield_lock', titleKey: 'compliance3Title', descKey: 'compliance3Desc' },
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
      {/* Hero */}
      <section className="relative overflow-hidden velocity-gradient-bg pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="hero-links-overlay" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <span className="inline-block rounded-full bg-secondary-container/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary-container">
              {t('eyebrow')}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('heading')}
              <span className="text-secondary-container">{t('headingAccent')}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">{t('subtitle')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-glow group inline-flex items-center gap-2 rounded-full bg-secondary-container px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary shadow-lg transition-all"
              >
                {t('heroCta')}
                <span
                  className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <div className="reveal relative">
            <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <div className="velocity-gradient flex h-full w-full items-center justify-center">
                <span
                  className="material-symbols-outlined text-[10rem] text-white/30"
                  aria-hidden="true"
                >
                  biotech
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 max-w-[16rem] rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-2xl">
              <p className="text-3xl font-extrabold text-primary">{t('heroStatValue')}</p>
              <p className="mt-1 text-xs text-on-surface-variant">{t('heroStatLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence through expertise */}
      <section className="bg-surface py-20 px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              {t('excellenceEyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {t('excellenceHeading')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-secondary-container" />
            <p className="mx-auto mt-6 max-w-2xl text-on-surface-variant">
              {t('excellenceSubheading')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {excellenceCards.map(({ icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="magnetic-card reveal group rounded-2xl border border-outline-variant bg-surface-container-lowest p-8"
              >
                <div className="pulse-icon mb-6 flex size-14 items-center justify-center rounded-xl bg-primary/5 text-secondary">
                  <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                    {icon}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary">{t(titleKey)}</h3>
                <p className="text-on-surface-variant">{t(descKey)}</p>
                <div className="mt-6 h-1 w-0 rounded-full bg-secondary-container transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology-driven safety — dark feature */}
      <section className="relative overflow-hidden bg-primary py-20 px-6 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(0,227,253,0.5) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary-container">
              {t('techEyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('techHeading')}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/70">{t('techSubtitle')}</p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {(['1', '2', '3'] as const).map((n) => (
                <div key={n} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-secondary-container">
                    {t(`techStat${n}Value` as 'techStat1Value')}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {t(`techStat${n}Label` as 'techStat1Label')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <div className="velocity-gradient flex h-full w-full items-center justify-center">
              <span
                className="material-symbols-outlined text-[10rem] text-white/30"
                aria-hidden="true"
              >
                monitor_heart
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance badges */}
      <section className="bg-surface-container-low py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {complianceBadges.map(({ icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="magnetic-card reveal rounded-2xl border border-outline-variant bg-surface-container-lowest p-6"
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-secondary-container/20 text-secondary">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {icon}
                  </span>
                </div>
                <h3 className="text-base font-bold text-primary">{t(titleKey)}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navy CTA card */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="velocity-gradient-bg reveal relative overflow-hidden rounded-[2rem] p-12 text-center shadow-2xl sm:p-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary-container">
              {t('ctaEyebrow')}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('ctaHeading')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">{t('ctaSubtitle')}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center rounded-full bg-secondary-container px-10 py-5 text-sm font-semibold uppercase tracking-wider text-primary shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                {t('ctaPrimary')}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-full border border-white/30 px-10 py-5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
