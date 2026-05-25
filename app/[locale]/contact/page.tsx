import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/metadata';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

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

          {/* Form column */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
