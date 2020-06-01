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
import GameUtils from "./GameUtils";
import GameConstants from "./Constants";
import Reactor from "./Reactor";
import Grid from "./Grid";
import Snake from "./Snake";
import seedrandom from "seedrandom";

export default class GameEngine {
  constructor(grid, snake, speed, enablePause, enableRetry, progressiveSpeed) {
    // Game settings
    this.grid = grid;
    this.snakes = snake;
    this.speed = speed == null ? 8 : speed;
    this.initialSpeed = speed == null ? 8 : speed;
    this.initialSpeedUntouched = speed == null ? 8 : speed;
    this.enablePause = enablePause == null ? true : enablePause;
    this.enableRetry = enableRetry == null ? true : enableRetry;
    this.progressiveSpeed = progressiveSpeed == null ? false : progressiveSpeed;
    this.countBeforePlay = 3;
    // Game variables
    this.lastKey = -1;
    this.numFruit = 1;
    this.ticks = 0;
    // Game state variables
    this.firstStart = true;
    this.starting = false;
    this.paused = true;
    this.exited = false;
    this.killed = false;
    this.isReseted = true;
    this.gameOver = false;
    this.gameFinished = false; // only used if 2 and more snakes
    this.gameMazeWin = false; // used in maze mode
    this.scoreMax = false;
    this.errorOccurred = false;
    this.clientSidePredictionsMode = false; // Enable client-side predictions mode for the online game (disable some functions)
    // Intervals, timeouts, frames
    this.intervalPlay;
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
    if(!this.clientSidePredictionsMode) {
      if(this.snakes == null) {
        this.errorOccurred = true;
        this.snakes = [];
      } else if(!Array.isArray(this.snakes)) {
        this.snakes = [this.snakes];
      } else if((Array.isArray(this.snakes) && this.snakes.length <= 0) || (this.grid.maze && this.snakes.length > 1)) {
        this.errorOccurred = true;
      }

      let startHue = GameUtils.randRange(0, 360, this.grid ? this.grid.rngGame : null);

      for(let i = 0; i < this.snakes.length; i++) {
        if(this.snakes[i] instanceof Snake == false) {
          this.errorOccurred = true;
        } else {
          startHue = GameUtils.addHue(startHue, Math.round(360 / (this.snakes.length)));
          this.snakes[i].color = startHue;
        }
      }

      if(this.grid instanceof Grid == false) {
        this.errorOccurred = true;
      } else if(!this.errorOccurred) {
        this.grid.setFruit(this.snakes.length);
      }
    }
  }

  reset() {
    this.paused = true;
    this.isReseted = true;
    this.exited = false;
    this.clearIntervalPlay();

    if(this.grid.seedGrid) this.grid.seedGrid++;
    if(this.grid.seedGame) this.grid.seedGame++;
    if(this.grid.rngGrid) this.grid.rngGrid = seedrandom(this.grid.seedGrid);
    if(this.grid.rngGame) this.grid.rngGame = seedrandom(this.grid.seedGame);
    this.grid.init();

    if(this.snakes != null) {
      for(let i = 0; i < this.snakes.length; i++) {
        this.snakes[i].reset();
      }
    }

    this.numFruit = 1;
    this.ticks = 0;
    this.lastKey = -1;
    this.scoreMax = false;
    this.errorOccurred = false;
    this.gameOver = false;
    this.gameFinished = false;
    this.gameMazeWin = false;
    this.starting = false;
    this.initialSpeed = this.initialSpeedUntouched;
    this.speed = this.initialSpeedUntouched;
    this.grid.setFruit(this.snakes.length);
    this.reactor.dispatchEvent("onReset");
    this.start();
  }

