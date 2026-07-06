'use client';

import { motion } from 'framer-motion';
import type { Format } from '@/lib/products';
import { cn } from '@/lib/utils';

interface FormatSelectorProps {
  formats: Format[];
  selectedId: string;
  onSelect: (id: string) => void;
  colorFrom: string;
  colorTo: string;
}

export default function FormatSelector({
  formats,
  selectedId,
  onSelect,
  colorFrom,
  colorTo,
}: FormatSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {formats.map((format) => {
        const isSelected = format.id === selectedId;
        return (
          <motion.button
            key={format.id}
            onClick={() => onSelect(format.id)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'relative rounded-xl border p-4 text-center transition-all',
              isSelected
                ? 'border-transparent text-white'
                : 'border-white/10 text-white/60 hover:border-white/30'
            )}
            style={
              isSelected
                ? {
                    background: `linear-gradient(135deg, ${colorFrom}30, ${colorTo}15)`,
                    borderColor: colorFrom,
                    boxShadow: `0 0 20px ${colorFrom}30`,
                  }
                : undefined
            }
          >
            <p className="text-sm font-semibold">{format.label.split(' ')[0]}</p>
            <p className="text-xs opacity-60 mt-0.5">{format.volume}</p>
            <p
              className={cn(
                'text-lg font-bold mt-1',
                isSelected ? '' : 'text-white/80'
              )}
              style={isSelected ? { color: colorFrom } : undefined}
            >
              {format.price}€
            </p>
            {isSelected && (
              <motion.div
                layoutId="format-selected"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full"
                style={{ background: colorFrom }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
