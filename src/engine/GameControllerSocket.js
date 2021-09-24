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
import GameController from "./GameController";
import Grid from "./Grid";
import Snake from "./Snake";
import Position from "./Position";
import GameConstants from "./Constants";
import { NotificationMessage } from "jsgametools";
import { Game } from "../Shim";

export default class GameControllerSocket extends GameController {
  constructor(socket, ui, enableClientSidePredictions, settings) {
    super(new Game(null, null, null, null, null, null, null, null, null, null, null, settings, ui, true), ui);
    this.enableClientSidePredictions = enableClientSidePredictions || false;
    this.socket = socket;
    this.pingLatency = -1;
  }

  parseData(m, d, updateEngine) {
    const data = [m, d];

    if(data.length > 1) {
      let grid = this.grid;

      if(Object.prototype.hasOwnProperty.call(data[1], "grid") && data[1]["grid"] != null && data[1]["grid"]["grid"] != null) {
        grid = Object.assign(new Grid(), data[1]["grid"]);
        data[1]["grid"] = grid;
      }

      if(Object.prototype.hasOwnProperty.call(data[1], "snakes") && data[1]["snakes"] != null) {
        for(let i = 0; i < data[1]["snakes"].length; i++) {
          data[1]["snakes"][i].grid = grid;
          data[1]["snakes"][i] = Object.assign(new Snake(), data[1]["snakes"][i]);

          for(let j = 0; j < data[1]["snakes"][i].queue.length; j++) {
            data[1]["snakes"][i].queue[j] = Object.assign(new Position(), data[1]["snakes"][i].queue[j]);
          }
        }
      }
      
      this.update(data[0], data[1], updateEngine);
    }
  }

  init() {
    this.socket.on("init", data => {
      this.parseData("init", data, this.enableClientSidePredictions);
      this.gameEngine.update("update", { "engineLoading": false }, true);

      if(this.enableClientSidePredictions) {
        this.gameEngine.update("update", { "clientSidePredictionsMode": true }, true);
        if(data && data["currentPlayer"])
          this.gameEngine.currentPlayer = data["currentPlayer"];
        if(data && data["countBeforePlay"] < 0)
          this.gameEngine.forceStart();
      }
    });

    this.socket.on("reset", data => {
      this.parseData("reset", data, this.enableClientSidePredictions);
      this.reactor.dispatchEvent("onReset");
    });

    this.socket.on("start", data => {
      this.parseData("start", data);
      this.reactor.dispatchEvent("onStart");
    });

    this.socket.on("pause", data => {
      this.parseData("pause", data);
      this.reactor.dispatchEvent("onPause");
    });

    this.socket.on("continue", data => {
      this.parseData("continue", data);
      this.reactor.dispatchEvent("onContinue");
    });

    this.socket.on("stop", data => {
      this.parseData("stop", data, this.enableClientSidePredictions);
      this.reactor.dispatchEvent("onStop");
    });

    this.socket.on("exit", data => {
      this.parseData("exit", data);
      this.gameEngine.exit();
      this.reactor.dispatchEvent("onExit");
    });

    this.socket.on("kill", data => {
      this.parseData("kill", data);
      this.gameEngine.kill();
      this.reactor.dispatchEvent("onKill");
    });

    this.socket.on("scoreIncreased", data => {
      this.parseData("scoreIncreased", data);
      this.reactor.dispatchEvent("onScoreIncreased");
    });

    this.socket.on("update", data => {
      this.parseData("update", data, this.enableClientSidePredictions);

      if(!this.gameEngine.clientSidePredictionsMode) {
        this.gameUI.offsetFrame = 0;
      }

      this.reactor.dispatchEvent("onUpdate");
    });

    this.socket.on("updateCounter", data => {
      this.parseData("updateCounter", data);

      if(data && data.countBeforePlay < 0) {
        if(this.enableClientSidePredictions) {
          this.gameEngine.forceStart();
        }
      }

      this.reactor.dispatchEvent("onUpdateCounter");
    });

    this.socket.on("notification", (text, duration, textColor, backgroundColor, foreground) => {
      this.gameUI.setNotification(new NotificationMessage(text, textColor, backgroundColor, duration, null, null, null, foreground));
    });

    this.socket.once("error", () => {
      this.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, GameConstants.Setting.ERROR_NOTIF_COLOR, null, null, null, null, true));
    });

    this.socket.once("connect_error", () => {
      this.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, GameConstants.Setting.ERROR_NOTIF_COLOR, null, null, null, null, true));
    });

    this.socket.once("connect_timeout", () => {
      this.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, GameConstants.Setting.ERROR_NOTIF_COLOR, null, null, null, null, true));
    });

    this.socket.once("reconnect_error", () => {
      this.gameUI.setNotification(new NotificationMessage(i18next.t("engine.servers.errorConnection"), null, GameConstants.Setting.ERROR_NOTIF_COLOR, null, null, null, null, true));
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