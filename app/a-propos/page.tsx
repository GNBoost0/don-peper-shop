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
            <p className="text-xs tracking-[0.5em] text-dp-gold-dark uppercase mb-4">Notre Histoire</p>
            <h1 className="text-5xl md:text-7xl font-display bg-gradient-to-r from-dp-gold via-dp-gold-light to-dp-gold bg-clip-text text-transparent">
              Don Peper
            </h1>
            <p className="mt-4 text-xl text-dp-ink-muted font-light">
              Un grand-père, une passion, un héritage de cœur
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-12">

          {/* L'Histoire de Peper */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <h2 className="text-3xl font-display text-dp-gold mb-6">Peper, l'Homme derrière le Rhum</h2>
            <p className="text-dp-ink-muted leading-relaxed text-lg">
              Dans les Ardennes, au cœur d'une nature généreuse et authentique, vit un homme que
              tout le monde appelle <strong className="text-dp-gold">Peper</strong>. Grand-père
              aimant, père dévoué et mari attentionné, Peper est de ces personnages dont la simple
              présence réchauffe une pièce entière.
            </p>
            <p className="text-dp-ink-muted leading-relaxed text-lg mt-4">
              Depuis plus de <strong className="text-dp-gold">10 ans</strong>, il consacre son temps
              libre à une passion qui ne l'a jamais quitté : l'art du rhum infusé. Ce qui a commencé
              comme un hobby curieux s'est transformé en un véritable savoir-faire, affiné année
              après année, bouteille après bouteille.
            </p>
            <p className="text-dp-ink-muted leading-relaxed text-lg mt-4">
              Chaque fruit est choisi avec soin, chaque infusion est surveillée avec patience. Dans
              la cave de Peper, le temps fait son œuvre — et le résultat est à la hauteur de
              l'amour qu'il y met.
            </p>
          </motion.div>

          {/* La Famille */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <h2 className="text-3xl font-display text-dp-gold mb-6">Une Famille, un Pilier</h2>
            <p className="text-dp-ink-muted leading-relaxed text-lg">
              Derrière Peper, il y a sa femme — sa partenaire de toujours, celle qui partage chaque
              instant, chaque épreuve et chaque joie. Ensemble, ils ont bâti une famille unie,
              fondée sur l'amour et la bienveillance.
            </p>
            <p className="text-dp-ink-muted leading-relaxed text-lg mt-4">
              Au centre de leur vie : leur fille <strong className="text-dp-gold">Magalie</strong>.
              Trisomique, rayonnante, elle est le cœur battant de la famille. Peper et sa femme se
              consacrent à elle avec une tendresse et un dévouement sans limite. Magalie apporte à
              leur vie une dimension unique — celle de la pure joie, de l'authenticité et de l'amour
              inconditionnel.
            </p>
            <p className="text-dp-ink-muted leading-relaxed text-lg mt-4">
              C'est cet amour-là que l'on retrouve dans chaque bouteille de Don Peper. Un rhum fait
              avec le cœur, par un homme qui sait que les meilleures choses de la vie prennent du
              temps — tout comme sa fille lui apprend chaque jour que le bonheur est dans les
              choses simples.
            </p>
          </motion.div>

          {/* Les Ardennes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <h2 className="text-3xl font-display text-dp-gold mb-6">Enraciné dans les Ardennes</h2>
            <p className="text-dp-ink-muted leading-relaxed text-lg">
              Les Ardennes — ses forêts profondes, ses vallées brumeuses, ses saisons qui marquent
              le rythme. C'est ce décor, à la fois sauvage et apaisant, qui inspire Peper au
              quotidien. Une terre de caractère, comme son rhum.
            </p>
            <p className="text-dp-ink-muted leading-relaxed text-lg mt-4">
              Ici, on ne court pas après le temps. On le respire. On l'infuse. Et c'est précisément
              cette philosophie qui donne aux rhums Don Peper leur âme : lenteur, patience, et un
              respect absolu du fruit.
            </p>
          </motion.div>

          {/* Savoir-Faire */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-10 md:p-14"
          >
            <h2 className="text-3xl font-display text-dp-gold mb-6">Le Savoir-Faire</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-lg font-medium text-dp-ink mb-2">Fruits frais</h3>
                <p className="text-sm text-dp-ink">
                  Sélectionnés à maturité parfaite, jamais congelés. Le fruit d'abord, toujours.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">⏳</div>
                <h3 className="text-lg font-medium text-dp-ink mb-2">10 ans d'expérience</h3>
                <p className="text-sm text-dp-ink">
                  Une décennie d'essais, d'affinage et de patience pour arriver à la perfection.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">❤️</div>
                <h3 className="text-lg font-medium text-dp-ink mb-2">Fait avec le cœur</h3>
                <p className="text-sm text-dp-ink">
                  Chaque bouteille porte l'âme d'une famille ardennaise passionnée.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-display text-dp-ink mb-4">Goûtez à l'histoire</h2>
            <p className="text-dp-ink mb-8">
              Chaque gorgée raconte celle d'un grand-père, d'une famille, et d'une passion de 10 ans.
            </p>
            <Link href="/boutique">
              <NeonButton>Découvrir la boutique</NeonButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
