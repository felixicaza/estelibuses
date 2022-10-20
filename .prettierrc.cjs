module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    },
    {
      files: '*.{yaml,yml}',
      options: {
        tabWith: 3
      }
    }
  ],
  plugins: [
    require.resolve('prettier-plugin-astro'),
    require('prettier-plugin-tailwindcss')
  ],
  astroAllowShorthand: true
}
