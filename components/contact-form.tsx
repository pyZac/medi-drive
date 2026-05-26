'use client';

import { useForm, type Resolver } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { contactSchema, type ContactFormData, SUBJECT_VALUES } from '@/lib/schemas/contact';

// Manual resolver avoids @hookform/resolvers version lock-step with Zod minor versions
const resolver: Resolver<ContactFormData> = async (values) => {
  const result = contactSchema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors: Record<string, { type: string; message: string }> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? '');
    if (key && !errors[key]) errors[key] = { type: issue.code, message: issue.message };
  }
  return { values: {}, errors };
};

type Variant = 'default' | 'stitch';

const stitchInput =
  'h-12 rounded-b-none rounded-t-lg border-x-0 border-t-0 border-b-2 border-input bg-surface-container-low px-4 py-3 text-base focus-visible:border-secondary-container focus-visible:ring-0';

const stitchLabel = 'block mb-2 text-xs font-bold uppercase tracking-widest text-primary';
const defaultLabel = 'block text-sm font-medium text-foreground mb-1';

export function ContactForm({ variant = 'default' }: { variant?: Variant } = {}) {
  const t = useTranslations('contact.form');
  const tFooter = useTranslations('footer');
  const isStitch = variant === 'stitch';

  const labelClass = isStitch ? stitchLabel : defaultLabel;
  const inputClass = isStitch ? stitchInput : undefined;
  const selectClass = isStitch
    ? 'w-full h-12 rounded-t-lg rounded-b-none border-x-0 border-t-0 border-b-2 border-input bg-surface-container-low px-4 py-3 text-base text-on-surface focus:outline-none focus:border-secondary-container'
    : 'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver });

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('non-ok response');
      toast.success(t('submitSuccess'));
      reset();
    } catch {
      toast.error(t('submitError'));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label={t('submit')}>
      {/* Honeypot — bots fill this; server rejects non-empty */}
      <input
        type="text"
        {...register('website')}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      />

      <div className="space-y-5">
        <div className={isStitch ? 'grid gap-5 sm:grid-cols-2' : 'space-y-5'}>
          <div>
            <label htmlFor="name" className={labelClass}>
              {t('name')} <span aria-hidden="true">*</span>
            </label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              className={inputClass}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1 text-xs text-destructive">
                {t('nameRequired')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              {t('email')} <span aria-hidden="true">*</span>
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className={inputClass}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
                {errors.email.type === 'invalid_string' ? t('emailInvalid') : t('emailRequired')}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="org" className={labelClass}>
            {t('org')} <span aria-hidden="true">*</span>
          </label>
          <Input
            id="org"
            type="text"
            autoComplete="organization"
            className={inputClass}
            aria-describedby={errors.org ? 'org-error' : undefined}
            aria-invalid={!!errors.org}
            {...register('org')}
          />
          {errors.org && (
            <p id="org-error" role="alert" className="mt-1 text-xs text-destructive">
              {t('orgRequired')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            {t('phone')}
          </label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            {...register('phone')}
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            {t('subject')} <span aria-hidden="true">*</span>
          </label>
          <select
            id="subject"
            {...register('subject')}
            className={selectClass}
          >
            {SUBJECT_VALUES.map((val) => (
              <option key={val} value={val}>
                {t(`subject${val.charAt(0).toUpperCase()}${val.slice(1)}` as Parameters<typeof t>[0])}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            {t('message')} <span aria-hidden="true">*</span>
          </label>
          <Textarea
            id="message"
            rows={5}
            placeholder={t('messagePlaceholder')}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
            className={
              isStitch
                ? 'min-h-32 resize-y rounded-t-lg rounded-b-none border-x-0 border-t-0 border-b-2 border-input bg-surface-container-low px-4 py-3 text-base focus-visible:border-secondary-container focus-visible:ring-0'
                : 'resize-y'
            }
            {...register('message')}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.message.message?.includes('20') ? t('messageTooShort') : t('messageRequired')}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            aria-invalid={!!errors.consent}
            className="mt-0.5 size-4 rounded border-input accent-primary"
            {...register('consent')}
          />
          <div>
            <label htmlFor="consent" className="text-sm text-muted-foreground">
              {t('consent')}{' '}
              <Link href="/datenschutz" className="underline hover:text-foreground">
                {tFooter('datenschutz')}
              </Link>
            </label>
            {errors.consent && (
              <p id="consent-error" role="alert" className="mt-1 text-xs text-destructive">
                {t('consentRequired')}
              </p>
            )}
          </div>
        </div>

        {isStitch ? (
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-glow group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            <span>{t('submit')}</span>
            {!isSubmitting && (
              <span
                className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                send
              </span>
            )}
          </button>
        ) : (
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
            {t('submit')}
          </Button>
        )}
      </div>
    </form>
  );
}
