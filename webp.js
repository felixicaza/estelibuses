/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */

// eslint-disable-next-line import/newline-after-import
;(async () => {
  const imagemin = (await import('imagemin')).default
  const imageminWebp = (await import('imagemin-webp')).default

  const files = await imagemin(['build/img/*.{jpg,jpeg,png}'], {
    destination: 'public/img',
    plugins: [imageminWebp({ quality: 75 })]
  })

  files.forEach(file => console.log('Converted:', file.destinationPath))

  const terminalNorteImages = await imagemin(
    ['build/img/terminal-norte/*.{jpg,jpeg,png}'],
    {
      destination: 'public/img/terminal-norte',
      plugins: [imageminWebp({ quality: 75 })]
    }
  )

  terminalNorteImages.forEach(image =>
    console.log('Converted:', image.destinationPath)
  )

  const terminalSurImages = await imagemin(
    ['build/img/terminal-sur/*.{jpg,jpeg,png}'],
    {
      destination: 'public/img/terminal-sur',
      plugins: [imageminWebp({ quality: 75 })]
    }
  )

  terminalSurImages.forEach(image =>
    console.log('Converted:', image.destinationPath)
  )
})()