'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import NeonButton from '@/components/ui/NeonButton';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg text-center"
      >
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,165,116,0.2) 0%, transparent 70%)',
            border: '2px solid rgba(212,165,116,0.3)',
          }}
        >
          <svg className="h-12 w-12 text-dp-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs tracking-[0.4em] text-dp-gold-dark uppercase mb-3">Commande confirmée</p>
          <h1 className="text-4xl font-display text-dp-ink mb-4">
            Merci pour votre commande !
          </h1>
          <p className="text-dp-ink leading-relaxed mb-2">
            Votre paiement a été traité avec succès. Vous recevrez un email de confirmation avec les détails de votre commande.
          </p>
          {sessionId && (
            <p className="text-xs text-dp-ink-muted mt-4">
              N° de session : {sessionId.slice(0, 20)}...
            </p>
          )}

          <div className="mt-12">
            <Link href="/boutique">
              <NeonButton>Continuer mes achats</NeonButton>
            </Link>
          </div>
        </motion.div>

        {/* Floating particles for celebration */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-dp-gold/30"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: '50%',
            }}
            animate={{
              y: [0, -200 - Math.random() * 200],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SuccessContent />
    </Suspense>
  );
}
