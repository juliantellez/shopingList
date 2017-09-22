const shouldCache = true
const CACHE_NAME = 'pwa-cache'
const CACHE_URLS = [
  // '/scripts.js',
  // '/about/',
  // '/static/styles.css',
]

self.addEventListener('install', event => {
  if (!shouldCache) {
    return
  }
  event.waitUntil(async function () {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(CACHE_URLS)
  }())
})

const cacheRequest = url => (
  async function () {
    const response = await fetch(url)
    if (!response.ok) {
      return null
    }
    const cache = await caches.open(CACHE_NAME)
    cache.put(url, response.clone())
  }())

self.addEventListener('fetch', event => {
  if (!shouldCache) {
    return
  }
  event.respondWith(async function () {
    const cachesMatch = await caches.match(event.request)
    return cachesMatch || cacheRequest(event.request)
  }())
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(async function () {
    const cacheKeys = await caches.keys()
    cacheKeys.map(key => {
      if (!cacheWhitelist.includes(key)) {
        return caches.delete(key)
      }
    })
  }())
})
