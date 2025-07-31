/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '95': '95%',
      },
      boxShadow: {
        'light': '0 8px 15px rgba(0, 0, 0, 0.07)',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 1s ease-in-out',
      },
    },
  },
  plugins: [],
}

