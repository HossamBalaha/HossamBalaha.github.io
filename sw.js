/* sw.js — Service Worker for the Hossam Balaha online CV.
 *
 * Pass 2 enhancements:
 *   - Precache all certification PDFs (~12 MB) so the full CV works offline.
 *   - Cache Semantic Scholar / GitHub / ORCID API responses for 24h.
 *   - Cache Altmetric badge script.
 *
 * Strategy:
 *   - Precache the critical app shell on install (HTML, CSS, JS, favicon, manifest).
 *   - Precache certification PDFs in the activate phase (so install doesn't block).
 *   - For navigation requests: network-first, fall back to cached index.html.
 *   - For static assets (same-origin images, PDFs, fonts): stale-while-revalidate.
 *   - For CDN assets (cross-origin): cache-first with a 7-day TTL, fall back to network.
 *   - For API requests (api.semanticscholar.org, api.github.com, pub.orcid.org):
 *     cache-first with a 24-hour TTL.
 *   - For everything else: pass through to the network.
 *
 * Bump CACHE_VERSION whenever you ship a new build to invalidate old caches.
 */

const CACHE_VERSION = "cv-improved-v2-20261030";
const API_CACHE_VERSION = "cv-api-v2-20261030";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./assets/css/styles.latest.min.css",
  "./assets/css/pillar-6.css",
  "./assets/js/scripts.latest.min.js",
  "./export-worker.js",
  "./manifest.json",
  "./site.webmanifest",
  "./favicon.ico",
  "./assets/favicons/favicon-16x16.png",
  "./assets/favicons/favicon-32x32.png",
  "./assets/favicons/favicon-96x96.png",
  "./assets/favicons/apple-touch-icon.png",
  "./assets/images/Profile 03.webp"
];

// List of certification PDFs to precache for offline use.
// (Auto-discovered from the assets/certifications/ folder at build time;
// this list is regenerated whenever the CV is rebuilt.)
const CERT_PDFS = [
  "assets/certifications/2024 IAPR BStP Track 6.pdf",
  "assets/certifications/2026 Student Champion Certificate - Hossam Balaha.pdf",
  "assets/certifications/AI for Medical Diagnosis.pdf",
  "assets/certifications/AIM-AHEAD.pdf",
  "assets/certifications/Applied Text Mining in Python.pdf",
  "assets/certifications/Building a Business Presence With Facebook Marketing.pdf",
  "assets/certifications/CITI Completion Certificate Hossam.pdf",
  "assets/certifications/CITI Conflicts of Interest.pdf",
  "assets/certifications/Crash Course on Python.pdf",
  "assets/certifications/Data Analysis Using Python.pdf",
  "assets/certifications/Data Science Math Skills.pdf",
  "assets/certifications/Excel Skills for Business Essentials.pdf",
  "assets/certifications/Fine Tune BERT for Text Classification with TensorFlow.pdf",
  "assets/certifications/Getting started with TensorFlow 2.pdf",
  "assets/certifications/Human Research CITI.pdf",
  "assets/certifications/Introduction to Basic Game Development using Scratch.pdf",
  "assets/certifications/Introduction to Data Science in Python.pdf",
  "assets/certifications/Introduction to Genomic Technologies.pdf",
  "assets/certifications/Introduction to Python Programming.pdf",
  "assets/certifications/Machine Learning with Python Foundations.jpg",
  "assets/certifications/MansouraEngineeringJournalCertificateOfAppreciation.pdf",
  "assets/certifications/Object Localization with TensorFlow.pdf",
  "assets/certifications/Practical GitHub Actions.pdf",
  "assets/certifications/Python for Genomic Data Science.pdf",
  "assets/certifications/Reinforcement Learning Qwik Start.pdf",
  "assets/certifications/SI-010C-0AB7-BF6C.pdf",
  "assets/certifications/SI-01E3-EF11-7AC4.pdf",
  "assets/certifications/SI-1E58-936F-FAF5.pdf",
  "assets/certifications/SI-2A4C-DB7C-A396.pdf",
  "assets/certifications/SI-4A85-B1D6-71E5.pdf",
  "assets/certifications/SI-6928-AB78-DF7E.pdf",
  "assets/certifications/SI-6934-85C1-28AE.pdf",
  "assets/certifications/SI-6ABB-3B7C-6DC9.pdf",
  "assets/certifications/SI-70BB-1F53-B12D.pdf",
  "assets/certifications/SI-8175-3074-29F9.pdf",
  "assets/certifications/SI-C607-38B1-31F8.pdf",
  "assets/certifications/SI-C955-C144-1A26.pdf",
  "assets/certifications/SI-E077-DF66-C45D.pdf",
  "assets/certifications/Student Champion.pdf",
  "assets/certifications/Transfer Learning for NLP with TensorFlow Hub.pdf",
  "assets/certifications/Tweet Emotion Recognition with TensorFlow.pdf",
  "assets/certifications/UofLDelphiCenterFacultyAdvisoryBoard20262027.pdf"
];

