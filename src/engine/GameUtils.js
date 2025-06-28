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
import GameConstants from "../engine/Constants.js";

export default {
  randRange: function(min, max, rng) { // Return an integer between min (inclusive) and max (inclusive)
    return Math.floor((rng ? rng() : Math.random()) * (max - min + 1)) + min;
  },
  addHue: function(hue, add) {
    const res = hue + add;
  
    if(res > 360) {
      return (res - 360);
    } else if(res < 0) {
      return (360 + res);
    }
  
    return res;
  },
  shuffle: function(a, rng) {
    let j, x;
    
    for(let i = a.length - 1; i > 0; i--) {
      j = Math.floor((rng ? rng() : Math.random()) * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    
    return a;
  },
  millisecondsFormat: function(milliseconds) {
    milliseconds /= 1000;
    return ("0" + Math.trunc(milliseconds / 60)).slice(-2) + ":" + ("0" + Math.trunc(milliseconds % 60)).slice(-2);
  },
  secondsFormat: function(seconds) {
    return this.millisecondsFormat(seconds * 1000);
  },
  getImageCase(value) {
    switch(value) {
    case GameConstants.CaseType.WALL:
      return "wall.png";
    case GameConstants.CaseType.FRUIT:
      return "fruit.png";
    case GameConstants.CaseType.FRUIT_GOLD:
      return "fruit_gold.png";
    case GameConstants.CaseType.EMPTY:
    case GameConstants.CaseType.SNAKE:
    case GameConstants.CaseType.SNAKE_DEAD:
    case GameConstants.CaseType.SURROUNDED:
    case GameConstants.CaseType.CROSSED:
      return "";
    }
    
    return "unknown.png";
  },
  fastArgMax(arr) {
    let maxValue = -Infinity;
    let maxIndex = -1;

    for(let i = 0; i < arr.length; i++) {
      if(arr[i] > maxValue) {
        maxValue = arr[i];
        maxIndex = i;
      }
    }

    return { maxValue, maxIndex };
  }
};