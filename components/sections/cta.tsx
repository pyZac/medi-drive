import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function Cta() {
  const t = await getTranslations('home.cta');

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('heading')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            {t('subtext')}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="btn-glow inline-flex items-center rounded-full bg-secondary-container px-10 py-5 text-sm font-semibold uppercase tracking-wider text-primary shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
