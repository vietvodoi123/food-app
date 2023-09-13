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
      },
      screens: {
        ss: "370px",
        ssl: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        scroll: "scrollAnimation 2s 2 ease-linear",
      },
      keyframes: {
        scrollAnimation: {
          "0,100%": { transform: "translateY(0)" },
          "20%,60%": { transform: "translateY(-10px)" },
          "40%,80%": { transform: "translate(10px)" },
        },
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        red: "#ffa8a8",
        red1: "#ff6b6b",
        primary: "#f5f3f3",
        facebook: "#228be6",
        delivery: "#ffe8cc",
        orange: "#fff4e6",
        orange1: "#ff922b",
        textDelivery: "#f76707",
        blue: "#339af0",
        gray: "#f1f3f5",
        gray2: "#e9ecef",
        gray0: "#f8f9fa",
        grape: "#da77f2",
      },
    },
  },
  safelist: [
    "animate-[fade-in_1s_ease-in-out]",
    "animate-[fade-in-down_1s_ease-in-out]",
    "animate-[fade-in-right_3s_ease-in-out]",
    "animate-[fade-in-left_3s_ease-in-out]",
  ],
  plugins: [],
};
