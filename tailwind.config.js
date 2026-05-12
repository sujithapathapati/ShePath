/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f3ecff', 
          200: '#e9dcff',
          300: '#d8c1ff',
          400: '#c396ff',
          500: '#DDA0DD', // Plum Pink
          600: '#c589c5',
          700: '#a871a8',
          800: '#8c5e8c',
          900: '#714e71',
        },
        secondary: {
          50: '#fefefe',
          100: '#fcfcff',
          200: '#f9f9ff',
          300: '#f3f3ff',
          400: '#ebebff',
          500: '#E6E6FA', // Lavender
          600: '#d1d1e8',
          700: '#b8b8d1',
          800: '#9d9dba',
          900: '#8080a3',
        },
        accent: {
          50: '#fef9f3',
          100: '#fef1e6',
          200: '#fde0c7',
          300: '#fbc898',
          400: '#f9a866',
          500: '#CC7722', // Gold Ochre
          600: '#b86b1f',
          700: '#9d5e1c',
          800: '#825219',
          900: '#6b4416',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#36454F', // Charcoal
          900: '#202124',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};