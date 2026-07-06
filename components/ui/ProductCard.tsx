'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const { flavor, formats } = product;
  const cheapest = formats[0];
  const expensive = formats[formats.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/produit/${product.slug}`}>
        <div
          className="relative overflow-hidden rounded-2xl border border-dp-gold/15 backdrop-blur-md transition-all duration-500 hover:border-dp-gold/30 hover:shadow-2xl bg-dp-surface/70"
        >
          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${flavor.glow} 0%, transparent 70%)`,
            }}
          />

          {/* CSS Bottle render */}
          <div className="relative h-72 flex items-center justify-center overflow-hidden">
            {/* Particle dots */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  background: flavor.accent,
                  left: Math.random() * 80 + 10 + '%',
                  top: Math.random() * 80 + 10 + '%',
                  boxShadow: `0 0 10px ${flavor.accent}`,
                }}
              />
            ))}

            {/* CSS Bottle */}
            <div className="relative transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500">
              {/* Cap */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-5 h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-md" />

              {/* Neck */}
              <div className="absolute left-1/2 -translate-x-1/2 top-3 w-5 h-6 bg-gradient-to-b from-dp-ink/10 to-dp-ink/5 backdrop-blur-sm border-x border-dp-ink/10" />

              {/* Body */}
              <div
                className="relative w-20 h-40 rounded-lg backdrop-blur-sm border border-dp-ink/10 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))`,
                  boxShadow: `inset 0 0 20px ${flavor.glow}, 0 4px 30px rgba(0,0,0,0.08)`,
                }}
              >
                {/* Liquid */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[70%] overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, ${flavor.colorFrom}aa, ${flavor.colorTo}ee)`,
                    boxShadow: `inset 0 0 30px ${flavor.colorFrom}`,
                  }}
                >
                  {/* Liquid surface shimmer */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-50"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${flavor.colorFrom}, transparent)`,
                    }}
                  />
                </div>

                {/* Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-gradient-to-b from-[#1f1530] to-[#15102a] rounded-sm flex flex-col items-center justify-center">
                  <div className="h-px w-10 bg-dp-gold/80 mb-1" />
                  <div className="text-[7px] font-display tracking-widest text-dp-gold text-center font-bold">
                    DON<br />PEPER
                  </div>
                  <div className="h-px w-10 bg-dp-gold/80 mt-1" />
                  <div className="mt-1 text-[6px] text-dp-surface/60 tracking-wide">{flavor.nameEn.toUpperCase()}</div>
                </div>

                {/* Glass shine */}
                <div className="absolute top-2 left-1 w-2 h-32 bg-gradient-to-b from-dp-surface/60 to-transparent rounded-full" />
              </div>

              {/* Base glow */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full blur-md opacity-60"
                style={{ background: flavor.accent }}
              />
            </div>
          </div>

          {/* Info section */}
          <div className="relative p-5 pt-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-display text-dp-ink">
                  {flavor.name}
                </h3>
                <p className="text-xs text-dp-ink-muted tracking-wide">{flavor.nameEn}</p>
              </div>
              <span className="text-2xl" role="img" aria-label={flavor.nameEn}>
                {flavor.fruitEmoji}
              </span>
            </div>

            <p className="text-xs text-dp-ink-muted line-clamp-2 mb-3 leading-relaxed">
              {flavor.description}
            </p>

            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-dp-ink-muted">À partir de</span>
                <p
                  className="text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${flavor.colorFrom}, ${flavor.colorTo})` }}
                >
                  {cheapest.price}€
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-dp-ink-muted">{formats.length} formats</span>
              </div>
            </div>
          </div>

          {/* Quick add gradient border */}
          <div
            className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, ${flavor.colorFrom}, ${flavor.colorTo})` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
