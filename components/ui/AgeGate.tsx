'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'don-peper-age-verified';
const EXPIRY_DAYS = 365;

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        const expiryDate = new Date(data.timestamp);
        expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);
        if (new Date() > expiryDate) {
          setShow(true);
        }
      } else {
        setShow(true);
      }
    } catch {
      setShow(true);
    }
  }, []);

  const handleVerify = (verified: boolean) => {
    if (verified) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ verified: true, timestamp: new Date().toISOString() })
      );
      setShow(false);
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #faf6f0 0%, #f0e8dc 100%)',
          }}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 5 + 2 + 'px',
                  height: Math.random() * 5 + 2 + 'px',
                  background: `rgba(192, 140, 90, ${Math.random() * 0.4 + 0.15})`,
                  left: Math.random() * 100 + '%',
                  bottom: '-10px',
                }}
                animate={{
                  y: [0, -window.innerHeight - 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 8,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center px-8 py-12 max-w-md text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <h1
                className="text-5xl font-display tracking-[0.2em] bg-gradient-to-r from-dp-gold-dark via-dp-gold to-dp-gold-dark bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 0 30px rgba(192, 140, 90, 0.3))' }}
              >
                DON PEPER
              </h1>
              <div className="mt-2 h-px bg-gradient-to-r from-transparent via-dp-gold/50 to-transparent" />
              <p className="mt-3 text-xs tracking-[0.4em] text-dp-gold/70 uppercase">
                L'Art du Rhum Infusé
              </p>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-dp-gold/30"
              style={{
                background: 'radial-gradient(circle, rgba(192,140,90,0.1) 0%, transparent 70%)',
              }}
            >
              <svg className="h-8 w-8 text-dp-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-dp-ink mb-2 font-medium"
            >
              Êtes-vous majeur·e ?
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-sm text-dp-ink-muted mb-8"
            >
              La vente d'alcool est interdite aux mineur·e·s. L'abus d'alcool est dangereux pour la santé.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex gap-4"
            >
              <button
                onClick={() => handleVerify(true)}
                className="group relative overflow-hidden rounded-xl px-8 py-3 font-semibold text-dp-surface transition-all"
                style={{
                  background: 'linear-gradient(135deg, #c08c5a, #9a6e42)',
                  border: '1px solid rgba(192,140,90,0.5)',
                  boxShadow: '0 4px 20px rgba(192,140,90,0.25)',
                }}
              >
                <span className="relative z-10">OUI, J'AI 18 ANS OU PLUS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              <button
                onClick={() => handleVerify(false)}
                className="rounded-xl px-8 py-3 font-medium text-dp-ink-muted border border-dp-ink/15 hover:border-dp-ink/30 hover:text-dp-ink transition-all"
              >
                Non
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
