import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/schemas/contact';
import { getEnv } from '@/lib/env';
import { rateLimit } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const env = getEnv();
  const resend = new Resend(env.RESEND_API_KEY);

  const subjectLabel =
    data.subject.charAt(0).toUpperCase() + data.subject.slice(1);

  const html = `
    <h2>New contact form submission — LabLink</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><th align="left">Name</th><td>${escapeHtml(data.name)}</td></tr>
      <tr><th align="left">Organisation</th><td>${escapeHtml(data.org)}</td></tr>
      <tr><th align="left">Email</th><td>${escapeHtml(data.email)}</td></tr>
      <tr><th align="left">Phone</th><td>${data.phone ? escapeHtml(data.phone) : '—'}</td></tr>
      <tr><th align="left">Subject</th><td>${escapeHtml(subjectLabel)}</td></tr>
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM,
    to: env.CONTACT_INBOX,
    replyTo: data.email,
    subject: `[LabLink] ${subjectLabel} — ${data.name}`,
    html,
  });

  if (error) {
    console.error('[contact route] Resend error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
