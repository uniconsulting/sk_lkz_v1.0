import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent1: 'rgb(var(--color-accent1) / <alpha-value>)',
        accent2: 'rgb(var(--color-accent2) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
      },
      borderRadius: {
        s: 'var(--radius-1)',  /* 8 */
        m: 'var(--radius-3)',  /* 16 */
        l: 'var(--radius-5)',  /* 24 */
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
      },
      fontFamily: {
        sans: ['Garet', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
