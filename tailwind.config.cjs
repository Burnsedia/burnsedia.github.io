/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  content: ['./src/**/*.{html,js,astro,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        synthwave: {
          "bg": "slate-950"
        }
      }
    }
  },
  daisyui: {
    themes: ["synthwave"]
  }
};

