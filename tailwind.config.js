/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "home-hero": "url('/src/assets/home-hero.jpg')",
      },
      colors: {
        background: "#eae6db",
      },
    },
  },
  plugins: [],
};
