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
import Position from "./Position";
import Grid from "./Grid";
import { SnakeAI, SnakeAIRandom, SnakeAILow, SnakeAINormal, SnakeAIHigh, SnakeAIMock } from "./ai/index";

export default class Snake {
  constructor(direction, length, grid, player, aiLevel, autoRetry, name, customAI) {
    this.direction = direction == undefined ? GameConstants.Direction.RIGHT : direction;
    this.initialDirection = this.direction;
    this.initialLength = length == undefined ? 3 : length;
    this.initTriedDirections = [];
    this.errorInit = false;
    this.grid = grid || new Grid();
    this.queue = [];
    this.lastKey = -1;
    this.lastTail;
    this.lastTailMoved;
    this.ticksDead = 0;
    this.player = player == undefined ? GameConstants.PlayerType.HUMAN : player;
    this.aiLevel = aiLevel == undefined ? GameConstants.AiLevel.DEFAULT : aiLevel;
    this.autoRetry = autoRetry == undefined ? false : autoRetry;
    this.score = 0;
    this.gameOver = false;
    this.scoreMax = false;
    this.color;
    this.name = name == undefined ? "Snake" : name;
    this.snakeAI = new SnakeAI();
    this.customAI = customAI;
    this.ticksWithoutAction = 0;

    this.initAI();
  }

  init() {
    if(this.initialLength <= 0) {
      this.errorInit = true;
      return false;
    }

    if(this.grid.maze && this.initTriedDirections.length <= 0) {
      this.initialDirection = this.grid.mazeFirstPosition.direction;
      this.direction = this.initialDirection;
    }

    let spaceLineAvailable = 0;
    let spaceColAvailable = 0;

    if((this.initialDirection == GameConstants.Direction.RIGHT && this.initTriedDirections.indexOf(GameConstants.Direction.RIGHT) == -1) || (this.initialDirection == GameConstants.Direction.LEFT && this.initTriedDirections.indexOf(GameConstants.Direction.LEFT) == -1)) {
      for(let i = 0; i < this.grid.height; i++) {
        let emptyOnLine = 0;

        for(let j = 0; j < this.grid.width; j++) {
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
      for(let i = 0; i < this.grid.width; i++) {
        let emptyOnCol = 0;

        for(let j = 0; j < this.grid.height; j++) {
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

    let posNotValidated = true;
    let positionsToAdd = [];
    let startPos, currentPos;

    while(posNotValidated) {
      posNotValidated = false;

      if(this.grid.maze) {
        startPos = this.grid.mazeFirstPosition;
      } else {
        startPos = this.grid.getRandomPosition();
      }

      if(!startPos) {
        this.errorInit = true;
        return false;
      }

      currentPos = new Position(startPos.x, startPos.y, this.initialDirection);
      positionsToAdd = [];

      for(let i = this.initialLength - 1; i >= 0; i--) {
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

    // If the Snake is near a dead position
    let nearDeadPosition = false;

    if(!this.grid.maze) {
      const firstPosition = new Position(positionsToAdd[positionsToAdd.length - 1].x, positionsToAdd[positionsToAdd.length - 1].y, this.direction);
  
      if((this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, GameConstants.Direction.UP), false) && this.direction == GameConstants.Direction.UP) || (this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, GameConstants.Direction.BOTTOM), false) && this.direction == GameConstants.Direction.BOTTOM) || (this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, GameConstants.Direction.LEFT), false) && this.direction == GameConstants.Direction.LEFT) || (this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, GameConstants.Direction.RIGHT), false) && this.direction == GameConstants.Direction.RIGHT)) {
        nearDeadPosition = true;
        this.direction = this.grid.invertDirection(this.direction);
      }
    }
  
    for(let i = 0; i < positionsToAdd.length; i++) {
      if(nearDeadPosition) {
        const position = positionsToAdd[positionsToAdd.length - i - 1];
        position.direction =  this.grid.invertDirection(position.direction);
        this.insert(positionsToAdd[positionsToAdd.length - i - 1]);
      } else {
        this.insert(positionsToAdd[i]);
      }
    }

    if(this.grid.maze && this.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
      this.player = GameConstants.PlayerType.HUMAN;
    }

    if(this.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
      this.aiLevel = GameConstants.AiLevel.HIGH;
    }

