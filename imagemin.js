;(async () => {
  const imagemin = (await import('imagemin')).default
  const imageminPngquant = (await import('imagemin-pngquant')).default
  const imageminMozjpeg = (await import('imagemin-mozjpeg')).default

  async function minify(entry, dest) {
    ;(
      await imagemin([entry], {
        destination: dest,
        plugins: [
          imageminPngquant({
            strip: true,
            quality: [0.65, 0.75]
          }),
          imageminMozjpeg({
            quality: 75
          })
        ]
      })
    ).forEach((file) => console.log('Converted:', file.destinationPath))
  }

  minify('dist/favicons/*.png', 'dist/favicons')
  minify('dist/manifest/*.png', 'dist/manifest')
  minify('dist/img/terminal-sur/*.{jpg,jpeg}', 'dist/img/terminal-sur')
  minify('dist/img/terminal-norte/*.{jpg,jpeg}', 'dist/img/terminal-norte')
  minify('dist/img/leon/*.{jpg,jpeg}', 'dist/img/leon')
  minify('dist/img/ocotal/*.{jpg,jpeg}', 'dist/img/ocotal')
  minify('dist/img/og/*.{jpg,jpeg}', 'dist/img/og')
  minify(
    'dist/img/san-juan-de-limay/*.{jpg,jpeg}',
    'dist/img/san-juan-de-limay'
  )
  minify('dist/img/*.{png,jpg,jpeg}', 'dist/img')
})()