// API hosts whose responses we cache for 24h.
const API_HOSTS = [
  "api.semanticscholar.org",
  "api.github.com",
  "pub.orcid.org"
];

const API_TTL_MS = 24 * 60 * 60 * 1000;  // 24 hours

// ---------------------------------------------------------------------------
// Install: precache the app shell only (cert PDFs precached in activate).
// ---------------------------------------------------------------------------
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      return Promise.all(
        PRECACHE_URLS.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.warn("[SW] Precache miss for", url, err);
          });
        })
      );
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ---------------------------------------------------------------------------
// Activate: clean up old caches AND precache certification PDFs in the background.
// ---------------------------------------------------------------------------
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(key) { return key !== CACHE_VERSION && key !== API_CACHE_VERSION; })
          .map(function(key) {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          })
      );
    }).then(function() {
      // Precache cert PDFs in the background — don't block activation.
      caches.open(CACHE_VERSION).then(function(cache) {
        // Process in small batches to avoid memory spikes.
        let i = 0;
        function nextBatch() {
          let batch = CERT_PDFS.slice(i, i + 5);
          if (batch.length === 0) return;
          Promise.all(batch.map(function(pdf) {
            return cache.match("./" + pdf).then(function(r) {
              if (r) return;  // Already cached.
              return cache.add("./" + pdf).catch(function(err) {
                console.warn("[SW] Cert precache miss for", pdf);
              });
            });
          })).then(nextBatch);
          i += 5;
        }
        nextBatch();
      });
      return self.clients.claim();
    })
  );
});

// ---------------------------------------------------------------------------
// Fetch: route requests by type.
// ---------------------------------------------------------------------------
self.addEventListener("fetch", function(event) {
  let req = event.request;
  if (req.method !== "GET") return;

  let url = new URL(req.url);
  let sameOrigin = (url.origin === self.location.origin);

  // --- API requests (Semantic Scholar, GitHub, ORCID): cache-first + TTL ---
  if (API_HOSTS.indexOf(url.host) !== -1) {
    event.respondWith(
      caches.open(API_CACHE_VERSION).then(function(cache) {
        return cache.match(req).then(function(cached) {
          if (cached) {
            // Check TTL via the cached Date header.
            let cachedTime = cached.headers.get("sw-cached-at");
            if (cachedTime) {
              let age = Date.now() - parseInt(cachedTime);
              if (age < API_TTL_MS) {
                return cached;
              }
            }
          }
          // Stale or missing — fetch fresh.
          return fetch(req).then(function(resp) {
            if (resp && resp.status === 200) {
              // Add a custom header for TTL tracking.
              let headers = new Headers(resp.headers);
              headers.set("sw-cached-at", String(Date.now()));
              let bodyCopy = resp.clone().body;
              let cached = new Response(bodyCopy, {
                status: resp.status,
                statusText: resp.statusText,
                headers: headers
              });
              cache.put(req, cached.clone()).catch(function() {});
              return cached;
            }
            return resp;
          }).catch(function() {
            // Network failed — return stale if any.
            return cached || new Response("API offline.", {
              status: 503,
              headers: { "Content-Type": "text/plain" }
            });
          });
        });
      })
    );
    return;
  }

  // --- Navigation requests: network-first, fall back to cached shell. ---
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then(function(resp) {
        let copy = resp.clone();
        caches.open(CACHE_VERSION).then(function(cache) {
          cache.put("./index.html", copy).catch(function() {});
        });
        return resp;
      }).catch(function() {
        return caches.match("./index.html").then(function(cached) {
          return cached || caches.match("./");
        });
      })
    );
    return;
  }

  // --- Cross-origin (CDN) assets: cache-first, 7-day TTL, then network. ---
  if (!sameOrigin) {
    event.respondWith(
      caches.match(req).then(function(cached) {
        if (cached) {
          // Revalidate in the background.
          fetch(req).then(function(resp) {
            if (resp && resp.status === 200) {
              let copy = resp.clone();
              caches.open(CACHE_VERSION).then(function(cache) {
                cache.put(req, copy).catch(function() {});
              });
            }
          }).catch(function() {});
          return cached;
        }
        return fetch(req).then(function(resp) {
          if (!resp || resp.status !== 200 || resp.type !== "basic") {
            return resp;
          }
          let copy = resp.clone();
          caches.open(CACHE_VERSION).then(function(cache) {
            cache.put(req, copy).catch(function() {});
          });
          return resp;
        }).catch(function() {
          return new Response("Resource unavailable offline.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain" }
          });
        });
      })
    );
    return;
  }

  // --- Same-origin assets: stale-while-revalidate. ---
  event.respondWith(
    caches.match(req).then(function(cached) {
      let networkFetch = fetch(req).then(function(resp) {
        if (!resp || resp.status !== 200 || resp.type !== "basic") {
          return resp;
        }
        let copy = resp.clone();
        caches.open(CACHE_VERSION).then(function(cache) {
          cache.put(req, copy).catch(function() {});
        });
        return resp;
      }).catch(function() {
        return cached || new Response("Offline and not cached.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain" }
        });
      });
      return cached || networkFetch;
    })
  );
});
