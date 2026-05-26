import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';

const navKeys = ['home', 'about', 'services', 'contact'] as const;

const navHrefs: Record<(typeof navKeys)[number], string> = {
  home: '/',
  about: '/about',
  services: '/services',
  contact: '/contact',
};

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations('nav');
  const tHero = await getTranslations('home.hero');

  return (
    <header
      data-velocity-header
      className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-outline-variant/30 bg-surface/80 shadow-sm backdrop-blur-lg transition-all duration-300"
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-primary"
          >
            LabLink
          </Link>

          <ul className="hidden items-center gap-8 md:flex" role="list">
            {navKeys.map((key) => (
              <li key={key}>
                <Link
                  href={navHrefs[key]}
                  className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <Link
            href="/contact"
            className="btn-glow hidden rounded-full bg-secondary-container px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-primary shadow-lg transition-all hover:scale-105 sm:inline-flex"
          >
            {tHero('ctaContact')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
