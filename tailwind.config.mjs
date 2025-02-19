import { Orbitron, Space_Grotesk } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: '#fcf4ff',
        darkHover: '#11001F',
      },
      fontFamily: {
        Space_Grotesk: ["SpaceGrotesk", "serif"],
        Roboto: ["Roboto", "sans-serif"],
        Sixtyfour: ["Sixtyfour", "sans-serif"],
        Orbitron: ["Orbitron", "sans-serif"],
        Ruda: ["Ruda", "sans-serif"],
      },
    },
  },
  plugins: [],
};
