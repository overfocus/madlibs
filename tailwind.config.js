/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4CAF50',
        'primary-dark': '#45a049',
        'secondary': '#2196F3',
        'secondary-dark': '#0b7dda',
        'accent': '#9c27b0',
        'accent-dark': '#7B1FA2',
        'light-bg': '#f5f5f5',
        'dark-header': '#282c34',
      },
    },
  },
  plugins: [],
}
