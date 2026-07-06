'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';

const CardBottle = dynamic(() => import('@/components/three/CardBottle'), { ssr: false });

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const { flavor, formats } = product;
  const cheapest = formats[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/produit/${product.slug}`}>
        <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-white transition-all duration-500 hover:border-dp-gold/30 hover:shadow-2xl hover:shadow-dp-gold/10">
          {/* 3D Bottle — same quality as product page */}
          <div className="relative h-80 flex items-center justify-center overflow-hidden">
            <CardBottle flavor={flavor} />

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${flavor.glow} 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Info section */}
          <div className="relative p-5 pt-3 border-t border-black/5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3
                  className="text-lg font-display bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${flavor.colorFrom}, ${flavor.colorTo})`,
                  }}
                >
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

            {/* Quick add button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem({
                  slug: product.slug,
                  flavorId: flavor.id,
                  flavorName: flavor.name,
                  formatId: cheapest.id,
                  formatLabel: cheapest.label,
                  volume: cheapest.volume,
                  price: cheapest.price,
                  quantity: 1,
                  colorFrom: flavor.colorFrom,
                  colorTo: flavor.colorTo,
                });
              }}
              className="mt-3 w-full rounded-lg py-2 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${flavor.colorFrom}, ${flavor.colorTo})`,
              }}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
