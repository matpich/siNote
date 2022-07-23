/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'list-back': "url('https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif']
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
