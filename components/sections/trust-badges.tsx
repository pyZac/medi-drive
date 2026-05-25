import { getTranslations } from 'next-intl/server';
import { ShieldCheck, Link2, BadgeCheck, Users } from 'lucide-react';

const badges = [
  { icon: ShieldCheck, key: 'badge1' },
  { icon: Link2, key: 'badge2' },
  { icon: BadgeCheck, key: 'badge3' },
  { icon: Users, key: 'badge4' },
] as const;

export async function TrustBadges() {
  const t = await getTranslations('home.trust');

  return (
    <section className="bg-blue-50 py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t('heading')}
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {badges.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3"
            >
              <Icon className="size-5 text-primary shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
