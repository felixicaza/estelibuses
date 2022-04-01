/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */

importScripts('/js/sw-app-shell.js')
importScripts('/js/sw-app-shell-media.js')

const CACHE_CORE = 'core-v2.7'
const CACHE_MEDIA = 'media-v2.7'
const CACHE_DYNAMIC = 'dynamic-v1'

self.addEventListener('install', e => {
  self.skipWaiting()

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
    })
  })
})

self.addEventListener('fetch', e => {
  const fetchResponse = caches.match(e.request).then(response => {
    if (response) return response

    return fetch(e.request)
      .then(newResponse => {
        caches.open(CACHE_DYNAMIC).then(cache => {
          cache.put(e.request, newResponse)
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
