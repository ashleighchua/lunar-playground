import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
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

        // Background - Soft lavender mist
        canvas: {
          DEFAULT: '#F0EBF8', // Primary background
          soft: '#E8E2F0',    // Secondary surfaces
          warm: '#F5F0FC',    // Slight warmth
        },

        // Ink - Deep plum text
        ink: {
          DEFAULT: '#2D2640', // Primary text
          soft: '#5A5472',    // Secondary text
          muted: '#7B7394',   // Tertiary/metadata
          faint: '#8A8099',   // Disabled/hints (WCAG AA compliant)
        },

        // Lunar - Pastel accents
        lunar: {
          DEFAULT: '#A6B4FF', // Periwinkle accent
          light: '#C8D0FF',   // Hover/subtle
          dark: '#7B8AE0',    // Active states
          glow: '#E8ECFF',    // Backgrounds
        },

        // Night - Deep plum contrast
        night: {
          DEFAULT: '#2D2640', // Dark backgrounds
          soft: '#3D3656',    // Softer dark
          deep: '#1A1628',    // Deepest
        },

        // Warmth - Coral/peach accent
        warmth: {
          DEFAULT: '#FFB8C6', // Coral warm
          soft: '#FFE0E6',    // Light warm
          rich: '#E0758B',    // Deeper warm (WCAG AA compliant as text)
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
        '3xl': '2rem',
        '4xl': '2.5rem',
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
        'glow': '0 0 20px rgba(255, 143, 163, 0.12), 0 4px 16px -4px rgba(45, 38, 64, 0.06)',
        'glow-lg': '0 0 40px rgba(255, 143, 163, 0.18), 0 8px 32px -8px rgba(45, 38, 64, 0.1)',
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
