import { z } from 'zod';

export const SUBJECT_VALUES = ['general', 'quote', 'partnership', 'other'] as const;
export type Subject = (typeof SUBJECT_VALUES)[number];

export const contactSchema = z.object({
  name: z.string().min(1),
  org: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.enum(SUBJECT_VALUES),
  message: z.string().min(20),
  consent: z.literal(true),
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
