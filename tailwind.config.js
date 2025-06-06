/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Book Cover Burgundy Palette
        burgundy: {
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#facaca',
          300: '#f5a3a3',
          400: '#ed6d6d',
          500: '#e24444',
          600: '#ce2626',
          700: '#ac1d1d',
          800: '#6e3737', // Primary book cover color
          900: '#5a2e2e',
          950: '#311414',
        },
        // Gold Accents
        gold: {
          50: '#fdfcf8',
          100: '#fbf8e8',
          200: '#f6edc7',
          300: '#f0dfa0',
          400: '#e8c96d',
          500: '#d4af37', // Primary gold
          600: '#c49a2e',
          700: '#a37e27',
          800: '#846525',
          900: '#6e5422',
        },
        // Cream/Paper Colors
        cream: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f0e8',
          300: '#ede4d3',
          400: '#e0d0b8',
          500: '#d4b896',
          600: '#c49f74',
          700: '#a8845d',
          800: '#8a6b4d',
          900: '#735841',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'serif': ['Crimson Text', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'book-spine': 'linear-gradient(135deg, #6e3737 0%, #5a2e2e 50%, #6e3737 100%)',
        'paper-texture': 'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
      },
      boxShadow: {
        'book': '0 4px 20px rgba(110, 55, 55, 0.15), 0 8px 32px rgba(110, 55, 55, 0.1)',
        'book-hover': '0 8px 30px rgba(110, 55, 55, 0.2), 0 12px 40px rgba(110, 55, 55, 0.15)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'page-turn': 'pageTurn 0.6s ease-in-out',
        'gold-shimmer': 'goldShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        pageTurn: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-20deg)' },
        },
        goldShimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}