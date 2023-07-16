module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,js,jsx}',
    './src/data/*.json',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    screens: {
      us: '375px',
      xs: '411px',
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
    require('flowbite/plugin'),
    function ({ addVariant }) {
      addVariant('any-hover', '@media (any-hover: hover) { &:hover }')
      addVariant(
        'group-any-hover',
        '@media (any-hover: hover) { .group:hover & }'
      )
      addVariant('group-open', ':merge(.open)[open] &')
    }
  ]
}
