/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      abc: ['Great Vibes', 'cursive'],
      philo: ['Philosopher', 'sans-serif']
    }
  },
  images: {
    domains: ['flyer250.com/restaurant']
  },
  variants: {
    extend: {
      opacity: ['group-focus']
    },
  },
  plugins: [],
}
