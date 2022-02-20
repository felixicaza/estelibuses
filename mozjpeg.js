/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const imagemin = (await import('imagemin')).default
  const imageminMozjpeg = (await import('imagemin-mozjpeg')).default

  const files = await imagemin(['build/img/**/*.{jpg,jpeg}'], {
    destination: 'public/img',
    plugins: [
      imageminMozjpeg({
        quality: 75
      })
    ]
  })

  files.forEach(file => console.log('Converted:', file.destinationPath))
})()
