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
function Snake(direction, length, grid, player, aiLevel, autoRetry) {
    this.direction = direction == undefined ? RIGHT : direction;
    this.initialDirection = direction == undefined ? RIGHT : direction;
    this.initialLength = length == undefined ? 3 : length;
    this.initTriedDirections = [];
    this.errorInit = false;
    this.grid = grid;
    this.queue = [];
    this.lastTail;
    this.lastTailMoved;
    this.player = player == undefined ? PLAYER_HUMAN : player;
    this.aiLevel = aiLevel == undefined ? AI_LEVEL_DEFAULT : aiLevel;
    this.autoRetry = autoRetry == undefined ? false : autoRetry;
    this.score = 0;
    this.gameOver = false;
    this.scoreMax = false;
    this.color;

    this.init();
}

Snake.prototype.init = function() {
    if(this.initialLength <= 0) {
      this.errorInit = true;
      return false;
    }

    if(this.grid.maze && this.initTriedDirections.length <= 0) {
      this.initialDirection = this.grid.mazeFirstPosition.direction;
      this.direction = this.initialDirection;
    }

    var spaceLineAvailable = 0;
    var spaceColAvailable = 0;

    if((this.initialDirection == RIGHT && this.initTriedDirections.indexOf(RIGHT) == -1) || (this.initialDirection == LEFT && this.initTriedDirections.indexOf(LEFT) == -1)) {
      for(var i = 0; i < this.grid.height; i++) {
        var emptyOnLine = 0;

        for(var j = 0; j < this.grid.width; j++) {
          if(this.grid.get(new Position(j, i)) == EMPTY_VAL) {
            emptyOnLine++;
          } else {
            emptyOnLine = 0;
          }

          if(emptyOnLine >= this.initialLength) {
            spaceLineAvailable++;
            break;
          }
        }
      }
    } else if((this.initialDirection == UP && this.initTriedDirections.indexOf(UP) == -1) || (this.initialDirection == BOTTOM && this.initTriedDirections.indexOf(BOTTOM) == -1)) {
      for(var i = 0; i < this.grid.width; i++) {
        var emptyOnCol = 0;

        for(var j = 0; j < this.grid.height; j++) {
          if(this.grid.get(new Position(i, j)) == EMPTY_VAL) {
            emptyOnCol++;
          } else {
            emptyOnCol = 0;
          }

          if(emptyOnCol >= this.initialLength) {
            spaceColAvailable++;
            break;
          }
        }
      }
    }

    this.initTriedDirections.push(this.initialDirection);

    if((spaceLineAvailable <= 0 && (this.initialDirection == RIGHT || this.initialDirection == LEFT)) || (spaceColAvailable <= 0 && (this.initialDirection == UP || this.initialDirection == BOTTOM))) {
      if(this.initTriedDirections.indexOf(RIGHT) == -1) {
        this.initialDirection = RIGHT;
        this.direction = RIGHT;
        return this.init();
      } else if(this.initTriedDirections.indexOf(LEFT) == -1) {
        this.initialDirection = LEFT;
        this.direction = LEFT;
        return this.init();
      } else if(this.initTriedDirections.indexOf(UP) == -1) {
       this.initialDirection = UP;
       this.direction = UP;
       return this.init();
      } else if(this.initTriedDirections.indexOf(BOTTOM) == -1) {
       this.initialDirection = BOTTOM;
       this.direction = BOTTOM;
       return this.init();
      }

      this.errorInit = true;
      return false;
    }

    var posNotValidated = true;
    var positionsToAdd = [];
    var startPos, currentPos;

    while(posNotValidated) {
      posNotValidated = false;

      if(this.grid.maze) {
        startPos = this.grid.mazeFirstPosition;
      } else {
        startPos = this.grid.getRandomPosition();
      }

      currentPos = new Position(startPos.x, startPos.y, this.initialDirection);
      positionsToAdd = [];

      for(var i = this.initialLength - 1; i >= 0; i--) {
        if(i < this.initialLength - 1) {
          if(this.initialDirection == RIGHT) {
            currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), RIGHT);
          } else if(this.initialDirection == LEFT) {
            currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), LEFT);
          } else if(this.initialDirection == BOTTOM) {
            currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), BOTTOM);
          } else if(this.initialDirection == UP) {
            currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), UP);
          }
        }

        if(this.grid.get(currentPos) != EMPTY_VAL) {
          posNotValidated = true;
        } else {
          positionsToAdd.push(new Position(currentPos.x, currentPos.y, currentPos.direction));
        }
      }

      if(this.grid.maze && posNotValidated) {
        return this.init();
      }
    }

    for(var i = 0; i < positionsToAdd.length; i++) {
      this.insert(positionsToAdd[i]);
    }

    if(this.grid.maze && this.player == PLAYER_HYBRID_HUMAN_AI) {
      this.player = PLAYER_HUMAN;
    }

    if(this.player == PLAYER_HYBRID_HUMAN_AI) {
      this.aiLevel = AI_LEVEL_HIGH;
    }

    this.lastTail = this.get(this.queue.length - 1);
    return true;
};

