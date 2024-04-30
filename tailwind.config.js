/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Argon: ["Argon"],
        Krypton: ["Krypton"],
        Neon: ["Neon"],
        Radon: ["Radon"],
        Xenon: ["Xenon"],
      },
    },
  },
  plugins: [],
};
