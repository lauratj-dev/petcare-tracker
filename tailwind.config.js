/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
   colors: {
  primary: "#8B4FA8",      // Púrpura principal
  primaryLight: "#B366D9", // Púrpura claro
  primaryDark: "#6B3A88",  // Púrpura oscuro
  secondary: "#E91E8C",    // Magenta/Pink vibrante
  secondaryLight: "#F04A9C", // Magenta claro
  accent: "#FFD700",       // Oro/Amarillo
  accentLight: "#FFF4A3",  // Amarillo claro
  success: "#26DE81",      // Verde
  dark: "#2D3436",         // Gris oscuro
  light: "#FAF7F2",        // Crema/Beige claro
  cream: "#F5F0EB",        // Fondo crema
  purple: "#8B4FA8",
  magenta: "#E91E8C",
},
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}