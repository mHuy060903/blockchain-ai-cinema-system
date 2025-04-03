/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-black": "#0D1515",
        "light-green": "#A1FED4",
        "light-blue": "#49E6E9",
        "light-purpose": "#5C7AFF",
      },
      backgroundColor: {
        "light-black": "#0D1515",
      },
      boxShadowColor: {
        "light-green": "#A1FED4",
      },
    },
  },
  plugins: [],
};
