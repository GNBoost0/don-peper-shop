'use client';

import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

export default function BoutiquePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 pb-20 px-4"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-dp-gold/50 uppercase mb-3">La Collection</p>
          <h1 className="text-5xl md:text-6xl font-display text-white">
            Notre Boutique
          </h1>
          <p className="mt-4 text-white/40 max-w-2xl mx-auto">
            Découvrez nos rhums arrangés artisanaux, infusés avec passion et des fruits d'exception.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        {/* Shipping info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="text-sm font-semibold text-white">Livraison offerte</h3>
            <p className="text-xs text-white/40 mt-1">France & Belgique</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="text-sm font-semibold text-white">Paiement sécurisé</h3>
            <p className="text-xs text-white/40 mt-1">Stripe · CB · Apple Pay</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="text-sm font-semibold text-white">Artisanal</h3>
            <p className="text-xs text-white/40 mt-1">Infusion naturelle 3 mois</p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
