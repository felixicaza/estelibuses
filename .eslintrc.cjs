module.exports = {
  env: {
    browser: true,
    es2021: true,
    serviceworker: true
  },
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'standard',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      rules: {
        'no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^[A-Z]'
          }
        ]
      }
    },
    {
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      env: {
        browser: true,
        es2021: true,
        serviceworker: true
      },
      parserOptions: {
        sourceType: 'module'
      }
    }
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/components'],
          ['@data', './src/data'],
          ['@layouts', './src/layouts'],
          ['@scripts', './src/scripts'],
          ['@styles', './src/styles']
        ],
        extensions: ['.astro']
      }
    }
  }
}
