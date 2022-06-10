/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */

importScripts('/js/sw-app-shell.js')
importScripts('/js/sw-app-shell-media.js')

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js'
)
workbox.setConfig({ debug: false })
workbox.googleAnalytics.initialize()

const CACHE_CORE = 'core-v2.64'
const CACHE_MEDIA = 'media-v2.64'

self.addEventListener('install', e => {
  const setCacheCore = caches
    .open(CACHE_CORE)
    .then(coreCache => coreCache.addAll(APP_SHELL))

  const setCacheMedia = caches
    .open(CACHE_MEDIA)
    .then(mediaCache => mediaCache.addAll(IMAGES_APP_SHELL))

  e.waitUntil(Promise.all([setCacheCore, setCacheMedia]))
})

self.addEventListener('activate', () => {
  caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== CACHE_CORE && key.includes('core')) {
        return caches.delete(key)
      }

      if (key !== CACHE_MEDIA && key.includes('media')) {
        return caches.delete(key)
      }

      if (key !== CACHE_DYNAMIC && key.includes('dynamic')) {
        return caches.delete(key)
      }
    })
  })
})

self.addEventListener('fetch', e => {
  const fetchResponse = caches.match(e.request).then(response => {
    if (response) return response

    return fetch(e.request).catch(() => {
      if (e.request.headers.get('accept').includes('text/html')) {
        return caches.match('/offline.html')
      }
    })
  })

  e.respondWith(fetchResponse)
})

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
