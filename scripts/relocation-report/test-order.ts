/**
 * Phase 6 end-to-end test harness.
 *
 * Calls the same plain functions orchestrate.ts's "use step" wrappers call
 * (buildFactsForOrder, narrateOrder, assembleReportContent, renderReportPdf,
 * uploadReportPdf, deliverReport) directly, bypassing Workflow DevKit's
 * durability machinery entirely — a faster, server-less dry run that proves
 * the actual business logic (facts, grounding, PDF rendering, delivery)
 * works, rather than re-testing the framework's own retry/replay behavior.
 *
 * Two modes:
 *
 *   npx tsx scripts/relocation-report/test-order.ts
 *     Dry run — NO LLM calls, NO email sent, NO real money spent. Narration
 *     is stubbed with placeholder prose so the deterministic half of the
 *     pipeline (facts -> assemble -> render -> local PDF) can be verified
 *     for free, as often as needed. Writes the PDF to
 *     scripts/relocation-report/output/test-order.pdf.
 *
 *   npx tsx scripts/relocation-report/test-order.ts --live --email you@example.com
 *     Full run — REAL AI Gateway calls (real cost) and REAL email delivery
 *     via Resend to the given address. Only pass --live once you actually
 *     mean to spend money and send a real email; there is no further
 *     confirmation prompt in this script.
 *
 * Usage: npx tsx scripts/relocation-report/test-order.ts [--live] [--email <address>]
 */
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { buildFactsForOrder } from '../../src/lib/reportGeneration/buildFacts';
import { narrateOrder, type GeneratedProse } from '../../src/lib/reportGeneration/narrate';
import { assembleReportContent } from '../../src/lib/reportGeneration/assemble';
import { renderReportPdf } from '../../src/lib/reportGeneration/render/pdf';
import { uploadReportPdf } from '../../src/lib/reportGeneration/blob';
import { deliverReport } from '../../src/lib/reportGeneration/deliver';
import { SAMPLE_ORDER_INPUT } from '../../src/lib/reportGeneration/orderInput';

function stubProse(facts: Awaited<ReturnType<typeof buildFactsForOrder>>): GeneratedProse {
  const cities: GeneratedProse['cities'] = {};
  for (const city of facts.cities) {
    cities[city.name] = {
      synthesis: {
        nickname: `[stub nickname for ${city.name}]`,
        tagline: `[stub tagline for ${city.name}]`,
        intro: `[stub intro for ${city.name} — dry run, no LLM call made]`,
        combinedEnergy: [`[stub combined-energy paragraph for ${city.name}]`],
        bottomLine: `[stub bottom line for ${city.name}]`,
        forRomance: null,
        forCareer: null,
      },
      placements: city.lineActivations.map((_, i) => ({
        activationIndex: i,
        placement: { body: '[stub placement body — dry run]', whatToDo: '[stub what-to-do — dry run]', reflect: '[stub reflect — dry run]' },
      })),
    };
  }
  return {
    identityIntro: facts.identityFacts ? '[stub natal chart intro — dry run]' : undefined,
    perPlanetDescriptions: facts.perPlanetIdentityFacts
      ? Object.fromEntries(
          facts.perPlanetIdentityFacts.map((p) => {
            const fact = p.facts[0];
            const label = fact.type === 'planet-placement' ? fact.planet : 'Ascendant';
            return [label, `[stub description for ${label} — dry run]`];
          })
        )
      : undefined,
    cities,
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
  console.log(`Client: ${SAMPLE_ORDER_INPUT.client} (${SAMPLE_ORDER_INPUT.reportTier})`);
  console.log(`Destinations: ${SAMPLE_ORDER_INPUT.destinationCities?.map((c) => c.name).join(', ')}\n`);

  console.log('Building facts...');
  const facts = await buildFactsForOrder(SAMPLE_ORDER_INPUT);
  console.log(`  Sun ${facts.chart.sun.sign}, Moon ${facts.chart.moon.sign}${facts.chart.rising ? `, Rising ${facts.chart.rising.sign}` : ''}`);
  for (const city of facts.cities) {
    console.log(`  ${city.name}: ${city.lineActivations.length} line activations within range`);
  }

  console.log(`\n${live ? 'Generating narrative (real LLM calls)...' : 'Stubbing narrative (no LLM calls)...'}`);
  const prose = live ? await narrateOrder(SAMPLE_ORDER_INPUT, facts) : stubProse(facts);

  console.log('\nAssembling report content...');
  const reportContent = assembleReportContent({ input: SAMPLE_ORDER_INPUT, facts, prose });
  console.log(`  ${reportContent.cities.length} city sections, ${reportContent.cities.reduce((n, c) => n + c.placements.length, 0)} placement boxes`);

  console.log('\nRendering PDF (real Puppeteer render, no cost)...');
  const pdfBytes = await renderReportPdf(reportContent);
  console.log(`  ${pdfBytes.byteLength} bytes`);

  const outDir = path.join(__dirname, 'output');
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'test-order.pdf');
  writeFileSync(outPath, pdfBytes);
  console.log(`  Written to ${outPath}`);

  if (live) {
    console.log('\nUploading to Blob...');
    const blobUrl = await uploadReportPdf(0, pdfBytes);
    console.log(`  ${blobUrl}`);

    console.log(`\nDelivering to ${email}...`);
    await deliverReport({
      customerEmail: email!,
      pdfBytes,
      productTitle: SAMPLE_ORDER_INPUT.reportTier === 'combined' ? 'Relocation + Birth Chart' : 'Relocation Report',
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