  start() {
    this.reactor.dispatchEvent("onUpdateCounter");
    
    if(!this.errorOccurred) {
      if(this.snakes != null) {
        for(let i = 0; i < this.snakes.length; i++) {
          if(this.snakes[i].errorInit) {
            this.errorOccurred = true;
            this.stop();
          }
        }
      }

      if(this.paused && !this.gameOver && !this.killed && !this.scoreMax && !this.starting) {
        this.starting = true;

        if(!this.firstStart) {
          this.reactor.dispatchEvent("onContinue");
        }

        this.countBeforePlay = 3;
        this.clearIntervalPlay();
        this.reactor.dispatchEvent("onUpdateCounter");

        this.intervalPlay = setInterval(() => {
          this.countBeforePlay--;
          this.reactor.dispatchEvent("onUpdateCounter");

          if(this.countBeforePlay < 0) {
            this.forceStart();
          }
        }, 1000);
      }
    }
  }

  forceStart() {
    this.clearIntervalPlay();
    this.countBeforePlay = -1;
    this.paused = false;
    this.isReseted = false;
    this.firstStart = false;
    this.starting = false;
    this.reactor.dispatchEvent("onStart");
    this.tick();
  }

  clearIntervalPlay() {
    clearInterval(this.intervalPlay);
  }

  continue() {
    if(!this.clientSidePredictionsMode) {
      this.start();
      this.reactor.dispatchEvent("onContinue");
    }
  }

  stop(finish) {
    if(!this.gameOver && !this.clientSidePredictionsMode) {
      this.paused = true;
      this.gameOver = true;
      if(finish) this.gameFinished = true;
      this.clearIntervalPlay();
      this.reactor.dispatchEvent("onStop");
    }
  }

  pause() {
    if(!this.paused && !this.clientSidePredictionsMode) {
      this.paused = true;
      this.clearIntervalPlay();
      this.reactor.dispatchEvent("onPause");
    }
  }

  kill() {
    if(!this.killed) {
      this.paused = true;
      this.gameOver = true;
      this.killed = true;

      if(this.snakes != null) {
        for(let i = 0; i < this.snakes.length; i++) {
          this.snakes[i].kill();
          this.snakes[i] = null;
        }
      }

      this.clearIntervalPlay();
      this.grid = null;
      this.snakes = null;
      this.reactor.dispatchEvent("onKill");
    }
  }

  exit() {
    if(!this.exited) {
      this.stop();
      this.exited = true;
      this.reactor.dispatchEvent("onExit");
    }
  }

