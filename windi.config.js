/* eslint-disable global-require */

module.exports = {
  darkMode: 'class',
  extract: {
    exclude: ['build/sw.js', 'build/js/**/*.js']
  },
  theme: {
    screens: {
      xs: '412px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1536px'
    },
    variants: {
      extend: {
        backgroundColor: ['any-hover'],
        textColor: ['any-hover']
      }
    }
  },
  plugins: [
    require('windicss-media-interaction'),
    require('windicss-content-visibility'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/scroll-snap'),
    require('@windicss/plugin-animations'),
    require('@windicss/plugin-question-mark')
  ]
}
