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
  minify('dist/img/og/*.{jpg,jpeg}', 'dist/img/og')
})()
