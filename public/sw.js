/* eslint-disable no-undef */

/**
 * TODO: Use Workbox to manage service worker
 * See: https://github.com/tatethurston/astrojs-service-worker
 */

importScripts('/sw-app-shell.js')

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js')
workbox.setConfig({ debug: false })
workbox.googleAnalytics.initialize()

const CACHE_CORE = 'core-v3.00'

self.addEventListener('install', (e) => {
  self.skipWaiting()

  const setCacheCore = caches
    .open(CACHE_CORE)
    .then((coreCache) => coreCache.addAll(APP_SHELL))

  e.waitUntil(Promise.all([setCacheCore]))
})

self.addEventListener('activate', (e) => {
  // eslint-disable-next-line promise/always-return
  const clearOldVersionCache = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== CACHE_CORE) {
        return caches.delete(key)
      }
    })
  })

  e.waitUntil(clearOldVersionCache)
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)

  if (url.origin !== location.origin) return

  const filesToCache = /\.(html|css|js|svg|jpeg|jpg|png|webp|avif|json|mp3)$/i.test(url.pathname)

  if (filesToCache) {
    e.respondWith(
      caches.open(CACHE_CORE).then((cache) => {
        return cache.match(req).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // eslint-disable-next-line promise/no-nesting
          return fetch(req).then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            cache.put(req, response.clone())

            return response
          })
        })
      })
    )
  } else {
    e.respondWith(caches.match(e.request))
  }
})

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
