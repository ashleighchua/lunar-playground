import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { start } from 'workflow/api';
import { products } from '@/data/products';
import { ADMIN_SESSION_COOKIE, verifySessionCookieValue } from '@/lib/adminAuth';
import { createOrderIfNew, completeIntakeIfNotAlready, createGenerationJob } from '@/lib/reportGeneration/jobs';
import { generateRelocationReport } from '@/lib/reportGeneration/orchestrate';
import { isThemeName } from '@/lib/astrocartography/themes';
import type { RelocationOrderInput, RelocationMotivation } from '@/lib/reportGeneration/orderInput';

const MOTIVATION_VALUES = ['career', 'relationship', 'family', 'fresh-start', 'lifestyle', 'exploring'] as const;

const RequestSchema = z.object({
  productId: z.string().min(1),
  customerEmail: z.string().trim().email(),
  client: z.string().trim().min(1).max(100),
  birth: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}$/),
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    placeLabel: z.string().trim().min(1).max(200),
  }),
  themes: z.array(z.string()).min(1).max(3),
  destinationCities: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(100),
        country: z.string().trim().max(100),
        lat: z.number().min(-90).max(90),
        lon: z.number().min(-180).max(180),
      })
    )
    .max(6)
    .optional(),
  motivations: z.array(z.enum(MOTIVATION_VALUES)).max(3).optional(),
});

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE.name)?.value;
  if (!verifySessionCookieValue(sessionCookie)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid order data', details: parsed.error.flatten() }, { status: 400 });
  }

  const invalidTheme = parsed.data.themes.find((t) => !isThemeName(t));
  if (invalidTheme) {
    return NextResponse.json({ error: `Unknown theme: ${invalidTheme}` }, { status: 400 });
  }

  const product = products.find((p) => p.id === parsed.data.productId);
  if (!product?.reportTier) {
    return NextResponse.json({ error: 'This product is not eligible for automated generation' }, { status: 400 });
  }

  // Reuses the exact same idempotent order-creation primitives the public
  // Stripe checkout -> order-intake flow already proved live — the only
  // differences are the synthetic session id (there's no real Stripe
  // session behind a manual Fiverr order) and subscribeToMailingList being
  // hardcoded false here, never left to a caller-supplied value: a Fiverr
  // client never opted into the mailing list, unlike public checkout.
  const orderId = await createOrderIfNew({
    stripeSessionId: `manual-${randomUUID()}`,
    productType: product.id,
    customerEmail: parsed.data.customerEmail,
    subscribeToMailingList: false,
  });
  if (orderId == null) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }

  const orderInput: RelocationOrderInput = {
    client: parsed.data.client,
    reportTier: product.reportTier,
    birth: parsed.data.birth,
    themes: parsed.data.themes as RelocationOrderInput['themes'],
    cityCount: 3,
    destinationCities: parsed.data.destinationCities,
    motivations: parsed.data.motivations as RelocationMotivation[] | undefined,
  };

  await completeIntakeIfNotAlready(orderId, orderInput);
  const jobId = await createGenerationJob(orderId);
  await start(generateRelocationReport, [jobId]);

  return NextResponse.json({ ok: true, orderId, jobId });
}
