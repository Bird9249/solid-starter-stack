/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
      colors: {
        primary:  { 
          50: "#fef2f2",
          100: "#ffe1e2",
          200: "#ffc9cb",
          300: "#fea3a6",
          400: "#fb6e73",
          500: "#f34046",
          600: "#e01f26",
          700: "#bd181e",
          800: "#9c181d",
          900: "#811b1f",
          950: "#46090b"
        }
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        fadeOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
        scaleIn: {
          from: {
            opacity: "0",
            scale: "0.8",
          },
          to: {
            scale: "1",
            opacity: "1",
          },
        },
        scaleOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
            scale: "0.8",
          },
        },
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideOut: {
          from: {
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out",
        "fade-out": "fadeOut 0.2s ease-in",
        "scale-in": "scaleIn 0.25s ease-out",
        "scale-out": "scaleOut 0.20s ease-in",
        "slide-in": "slideIn 0.25s ease-out",
        "slide-out": "slideOut 0.25s ease-in",
      },
    },
    fontFamily: {
      body: [
        "Noto Sans Lao",
        "Poppins",
      ],
      sans: [
        "Noto Sans Lao",
        "Poppins",
        "sans-serif",
      ],
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

