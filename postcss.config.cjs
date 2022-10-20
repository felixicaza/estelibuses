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
      require('autoprefixer')
    )
  }

  return {
    plugins
  }
}

module.exports = addPlugins
