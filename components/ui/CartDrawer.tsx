'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';
import { EU_COUNTRIES, getShippingCost, getShippingLabel, isDeliverable } from '@/lib/shipping';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCart();
  const [country, setCountry] = useState('FR');
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const shippingCost = getShippingCost(country);
  const total = subtotal + (shippingCost > 0 ? shippingCost : 0);
  const deliverable = isDeliverable(country);

  const handleCheckout = async () => {
    if (!deliverable || items.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.slug,
            flavorName: i.flavorName,
            formatLabel: i.formatLabel,
            volume: i.volume,
            price: i.price,
            quantity: i.quantity,
          })),
          country,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay — warm tint, not black */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-dp-ink/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-md bg-dp-surface flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dp-gold/20">
              <h2 className="text-lg font-display tracking-wide text-dp-ink">
                Votre Panier
              </h2>
              <button
                onClick={closeCart}
                className="rounded-lg p-2 text-dp-ink hover:text-dp-gold-dark hover:bg-dp-gold/10 transition-all"
                aria-label="Fermer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4 opacity-30">🛒</div>
                  <p className="text-dp-ink mb-2">Votre panier est vide</p>
                  <Link
                    href="/boutique"
                    onClick={closeCart}
                    className="text-dp-gold-dark hover:text-dp-gold transition-colors text-sm font-medium"
                  >
                    Découvrir la boutique →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 rounded-xl border border-dp-gold/15 bg-dp-bg p-3"
                    >
                      {/* Mini bottle */}
                      <div
                        className="relative flex-shrink-0 w-12 h-20 rounded-md border border-dp-gold/20 overflow-hidden"
                        style={{
                          background: `linear-gradient(180deg, ${item.colorFrom}66, ${item.colorTo}aa)`,
                        }}
                      >
                        <div className="absolute top-1 left-1 w-1 h-16 bg-white/30 rounded-full" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-dp-ink">
                          {item.flavorName} — {item.formatLabel}
                        </p>
                        <p className="text-xs text-dp-ink-muted">{formatPrice(item.price)}</p>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-dp-gold/20 text-dp-ink-muted hover:text-dp-ink hover:border-dp-gold/40 transition-all"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm text-dp-ink">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-dp-gold/20 text-dp-ink-muted hover:text-dp-ink hover:border-dp-gold/40 transition-all"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-red-700 hover:text-red-900 transition-colors font-medium"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-dp-ink">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dp-gold/20 p-6 space-y-4">
                {/* Country selector */}
                <div>
                  <label className="text-xs text-dp-ink-muted mb-2 block uppercase tracking-wider">
                    Pays de livraison
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border border-dp-gold/20 bg-dp-bg px-4 py-2.5 text-sm text-dp-ink focus:border-dp-gold/50 focus:outline-none"
                  >
                    {EU_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-dp-ink-muted">
                    {getShippingLabel(country)}
                  </p>
                </div>

                {/* Totals */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-dp-ink-muted">
                    <span>Sous-total</span>
                    <span className="text-dp-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-dp-ink-muted">
                    <span>Livraison</span>
                    <span className="text-dp-ink">{shippingCost === 0 ? 'Offerte' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-dp-ink pt-2 border-t border-dp-gold/15">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  disabled={!deliverable || loading}
                  className="w-full rounded-xl py-3.5 font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #b8732e, #8f5818)',
                    boxShadow: '0 4px 20px rgba(184,115,46,0.25)',
                  }}
                >
                  {loading ? 'Redirection...' : 'Payer avec Stripe'}
                </button>

                <p className="text-center text-xs text-dp-ink-muted">
                  Paiement sécurisé · CB · Apple Pay · Google Pay
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
