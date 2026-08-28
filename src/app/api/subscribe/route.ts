import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { email, tags } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store in Resend Contacts
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        const contactResult = await resend.contacts.create({
          email,
          audienceId,
          unsubscribed: false,
        });
        // resend.contacts.create() resolves with { data: null, error } on an
        // API-level failure (e.g. a bad audience id) rather than throwing —
        // an unchecked result here silently drops the signup from the list.
        if (contactResult.error) {
          const msg = contactResult.error.message || '';
          if (!msg.includes('already') && !msg.includes('exists')) {
            console.error('Contact create error:', contactResult.error);
          }
        }
      } catch (contactErr) {
        // Resend throws if contact already exists — that's fine
        const msg = contactErr instanceof Error ? contactErr.message : '';
        if (!msg.includes('already') && !msg.includes('exists')) {
          console.error('Contact create error:', contactErr);
        }
      }
    }

    // Send welcome email (non-blocking, don't fail the gate if email fails)
    try {
      await resend.emails.send({
        from: 'The Lunar Playground <noreply@thelunarplayground.resend.dev>',
        replyTo: 'thelunarplayground@gmail.com',
        to: [email],
        subject: 'Welcome to The Lunar Playground',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #F0EBF8; font-family: Georgia, 'Times New Roman', serif;">
            <div style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">

              <!-- Star -->
              <div style="text-align: center; font-size: 20px; color: #8A8099; margin-bottom: 24px;">&#10022;</div>

              <!-- Title -->
              <div style="text-align: center; margin-bottom: 8px;">
                <div style="font-size: 26px; color: #2D2640; letter-spacing: 0.5px;">The Lunar Playground</div>
              </div>

              <!-- Moon divider -->
              <div style="text-align: center; color: #8A8099; font-size: 14px; letter-spacing: 6px; margin-bottom: 36px;">
                &#9789; &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212; &#9790;
              </div>

              <!-- Welcome copy -->
              <p style="color: #2D2640; font-size: 17px; line-height: 1.8; text-align: center; margin: 0 0 20px;">
                Welcome to the playground.
              </p>
              <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 20px;">
                You're on the list. I'll share occasional notes, new tools, and things I'm learning as I blend Eastern and Western systems.
              </p>
              <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 32px;">
                In the meantime, here's what's waiting for you...
              </p>

              <!-- Systems list -->
              <div style="text-align: center; margin: 0 0 36px;">
                <p style="color: #2D2640; font-size: 14px; line-height: 2.2; margin: 0;">
                  <span style="color: #8A8099;">&#10023;</span> Western Astrology<br>
                  <span style="color: #8A8099;">&#10023;</span> Chinese Zodiac<br>
                  <span style="color: #8A8099;">&#10023;</span> BaZi (Four Pillars)<br>
                  <span style="color: #8A8099;">&#10023;</span> Numerology<br>
                  <span style="color: #8A8099;">&#10023;</span> Human Design<br>
                  <span style="color: #8A8099;">&#10023;</span> Astrocartography
                </p>
              </div>

              <!-- Readings CTA -->
              <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 24px;">
                When you're ready to go deeper, personalised readings are available. Both are calculated with Swiss Ephemeris and written by AI trained to stay true to your chart.
              </p>

              <div style="text-align: center; margin-bottom: 40px;">
                <a href="https://www.thelunarplayground.com/shop" style="display: inline-block; padding: 14px 36px; background-color: #FF8FA3; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-family: Georgia, serif; letter-spacing: 0.5px;">
                  Explore Readings
                </a>
              </div>

              <!-- Footer divider -->
              <div style="text-align: center; color: #8A8099; font-size: 14px; letter-spacing: 6px; margin-bottom: 24px;">
                &#8212;&#8212;&#8212;&#8212;&#8212; &#10022; &#8212;&#8212;&#8212;&#8212;&#8212;
              </div>

              <!-- Footer -->
              <div style="text-align: center;">
                <p style="color: #655E78; font-size: 13px; font-style: italic; margin: 0 0 12px;">
                  "A playground, not a prophecy."
                </p>
                <p style="color: #2D2640; font-size: 14px; margin: 0 0 4px;">The Lunar Playground</p>
                <p style="color: #655E78; font-size: 12px; margin: 0 0 12px;">Multiple systems. One full picture.</p>
                <a href="https://www.thelunarplayground.com" style="color: #655E78; font-size: 12px; text-decoration: none;">
                  www.thelunarplayground.com
                </a>
              </div>

            </div>
          </body>
          </html>
        `,
      });
    } catch (emailErr) {
      console.error('Welcome email failed (gate still unlocks):', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
