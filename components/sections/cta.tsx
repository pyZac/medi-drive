import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export async function Cta() {
  const t = await getTranslations('home.cta');

  return (
    <section className="bg-gradient-to-r from-[#003366] to-[#004d61] py-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
          {t('heading')}
        </h2>
        <div className="mt-8">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
            )}
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
