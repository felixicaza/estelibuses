/* eslint-disable no-restricted-globals */

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request))
})
