module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,js}', './src/data/*.json'],
  theme: {
    screens: {
      xs: '412px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1536px'
    }
  },
  // Add custom plugin for suport media any-hover
  // See: https://github.com/tailwindlabs/tailwindcss/pull/7939#issuecomment-1079387869
  plugins: [
    function ({ addVariant }) {
      addVariant('any-hover', '@media (any-hover: hover) { &:hover }')
    }
  ]
}
