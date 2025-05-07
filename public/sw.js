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

  const setCacheCore = async () => {
    const coreCache = await caches.open(CACHE_CORE)
    await coreCache.addAll(APP_SHELL)
  }

  e.waitUntil(setCacheCore())
})

self.addEventListener('activate', (e) => {
  const clearOldVersionCache = async () => {
    const keys = await caches.keys()

    for (const key of keys) {
      if (key !== CACHE_CORE) {
        await caches.delete(key)
      }
    }
  }

  e.waitUntil(clearOldVersionCache())
})

async function handleFetchRequest(req) {
  const cache = await caches.open(CACHE_CORE)
  const cachedResponse = await cache.match(req)

  if (cachedResponse) {
    return cachedResponse
  }

  const response = await fetch(req)

  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response
  }

  await cache.put(req, response.clone())

  return response
}

self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)

  if (url.origin !== location.origin) return

  const filesToCache = /\.(html|css|js|svg|jpeg|jpg|png|webp|avif|json|mp3)$/i.test(url.pathname)

  if (filesToCache) {
    e.respondWith(handleFetchRequest(req))
  } else {
    e.respondWith(caches.match(e.request))
  }
})

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
