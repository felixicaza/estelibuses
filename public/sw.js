/* eslint-disable no-undef */

/**
 * TODO: Use Workbox to manage service worker
 * See: https://github.com/tatethurston/astrojs-service-worker
 */

importScripts('/sw-app-shell.js')
importScripts('/sw-app-shell-media.js')

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js'
)
workbox.setConfig({ debug: false })
workbox.googleAnalytics.initialize()

const CACHE_CORE = 'core-v2.80'
const CACHE_MEDIA = 'media-v2.80'
const CACHE_ASSETS = 'assets-v2.24'

self.addEventListener('install', (e) => {
  const setCacheCore = caches
    .open(CACHE_CORE)
    .then((coreCache) => coreCache.addAll(APP_SHELL))

  const setCacheMedia = caches
    .open(CACHE_MEDIA)
    .then((mediaCache) => mediaCache.addAll(IMAGES_APP_SHELL))

  e.waitUntil(Promise.all([setCacheCore, setCacheMedia]))
})

self.addEventListener('activate', () => {
  caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== CACHE_CORE && key.includes('core')) {
        return caches.delete(key)
      }

      if (key !== CACHE_MEDIA && key.includes('media')) {
        return caches.delete(key)
      }

      if (key !== CACHE_ASSETS && key.includes('assets')) {
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
        caches.open(CACHE_ASSETS).then((cache) => {
          if (
            e.request.headers.get('accept').includes('text/css') &&
            e.request.headers.get('accept').includes('text/javascript')
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
