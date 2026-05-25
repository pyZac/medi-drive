import { getTranslations } from 'next-intl/server';
import { FlaskConical, Truck, CalendarClock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const cards = [
  { icon: FlaskConical, titleKey: 'card1Title', descKey: 'card1Desc' },
  { icon: Truck, titleKey: 'card2Title', descKey: 'card2Desc' },
  { icon: CalendarClock, titleKey: 'card3Title', descKey: 'card3Desc' },
] as const;

export async function ServiceHighlights() {
  const t = await getTranslations('home.highlights');

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('heading')}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {cards.map(({ icon: Icon, titleKey, descKey }) => (
            <Card key={titleKey} className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <Icon className="size-8 text-primary mb-2" aria-hidden="true" />
                <CardTitle>{t(titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t(descKey)}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
