/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",      // Rojo cálido
        secondary: "#4ECDC4",    // Turquesa
        accent: "#FFE66D",       // Amarillo cálido
        dark: "#2D3436",         // Gris oscuro
        light: "#F8F9FA",        // Gris claro
        success: "#26DE81",      // Verde suave
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}