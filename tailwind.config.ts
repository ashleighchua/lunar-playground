import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ======================
        // THE LUNAR PLAYGROUND
        // Editorial, spacious, quietly confident
        // ======================

        // Background - Nearly white with warmth
        canvas: {
          DEFAULT: '#FAFAF9', // Primary background
          soft: '#F5F5F4',    // Secondary surfaces
          warm: '#FAF9F7',    // Slight warmth
        },

        // Ink - Deep, confident text
        ink: {
          DEFAULT: '#1C1917', // Primary text - nearly black
          soft: '#44403C',    // Secondary text
          muted: '#78716C',   // Tertiary/metadata
          faint: '#A8A29E',   // Disabled/hints
        },

        // Lunar - Soft silver/blue accent
        lunar: {
          DEFAULT: '#94A3B8', // Primary accent
          light: '#CBD5E1',   // Hover/subtle
          dark: '#64748B',    // Active states
          glow: '#E2E8F0',    // Backgrounds
        },

        // Night - Deep contrast for special moments
        night: {
          DEFAULT: '#1E293B', // Dark backgrounds
          soft: '#334155',    // Softer dark
          deep: '#0F172A',    // Deepest
        },

        // Warmth - Subtle warm accent
        warmth: {
          DEFAULT: '#D6D3D1', // Neutral warm
          soft: '#E7E5E4',    // Light warm
          rich: '#A8A29E',    // Deeper warm
        },

        // Status colors (minimal)
        success: '#22C55E',
        error: '#EF4444',
      },

      fontFamily: {
        // Editorial serif for headlines
        serif: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
        // Clean sans for body
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // Display - Hero headlines
        'display': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],

        // Headlines
        'h1': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],

        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],

        // Small
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'overline': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },

      maxWidth: {
        'prose': '65ch',
        'content': '1200px',
        'narrow': '800px',
        'wide': '1400px',
      },

      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },

      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },

      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 32px -8px rgba(0, 0, 0, 0.12)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