    this.lastTail = this.get(this.queue.length - 1);
    return true;
  }

  initAI() {
    if(!this.customAI) {
      switch(this.aiLevel) {
      case GameConstants.AiLevel.RANDOM:
        this.snakeAI = new SnakeAIRandom();
        break;
      case GameConstants.AiLevel.LOW:
        this.snakeAI = new SnakeAILow();
        break;
      case GameConstants.AiLevel.DEFAULT:
        this.snakeAI = new SnakeAINormal();
        break;
      case GameConstants.AiLevel.HIGH:
        this.snakeAI = new SnakeAIHigh();
        break;
      case GameConstants.AiLevel.ULTRA:
        this.snakeAI = new SnakeAIHigh();
        break;
      case GameConstants.AiLevel.MOCK:
        this.snakeAI = new SnakeAIMock();
        break;
      default:
        this.snakeAI = new SnakeAINormal();
        break;
      }
    } else {
      this.snakeAI = this.customAI;
      this.aiLevel = GameConstants.AiLevel.CUSTOM;
    }
  }

  reset() {
    this.direction = this.initialDirection;
    this.initTriedDirections = [];
    this.errorInit = false;
    this.queue = [];
    this.score = 0;
    this.gameOver = false;
    this.scoreMax = false;
    this.lastTailMoved = true;
    this.lastTail = undefined;
    this.lastKey = -1;
    this.ticksDead = 0;
    this.ticksWithoutAction = 0;
    if(this.snakeAI) this.snakeAI.aiFruitGoal = GameConstants.CaseType.FRUIT;
  }

  insert(position) {
    this.queue.unshift(position);
    this.grid.set(GameConstants.CaseType.SNAKE, position);
  }

  remove() {
    const last = this.queue.pop();
    this.grid.set(GameConstants.CaseType.EMPTY, last);
    this.lastTail = last;
  }

  length() {
    return this.queue.length;
  }

  get(index) {
    if(this.queue[index] != null) {
      return this.queue[index].copy();
    } else {
      return null;
    }
  }

  set(index, position) {
    if(index >= 0 && index < this.length()) {
      this.queue[index] = position;
    }
  }

  getHeadPosition() {
    return this.get(0);
  }

  getTailPosition() {
    return this.get(this.length() - 1);
  }

  hasMaxScore() {
    return this.grid.getTotal(GameConstants.CaseType.EMPTY) <= 0 && !this.grid.fruitPosGold && !this.grid.fruitPos;
  }

  setGameOver(ticks) {
    this.gameOver = true;
    this.ticksDead = ticks;

    for(let i = 0; i < this.length(); i++) {
      this.grid.set(GameConstants.CaseType.SNAKE_DEAD, this.get(i));
    }
  }

  kill() {
    this.autoRetry = false;
    this.grid = null;
    this.queue = null;
  }

  keyToDirection(key) {
    if(key == GameConstants.Key.LEFT && this.direction != GameConstants.Direction.RIGHT && this.direction != GameConstants.Direction.LEFT) {
      return GameConstants.Direction.LEFT;
    }

    if(key == GameConstants.Key.UP && this.direction != GameConstants.Direction.BOTTOM && this.direction != GameConstants.Direction.UP) {
      return GameConstants.Direction.UP;
    }

    if(key == GameConstants.Key.RIGHT && this.direction != GameConstants.Direction.LEFT && this.direction != GameConstants.Direction.RIGHT) {
      return GameConstants.Direction.RIGHT;
    }

    if(key == GameConstants.Key.BOTTOM && this.direction != GameConstants.Direction.UP && this.direction != GameConstants.Direction.BOTTOM) {
      return GameConstants.Direction.BOTTOM;
    }

    return null;
  }

  moveTo(key) {
    const direction = this.keyToDirection(key);

    if(direction != null) {
      this.direction = direction;
    }
  }

  getNextPosition(oldPos, newDirection) {
    return this.grid.getNextPosition(oldPos, newDirection);
  }

  getDirectionTo(position, otherPosition) {
    return this.grid.getDirectionTo(position, otherPosition);
  }

  getGraphicDirectionFor(current, next, prec) {
    if(next == undefined || prec == undefined) return current.direction;

    const directionToPrec = this.getDirectionTo(current, prec);
    const directionToNext = this.getDirectionTo(current, next);

    if(directionToPrec == GameConstants.Direction.LEFT && directionToNext == GameConstants.Direction.BOTTOM || directionToPrec == GameConstants.Direction.BOTTOM && directionToNext == GameConstants.Direction.LEFT) {
      return GameConstants.Direction.ANGLE_1;
    } else if(directionToPrec == GameConstants.Direction.RIGHT && directionToNext == GameConstants.Direction.BOTTOM || directionToPrec == GameConstants.Direction.BOTTOM && directionToNext == GameConstants.Direction.RIGHT) {
      return GameConstants.Direction.ANGLE_2;
    } else if(directionToPrec == GameConstants.Direction.UP && directionToNext == GameConstants.Direction.RIGHT || directionToPrec == GameConstants.Direction.RIGHT && directionToNext == GameConstants.Direction.UP) {
      return GameConstants.Direction.ANGLE_3;
    } else if(directionToPrec == GameConstants.Direction.UP && directionToNext == GameConstants.Direction.LEFT || directionToPrec == GameConstants.Direction.LEFT && directionToNext == GameConstants.Direction.UP) {
      return GameConstants.Direction.ANGLE_4;
    } else {
      return current.direction;
    }
  }

  getGraphicDirection(index) {
    return this.getGraphicDirectionFor(this.get(index), this.get(index - 1), this.get(index + 1));
  }

  copy() {
    const snake = new Snake(this.direction, 3, new Grid(this.grid.width, this.grid.height, false, false), this.player, this.aiLevel, false);

    for(let i = 0; i < snake.grid.height; i++) {
      for(let j = 0; j < snake.grid.width; j++) {
        snake.grid.set(this.grid.get(new Position(j, i)), new Position(j, i));
      }
    }

    snake.queue = [];

    for(let i = 0; i < this.queue.length; i++) {
      snake.queue.push(JSON.parse(JSON.stringify(this.queue[i])));
    }

    return snake;
  }

  ai() {
    if(this.snakeAI && this.snakeAI.ai) {
      const action = this.snakeAI.ai(this);

      if(!action || this.keyToDirection(action) == this.direction) {
        this.ticksWithoutAction++;
      } else {
        this.ticksWithoutAction = 0;
      }

      return action;
    }
    
    return null;
  }

  isAIStuck(widthLimit, heightLimit) {
    if(this.snakeAI && this.snakeAI.ai) {
      if((this.direction == GameConstants.Direction.LEFT || this.direction == GameConstants.Direction.RIGHT) && this.ticksWithoutAction >= this.grid.width * widthLimit) {
        return true;
      } else if((this.direction == GameConstants.Direction.UP || this.direction == GameConstants.Direction.BOTTOM) && this.ticksWithoutAction >= this.grid.height * heightLimit) {
        return true;
      }
    }

    return false;
  }

  getAILevelText() {
    return this.snakeAI ? this.snakeAI.aiLevelText : "???";
  }
}