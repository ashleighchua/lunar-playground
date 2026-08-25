/**
 * Natal Chart Reading automation — end-to-end test harness.
 *
 * Same shape as test-order.ts, for the natal-only tier: calls the same plain
 * functions orchestrate.ts's "use step" wrappers call directly, bypassing
 * Workflow DevKit's durability machinery.
 *
 * Two modes:
 *
 *   npx tsx scripts/relocation-report/test-natal-order.ts
 *     Dry run — NO LLM calls, NO email sent, NO real money spent. Writes the
 *     PDF to scripts/relocation-report/output/test-natal-order.pdf.
 *
 *   npx tsx scripts/relocation-report/test-natal-order.ts --live --email you@example.com
 *     Full run — REAL AI Gateway calls (real cost) and REAL email delivery
 *     via Resend to the given address.
 *
 * Usage: npx tsx scripts/relocation-report/test-natal-order.ts [--live] [--email <address>]
 */
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { buildFactsForOrder } from '../../src/lib/reportGeneration/buildFacts';
import { narrateOrder, type GeneratedProse } from '../../src/lib/reportGeneration/narrate';
import { assembleNatalReportContent } from '../../src/lib/reportGeneration/assemble';
import { renderNatalReportPdf } from '../../src/lib/reportGeneration/render/pdf';
import { uploadReportPdf } from '../../src/lib/reportGeneration/blob';
import { deliverReport } from '../../src/lib/reportGeneration/deliver';
import { SAMPLE_NATAL_ORDER_INPUT } from '../../src/lib/reportGeneration/orderInput';

function stubInsight(label: string) {
  return { pattern: `[stub ${label} pattern — dry run]`, watchFor: `[stub ${label} watch-for — dry run]`, practice: `[stub ${label} practice — dry run]` };
}

function stubProse(): GeneratedProse {
  return {
    identityIntro: '[stub natal chart intro — dry run]',
    // Natal-only tier only flatly describes Sun/Moon/Ascendant (Big Three)
    // and Uranus/Neptune/Pluto ("What Your Chart Shows") — see narrate.ts.
    perPlanetDescriptions: {
      Sun: '[stub Sun description — dry run]',
      Moon: '[stub Moon description — dry run]',
      Ascendant: '[stub Ascendant description — dry run]',
      Uranus: '[stub Uranus description — dry run]',
      Neptune: '[stub Neptune description — dry run]',
      Pluto: '[stub Pluto description — dry run]',
    },
    coreDrives: {
      Mercury: stubInsight('Mercury'),
      Venus: stubInsight('Venus'),
      Mars: stubInsight('Mars'),
      Saturn: stubInsight('Saturn'),
    },
    decisionMaking: stubInsight('Decision Making'),
    emotionalPattern: stubInsight('Emotional Pattern'),
    restRecharge: stubInsight('Rest & Recharge'),
    relationshipBlueprint: stubInsight('Relationship Blueprint'),
    workImpact: stubInsight('Work & Impact'),
    shadowGrowth: stubInsight('Shadow & Growth'),
    practicalTakeaways: {
      keyInsight: '[stub key insight — dry run]',
      leanInto: ['[stub lean-into 1]', '[stub lean-into 2]', '[stub lean-into 3]'],
      watchFor: ['[stub watch-for 1]', '[stub watch-for 2]', '[stub watch-for 3]'],
      reframe: '[stub reframe — dry run]',
      tryThis: '[stub try-this — dry run]',
      notice: '[stub notice — dry run]',
    },
    cities: {},
  };
}

async function main() {
  const args = process.argv.slice(2);
  const live = args.includes('--live');
  const emailIndex = args.indexOf('--email');
  const email = emailIndex !== -1 ? args[emailIndex + 1] : undefined;

  if (live && !email) {
    console.error('--live requires --email <address> (where to actually send the generated report).');
    process.exit(1);
  }

  console.log(`Mode: ${live ? 'LIVE (real AI + email spend)' : 'DRY RUN (stubbed prose, no cost)'}`);
  console.log(`Client: ${SAMPLE_NATAL_ORDER_INPUT.client} (${SAMPLE_NATAL_ORDER_INPUT.reportTier})\n`);

  console.log('Building facts...');
  const facts = await buildFactsForOrder(SAMPLE_NATAL_ORDER_INPUT);
  console.log(`  Sun ${facts.chart.sun.sign}, Moon ${facts.chart.moon.sign}${facts.chart.rising ? `, Rising ${facts.chart.rising.sign}` : ''}`);
  console.log(`  identityFacts: ${facts.identityFacts ? facts.identityFacts.facts.length + ' facts' : 'MISSING'}`);
  console.log(`  cities: ${facts.cities.length} (must be 0 for natal-only)`);
  console.log(`  rankingFacts keys: ${Object.keys(facts.rankingFacts).length} (must be 0 for natal-only)`);
  if (facts.cities.length !== 0 || Object.keys(facts.rankingFacts).length !== 0) {
    throw new Error('natal-only order unexpectedly computed relocation content — buildFacts.ts regression');
  }

  console.log(`\n${live ? 'Generating narrative (real LLM calls)...' : 'Stubbing narrative (no LLM calls)...'}`);
  const prose = live ? await narrateOrder(SAMPLE_NATAL_ORDER_INPUT, facts) : stubProse();

  console.log('\nAssembling report content...');
  const reportContent = assembleNatalReportContent({ input: SAMPLE_NATAL_ORDER_INPUT, facts, prose });
  console.log(`  Big Three: ${reportContent.natalChart.bigThree.map((b) => `${b.label} ${b.sign}`).join(', ')}`);
  console.log(`  "What Your Chart Shows" planets (should be outer planets only): ${reportContent.natalChart.planets.filter((p) => p.description).map((p) => p.planet).join(', ')}`);
  console.log(`  Core Drives cards: ${reportContent.coreDrives.map((c) => c.planet).join(', ')}`);
  console.log(`  Domain sections: Decision Making (${reportContent.decisionMaking.planet}), Emotional Pattern/Rest & Recharge/Relationship Blueprint (${reportContent.emotionalPattern.planet}), Work & Impact/Shadow & Growth (${reportContent.workImpact.planet})`);
  console.log(`  Practical Takeaways: ${reportContent.practicalTakeaways.leanInto.length} lean-into, ${reportContent.practicalTakeaways.watchFor.length} watch-for`);

  console.log('\nRendering PDF (real Puppeteer render, no cost)...');
  const pdfBytes = await renderNatalReportPdf(reportContent);
  console.log(`  ${pdfBytes.byteLength} bytes`);

  const outDir = path.join(__dirname, 'output');
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'test-natal-order.pdf');
  writeFileSync(outPath, pdfBytes);
  console.log(`  Written to ${outPath}`);

  if (live) {
    console.log('\nUploading to Blob...');
    // -1, not 0 — test-order.ts (the relocation-report harness) also
    // writes to reports/order-0.pdf; sharing that path caused an
    // "already exists" collision the first time this was live-tested.
    const blobUrl = await uploadReportPdf(-1, pdfBytes);
    console.log(`  ${blobUrl}`);

    console.log(`\nDelivering to ${email}...`);
    await deliverReport({
      customerEmail: email!,
      pdfBytes,
      productTitle: 'Natal Chart Reading',
      subscribeToMailingList: false, // test harness — never subscribe a real recipient
    });
    console.log('  Sent.');
  }

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
