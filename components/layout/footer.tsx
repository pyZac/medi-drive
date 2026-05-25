import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

const navHrefs = {
  home: '/',
  about: '/about',
  services: '/services',
  contact: '/contact',
} as const;

export async function Footer() {
  const [tNav, tFooter] = await Promise.all([
    getTranslations('nav'),
    getTranslations('footer'),
  ]);

  return (
    <footer className="mt-20 border-t border-outline-variant bg-surface-container-lowest">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <span className="block text-xl font-extrabold tracking-tight text-primary">
              LabLink
            </span>
            <p className="mt-3 text-sm text-on-surface-variant">
              {tFooter('tagline')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
            <nav aria-label="Footer navigation">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                {tFooter('navHeading')}
              </p>
              <ul className="flex flex-col gap-2" role="list">
                {(Object.keys(navHrefs) as Array<keyof typeof navHrefs>).map(
                  (key) => (
                    <li key={key}>
                      <Link
                        href={navHrefs[key]}
                        className="text-sm text-on-surface-variant transition-colors hover:text-secondary hover:underline underline-offset-4"
                      >
                        {tNav(key)}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                {tFooter('legalHeading')}
              </p>
              <ul className="flex flex-col gap-2" role="list">
                <li>
                  <Link
                    href="/impressum"
                    className="text-sm text-on-surface-variant transition-colors hover:text-secondary hover:underline underline-offset-4"
                  >
                    {tFooter('impressum')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/datenschutz"
                    className="text-sm text-on-surface-variant transition-colors hover:text-secondary hover:underline underline-offset-4"
                  >
                    {tFooter('datenschutz')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-outline-variant pt-6 text-xs text-on-surface-variant">
          <p>{tFooter('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
