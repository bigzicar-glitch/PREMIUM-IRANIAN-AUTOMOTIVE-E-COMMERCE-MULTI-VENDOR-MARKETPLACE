/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'auto-black': '#080808',
        'auto-black2': '#171717',
        'auto-yellow': '#FFD400',
        'auto-gray': '#F4F4F4',
        'auto-dark': '#222222',
        'auto-muted': '#777777',
        'auto-success': '#168A52',
        'auto-error': '#D93636',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
