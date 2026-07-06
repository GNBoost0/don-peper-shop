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
    <div className="inline-flex items-center gap-3 rounded-xl border border-dp-gold/15 bg-dp-surface/[0.02] px-2 py-1.5">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-lg font-medium transition-all',
          value <= min
            ? 'text-dp-ink-muted cursor-not-allowed'
            : 'text-dp-ink-muted hover:text-dp-ink hover:bg-dp-bg-2'
        )}
      >
        −
      </button>
      <span className="min-w-[2rem] text-center text-base font-semibold text-dp-ink">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-lg font-medium transition-all',
          value >= max
            ? 'text-dp-ink-muted cursor-not-allowed'
            : 'text-dp-ink-muted hover:text-dp-ink hover:bg-dp-bg-2'
        )}
      >
        +
      </button>
    </div>
  );
}
