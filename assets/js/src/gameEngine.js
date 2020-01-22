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
function GameEngine(controller, grid, snake, speed, enablePause, enableRetry, progressiveSpeed) {
    // Game settings
    this.controller = controller;
    this.grid = grid;
    this.snakes = snake;
    this.speed = speed == undefined ? 8 : speed;
    this.initialSpeed = speed == undefined ? 8 : speed;
    this.initialSpeedUntouched = speed == undefined ? 8 : speed;
    this.enablePause = enablePause == undefined ? true : enablePause;
    this.enableRetry = enableRetry == undefined ? true : enableRetry;
    this.progressiveSpeed = progressiveSpeed == undefined ? false : progressiveSpeed;
    this.countBeforePlay = 3;
    // Game variables
    this.lastKey = -1;
    this.numFruit = 1;
    this.ticks = 0;
    // Game state variables
    this.paused = true;
    this.exited = false;
    this.killed = false;
    this.isReseted = true;
    this.gameOver = false;
    this.gameFinished = false; // only used if 2 and more snakes
    this.gameMazeWin = false; // used in maze mode
    this.scoreMax = false;
    this.errorOccured = false;
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
    this.reactor.registerEvent("onScoreIncreased");
  
    this.init();
}

GameEngine.prototype.init = function() {
    if(this.snakes == null || this.snakes == undefined) {
      this.errorOccured = true;
      this.snakes = [];
    } else if(!Array.isArray(this.snakes)) {
      this.snakes = [this.snakes];
    } else if((Array.isArray(this.snakes) && this.snakes.length <= 0) || (this.grid.maze && this.snakes.length > 1)) {
      this.errorOccured = true;
    }
  
    var startHue = randRange(0, 360);
  
    for(var i = 0; i < this.snakes.length; i++) {
      if(this.snakes[i] instanceof Snake == false) {
        this.errorOccured = true;
      } else {
        startHue = addHue(startHue, Math.round(360 / (this.snakes.length)));
        this.snakes[i].color = startHue;
      }
    }
  
    if(this.grid instanceof Grid == false) {
      this.errorOccured = true;
    } else if(!this.errorOccured) {
      this.grid.setFruit();
    }
};

GameEngine.prototype.getNBPlayer = function(type) {
    var numPlayer = 0;
  
    for(var i = 0; i < this.snakes.length; i++) {
      if(this.snakes[i].player == type) {
        numPlayer++;
      }
    }
  
    return numPlayer;
};

GameEngine.prototype.getPlayer = function(num, type) {
    var numPlayer = 0;
  
    for(var i = 0; i < this.snakes.length; i++) {
      if(this.snakes[i].player == type) {
        numPlayer++;
      }
  
      if(numPlayer == num) {
        return this.snakes[i];
      }
    }
  
    return null;
};

GameEngine.prototype.reset = function() {
    this.paused = true;
    this.isReseted = true;
    this.exited = false;
    // this.reactor.dispatchEvent("onReset");
    this.clearIntervalPlay();
    this.grid.init();
  
    for(var i = 0; i < this.snakes.length; i++) {
      this.snakes[i].reset();
    }
  
    this.numFruit = 1;
    this.ticks = 0;
    this.lastKey = -1;
    this.scoreMax = false;
    this.errorOccured = false;
    this.gameOver = false;
    this.gameFinished = false;
    this.gameMazeWin = false;
    this.initialSpeed = this.initialSpeedUntouched;
    this.speed = this.initialSpeedUntouched;
    this.grid.setFruit();
    this.start();
};

GameEngine.prototype.start = function() {
    this.controller.update();
    var self = this;
  
    if(!this.errorOccured) {
      for(var i = 0; i < this.snakes.length; i++) {
        if(this.snakes[i].errorInit) {
          this.errorOccured = true;
          this.stop();
        }
      }
  
      if(this.paused && !this.gameOver && !this.killed && !this.scoreMax) {
        // this.disableAllButtons();
        /*this.getInfos = false;
        this.getInfosGame = false;
        this.confirmExit = false;
        this.confirmReset = false;*/
        this.countBeforePlay = 3;
        // this.updateUI();
        this.clearIntervalPlay();
        this.controller.update();
  
        this.intervalPlay = setInterval(function() {
          self.countBeforePlay--;
          self.controller.update();
  
          if(self.countBeforePlay <= 0) {
            if(self.countBeforePlay <= -1) {
              self.clearIntervalPlay();
              self.paused = false;
              self.isReseted = false;
              // self.reactor.dispatchEvent("onStart");
              console.log(self);
              self.tick();
            }
          }
        }, 1000);
      }
    }
};

GameEngine.prototype.clearIntervalPlay = function() {
  clearInterval(this.intervalPlay);
};

GameEngine.prototype.stop = function() {
  this.paused = true;
  this.gameOver = true;
  //this.clearIntervalCountFPS();
  this.clearIntervalPlay();
  // this.reactor.dispatchEvent("onStop");
};

