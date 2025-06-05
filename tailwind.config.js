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
        // Exact colors from the user's color palette
        'palette-light': '#C1BCB9',      // Light grayish tone
        'palette-medium': '#A09790',     // Medium gray-brown
        'palette-dark': '#3D392E',       // Dark brown/charcoal
        'palette-warm': '#C88C5A',       // Warm brown/tan
        'palette-deepest': '#181510',    // Very dark brown/black
        
        // Updated burgundy scale using palette colors
        burgundy: {
          50: '#F8F7F6',
          100: '#C1BCB9',   // Light tone from palette
          200: '#A09790',   // Medium tone from palette
          300: '#8B7E73',
          400: '#756B5E',
          500: '#5F5449',
          600: '#4A3D34',
          700: '#3D392E',   // Dark tone from palette
          800: '#2A241C',
          900: '#181510',   // Deepest tone from palette
        },
        cream: {
          50: '#FEFDFB',
          100: '#C1BCB9',   // Using palette light tone
          200: '#B8B2AE',
          300: '#AFA79F',
          400: '#A09790',   // Using palette medium tone
          500: '#8F8479',
          600: '#7E7164',
          700: '#6D5E4F',
          800: '#C88C5A',   // Using palette warm tone
          900: '#5C4B3A',
        },
        silhouette: {
          light: '#C1BCB9',  // Light tone from palette
          dark: '#3D392E',   // Dark tone from palette
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'maze-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A09790' fill-opacity='0.08'%3E%3Cpath d='M30 0v30h30V0H30zm15 15v15h15V15H45zM0 30v30h30V30H0zm15 15v15h15V30H15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        'book-gradient': 'linear-gradient(135deg, #C1BCB9 0%, #A09790 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #3D392E 0%, #181510 100%)',
        'silhouette-gradient': 'linear-gradient(45deg, #C1BCB9 0%, #3D392E 100%)',
        'palette-gradient': 'linear-gradient(135deg, #C88C5A 0%, #A09790 50%, #3D392E 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'book': '0 10px 25px -5px rgba(24, 21, 16, 0.3), 0 4px 6px -2px rgba(24, 21, 16, 0.1)',
        'book-hover': '0 20px 35px -5px rgba(24, 21, 16, 0.4), 0 8px 10px -2px rgba(24, 21, 16, 0.2)',
        'palette': '0 10px 25px -5px rgba(61, 57, 46, 0.3), 0 4px 6px -2px rgba(61, 57, 46, 0.1)',
      }
    },
  },
  plugins: [],
}