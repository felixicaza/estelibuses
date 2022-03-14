/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const imageminPngquant = require('imagemin-pngquant')

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const imagemin = (await import('imagemin')).default

  const files = await imagemin(['build/favicons/*.png'], {
    destination: 'public/favicons',
    plugins: [
      imageminPngquant({
        strip: true,
        quality: [0.65, 0.75]
      })
    ]
  })

  console.log(files)
})()

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const imageminImg = (await import('imagemin')).default

  const filesImg = await imageminImg(['build/img/**/*.png'], {
    destination: 'public/img',
    plugins: [
      imageminPngquant({
        strip: true,
        quality: [0.65, 0.75]
      })
    ]
  })

  console.log(filesImg)
})()

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const imageminImg = (await import('imagemin')).default

  const filesImg = await imageminImg(['build/img/blog/*.png'], {
    destination: 'public/img/blog',
    plugins: [
      imageminPngquant({
        strip: true,
        quality: [0.65, 0.75]
      })
    ]
  })

  console.log(filesImg)
})()
