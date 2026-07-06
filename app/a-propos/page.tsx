'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import NeonButton from '@/components/ui/NeonButton';
import Link from 'next/link';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Scene showBottle={false} particleColor="#d4a574" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.5em] text-dp-gold/50 uppercase mb-4">Notre Histoire</p>
            <h1 className="text-5xl md:text-7xl font-display bg-gradient-to-r from-dp-gold via-dp-gold-light to-dp-gold bg-clip-text text-transparent">
              Don Peper
            </h1>
            <p className="mt-4 text-xl text-white/50 font-light">
              La passion du rhum infusé, élevée au rang d'art
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <h2 className="text-3xl font-display text-dp-gold mb-6">L'Origine</h2>
            <p className="text-white/60 leading-relaxed text-lg">
              Don Peper est né d'une passion simple : celle de créer des rhums arrangés d'exception,
              en harmonie parfaite avec les fruits les plus nobles. Chaque bouteille est le fruit
              d'un travail artisanal, d'une patience de plusieurs mois, et d'une quête obsessionnelle
              de la qualité.
            </p>
            <p className="text-white/60 leading-relaxed text-lg mt-4">
              De la sélection des fruits à maturité parfaite jusqu'à l'infusion lente dans un rhum
              de caractère, chaque étape est pensée pour révéler le meilleur de chaque saveur.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <h2 className="text-3xl font-display text-dp-gold mb-6">Notre Savoir-Faire</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-lg font-medium text-white mb-2">Fruits frais</h3>
                <p className="text-sm text-white/40">
                  Sélectionnés à maturité parfaite, jamais congelés.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">⏳</div>
                <h3 className="text-lg font-medium text-white mb-2">Infusion lente</h3>
                <p className="text-sm text-white/40">
                  Trois mois minimum pour une extraction optimale des arômes.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">🚫</div>
                <h3 className="text-lg font-medium text-white mb-2">Sans artifice</h3>
                <p className="text-sm text-white/40">
                  Ni colorants, ni arômes artificiels. Tout vient du fruit.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-display text-white mb-4">Prêt à découvrir ?</h2>
            <p className="text-white/40 mb-8">Explorez nos 8 saveurs uniques de rhum infusé</p>
            <Link href="/boutique">
              <NeonButton>Voir la boutique</NeonButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