  getNBPlayer(type) {
    let numPlayer = 0;

    if(this.snakes != null) {
      for(let i = 0; i < this.snakes.length; i++) {
        if(this.snakes[i].player == type) {
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
        if(this.snakes[i].player == type) {
          numPlayer++;
        }

        if(numPlayer == num) {
          return this.snakes[i];
        }
      }
    }

    return null;
  }

  tick() {
    setTimeout(() => {
      if(!this.paused && !this.killed) {
        if(this.lastTime == 0) this.lastTime = time;
        this.ticks++;

        let scoreIncreased, setFruitError = false;

        if(this.grid && (!this.grid.maze || this.grid.mazeForceAuto || ((this.grid.maze && (this.getNBPlayer(GameConstants.PlayerType.HUMAN) <= 0 && this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) <= 0))) || (this.grid.maze && ((this.getNBPlayer(GameConstants.PlayerType.HUMAN) > 0 || this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) > 0) && (this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI) || this.getPlayer(1, GameConstants.PlayerType.HUMAN)).lastKey != -1)))) {
          for(let i = 0; i < this.snakes.length; i++) {
            const initialDirection = this.snakes[i].direction;
            let setFruit = false;
            let goldFruit = false;
            setFruitError = false;
            this.snakes[i].lastTailMoved = false;

            if(!this.snakes[i].gameOver && !this.snakes[i].scoreMax) {
              if(this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
                this.snakes[i].moveTo(this.snakes[i].lastKey);
                this.snakes[i].lastKey = -1;
              } else if(this.snakes[i].player == GameConstants.PlayerType.AI && (!this.clientSidePredictionsMode || (this.clientSidePredictionsMode && this.snakes[i].aiLevel != GameConstants.AiLevel.RANDOM))) {
                this.snakes[i].moveTo(this.snakes[i].ai());
              }

              let headSnakePos = this.snakes[i].getHeadPosition();

              if(this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI && this.grid.isDeadPosition(this.snakes[i].getNextPosition(headSnakePos, this.snakes[i].direction))) {
                this.snakes[i].direction = initialDirection;
                this.snakes[i].moveTo(this.snakes[i].ai());
                this.snakes[i].lastKey = -1;
              }

              headSnakePos = this.snakes[i].getNextPosition(headSnakePos, this.snakes[i].direction);
              
              if(this.grid.isDeadPosition(headSnakePos)) {
                this.snakes[i].setGameOver(this.ticks);
              } else {
                if(this.grid.get(headSnakePos) == GameConstants.CaseType.FRUIT || this.grid.get(headSnakePos) == GameConstants.CaseType.FRUIT_GOLD) {
                  if(this.grid.get(headSnakePos) == GameConstants.CaseType.FRUIT) {
                    this.snakes[i].score++;
                    this.grid.set(GameConstants.CaseType.EMPTY, this.grid.fruitPos);
                    this.grid.fruitPos = null;
                  } else if(this.grid.get(headSnakePos) == GameConstants.CaseType.FRUIT_GOLD) {
                    this.snakes[i].score += 3;
                    this.grid.set(GameConstants.CaseType.EMPTY, this.grid.fruitPosGold);
                    this.grid.fruitPosGold = null;
                    goldFruit = true;
                  }

                  scoreIncreased = true;
                  this.snakes[i].insert(headSnakePos);

                  if(this.grid.maze) {
                    this.gameMazeWin = true;
                    this.gameFinished = true;
                    this.stop();
                  } else if(this.snakes[i].hasMaxScore() && this.snakes.length <= 1) {
                    this.scoreMax = true;
                    this.snakes[i].scoreMax = true;
                    this.stop();
                  } else {
                    this.numFruit++;
                    if(!goldFruit) setFruit = true;
                  }

                  if(this.snakes.length <= 1 && this.progressiveSpeed && this.snakes[i].score > 0 && this.initialSpeed > 1) {
                    this.initialSpeed = Math.ceil(((-this.initialSpeedUntouched / 100) * this.snakes[i].score) + this.initialSpeedUntouched);
                    this.initialSpeed = this.initialSpeed < 1 ? 1 : this.initialSpeed;
                  }
                } else {
                  this.snakes[i].insert(headSnakePos);

                  if(!this.grid.maze) {
                    this.snakes[i].remove();
                    this.snakes[i].lastTailMoved = true;
                  }
                }
              }
            }

            if(!this.scoreMax && setFruit && !this.clientSidePredictionsMode) {
              setFruitError = !this.grid.setFruit(this.snakes.length);
            }
          }

          if(!this.scoreMax && !setFruitError && this.grid.isFruitSurrounded(this.grid.fruitPos, true) && !this.clientSidePredictionsMode) {
            setFruitError = !this.grid.setFruit(this.snakes.length);
          }

          if(!this.scoreMax && this.grid.fruitPosGold != null && this.grid.isFruitSurrounded(this.grid.fruitPosGold, true)) {
            this.grid.set(GameConstants.CaseType.EMPTY, this.grid.fruitPosGold);
            this.grid.fruitPosGold = null;
          }

          let nbOver = 0;

          for(let j = 0; j < this.snakes.length; j++) {
            (this.snakes[j].gameOver || this.snakes[j].scoreMax) && nbOver++;
          }

          if(nbOver >= this.snakes.length || setFruitError) {
            this.stop();

            if(this.snakes.length > 1) {
              this.gameFinished = true;
            }
          }

          this.reactor.dispatchEvent("onUpdate");

          if(scoreIncreased) {
            this.reactor.dispatchEvent("onScoreIncreased");
          }
        }

        this.tick();
      }
    }, this.initialSpeed * GameConstants.Setting.TIME_MULTIPLIER);
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

  onUpdate(callback) {
    this.reactor.addEventListener("onUpdate", callback);
  }

  onUpdateCounter(callback) {
    this.reactor.addEventListener("onUpdateCounter", callback);
  }
}