Snake.prototype.reset = function() {
    this.direction = this.initialDirection;
    this.initTriedDirections = [];
    this.queue = [];
    this.score = 0;
    this.gameOver = false;
    this.scoreMax = false;
    this.lastTailMoved = true;
    this.init();
};

Snake.prototype.insert = function(position) {
    this.queue.unshift(position);
    this.grid.set(SNAKE_VAL, position);
};

Snake.prototype.remove = function() {
    var last = this.queue.pop();
    this.grid.set(EMPTY_VAL, last);
    this.lastTail = last;
};

Snake.prototype.length = function() {
    return this.queue.length;
};

Snake.prototype.get = function(index) {
    if(this.queue[index] != null) {
      return this.queue[index].copy();
    } else {
      return null;
    }
};

Snake.prototype.set = function(index, position) {
    if(index >= 0 && index < this.length()) {
      this.queue[index] = position;
    }
};

Snake.prototype.getHeadPosition = function() {
    return this.get(0);
};

Snake.prototype.getTailPosition = function() {
    return this.get(this.length() - 1);
};

Snake.prototype.hasMaxScore = function() {
    return this.grid.getTotal(EMPTY_VAL) <= 0;
};

Snake.prototype.setGameOver = function() {
    this.gameOver = true;

    for(var i = 0; i < this.length(); i++) {
      this.grid.set(SNAKE_DEAD_VAL, this.get(i));
    }
};

Snake.prototype.kill = function() {
    this.autoRetry = false;
    this.grid = null;
    this.queue = null;
};

Snake.prototype.moveTo = function(direction) {
    if(direction == KEY_LEFT && this.direction != RIGHT && this.direction != LEFT) {
      this.direction = LEFT;
    }

    if(direction == KEY_UP && this.direction != BOTTOM && this.direction != UP) {
      this.direction = UP;
    }

    if(direction == KEY_RIGHT && this.direction != LEFT && this.direction != RIGHT) {
      this.direction = RIGHT;
    }

    if(direction == KEY_BOTTOM && this.direction != UP && this.direction != BOTTOM) {
      this.direction = BOTTOM;
    }
};

Snake.prototype.getNextPosition = function(oldPos, newDirection) {
    return this.grid.getNextPosition(oldPos, newDirection);
};

Snake.prototype.getDirectionTo = function(position, otherPosition) {
    return this.grid.getDirectionTo(position, otherPosition);
};

Snake.prototype.getGraphicDirectionFor = function(current, next, prec) {
    if(next == undefined || prec == undefined) return current.direction;

    var directionToPrec = this.getDirectionTo(current, prec);
    var directionToNext = this.getDirectionTo(current, next);

    var direction = UP;

    if(directionToPrec == LEFT && directionToNext == BOTTOM || directionToPrec == BOTTOM && directionToNext == LEFT) {
      direction = ANGLE_1;
    } else if(directionToPrec == RIGHT && directionToNext == BOTTOM || directionToPrec == BOTTOM && directionToNext == RIGHT) {
      direction = ANGLE_2;
    } else if(directionToPrec == UP && directionToNext == RIGHT || directionToPrec == RIGHT && directionToNext == UP) {
      direction = ANGLE_3;
    } else if(directionToPrec == UP && directionToNext == LEFT || directionToPrec == LEFT && directionToNext == UP) {
      direction = ANGLE_4;
    } else {
      direction = current.direction;
    }

    return direction;
};

Snake.prototype.getGraphicDirection = function(index) {
    return this.getGraphicDirectionFor(this.get(index), this.get(index - 1), this.get(index + 1));
};

Snake.prototype.copy = function() {
    var snake = new Snake(direction, 3, new Grid(this.grid.width, this.grid.height, false, false), this.player, this.aiLevel, false);

    for(var i = 0; i < snake.grid.height; i++) {
      for(var j = 0; j < snake.grid.width; j++) {
        snake.grid.set(this.grid.get(new Position(j, i)), new Position(j, i));
      }
    }

    snake.queue = [];

    for(var i = 0; i < this.queue.length; i++) {
      snake.queue.push(elem.copy());
    }

    return snake;
};

