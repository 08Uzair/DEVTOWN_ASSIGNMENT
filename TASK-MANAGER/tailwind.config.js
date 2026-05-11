/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0a0a0f',
          900: '#12121a',
          800: '#1c1c28',
          700: '#26263a',
          600: '#3a3a52',
        },
        acid: {
          DEFAULT: '#b8ff57',
          dim: '#8fd43a',
        },
        mist: {
          DEFAULT: '#e8e8f0',
          dim: '#9898b0',
        },
      },
    },
  },
  plugins: [],
}
