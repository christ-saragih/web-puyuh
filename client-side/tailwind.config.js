/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
      backgroundImage: {
        jumbotron_aboutus: "url('/src/assets/images/jumbotron-aboutus.png')",
      }
    },
  },
  plugins: [],
};
