/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        check: {
          '0%': { strokeDashoffset: '30' }, // Start with the stroke "hidden"
          '100%': { strokeDashoffset: '0' }, // End with the stroke fully drawn
        },
      },
      animation: {
        check: 'check 1s ease-in-out forwards', // Define the animation with duration and easing
      },
    },
  },
  plugins: [],
}

