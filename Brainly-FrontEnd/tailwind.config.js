/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: (255, 255, 255, 0.5),
          100:"#eeeeef",
          200: "#e6e9ed",
          600: "#95989c"
        },
        
        purple: {
          200: "#d9ddee",
          500: "#9493db",
          600: "#7164c0",
        }
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
      },
    },
  },
  plugins: [],
}