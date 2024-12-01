/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aptos: ["Aptos", "sans-serif"],
        aptosBold: ["Aptos Bold", "sans-serif"],
        aptosSemiBold: ["Aptos SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
