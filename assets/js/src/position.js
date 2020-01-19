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
      case UP:
        return KEY_UP;
      case RIGHT:
        return KEY_RIGHT;
      case LEFT:
        return KEY_LEFT;
      case BOTTOM:
        return KEY_BOTTOM;
      default:
        return this.direction;
    }
};

Position.prototype.convertToSimpleDirection = function() {
    switch(this.direction) {
      case KEY_UP:
        return UP;
      case KEY_RIGHT:
        return RIGHT;
      case KEY_LEFT:
        return LEFT;
      case KEY_BOTTOM:
        return BOTTOM;
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