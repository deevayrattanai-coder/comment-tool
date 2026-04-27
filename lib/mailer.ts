import 'server-only';
import nodemailer from 'nodemailer';

let _transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      'SMTP_HOST, SMTP_USER and SMTP_PASS must be set in environment variables'
    );
  }

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return _transporter;
}

export type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, html, text, replyTo }: SendMailArgs) {
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const fromName = process.env.MAIL_FROM_NAME || 'CommentCraft';
  const from = `"${fromName}" <${fromEmail}>`;

  const transporter = getTransporter();
  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]+>/g, ''),
    replyTo,
  });
}

export function buildVerificationEmail(name: string, link: string) {
  const safeName = name?.trim() || 'there';
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width:520px; margin:0 auto; padding:32px 24px; color:#0f172a;">
      <h2 style="margin:0 0 12px; font-size:22px;">Verify your email</h2>
      <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#334155;">
        Hi ${safeName}, thanks for signing up for CommentCraft. Please confirm your
        email address to activate your account.
      </p>
      <p style="margin:24px 0;">
        <a href="${link}"
           style="display:inline-block; background:#7c3aed; color:#ffffff; text-decoration:none; font-weight:600;
                  padding:12px 22px; border-radius:10px; font-size:14px;">
          Verify my email
        </a>
      </p>
      <p style="margin:0 0 8px; font-size:13px; color:#64748b;">
        Or paste this link into your browser:
      </p>
      <p style="margin:0 0 24px; font-size:12px; color:#475569; word-break:break-all;">${link}</p>
      <p style="margin:0; font-size:12px; color:#94a3b8;">
        This link expires in 24 hours. If you did not sign up, you can safely ignore this email.
      </p>
    </div>
  `;
  return html;
}

export function buildContactEmail(args: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = args;
  const safeMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width:560px; margin:0 auto; padding:24px;">
      <h2 style="margin:0 0 12px; font-size:20px;">New contact message</h2>
      <table style="width:100%; border-collapse:collapse; font-size:14px; color:#0f172a;">
        <tr><td style="padding:6px 0; color:#64748b; width:90px;">From</td><td>${name}</td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Email</td><td>${email}</td></tr>
        <tr><td style="padding:6px 0; color:#64748b;">Subject</td><td>${subject}</td></tr>
      </table>
      <hr style="border:none; border-top:1px solid #e2e8f0; margin:16px 0;" />
      <pre style="white-space:pre-wrap; font-family:inherit; font-size:14px; line-height:1.6; color:#0f172a; margin:0;">${safeMessage}</pre>
    </div>
  `;
}
