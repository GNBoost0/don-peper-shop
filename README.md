# 🌙 Don Peper — L'Art du Rhum Infusé

E-commerce premium pour rhums arrangés artisanaux aux fruits. Site immersif avec WebGL/Three.js, design cinématographique et paiement Stripe.

## 🚀 Stack Technique

- **Next.js 14** (App Router)
- **React Three Fiber** + **Three.js** — 3D & WebGL
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Stripe** — Paiements
- **Zustand** — State management (panier)
- **TypeScript** — End-to-end type safety

## 📋 Prérequis

- Node.js 18+
- npm 9+
- Un compte Stripe (test ou live keys)

## 🔧 Installation

```bash
# Cloner et installer
cd rum-shop
npm install

# Copier le .env et remplir
cp .env.example .env.local

# Remplacer les clés Stripe dans .env.local
STRIPE_SECRET_KEY=sk_test_votre_cle
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle
STRIPE_WEBHOOK_SECRET=whsec_votre_cle
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 💻 Développement

```bash
npm run dev    # Dev server sur localhost:3000
npm run build  # Build production
npm run start  # Servir le build
npm run test   # Tests Vitest
npm run lint   # ESLint
```

## 🧪 Tests

```bash
npm test
```

Couvre :
- Catalogue produits (8 saveurs, 3 formats, prix)
- Calcul de livraison (zones FR/BE/EU)
- Logique panier (ajout, suppression, quantités)

## 🌍 Déploiement (Vercel)

1. Push le repo sur GitHub
2. Connecter sur [vercel.com](https://vercel.com)
3. Ajouter les variables d'environnement dans les settings Vercel :
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (URL de production)
4. Deploy

### Stripe Webhook (production)

Créer un webhook endpoint dans le dashboard Stripe → `https://votre-domaine.com/api/webhook`

## 🍹 Produits

8 saveurs disponibles en 3 formats :

| Format | Volume | Prix |
|--------|--------|------|
| Fiole | 10cl | 15€ |
| Bouteille | 75cl | 35€ |
| Bouteille | 1L | 45€ |

**Saveurs** : Fraise, Raisin, Myrtille, Ananas, Mangue, Passion, Litchi, Citron Vert

## 🚚 Livraison

- **France & Belgique** : Offerte
- **Reste de l'Europe (EU)** : 4,99€

## ⚠️ Légal

- Age gate 18+ obligatoire
- Mentions légales, CGV, Politique de confidentialité incluses
- Avertissement alcool dans le footer

## 📁 Structure

```
rum-shop/
├── app/                 # Pages & API routes (Next.js App Router)
│   ├── page.tsx         # Landing hero (WebGL)
│   ├── boutique/        # Catalogue
│   ├── produit/[slug]/  # Fiche produit + 3D
│   ├── panier/          # Panier
│   ├── success/         # Confirmation commande
│   ├── a-propos/        # Histoire de marque
│   ├── api/checkout/    # Stripe checkout
│   ├── api/webhook/     # Stripe webhooks
│   ├── mentions-legales/
│   ├── cgv/
│   └── confidentialite/
├── components/
│   ├── three/           # WebGL (ParticleField, Bottle3D, Scene...)
│   ├── ui/              # UI (Navbar, AgeGate, ProductCard, CartDrawer...)
│   └── shop/            # E-commerce (FormatSelector, QuantityPicker, ShippingCalculator)
├── lib/                 # Logique (products, shipping, cart, stripe, utils)
├── tests/               # Tests Vitest
└── public/              # Assets statiques
```

## 📝 License

© Don Peper. Tous droits réservés.
