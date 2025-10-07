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
const CACHE_BASENAME = "snake-ia";
const CACHE_VER = "-v3.0.1";
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
  "assets/css/dark-theme.css",
  "assets/css/flat-ui.min.css",
  "assets/css/main.css",
  "assets/js/bootstrap-native-v4.min.js",
  "dist/SnakeIA.js",
  "dist/GameEngineWorker.js",
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
  "assets/images/logo/logo-dark.png",
  "assets/images/skin/flat/snake_4.png",
  "assets/images/skin/flat/snake_3.png",
  "assets/images/skin/flat/snake_2.png",
  "assets/images/skin/flat/snake.png",
  "assets/images/skin/flat/body_4_end.png",
  "assets/images/skin/flat/body_3_end.png",
  "assets/images/skin/flat/body_2_end.png",
  "assets/images/skin/flat/body_end.png",
  "assets/images/skin/flat/body_2.png",
  "assets/images/skin/flat/body.png",
  "assets/images/skin/flat/body_angle_1.png",
  "assets/images/skin/flat/body_angle_2.png",
  "assets/images/skin/flat/body_angle_3.png",
  "assets/images/skin/flat/body_angle_4.png",
  "assets/images/skin/flat/snake_dead_4.png",
  "assets/images/skin/flat/snake_dead_3.png",
  "assets/images/skin/flat/snake_dead_2.png",
  "assets/images/skin/flat/snake_dead.png",
  "assets/images/skin/flat/fruit.png",
  "assets/images/skin/flat/fruit_gold.png",
  "assets/images/skin/flat/wall.png",
  "assets/images/skin/flat/wall_ao.png",
  "assets/images/skin/flat/wall_height.png",
  "assets/images/skin/flat/wall_normal.png",
  "assets/images/skin/flat/unknown.png",
  "assets/images/skin/tropical/snake_4.png",
  "assets/images/skin/tropical/snake_3.png",
  "assets/images/skin/tropical/snake_2.png",
  "assets/images/skin/tropical/snake.png",
  "assets/images/skin/tropical/body_4_end.png",
  "assets/images/skin/tropical/body_3_end.png",
  "assets/images/skin/tropical/body_2_end.png",
  "assets/images/skin/tropical/body_end.png",
  "assets/images/skin/tropical/body_2.png",
  "assets/images/skin/tropical/body.png",
  "assets/images/skin/tropical/body_angle_1.png",
  "assets/images/skin/tropical/body_angle_2.png",
  "assets/images/skin/tropical/body_angle_3.png",
  "assets/images/skin/tropical/body_angle_4.png",
  "assets/images/skin/tropical/snake_dead_4.png",
  "assets/images/skin/tropical/snake_dead_3.png",
  "assets/images/skin/tropical/snake_dead_2.png",
  "assets/images/skin/tropical/snake_dead.png",
  "assets/images/skin/tropical/fruit.png",
  "assets/images/skin/tropical/fruit_gold.png",
  "assets/images/skin/tropical/wall.png",
  "assets/images/skin/tropical/wall_ao.png",
  "assets/images/skin/tropical/wall_height.png",
  "assets/images/skin/tropical/wall_normal.png",
  "assets/images/skin/tropical/unknown.png",
  "assets/images/skin/pixel/snake_4.png",
  "assets/images/skin/pixel/snake_3.png",
  "assets/images/skin/pixel/snake_2.png",
  "assets/images/skin/pixel/snake.png",
  "assets/images/skin/pixel/body_4_end.png",
  "assets/images/skin/pixel/body_3_end.png",
  "assets/images/skin/pixel/body_2_end.png",
  "assets/images/skin/pixel/body_end.png",
  "assets/images/skin/pixel/body_2.png",
  "assets/images/skin/pixel/body.png",
  "assets/images/skin/pixel/body_angle_1.png",
  "assets/images/skin/pixel/body_angle_2.png",
  "assets/images/skin/pixel/body_angle_3.png",
  "assets/images/skin/pixel/body_angle_4.png",
  "assets/images/skin/pixel/snake_dead_4.png",
  "assets/images/skin/pixel/snake_dead_3.png",
  "assets/images/skin/pixel/snake_dead_2.png",
  "assets/images/skin/pixel/snake_dead.png",
  "assets/images/skin/pixel/fruit.png",
  "assets/images/skin/pixel/fruit_gold.png",
  "assets/images/skin/pixel/wall.png",
  "assets/images/skin/pixel/wall_ao.png",
  "assets/images/skin/pixel/wall_height.png",
  "assets/images/skin/pixel/wall_normal.png",
  "assets/images/skin/pixel/unknown.png",
  "assets/images/pause.png",
  "assets/images/fullscreen.png",
  "assets/images/up.png",
  "assets/images/left.png",
  "assets/images/right.png",
  "assets/images/bottom.png",
  "assets/images/trophy.png",
  "assets/images/trophy_silver.png",
  "assets/images/trophy_bronze.png",
  "assets/images/clock.png",
  "assets/images/ranking.png",
  "assets/models/fruit.glb",
  "assets/models/head.glb",
  "assets/models/tail.glb",
  "assets/models/unknown.glb"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CACHE_URLS)).then(self.skipWaiting()));
});

self.addEventListener("activate", function(event) {
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

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request);
      });
    })
  );
});
