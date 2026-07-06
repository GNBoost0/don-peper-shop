'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-black/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-display tracking-wider text-dp-gold-dark mb-3">
              DON PEPER
            </h3>
            <p className="text-sm text-dp-ink-muted leading-relaxed">
              L'Art du Rhum Infusé. Des créations artisanales, fruitées et inoubliables.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-dp-gold-dark mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-dp-ink-muted hover:text-dp-gold-dark transition-colors">Accueil</Link></li>
              <li><Link href="/boutique" className="text-sm text-dp-ink-muted hover:text-dp-gold-dark transition-colors">Boutique</Link></li>
              <li><Link href="/a-propos" className="text-sm text-dp-ink-muted hover:text-dp-gold-dark transition-colors">À Propos</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-dp-gold-dark mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link href="/mentions-legales" className="text-sm text-dp-ink-muted hover:text-dp-gold-dark transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv" className="text-sm text-dp-ink-muted hover:text-dp-gold-dark transition-colors">CGV</Link></li>
              <li><Link href="/confidentialite" className="text-sm text-dp-ink-muted hover:text-dp-gold-dark transition-colors">Confidentialité</Link></li>
            </ul>
          </div>

          {/* Alcohol warning */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-dp-gold-dark mb-4">Responsabilité</h4>
            <div className="rounded-xl border border-red-700/20 bg-red-50 p-4">
              <p className="text-xs text-red-800 leading-relaxed">
                <strong className="text-red-900">⚠️ L'abus d'alcool est dangereux pour la santé.</strong>
                {' '}À consommer avec modération. La vente d'alcool est interdite aux mineur·e·s (18+).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dp-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dp-ink-muted">
            © {new Date().getFullYear()} Don Peper. Tous droits réservés.
          </p>
          <p className="text-xs text-dp-ink-muted">
            Crafted with <span className="text-dp-gold-dark">♥</span> and rum
          </p>
        </div>
      </div>
    </footer>
  );
}
