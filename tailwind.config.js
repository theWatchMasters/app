const { platformSelect } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**.tsx", "./components/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter: platformSelect({
          android: 'Inter_400Regular',
          ios: 'Inter-Regular',
        }),
        "inter-bold": ["Inter-Bold"],
        "inter-italic": ["Inter-Italic"],
        "inter-bold-italic": ["Inter-BoldItalic"],
        "inter-medium": ["Inter-Medium"],
        "inter-semibold": ["Inter-SemiBold"],
      }
    },
  },
  plugins: [],
}