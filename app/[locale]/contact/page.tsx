import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/contact-form';

const directItems = [
  {
    icon: 'location_on',
    labelKey: 'addressLabel',
    lines: ['addressLine1', 'addressLine2'] as const,
  },
  {
    icon: 'call',
    labelKey: 'phoneLabel',
    lines: ['phoneValue', 'phoneHours'] as const,
  },
  {
    icon: 'mail',
    labelKey: 'emailLabel',
    lines: ['emailValue'] as const,
  },
] as const;

const departments = [
  { icon: 'trending_up', titleKey: 'dept1Title', descKey: 'dept1Desc', emailKey: 'dept1Email' },
  { icon: 'support_agent', titleKey: 'dept2Title', descKey: 'dept2Desc', emailKey: 'dept2Email' },
  { icon: 'newspaper', titleKey: 'dept3Title', descKey: 'dept3Desc', emailKey: 'dept3Email' },
] as const;

const faqItems = [
  { qKey: 'faq1Q', aKey: 'faq1A', open: true },
  { qKey: 'faq2Q', aKey: 'faq2A', open: false },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, pathname: '/contact', title: t('contactTitle'), description: t('contactDescription') });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden velocity-gradient-bg pt-20 pb-24 sm:pt-28">
        <div className="hero-links-overlay" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="reveal max-w-3xl">
            <span className="inline-block rounded-full bg-secondary-container/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary-container">
              {t('eyebrow')}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('heading')}
              <span className="text-secondary-container">{t('headingAccent')}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">{t('subheading')}</p>
          </div>
        </div>
      </section>

      {/* Form + direct info grid */}
      <section className="bg-surface py-20 px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="reveal glass-card rounded-2xl p-8 shadow-sm md:p-10">
              <h2 className="mb-8 text-2xl font-bold text-primary sm:text-3xl">
                {t('formHeading')}
              </h2>
              <ContactForm variant="stitch" />
            </div>

            {/* Direct info */}
            <div className="reveal">
              <h2 className="mb-8 text-2xl font-bold text-primary sm:text-3xl">
                {t('directHeading')}
              </h2>
              <div className="space-y-8">
                {directItems.map((item) => (
                  <div key={item.labelKey} className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary-container/20 text-secondary">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        {t(item.labelKey)}
                      </p>
                      <div className="mt-1 space-y-0.5">
                        {item.lines.map((line, idx) => (
                          <p
                            key={line}
                            className={
                              idx === 0
                                ? 'text-base text-on-surface'
                                : 'text-xs text-secondary'
                            }
                          >
                            {item.icon === 'mail' && idx === 0 ? (
                              <a
                                href={`mailto:${t('emailValue')}`}
                                className="hover:text-primary transition-colors"
                              >
                                {t(line)}
                              </a>
                            ) : (
                              t(line)
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder card */}
              <div className="mt-10 overflow-hidden rounded-2xl border border-outline-variant shadow-lg">
                <div className="velocity-gradient relative flex h-64 items-center justify-center">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                  }} aria-hidden="true" />
                  <span
                    className="material-symbols-outlined relative text-7xl text-white/60"
                    aria-hidden="true"
                  >
                    location_on
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support center — navy band */}
      <section className="relative overflow-hidden bg-primary-container py-20 px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal mb-16 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t('supportHeading')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-on-primary-container/80">
              {t('supportSubheading')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {departments.map(({ icon, titleKey, descKey, emailKey }) => (
              <a
                key={titleKey}
                href={`mailto:${t(emailKey)}`}
                className="group block rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-secondary-container/40 hover:bg-white/10"
              >
                <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-secondary-container/20 text-secondary-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{t(titleKey)}</h3>
                <p className="mb-6 text-sm text-on-primary-container/80">{t(descKey)}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-secondary-container">
                  <span className="truncate">{t(emailKey)}</span>
                  <span
                    className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + live status */}
      <section className="bg-surface-container-low py-20 px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <h2 className="mb-8 text-3xl font-bold text-primary sm:text-4xl">
              {t('faqHeading')}
            </h2>
            <div className="space-y-4">
              {faqItems.map(({ qKey, aKey, open }) => (
                <details
                  key={qKey}
                  open={open || undefined}
                  className="group overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-bold text-primary marker:hidden">
                    {t(qKey)}
                    <span
                      className="material-symbols-outlined transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </summary>
                  <div className="border-t border-outline-variant/60 p-5 pt-4 text-sm text-on-surface-variant">
                    {t(aKey)}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="reveal relative h-80 lg:h-full lg:min-h-[26rem]">
            <div className="velocity-gradient absolute inset-0 overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[10rem] text-white/30"
                  aria-hidden="true"
                >
                  forum
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 max-w-xs rounded-2xl border-l-4 border-secondary bg-surface-container-lowest p-6 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                {t('liveStatusLabel')}
              </p>
              <p className="mt-2 text-lg font-bold text-primary">{t('liveStatusHeading')}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-teal opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-success-teal" />
                </span>
                <span className="text-xs text-on-surface-variant">{t('liveStatusWait')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
