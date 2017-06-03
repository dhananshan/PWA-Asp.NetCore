importScripts('workbox-sw.prod.v1.0.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/app.bundle.js",
    "revision": "1f2d5092c22ef82cd9ecfa7bb408a094"
  },
  {
    "url": "/vendor.bundle.js",
    "revision": "cb7bffc678120f1a2c0baf155541ca4f"
  },
  {
    "url": "/vendor.css",
    "revision": "167b99b3dae265074358aaf718a3bca2"
  },
  {
    "url": "/workbox-sw.prod.v1.0.1.js",
    "revision": "3fbc93cd82283d7c3a2cb4dcaf36be91"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
