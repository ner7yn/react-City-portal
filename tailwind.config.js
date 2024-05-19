const { colors } = require('@mui/material')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
      }
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl'), fontWeight: 500 },
        'h2': { fontSize: theme('fontSize.3xl'), fontWeight: 600 },
        'h3': { fontSize: theme('fontSize.lg'), fontWeight: 600 },
      })
    })
  ],
}
