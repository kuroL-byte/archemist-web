/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7',
          600: '#026aa2',
          800: '#075985',
          900: '#0f172a',
          950: '#070b14',
        },
        archemist: {
          orange: '#f36e21',
          charcoal: '#3f4448',
          gear: '#4b5563',
        },
      },
    },
  },
  plugins: [],
}