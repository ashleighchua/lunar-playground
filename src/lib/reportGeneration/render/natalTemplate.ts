/**
 * Natal Chart Reading — standalone HTML template.
 *
 * A document in its own right, not a variant of render/template.ts's
 * relocation report — no astrocartography framing, no cities, no planetary
 * lines. Reuses `CSS`, `esc`, `renderBirthChartOverview`, and
 * `renderChartShowsCards` from template.ts rather than duplicating them
 * (deliberately NOT `renderNatalChart`'s composed bridge-to-astrocartography
 * ordering, which doesn't fit this document). pdf.ts's shared two-pass
 * renderer prints this to PDF.
 *
 * Content is organized into the same 9 life-domain categories the free
 * interactive chart tool defines in src/lib/sectionConfig.ts (Operating
 * System = "Your Birth Chart" below, Core Drives, Decision Making,
 * Emotional Pattern, Rest & Recharge, Relationship Blueprint, Work &
 * Impact, Shadow & Growth, Practical Takeaways) — see the natal-chart-
 * automation plan for why: that content was real and well-written but
 * never actually delivered to a paying customer, and this reading now
 * delivers an AI-generated, full-chart-grounded (sign AND house) version of
 * it instead of the free tool's sign-only static lookup tables.
 */
import { CSS, esc, renderBirthChartOverview, renderChartShowsCards, type NatalChart, type Planet, type TocEntry } from './template';
import { getSectionConfig } from '../../sectionConfig';

/** Shared shape for every domain section below — see generateLifeAreaInsight.ts. */
export interface DomainInsightCard {
  planet: Planet;
  sign: string;
  house: number;
  pattern: string;
  watchFor: string;
  practice: string;
}

export interface PracticalTakeaways {
  keyInsight: string;
  leanInto: string[];
  watchFor: string[];
  reframe: string;
  tryThis: string;
  notice: string;
}

export interface NatalReportContent {
  client: string;
  monthYear: string;
  birth: { dateLabel: string; timeLabel: string; placeLabel: string };
  natalChart: NatalChart;
  coreDrives: DomainInsightCard[];
  decisionMaking: DomainInsightCard;
  emotionalPattern: DomainInsightCard;
  restRecharge: DomainInsightCard;
  relationshipBlueprint: DomainInsightCard;
  workImpact: DomainInsightCard;
  shadowGrowth: DomainInsightCard;
  practicalTakeaways: PracticalTakeaways;
  toc?: TocEntry[]; // omitted on the first (measurement) render pass
  closingMessage: string;
}

function sectionTitle(id: string, fallback: string): string {
  return getSectionConfig(id)?.title ?? fallback;
}

function sectionSubtitle(id: string): string {
  return getSectionConfig(id)?.subtitle ?? '';
}

/**
 * Titles used both as ToC entries and as the exact search strings pdf.ts's
 * page-number lookup searches for — keep identical to the actual heading
 * text rendered below, or the lookup will silently miss. Pulled from
 * sectionConfig.ts (the single source of truth also used to render each
 * section's heading below) so the two can't drift out of sync.
 */
export function buildNatalTocEntries(): TocEntry[] {
  return [
    { title: 'Introduction', page: null },
    { title: 'Your Birth Chart', page: null },
    { title: sectionTitle('core-drives', 'Your Core Drives'), page: null },
    { title: sectionTitle('decision-making', 'Decision Making'), page: null },
    { title: sectionTitle('emotional-pattern', 'Emotional Pattern'), page: null },
    { title: sectionTitle('rest-recharge', 'Rest & Recharge'), page: null },
    { title: sectionTitle('relationship-blueprint', 'Relationship Blueprint'), page: null },
    { title: sectionTitle('work-style', 'Work & Impact'), page: null },
    { title: sectionTitle('shadow-growth', 'Shadow & Growth'), page: null },
    { title: 'What Your Chart Shows', page: null, indent: true },
    { title: sectionTitle('takeaways', 'Practical Takeaways'), page: null },
  ];
}

