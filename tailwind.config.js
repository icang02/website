/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'dmsans': ['DM Sans', 'sans-serif'],
      'worksans': ['Work Sans', 'sans-serif'],
    },
    extend: {}
  },
  plugins: [],
}
