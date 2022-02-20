module.exports = {
  env: {
    browser: true,
    es2021: true,
    serviceworker: true
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  }
}
