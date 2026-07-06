'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-dp-bg"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-6xl font-display tracking-[0.2em] bg-gradient-to-r from-dp-gold via-dp-gold-light to-dp-gold bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 20px rgba(212,165,116,0.4))' }}
          >
            DON PEPER
          </h1>
        </motion.div>

        <div className="mt-8 w-48 mx-auto">
          <div className="h-px bg-dp-surface/10 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-dp-gold to-dp-gold-light"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <p className="mt-3 text-xs text-dp-ink-muted tracking-widest uppercase">
            Chargement...
          </p>
        </div>
      </div>
    </motion.div>
  );
}
