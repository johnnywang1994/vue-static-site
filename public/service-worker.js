importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

/* Cache for CDN resources */
registerRoute(
  ({ request, sameOrigin }) => {
    const { destination } = request;
    const cacheDestinations = ['style', 'script'];
    return !sameOrigin && cacheDestinations.includes(destination);
  },
  new StaleWhileRevalidate({
    cacheName: 'cdn-assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
)

/* Cache for assets */
registerRoute(
  ({ request, sameOrigin }) => {
    const { destination } = request;
    const cacheDestinations = ['image', 'script', 'style', 'document'];
    return sameOrigin && cacheDestinations.includes(destination);
  },
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 14, // 14 Days
      }),
    ],
  }),
)

/* Cache for local markdown */
registerRoute(
  new RegExp('\\.md|\\.vue$'),
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Days
      }),
    ],
  }),
)

/* Cache all for unexpect network offline */
registerRoute(
  () => true,
  new StaleWhileRevalidate({
    cacheName: 'offline',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 1, // 1 Days
      }),
    ],
  }),
)