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
    const { to, type, data, subscribe } = body;

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
      body { font-family: Georgia, serif; background-color: #F0EBF8; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
      .header { text-align: center; margin-bottom: 32px; }
      .logo { font-size: 24px; color: #2D2640; margin-bottom: 8px; }
      .section { margin-bottom: 32px; }
      .section-title { font-size: 18px; color: #2D2640; margin-bottom: 12px; }
      .content { color: #7B7394; line-height: 1.6; }
      .highlight { background-color: #E8DED4; padding: 20px; border-radius: 8px; margin: 16px 0; }
      .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E8DED4; color: #7B7394; font-size: 14px; }
      a { color: #2D2640; }
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
      case 'astrocartography':
        subject = 'Your Astrocartography Reading';
        html = generateTravelEmail(data, styles);
        break;
      case 'bazi':
        subject = 'Your BaZi Four Pillars Results';
        html = generateBaZiEmail(data, styles);
        break;
      case 'numerology':
        subject = 'Your Numerology Results';
        html = generateNumerologyEmail(data, styles);
        break;
      case 'human-design':
        subject = 'Your Human Design Results';
        html = generateHumanDesignEmail(data, styles);
        break;
      case 'feedback':
        subject = 'Feedback from The Lunar Playground';
        html = generateFeedbackEmail(data, styles);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    const result = await resend.emails.send({
      from: 'The Lunar Playground <noreply@thelunarplayground.com>',
      replyTo: 'thelunarplayground@gmail.com',
      to: [to],
      subject,
      html,
    });

    // Subscribe to audience if opted in
    if (subscribe) {
      const audienceId = process.env.RESEND_AUDIENCE_ID;
      if (audienceId) {
        try {
          await resend.contacts.create({
            email: to,
            audienceId,
            unsubscribed: false,
          });
        } catch (contactErr) {
          const msg = contactErr instanceof Error ? contactErr.message : '';
          if (!msg.includes('already') && !msg.includes('exists')) {
            console.error('Contact create error:', contactErr);
          }
        }
      }
    }

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
    body { font-family: Georgia, serif; background-color: #F0EBF8; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { font-size: 24px; color: #2D2640; margin-bottom: 8px; }
    .big-three { display: flex; justify-content: center; gap: 24px; margin: 24px 0; text-align: center; }
    .big-three-item { flex: 1; max-width: 120px; }
    .big-three-symbol { font-size: 24px; margin-bottom: 4px; }
    .big-three-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7B7394; }
    .big-three-sign { font-size: 14px; font-weight: 500; color: #2D2640; }
    .section { margin-bottom: 28px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #E8E4DE; }
    .section-icon { font-size: 18px; margin-right: 8px; }
    .section-title { font-size: 18px; color: #2D2640; margin-bottom: 12px; display: flex; align-items: center; }
    .section-subtitle { font-size: 14px; color: #7B7394; margin-bottom: 8px; font-style: italic; }
    .content { color: #4A4A4A; line-height: 1.7; font-size: 14px; }
    .highlight { background-color: #F5F0EB; padding: 20px; border-radius: 8px; margin: 16px 0; }
    .drives-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .drive-tag { background: #F0EBF8; padding: 6px 12px; border-radius: 16px; font-size: 12px; color: #2D2640; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E8DED4; color: #7B7394; font-size: 14px; }
    a { color: #2D2640; }
    .cta-button { display: inline-block; background: #2D2640; color: white !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px; }
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
          <p style="color: #7B7394; margin-top: 8px;">Your Birth Chart Report</p>
        </div>

        <!-- Big Three Summary -->
        <div class="highlight" style="text-align: center; padding: 24px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #7B7394; margin-bottom: 16px;">Your Operating System</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
            <tr>
              <td width="33%" style="text-align: center; padding: 8px;">
                <div style="font-size: 20px; margin-bottom: 4px;">☉</div>
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #7B7394;">Sun</div>
                <div style="font-size: 14px; font-weight: 500; color: #2D2640;">${data.sunSign?.name || '-'}</div>
              </td>
              <td width="33%" style="text-align: center; padding: 8px;">
                <div style="font-size: 20px; margin-bottom: 4px;">☽</div>
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #7B7394;">Moon</div>
                <div style="font-size: 14px; font-weight: 500; color: #2D2640;">${data.moonSign?.name || '-'}</div>
              </td>
              <td width="33%" style="text-align: center; padding: 8px;">
                <div style="font-size: 20px; margin-bottom: 4px;">↑</div>
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #7B7394;">Rising</div>
                <div style="font-size: 14px; font-weight: 500; color: #2D2640;">${data.risingSign?.name || '-'}</div>
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
            ${data.mercurySign ? `<tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Mercury (thinking)</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px;">${data.mercurySign.name}</td></tr>` : ''}
            ${data.venusSign ? `<tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Venus (connecting)</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px;">${data.venusSign.name}</td></tr>` : ''}
            ${data.marsSign ? `<tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Mars (acting)</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px;">${data.marsSign.name}</td></tr>` : ''}
            ${data.saturnSign ? `<tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Saturn (persisting)</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px;">${data.saturnSign.name}</td></tr>` : ''}
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
          <p style="color: #7B7394; font-size: 14px; margin-bottom: 16px;">
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
          <p style="color: #7B7394;">Your Compatibility Results</p>
        </div>

        <div class="highlight" style="text-align: center;">
          <div style="font-size: 24px; color: #2D2640; margin-bottom: 8px;">
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
          <p style="color: #7B7394;">Your Travel Destination</p>
        </div>

        <div class="highlight" style="text-align: center;">
          <div style="font-size: 24px; color: #2D2640; margin-bottom: 8px;">${data.destination?.name || 'Your Destination'}</div>
          <div style="color: #7B7394;">${data.destination?.country || ''}</div>
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

function generateBaZiEmail(data: any, styles: string): string {
  const elements = data.fiveElements || {};
  const elementRows = Object.entries(elements)
    .map(([el, pct]) => `<tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px; text-transform: capitalize;">${el}</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px;">${pct}%</td></tr>`)
    .join('');

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
          <p style="color: #7B7394; margin-top: 8px;">Your BaZi Four Pillars</p>
        </div>

        <div class="highlight" style="text-align: center; padding: 24px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #7B7394; margin-bottom: 8px;">Day Master</p>
          <p style="font-size: 22px; color: #2D2640; margin: 0 0 4px;">${data.dayMaster || '-'}</p>
          <p style="font-size: 14px; color: #7B7394; margin: 0;">${data.dayMasterYinYang || ''} ${data.dayMasterElement || ''}</p>
        </div>

        <div class="section">
          <div class="section-title">Five Elements Balance</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${elementRows}
          </table>
          <p style="margin-top: 12px; font-size: 13px; color: #7B7394;">
            Dominant: <strong style="color: #2D2640;">${data.dominantElement || '-'}</strong> &middot;
            Weakest: <strong style="color: #2D2640;">${data.weakestElement || '-'}</strong>
          </p>
        </div>

        ${data.strength ? `
        <div class="section">
          <div class="section-title">Chart Strength</div>
          <p class="content">${data.strength}</p>
        </div>
        ` : ''}

        ${data.favorableElements?.length ? `
        <div class="section">
          <div class="section-title">Favorable Elements</div>
          <p class="content">${data.favorableElements.join(', ')}</p>
        </div>
        ` : ''}

        ${data.luckyColors?.length ? `
        <div class="section">
          <div class="section-title">Lucky Colours & Directions</div>
          <p class="content">Colours: ${data.luckyColors.join(', ')}</p>
          ${data.luckyDirections?.length ? `<p class="content">Directions: ${data.luckyDirections.join(', ')}</p>` : ''}
          ${data.luckyNumbers?.length ? `<p class="content">Numbers: ${data.luckyNumbers.join(', ')}</p>` : ''}
        </div>
        ` : ''}

        ${data.pattern ? `
        <div class="section">
          <div class="section-title">Pattern</div>
          <p class="content">${data.pattern}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin: 32px 0;">
          <p style="color: #7B7394; font-size: 14px; margin-bottom: 16px;">
            Want a personalised interpretation of your Four Pillars with timing insights?
          </p>
          <a href="https://www.thelunarplayground.com/shop" style="display: inline-block; background: #2D2640; color: white !important; padding: 12px 24px; border-radius: 8px; text-decoration: none;">View Readings</a>
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

function generateNumerologyEmail(data: any, styles: string): string {
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
          <p style="color: #7B7394; margin-top: 8px;">Your Numerology Profile</p>
        </div>

        <div class="highlight" style="text-align: center; padding: 24px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #7B7394; margin-bottom: 8px;">Life Path Number</p>
          <p style="font-size: 36px; color: #2D2640; margin: 0;">${data.lifePathNumber || '-'}</p>
        </div>

        <div class="section">
          <div class="section-title">Your Numbers</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Life Path</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px; font-weight: 500;">${data.lifePathNumber || '-'}</td></tr>
            <tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Birthday Number</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px; font-weight: 500;">${data.birthdayNumber || '-'}</td></tr>
            <tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Talent Number</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px; font-weight: 500;">${data.talentNumber || '-'}</td></tr>
            <tr><td style="padding: 6px 0; color: #7B7394; font-size: 13px;">Year Number</td><td style="padding: 6px 0; text-align: right; color: #2D2640; font-size: 13px; font-weight: 500;">${data.yearNumber || '-'}</td></tr>
          </table>
        </div>

        ${data.innateNumbers?.length ? `
        <div class="section">
          <div class="section-title">Innate Numbers</div>
          <p class="content">${data.innateNumbers.join(', ')}</p>
        </div>
        ` : ''}

        ${data.missingNumbers?.length ? `
        <div class="section">
          <div class="section-title">Missing Numbers</div>
          <p class="content">${data.missingNumbers.join(', ')}</p>
          <p style="font-size: 13px; color: #7B7394; margin-top: 8px;">These represent areas for growth and development.</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin: 32px 0;">
          <p style="color: #7B7394; font-size: 14px; margin-bottom: 16px;">
            Explore how your numbers connect with your birth chart, BaZi, and Human Design.
          </p>
          <a href="https://www.thelunarplayground.com/shop" style="display: inline-block; background: #2D2640; color: white !important; padding: 12px 24px; border-radius: 8px; text-decoration: none;">View Readings</a>
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

function generateHumanDesignEmail(data: any, styles: string): string {
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
          <p style="color: #7B7394; margin-top: 8px;">Your Human Design</p>
        </div>

        <div class="highlight" style="text-align: center; padding: 24px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #7B7394; margin-bottom: 8px;">Your Type</p>
          <p style="font-size: 22px; color: #2D2640; margin: 0 0 12px;">${data.type || '-'}</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 auto; max-width: 300px;">
            <tr>
              <td style="text-align: center; padding: 4px;">
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #7B7394;">Strategy</div>
                <div style="font-size: 13px; color: #2D2640;">${data.strategy || '-'}</div>
              </td>
              <td style="text-align: center; padding: 4px;">
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #7B7394;">Authority</div>
                <div style="font-size: 13px; color: #2D2640;">${data.authority || '-'}</div>
              </td>
            </tr>
          </table>
        </div>

        <div class="section">
          <div class="section-title">Profile</div>
          <p class="content">${data.profile || '-'} &mdash; ${data.profileName || ''}</p>
        </div>

        ${data.incarnationCross ? `
        <div class="section">
          <div class="section-title">Incarnation Cross</div>
          <p class="content">${data.incarnationCross}</p>
        </div>
        ` : ''}

        ${data.definedCenters?.length ? `
        <div class="section">
          <div class="section-title">Defined Centres</div>
          <p class="content">${data.definedCenters.join(', ')}</p>
        </div>
        ` : ''}

        ${data.undefinedCenters?.length ? `
        <div class="section">
          <div class="section-title">Undefined Centres</div>
          <p class="content">${data.undefinedCenters.join(', ')}</p>
        </div>
        ` : ''}

        ${data.channels?.length ? `
        <div class="section">
          <div class="section-title">Active Channels</div>
          <p class="content">${data.channels.join(', ')}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin: 32px 0;">
          <p style="color: #7B7394; font-size: 14px; margin-bottom: 16px;">
            Want a personalised interpretation of your Human Design with practical guidance?
          </p>
          <a href="https://www.thelunarplayground.com/shop" style="display: inline-block; background: #2D2640; color: white !important; padding: 12px 24px; border-radius: 8px; text-decoration: none;">View Readings</a>
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

function generateFeedbackEmail(data: any, styles: string): string {
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
          <p style="color: #7B7394;">New Feedback</p>
        </div>

        <div class="highlight">
          <p class="content" style="white-space: pre-wrap;">${data.message || 'No message provided'}</p>
        </div>

        <div class="footer">
          <p style="font-size: 12px; color: #999;">Sent from the feedback widget</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
