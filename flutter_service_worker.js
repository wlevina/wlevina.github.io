'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"favicon-16x16.png": "835af0b75a3399e81dabffa7e6c338fd",
"version.json": "94116c66301c166ce07030808f94e12b",
"index.html": "291234a3099cd02e78186c16a17dad62",
"/": "291234a3099cd02e78186c16a17dad62",
"android-chrome-192x192.png": "082493c2aacf19d324a416ffba27372a",
"apple-touch-icon.png": "072467d8e815fcda9e5055a8f686077a",
"main.dart.js": "d38e2d6af86ff23fc95f1bbaa1246e22",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "8107277ed88b2cbeb150687ed61743c0",
"about.txt": "41e4e2ddd5e8db831da5c1ffb3d36eb6",
"android-chrome-512x512.png": "e7fb89fa0c596521d8c9b4e1057f2404",
"site.webmanifest": "053100cb84a50d2ae7f5492f7dd7f25e",
"icons/favicon-16x16.png": "835af0b75a3399e81dabffa7e6c338fd",
"icons/android-chrome-192x192.png": "082493c2aacf19d324a416ffba27372a",
"icons/apple-touch-icon.png": "072467d8e815fcda9e5055a8f686077a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/android-chrome-512x512.png": "e7fb89fa0c596521d8c9b4e1057f2404",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/favicon-32x32.png": "c2adfc3f9d61842d337055e709c68f27",
"manifest.json": "d9bc0b17fe8a0007d25bceffb010ce06",
"assets/AssetManifest.json": "1e3b103932a7dd69dfed1405615cd4e9",
"assets/NOTICES": "2c4f86c3b28fb5e7e43e8947d07a4737",
"assets/FontManifest.json": "1d15b27f89ab9ac609a430af6727846a",
"assets/AssetManifest.bin.json": "32c75a696e53f670fe16d80fc470ff84",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "219ab4e53570d71dac33dd8f583e8509",
"assets/fonts/MaterialIcons-Regular.otf": "c8c5b4232bde0c088e4cdea542bac71a",
"assets/assets/images/CrepeMyrtles_Reception.png": "7c50882fa64f9ed343aa1f8fbb4b9d80",
"assets/assets/images/culburra.png": "7e40e9e6a3a77b15656d2dcffdfc6901",
"assets/assets/images/more_vibes.jpeg": "1096f0a14200bcfbe7d9b863525546f5",
"assets/assets/images/merribeeFC.png": "f02eae9081ba546fcdaecba45d4407fa",
"assets/assets/images/GeorgeStreet_PostCeremony.png": "5ea6d26eed727338ad10106e5dfc3f99",
"assets/assets/images/DaisyKiosk_Bar.png": "629473810a1bb4c377b9cf65aae8e89d",
"assets/assets/images/TheRoseGarden_Ceremony.png": "59b6c82e6c87bbb6a1ba263f34521999",
"assets/assets/images/vibes.jpg": "dadc11fb8759f784551ee183c866487e",
"assets/assets/images/beach.jpeg": "6ba65be0c6c4206407e08c9780d9073c",
"assets/assets/images/dress_code.jpg": "34254f1d647211129cf9a0e5d69d2281",
"assets/assets/images/MayfieldWelcomeDrinks.png": "83dc5172f5f1cd0e810d65c9c40e1b80",
"assets/assets/fonts/VollkornSemibold-6Yay1.ttf": "120c56eac052ed6018daf5c82f0e9c86",
"assets/assets/fonts/VollkornRegular-51aXv.ttf": "4c3ff588bf9f18bbc9e67a2cf9001e80",
"favicon-32x32.png": "c2adfc3f9d61842d337055e709c68f27",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
