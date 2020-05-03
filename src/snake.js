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
if(typeof(require) !== "undefined") {
  var i18next = require("i18next").default;
  var Lowlight = require("../libs/lowlight.astar.min");
  var GameUtils = require("./gameUtils");
  var GameConstants = require("./constants");
  var Position = require("./position");
  var Grid = require("./grid");
}

function Snake(direction, length, grid, player, aiLevel, autoRetry, name) {
  this.direction = direction == undefined ? GameConstants.Direction.RIGHT : direction;
  this.initialDirection = direction == undefined ? GameConstants.Direction.RIGHT : direction;
  this.initialLength = length == undefined ? 3 : length;
  this.initTriedDirections = [];
  this.errorInit = false;
  this.grid = grid || new Grid();
  this.queue = [];
  this.lastKey = -1;
  this.lastTail;
  this.lastTailMoved;
  this.player = player == undefined ? GameConstants.PlayerType.HUMAN : player;
  this.aiLevel = aiLevel == undefined ? GameConstants.AiLevel.DEFAULT : aiLevel;
  this.autoRetry = autoRetry == undefined ? false : autoRetry;
  this.score = 0;
  this.gameOver = false;
  this.scoreMax = false;
  this.color;
  this.name = name == undefined ? "Snake" : name;
  this.aiFruitGoal = GameConstants.CaseType.FRUIT;

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

  if((this.initialDirection == GameConstants.Direction.RIGHT && this.initTriedDirections.indexOf(GameConstants.Direction.RIGHT) == -1) || (this.initialDirection == GameConstants.Direction.LEFT && this.initTriedDirections.indexOf(GameConstants.Direction.LEFT) == -1)) {
    for(var i = 0; i < this.grid.height; i++) {
      var emptyOnLine = 0;

      for(var j = 0; j < this.grid.width; j++) {
        if(this.grid.get(new Position(j, i)) == GameConstants.CaseType.EMPTY) {
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
  } else if((this.initialDirection == GameConstants.Direction.UP && this.initTriedDirections.indexOf(GameConstants.Direction.UP) == -1) || (this.initialDirection == GameConstants.Direction.BOTTOM && this.initTriedDirections.indexOf(GameConstants.Direction.BOTTOM) == -1)) {
    for(var i = 0; i < this.grid.width; i++) {
      var emptyOnCol = 0;

      for(var j = 0; j < this.grid.height; j++) {
        if(this.grid.get(new Position(i, j)) == GameConstants.CaseType.EMPTY) {
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

  if((spaceLineAvailable <= 0 && (this.initialDirection == GameConstants.Direction.RIGHT || this.initialDirection == GameConstants.Direction.LEFT)) || (spaceColAvailable <= 0 && (this.initialDirection == GameConstants.Direction.UP || this.initialDirection == GameConstants.Direction.BOTTOM))) {
    if(this.initTriedDirections.indexOf(GameConstants.Direction.RIGHT) == -1) {
      this.initialDirection = GameConstants.Direction.RIGHT;
      this.direction = GameConstants.Direction.RIGHT;
      return this.init();
    } else if(this.initTriedDirections.indexOf(GameConstants.Direction.LEFT) == -1) {
      this.initialDirection = GameConstants.Direction.LEFT;
      this.direction = GameConstants.Direction.LEFT;
      return this.init();
    } else if(this.initTriedDirections.indexOf(GameConstants.Direction.UP) == -1) {
      this.initialDirection = GameConstants.Direction.UP;
      this.direction = GameConstants.Direction.UP;
      return this.init();
    } else if(this.initTriedDirections.indexOf(GameConstants.Direction.BOTTOM) == -1) {
      this.initialDirection = GameConstants.Direction.BOTTOM;
      this.direction = GameConstants.Direction.BOTTOM;
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
        if(this.initialDirection == GameConstants.Direction.RIGHT) {
          currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), GameConstants.Direction.RIGHT);
        } else if(this.initialDirection == GameConstants.Direction.LEFT) {
          currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), GameConstants.Direction.LEFT);
        } else if(this.initialDirection == GameConstants.Direction.BOTTOM) {
          currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), GameConstants.Direction.BOTTOM);
        } else if(this.initialDirection == GameConstants.Direction.UP) {
          currentPos = this.grid.getNextPosition(new Position(currentPos.x, currentPos.y, this.initialDirection), GameConstants.Direction.UP);
        }
      }

      if(this.grid.get(currentPos) != GameConstants.CaseType.EMPTY) {
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

  if(this.grid.maze && this.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
    this.player = GameConstants.PlayerType.HUMAN;
  }

  if(this.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
    this.aiLevel = GameConstants.AiLevel.HIGH;
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
  this.lastKey = -1;
  this.aiFruitGoal = GameConstants.CaseType.FRUIT;
  this.init();
};

Snake.prototype.insert = function(position) {
  this.queue.unshift(position);
  this.grid.set(GameConstants.CaseType.SNAKE, position);
};

Snake.prototype.remove = function() {
  var last = this.queue.pop();
  this.grid.set(GameConstants.CaseType.EMPTY, last);
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
  return this.grid.getTotal(GameConstants.CaseType.EMPTY) <= 0 && !this.grid.fruitPosGold && !this.grid.fruitPos;
};

Snake.prototype.setGameOver = function() {
  this.gameOver = true;

  for(var i = 0; i < this.length(); i++) {
    this.grid.set(GameConstants.CaseType.SNAKE_DEAD, this.get(i));
  }
};

Snake.prototype.kill = function() {
  this.autoRetry = false;
  this.grid = null;
  this.queue = null;
};

Snake.prototype.moveTo = function(direction) {
  if(direction == GameConstants.Key.LEFT && this.direction != GameConstants.Direction.RIGHT && this.direction != GameConstants.Direction.LEFT) {
    this.direction = GameConstants.Direction.LEFT;
  }

  if(direction == GameConstants.Key.UP && this.direction != GameConstants.Direction.BOTTOM && this.direction != GameConstants.Direction.UP) {
    this.direction = GameConstants.Direction.UP;
  }

  if(direction == GameConstants.Key.RIGHT && this.direction != GameConstants.Direction.LEFT && this.direction != GameConstants.Direction.RIGHT) {
    this.direction = GameConstants.Direction.RIGHT;
  }

  if(direction == GameConstants.Key.BOTTOM && this.direction != GameConstants.Direction.UP && this.direction != GameConstants.Direction.BOTTOM) {
    this.direction = GameConstants.Direction.BOTTOM;
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

  var direction = GameConstants.Direction.UP;

  if(directionToPrec == GameConstants.Direction.LEFT && directionToNext == GameConstants.Direction.BOTTOM || directionToPrec == GameConstants.Direction.BOTTOM && directionToNext == GameConstants.Direction.LEFT) {
    direction = GameConstants.Direction.ANGLE_1;
  } else if(directionToPrec == GameConstants.Direction.RIGHT && directionToNext == GameConstants.Direction.BOTTOM || directionToPrec == GameConstants.Direction.BOTTOM && directionToNext == GameConstants.Direction.RIGHT) {
    direction = GameConstants.Direction.ANGLE_2;
  } else if(directionToPrec == GameConstants.Direction.UP && directionToNext == GameConstants.Direction.RIGHT || directionToPrec == GameConstants.Direction.RIGHT && directionToNext == GameConstants.Direction.UP) {
    direction = GameConstants.Direction.ANGLE_3;
  } else if(directionToPrec == GameConstants.Direction.UP && directionToNext == GameConstants.Direction.LEFT || directionToPrec == GameConstants.Direction.LEFT && directionToNext == GameConstants.Direction.UP) {
    direction = GameConstants.Direction.ANGLE_4;
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
  var top = this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.UP));
  var left = this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.LEFT));
  var bottom = this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.BOTTOM));
  var right = this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.RIGHT));

  if(top && left && bottom && right) {
    return GameConstants.Key.UP;
  } else {
    var direction = null;

    while(direction == null || this.grid.isDeadPosition(this.getNextPosition(currentPosition, direction))) {
      var r = GameUtils.randRange(1, 4, this.grid ? this.grid.rngGame : null);

      switch(r) {
        case 1:
          direction = GameConstants.Key.UP;
          break;
        case 2:
          direction = GameConstants.Key.LEFT;
          break;
        case 3:
          direction = GameConstants.Key.BOTTOM;
          break;
        case 4:
          direction = GameConstants.Key.RIGHT;
          break;
      }
    }

    return direction;
  }
};

