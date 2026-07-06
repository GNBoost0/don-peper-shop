'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProduct, FORMATS, type FormatId } from '@/lib/products';
import { useCart } from '@/lib/cart';
import FormatSelector from '@/components/shop/FormatSelector';
import QuantityPicker from '@/components/shop/QuantityPicker';
import NeonButton from '@/components/ui/NeonButton';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProduct(slug);

  const [selectedFormat, setSelectedFormat] = useState<FormatId>('bouteille-75cl');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCart((s) => s.addItem);

  const currentFormat = useMemo(
    () => FORMATS.find((f) => f.id === selectedFormat),
    [selectedFormat]
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-display text-dp-ink mb-4">Produit introuvable</h1>
        <Link href="/boutique" className="text-dp-gold hover:text-dp-gold-light transition-colors">
          ← Retour à la boutique
        </Link>
      </div>
    );
  }

  const { flavor } = product;

  const handleAddToCart = () => {
    if (!currentFormat) return;
    addItem({
      slug: product.slug,
      flavorId: flavor.id,
      flavorName: flavor.name,
      formatId: currentFormat.id,
      formatLabel: currentFormat.label,
      volume: currentFormat.volume,
      price: currentFormat.price,
      colorFrom: flavor.colorFrom,
      colorTo: flavor.colorTo,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-2 text-sm text-dp-ink/40"
        >
          <Link href="/" className="hover:text-dp-ink transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-dp-ink transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-dp-ink/60">{flavor.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* 3D Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="relative aspect-square rounded-3xl overflow-hidden glass"
              style={{
                background: `radial-gradient(ellipse at center, ${flavor.glow} 0%, transparent 60%), rgba(255,255,255,0.02)`,
              }}
            >
              <Scene flavor={flavor} showBottle={true} enableOrbit={true} showHolograms={true} />
            </div>

            {/* Floating info badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 glass rounded-xl px-4 py-2"
            >
              <p className="text-xs text-dp-ink/40 uppercase tracking-wider">Infusion</p>
              <p className="text-sm font-semibold text-dp-ink">3 mois</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute top-6 right-6 glass rounded-xl px-4 py-2"
            >
              <p className="text-xs text-dp-ink/40 uppercase tracking-wider">Origine</p>
              <p className="text-sm font-semibold text-dp-ink">Artisanal</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-6 left-6 glass rounded-xl px-4 py-2"
            >
              <p className="text-xs text-dp-ink/40 uppercase tracking-wider">Degré</p>
              <p className="text-sm font-semibold text-dp-ink">40°</p>
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{flavor.fruitEmoji}</span>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase" style={{ color: flavor.accent }}>
                    {flavor.nameEn}
                  </p>
                  <h1
                    className="text-4xl md:text-5xl font-display bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${flavor.colorFrom}, ${flavor.colorTo})`,
                    }}
                  >
                    {flavor.name}
                  </h1>
                </div>
              </div>
              <p className="text-dp-ink/50 leading-relaxed text-lg">
                {flavor.description}
              </p>
            </div>

            {/* Format selector */}
            <div>
              <p className="text-sm font-semibold text-dp-ink/80 mb-3 uppercase tracking-wider">
                Choisir un format
              </p>
              <FormatSelector
                formats={product.formats}
                selectedId={selectedFormat}
                onSelect={(id) => setSelectedFormat(id as FormatId)}
                colorFrom={flavor.colorFrom}
                colorTo={flavor.colorTo}
              />
            </div>

            {/* Quantity & Add to cart */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-dp-ink/80 uppercase tracking-wider">
                  Quantité
                </p>
                <QuantityPicker value={quantity} onChange={setQuantity} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-dp-ink/40 uppercase tracking-wider">Prix total</p>
                  <p
                    className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${flavor.colorFrom}, ${flavor.colorTo})`,
                    }}
                  >
                    {currentFormat ? `${currentFormat.price * quantity}€` : '—'}
                  </p>
                </div>

                <NeonButton
                  variant="flavor"
                  colorFrom={flavor.colorFrom}
                  colorTo={flavor.colorTo}
                  onClick={handleAddToCart}
                  className="flex-1 max-w-xs"
                >
                  {added ? '✓ Ajouté !' : 'Ajouter au panier'}
                </NeonButton>
              </div>
            </div>

            {/* Details */}
            <div className="glass rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-semibold text-dp-ink/80 uppercase tracking-wider mb-4">
                Caractéristiques
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-dp-ink/40">Volume</p>
                  <p className="text-dp-ink/80">{currentFormat?.volume}</p>
                </div>
                <div>
                  <p className="text-dp-ink/40">Degré d'alcool</p>
                  <p className="text-dp-ink/80">40%</p>
                </div>
                <div>
                  <p className="text-dp-ink/40">Infusion</p>
                  <p className="text-dp-ink/80">3 mois minimum</p>
                </div>
                <div>
                  <p className="text-dp-ink/40">Conservation</p>
                  <p className="text-dp-ink/80">À l'abri de la lumière</p>
                </div>
              </div>
            </div>

            {/* Shipping notice */}
            <div className="flex items-center gap-3 text-sm text-dp-ink/40">
              <svg className="h-5 w-5 flex-shrink-0 text-dp-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-6m6 0V9.348c0-.621-.504-1.125-1.125-1.125H10.5c-.621 0-1.125.504-1.125 1.125v9.402m-6 0V5.625c0-.621.504-1.125 1.125-1.125H9.75c.621 0 1.125.504 1.125 1.125v1.875c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125V5.625" />
              </svg>
              <p>Livraison offerte en France & Belgique · Expédition sous 48h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
