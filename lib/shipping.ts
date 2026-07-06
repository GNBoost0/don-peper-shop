export interface ShippingZone {
  countries: string[];
  cost: number;
  label: string;
}

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    countries: ['FR', 'BE'],
    cost: 0,
    label: 'France & Belgique — Offerte',
  },
  {
    countries: [
      'DE', 'AT', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'GR',
      'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT',
      'RO', 'SK', 'SI', 'ES', 'SE',
    ],
    cost: 4.99,
    label: 'Reste de l\'Europe — 4,99€',
  },
];

export const EU_COUNTRIES = [
  { code: 'FR', name: 'France' },
  { code: 'BE', name: 'Belgique' },
  { code: 'DE', name: 'Allemagne' },
  { code: 'AT', name: 'Autriche' },
  { code: 'BG', name: 'Bulgarie' },
  { code: 'HR', name: 'Croatie' },
  { code: 'CY', name: 'Chypre' },
  { code: 'CZ', name: 'République Tchèque' },
  { code: 'DK', name: 'Danemark' },
  { code: 'EE', name: 'Estonie' },
  { code: 'FI', name: 'Finlande' },
  { code: 'GR', name: 'Grèce' },
  { code: 'HU', name: 'Hongrie' },
  { code: 'IE', name: 'Irlande' },
  { code: 'IT', name: 'Italie' },
  { code: 'LV', name: 'Lettonie' },
  { code: 'LT', name: 'Lituanie' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malte' },
  { code: 'NL', name: 'Pays-Bas' },
  { code: 'PL', name: 'Pologne' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Roumanie' },
  { code: 'SK', name: 'Slovaquie' },
  { code: 'SI', name: 'Slovénie' },
  { code: 'ES', name: 'Espagne' },
  { code: 'SE', name: 'Suède' },
];

export function getShippingCost(countryCode: string): number {
  const zone = SHIPPING_ZONES.find((z) => z.countries.includes(countryCode));
  if (zone) return zone.cost;
  return -1;
}

export function getShippingLabel(countryCode: string): string {
  const zone = SHIPPING_ZONES.find((z) => z.countries.includes(countryCode));
  if (zone) return zone.label;
  return 'Pays non livrable';
}

export function isDeliverable(countryCode: string): boolean {
  return SHIPPING_ZONES.some((z) => z.countries.includes(countryCode));
}
