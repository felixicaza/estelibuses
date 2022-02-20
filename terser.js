/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')

const fg = require('fast-glob')
const { minify } = require('terser')

const files = fg.sync(['build/js/**/*.js'])

const options = {
  compress: {
    ecma: 2015
  },
  format: {
    comments: false,
    ecma: 2015
  }
}

files.forEach(async file => {
  const terser = await minify(fs.readFileSync(file, 'utf8'), options)

  const pathFile = path.relative('build', path.dirname(file))
  const filename = path.relative('build', file)

  fs.mkdir(`public/${pathFile}`, { recursive: true }, err => {
    if (err) return console.log('Error:', err)

    return fs.writeFileSync(`public/${filename}`, terser.code, 'utf8')
  })
})
