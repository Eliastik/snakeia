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
if(typeof(require) !== "undefined") {
  var i18next = require("../libs/i18next.min");
  var GameUtils = require("./gameUtils");
}

var GameUtils = {
  randRange: function(min, max) { // Return an integer between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  addHue: function(hue, add) {
    var res = hue + add;
  
    if(res > 360) {
      res = (res - 360);
    } else if(res < 0) {
      res = (360 + res);
    }
  
    return res;
  },
  hsvToRgb: function(h, s, v) {
    var r, g, b, i, f, p, q, t;
  
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
  
    switch(i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  },
  hslToName: function(h, s, l) {
    if(s <= 10 && l >= 90) {
      return i18next.t("engine.colors.white");
    } else if((s <= 10 && l <= 70) || s == 0) {
      return i18next.t("engine.colors.gray");
    } else if(l <= 15) {
      return i18next.t("engine.colors.black");
    } else if((h >= 0 && h <= 6) || h >= 350) {
      return i18next.t("engine.colors.red");
    } else if(h >= 7 && h <= 42) {
      return i18next.t("engine.colors.orange");
    } else if(h >= 43 && h <= 70) {
      return i18next.t("engine.colors.yellow");
    } else if(h >= 71 && h <= 156) {
      return i18next.t("engine.colors.green");
    } else if(h >= 157 && h <= 221) {
      return i18next.t("engine.colors.blue");
    } else if(h >= 222 && h <= 290) {
      return i18next.t("engine.colors.purple");
    } else if(h >= 291 && h <= 349) {
      return i18next.t("engine.colors.pink");
    }
  },
  isFilterHueAvailable: function() {
    var canvas = document.createElement("canvas");
    canvas.width = 5;
    canvas.height = 5;
    var ctx = canvas.getContext("2d");
  
    ctx.fillStyle = "#FF0000";
    ctx.filter = "hue-rotate(90deg)";
    ctx.fillRect(0, 0, 5, 5);
    var color = ctx.getImageData(0, 0, 1, 1).data;
  
    if(color[0] == 255 && color[1] == 0 && color[2] == 0) {
      return false;
    }
  
    return true;
  },
  shuffle: function(a) {
    var j, x;
    
    for(var i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    
    return a;
  },
  millisecondsFormat: function(milliseconds) {
    milliseconds /= 1000;
    return ("0" + Math.trunc(milliseconds / 60)).slice(-2) + ":" + ("0" + Math.trunc(milliseconds % 60)).slice(-2);
  }
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = GameUtils;
}