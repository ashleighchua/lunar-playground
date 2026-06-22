import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createHmac, timingSafeEqual } from 'crypto';

export async function GET(request: NextRequest) {
  const encoded = request.nextUrl.searchParams.get('e');
  const sig = request.nextUrl.searchParams.get('s');
  if (!encoded || !sig) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  let email: string;
  try {
    email = Buffer.from(encoded, 'base64url').toString('utf-8');
    if (!email.includes('@')) throw new Error('invalid');
  } catch {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Verify HMAC signature to prevent forged unsubscribe requests
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) {
    console.error('UNSUBSCRIBE_SECRET not configured');
    return NextResponse.redirect(new URL('/', request.url));
  }
  const expected = createHmac('sha256', secret).update(email).digest('base64url');
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY!);
      const contacts = await resend.contacts.list({ audienceId });
      const contact = contacts.data?.data?.find((c: { email: string }) => c.email === email);
      if (contact) {
        await resend.contacts.update({ id: contact.id, audienceId, unsubscribed: true });
      }
    } catch (err) {
      console.error('Unsubscribe error:', err);
    }
  }

  return new NextResponse(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Unsubscribed</title>
    <style>body{font-family:Georgia,serif;background:#F0EBF8;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
    .box{text-align:center;color:#2D2640;max-width:400px;padding:48px 24px;}
    p{color:#655E78;font-size:15px;line-height:1.8;}</style></head>
    <body><div class="box"><div style="font-size:32px;margin-bottom:16px;">✦</div>
    <h1 style="font-size:24px;margin:0 0 16px;">You're unsubscribed.</h1>
    <p>You won't receive any more updates from The Lunar Playground.</p>
    <p style="margin-top:24px;font-size:13px;">Changed your mind? Reply to any email to get back in touch.</p>
    </div></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