Snake.prototype.simpleAI = function() {
  if(this.grid.fruitPos != null) {
    var currentPosition = this.getHeadPosition();
    var fruitPos = this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD ? this.grid.fruitPosGold : this.grid.fruitPos;
    var directionNext = GameConstants.Key.RIGHT;

    if(fruitPos.x > currentPosition.x) {
      if(fruitPos.x - currentPosition.x > this.grid.width / 2) {
        directionNext = GameConstants.Key.LEFT;
      } else {
        directionNext = GameConstants.Key.RIGHT;
      }
    } else if(fruitPos.x < currentPosition.x) {
      if(currentPosition.x - fruitPos.x > this.grid.width / 2) {
        directionNext = GameConstants.Key.RIGHT;
      } else {
        directionNext = GameConstants.Key.LEFT;
      }
    } else if(fruitPos.y < currentPosition.y) {
      if(currentPosition.y - fruitPos.y > this.grid.height / 2) {
        directionNext = GameConstants.Key.BOTTOM;
      } else {
        directionNext = GameConstants.Key.UP;
      }
    } else if(fruitPos.y > currentPosition.y) {
      if(fruitPos.y - currentPosition.y > this.grid.height / 2) {
        directionNext = GameConstants.Key.UP;
      } else {
        directionNext = GameConstants.Key.BOTTOM;
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
        if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.UP))) {
          directionNext = GameConstants.Key.UP;
        } else if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.RIGHT))) {
          directionNext = GameConstants.Key.RIGHT;
        } else if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.BOTTOM))) {
          directionNext = GameConstants.Key.BOTTOM;
        } else if(!this.grid.isDeadPosition(this.getNextPosition(currentPosition, GameConstants.Key.LEFT))) {
          directionNext = GameConstants.Key.LEFT;
        }
      } else {
        directionNext = nextPosition.convertToKeyDirection();
      }
    }

    return directionNext;
  }
};

