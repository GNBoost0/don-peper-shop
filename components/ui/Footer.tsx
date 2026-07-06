'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-dp-bg-2/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-display tracking-wider bg-gradient-to-r from-dp-gold to-dp-gold-light bg-clip-text text-transparent mb-3">
              DON PEPER
            </h3>
            <p className="text-sm text-white/40 leading-relaxed">
              L'Art du Rhum Infusé. Des creations artisanales, fruitées et inoubliables.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-white/50 hover:text-dp-gold transition-colors">Accueil</Link></li>
              <li><Link href="/boutique" className="text-sm text-white/50 hover:text-dp-gold transition-colors">Boutique</Link></li>
              <li><Link href="/a-propos" className="text-sm text-white/50 hover:text-dp-gold transition-colors">À Propos</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link href="/mentions-legales" className="text-sm text-white/50 hover:text-dp-gold transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv" className="text-sm text-white/50 hover:text-dp-gold transition-colors">CGV</Link></li>
              <li><Link href="/confidentialite" className="text-sm text-white/50 hover:text-dp-gold transition-colors">Confidentialité</Link></li>
            </ul>
          </div>

          {/* Alcohol warning */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 mb-4">Responsabilité</h4>
            <div className="rounded-xl border border-red-900/30 bg-red-950/10 p-4">
              <p className="text-xs text-red-400/70 leading-relaxed">
                <strong className="text-red-400/90">⚠️ L'abus d'alcool est dangereux pour la santé.</strong>
                {' '}À consommer avec modération. La vente d'alcool est interdite aux mineur·e·s (18+).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Don Peper. Tous droits réservés.
          </p>
          <p className="text-xs text-white/20">
            Crafted with <span className="text-dp-gold/50">♥</span> and rum
          </p>
        </div>
      </div>
    </footer>
  );
}
