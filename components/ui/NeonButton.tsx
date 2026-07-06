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
        isFlavor ? 'text-white' : 'text-dp-bg',
        className
      )}
      style={
        isFlavor
          ? {
              background: `linear-gradient(135deg, ${colorFrom}40, ${colorTo}20)`,
              border: `1px solid ${colorFrom}60`,
              boxShadow: `0 0 30px ${colorFrom}30`,
            }
          : {
              background: 'linear-gradient(135deg, #d4a574, #e8c9a0)',
              boxShadow: '0 0 30px rgba(212,165,116,0.3)',
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
            ? `linear-gradient(90deg, transparent, ${colorFrom}30, transparent)`
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        }}
      />
    </button>
  );
}
