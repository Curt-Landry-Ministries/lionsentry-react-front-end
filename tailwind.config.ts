import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors');

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {...colors},
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#017FA2'
        },
        'blue': {
          DEFAULT: '#01A0CC'
        },
        'text-black': {
          DEFAULT: '#333333'
        },
        'black': '#00031B',
        'cloud': {
          DEFAULT: '#F3FAFF'
        },
        'cloud-dark': {
          DEFAULT: '#E5F0F5'
        },
        'cloud-darker': {
          DEFAULT: '#D1DCE1'
        },
        'navy': {
          DEFAULT: '#001956'
        },
        'navy-hover': {
          DEFAULT: '2A4077'
        },
        'inactive': {
          DEFAULT: '#767676'
        },
        'gradient-red': {
          DEFAULT: '#AD2444'
        },
        'gradient-yellow': {
          DEFAULT: '#d48637'
        },
        'gradient-blue': {
          DEFAULT: '#4394bf'
        },
        'gradient-purple': {
          DEFAULT: '#6d55cb'
        },
        'gradient-pink': {
          DEFAULT: '#a22a96'
        }
      },
      backgroundImage: ({ theme }) => ({
        "gradient-1": `linear-gradient(90deg, ${theme('colors.gradient-blue.DEFAULT')} 0%,${theme('colors.gradient-purple.DEFAULT')} 23%,${theme('colors.gradient-pink.DEFAULT')} 49%,${theme('colors.gradient-red.DEFAULT')} 77%, ${theme('colors.gradient-yellow.DEFAULT')} 100%)`,
        "gradient-1-vertical": `linear-gradient(${theme('colors.gradient-blue.DEFAULT')} 0%,${theme('colors.gradient-purple.DEFAULT')} 23%,${theme('colors.gradient-pink.DEFAULT')} 49%,${theme('colors.gradient-red.DEFAULT')} 77%, ${theme('colors.gradient-yellow.DEFAULT')} 100%)`,
        "gradient-2": `linear-gradient(90deg, ${theme('colors.gradient-purple.DEFAULT')} 0%,${theme('colors.gradient-pink.DEFAULT')} 26%,${theme('colors.gradient-blue.DEFAULT')} 50%,${theme('colors.gradient-purple.DEFAULT')} 73%, ${theme('colors.gradient-red.DEFAULT')} 100%)`,
        "gradient-3": `linear-gradient(90deg, transparent 0%, ${theme('colors.navy.DEFAULT')} 32%, ${theme('colors.navy.DEFAULT')} 67%, transparent 100%)`,
        "gradient-4": `linear-gradient(transparent 3%, ${theme('colors.navy.DEFAULT')} 100%)`,
        "gradient-5": `linear-gradient(transparent 0%, ${theme('colors.navy.DEFAULT')} 20%, ${theme('colors.navy.DEFAULT')} 72%, transparent 100%)`,
        "gradient-3-dark": `linear-gradient(90deg, transparent 0%, ${theme('colors.black')} 32%, ${theme('colors.black')} 67%, transparent 100%)`,
        "gradient-4-dark": `linear-gradient(transparent 3%, ${theme('colors.black')} 100%)`,
        "gradient-5-dark": `linear-gradient(transparent 0%, ${theme('colors.black')} 20%, ${theme('colors.black')} 72%, transparent 100%)`,

      }),
      padding: {
        '2.5': '0.625rem'
      },
      borderRadius: {
        '2.5xl': '1.25rem'
      },
      fontFamily: {
        serif: ['var(--font-astoria)'],
        sans: ['var(--font-inter)']
      },
      gap: {
        '18': '4.5rem'
      },
      fontSize: {
        '12.5': '3.125rem',
        '17.5': '4.375rem'
      }
    },
  },
  plugins: [],
};
export default config;
