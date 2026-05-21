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
        // Brand
        primary: '#0F172A',
        'primary-hover': '#1E293B',
        accent: '#E8643A',
        'accent-hover': '#D05530',
        'accent-light': '#FFF4F0',
        
        // Category colors
        'cat-ai': '#6366F1',
        'cat-ai-light': '#EEF2FF',
        'cat-smart': '#10B981',
        'cat-smart-light': '#ECFDF5',
        'cat-iot': '#F59E0B',
        'cat-iot-light': '#FFFBEB',
        'cat-security': '#EF4444',
        'cat-security-light': '#FEF2F2',
        'cat-energy': '#06B6D4',
        'cat-energy-light': '#ECFEFF',
        
        // Neutrals
        neutral: '#F8FAFC',
        'neutral-warm': '#F1F5F9',
        surface: '#FFFFFF',
        'surface-alt': '#F8FAFC',
        
        // Text
        text: '#0F172A',
        'text-secondary': '#475569',
        'text-muted': '#94A3B8',
        'text-inverse': '#FFFFFF',
        
        // Borders
        border: '#E2E8F0',
        'border-light': '#F1F5F9',
        'border-dark': '#CBD5E1',
        
        // Semantic
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
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
        xxl: '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)',
        md: '0 4px 6px rgba(15,23,42,0.07), 0 2px 4px rgba(15,23,42,0.04)',
        lg: '0 10px 15px rgba(15,23,42,0.08), 0 4px 6px rgba(15,23,42,0.04)',
        xl: '0 20px 25px rgba(15,23,42,0.1), 0 8px 10px rgba(15,23,42,0.04)',
        glow: '0 0 0 1px rgba(232, 100, 58, 0.2), 0 4px 12px rgba(232, 100, 58, 0.15)',
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
