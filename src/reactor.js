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
import Event from "./event";

export default class Reactor {
  constructor() {
    this.events = {};
  }

  registerEvent(eventName) {
    var event = new Event(eventName);
    this.events[eventName] = event;
  }

  dispatchEvent(eventName, eventArgs) {
    var callbacks = this.events[eventName].callbacks;
    
    for(var i = 0, l = callbacks.length; i < l; i++) {
      callbacks[i](eventArgs);
    }
  }

  addEventListener(eventName, callback) {
    this.events[eventName].registerCallback(callback);
  }
}