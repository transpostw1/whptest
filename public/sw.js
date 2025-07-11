const CACHE_NAME = 'whp-jewellers-v1';
const STATIC_CACHE_NAME = 'whp-static-v1';
const DYNAMIC_CACHE_NAME = 'whp-dynamic-v1';

// Cache different types of resources with different strategies
const CACHE_STRATEGIES = {
  // Static assets - cache first
  static: [
    '/images/',
    '/icons/',
    '/_next/static/',
    '/dummy/',
    '.js',
    '.css',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot'
  ],
  // API responses - network first with fallback
  api: [
    '/api/',
    'graphql'
  ],
  // Images from CDN - cache first with update
  cdn: [
    'whpjewellers.s3.amazonaws.com',
    'wamanharipethe.s3.amazonaws.com'
  ]
};

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/offline.html',
        '/_next/static/chunks/pages/_app.js',
        '/_next/static/css/app.css'
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event with different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip for non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isApiRequest(request.url)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else if (isCdnImage(request.url)) {
    event.respondWith(cacheFirstWithUpdate(request, STATIC_CACHE_NAME));
  } else {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  }
});

// Cache strategies
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function cacheFirstWithUpdate(request, cacheName) {
  const cached = await caches.match(request);
  
  // Start fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
  return CACHE_STRATEGIES.static.some(pattern => url.includes(pattern));
}

function isApiRequest(url) {
  return CACHE_STRATEGIES.api.some(pattern => url.includes(pattern));
}

function isCdnImage(url) {
  return CACHE_STRATEGIES.cdn.some(domain => url.includes(domain));
} 