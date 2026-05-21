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
        primary: '#1A1C1E',
        secondary: '#6C7278',
        accent: '#E8643A',
        'accent-hover': '#D05530',
        neutral: '#F7F5F2',
        surface: '#FFFFFF',
        'surface-alt': '#F0EEE8',
        border: '#E0DDD5',
        'text-primary': '#1A1C1E',
        'text-secondary': '#6C7278',
        'text-muted': '#9A9890',
        success: '#2D8A4E',
        error: '#D64040',
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans-jp)",
          "'Hiragino Sans'",
          "'Yu Gothic'",
          "'Meiryo'",
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '720px',
        container: '1200px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
