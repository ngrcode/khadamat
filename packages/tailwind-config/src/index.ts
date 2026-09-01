import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export const sharedTheme = {
  extend: {
    colors: {
      primary: {
        50: '#f8f4fc',
        100: '#efe6f8',
        200: '#dcc8f0',
        300: '#c0a0e4',
        400: '#8a5fc8',
        500: '#3a1571',
        600: '#2f115c',
        700: '#220c44',
        800: '#170a3a',
        900: '#0e0624',
        DEFAULT: '#3a1571',
      },
      neutral: {
        50: '#ffffff',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#000000',
        DEFAULT: '#000000',
      },
      black: '#000000',
      white: '#ffffff',
      gold: '#e5007d',
      info: '#3a1571',
      success: '#16a34a',
      warning: '#d19b0c',
      error: '#dc2626',
    },
    fontFamily: {
      sans: ['var(--app-font-family)'],
      serif: ['Playfair Display', 'Merriweather', 'serif'],
      mono: ['Menlo', 'monospace'],
    },
    backgroundImage: {
      'gradient-gold': 'linear-gradient(to right, var(--color-primary), var(--color-accent))',
      'gradient-gold-hover': 'linear-gradient(to right, var(--brand-600), var(--brand-accent-600))',
      'gradient-dark': 'linear-gradient(to right, #27272a, #000000)',
      'gradient-gold-dark': 'linear-gradient(135deg, #3a1571 0%, #18181b 100%)',
      'gradient-radial-gold': 'radial-gradient(circle, #e5007d 0%, #3a1571 100%)',
      'gradient-refah': 'linear-gradient(135deg, #3a1571 0%, #e5007d 100%)',
    },
    spacing: {
      '128': '32rem',
      '144': '36rem',
    },
    borderRadius: {
      '4xl': '2rem',
    },
    boxShadow: {
      'outline-gold': '0 0 0 3px rgba(58, 21, 113, 0.28)',
      'glow-gold': '0 4px 18px 0 rgba(229, 0, 125, 0.28)',
    },
    zIndex: {
      '60': '60',
      '70': '70',
      '80': '80',
      '90': '90',
      '100': '100',
    },
    translate: {
      '25': '25%',
      '50': '50%',
      '75': '75%',
      '100': '100%',
    },
  },
} satisfies Config['theme'];

export const sharedPlugins = [forms, typography, aspectRatio, containerQueries];

export function createTailwindConfig(contentGlobs: string[]): Config {
  return {
    important: true,
    content: contentGlobs,
    theme: sharedTheme,
    plugins: sharedPlugins,
  };
}
