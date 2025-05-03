/* eslint-disable no-undef */

/**
 * TODO: Use Workbox to manage service worker
 * See: https://github.com/tatethurston/astrojs-service-worker
 */

importScripts('/sw-app-shell.js')

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js')
workbox.setConfig({ debug: false })
workbox.googleAnalytics.initialize()

const CACHE_CORE = 'core-v2.99'
const CACHE_DYNAMIC = 'dynamic-v2.99'

self.addEventListener('install', (e) => {
  const setCacheCore = caches
    .open(CACHE_CORE)
    .then((coreCache) => coreCache.addAll(APP_SHELL))

  e.waitUntil(Promise.all([setCacheCore]))
})

self.addEventListener('activate', () => {
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== CACHE_CORE && key.includes('core')) {
        return caches.delete(key)
      }

      if (key !== CACHE_DYNAMIC && key.includes('dynamic')) {
        return caches.delete(key)
      }
    })
  })
})

self.addEventListener('fetch', (e) => {
  const fetchResponse = caches.match(e.request).then((response) => {
    if (response) return response

    return fetch(e.request)
      .then((newResponse) => {
        // eslint-disable-next-line promise/catch-or-return
        caches.open(CACHE_DYNAMIC).then((cache) => {
          // eslint-disable-next-line promise/always-return
          if (
            e.request.headers.get('accept').includes('text/css')
            || e.request.headers.get('accept').includes('text/javascript')
            || e.request.headers
              .get('accept')
              .includes('application/javascript')
              || e.request.headers.get('accept').includes('image/avif')
              || e.request.headers.get('accept').includes('image/webp')
          ) {
            cache.put(e.request, newResponse)
          }
        })

        return newResponse.clone()
      })
      .catch(() => {
        if (e.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html')
        }
      })
  })

  e.respondWith(fetchResponse)
})

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
