export default {
  darkMode: 'class',
  content: ['./**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: {
          DEFAULT: 'rgb(var(--canvas) / <alpha-value>)',
          alt: 'rgb(var(--canvas-2) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          subtle: 'rgb(var(--ink-subtle) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          contrast: 'rgb(var(--accent-contrast) / <alpha-value>)',
          ocean: 'rgb(var(--accent-ocean) / <alpha-value>)',
          clay: 'rgb(var(--accent-clay) / <alpha-value>)',
        },
        sage: {
          50: '#f2f6f2',
          100: '#e2ece4',
          200: '#c3d8c9',
          300: '#9dbda7',
          400: '#739c81',
          500: '#527d61',
          600: '#3d6449',
          700: '#2f5039',
          800: '#26402e',
          900: '#1d3124',
        },
        ocean: {
          50: '#f1f6f9',
          100: '#e0ebf2',
          200: '#c1d7e4',
          300: '#98bcd1',
          400: '#6b9cba',
          500: '#4a7d9d',
          600: '#3a6480',
          700: '#2f5067',
          800: '#284152',
          900: '#213442',
        },
        clay: {
          50: '#f8f5f1',
          100: '#eee7de',
          200: '#dccebd',
          300: '#c4ae95',
          400: '#a98d6d',
          500: '#8f7252',
          600: '#745b41',
          700: '#5d4936',
          800: '#4a3b2d',
          900: '#3c3126',
        },
      },
      spacing: {
        13: '3.25rem',
      },
      borderRadius: {
        '3xl': '1.25rem',
        '4xl': '1.75rem',
        '5xl': '2.25rem',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
      },
    },
  },
  plugins: [],
};
