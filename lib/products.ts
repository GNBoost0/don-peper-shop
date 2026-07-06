export type FlavorId =
  | 'fraise'
  | 'raisin'
  | 'myrtille'
  | 'ananas'
  | 'mangue'
  | 'passion'
  | 'litchi'
  | 'citron-vert';

export type FormatId = 'fiole-10cl' | 'bouteille-75cl' | 'bouteille-1l';

export interface Flavor {
  id: FlavorId;
  name: string;
  nameEn: string;
  description: string;
  colorFrom: string;
  colorTo: string;
  accent: string;
  glow: string;
  fruitEmoji: string;
}

export interface Format {
  id: FormatId;
  label: string;
  volume: string;
  price: number;
}

export interface Product {
  slug: string;
  flavor: Flavor;
  formats: Format[];
}

export const FLAVORS: Flavor[] = [
  {
    id: 'fraise',
    name: 'Fraise',
    nameEn: 'Strawberry',
    description: "Un rhum gourmand et fruité, infusé avec des fraises fraîches sélectionnées à maturité parfaite. Des notes sucrées et acidulées qui dansent sur le palais.",
    colorFrom: '#ff006e',
    colorTo: '#ff4d8d',
    accent: '#ff006e',
    glow: 'rgba(255, 0, 110, 0.5)',
    fruitEmoji: '🍓',
  },
  {
    id: 'raisin',
    name: 'Raisin',
    nameEn: 'Grape',
    description: "L'élégance d'un raisin noir macéré dans un rhum ambré de caractère. Une infusion profonde, riche, avec des tanins veloutés et un finish long en bouche.",
    colorFrom: '#7209b7',
    colorTo: '#b5179e',
    accent: '#7209b7',
    glow: 'rgba(114, 9, 183, 0.5)',
    fruitEmoji: '🍇',
  },
  {
    id: 'myrtille',
    name: 'Myrtille',
    nameEn: 'Blueberry',
    description: "Des myrtilles sauvages récoltées en altitude, infusées lentement pour révéler leur intensité fruitée et leur couleur bleu nuit. Un rhum mystérieux et raffiné.",
    colorFrom: '#3a0ca3',
    colorTo: '#4361ee',
    accent: '#3a0ca3',
    glow: 'rgba(58, 12, 163, 0.5)',
    fruitEmoji: '🫐',
  },
  {
    id: 'ananas',
    name: 'Ananas',
    nameEn: 'Pineapple',
    description: "L'ananas victoria dans toute sa splendeur tropicale. Sucre naturel, acidité brillante, et une fraîcheur exotique qui transporte directement sous les tropiques.",
    colorFrom: '#ffbe0b',
    colorTo: '#fb5607',
    accent: '#ffbe0b',
    glow: 'rgba(255, 190, 11, 0.5)',
    fruitEmoji: '🍍',
  },
  {
    id: 'mangue',
    name: 'Mangue',
    nameEn: 'Mango',
    description: "La mangue alphonso, reine des fruits tropicaux, infusée pour délivrer une onctuosité crémeuse et un bouquet aromatique incomparable. Gourmandise absolue.",
    colorFrom: '#ff9500',
    colorTo: '#ff6b35',
    accent: '#ff9500',
    glow: 'rgba(255, 149, 0, 0.5)',
    fruitEmoji: '🥭',
  },
  {
    id: 'passion',
    name: 'Fruit de la Passion',
    nameEn: 'Passion Fruit',
    description: "Le fruit de la passion dans toute son intensité : acidulé, parfumé, addictif. Une explosion tropicale qui éveille chaque papille avec élégance.",
    colorFrom: '#f72585',
    colorTo: '#b5179e',
    accent: '#f72585',
    glow: 'rgba(247, 37, 133, 0.5)',
    fruitEmoji: '🟣',
  },
  {
    id: 'litchi',
    name: 'Litchi',
    nameEn: 'Lychee',
    description: "Le litchi, joyau de Chine, offre une délicatesse florale unique. Notes de rose, de muscat et une fraîcheur délicate pour une expérience sensorielle rare.",
    colorFrom: '#ff5e78',
    colorTo: '#ff0a54',
    accent: '#ff5e78',
    glow: 'rgba(255, 94, 120, 0.5)',
    fruitEmoji: '💟',
  },
  {
    id: 'citron-vert',
    name: 'Citron Vert',
    nameEn: 'Lime',
    description: "Le citron vert de Tahiti, vif et tranchant, coupe le sucre du rhum avec une précision chirurgicale. Une fraîcheur herbacée, une acidité brillante, un rhum parfait pour les soirées d'été.",
    colorFrom: '#80ed99',
    colorTo: '#38b000',
    accent: '#38b000',
    glow: 'rgba(128, 237, 153, 0.5)',
    fruitEmoji: '🍋',
  },
];

export const FORMATS: Format[] = [
  { id: 'fiole-10cl', label: 'Fiole 10cl', volume: '10cl', price: 15 },
  { id: 'bouteille-75cl', label: 'Bouteille 75cl', volume: '75cl', price: 35 },
  { id: 'bouteille-1l', label: 'Bouteille 1L', volume: '1L', price: 45 },
];

export const PRODUCTS: Product[] = FLAVORS.map((flavor) => ({
  slug: flavor.id,
  flavor,
  formats: FORMATS,
}));

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getFormatPrice(slug: string, formatId: FormatId): number {
  const product = getProduct(slug);
  if (!product) return 0;
  const format = product.formats.find((f) => f.id === formatId);
  return format?.price ?? 0;
}
