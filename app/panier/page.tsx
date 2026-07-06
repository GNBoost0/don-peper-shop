'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';
import { EU_COUNTRIES, getShippingCost, isDeliverable } from '@/lib/shipping';
import { useState } from 'react';
import NeonButton from '@/components/ui/NeonButton';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCart();
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-7xl mb-6 opacity-20">🛒</div>
          <h1 className="text-3xl font-display text-white mb-3">Votre panier est vide</h1>
          <p className="text-white/40 mb-8">Découvrez nos saveurs uniques de rhum infusé</p>
          <Link href="/boutique">
            <NeonButton>Explorer la boutique</NeonButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display text-white mb-8"
        >
          Votre Panier
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass rounded-2xl p-4 flex gap-4"
              >
                {/* Mini bottle */}
                <div
                  className="flex-shrink-0 w-16 h-28 rounded-lg border border-white/10 overflow-hidden relative"
                  style={{
                    background: `linear-gradient(180deg, ${item.colorFrom}66, ${item.colorTo}aa)`,
                    boxShadow: `0 0 15px ${item.colorFrom}33`,
                  }}
                >
                  <div className="absolute top-1 left-1 w-1 h-24 bg-white/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] text-white/60 tracking-wider text-center">
                    DON<br />PEPER
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">{item.flavorName}</h3>
                      <p className="text-sm text-white/40">{item.formatLabel} · {item.volume}</p>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-white/30 hover:text-white/60 transition-colors"
            >
              Vider le panier
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 space-y-4 sticky top-28">
              <h2 className="text-lg font-display text-white mb-4">Récapitulatif</h2>

              <div>
                <label className="text-xs text-white/40 mb-2 block uppercase tracking-wider">
                  Pays de livraison
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-dp-bg px-4 py-2.5 text-sm text-white focus:border-dp-gold/50 focus:outline-none"
                >
                  {EU_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 text-sm border-t border-white/5 pt-4">
                <div className="flex justify-between text-white/50">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Livraison</span>
                  <span>{shippingCost === 0 ? 'Offerte ✨' : formatPrice(shippingCost)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold text-white border-t border-white/5 pt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <NeonButton onClick={handleCheckout} disabled={!deliverable || loading} className="w-full">
                {loading ? 'Redirection...' : 'Commander'}
              </NeonButton>

              <p className="text-center text-xs text-white/30">
                Paiement sécurisé via Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
