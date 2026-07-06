'use client';

import { EU_COUNTRIES, getShippingCost, getShippingLabel, isDeliverable } from '@/lib/shipping';
import { formatPrice } from '@/lib/utils';

interface ShippingCalculatorProps {
  country: string;
  onCountryChange: (country: string) => void;
}

export default function ShippingCalculator({ country, onCountryChange }: ShippingCalculatorProps) {
  const cost = getShippingCost(country);
  const deliverable = isDeliverable(country);

  return (
    <div className="rounded-xl border border-dp-ink/10 bg-dp-surface/[0.02] p-4">
      <label className="text-xs text-dp-ink-muted mb-2 block uppercase tracking-wider">
        Pays de livraison
      </label>
      <select
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="w-full rounded-lg border border-dp-ink/10 bg-dp-bg px-4 py-2.5 text-sm text-dp-ink focus:border-dp-gold/50 focus:outline-none"
      >
        {EU_COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-dp-ink">Frais de livraison</span>
        {deliverable ? (
          <span className={`text-sm font-medium ${cost === 0 ? 'text-green-700' : 'text-dp-ink'}`}>
            {cost === 0 ? 'Offerte' : formatPrice(cost)}
          </span>
        ) : (
          <span className="text-sm text-red-700">Non livrable</span>
        )}
      </div>

      {!deliverable && (
        <p className="mt-2 text-xs text-red-800">
          Désolé, nous ne livrons pas dans ce pays pour le moment.
        </p>
      )}
    </div>
  );
}