function renderTocPage(toc: TocEntry[]): string {
  return `
<main class="page toc-section">
  <h2 class="section-title">Contents</h2>
  <div class="toc-list">
    ${toc
      .map(
        (e) => `<div class="toc-row ${e.indent ? 'toc-indent' : ''}">
      <span class="toc-title">${esc(e.title)}</span>
      <span class="toc-dots"></span>
      <span class="toc-pagenum">${e.page != null ? e.page : ''}</span>
    </div>`
      )
      .join('')}
  </div>
</main>`;
}

function renderDomainSection(sectionId: string, fallbackTitle: string, card: DomainInsightCard): string {
  return `
<main class="page page-break">
  <p class="part-eyebrow">${esc(sectionSubtitle(sectionId))}</p>
  <h2 class="section-title">${esc(sectionTitle(sectionId, fallbackTitle))}</h2>

  <div class="placement-box">
    <h3>${esc(card.planet).toUpperCase()} IN ${esc(card.sign).toUpperCase()} <span class="angle-tag">House ${card.house}</span></h3>
    <p>${esc(card.pattern)}</p>
  </div>

  <div class="glossary-box">
    <div class="glossary-title">Watch for</div>
    <p>${esc(card.watchFor)}</p>
  </div>

  <div class="what-to-do">
    <div class="what-to-do-label">In practice</div>
    <p>${esc(card.practice)}</p>
  </div>
</main>`;
}

function renderCoreDrives(cards: DomainInsightCard[]): string {
  return `
<main class="page page-break">
  <p class="part-eyebrow">${esc(sectionSubtitle('core-drives'))}</p>
  <h2 class="section-title">${esc(sectionTitle('core-drives', 'Your Core Drives'))}</h2>

  <div style="display:flex;flex-wrap:wrap;gap:16px;">
    ${cards
      .map(
        (c) => `<div class="placement-box" style="flex:1 1 45%;min-width:220px;">
      <h3>${esc(c.planet).toUpperCase()} IN ${esc(c.sign).toUpperCase()} <span class="angle-tag">House ${c.house}</span></h3>
      <p>${esc(c.pattern)}</p>
      <p style="font-size:9.5pt;color:#888;font-style:italic;">Watch for: ${esc(c.watchFor)}</p>
      <div class="what-to-do">
        <div class="what-to-do-label">In practice</div>
        <p>${esc(c.practice)}</p>
      </div>
    </div>`
      )
      .join('')}
  </div>
</main>`;
}

function renderPracticalTakeaways(t: PracticalTakeaways): string {
  return `
<main class="page page-break">
  <p class="part-eyebrow">${esc(sectionSubtitle('takeaways'))}</p>
  <h2 class="section-title">${esc(sectionTitle('takeaways', 'Practical Takeaways'))}</h2>

  <div class="glossary-box">
    <div class="glossary-title">Key insight</div>
    <p>${esc(t.keyInsight)}</p>
  </div>

  <div class="rc-row">
    <div class="rc-box">
      <div class="rc-label">Lean into</div>
      ${t.leanInto.map((item) => `<p>&middot; ${esc(item)}</p>`).join('')}
    </div>
    <div class="rc-box">
      <div class="rc-label">Watch for</div>
      ${t.watchFor.map((item) => `<p>&middot; ${esc(item)}</p>`).join('')}
    </div>
  </div>

  <div class="combined-energy">
    <div class="combined-label">One practical reframe</div>
    <p>${esc(t.reframe)}</p>
  </div>

  <div class="what-to-do">
    <div class="what-to-do-label">This week</div>
    <p><strong>Try:</strong> ${esc(t.tryThis)}</p>
    <p><strong>Notice:</strong> ${esc(t.notice)}</p>
  </div>

  <p class="closing-italic">Let the astrology inform you. Let your instincts decide.</p>

  <div class="deeper-box">
    <div class="deeper-label">Want to go deeper?</div>
    <p>A <strong>Relocation Report</strong> maps this exact chart across the globe, revealing which cities amplify your career, your relationships, and your growth. If you're weighing a move, it shows you where these same placements come alive most strongly.</p>
  </div>
</main>`;
}

