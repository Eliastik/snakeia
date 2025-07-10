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
import GameController from "./GameController.js";
import Grid from "./Grid.js";
import Snake from "./Snake.js";
import Position from "./Position.js";

export default class GameControllerWorker extends GameController {
  constructor(game, ui) {
    super(game, ui);
    this.worker;
    this.workerReady = false;
    this.messageQueue = []; // Queue of message if the worker is still loading
  }

  init() {
    if(window.Worker) {
      try {
        this.worker = new Worker("dist/GameEngineWorker.js");
      } catch(e) {
        console.error(e);
        this.update("init", {
          "errorOccurred": true
        });
        return;
      }

      this.update("init", {
        "engineLoading": true
      });

      if(this.worker instanceof Worker) {
        if(this.gameEngine && this.gameEngine.grid && this.gameEngine.grid.rngGrid) this.gameEngine.grid.rngGrid = null;
        if(this.gameEngine && this.gameEngine.grid && this.gameEngine.grid.rngGame) this.gameEngine.grid.rngGame = null;

        this.worker.onmessage = e => {
          const message = e.data;

          if(message == "ready") {
            this.worker.postMessage(["init", this.gameEngine]);
          } else {
            if(Array.isArray(message) && message.length > 1) {
              const key = message[0];
              const data = message[1];

              let grid = this.gameUI.grid;
  
              if(Object.prototype.hasOwnProperty.call(data, "grid") && data["grid"] != null) {
                grid = Object.assign(new Grid(), data["grid"]);
                data["grid"] = grid;
              }
              
              if(Object.prototype.hasOwnProperty.call(data, "snakes") && data["snakes"] != null) {
                for(let i = 0; i < data["snakes"].length; i++) {
                  data["snakes"][i].grid = grid;
                  data["snakes"][i] = Object.assign(new Snake(), data["snakes"][i]);
  
                  for(let j = 0; j < data["snakes"][i].queue.length; j++) {
                    data["snakes"][i].queue[j] = Object.assign(new Position(), data["snakes"][i].queue[j]);
                  }
                }
              }
              
              this.update(key, data);
              
              switch(key) {
              case "init":
                this.workerReady = true;
                this.update("init", { "engineLoading": false });
                this.passQueuedMessages();
                break;
              case "reset":
                this.reactor.dispatchEvent("onReset");
                break;
              case "start":
                this.reactor.dispatchEvent("onStart");
                break;
              case "pause":
                this.reactor.dispatchEvent("onPause");
                break;
              case "continue":
                this.reactor.dispatchEvent("onContinue");
                break;
              case "stop":
                this.reactor.dispatchEvent("onStop");
                break;
              case "exit":
                this.reactor.dispatchEvent("onExit");
                break;
              case "kill":
                this.reactor.dispatchEvent("onKill");
                this.worker.terminate();
                break;
              case "scoreIncreased":
                this.reactor.dispatchEvent("onScoreIncreased");
                break;
              case "update":
                this.reactor.dispatchEvent("onUpdate");
                break;
              case "updateCounter":
                this.reactor.dispatchEvent("onUpdateCounter");
                break;
              }
            }
          }
        };
      } else {
        if(this.gameUI != null) {
          this.update("init", {
            "errorOccurred": true
          });
        }
      }
    } else {
      if(this.gameUI != null) {
        this.update("init", {
          "errorOccurred": true
        });
      }
    }
  }

  reset() {
    this.passMessage(["reset"]);
  }

  start() {
    this.passMessage(["start"]);
  }

  stop() {
    this.passMessage(["stop"]);
  }

  finish(finish) {
    this.passMessage([finish ? "finish" : "stop"]);
  }

  pause() {
    this.passMessage(["pause"]);
  }

  kill() {
    this.passMessage(["kill"]);
  }

  tick() {
    this.passMessage(["tick"]);
  }

  exit() {
    this.passMessage(["exit"]);
  }

  key(key) {
    this.passMessage(["key", key]);
  }

  forceStart() {
    this.passMessage(["forceStart"]);
  }

  updateEngine(key, data) {
    this.passMessage(["update", {
      "key": key,
      "data": data
    }]);
  }

  destroySnakes(exceptionIds, types) {
    this.passMessage(["destroySnakes", exceptionIds, types]);
  }

  passMessage(message) {
    if(this.workerReady && this.worker instanceof Worker) {
      this.worker.postMessage(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  passQueuedMessages() {
    if(this.workerReady && this.worker instanceof Worker) {
      this.messageQueue.forEach(message => {
        this.worker.postMessage(message);
      });

      this.messageQueue = [];
    }
  }
}