Snake.prototype.ai = function() {
  var res = null;
  
  var currentPosition = this.getHeadPosition();
  var fruitPos = this.grid.fruitPos;
  var fruitPosGold = this.grid.fruitPosGold;

  if(fruitPos != null) {
    var distFruit = Math.abs(fruitPos.x - currentPosition.x) + Math.abs(fruitPos.y - currentPosition.y);
    var distFruitGold = fruitPosGold != null ? Math.abs(fruitPosGold.x - currentPosition.x) + Math.abs(fruitPosGold.y - currentPosition.y) : -1;
  
    if(fruitPosGold != null && this.grid.get(fruitPosGold) == GameConstants.CaseType.FRUIT_GOLD && this.aiFruitGoal == GameConstants.CaseType.FRUIT) {
      if(distFruitGold < distFruit) {
        this.aiFruitGoal = GameConstants.CaseType.FRUIT_GOLD;
      } else {
        this.aiFruitGoal = GameConstants.CaseType.FRUIT;
      }
    } else if(fruitPosGold == null || this.grid.get(fruitPosGold) != GameConstants.CaseType.FRUIT_GOLD) {
      this.aiFruitGoal = GameConstants.CaseType.FRUIT;
    }
  }

  if(this.aiLevel == GameConstants.AiLevel.RANDOM) {
    res = this.randomAI();
  } else if(this.aiLevel == GameConstants.AiLevel.LOW) {
    res = this.simpleAI();
  } else if(fruitPos != null) {
    var grid = this.grid.getGraph(false);

    var graph = new Lowlight.Astar.Configuration(grid, {
      order: "yx",
      torus: (this.aiLevel == GameConstants.AiLevel.HIGH || this.aiLevel == GameConstants.AiLevel.ULTRA) ? true : false,
      diagonals: false,
      cutting: false,
      static: true,
      cost(a, b) { return b == 1 ? null : 1 }
    });

    var path = graph.path({ x: currentPosition.x, y: currentPosition.y }, { x: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD ? fruitPosGold.x : fruitPos.x, y: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD ? fruitPosGold.y : fruitPos.y });

    if(path.length < 1) {
      path = graph.path({ x: currentPosition.x, y: currentPosition.y }, { x: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD || !fruitPosGold ? fruitPos.x : fruitPosGold.x, y: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD || !fruitPosGold ? fruitPos.y : fruitPosGold.y });
    }

    if(path.length > 1) {
      var nextPosition = new Position(path[1].x, path[1].y);
      res = new Position(null, null, this.getDirectionTo(currentPosition, nextPosition)).convertToKeyDirection();
    } else if(this.aiLevel == GameConstants.AiLevel.HIGH || this.aiLevel == GameConstants.AiLevel.ULTRA) {
      res = this.simpleAI();
    }

    grid, graph, path = null;
  }

  return res;
};

Snake.prototype.getAILevelText = function() {
  switch(this.aiLevel) {
    case GameConstants.AiLevel.RANDOM:
      return i18next.t("engine.aiLevelList.random");
    case GameConstants.AiLevel.LOW:
      return i18next.t("engine.aiLevelList.low");
    case GameConstants.AiLevel.DEFAULT:
      return i18next.t("engine.aiLevelList.normal");
    case GameConstants.AiLevel.HIGH:
      return i18next.t("engine.aiLevelList.high");
    case GameConstants.AiLevel.ULTRA:
      return i18next.t("engine.aiLevelList.ultra");
    default:
      return i18next.t("engine.aiLevelList.normal");
  }
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = Snake;
}