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
  var i18next = require('../libs/i18next.min');
  var GameController = require('./gameController');
  var Grid = require('./grid');
  var Snake = require('./snake');
  var Position = require('./position');
  var NotificationMessage = require('./notificationMessage');
}

function GameControllerSocket(socket, ui) {
  GameController.call(this, null, ui);

  this.socket = socket;

  this.parseData = function(m, d) {
    var data = [m, d];

    if(data.length > 1) {
      var grid = this.gameUI.grid;

      if(data[1].hasOwnProperty("grid") && data[1]["grid"] != null) {
        grid = Object.assign(new Grid(), data[1]["grid"]);
        data[1]["grid"] = grid;
      }
      
      if(data[1].hasOwnProperty("snakes") && data[1]["snakes"] != null) {
        for(var i = 0; i < data[1]["snakes"].length; i++) {
          data[1]["snakes"][i].grid = grid;
          data[1]["snakes"][i] = Object.assign(new Snake(), data[1]["snakes"][i]);

          for(var j = 0; j < data[1]["snakes"][i].queue.length; j++) {
            data[1]["snakes"][i].queue[j] = Object.assign(new Position(), data[1]["snakes"][i].queue[j]);
          }
        }
      }
      
      this.update(data[0], data[1]);
    }
  };

  this.init = function() {
    var self = this;

    this.socket.on("init", function(data) {
      self.parseData("init", data);
    });

    this.socket.on("reset", function(data) {
      self.parseData("reset", data);
      self.reactor.dispatchEvent("onReset");
    });

    this.socket.on("start", function(data) {
      self.parseData("start", data);
      self.reactor.dispatchEvent("onStart");
    });

    this.socket.on("pause", function(data) {
      self.parseData("pause", data);
      self.reactor.dispatchEvent("onPause");
    });

    this.socket.on("continue", function(data) {
      self.parseData("continue", data);
      self.reactor.dispatchEvent("onContinue");
    });

    this.socket.on("stop", function(data) {
      self.parseData("stop", data);
      self.reactor.dispatchEvent("onStop");
    });

    this.socket.on("exit", function(data) {
      self.parseData("exit", data);
      self.reactor.dispatchEvent("onExit");
    });

    this.socket.on("kill", function(data) {
      self.parseData("kill", data);
      self.reactor.dispatchEvent("onKill");
    });

    this.socket.on("scoreIncreased", function(data) {
      self.parseData("scoreIncreased", data);
      self.reactor.dispatchEvent("onScoreIncreased");
    });

    this.socket.on("update", function(data) {
      self.parseData("update", data);
      self.reactor.dispatchEvent("onUpdate");
    });

    this.socket.on("updateCounter", function(data) {
      self.parseData("updateCounter", data);
      self.reactor.dispatchEvent("onUpdateCounter");
    });

    this.socket.on("connect_error", function() {
      self.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, "rgba(231, 76, 60, 0.5)", null, null, null, null, true));
    });

    this.socket.on("reconnect_error", function() {
      self.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, "rgba(231, 76, 60, 0.5)", null, null, null, null, true));
    });
  };

  this.reset = function() {
    this.socket.emit("reset");
  };

  this.start = function() {
    this.socket.emit("start");
  };

  this.stop = function() {
    this.socket.emit("stop");
  };

  this.finish = function(finish) {
    this.socket.emit(finish ? "finish" : "stop");
  };

  this.pause = function() {
    this.socket.emit("pause");
  };

  this.kill = function() {
    this.socket.emit("kill");
  };

  this.tick = function() {
    this.socket.emit("tick");
  };

  this.exit = function() {
    this.socket.emit("exit");
  };

  this.key = function(key) {
    this.socket.emit("key", key);
  };

  this.forceStart = function() {
    this.socket.emit("forceStart");
  };
}

// extends GameController
GameControllerSocket.prototype = Object.create(GameController).prototype;
GameControllerSocket.prototype.constructor = GameControllerSocket;

// Export module
if(typeof(module) !== "undefined") {
  module.exports = GameControllerSocket;
}