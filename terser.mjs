/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import {readFileSync, mkdir, writeFileSync} from 'fs'
import {relative, dirname} from 'path'

import {globbySync} from 'globby'
import { minify } from 'terser'

const files = globbySync(['build/js/**/*.js'])

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
  const terser = await minify(readFileSync(file, 'utf8'), options)

  const pathFile = relative('build', dirname(file))
  const filename = relative('build', file)

  mkdir(`public/${pathFile}`, { recursive: true }, err => {
    if (err) return console.log('Error:', err)

    return writeFileSync(`public/${filename}`, terser.code, 'utf8')
  })
})

/**
 * Compress Service Worker
 */

const sw = readFileSync('build/sw.js', 'utf8')

const minifySW = await minify(sw, options)

writeFileSync('public/sw.js', minifySW.code, 'utf8')
