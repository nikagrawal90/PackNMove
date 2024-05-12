module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dashboard": "url('/public/house.png')",
      },
      fontFamily: {
        'titillium-web': ['Titillium Web', 'sans-serif'],
      },
      backgroundColor: (theme) => ({
        'ccdaaf': '#CCDAFF'
      }),
    },
  },
  plugins: [],
};
