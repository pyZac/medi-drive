import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_INBOX: z.email(),
  CONTACT_FROM: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

// Validate at call time (not module init) so the build doesn't fail without .env.local
export function getEnv(): Env {
  return envSchema.parse(process.env);
}
