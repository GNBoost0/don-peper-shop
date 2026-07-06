'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { PRODUCTS } from '@/lib/products';
import NeonButton from '@/components/ui/NeonButton';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <motion.main ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* WebGL Background */}
        <div className="absolute inset-0">
          <Scene showBottle={true} particleColor="#d4a574" />
        </div>

        {/* Overlay content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-xs md:text-sm tracking-[0.5em] text-dp-gold/60 uppercase mb-4">
              Artisanal · Premium · Infusé
            </p>
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-display tracking-[0.1em] bg-gradient-to-r from-dp-gold via-dp-gold-light to-dp-gold bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 40px rgba(212,165,116,0.3))' }}
            >
              DON PEPER
            </h1>
            <div className="mt-2 mx-auto h-px w-48 bg-gradient-to-r from-transparent via-dp-gold/50 to-transparent" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-6 text-lg md:text-xl text-white/70 font-light tracking-wide"
            >
              Rhum infusé artisanal · Ardennes · depuis 10 ans
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/boutique">
              <NeonButton className="w-full sm:w-auto">
                Découvrir la Boutique
              </NeonButton>
            </Link>
            <Link href="/a-propos">
              <button className="rounded-xl border border-white/20 px-8 py-3.5 font-semibold text-white/80 hover:text-white hover:border-white/40 transition-all w-full sm:w-auto">
                Notre Histoire
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
            <svg className="h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Flavors */}
      <section className="relative py-32 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.4em] text-dp-gold/50 uppercase mb-3">Nos Saveurs</p>
            <h2 className="text-4xl md:text-5xl font-display text-white">
              Une Palette de Goûts
            </h2>
            <p className="mt-4 text-white/40 max-w-2xl mx-auto">
              Chaque rhum est une création unique, infusée avec des fruits soigneusement sélectionnés.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/produit/${product.slug}`}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 text-center transition-all hover:border-white/20 hover:shadow-2xl h-full"
                    style={{
                      background: `linear-gradient(135deg, ${product.flavor.glow}, transparent)`,
                    }}
                  >
                    <div className="text-4xl mb-3">{product.flavor.fruitEmoji}</div>
                    <h3
                      className="text-lg font-display bg-gradient-to-r bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${product.flavor.colorFrom}, ${product.flavor.colorTo})`,
                      }}
                    >
                      {product.flavor.name}
                    </h3>
                    <p className="text-xs text-white/30 mt-1">Dès {product.formats[0].price}€</p>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, ${product.flavor.glow} 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/boutique">
              <button className="text-dp-gold hover:text-dp-gold-light transition-colors text-sm tracking-wider">
                Voir toutes les saveurs →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality banner */}
      <section className="relative py-32 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12 md:p-16 text-center"
          >
            <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
              <div>
                <div className="text-3xl font-display text-dp-gold">100%</div>
                <p className="text-xs text-white/40 mt-1 tracking-wider uppercase">Naturel</p>
              </div>
              <div>
                <div className="text-3xl font-display text-dp-gold">3 mois</div>
                <p className="text-xs text-white/40 mt-1 tracking-wider uppercase">Infusion</p>
              </div>
              <div>
                <div className="text-3xl font-display text-dp-gold">8</div>
                <p className="text-xs text-white/40 mt-1 tracking-wider uppercase">Saveurs</p>
              </div>
              <div>
                <div className="text-3xl font-display text-dp-gold">0</div>
                <p className="text-xs text-white/40 mt-1 tracking-wider uppercase">Colorants</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
