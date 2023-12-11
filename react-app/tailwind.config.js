/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        "tamno-zelena": "#087F5B",
        zelena: "#20C997",
        siva: "#DEE2E6",
      },
    },
  },
  plugins: [],
};
