import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        'xs': {'max': '550px'},
        'xxs': {'max': '420px'}
      },
      fontFamily: {
        quicksand: [`var(--font-quicksand)`, "manrope"],
        inter: [`var(--font-inter)`, "manrope"],
      },
      colors: {
        'brand-primary': '#211F34',
        'brand-secondary': '#008A90',
        'brand-cyan': '#0ec29f',
        'brand-blue': '#318fd8',
        'brand-yellow': '#e3ab22',
        'brand-red': '#f62f17',
        'brand-gray-light': '#878082',
        'brand-gray-dark': '#232525',
        'brand-black': '#080808',
        'brand-black-bg': '#0C0300',
        'brand-grey-2': '#4F4F4F',
        'brand-grey-3': '#393938',
        'brand-grey-4': '#9E9D9D',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(20deg)' },
          '30%': { transform: 'rotate(-24deg)' },
          '40%': { transform: 'rotate(20deg)' },
          '50%': { transform: 'rotate(-20deg)' },
          '60%': { transform: 'rotate(20deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        pulsing: {
          '50%': {
            opacity: '0.2',
          },
        },
        loadspin: {
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        slideUp: {
          '70%': {
            opacity: '0.7',
            transform: 'translateY(50px)',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideDown: {
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideNavUp: {
          '100%': {
            transform: 'translateY(-112px)',
            opacity: '0',
          },
        },
        fadeOut: {
          '50%': {
            opacity: '0.7',
          },
          '100%': {
            opacity: '1',
          },
        },
        rotate3d: {
          '0%': {
            transform: 'rotateY(0)',
          },
          '50%': { opacity: '0.5' },

          '100%': {
            transform: 'rotateY(360deg)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        slideUp: 'slideUp 1s 0.2s ease forwards',
        loadspin: 'loadspin 1.2s linear infinite',
        pulsing: 'pulsing 1.5s ease infinite',
        rotate3d:
          'rotate3d 2s 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite',
        slideDown: 'slideDown 1s 0.2s ease forwards',
        slideNavUp: 'slideDown 1s 0.2s ease forwards',
        wave: 'wave 2s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
