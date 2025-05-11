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
import GameConstants from "./Constants.js";
import Position from "./Position.js";
import Grid from "./Grid.js";
import { SnakeAI, SnakeAIRandom, SnakeAILow, SnakeAINormal, SnakeAIHigh, SnakeAIMock, SnakeAIUltra } from "./ai/index.js";

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
    this.lastHead;
    this.lastTailMoved;
    this.lastHeadMoved;
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

    this.lastPositions = [];
    this.stuckCounter = 0;
  }

  async init() {
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

    const horizontal = Object.values(GameConstants.HorizontalDirection);
    const vertical = Object.values(GameConstants.VerticalDirection);

    if(horizontal.includes(this.initialDirection) && !this.initTriedDirections.includes(this.initialDirection)) {
      spaceLineAvailable = this.checkSpace(false);
    } else if(vertical.includes(this.initialDirection) && !this.initTriedDirections.includes(this.initialDirection)) {
      spaceColAvailable = this.checkSpace(true);
    }

    // Add current tried direction
    this.initTriedDirections.push(this.initialDirection);

    // If there are no space available for current direction
    if((spaceLineAvailable <= 0 && horizontal.includes(this.initialDirection)) || (spaceColAvailable <= 0 && vertical.includes(this.initialDirection))) {
      return this.handleNoSpace();
    }

    // If there are space available for current direction, place the Snake at a random position
    let posNotValidated = true;
    let positionsToAdd = [];

    while(posNotValidated) {
      posNotValidated = false;

      const startPos = this.getStartPosition();

      if(!startPos) {
        this.errorInit = true;
        return false;
      }

      const generatedPositions = this.generateSnakePositions(startPos);

      if(!generatedPositions) {
        posNotValidated = true;
      } else {
        positionsToAdd = generatedPositions;
      }

      if(this.grid.maze && posNotValidated) {
        return this.init();
      }
    }

    // If the Snake is near a dead position
    const nearDeadPosition = this.isNearDeadPosition(positionsToAdd);

    if(nearDeadPosition) {
      this.direction = this.grid.invertDirection(this.direction);
    }
  
    // Place the Snake at selected positions
    this.placeSnakeOnGrid(positionsToAdd, nearDeadPosition);

    // Assistant AI mode is forbidden if the grid is a maze
    if(this.grid.maze && this.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
      this.player = GameConstants.PlayerType.HUMAN;
    }

    // If Assistant AI mode is enabled, the AI assistant level is "High"
    if(this.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
      this.aiLevel = GameConstants.AiLevel.HIGH;
    }

    this.lastTail = this.getTailPosition();
    this.lastHead = this.getHeadPosition();

    await this.initAI();

    return true;
  }

  checkSpace(isColumn) {
    let spaceAvailable = 0;
    
    const outerLimit = isColumn ? this.grid.width : this.grid.height;
    const innerLimit = isColumn ? this.grid.height : this.grid.width;
  
    for(let i = 0; i < outerLimit; i++) {
      let emptyCount = 0;
  
      for(let j = 0; j < innerLimit; j++) {
        const x = isColumn ? i : j;
        const y = isColumn ? j : i;
  
        if(this.grid.get(new Position(x, y)) == GameConstants.CaseType.EMPTY) {
          emptyCount++;
        } else {
          emptyCount = 0;
        }
  
        if(emptyCount >= this.initialLength) {
          spaceAvailable++;
          break;
        }
      }
    }
  
    return spaceAvailable;
  }

  handleNoSpace() {
    for(const direction of Object.values(GameConstants.SimpleDirection)) {
      if(!this.initTriedDirections.includes(direction)) {
        this.initialDirection = direction;
        this.direction = direction;
        return this.init();
      }
    }

    this.errorInit = true;

    return false;
  }

  getStartPosition() {
    if(this.grid.maze) {
      return this.grid.mazeFirstPosition;
    }
    
    return this.grid.getRandomPosition();
  }

  generateSnakePositions(startPos) {
    const positions = [];
    let currentPos = new Position(startPos.x, startPos.y, this.initialDirection);

    for(let i = this.initialLength - 1; i >= 0; i--) {
      if(i < this.initialLength - 1) {
        currentPos = this.grid.getNextPosition(currentPos, this.initialDirection);
      }

      if(this.grid.get(currentPos) != GameConstants.CaseType.EMPTY) {
        return null;
      }

      positions.push(new Position(currentPos.x, currentPos.y, currentPos.direction));
    }

    return positions;
  }

  isNearDeadPosition(positions) {
    if(!this.grid.maze) {
      const firstPosition = new Position(positions[positions.length - 1].x, positions[positions.length - 1].y, this.direction);

      for(const direction of Object.values(GameConstants.SimpleDirection)) {
        if(this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, direction), false) && this.direction == direction) {
          return true;
        }
      }
    }

    return false;
  }

  placeSnakeOnGrid(positionsToAdd, nearDeadPosition) {
    for(let i = 0; i < positionsToAdd.length; i++) {
      if(nearDeadPosition) {
        // We invert the direction of the Snake if near a dead position
        const position = positionsToAdd[positionsToAdd.length - i - 1];
        position.direction = this.grid.invertDirection(position.direction);
        this.insert(positionsToAdd[positionsToAdd.length - i - 1]);
      } else {
        this.insert(positionsToAdd[i]);
      }
    }
  }

  async initAI() {
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
      case GameConstants.AiLevel.ULTRA: {
        const aiUltra = new SnakeAIUltra(false, GameConstants.AIModelLocation);
        await aiUltra.setup();
        this.snakeAI = aiUltra;
        break;
      }
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
    this.lastHeadMoved = true;
    this.lastTail = undefined;
    this.lastHead = undefined;
    this.lastKey = -1;
    this.ticksDead = 0;
    this.lastPositions = [];
    this.stuckCounter = 0;

    if(this.snakeAI) {
      this.snakeAI.aiFruitGoal = GameConstants.CaseType.FRUIT;
    }
  }

  insert(position) {
    this.queue.unshift(position);
    this.grid.set(GameConstants.CaseType.SNAKE, position);
  }

  remove() {
    const last = this.queue.pop();
    this.grid.set(GameConstants.CaseType.EMPTY, last);

    this.lastTail = last;
    this.lastHead = this.getHeadPosition();
  }

  length() {
    return this.queue.length;
  }

  get(index) {
    if(this.queue && this.queue[index] != null) {
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

  increaseScore(count) {
    this.score += count;
    this.stuckCounter = 0;
    this.lastPositions = [];
  }

  getHeadPosition() {
    return this.get(0);
  }

  getTailPosition() {
    return this.get(this.length() - 1);
  }

  positionInQueue(position) {
    for(const value of this.queue) {
      if(value && value.x == position.x && value.y == position.y) {
        return true;
      }
    }

    return false;
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

    this.addMoveToHistory();
  }

  addMoveToHistory() {
    const head = this.getHeadPosition();
    const posKey = `${head.x},${head.y},${head.direction}`;

    if(this.lastPositions.includes(posKey)) {
      this.stuckCounter++;
    } else {
      this.stuckCounter = Math.max(0, this.stuckCounter - 1);
    }

    this.lastPositions.push(posKey);

    if(this.lastPositions.size > this.maxLastMoves) {
      this.lastPositions.shift();
    }
  }

  get maxLastMoves() {
    return Math.max(this.grid.width, this.grid.height);
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
      return this.snakeAI.ai(this);
    }
    
    return null;
  }

  isAIStuck(limit) {
    if(this.snakeAI && this.snakeAI.ai) {
      return this.stuckCounter >= this.maxLastMoves * limit;
    }

    return false;
  }

  getAILevelText() {
    return this.snakeAI ? this.snakeAI.aiLevelText : "???";
  }
}