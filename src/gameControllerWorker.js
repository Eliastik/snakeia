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
import GameController from "./gameController";
import Grid from "./grid";
import Snake from "./snake";
import Position from "./position";

export default class GameControllerWorker extends GameController {
  constructor (game, ui) {
    super(game, ui);
    this.worker;
  }

  init() {
    if(window.Worker) {
      try {
        this.worker = new Worker("dist/GameEngineWorker.js");
      } catch(e) {
        this.update("init", {
          "errorOccurred": true
        });
        return;
      }

      if(this.worker instanceof Worker) {
        if(this.gameEngine && this.gameEngine.grid && this.gameEngine.grid.rngGrid) this.gameEngine.grid.rngGrid = null;
        if(this.gameEngine && this.gameEngine.grid && this.gameEngine.grid.rngGame) this.gameEngine.grid.rngGame = null;
        
        this.worker.postMessage(["init", this.gameEngine]);

        this.worker.onmessage = e => {
          var data = e.data;

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
            
            switch(data[0]) {
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
    if(this.worker instanceof Worker) this.worker.postMessage(["reset"]);
  }

  start() {
    if(this.worker instanceof Worker) this.worker.postMessage(["start"]);
  }

  stop() {
    if(this.worker instanceof Worker) this.worker.postMessage(["stop"]);
  }

  finish(finish) {
    if(this.worker instanceof Worker) this.worker.postMessage([finish ? "finish" : "stop"]);
  }

  pause() {
    if(this.worker instanceof Worker) this.worker.postMessage(["pause"]);
  }

  kill() {
    if(this.worker instanceof Worker) this.worker.postMessage(["kill"]);
  }

  tick() {
    if(this.worker instanceof Worker) this.worker.postMessage(["tick"]);
  }

  exit() {
    if(this.worker instanceof Worker) this.worker.postMessage(["exit"]);
  }

  key(key) {
    if(this.worker instanceof Worker) this.worker.postMessage(["key", key]);
  }

  forceStart() {
    if(this.worker instanceof Worker) this.worker.postMessage(["forceStart"]);
  }

  updateEngine(key, data) {
    if(this.worker instanceof Worker) this.worker.postMessage(["update", {
      "key": key,
      "data": data
    }]);
  }
}