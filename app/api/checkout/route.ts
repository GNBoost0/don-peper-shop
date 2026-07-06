import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { SHIPPING_ZONES } from '@/lib/shipping';

interface CheckoutItem {
  slug: string;
  flavorName: string;
  formatLabel: string;
  volume: string;
  price: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, country = 'FR' } = body as { items: CheckoutItem[]; country: string };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
    }

    // Calculate shipping
    const shippingZone = SHIPPING_ZONES.find((z) => z.countries.includes(country));
    if (!shippingZone) {
      return NextResponse.json({ error: 'Pays non livrable' }, { status: 400 });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Don Peper — Rhum ${item.flavorName} (${item.formatLabel})`,
          description: `Rhum arrangé artisanal ${item.flavorName} · ${item.volume}`,
          metadata: {
            slug: item.slug,
            format: item.formatLabel,
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(shippingZone.cost * 100),
              currency: 'eur',
            },
            display_name: shippingZone.cost === 0 ? 'Livraison offerte' : 'Livraison standard',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      automatic_tax: { enabled: false },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: shippingZone.countries as ('FR' | 'BE' | 'DE' | 'AT' | 'BG' | 'HR' | 'CY' | 'CZ' | 'DK' | 'EE' | 'FI' | 'GR' | 'HU' | 'IE' | 'IT' | 'LV' | 'LT' | 'LU' | 'MT' | 'NL' | 'PL' | 'PT' | 'RO' | 'SK' | 'SI' | 'ES' | 'SE')[],
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/panier`,
      metadata: {
        country,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
