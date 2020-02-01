/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */
const CACHE_BASENAME = 'snake-ia';
const CACHE_VER = '-v1.5';
const CACHE = CACHE_BASENAME + CACHE_VER;

const CACHE_URLS = [
  "index.html",
  "index.html?launcher=true",
  "./",
  "favicon.ico",
  "README.md",
  "manifest.json",
  "LICENCE.txt",
  "assets/css/balloon.min.css",
  "assets/css/bootstrap.min.css",
  "assets/css/flat-ui.min.css",
  "assets/css/main.css",
  "dist/SnakeIA.js",
  "src/gameEngineWorker.js",
  "assets/fonts/delius-regular.ttf",
  "assets/fonts/delius-regular.woff",
  "assets/fonts/flat-ui-pro-icons-regular.eot",
  "assets/fonts/flat-ui-pro-icons-regular.svg",
  "assets/fonts/flat-ui-pro-icons-regular.ttf",
  "assets/fonts/flat-ui-pro-icons-regular.woff",
  "assets/images/icon/icon_192.png",
  "assets/images/icon/icon_512.png",
  "assets/images/logo/logo_text.png",
  "assets/images/logo/logo.png",
  "assets/images/snake_4.png",
  "assets/images/snake_3.png",
  "assets/images/snake_2.png",
  "assets/images/snake.png",
  "assets/images/body_4_end.png",
  "assets/images/body_3_end.png",
  "assets/images/body_2_end.png",
  "assets/images/body_end.png",
  "assets/images/body_2.png",
  "assets/images/body.png",
  "assets/images/wall.png",
  "assets/images/fruit.png",
  "assets/images/body_angle_1.png",
  "assets/images/body_angle_2.png",
  "assets/images/body_angle_3.png",
  "assets/images/body_angle_4.png",
  "assets/images/pause.png",
  "assets/images/fullscreen.png",
  "assets/images/snake_dead_4.png",
  "assets/images/snake_dead_3.png",
  "assets/images/snake_dead_2.png",
  "assets/images/snake_dead.png",
  "assets/images/up.png",
  "assets/images/left.png",
  "assets/images/right.png",
  "assets/images/bottom.png",
  "assets/images/trophy.png",
  "assets/images/clock.png",
  "assets/images/close.png"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CACHE_URLS)).then(self.skipWaiting()));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          if(cacheName.startsWith(CACHE_BASENAME)) {
            var cacheVer = cacheName.replace(CACHE_BASENAME, "");

            if(cacheVer != CACHE_VER) {
              return true;
            }
          }

          return false;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request);
      });
    })
  );
});
