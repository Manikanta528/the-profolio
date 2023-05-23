/** @type {import('tailwindcss').Config} */
export default {
  darkMode : 'class',
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '420px',
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
    },
    extend: {
      fontFamily : {
        inter : ['Inter', 'sans-serif'],
      },
      colors: {
        primary : '#4FD1C5',
        backgroundDark : '#1A202C',
        textPrimaryDark : '#EDF2F7',
        textSecondaryDark : '#A0AEC0',
        background: '#FFFFFF',
        textPrimary : '#2D3748',
        textSecondary : '#718096',
      },
      backgroundImage: {
        'hero' : "url('./src/assets/main.svg')",
      }

    },
  },
  plugins: [],
}

