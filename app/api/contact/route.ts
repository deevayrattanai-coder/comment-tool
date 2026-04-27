import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail, buildContactEmail } from '@/lib/mailer';

const Body = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const data = Body.parse(await req.json());

    const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_FROM || process.env.SMTP_USER;
    if (!to) {
      return NextResponse.json(
        { error: 'CONTACT_TO_EMAIL is not configured' },
        { status: 500 }
      );
    }

    await sendMail({
      to,
      subject: `[Contact] ${data.subject}`,
      html: buildContactEmail(data),
      replyTo: data.email,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.issues) {
      return NextResponse.json({ error: 'Invalid input', details: e.issues }, { status: 400 });
    }
    console.error('contact form error', e);
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
