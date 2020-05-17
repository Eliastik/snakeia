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
import GameController from "./gameController";
import Grid from "./grid";
import Snake from "./snake";
import Position from "./position";
import { NotificationMessage } from "jsgametools";
import { Game } from "./shim";

export default class GameControllerSocket extends GameController {
  constructor(socket, ui, enableClientSidePredictions, settings) {
    super(new Game(null, null, null, null, null, null, null, null, null, null, null, settings, ui), ui);
    this.enableClientSidePredictions = enableClientSidePredictions || false;
    this.socket = socket;
    this.pingLatency = -1;
  }

  parseData(m, d, updateEngine) {
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
      this.update(data[0], data[1], updateEngine);
    }
  };

  init() {
    var self = this;

    this.socket.on("init", function(data) {
      self.parseData("init", data, self.enableClientSidePredictions);

      if(self.enableClientSidePredictions) {
        self.gameEngine.update("update", { "clientSidePredictionsMode": true }, true);
        if(data && data["currentPlayer"])
          self.gameEngine.currentPlayer = data["currentPlayer"];
        if(data && data["countBeforePlay"] < 0)
          self.gameEngine.forceStart();
      }
    });

    this.socket.on("reset", function(data) {
      self.parseData("reset", data, self.enableClientSidePredictions);
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
      self.parseData("stop", data, self.enableClientSidePredictions);
      self.reactor.dispatchEvent("onStop");
    });

    this.socket.on("exit", function(data) {
      self.parseData("exit", data);
      self.gameEngine.exit();
      self.reactor.dispatchEvent("onExit");
    });

    this.socket.on("kill", function(data) {
      self.parseData("kill", data);
      self.gameEngine.kill();
      self.reactor.dispatchEvent("onKill");
    });

    this.socket.on("scoreIncreased", function(data) {
      self.parseData("scoreIncreased", data);
      self.reactor.dispatchEvent("onScoreIncreased");
    });

    this.socket.on("update", function(data) {
      self.parseData("update", data, self.enableClientSidePredictions);

      if(!self.gameEngine.clientSidePredictionsMode) {
        self.gameUI.offsetFrame = 0;
      }

      self.reactor.dispatchEvent("onUpdate");
    });

    this.socket.on("updateCounter", function(data) {
      self.parseData("updateCounter", data);

      if(self.enableClientSidePredictions && data && data.countBeforePlay < 0) {
        self.gameEngine.forceStart();
      }

      self.reactor.dispatchEvent("onUpdateCounter");
    });

    this.socket.on("notification", function(text, duration, textColor, backgroundColor, foreground) {
      self.gameUI.setNotification(new NotificationMessage(text, textColor, backgroundColor, duration, null, null, null, foreground));
    });

    this.socket.once("error", function() {
      self.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, "rgba(231, 76, 60, 0.5)", null, null, null, null, true));
    });

    this.socket.once("connect_error", function() {
      self.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, "rgba(231, 76, 60, 0.5)", null, null, null, null, true));
    });

    this.socket.once("connect_timeout", function() {
      self.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, "rgba(231, 76, 60, 0.5)", null, null, null, null, true));
    });

    this.socket.once("reconnect_error", function() {
      self.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, "rgba(231, 76, 60, 0.5)", null, null, null, null, true));
    });
  }

  reset() {
    this.socket.emit("reset");
  }
  
  start() {
    this.socket.emit("start");
  }
  
  stop() {
    this.socket.emit("stop");
  }

  finish(finish) {
    this.socket.emit(finish ? "finish" : "stop");
  }
  
  pause() {
    this.socket.emit("pause");
  }

  kill() {
    this.socket.emit("kill");
  }

  tick() {
    this.socket.emit("tick");
  }

  exit() {
    this.socket.emit("exit");
  }

  key(key) {
    this.socket.emit("key", key);
    this.gameEngine.key(key);
    this.lastKey = this.gameEngine.lastKey;
  }

  forceStart() {
    this.socket.emit("forceStart");
  }

  updateEngine(key, value) {
    this.gameEngine.updateEngine(key, value);
  }
}