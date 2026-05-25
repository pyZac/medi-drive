import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function Hero() {
  const t = await getTranslations('home.hero');

  return (
    <section className="relative overflow-hidden velocity-gradient-bg pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="hero-links-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="btn-glow group inline-flex items-center gap-2 rounded-full bg-secondary-container px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary shadow-lg transition-all"
            >
              {t('ctaContact')}
              <span
                className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              {t('ctaServices')}
            </Link>
          </div>
        </div>

        <div className="reveal relative">
          <div className="group aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <div className="velocity-gradient flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-105">
              <span
                className="material-symbols-outlined text-[10rem] text-white/30"
                aria-hidden="true"
              >
                biotech
              </span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-2xl">
            <div className="pulse-icon flex size-12 items-center justify-center rounded-full bg-success-teal/10 text-success-teal">
              <span className="material-symbols-outlined" aria-hidden="true">
                verified
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                {t('badgeTitle')}
              </p>
              <p className="text-xs text-on-surface-variant">
                {t('badgeSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
