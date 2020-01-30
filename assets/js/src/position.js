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
  var GameConstants = require("./constants");
}

function Position(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
}

Position.prototype.copy = function() {
  return new Position(this.x, this.y, this.direction);
};

Position.prototype.convertToKeyDirection = function() {
  switch(this.direction) {
    case GameConstants.Direction.UP:
      return GameConstants.Key.UP;
    case GameConstants.Direction.RIGHT:
      return GameConstants.Key.RIGHT;
    case GameConstants.Direction.LEFT:
      return GameConstants.Key.LEFT;
    case GameConstants.Direction.BOTTOM:
      return GameConstants.Key.BOTTOM;
    default:
      return this.direction;
  }
};

Position.prototype.convertToSimpleDirection = function() {
  switch(this.direction) {
    case GameConstants.Key.UP:
      return GameConstants.Direction.UP;
    case GameConstants.Key.RIGHT:
      return GameConstants.Direction.RIGHT;
    case GameConstants.Key.LEFT:
      return GameConstants.Direction.LEFT;
    case GameConstants.Key.BOTTOM:
      return GameConstants.Direction.BOTTOM;
    default:
      return this.direction;
  }
};

Position.prototype.equals = function(otherPosition) {
  if(otherPosition != null) {
    return this.x == otherPosition.x && this.y == otherPosition.y;
  } else {
    return false;
  }
};

Position.prototype.indexIn = function(array) {
  for(var i = 0; i < array.length; i++) {
    if(this.equals(array[i])) {
      return i;
    }
  }
  
  return -1;
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = Position;
}