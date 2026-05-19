/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#eefaf0',
          100: '#d8f2dd',
          200: '#b2e6bf',
          300: '#80d99b',
          400: '#56c976',
          500: '#30b15b',
          600: '#1f944d',
          700: '#127941',
          800: '#085f35',
          900: '#034a2c',
          950: '#012f1e',
        },
        mist: '#f3f7f5',
        ink: '#0f241b',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(1, 47, 30, 0.16)',
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
