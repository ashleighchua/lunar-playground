import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { products } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { productId } = await request.json();

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 400 });
    }

    const needsBirthDetails = productId !== 'mini-course';

    const customFields: Stripe.Checkout.SessionCreateParams.CustomField[] = needsBirthDetails
      ? [
          {
            key: 'birth_details',
            label: { type: 'custom', custom: 'Date, time, and place of birth' },
            type: 'text',
          },
          {
            key: 'cities_of_interest',
            label: { type: 'custom', custom: 'Cities or regions of interest (if any)' },
            type: 'text',
            optional: true,
          },
        ]
      : [];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.subtitle,
            },
            unit_amount: product.priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      custom_fields: customFields,
      success_url: `${request.nextUrl.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/shop`,
      metadata: {
        productId: product.id,
        productTitle: product.title,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
