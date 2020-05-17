
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
import SnakeAI from "./snakeAI";
import GameConstants from "../constants";

export default class SnakeAILow extends SnakeAI {
  constructor(snake) {
    super(snake);
  }

  ai() {
    super.ai();

    if(this.snake.grid.fruitPos != null) {
      const currentPosition = this.snake.getHeadPosition();
      const fruitPos = this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD ? this.snake.grid.fruitPosGold : this.snake.grid.fruitPos;
      let directionNext = GameConstants.Key.RIGHT;

      if(fruitPos.x > currentPosition.x) {
        if(fruitPos.x - currentPosition.x > this.snake.grid.width / 2) {
          directionNext = GameConstants.Key.LEFT;
        } else {
          directionNext = GameConstants.Key.RIGHT;
        }
      } else if(fruitPos.x < currentPosition.x) {
        if(currentPosition.x - fruitPos.x > this.snake.grid.width / 2) {
          directionNext = GameConstants.Key.RIGHT;
        } else {
          directionNext = GameConstants.Key.LEFT;
        }
      } else if(fruitPos.y < currentPosition.y) {
        if(currentPosition.y - fruitPos.y > this.snake.grid.height / 2) {
          directionNext = GameConstants.Key.BOTTOM;
        } else {
          directionNext = GameConstants.Key.UP;
        }
      } else if(fruitPos.y > currentPosition.y) {
        if(fruitPos.y - currentPosition.y > this.snake.grid.height / 2) {
          directionNext = GameConstants.Key.UP;
        } else {
          directionNext = GameConstants.Key.BOTTOM;
        }
      }

      let nextPosition = this.snake.getNextPosition(currentPosition, directionNext);

      if(this.snake.grid.isDeadPosition(nextPosition)) {
        const currentDirection = this.direction;
        let firstDifferentDirection = null;

        for(let i = 1; i < this.snake.queue.length; i++) {
          if(this.snake.get(i).direction != currentDirection) {
            firstDifferentDirection = this.snake.get(i).direction;
            break;
          }
        }

        nextPosition = this.snake.getNextPosition(currentPosition, firstDifferentDirection);

        if(this.snake.grid.isDeadPosition(nextPosition)) {
          if(!this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.UP))) {
            directionNext = GameConstants.Key.UP;
          } else if(!this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.RIGHT))) {
            directionNext = GameConstants.Key.RIGHT;
          } else if(!this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.BOTTOM))) {
            directionNext = GameConstants.Key.BOTTOM;
          } else if(!this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.LEFT))) {
            directionNext = GameConstants.Key.LEFT;
          }
        } else {
          directionNext = nextPosition.convertToKeyDirection();
        }
      }

      return directionNext;
    }
  }
}