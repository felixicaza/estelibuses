/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const cpy = require('cpy')

// eslint-disable-next-line import/newline-after-import
;(async () => {
  await cpy('build/robots.txt', 'public/').on('progress', data => {
    console.log(data)
  })

  await cpy('build/sitemap.xml', 'public/').on('progress', data => {
    console.log(data)
  })

  await cpy('build/manifest.json', 'public/').on('progress', data => {
    console.log(data)
  })

  await cpy('build/google4ed26fc938fd8294.html', 'public/').on(
    'progress',
    data => {
      console.log(data)
    }
  )

  await cpy('build/img/*.avif', 'public/img/').on('progress', data => {
    console.log(data)
  })

  await cpy(
    'build/img/terminal-norte/**/*.avif',
    'public/img/terminal-norte/'
  ).on('progress', data => {
    console.log(data)
  })

  await cpy('build/img/logo.svg', 'public/img/').on('progress', data => {
    console.log(data)
  })

  await cpy('build/img/terminal-sur/**/*.avif', 'public/img/terminal-sur/').on(
    'progress',
    data => {
      console.log(data)
    }
  )

  await cpy('build/anuncios/**/*.webp', 'public/anuncios/').on(
    'progress',
    data => {
      console.log(data)
    }
  )

  await cpy(
    'build/img/san-juan-de-limay/*.avif',
    'public/img/san-juan-de-limay/'
  ).on('progress', data => {
    console.log(data)
  })

  await cpy('build/img/ocotal/*.avif', 'public/img/ocotal/').on(
    'progress',
    data => {
      console.log(data)
    }
  )

  // await cpy('build/ads.txt', 'public/').on('progress', data => {
  //   console.log(data)
  // })

  await cpy('build/favicons/favicon.ico', 'public/favicons/').on(
    'progress',
    data => {
      console.log(data)
    }
  )

  await cpy('build/favicons/safari-pinned-tab.svg', 'public/favicons/').on(
    'progress',
    data => {
      console.log(data)
    }
  )

  await cpy('build/favicons/browserconfig.xml', 'public/favicons/').on(
    'progress',
    data => {
      console.log(data)
    }
  )

  await cpy('build/sounds/*.mp3', 'public/sounds/').on('progress', data => {
    console.log(data)
  })
})()
