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
    let r, g, b;
  
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
  
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
  autoDPI(canvas, pixelRatio) {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;
    
    canvas.style.width = rect.width + "px";
    canvas.style.height =  rect.height + "px";
  }
};