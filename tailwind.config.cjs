/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  content: ['./src/**/*.{html,js,astro,tsx,jsx}'],
  // theme: {
  //   colors: {
  //     'blue': '#1fb6ff',
  //     'purple': '#7e5bef',
  //     'pink': '#ff49db',
  //     'orange': '#ff7849',
  //     'green': '#13ce66',
  //     'yellow': '#ffc82c',
  //     'gray-dark': '#273444',
  //     'gray': '#8492a6',
  //     'gray-light': '#d3dce6',
  //     'white': '#ffffff',
  //     'black': '#000',
  //     'background-color': '#1d1f23'
  //   },
  //   fontFamily: {
  //     sans: ['Graphik', 'sans-serif'],
  //     serif: ['Merriweather', 'serif'],
  //   },
  //   extend: {
  //     spacing: {
  //       '8xl': '96rem',
  //       '9xl': '128rem',
  //     },
  //     backgroundImage: {
  //       'hero-image': "url(assets/layered-waves.svg)",
  //       'bio-image': "url(assets/polygon-scatter.svg)",
  //     },
  //     borderRadius: {
  //       '4xl': '2rem',
  //     },
  //   }
  // },
  daisyui: {
     themes: ["synthwave"],
      extend:{
        colors:{
          synthwave:{
            "bg": "slate-950"
          }
        }
      }
  }
}

// {
//           mytheme: {
//           
//  "primary": "#00b1cd",
//           
//  "secondary": "#2dd4bf",
//           
//  "accent": "#0c4a6e",
//           
//  "neutral": "#6b7280",
//           
//  "base-100": "#1f2937",
//           
//  "info": "#0077dc",
//           
//  "success": "#14532d",
//           
//  "warning": "#c2410c",
//           
//  "error": "#881337",
//           },
//         },
