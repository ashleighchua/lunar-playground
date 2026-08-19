import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { start } from 'workflow/api';
import { products } from '@/data/products';
import { getOrderByStripeSessionId, completeIntakeIfNotAlready, createGenerationJob } from '@/lib/reportGeneration/jobs';
import { generateRelocationReport } from '@/lib/reportGeneration/orchestrate';
import { isThemeName } from '@/lib/astrocartography/themes';
import type { RelocationOrderInput, RelocationMotivation } from '@/lib/reportGeneration/orderInput';

const MOTIVATION_VALUES = ['career', 'relationship', 'family', 'fresh-start', 'lifestyle', 'exploring'] as const;

const RequestSchema = z.object({
  // Stripe's own opaque checkout session id — the de facto access token for
  // this order, same as order-success's existing session_id usage. Never
  // accept a raw orderId from the client: it's a sequential integer and
  // trusting it directly would let anyone submit intake for anyone else's order.
  sessionId: z.string().min(1),
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
    .max(3)
    .optional(),
  motivations: z.array(z.enum(MOTIVATION_VALUES)).max(3).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid intake data', details: parsed.error.flatten() }, { status: 400 });
  }

  const invalidTheme = parsed.data.themes.find((t) => !isThemeName(t));
  if (invalidTheme) {
    return NextResponse.json({ error: `Unknown theme: ${invalidTheme}` }, { status: 400 });
  }

  const order = await getOrderByStripeSessionId(parsed.data.sessionId);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const product = products.find((p) => p.id === order.productType);
  if (!product?.reportTier) {
    return NextResponse.json({ error: 'This order is not eligible for automated intake' }, { status: 400 });
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

  const isFirstSubmission = await completeIntakeIfNotAlready(order.id, orderInput);
  if (isFirstSubmission) {
    const jobId = await createGenerationJob(order.id);
    await start(generateRelocationReport, [jobId]);
  }

  return NextResponse.json({ ok: true });
}
