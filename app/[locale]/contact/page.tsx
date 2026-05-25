import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tFooter] = await Promise.all([
    getTranslations('contact'),
    getTranslations('footer'),
  ]);

  return (
    <section className="bg-background py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t('heading')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('subheading')}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Address column */}
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t('addressHeading')}</h2>
            <ul className="mt-6 space-y-4" role="list">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-muted-foreground whitespace-pre-line">{t('address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-muted-foreground">{t('phone')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="mailto:contact@lablink-courier.de"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('email')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-muted-foreground">{t('hours')}</span>
              </li>
            </ul>
          </div>

          {/* Form column — static HTML; Phase 4 adds client-side validation and submission */}
          <div>
            <form method="POST" noValidate aria-label={t('heading')}>
              {/* Honeypot — must be empty; Phase 4 API route rejects non-empty submissions */}
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="sr-only"
              />

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    {t('form.name')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="org" className="block text-sm font-medium text-foreground mb-1">
                    {t('form.org')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="org"
                    name="org"
                    type="text"
                    required
                    autoComplete="organization"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    {t('form.email')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                    {t('form.phone')}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                    {t('form.subject')} <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="general">{t('form.subjectGeneral')}</option>
                    <option value="quote">{t('form.subjectQuote')}</option>
                    <option value="partnership">{t('form.subjectPartnership')}</option>
                    <option value="other">{t('form.subjectOther')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    {t('form.message')} <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-0.5 size-4 rounded border-input accent-primary"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    {t('form.consent')}{' '}
                    <Link href="/datenschutz" className="underline hover:text-foreground">
                      {tFooter('datenschutz')}
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {t('form.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