export function renderNatalReportHtml(content: NatalReportContent): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Natal Chart Reading | The Lunar Playground</title>
<style>
${CSS}
</style>
</head>
<body>

<div class="cover-page">
  <div class="cover-blob blob-1"></div>
  <div class="cover-blob blob-2"></div>
  <div class="cover-blob blob-3"></div>
  <div class="cover-blob blob-4"></div>
  <div class="cover-noise"></div>
  <div class="cover-inner">
    <div class="cover-rule"></div>
    <img class="cover-logo" src="LOGO_SRC" alt="">
    <h1 class="cover-title">NATAL CHART<br>READING</h1>
    <p class="cover-month">${esc(content.monthYear)}</p>
    <p class="cover-for">PREPARED FOR ${esc(content.client).toUpperCase()}</p>
    <p class="cover-url">WWW.THELUNARPLAYGROUND.COM</p>
  </div>
</div>

${content.toc ? renderTocPage(content.toc) : ''}

<main class="page page-break">
  <h2 class="section-title">Introduction</h2>
  <p class="intro-lead">Thank you for your request and welcome to <em>The Lunar Playground</em>. This is your Natal Chart Reading, a look at who you are according to the exact placement of the sky at the moment you were born: your core drives, your emotional instincts, and the patterns that shape how you move through the world.</p>
  <p>Your placements are calculated using Swiss Ephemeris, the same tool professional astrologers rely on, with every line checked against your real chart before it reaches you.</p>

  <div class="client-info">
    <p><strong>Client:</strong> ${esc(content.client)}</p>
    <p><strong>Date of Birth:</strong> ${esc(content.birth.dateLabel)}</p>
    <p><strong>Time:</strong> ${esc(content.birth.timeLabel)}</p>
    <p><strong>Place of Birth:</strong> ${esc(content.birth.placeLabel)}</p>
  </div>
</main>

${renderBirthChartOverview(content.natalChart)}

${renderCoreDrives(content.coreDrives)}

${renderDomainSection('decision-making', 'Decision Making', content.decisionMaking)}

${renderDomainSection('emotional-pattern', 'Emotional Pattern', content.emotionalPattern)}

${renderDomainSection('rest-recharge', 'Rest & Recharge', content.restRecharge)}

${renderDomainSection('relationship-blueprint', 'Relationship Blueprint', content.relationshipBlueprint)}

${renderDomainSection('work-style', 'Work & Impact', content.workImpact)}

${renderDomainSection('shadow-growth', 'Shadow & Growth', content.shadowGrowth)}

${renderChartShowsCards(content.natalChart)}

${renderPracticalTakeaways(content.practicalTakeaways)}

<main class="page page-break closing-page">
  <p class="closing-message">${esc(content.closingMessage)}</p>
  <p class="signature-text">With warmth and cosmic guidance,</p>
  <p class="signature-name">Ashleigh @ The Lunar Playground</p>

  <hr class="about-rule">

  <div class="about-box">
    <div class="about-label">About The Lunar Playground</div>
    <p>I'm Ashleigh, an intuitive astrologer drawn to the spaces where energy, place, and purpose meet. My path has been shaped by years of meditation, a deep love of psychology, and a lifelong curiosity about how the stars mirror our inner world. Astrology, for me, isn't about prediction. It's about remembering who we are. Through birth chart and astrocartography readings, I help you tune into the places and patterns that bring you back to yourself. My work is rooted in mindfulness, compassion, and the quiet magic that unfolds when we align with our own rhythm.</p>
  </div>
</main>

<div class="promo-page">
  <div class="cover-blob blob-1"></div>
  <div class="cover-blob blob-2"></div>
  <div class="cover-blob blob-3"></div>
  <div class="promo-card">
    <img class="promo-logo" src="LOGO_SRC" alt="">
    <h2 class="promo-title">Ready for your next reading?</h2>
    <div class="promo-code">LUNAR20</div>
    <p class="promo-sub">20% off your next reading</p>
    <p class="promo-url">www.thelunarplayground.com</p>
    <p class="promo-share">Share this code with friends — they'll get 20% off too.</p>
  </div>
</div>

</body>
</html>`;
}
