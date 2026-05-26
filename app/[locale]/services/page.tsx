import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import { Link } from '@/i18n/navigation';

type CoreService = {
  key: 'probenlogistik' | 'medizintechnik' | 'onDemand';
  icon: string;
};

const coreServices: CoreService[] = [
  { key: 'probenlogistik', icon: 'science' },
  { key: 'medizintechnik', icon: 'package_2' },
  { key: 'onDemand', icon: 'schedule' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, pathname: '/services', title: t('servicesTitle'), description: t('servicesDescription') });
}

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
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">{t('subtitle')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-glow group inline-flex items-center gap-2 rounded-full bg-secondary-container px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary shadow-lg transition-all"
              >
                {t('heroCtaPrimary')}
                <span
                  className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                {t('heroCtaSecondary')}
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
                  local_shipping
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-2xl">
              <div className="pulse-icon flex size-12 items-center justify-center rounded-full bg-success-teal/10 text-success-teal">
                <span className="material-symbols-outlined" aria-hidden="true">
                  bolt
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">24/7</p>
                <p className="text-xs text-on-surface-variant">{t('tempStat3Label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core services */}
      <section className="bg-surface py-20 px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              {t('coreEyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {t('coreHeading')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-secondary-container" />
            <p className="mx-auto mt-6 max-w-2xl text-on-surface-variant">
              {t('coreSubheading')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {coreServices.map(({ key, icon }) => (
              <div
                key={key}
                className="magnetic-card reveal group flex flex-col rounded-2xl border border-outline-variant bg-surface-container-lowest p-8"
              >
                <div className="pulse-icon mb-6 flex size-14 items-center justify-center rounded-xl bg-primary/5 text-secondary">
                  <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                    {icon}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary">{t(`${key}.title`)}</h3>
                <p className="mb-6 text-sm text-on-surface-variant">{t(`${key}.desc`)}</p>
                <ul className="mb-6 space-y-2.5 border-t border-outline-variant/60 pt-5" role="list">
                  {(['feature1', 'feature2', 'feature3'] as const).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <span
                        className="material-symbols-outlined mt-0.5 text-base text-secondary-container"
                        aria-hidden="true"
                      >
                        check_circle
                      </span>
                      <span>{t(`${key}.${f}`)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary"
                  >
                    {t(`${key}.linkLabel`)}
                    <span
                      className="material-symbols-outlined text-base transition-transform group-hover/link:translate-x-1"
                      aria-hidden="true"
                    >
                      arrow_forward
                    </span>
                  </Link>
                </div>
                <div className="mt-6 h-1 w-0 rounded-full bg-secondary-container transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temperature safety — dark feature */}
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
          <div className="reveal aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <div className="velocity-gradient flex h-full w-full items-center justify-center">
              <span
                className="material-symbols-outlined text-[10rem] text-white/30"
                aria-hidden="true"
              >
                ac_unit
              </span>
            </div>
          </div>

          <div className="reveal">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary-container">
              {t('tempEyebrow')}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('tempHeading')}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/70">{t('tempSubtext')}</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {(['1', '2', '3'] as const).map((n) => (
                <div
                  key={n}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <p className="text-2xl font-extrabold text-secondary-container">
                    {t(`tempStat${n}Value` as 'tempStat1Value')}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {t(`tempStat${n}Label` as 'tempStat1Label')}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center gap-2 rounded-full bg-secondary-container px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                {t('tempCta')}
                <span
                  className="material-symbols-outlined text-base"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
