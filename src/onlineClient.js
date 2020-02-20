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
  var GameControllerSocket = require('./gameControllerSocket.js');
}

function OnlineClient() {
  this.url;
  this.port;
  this.token;
  this.socket;
  this.currentRoom;
  this.game;
}

OnlineClient.prototype.connect = function(url, port, callback) {
  this.disconnect();

  this.url = url;
  this.port = port;

  if(this.port != null) {
    this.socket = new io(url + ":" + port);
  } else {
    this.socket = new io(url);
  }

  var self = this;
  var successConnect = false;

  this.socket.once("connect", function() {
    callback(true);
    successConnect = true;
  });

  this.socket.once("error", function() {
    if(!successConnect) {
      callback(false);
      self.disconnect();
    }
  });

  this.socket.once("connect_error", function() {
    if(!successConnect) {
      callback(false);
      self.disconnect();
    }
  });
};

OnlineClient.prototype.disconnect = function() {
  if(this.socket != null) {
    this.stopGame();
    this.socket.close();
  }
};

OnlineClient.prototype.stopGame = function() {
  if(this.game != null && this.game.gameUI != null) {
    this.game.kill();
    this.game.gameUI.setKill();
  }
};

OnlineClient.prototype.displayRooms = function(callback) {
  var ioRooms;

  if(this.port != null) {
    ioRooms = new io(this.url + ":" + this.port + "/rooms");
  } else {
    ioRooms = new io(this.url + "/rooms");
  }

  ioRooms.once("rooms", function(data) {
    callback(data);
    ioRooms.close();
  });

  ioRooms.once("error", function() {
    callback({ error: true });
    ioRooms.close();
  });

  ioRooms.once("connect_error", function() {
    callback({ error: true });
    ioRooms.close();
  });
};

OnlineClient.prototype.createRoom = function(data, callback) {
  var ioCreate;

  if(this.port != null) {
    ioCreate = new io(this.url + ":" + this.port + "/createRoom");
  } else {
    ioCreate = new io(this.url + "/createRoom");
  }

  ioCreate.once("connect", function() {
    ioCreate.emit("create", data);
  });

  ioCreate.once("process", function(data) {
    if(data.success != null) {
      callback({
        success: data.success,
        connection_error: false,
        code: data.code
      });
    } else {
      callback({
        success: false,
        connection_error: true,
        code: null
      });
    }

    ioCreate.close();
  });

  ioCreate.once("error", function() {
    callback({
      success: false,
      connection_error: true
    });
    ioCreate.close();
  });

  ioCreate.once("connect_error", function() {
    callback({
      success: false,
      connection_error: true
    });
    ioCreate.close();
  });
};

OnlineClient.prototype.joinRoom = function(code, callback) {
  if(this.socket != null) {
    this.socket.emit("join-room", code);

    var self = this;
    var successConnect = false;

    this.socket.once("join-room", function(data) {
      self.currentRoom = code;
      successConnect = true;
      callback(data);
    });

    this.socket.once("error", function() {
      if(!successConnect) {
        callback({
          success: false
        });
        self.disconnect();
      }
    });
  
    this.socket.once("connect_error", function() {
      if(!successConnect) {
        callback({
          success: false
        });
        self.disconnect();
      }
    });
  }
};

OnlineClient.prototype.getGame = function(ui) {
  if(this.socket != null && this.currentRoom && ui != null) {
    this.game = null;
    this.stopGame();
    this.game = new GameControllerSocket(this.socket, ui);
    ui.controller = this.game;
    return this.game;
  }
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = OnlineClient;
}