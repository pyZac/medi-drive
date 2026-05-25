import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export async function Hero() {
  const t = await getTranslations('home.hero');

  return (
    <section className="bg-background py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {t('subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            {t('ctaContact')}
          </Link>
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            {t('ctaServices')}
          </Link>
        </div>
      </div>
    </section>
  );
}
