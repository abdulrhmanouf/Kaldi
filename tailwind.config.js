/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#F5F1EA',
        sand: '#D8C3A5',
        coffee: {
          light: '#8B6B4A',
          DEFAULT: '#8B6B4A',
          dark: '#4B352A',
        },
        charcoal: '#1E1E1E',
        brand: {
          50: '#faf7f2',
          100: '#F5F1EA',
          200: '#ebe3d5',
          300: '#D8C3A5',
          400: '#c9a87a',
          500: '#8B6B4A',
          600: '#6d5439',
          700: '#4B352A',
          800: '#3a2821',
          900: '#1E1E1E',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        ibm: ['IBM Plex Sans Arabic', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'soft-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'coffee': '0 8px 30px rgba(139, 107, 74, 0.2)',
        'coffee-lg': '0 15px 50px rgba(139, 107, 74, 0.25)',
      },
      backgroundImage: {
        'gradient-coffee': 'linear-gradient(135deg, #D8C3A5 0%, #8B6B4A 100%)',
        'gradient-coffee-dark': 'linear-gradient(135deg, #4B352A 0%, #1E1E1E 100%)',
        'gradient-soft': 'linear-gradient(180deg, rgba(245, 241, 234, 0) 0%, rgba(245, 241, 234, 0.8) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
