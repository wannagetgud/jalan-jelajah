/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "image-login": "url('/assets/background.png')",
        "image-profile": "url('/assets/bottom-image-profile.png')",
      },
      screens: {
        fold: "280px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "2xs": "9px",
      },
      colors: {
        "c-textwhite": "#F6F6F6",
        "c-textblack": "#272D2F",
        "c-orange": "#FF7143",
        "c-white": "#FAFAFA",
        "c-pink1": "#FD3163",
        "c-pink2": "#EF2E5F",
        "c-blue": "#0D92EB",
        "c-grey": "#E9E9E9",
        "c-grey2": "36B6B6B",
      },
      boxShadow: {
        card: "3px 4px 10px 4px rgba(0, 0, 0, 0.1)",
        home: "6px 6px 20px 2px rgba(0, 0, 0, 0.1);",
      },
    },
  },
  plugins: [],
};
