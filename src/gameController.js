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
import GameConstants from "./constants";
import Reactor from "./reactor";

export default class GameController {
  constructor(engine, ui) {
    this.gameUI = ui;
    this.gameEngine = engine;
    // Copy of game engine variables
    this.snakes = null;
    this.lastKey = -1;
    this.paused = false;
    this.isReseted = false;
    this.exited = false;
    this.gameOver = false;
    this.starting = false;
    this.scoreMax = false;
    this.gameFinished = false;
    this.errorOccurred = false;
    this.clientSidePredictionsMode = false;
    this.currentPlayer = null;
    // Events
    this.reactor = new Reactor();
    this.reactor.registerEvent("onStart");
    this.reactor.registerEvent("onPause");
    this.reactor.registerEvent("onContinue");
    this.reactor.registerEvent("onReset");
    this.reactor.registerEvent("onStop");
    this.reactor.registerEvent("onExit");
    this.reactor.registerEvent("onKill");
    this.reactor.registerEvent("onScoreIncreased");
    this.reactor.registerEvent("onUpdate");
    this.reactor.registerEvent("onUpdateCounter");
  }
  
  init() {
    var self = this;
    
    this.update("init", {
      "snakes": this.gameEngine.snakes,
      "grid": this.gameEngine.grid,
      "enablePause": this.gameEngine.enablePause,
      "enableRetry": this.gameEngine.enableRetry,
      "progressiveSpeed": this.gameEngine.progressiveSpeed,
      "offsetFrame": this.gameEngine.speed * GameConstants.Setting.TIME_MULTIPLIER,
      "errorOccurred": this.gameEngine.errorOccurred
    });

    this.gameEngine.onReset(function() {
      self.update("reset", {
        "paused": self.gameEngine.paused,
        "isReseted": self.gameEngine.isReseted,
        "exited": self.gameEngine.exited,
        "grid": self.gameEngine.grid,
        "numFruit": self.gameEngine.numFruit,
        "ticks": self.gameEngine.ticks,
        "scoreMax": self.gameEngine.scoreMax,
        "gameOver": self.gameEngine.gameOver,
        "gameFinished": self.gameEngine.gameFinished,
        "gameMazeWin": self.gameEngine.gameMazeWin,
        "starting": self.gameEngine.starting,
        "initialSpeed": self.gameEngine.initialSpeed,
        "speed": self.gameEngine.speed,
        "snakes": self.gameEngine.snakes,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": self.gameEngine.errorOccurred,
        "offsetFrame": self.gameEngine.speed * GameConstants.Setting.TIME_MULTIPLIER
      });
      self.reactor.dispatchEvent("onReset");
    });

    this.gameEngine.onStart(function() {
      self.update("start", {
        "snakes": self.gameEngine.snakes,
        "grid": self.gameEngine.grid,
        "starting": self.gameEngine.starting,
        "countBeforePlay": self.gameEngine.countBeforePlay,
        "paused": self.gameEngine.paused,
        "isReseted": self.gameEngine.isReseted,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onStart");
    });

    this.gameEngine.onPause(function() {
      self.update("pause", {
        "paused": self.gameEngine.paused,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onPause");
    });

    this.gameEngine.onContinue(function() {
      self.update("continue", {
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onContinue");
    });

    this.gameEngine.onStop(function() {
      self.update("stop", {
        "paused": self.gameEngine.paused,
        "scoreMax": self.gameEngine.scoreMax,
        "gameOver": self.gameEngine.gameOver,
        "gameFinished": self.gameEngine.gameFinished,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onStop");
    });

    this.gameEngine.onExit(function() {
      self.update("exit", {
        "paused": self.gameEngine.paused,
        "gameOver": self.gameEngine.gameOver,
        "gameFinished": self.gameEngine.gameFinished,
        "exited": self.gameEngine.exited,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onExit");
    });

    this.gameEngine.onKill(function() {
      self.update("kill", {
        "paused": self.gameEngine.paused,
        "gameOver": self.gameEngine.gameOver,
        "killed": self.gameEngine.killed,
        "snakes": self.gameEngine.snakes,
        "gameFinished": self.gameEngine.gameFinished,
        "grid": self.gameEngine.grid,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onKill");
    });

    this.gameEngine.onScoreIncreased(function() {
      self.reactor.dispatchEvent("onScoreIncreased");
    });

    this.gameEngine.onUpdate(function() {
      self.update("update", {
        "paused": self.gameEngine.paused,
        "isReseted": self.gameEngine.isReseted,
        "exited": self.gameEngine.exited,
        "grid": self.gameEngine.grid,
        "numFruit": self.gameEngine.numFruit,
        "ticks": self.gameEngine.ticks,
        "scoreMax": self.gameEngine.scoreMax,
        "gameOver": self.gameEngine.gameOver,
        "gameFinished": self.gameEngine.gameFinished,
        "gameMazeWin": self.gameEngine.gameMazeWin,
        "starting": self.gameEngine.starting,
        "initialSpeed": self.gameEngine.initialSpeed,
        "speed": self.gameEngine.speed,
        "snakes": self.gameEngine.snakes,
        "countBeforePlay": self.gameEngine.countBeforePlay,
        "numFruit": self.gameEngine.numFruit,
        "offsetFrame": 0,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onUpdate");
    });

    this.gameEngine.onUpdateCounter(function() {
      self.update("updateCounter", {
        "paused": self.gameEngine.paused,
        "isReseted": self.gameEngine.isReseted,
        "exited": self.gameEngine.exited,
        "grid": self.gameEngine.grid,
        "numFruit": self.gameEngine.numFruit,
        "ticks": self.gameEngine.ticks,
        "scoreMax": self.gameEngine.scoreMax,
        "gameOver": self.gameEngine.gameOver,
        "gameFinished": self.gameEngine.gameFinished,
        "gameMazeWin": self.gameEngine.gameMazeWin,
        "starting": self.gameEngine.starting,
        "initialSpeed": self.gameEngine.initialSpeed,
        "speed": self.gameEngine.speed,
        "snakes": self.gameEngine.snakes,
        "countBeforePlay": self.gameEngine.countBeforePlay,
        "numFruit": self.gameEngine.numFruit,
        "errorOccurred": self.gameEngine.errorOccurred
      });
      self.reactor.dispatchEvent("onUpdateCounter");
    });
  }

  reset() {
    this.gameEngine.reset();
  }

  start() {
    this.gameEngine.start();
  }

  stop() {
    this.gameEngine.stop();
  }

  finish(finish) {
    this.gameEngine.stop(finish);
  }

  pause() {
    this.gameEngine.pause();
  }

  kill() {
    this.gameEngine.kill();
  }

  tick() {
    this.gameEngine.paused = false;
    this.gameEngine.countBeforePlay = -1;
    this.gameEngine.tick();
  }

  exit() {
    this.gameEngine.exit();
  }

  forceStart() {
    this.gameEngine.forceStart();
  }

  updateEngine(key, data) {
    this.gameEngine[key] = data;
  }

  setDisplayFPS(display) {
    this.gameUI.setDisplayFPS(display);
  }

  setNotification(notification) {
    this.gameUI.setNotification(notification);
  }

  closeRanking() {
    this.gameUI.gameRanking && this.gameUI.gameRanking.forceClose();
  }

  setTimeToDisplay(time) {
    this.gameUI.setTimeToDisplay(time);
  }

  setBestScore(score) {
    this.gameUI.setBestScore(score);
  }

  key(key) {
    this.gameEngine.lastKey = key;
    this.lastKey = key;

    var playerSnake = this.snakes[this.getCurrentPlayer()];

    if(playerSnake != null && playerSnake.lastKey != null) {
      playerSnake.lastKey = key;
    }
  }

  getCurrentPlayer() {
    if(this.snakes != null) {
      var nbPlayers = this.getNBPlayer(GameConstants.PlayerType.HUMAN);
      var nbPlayersHybrid = this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI);
    
      for(var i = 0; i < this.snakes.length; i++) {
        if((this.currentPlayer == null && nbPlayers <= 1 && nbPlayersHybrid <= 1 && (this.snakes[i] && (this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI)) || this.currentPlayer == (i + 1))) {
          return i;
        }
      }
    }

    return -1;
  }

  getNBPlayer(type) {
    var numPlayer = 0;

    if(this.snakes != null) {
      for(var i = 0; i < this.snakes.length; i++) {
        if(this.snakes[i] && this.snakes[i].player == type) {
          numPlayer++;
        }
      }
    }

    return numPlayer;
  }

  getPlayer(num, type) {
    var numPlayer = 0;

    if(this.snakes != null) {
      for(var i = 0; i < this.snakes.length; i++) {
        if(this.snakes[i] && this.snakes[i].player == type) {
          numPlayer++;
        }
    
        if(numPlayer == num) {
          return this.snakes[i];
        }
      }
    }

    return null;
  }

  update(message, data, updateEngine) {
    if(this.gameUI != null && data != null) {
      var dataKeys = Object.keys(data);

      for(var i = 0; i < dataKeys.length; i++) {
        if(!this.clientSidePredictionsMode || (this.clientSidePredictionsMode && (dataKeys[i] == "snakes" || dataKeys[i] == "grid" || dataKeys[i] == "offsetFrame" || dataKeys[i] == "gameOver"))) {
          if(Object.prototype.hasOwnProperty.call(this.gameUI, dataKeys[i]) && typeof(data[dataKeys[i]]) !== "function" && typeof(this.gameUI[dataKeys[i]]) !== "function") {
            this.gameUI[dataKeys[i]] = data[dataKeys[i]];
          }

          if(updateEngine) {
            if(data.snakes && data.snakes[this.getCurrentPlayer()]) {
              data.snakes[this.getCurrentPlayer()].lastKey = this.lastKey;
              this.lastKey = -1;
            }

            if(data.grid) {
              data.grid.rngGame = null;
              data.grid.rngGrid = null;
            }

            this.updateEngine(dataKeys[i], data[dataKeys[i]]);
          }
    
          if(Object.prototype.hasOwnProperty.call(this, dataKeys[i]) && typeof(data[dataKeys[i]]) !== "function" && typeof(this[dataKeys[i]]) !== "function") {
            this[dataKeys[i]] = data[dataKeys[i]];
          }
        }
      }

      if(data.hasOwnProperty("killed") && data.killed && this.gameUI && this.gameUI.setKill) {
        this.gameUI.setKill();
      }
    }
  }

  onReset(callback) {
    this.reactor.addEventListener("onReset", callback);
  }

  onStart(callback) {
    this.reactor.addEventListener("onStart", callback);
  }

  onContinue(callback) {
    this.reactor.addEventListener("onContinue", callback);
  }

  onStop(callback) {
    this.reactor.addEventListener("onStop", callback);
  }

  onPause(callback) {
    this.reactor.addEventListener("onPause", callback);
  }

  onExit(callback) {
    this.reactor.addEventListener("onExit", callback);
  }

  onKill(callback) {
    this.reactor.addEventListener("onKill", callback);
  }

  onScoreIncreased(callback) {
    this.reactor.addEventListener("onScoreIncreased", callback);
  }
}