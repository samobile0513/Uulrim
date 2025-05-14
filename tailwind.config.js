/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01a69f", // 청록색
        secondary: "#fd3941", // 빨간색
        gray: "#d9d9d9", // 회색
        yellow: "#FAD53B", // 노란색
      },
      fontFamily: {
        sans: ["Paperlogy", "sans-serif"],
      },
      fontSize: {
        "base-8": "15.8px", // 네비게이션 메뉴용
      },
      screens: {
        'custom-819': { 'max': '819px' }, // 819px 이하에서 적용
      },
    },
  },
  plugins: [],
}