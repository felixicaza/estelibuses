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

  await cpy('build/img/terminal-sur/**/*.avif', 'public/img/terminal-sur/').on(
    'progress',
    data => {
      console.log(data)
    }
  )
})()
