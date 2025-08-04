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
import Reactor from "./Reactor.js";

export default class GameGroup {
  constructor(games) {
    this.games = games == undefined ? [] : games;
    this.reactor = new Reactor();
    this.reactor.registerEvent("onStart");
    this.reactor.registerEvent("onPause");
    this.reactor.registerEvent("onContinue");
    this.reactor.registerEvent("onStop");
    this.reactor.registerEvent("onReset");
    this.reactor.registerEvent("onExit");
    this.reactor.registerEvent("onScoreIncreased");
    
    this.init();
  }

  init() {
    for(let i = 0; i < this.games.length; i++) {
      if(i == 0) {
        this.games[i].enableKeyMenu = true;
      }
      
      this.games[i].onPause((i => {
        this.pauseAll(i);
      }).bind(null, i));

      this.games[i].onContinue((i => {
        this.startAll(i);
      }).bind(null, i));

      this.games[i].onExit((i => {
        this.checkExit(i);
      }).bind(null, i));

      this.games[i].onStop((i => {
        this.checkStop(i);
      }).bind(null, i));

      this.games[i].onReset((i => {
        this.resetAll(i);
      }).bind(null, i));

      this.games[i].onScoreIncreased((i => {
        this.checkOnScoreIncreased(i);
      }).bind(null, i));
    }
  }

  start() {
    this.startAll(null);
  }

  startAll(game) {
    for(let i = 0; i < this.games.length; i++) {
      if(this.games[i].paused && !this.games[i].starting && (game == null || i != game)) {
        this.games[i].start();
      }
    }

    this.reactor.dispatchEvent("onStart");
  }

  onStart(callback) {
    this.reactor.addEventListener("onStart", callback);
  }

  pauseAll(game) {
    for(let i = 0; i < this.games.length; i++) {
      if(!this.games[i].paused && (game == null || i != game)) {
        this.games[i].pause();
      }
    }

    this.reactor.dispatchEvent("onPause");
  }

  onPause(callback) {
    this.reactor.addEventListener("onPause", callback);
  }

  resetAll(game) {
    for(let i = 0; i < this.games.length; i++) {
      if(!this.games[i].isReseted && (game == null || i != game)) {
        this.games[i].reset();
      }
    }

    this.reactor.dispatchEvent("onReset");
  }

  onReset(callback) {
    this.reactor.addEventListener("onReset", callback);
  }

  checkExit(game) {
    let allExited = true;

    for(let i = 0; i < this.games.length; i++) {
      if(!this.games[i].exited) {
        allExited = false;
      }
    }

    if(allExited) {
      this.reactor.dispatchEvent("onExit");
    } else {
      this.startAll(game);
    }
  }

  onExit(callback) {
    this.reactor.addEventListener("onExit", callback);
  }

  checkStop() {
    let allStopped = true;

    for(let i = 0; i < this.games.length; i++) {
      if(!this.games[i].gameOver) {
        allStopped = false;
      }
    }

    if(allStopped) {
      this.reactor.dispatchEvent("onStop");
    }
  }

  onStop(callback) {
    this.reactor.addEventListener("onStop", callback);
  }

  stopAll(finished) {
    for(let i = 0; i < this.games.length; i++) {
      if(finished) {
        this.games[i].finish(true);
      } else {
        this.games[i].stop();
      }
    }
  }

  killAll() {
    for(let i = 0; i < this.games.length; i++) {
      this.games[i].kill();
    }
  }

  checkOnScoreIncreased() {
    this.reactor.dispatchEvent("onScoreIncreased");
  }

  onScoreIncreased(callback) {
    this.reactor.addEventListener("onScoreIncreased", callback);
  }

  setDisplayFPS(value) {
    console.warn("setDisplayFPS is deprecated. Please use setDebugMode with true to display FPS");

    for(let i = 0; i < this.games.length; i++) {
      this.games[i].setDisplayFPS(value);
    }
  }

  setDebugMode(value) {
    for(let i = 0; i < this.games.length; i++) {
      this.games[i].setDebugMode(value);
    }
  }

  setNotification(notification) {
    for(let i = 0; i < this.games.length; i++) {
      this.games[i].setNotification(notification.copy());
    }
  }

  closeNotification() {
    for(let i = 0; i < this.games.length; i++) {
      this.games[i].setNotification(null);
    }
  }

  errorOccurred() {
    for(let i = 0; i < this.games.length; i++) {
      if(this.games[i].errorOccurred) return true;
    }

    return false;
  }

  closeRanking() {
    for(let i = 0; i < this.games.length; i++) {
      this.games[i].closeRanking();
    }

    return false;
  }

  destroySnakes(exceptionIds, types) {
    for(let i = 0; i < this.games.length; i++) {
      this.games[i].destroySnakes(exceptionIds, types);

      if(exceptionIds && Array.isArray(exceptionIds)) {
        for(let j = 0; j < exceptionIds.length; j++) {
          exceptionIds[j] -= 1;
        }
      }
    }
  }

  getWinners() {
    const winners = [];
    const index = [];
    let maxScore = -1;

    for(let i = 0; i < this.games.length; i++) {
      for(let j = 0; j < this.games[i].snakes.length; j++) {
        if(this.games[i].snakes[j].score > maxScore) {
          maxScore = this.games[i].snakes[j].score;
        }
      }
    }

    if(maxScore >= 0) {
      let idx = 0;

      for(let i = 0; i < this.games.length; i++) {
        for(let j = 0; j < this.games[i].snakes.length; j++) {
          if(this.games[i].snakes[j].score >= maxScore) {
            winners.push(this.games[i].snakes[j]);
            index.push(idx);
          }

          idx++;
        }
      }
    }

    return {
      winners: winners,
      score: maxScore,
      index: index
    };
  }
}