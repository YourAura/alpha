/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'midnight': '#0A1324',
        'dark-navy': '#182C45',
        'bright-sky': '#4A7FBF',
        'slate-gray': '#2C394E',
        'lavender': '#d8dee9',
        'dark-crimson': '#530A0F',
        'vivid-green': '#48C774', // Success
        'sunny-yellow': '#FFE66D', // Warning
        'bright-red': '#FF6B6B'   // Error
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

