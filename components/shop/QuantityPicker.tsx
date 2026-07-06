'use client';

import { cn } from '@/lib/utils';

interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityPickerProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-2 py-1.5">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-lg font-medium transition-all',
          value <= min
            ? 'text-white/20 cursor-not-allowed'
            : 'text-white/70 hover:text-white hover:bg-white/5'
        )}
      >
        −
      </button>
      <span className="min-w-[2rem] text-center text-base font-semibold text-white">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-lg font-medium transition-all',
          value >= max
            ? 'text-white/20 cursor-not-allowed'
            : 'text-white/70 hover:text-white hover:bg-white/5'
        )}
      >
        +
      </button>
    </div>
  );
}
