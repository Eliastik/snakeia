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
  this.socket;
  this.serverSettings;
  this.currentRoom;
  this.game;
  this.intervalReconnect;
  this.creatingRoom = false;
  this.joiningRoom = false;
  this.loadingRooms = false;
}

OnlineClient.prototype.connect = function(url, port, callback) {
  this.disconnect();

  this.url = url;
  this.port = port;

  if(this.url != null && this.url.charAt(this.url.length - 1) == "/") {
    this.url = this.url.substring(0, this.url.length - 1);
  }
  
  this.socket = new io(this.getURL());

  var self = this;

  this.socket.once("connect", function() {
    callback(true);
    successConnect = true;
  });

  this.socket.on("error", function(data) {
    callback(false, data);
    self.disconnect();
  });

  this.socket.on("connect_error", function(data) {
    callback(false, data);
    self.disconnect();
  });
};

OnlineClient.prototype.autoReconnect = function(time, callback) {
  if(this.intervalReconnect) clearInterval(this.intervalReconnect);
  this.disconnect();

  var self = this;

  this.intervalReconnect = setInterval(function() {
    self.connect(self.url, self.port, function(success) {
      if(success) {
        clearInterval(self.intervalReconnect);
        callback();
      }
    });
  }, time);
};

OnlineClient.prototype.disconnect = function() {
  if(this.socket != null) {
    this.stopGame();
    this.socket.close();
    this.creatingRoom = false;
    this.joiningRoom = false;
    this.loadingRooms = false;
  }
};

OnlineClient.prototype.stopGame = function() {
  if(this.game != null && this.game.gameUI != null) {
    this.game.kill();
    this.game.gameUI.setKill();
  }
};

OnlineClient.prototype.displayRooms = function(callback) {
  if(!this.loadingRooms) {
    this.loadingRooms = true;

    var ioRooms = new io(this.getURL() + "/rooms");
    var self = this;
  
    ioRooms.once("rooms", function(data) {
      callback(true, data);
      ioRooms.close();
      self.loadingRooms = false;
      self.serverSettings = data.settings;
    });
  
    ioRooms.once("error", function(data) {
      callback(false, data);
      ioRooms.close();
      self.loadingRooms = false;
    });
  
    ioRooms.once("connect_error", function() {
      callback(false, data);
      ioRooms.close();
      self.loadingRooms = false;
    });
  } else {
    callback(false, null);
  }
};

OnlineClient.prototype.createRoom = function(data, callback) {
  if(!this.creatingRoom) {
    this.creatingRoom = true;
    
    var ioCreate = new io(this.getURL() + "/createRoom");
    var self = this;

    ioCreate.once("connect", function() {
      ioCreate.emit("create", data);
    });

    ioCreate.once("process", function(data) {
      if(data.success != null) {
        callback({
          success: data.success,
          connection_error: false,
          code: data.code,
          errorCode: data.errorCode
        });
      } else {
        callback({
          success: false,
          connection_error: true,
          code: null,
          errorCode: (data != null ? data : null)
        });
      }

      ioCreate.close();
      self.creatingRoom = false;
    });

    ioCreate.once("error", function(data) {
      callback({
        success: false,
        connection_error: true,
        errorCode: (data != null ? data : null)
      });
      ioCreate.close();
      self.creatingRoom = false;
    });

    ioCreate.once("connect_error", function(data) {
      callback({
        success: false,
        connection_error: true,
        errorCode: (data != null ? data : null)
      });
      ioCreate.close();
      self.creatingRoom = false;
    });
  } else {
    callback({
      success: false,
      connection_error: false
    });
  }
};

OnlineClient.prototype.joinRoom = function(code, callback) {
  if(!this.joiningRoom) {
    this.joiningRoom = true;

    if(this.socket != null) {
      this.socket.emit("join-room", code);

      var self = this;

      this.socket.once("join-room", function(data) {
        self.currentRoom = code;
        successConnect = true;
        callback(data);
        self.joiningRoom = false;
      });
    }
  } else {
    callback({
      success: false
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

OnlineClient.prototype.getURL = function() {
  if(this.port != null && this.port.trim() != "") {
    return this.url + ":" + this.port;
  } 
  
  return this.url;
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = OnlineClient;
}