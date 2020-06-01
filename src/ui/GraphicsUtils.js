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
import i18next from "i18next";

export default {
  hsvToRgb: function(h, s, v) {
    let r, g, b, i, f, p, q, t;
  
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
    } else {
      return "???";
    }
  },
  easeInCubic(x) {
    return x * x * x;
  },
  easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if(x < 1 / d1) {
      return n1 * x * x;
    } else if(x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if(x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  },
  easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
}