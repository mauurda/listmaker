/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        140: "44rem",
      },
    },
  },
  plugins: [],
  whitelist: ["text-transparent", "text-white"],
  plugins: [require("tailwind-scrollbar-hide")],
};
