const CACHE_NAME = 'whp-jewellers-v2';
const STATIC_CACHE_NAME = 'whp-static-v2';
const DYNAMIC_CACHE_NAME = 'whp-dynamic-v2';
const IMAGE_CACHE_NAME = 'whp-images-v2';

// More aggressive caching strategies
const CACHE_STRATEGIES = {
  // Static assets - cache first with long TTL
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
    '.eot',
    '.svg',
    '.ico'
  ],
  // API responses - network first with 5min cache
  api: [
    '/api/',
    'graphql'
  ],
  // Images from CDN - aggressive caching
  cdn: [
    'whpjewellers.s3.amazonaws.com',
    'wamanharipethe.s3.amazonaws.com'
  ],
  // Long-term cacheable assets
  immutable: [
    '/_next/static/',
    '/static/',
    '.woff2',
    '.woff',
    '.ttf'
  ]
};

// Cache TTLs (in seconds)
const CACHE_TTL = {
  static: 86400 * 30, // 30 days
  images: 86400 * 7,  // 7 days
  api: 300,           // 5 minutes
  immutable: 86400 * 365 // 1 year
};

// Install event with more aggressive caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
          '/',
          '/offline.html',
          '/_next/static/chunks/main.js',
          '/_next/static/chunks/pages/_app.js',
          '/_next/static/css/app.css'
        ]);
      }),
      // Pre-cache critical images
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.addAll([
          '/images/whpnameLogo.png',
          '/images/icons/cart.svg',
          '/images/icons/search.svg'
        ]);
      })
    ])
  );
  self.skipWaiting();
});

// Activate event with better cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes('whp-jewellers-v2') && 
                !cacheName.includes('whp-static-v2') && 
                !cacheName.includes('whp-dynamic-v2') &&
                !cacheName.includes('whp-images-v2')) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Clear old dynamic cache entries
      cleanOldCacheEntries()
    ])
  );
  self.clients.claim();
});

// Enhanced fetch event with better strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip for non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests with optimized strategies
  if (isImmutableAsset(request.url)) {
    event.respondWith(cacheFirstLongTerm(request, STATIC_CACHE_NAME));
  } else if (isImage(request.url)) {
    event.respondWith(cacheFirstWithStaleWhileRevalidate(request, IMAGE_CACHE_NAME));
  } else if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirstMediumTerm(request, STATIC_CACHE_NAME));
  } else if (isApiRequest(request.url)) {
    event.respondWith(networkFirstWithTimeout(request, DYNAMIC_CACHE_NAME, 3000));
  } else if (isCdnImage(request.url)) {
    event.respondWith(cacheFirstWithStaleWhileRevalidate(request, IMAGE_CACHE_NAME));
  } else {
    event.respondWith(networkFirstWithTimeout(request, DYNAMIC_CACHE_NAME, 5000));
  }
});

// Enhanced cache strategies
async function cacheFirstLongTerm(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    // Check if cache is still valid (1 year)
    const cacheDate = new Date(cached.headers.get('date') || 0);
    const now = new Date();
    if (now.getTime() - cacheDate.getTime() < CACHE_TTL.immutable * 1000) {
      return cached;
    }
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      const responseToCache = response.clone();
      cache.put(request, responseToCache);
    }
    return response;
  } catch (error) {
    return cached || new Response('Offline', { status: 503 });
  }
}

async function cacheFirstMediumTerm(request, cacheName) {
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

async function cacheFirstWithStaleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  
  // Start fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => null);

  return cached || fetchPromise;
}

async function networkFirstWithTimeout(request, cacheName, timeout = 3000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);
    
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

async function cleanOldCacheEntries() {
  const cacheNames = [DYNAMIC_CACHE_NAME];
  const now = Date.now();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const cacheDate = new Date(response.headers.get('date') || 0);
        if (now - cacheDate.getTime() > CACHE_TTL.api * 1000) {
          await cache.delete(request);
        }
      }
    }
  }
}

// Enhanced helper functions
function isImmutableAsset(url) {
  return CACHE_STRATEGIES.immutable.some(pattern => url.includes(pattern));
}

function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)($|\?)/i.test(url);
}

function isStaticAsset(url) {
  return CACHE_STRATEGIES.static.some(pattern => url.includes(pattern));
}

function isApiRequest(url) {
  return CACHE_STRATEGIES.api.some(pattern => url.includes(pattern));
}

function isCdnImage(url) {
  return CACHE_STRATEGIES.cdn.some(domain => url.includes(domain));
}