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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold tracking-tight text-foreground">LabLink</p>
            <p className="mt-1 text-sm text-muted-foreground">{tFooter('tagline')}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {(Object.keys(navHrefs) as Array<keyof typeof navHrefs>).map((key) => (
                <li key={key}>
                  <Link
                    href={navHrefs[key]}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
          <Link
            href="/impressum"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {tFooter('impressum')}
          </Link>
          <Link
            href="/datenschutz"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {tFooter('datenschutz')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
