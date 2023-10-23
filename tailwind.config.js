const colors = require("tailwindcss/colors");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

var moment = require("moment");
moment().format();

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      accentColor: '#8542ff',
      darkBg: "#1f1f23",
      darkColor: "#2d2d34",
      red: '#ff2424',
      redOpacity: '#ff242440'
    },
    extend: {},
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ["es-us", "ru"],
    }),
  ],
}