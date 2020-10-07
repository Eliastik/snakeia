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
import GameConstants from "./Constants";
import Reactor from "./Reactor";

export default class GameController {
  constructor(engine, ui) {
    this.gameUI = ui;
    this.gameEngine = engine;
    // Copy of game engine variables
    this.grid = null;
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
    this.onlineMode = false;
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
    this.update("init", {
      "snakes": this.gameEngine.snakes,
      "grid": this.gameEngine.grid,
      "enablePause": this.gameEngine.enablePause,
      "enableRetry": this.gameEngine.enableRetry,
      "progressiveSpeed": this.gameEngine.progressiveSpeed,
      "offsetFrame": this.gameEngine.speed * GameConstants.Setting.TIME_MULTIPLIER,
      "errorOccurred": this.gameEngine.errorOccurred
    });

    this.gameEngine.onReset(() => {
      this.update("reset", {
        "paused": this.gameEngine.paused,
        "isReseted": this.gameEngine.isReseted,
        "exited": this.gameEngine.exited,
        "grid": this.gameEngine.grid,
        "numFruit": this.gameEngine.numFruit,
        "ticks": this.gameEngine.ticks,
        "scoreMax": this.gameEngine.scoreMax,
        "gameOver": this.gameEngine.gameOver,
        "gameFinished": this.gameEngine.gameFinished,
        "gameMazeWin": this.gameEngine.gameMazeWin,
        "starting": this.gameEngine.starting,
        "initialSpeed": this.gameEngine.initialSpeed,
        "speed": this.gameEngine.speed,
        "snakes": this.gameEngine.snakes,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": this.gameEngine.errorOccurred,
        "offsetFrame": this.gameEngine.speed * GameConstants.Setting.TIME_MULTIPLIER,
        "aiStuck": this.gameEngine.aiStuck,
        "precAiStuck": false
      });

      this.reactor.dispatchEvent("onReset");
    });

    this.gameEngine.onStart(() => {
      this.update("start", {
        "snakes": this.gameEngine.snakes,
        "grid": this.gameEngine.grid,
        "starting": this.gameEngine.starting,
        "countBeforePlay": this.gameEngine.countBeforePlay,
        "paused": this.gameEngine.paused,
        "isReseted": this.gameEngine.isReseted,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": this.gameEngine.errorOccurred
      });
      this.reactor.dispatchEvent("onStart");
    });

    this.gameEngine.onPause(() => {
      this.update("pause", {
        "paused": this.gameEngine.paused,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": this.gameEngine.errorOccurred
      });
      this.reactor.dispatchEvent("onPause");
    });

    this.gameEngine.onContinue(() => {
      this.update("continue", {
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": this.gameEngine.errorOccurred
      });
      this.reactor.dispatchEvent("onContinue");
    });

    this.gameEngine.onStop(() => {
      this.update("stop", {
        "paused": this.gameEngine.paused,
        "scoreMax": this.gameEngine.scoreMax,
        "gameOver": this.gameEngine.gameOver,
        "gameFinished": this.gameEngine.gameFinished,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": this.gameEngine.errorOccurred
      });
      this.reactor.dispatchEvent("onStop");
    });

    this.gameEngine.onExit(() => {
      this.update("exit", {
        "paused": this.gameEngine.paused,
        "gameOver": this.gameEngine.gameOver,
        "gameFinished": this.gameEngine.gameFinished,
        "exited": this.gameEngine.exited,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": this.gameEngine.errorOccurred
      });
      this.reactor.dispatchEvent("onExit");
    });

    this.gameEngine.onKill(() => {
      this.update("kill", {
        "paused": this.gameEngine.paused,
        "gameOver": this.gameEngine.gameOver,
        "killed": this.gameEngine.killed,
        "snakes": this.gameEngine.snakes,
        "gameFinished": this.gameEngine.gameFinished,
        "grid": this.gameEngine.grid,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": this.gameEngine.errorOccurred
      });

      this.reactor.dispatchEvent("onKill");
    });

    this.gameEngine.onScoreIncreased(() => {
      this.reactor.dispatchEvent("onScoreIncreased");
    });

    this.gameEngine.onUpdate(() => {
      this.update("update", {
        "paused": this.gameEngine.paused,
        "isReseted": this.gameEngine.isReseted,
        "exited": this.gameEngine.exited,
        "grid": this.gameEngine.grid,
        "numFruit": this.gameEngine.numFruit,
        "ticks": this.gameEngine.ticks,
        "scoreMax": this.gameEngine.scoreMax,
        "gameOver": this.gameEngine.gameOver,
        "gameFinished": this.gameEngine.gameFinished,
        "gameMazeWin": this.gameEngine.gameMazeWin,
        "starting": this.gameEngine.starting,
        "initialSpeed": this.gameEngine.initialSpeed,
        "speed": this.gameEngine.speed,
        "snakes": this.gameEngine.snakes,
        "countBeforePlay": this.gameEngine.countBeforePlay,
        "numFruit": this.gameEngine.numFruit,
        "offsetFrame": 0,
        "errorOccurred": this.gameEngine.errorOccurred,
        "aiStuck": this.gameEngine.aiStuck
      });

      this.reactor.dispatchEvent("onUpdate");
    });

    this.gameEngine.onUpdateCounter(() => {
      this.update("updateCounter", {
        "paused": this.gameEngine.paused,
        "isReseted": this.gameEngine.isReseted,
        "exited": this.gameEngine.exited,
        "grid": this.gameEngine.grid,
        "numFruit": this.gameEngine.numFruit,
        "ticks": this.gameEngine.ticks,
        "scoreMax": this.gameEngine.scoreMax,
        "gameOver": this.gameEngine.gameOver,
        "gameFinished": this.gameEngine.gameFinished,
        "gameMazeWin": this.gameEngine.gameMazeWin,
        "starting": this.gameEngine.starting,
        "initialSpeed": this.gameEngine.initialSpeed,
        "speed": this.gameEngine.speed,
        "snakes": this.gameEngine.snakes,
        "countBeforePlay": this.gameEngine.countBeforePlay,
        "numFruit": this.gameEngine.numFruit,
        "errorOccurred": this.gameEngine.errorOccurred
      });
      
      this.reactor.dispatchEvent("onUpdateCounter");
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

    const playerSnake = this.snakes[this.getCurrentPlayer()];

    if(playerSnake != null && playerSnake.lastKey != null) {
      playerSnake.lastKey = key;
    }
  }

  getCurrentPlayer() {
    if(this.snakes != null) {
      const nbPlayers = this.getNBPlayer(GameConstants.PlayerType.HUMAN);
      const nbPlayersHybrid = this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI);
    
      for(let i = 0; i < this.snakes.length; i++) {
        if((this.currentPlayer == null && nbPlayers <= 1 && nbPlayersHybrid <= 1 && (this.snakes[i] && (this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI)) || this.currentPlayer == (i + 1))) {
          return i;
        }
      }
    }

    return -1;
  }

  getNBPlayer(type) {
    let numPlayer = 0;

    if(this.snakes != null) {
      for(let i = 0; i < this.snakes.length; i++) {
        if(this.snakes[i] && this.snakes[i].player == type) {
          numPlayer++;
        }
      }
    }

    return numPlayer;
  }

  getPlayer(num, type) {
    let numPlayer = 0;

    if(this.snakes != null) {
      for(let i = 0; i < this.snakes.length; i++) {
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
      const dataKeys = Object.keys(data);

      for(let i = 0; i < dataKeys.length; i++) {
        if((!this.clientSidePredictionsMode && !this.onlineMode) || (this.clientSidePredictionsMode && (dataKeys[i] == "snakes" || dataKeys[i] == "grid" || dataKeys[i] == "offsetFrame" || dataKeys[i] == "gameOver") && (!this.onlineMode || (this.onlineMode && dataKeys[i] != "errorOccurred"))) || (!this.clientSidePredictionsMode && this.onlineMode && dataKeys[i] != "errorOccurred")) {
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