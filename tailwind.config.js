/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial-gradient': 'radial-gradient(circle at 120.71% 50%, #9db9f2 0, #9db9f2 50%, #9db9f2 100%)',
      },
      fontFamily: {
        'custom-font-roboto-mono': ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

