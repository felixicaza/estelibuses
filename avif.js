/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const imagemin = (await import('imagemin')).default
  const imageminAvif = (await import('imagemin-avif')).default

  const files = await imagemin(['build/img/*.{jpg,jpeg,png}'], {
    destination: 'public/img',
    plugins: [imageminAvif({ quality: 30, speed: 4 })]
  })

  files.forEach(file => console.log('Converted AVIF:', file.destinationPath))

  const terminalNorteImages = await imagemin(
    ['build/img/terminal-norte/*.{jpg,jpeg,png}'],
    {
      destination: 'public/img/terminal-norte',
      plugins: [imageminAvif({ quality: 30, speed: 4 })]
    }
  )

  terminalNorteImages.forEach(image =>
    console.log('Converted AVIF:', image.destinationPath)
  )

  const terminalSurImages = await imagemin(
    ['build/img/terminal-sur/*.{jpg,jpeg,png}'],
    {
      destination: 'public/img/terminal-sur',
      plugins: [imageminAvif({ quality: 30, speed: 4 })]
    }
  )

  terminalSurImages.forEach(image =>
    console.log('Converted AVIF:', image.destinationPath)
  )
})()
