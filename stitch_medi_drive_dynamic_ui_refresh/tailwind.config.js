/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        // Velocity Precision Palette
        primary: {
          DEFAULT: '#003366', // Deep Navy
          dark: '#001a33',
        },
        secondary: {
          DEFAULT: '#00D1FF', // Electric Cyan
          container: '#004d61',
        },
        surface: {
          DEFAULT: '#f7f9fb',
          dim: '#d8dadc',
          bright: '#f7f9fb',
          container: {
            lowest: '#ffffff',
            low: '#f2f4f6',
            high: '#eceef0',
          }
        },
        outline: {
          DEFAULT: '#74777a',
          variant: '#c4c7ca',
        },
        // Semantic mappings for "Velocity Precision"
        'on-primary': '#ffffff',
        'on-secondary': '#003544',
        'on-surface': '#191c1e',
        'on-surface-variant': '#44474a',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'eight': '8px',
      },
      spacing: {
        'margin-desktop': '5%',
        'gutter': '24px',
        'stack-md': '48px',
      },
      maxWidth: {
        'container-max': '1440px',
      },
      animation: {
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
