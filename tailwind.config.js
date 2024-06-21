/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      textColor: {
        primary: "#3B63F4",
        bold: "#0056D2",
      },
      backgroundColor: {
        primary: "#D2F1FF",
        secondary: "#3B63F4",
        bold: "#0056D2",
      },
      borderColor: {
        primary: "#3B63F4",
      },
    },
  },
  plugins: [],
};
