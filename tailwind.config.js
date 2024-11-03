/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // nextui line
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Roboto', 'sans-serif'], 
      },
      backgroundImage: {
        "devGarrageBGImage": "url('/macBgThree.jpg')",
        "bgLight": "url('/macBgOneV2.jpg')",
        "bgDark": "url('/macBgThree.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "macBgOne": "url('/macBgOne.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
