module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        green: "#19207d",
        red: "#FF6868",
        secondary: "#555",
        prigmayBG: "#FCFCFC",
      },
    },
  },
  plugins: [require("daisyui")],
};
