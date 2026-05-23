import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand - Japandi warm tones
        primary: '#FAFAF9',
        'primary-hover': '#EBE8E6',
        accent: '#C2703E',
        'accent-hover': '#A86236',
        'accent-light': '#F5F0EB',
        
        // Category colors - WCAG AA compliant (4.5:1+ on light bg)
        'cat-ai': '#5C4A32',
        'cat-ai-light': '#F5F0EB',
        'cat-smart': '#2C4D38',
        'cat-smart-light': '#EDF2EE',
        
        // Neutrals - warm off-white base
        neutral: '#FAFAF9',
        'neutral-warm': '#EAE7E3',
        surface: '#FFFFFF',
        'surface-alt': '#FAFAF9',
        
        // Text - soft charcoal, WCAG AA compliant
        text: '#292524',
        'text-secondary': '#4A433F',
        'text-muted': '#5A534E',
        'text-inverse': '#FFFFFF',
        
        // Borders - soft stone-200
        border: '#E7E5E4',
        'border-light': '#F1F0EC',
        'border-dark': '#CCC3BC',
        
        // Semantic - muted tones
        success: '#4D7C5E',
        error: '#8B6F62',
        warning: '#C29A5A',
        info: '#7C7DFF',
      },
      fontFamily: {
        sans: [
          "'Inter'",
          "'Noto Sans JP'",
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '720px',
        container: '1280px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px',
        section: 'clamp(48px, 6vw, 80px)',
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '12px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.03)',
        md: '0 1px 3px rgba(0,0,0,0.04)',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        snug: '-0.01em',
        widest: '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
