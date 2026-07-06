import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    );
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // Here you would:
      // - Save order to database
      // - Send confirmation email
      // - Update inventory
      console.log(`Payment succeeded: ${session.id}`);
      break;
    }
    case 'payment_intent.payment_failed': {
      console.log('Payment failed');
      break;
    }
  }

  return NextResponse.json({ received: true });
}