Snake.prototype.randomAI = function() {
    var currentPosition = this.getHeadPosition();
    var top = this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_UP));
    var left = this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_LEFT));
    var bottom = this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_BOTTOM));
    var right = this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_RIGHT));

    if(top && left && bottom && right) {
      return KEY_UP;
    } else {
      var direction = null;

      while(direction == null || this.grid.isDeadPosition(this.getNextPosition(currentPosition, direction))) {
        var r = randRange(1, 4);

        switch(r) {
          case 1:
            direction = KEY_UP;
            break;
          case 2:
            direction = KEY_LEFT;
            break;
          case 3:
            direction = KEY_BOTTOM;
            break;
          case 4:
            direction = KEY_RIGHT;
            break;
        }
      }

      return direction;
    }
};

Snake.prototype.simpleAI = function() {
    if(this.grid.fruitPos != null) {
      var currentPosition = this.getHeadPosition();
      var fruitPos = this.grid.fruitPos.copy();
      var directionNext = KEY_RIGHT;

      if(fruitPos.x > currentPosition.x) {
        if(fruitPos.x - currentPosition.x > this.grid.width / 2) {
          directionNext = KEY_LEFT;
        } else {
          directionNext = KEY_RIGHT;
        }
      } else if(fruitPos.x < currentPosition.x) {
        if(currentPosition.x - fruitPos.x > this.grid.width / 2) {
          directionNext = KEY_RIGHT;
        } else {
          directionNext = KEY_LEFT;
        }
      } else if(fruitPos.y < currentPosition.y) {
        if(currentPosition.y - fruitPos.y > this.grid.height / 2) {
          directionNext = KEY_BOTTOM;
        } else {
          directionNext = KEY_UP;
        }
      } else if(fruitPos.y > currentPosition.y) {
        if(fruitPos.y - currentPosition.y > this.grid.height / 2) {
          directionNext = KEY_UP;
        } else {
          directionNext = KEY_BOTTOM;
        }
      }

      var nextPosition = this.getNextPosition(currentPosition, directionNext);

      if(this.grid.isDeadPosition(nextPosition)) {
        var currentDirection = this.direction;
        var firstDifferentDirection = null;

        for(var i = 1; i < this.queue.length; i++) {
          if(this.get(i).direction != currentDirection) {
            firstDifferentDirection = this.get(i).direction;
            break;
          }
        }

        nextPosition = this.getNextPosition(currentPosition, firstDifferentDirection);

        if(this.grid.isDeadPosition(nextPosition)) {
          if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_UP))) {
            directionNext = KEY_UP;
          } else if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_RIGHT))) {
            directionNext = KEY_RIGHT;
          } else if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_BOTTOM))) {
            directionNext = KEY_BOTTOM;
          } else if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, KEY_LEFT))) {
            directionNext = KEY_LEFT;
          }
        } else {
          directionNext = nextPosition.convertToKeyDirection();
        }
      }

      return directionNext;
    }
};

Snake.prototype.ai = function(bestFind) {
    var bestFind = bestFind == undefined ? false : bestFind;
    var res = KEY_RIGHT;

    if(this.aiLevel == AI_LEVEL_RANDOM) {
      res = this.randomAI();
    } else if(this.aiLevel == AI_LEVEL_LOW) {
        res = this.simpleAI();
    } else {
      if(this.grid.fruitPos != null) {
        var currentPosition = this.getHeadPosition();
        var fruitPos = this.grid.fruitPos.copy();

        var grid = this.grid.getGraph(false);
        var graph = new Lowlight.Astar.Configuration(grid, {
          order: "yx",
          torus: (this.aiLevel == AI_LEVEL_HIGH || this.aiLevel == AI_LEVEL_ULTRA) ? true : false,
          diagonals: false,
          cutting: false,
          static: true,
          cost(a, b) { return b == 1 ? null : 1 }
        });
        var path = graph.path({x: currentPosition.x, y: currentPosition.y}, {x: fruitPos.x, y: fruitPos.y});

        if(path.length > 1) {
          var nextPosition = new Position(path[1].x, path[1].y);
          res = new Position(null, null, this.getDirectionTo(currentPosition, nextPosition)).convertToKeyDirection();
        } else if(this.aiLevel == AI_LEVEL_HIGH || this.aiLevel == AI_LEVEL_ULTRA) {
          res = this.simpleAI();
        }

        grid, graph, path = null;
      }
    }

    return res;
};

Snake.prototype.getAILevelText = function() {
    switch(this.aiLevel) {
      case AI_LEVEL_RANDOM:
        return window.i18next.t("engine.aiLevelList.random");
      case AI_LEVEL_LOW:
        return window.i18next.t("engine.aiLevelList.low");
      case AI_LEVEL_DEFAULT:
        return window.i18next.t("engine.aiLevelList.normal");
      case AI_LEVEL_HIGH:
        return window.i18next.t("engine.aiLevelList.high");
      case AI_LEVEL_ULTRA:
        return window.i18next.t("engine.aiLevelList.ultra");
      default:
        return window.i18next.t("engine.aiLevelList.normal");
    }
};