'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const labels: Record<string, string> = { en: 'EN', de: 'DE' };

export function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1" aria-label="Switch language">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          aria-current={l === locale ? 'true' : undefined}
          className={`rounded px-2 py-1 text-sm font-medium transition-colors ${
            l === locale
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {labels[l] ?? l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
