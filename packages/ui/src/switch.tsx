import * as React from 'react';

export type SwitchProps = {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label?: string;
};

export function Switch({ checked, onCheckedChange, label }: SwitchProps) {
  return (
    <button
      type="button"
      className={[
        'glass glass-border focus-ring rounded-l px-3 py-2',
        'inline-flex items-center gap-2 text-sm',
      ].join(' ')}
      onClick={() => onCheckedChange(!checked)}
      aria-pressed={checked}
    >
      <span
        className={[
          'relative inline-flex h-6 w-11 items-center rounded-full transition',
          checked ? 'bg-primary/35' : 'bg-fg/12',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-5 w-5 rounded-full transition',
            'bg-bg',
            checked ? 'translate-x-5' : 'translate-x-1',
          ].join(' ')}
        />
      </span>
      {label ? <span className="text-fg/85">{label}</span> : null}
    </button>
  );
}
