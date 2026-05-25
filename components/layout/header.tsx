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

  return (
    <header className="sticky top-0 z-40 border-b header-scroll-bg backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          LabLink
        </Link>

        <ul className="hidden items-center gap-6 sm:flex" role="list">
          {navKeys.map((key) => (
            <li key={key}>
              <Link
                href={navHrefs[key]}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:content-['']"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <LocaleSwitcher locale={locale} />
      </nav>
    </header>
  );
}
