import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check for API key first
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { to, type, data } = body;

    if (!to || !type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let subject = '';
    let html = '';

    // Base styles for email
    const styles = `
      body { font-family: Georgia, serif; background-color: #FAF7F2; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
      .header { text-align: center; margin-bottom: 32px; }
      .logo { font-size: 24px; color: #2A2A2A; margin-bottom: 8px; }
      .section { margin-bottom: 32px; }
      .section-title { font-size: 18px; color: #2A2A2A; margin-bottom: 12px; }
      .content { color: #6B6B6B; line-height: 1.6; }
      .highlight { background-color: #E8DED4; padding: 20px; border-radius: 8px; margin: 16px 0; }
      .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E8DED4; color: #6B6B6B; font-size: 14px; }
      a { color: #2A2A2A; }
    `;

    switch (type) {
      case 'your-chart':
        subject = 'Your Lunar Chart Results';
        html = generateChartEmail(data, styles);
        break;
      case 'compatibility':
        subject = 'Your Compatibility Results';
        html = generateCompatibilityEmail(data, styles);
        break;
      case 'travel':
        subject = 'Your Travel Destination';
        html = generateTravelEmail(data, styles);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    const result = await resend.emails.send({
      from: 'The Lunar Playground <hello@thelunarplayground.com>',
      to: [to],
      subject,
      html,
    });

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error('Email send error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

function generateChartEmail(data: any, styles: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">The Lunar Playground</div>
          <p style="color: #6B6B6B;">Your Lunar Chart</p>
        </div>

        <div class="highlight" style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 8px;">${data.birthMoon?.emoji || '🌙'}</div>
          <div style="font-size: 20px; color: #2A2A2A; margin-bottom: 4px;">${data.birthMoon?.name || 'Moon Phase'}</div>
          <div style="color: #6B6B6B;">${data.birthMoon?.illumination || 0}% illuminated</div>
        </div>

        ${data.birthMoon?.description ? `
        <div class="section">
          <div class="section-title">Your Birth Moon</div>
          <p class="content">${data.birthMoon.description}</p>
        </div>
        ` : ''}

        ${data.sunSign ? `
        <div class="section">
          <div class="section-title">Sun Sign: ${data.sunSign.name}</div>
          <p class="content">${data.sunSign.description || ''}</p>
        </div>
        ` : ''}

        ${data.moonSign ? `
        <div class="section">
          <div class="section-title">Moon Sign: ${data.moonSign.name}</div>
          <p class="content">${data.moonSign.description || ''}</p>
        </div>
        ` : ''}

        ${data.risingSign ? `
        <div class="section">
          <div class="section-title">Rising Sign: ${data.risingSign.name}</div>
          <p class="content">${data.risingSign.description || ''}</p>
        </div>
        ` : ''}

        ${data.chineseZodiac ? `
        <div class="section">
          <div class="section-title">Chinese Zodiac: ${data.chineseZodiac.animal}</div>
          <p class="content">${data.chineseZodiac.description || ''}</p>
        </div>
        ` : ''}

        ${data.lifePath ? `
        <div class="section">
          <div class="section-title">Life Path Number: ${data.lifePath.number}</div>
          <p class="content">${data.lifePath.description || ''}</p>
        </div>
        ` : ''}

        <div class="footer">
          <p>The Lunar Playground</p>
          <p><a href="https://www.thelunarplayground.com">www.thelunarplayground.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateCompatibilityEmail(data: any, styles: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">The Lunar Playground</div>
          <p style="color: #6B6B6B;">Your Compatibility Results</p>
        </div>

        <div class="highlight" style="text-align: center;">
          <div style="font-size: 24px; color: #2A2A2A; margin-bottom: 8px;">
            ${data.person1?.name || 'Person 1'} & ${data.person2?.name || 'Person 2'}
          </div>
          <div style="font-size: 36px; margin: 16px 0;">
            ${data.person1?.moonEmoji || '🌙'} + ${data.person2?.moonEmoji || '🌙'}
          </div>
        </div>

        ${data.moonCompatibility ? `
        <div class="section">
          <div class="section-title">Moon Phase Compatibility</div>
          <p class="content">${data.moonCompatibility}</p>
        </div>
        ` : ''}

        ${data.elementCompatibility ? `
        <div class="section">
          <div class="section-title">Elemental Harmony</div>
          <p class="content">${data.elementCompatibility}</p>
        </div>
        ` : ''}

        ${data.overallReading ? `
        <div class="section">
          <div class="section-title">Your Connection</div>
          <p class="content">${data.overallReading}</p>
        </div>
        ` : ''}

        <div class="footer">
          <p>The Lunar Playground</p>
          <p><a href="https://www.thelunarplayground.com">www.thelunarplayground.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateTravelEmail(data: any, styles: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">The Lunar Playground</div>
          <p style="color: #6B6B6B;">Your Travel Destination</p>
        </div>

        <div class="highlight" style="text-align: center;">
          <div style="font-size: 24px; color: #2A2A2A; margin-bottom: 8px;">${data.destination?.name || 'Your Destination'}</div>
          <div style="color: #6B6B6B;">${data.destination?.country || ''}</div>
        </div>

        ${data.category ? `
        <div class="section">
          <div class="section-title">${data.category.title || 'Your Journey'}</div>
          <p class="content">${data.category.description || ''}</p>
        </div>
        ` : ''}

        ${data.destination?.description ? `
        <div class="section">
          <div class="section-title">About ${data.destination.name}</div>
          <p class="content">${data.destination.description}</p>
        </div>
        ` : ''}

        ${data.planetaryInfluence ? `
        <div class="section">
          <div class="section-title">Planetary Influence</div>
          <p class="content">${data.planetaryInfluence}</p>
        </div>
        ` : ''}

        <div class="footer">
          <p>The Lunar Playground</p>
          <p><a href="https://www.thelunarplayground.com">www.thelunarplayground.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
