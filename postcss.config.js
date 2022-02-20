/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

/*
  For postcss-sorting, use CSScomb.js
  Reference: https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json
 */

const env = process.env.NODE_ENV === 'production'

const plugins = [require('postcss-preset-env')]

const addPlugins = () => {
  if (env) {
    plugins.push(
      require('postcss-sort-media-queries'),
      require('cssnano')({
        preset: [
          'advanced',
          {
            autoprefixer: false,
            discardUnused: false
          }
        ]
      }),
      require('postcss-will-change-transition'),
      require('postcss-momentum-scrolling'),
      require('postcss-pxtorem')({
        propList: ['*']
      }),
      require('postcss-urlrev')({
        includeRemote: true,
        hashLength: 7
      }),
      // require('postcss-sorting')({
      //   order: [
      //     'custom-properties',
      //     'dollar-variables',
      //     'declarations',
      //     'at-rules',
      //     'rules'
      //   ],

      //   'properties-order': [
      //     'font',
      //     'font-family',
      //     'font-size',
      //     'font-weight',
      //     'font-style',
      //     'font-variant',
      //     'font-size-adjust',
      //     'font-stretch',
      //     'font-effect',
      //     'font-emphasize',
      //     'font-emphasize-position',
      //     'font-emphasize-style',
      //     'font-smooth',
      //     'line-height',

      //     'position',
      //     'z-index',
      //     'top',
      //     'right',
      //     'bottom',
      //     'left',

      //     'display',
      //     'visibility',
      //     'float',
      //     'clear',
      //     'overflow',
      //     'overflow-x',
      //     'overflow-y',
      //     'clip',
      //     'zoom',
      //     'align-content',
      //     'align-items',
      //     'align-self',
      //     'flex',
      //     'flex-flow',
      //     'flex-basis',
      //     'flex-direction',
      //     'flex-grow',
      //     'flex-shrink',
      //     'flex-wrap',
      //     'justify-content',
      //     'order',

      //     'box-sizing',
      //     'width',
      //     'min-width',
      //     'max-width',
      //     'height',
      //     'min-height',
      //     'max-height',
      //     'margin',
      //     'margin-top',
      //     'margin-right',
      //     'margin-bottom',
      //     'margin-left',
      //     'padding',
      //     'padding-top',
      //     'padding-right',
      //     'padding-bottom',
      //     'padding-left',

      //     'table-layout',
      //     'empty-cells',
      //     'caption-side',
      //     'border-spacing',
      //     'border-collapse',
      //     'list-style',
      //     'list-style-position',
      //     'list-style-type',
      //     'list-style-image',

      //     'content',
      //     'quotes',
      //     'counter-reset',
      //     'counter-increment',
      //     'resize',
      //     'cursor',
      //     'user-select',
      //     'nav-index',
      //     'nav-up',
      //     'nav-right',
      //     'nav-down',
      //     'nav-left',
      //     'transition',
      //     'transition-delay',
      //     'transition-timing-function',
      //     'transition-duration',
      //     'transition-property',
      //     'transform',
      //     'transform-origin',
      //     'animation',
      //     'animation-name',
      //     'animation-duration',
      //     'animation-play-state',
      //     'animation-timing-function',
      //     'animation-delay',
      //     'animation-iteration-count',
      //     'animation-direction',
      //     'text-align',
      //     'text-align-last',
      //     'vertical-align',
      //     'white-space',
      //     'text-decoration',
      //     'text-emphasis',
      //     'text-emphasis-color',
      //     'text-emphasis-style',
      //     'text-emphasis-position',
      //     'text-indent',
      //     'text-justify',
      //     'letter-spacing',
      //     'word-spacing',
      //     'text-outline',
      //     'text-transform',
      //     'text-wrap',
      //     'text-overflow',
      //     'text-overflow-ellipsis',
      //     'text-overflow-mode',
      //     'word-wrap',
      //     'word-break',
      //     'tab-size',
      //     'hyphens',
      //     'pointer-events',

      //     'opacity',
      //     'color',
      //     'border',
      //     'border-width',
      //     'border-style',
      //     'border-color',
      //     'border-top',
      //     'border-top-width',
      //     'border-top-style',
      //     'border-top-color',
      //     'border-right',
      //     'border-right-width',
      //     'border-right-style',
      //     'border-right-color',
      //     'border-bottom',
      //     'border-bottom-width',
      //     'border-bottom-style',
      //     'border-bottom-color',
      //     'border-left',
      //     'border-left-width',
      //     'border-left-style',
      //     'border-left-color',
      //     'border-radius',
      //     'border-top-left-radius',
      //     'border-top-right-radius',
      //     'border-bottom-right-radius',
      //     'border-bottom-left-radius',
      //     'border-image',
      //     'border-image-source',
      //     'border-image-slice',
      //     'border-image-width',
      //     'border-image-outset',
      //     'border-image-repeat',
      //     'outline',
      //     'outline-width',
      //     'outline-style',
      //     'outline-color',
      //     'outline-offset',
      //     'background',
      //     'background-color',
      //     'background-image',
      //     'background-repeat',
      //     'background-attachment',
      //     'background-position',
      //     'background-position-x',
      //     'background-position-y',
      //     'background-clip',
      //     'background-origin',
      //     'background-size',
      //     'box-decoration-break',
      //     'box-shadow',
      //     'text-shadow'
      //   ],
      //   'unspecified-properties-position': 'bottom'
      // }),
      require('autoprefixer')
    )
  }

  return {
    plugins
  }
}

module.exports = addPlugins
