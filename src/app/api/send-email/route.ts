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
  const enhancedStyles = `
    body { font-family: Georgia, serif; background-color: #FAF7F2; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 24px; color: #2A2A2A; margin-bottom: 8px; }
    .big-three { display: flex; justify-content: center; gap: 24px; margin: 24px 0; text-align: center; }
    .big-three-item { flex: 1; max-width: 120px; }
    .big-three-symbol { font-size: 24px; margin-bottom: 4px; }
    .big-three-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B; }
    .big-three-sign { font-size: 14px; font-weight: 500; color: #2A2A2A; }
    .section { margin-bottom: 28px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #E8E4DE; }
    .section-icon { font-size: 18px; margin-right: 8px; }
    .section-title { font-size: 18px; color: #2A2A2A; margin-bottom: 12px; display: flex; align-items: center; }
    .section-subtitle { font-size: 14px; color: #6B6B6B; margin-bottom: 8px; font-style: italic; }
    .content { color: #4A4A4A; line-height: 1.7; font-size: 14px; }
    .highlight { background-color: #F5F0EB; padding: 20px; border-radius: 8px; margin: 16px 0; }
    .drives-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .drive-tag { background: #FAF7F2; padding: 6px 12px; border-radius: 16px; font-size: 12px; color: #2A2A2A; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E8DED4; color: #6B6B6B; font-size: 14px; }
    a { color: #2A2A2A; }
    .cta-button { display: inline-block; background: #2A2A2A; color: white !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px; }
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${enhancedStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">The Lunar Playground</div>
          <p style="color: #6B6B6B; margin-top: 8px;">Your Birth Chart Report</p>
        </div>

        <!-- Big Three Summary -->
        <div class="highlight" style="text-align: center; padding: 24px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #6B6B6B; margin-bottom: 16px;">Your Operating System</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
            <tr>
              <td width="33%" style="text-align: center; padding: 8px;">
                <div style="font-size: 20px; margin-bottom: 4px;">☉</div>
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B;">Sun</div>
                <div style="font-size: 14px; font-weight: 500; color: #2A2A2A;">${data.sunSign?.name || '—'}</div>
              </td>
              <td width="33%" style="text-align: center; padding: 8px;">
                <div style="font-size: 20px; margin-bottom: 4px;">☽</div>
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B;">Moon</div>
                <div style="font-size: 14px; font-weight: 500; color: #2A2A2A;">${data.moonSign?.name || '—'}</div>
              </td>
              <td width="33%" style="text-align: center; padding: 8px;">
                <div style="font-size: 20px; margin-bottom: 4px;">↑</div>
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6B6B;">Rising</div>
                <div style="font-size: 14px; font-weight: 500; color: #2A2A2A;">${data.risingSign?.name || '—'}</div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Core Drives -->
        ${(data.mercurySign || data.venusSign || data.marsSign || data.saturnSign) ? `
        <div class="section">
          <div class="section-title"><span class="section-icon">☿</span> Core Drives</div>
          <p class="section-subtitle">How you think, connect, act, and persist</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 12px;">
            ${data.mercurySign ? `<tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 13px;">Mercury (thinking)</td><td style="padding: 6px 0; text-align: right; color: #2A2A2A; font-size: 13px;">${data.mercurySign.name}</td></tr>` : ''}
            ${data.venusSign ? `<tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 13px;">Venus (connecting)</td><td style="padding: 6px 0; text-align: right; color: #2A2A2A; font-size: 13px;">${data.venusSign.name}</td></tr>` : ''}
            ${data.marsSign ? `<tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 13px;">Mars (acting)</td><td style="padding: 6px 0; text-align: right; color: #2A2A2A; font-size: 13px;">${data.marsSign.name}</td></tr>` : ''}
            ${data.saturnSign ? `<tr><td style="padding: 6px 0; color: #6B6B6B; font-size: 13px;">Saturn (persisting)</td><td style="padding: 6px 0; text-align: right; color: #2A2A2A; font-size: 13px;">${data.saturnSign.name}</td></tr>` : ''}
          </table>
        </div>
        ` : ''}

        <!-- Sun Sign -->
        ${data.sunSign?.description ? `
        <div class="section">
          <div class="section-title"><span class="section-icon">☉</span> Sun in ${data.sunSign.name}</div>
          <p class="section-subtitle">Your core identity and direction</p>
          <p class="content">${data.sunSign.description}</p>
        </div>
        ` : ''}

        <!-- Moon Sign -->
        ${data.moonSign?.description ? `
        <div class="section">
          <div class="section-title"><span class="section-icon">☽</span> Moon in ${data.moonSign.name}</div>
          <p class="section-subtitle">Your emotional nature and inner world</p>
          <p class="content">${data.moonSign.description}</p>
        </div>
        ` : ''}

        <!-- Rising Sign -->
        ${data.risingSign?.description ? `
        <div class="section">
          <div class="section-title"><span class="section-icon">↑</span> Rising in ${data.risingSign.name}</div>
          <p class="section-subtitle">How you meet the world</p>
          <p class="content">${data.risingSign.description}</p>
        </div>
        ` : ''}

        <!-- Birth Moon Phase -->
        ${data.birthMoon ? `
        <div class="section">
          <div class="section-title"><span class="section-icon">${data.birthMoon.emoji}</span> Birth Moon: ${data.birthMoon.name}</div>
          <p class="section-subtitle">${data.birthMoon.illumination}% illuminated</p>
          ${data.birthMoon.description ? `<p class="content">${data.birthMoon.description}</p>` : ''}
        </div>
        ` : ''}

        <!-- View Full Report CTA -->
        <div style="text-align: center; margin: 32px 0;">
          <p style="color: #6B6B6B; font-size: 14px; margin-bottom: 16px;">
            This is a summary of your birth chart. Your full report includes detailed sections on emotional patterns, relationships, work style, shadow & growth, and practical takeaways.
          </p>
          <a href="https://www.thelunarplayground.com/birth-report" class="cta-button">View Full Report</a>
        </div>

        <div class="footer">
          <p style="margin-bottom: 8px;">The Lunar Playground</p>
          <p style="font-size: 12px; color: #8B8B8B;">A playground, not a prophecy.</p>
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
