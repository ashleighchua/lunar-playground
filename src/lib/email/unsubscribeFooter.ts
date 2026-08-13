import { createHmac } from 'crypto';

export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Fails closed (empty string) when UNSUBSCRIBE_SECRET isn't set, rather than sending an unsigned/forgeable link. */
export function unsubscribeFooter(email: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) return '';
  const encoded = Buffer.from(email).toString('base64url');
  const sig = createHmac('sha256', secret).update(email).digest('base64url');
  return `<p style="color: #9E98AD; font-size: 11px; text-align: center; margin: 24px 0 0;">
    You're on my occasional updates list. <a href="https://www.thelunarplayground.com/api/unsubscribe?e=${encoded}&s=${sig}" style="color: #9E98AD;">Unsubscribe</a>
  </p>`;
}
