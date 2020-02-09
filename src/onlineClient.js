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
  var io = require('../libs/socket.io.js');
}

function OnlineClient() {
  this.url;
  this.port;
  this.token;
  this.socket;
}

OnlineClient.prototype.connect = function(url, port, callback) {
  this.disconnect();

  this.url = url;
  this.port = port;
  this.socket = new io(url + ":" + port);

  var self = this;

  this.socket.on("connect", function() {
    callback(true);
  });

  this.socket.on("error", function() {
    callback(false);
    self.disconnect();
  });

  this.socket.on("connect_error", function() {
    callback(false);
    self.disconnect();
  });
};

OnlineClient.prototype.disconnect = function() {
  if(this.socket != null) {
    this.socket.close();
  }
};

OnlineClient.prototype.displayRooms = function(callback) {
  var ioRooms = new io(this.url + ":" + this.port + "/rooms");

  ioRooms.on("rooms", function(data) {
    callback(data);
    ioRooms.close();
  });
};

OnlineClient.prototype.createRoom = function(data, callback) {
  var ioCreate = new io(this.url + ":" + this.port + "/createRoom");

  ioCreate.on("connect", function() {
    ioCreate.emit("create", data);
  });

  ioCreate.on("process", function(data) {
    if(data.success != null) {
      callback(data.success);
    }

    ioCreate.close();
  });
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = OnlineClient;
}