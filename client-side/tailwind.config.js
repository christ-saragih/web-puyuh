/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        jumbotron_aboutus: "url('/src/assets/images/jumbotron-aboutus.png')",
      },
    },
  },
  variants: {
    extend: {
      width: ["responsive", "hover", "focus", "active", "group-hover"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".transition-width": {
          transition: "width 0.3s ease-in-out",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
