import type { ReactNode } from 'react';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700', '800'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, t] = await Promise.all([getMessages(), getTranslations('common')]);

  return (
    <html lang={locale} className={`${plusJakartaSans.variable} h-full antialiased scroll-smooth`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface text-on-surface">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow"
        >
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <Script id="velocity-reveal" strategy="afterInteractive">
          {`
            (function () {
              const obs = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                  if (e.isIntersecting) {
                    e.target.classList.add('active');
                    obs.unobserve(e.target);
                  }
                });
              }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
              const apply = () => document.querySelectorAll('.reveal:not(.active)').forEach((el) => obs.observe(el));
              apply();
              window.addEventListener('load', apply);
              const header = document.querySelector('header[data-velocity-header]');
              if (header) {
                const onScroll = () => {
                  if (window.scrollY > 50) {
                    header.classList.add('shadow-xl','bg-surface/95','h-16');
                    header.classList.remove('shadow-sm','h-20');
                  } else {
                    header.classList.add('shadow-sm','h-20');
                    header.classList.remove('shadow-xl','bg-surface/95','h-16');
                  }
                };
                window.addEventListener('scroll', onScroll, { passive: true });
                onScroll();
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
