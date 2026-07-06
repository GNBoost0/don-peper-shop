'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'gold' | 'flavor';
  colorFrom?: string;
  colorTo?: string;
}

export default function NeonButton({
  children,
  className,
  variant = 'gold',
  colorFrom,
  colorTo,
  ...props
}: NeonButtonProps) {
  const isFlavor = variant === 'flavor' && colorFrom && colorTo;

  return (
    <button
      className={cn(
        'group relative overflow-hidden rounded-xl px-8 py-3.5 font-semibold transition-all',
        isFlavor ? 'text-dp-surface' : 'text-dp-surface',
        className
      )}
      style={
        isFlavor
          ? {
              background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
              border: `1px solid ${colorFrom}`,
              boxShadow: `0 4px 20px ${colorFrom}40`,
            }
          : {
              background: 'linear-gradient(135deg, #b8732e, #8f5818)',
              boxShadow: '0 4px 20px rgba(184,115,46,0.25)',
            }
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isFlavor
            ? `linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)`
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
        }}
      />
    </button>
  );
}
