/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ai: {
          dark: '#0f172a',
          accent: '#3b82f6',
          light: '#e2e8f0',
          gradientStart: '#1d4ed8',
          gradientEnd: '#9333ea',
        }
      }
    },
  },
  plugins: [],
}
