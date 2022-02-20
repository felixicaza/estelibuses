/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs')
const zlib = require('zlib')

const fg = require('fast-glob')

const files = fg.sync(['public/**/*.{html,css,js,woff2}'])

files.forEach(file => {
  // Create read and write streams
  const readStream = fs.createReadStream(file)
  const writeStream = fs.createWriteStream(`${file}.br`)

  // Create brotli compress object
  const brotli = zlib.createBrotliCompress({
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11
    }
  })

  // Pipe the read and write operations with brotli compression
  readStream.pipe(brotli).pipe(writeStream)
})
