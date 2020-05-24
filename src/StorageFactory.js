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
export default class StorageFactory {
  constructor(storage) {
    this.inMemoryStorage = {};
    this._isSupported;

    try {
      this.storage = storage || window.localStorage;
    } catch(e) {
      this.storage = null;
    }

    // Test if local storage is supported
    try {
      const testKey = "__some_random_key_you_are_not_going_to_use__";
      this.storage.setItem(testKey, testKey);
      this.storage.removeItem(testKey);
      this._isSupported = true;
    } catch(e) {
      this._isSupported = false;
    }
  }

  get isSupported() {
    return this._isSupported;
  }

  clear() {
    if(this.isSupported) {
      this.storage.clear();
    } else {
      this.inMemoryStorage = {};
    }
  }

  getItem(name) {
    if(this.isSupported) {
      return this.storage.getItem(name);
    }

    if(this.inMemoryStorage.hasOwnProperty(name)) {
      return this.inMemoryStorage[name];
    }

    return null;
  }

  key(index) {
    if(this.isSupported) {
      return this.storage.key(index);
    } else {
      return Object.keys(this.inMemoryStorage)[index] || null;
    }
  }

  removeItem(name) {
    if(this.isSupported) {
      this.storage.removeItem(name);
    } else {
      delete this.inMemoryStorage[name];
    }
  }

  setItem(name, value) {
    if(this.isSupported) {
      this.storage.setItem(name, value);
    } else {
      this.inMemoryStorage[name] = String(value);
    }
  }

  length() {
    if(this.isSupported) {
      return this.storage.length;
    } else {
      return Object.keys(this.inMemoryStorage).length;
    }
  }
}