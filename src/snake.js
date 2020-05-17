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
import i18next from "i18next";
import GameConstants from "./constants";
import Position from "./position";
import Grid from "./grid";
import { SnakeAI, SnakeAIRandom, SnakeAILow, SnakeAINormal, SnakeAIHigh } from "./ai/index";

export default class Snake {
  constructor(direction, length, grid, player, aiLevel, autoRetry, name, ai) {
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
    this.snakeAI = new SnakeAI(this);

    if(!ai) {
      switch(this.aiLevel) {
        case GameConstants.AiLevel.RANDOM:
          this.snakeAI = new SnakeAIRandom(this);
          break;
        case GameConstants.AiLevel.LOW:
          this.snakeAI = new SnakeAILow(this);
          break;
        case GameConstants.AiLevel.DEFAULT:
          this.snakeAI = new SnakeAINormal(this);
          break;
        case GameConstants.AiLevel.HIGH:
          this.snakeAI = new SnakeAIHigh(this);
          break;
        case GameConstants.AiLevel.ULTRA:
          this.snakeAI = new SnakeAIHigh(this);
          break;
      }
    } else {
      this.snakeAI = ai;
      this.snakeAI.snake = this;
      this.aiLevel = GameConstants.AiLevel.CUSTOM;
    }

    this.init();
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

    for(let i = 0; i < positionsToAdd.length; i++) {
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
  }

  reset() {
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

  setGameOver() {
    this.gameOver = true;

    for(let i = 0; i < this.length(); i++) {
      this.grid.set(GameConstants.CaseType.SNAKE_DEAD, this.get(i));
    }
  }

  kill() {
    this.autoRetry = false;
    this.grid = null;
    this.queue = null;
  }

  moveTo(direction) {
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
    const snake = new Snake(direction, 3, new Grid(this.grid.width, this.grid.height, false, false), this.player, this.aiLevel, false);

    for(let i = 0; i < snake.grid.height; i++) {
      for(let j = 0; j < snake.grid.width; j++) {
        snake.grid.set(this.grid.get(new Position(j, i)), new Position(j, i));
      }
    }

    snake.queue = [];

    for(let i = 0; i < this.queue.length; i++) {
      snake.queue.push(elem.copy());
    }

    return snake;
  }

  ai() {
    return this.snakeAI.ai();
  }

  getAILevelText() {
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
      case GameConstants.AiLevel.CUSTOM:
        return i18next.t("engine.aiLevelList.custom");
      default:
        return "???";
    }
  }
}