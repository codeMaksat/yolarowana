/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: "false",
  lightMode: "true",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/json/data/*.{js,ts,jsx,tsx,mdx,json}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "992px",
      // => @media (min-width: 1199px) { ... }
      xl: "1170px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        transparent: "transparent",

        primary: {
          100: "#ddede8",
          200: "#abd1c6",
          300: "#F8F1F9",
          400: "#F3EEFD",
          700: "#F9F6FF",
          800: "#EAE4F6",
          900: "#645CBB",
        },
        gray: {
          100: "#F5F5F5",
          200: "#FAF8FF",
          300: "#D9D9D9",
          400: "#F9F5FF",
        },
        yellow: {
          500: "#FEF2D3",
          600: "#EFB41E",
          900: "#FFB038",
        },
        red: {
          500: "#F6E4E8",
          600: "#E87676",
        },

        dark: {
          700: "#2C2929",
          800: "#626262",
          900: "#190D1F",
        },
      },

      fontFamily: {
        "red-hat-display": [
          "Red Hat Display",
          "sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },

      fontSize: {
        "1xl": "20px",
        "2xl": "22px",
        "3xl": "35px",
        "4xl": "45px",
        "5xl": "60px",
        65: "65px",
        "6xl": "75px",
        md: "16px",
        30: "30px",
        25: "25px",
        15: "15px",
        13: "13px",
        12: "12px",
        10: "10px",
      },
      lineHeight: {
        md: "21px",
        xl: "24px",
        "1xl": "29px",
        "2xl": "26px",
        "3xl": "45px",
        "4xl": "59px",
        "5xl": "85px",
        "6xl": "99px",
      },

      spacing: {
        full: "100%",
      },
      boxShadow: {
        card: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "card-1": "0px 4px 10px rgba(25, 13, 31, 0.12)",
        "card-2": "0px 4px 10px rgba(0, 0, 0, 0.07)",
        "card-3": "0px 4px 10px rgba(25, 13, 31, 0.13)",
        box: "0px 4px 4px rgba(25, 13, 31, 0.1)",
        "box-1": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "box-2": "0px 3px 8px 0px rgba(100, 92, 187, 0.16)",
        "box-3": "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
        "box-4": "0px 4px 8px 0px rgba(0, 0, 0, 0.04)",
        btn: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
        input: "0px 2px 8px 0px rgba(25, 13, 31, 0.12)",
        "form-box": "0px 4px 12px 0px rgba(0, 0, 0, 0.10)",
        "select-box": "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        "7xl": "50px",
        "6xl": "40px",
        "5xl": "30px",
        "4xl": "20px",
        "2xl": "15px",
        "1xl": "12px",
        xl: "10px",
      },
      margin: {
        auto: "auto",
      },
      zIndex: {
        "-1": "-1",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      height: {
        "100vw": "100vw",
      },
      content: {},
      transitionDuration: {
        0: "0ms",
        3000: "3000ms",
      },
    },
  },
  plugins: [nextui()],
};