GameEngine.prototype.pause = function() {
  this.paused = true;
  //this.clearIntervalCountFPS();
  this.clearIntervalPlay();
  /*this.updateUI();
  this.reactor.dispatchEvent("onPause");*/
};

GameEngine.prototype.kill = function() {
  this.paused = true;
  this.gameOver = true;
  this.killed = true;

  for(var i = 0; i < this.snakes.length; i++) {
    this.snakes[i].kill();
    this.snakes[i] = null;
  }

  //this.clearIntervalCountFPS();
  this.clearIntervalPlay();
  //window.cancelAnimationFrame(this.frameGlobal);
  //window.cancelAnimationFrame(this.frameDisplayMenu);
  //this.frameGlobal, this.frameDisplayMenu = null;

  this.grid = null;
  this.snakes = null;
  //this.preRenderedFont = null;

  /*if(this.outputType == OUTPUT_TEXT) {
    this.appendTo.removeChild(this.textarea);
    this.textarea = null;
  } else if(this.outputType == OUTPUT_GRAPHICAL) {
    this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.appendTo.removeChild(this.canvas);
    this.canvas = null;
    this.canvasCtx = null;
    this.imageLoader.clear();
  }*/
};

GameEngine.prototype.exit = function() {
    this.stop();
    this.exited = true;
    // this.reactor.dispatchEvent("onExit");
};

GameEngine.prototype.tick = function() {
    var self = this;

    setTimeout(function() {
      if(!self.paused && !self.killed) {
        if(self.lastTime == 0) self.lastTime = time;
        self.ticks++;

        // Input
        if(!self.paused) {
          if(self.lastKey == KEY_ENTER) {
            self.pause();
          }
        }

        
          for(var i = 0; i < self.snakes.length; i++) {
            var initialDirection = self.snakes[i].direction;
            var setFruit = false;
            var setFruitError = false;
            self.snakes[i].lastTailMoved = false;

            if(!self.snakes[i].gameOver && !self.snakes[i].scoreMax) {
              if(self.snakes[i].player == PLAYER_HUMAN || self.snakes[i].player == PLAYER_HYBRID_HUMAN_AI) {
                self.snakes[i].moveTo(self.lastKey);
                self.lastKey = -1;
              } else if(self.snakes[i].player == PLAYER_AI) {
                self.snakes[i].moveTo(self.snakes[i].ai(true));
              }

              var headSnakePos = self.snakes[i].getHeadPosition();

              if(self.snakes[i].player == PLAYER_HYBRID_HUMAN_AI && self.grid.isDeadPosition(self.snakes[i].getNextPosition(headSnakePos, self.snakes[i].direction))) {
                self.snakes[i].direction = initialDirection;
                self.snakes[i].moveTo(self.snakes[i].ai(true));
                self.lastKey = -1;
              }

              headSnakePos = self.snakes[i].getNextPosition(headSnakePos, self.snakes[i].direction);

              if(self.grid.isDeadPosition(headSnakePos)) {
                self.snakes[i].setGameOver();
              } else {
                if(self.grid.get(headSnakePos) == FRUIT_VAL) {
                  self.snakes[i].score++;
                  self.reactor.dispatchEvent("onScoreIncreased");
                  self.snakes[i].insert(headSnakePos);

                  if(self.grid.maze) {
                    self.stop();
                    self.gameMazeWin = true;
                    self.gameFinished = true;
                  } else if(self.snakes[i].hasMaxScore() && self.snakes.length <= 1) {
                    self.scoreMax = true;
                    self.snakes[i].scoreMax = true;
                  } else {
                    self.numFruit++;
                    var setFruit = true;
                  }

                  if(self.snakes.length <= 1 && self.progressiveSpeed && self.snakes[i].score > 0 && self.initialSpeed > 1) {
                    self.initialSpeed = Math.ceil(((-self.initialSpeedUntouched / 100) * self.snakes[i].score) + self.initialSpeedUntouched);
                    self.initialSpeed = self.initialSpeed < 1 ? 1 : self.initialSpeed;
                  }
                } else {
                  self.snakes[i].insert(headSnakePos);

                  if(!self.grid.maze) {
                    self.snakes[i].remove();
                    self.snakes[i].lastTailMoved = true;
                  }
                }
              }
            }

            if(!self.scoreMax && setFruit) {
              var setFruitError = !self.grid.setFruit();
            }
          }

          if(!self.scoreMax && !setFruitError && self.grid.isFruitSurrounded(self.grid.fruitPos, true)) {
            var setFruitError = !self.grid.setFruit();
          }

          var nbOver = 0;

          for(var j = 0; j < self.snakes.length; j++) {
            (self.snakes[j].gameOver || self.snakes[j].scoreMax) && nbOver++;
          }

          if(nbOver >= self.snakes.length || setFruitError) {
            self.stop();

            if(self.snakes.length > 1) {
              self.gameFinished = true;
            }
          }

          self.controller.update();
          self.tick();
      }
    }, this.speed * 10);
};