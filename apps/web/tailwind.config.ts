import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent1: 'rgb(var(--color-accent1) / <alpha-value>)',
        accent2: 'rgb(var(--color-accent2) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Garet', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
