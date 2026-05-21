/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#e8f9ec',
          100: '#c9f0d2',
          200: '#99e2af',
          300: '#69d08a',
          400: '#44b86b',
          500: '#2f9c55',
          600: '#207f45',
          700: '#176539',
          800: '#124f2f',
          900: '#0a3522',
          950: '#03190f',
        },
        mist: '#03130d',
        ink: '#e8f3ec',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(2, 16, 10, 0.45)',
      },
      animation: {
        'fade-up': 'fadeUp 700ms ease both',
        'slow-pulse': 'slowPulse 7s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
