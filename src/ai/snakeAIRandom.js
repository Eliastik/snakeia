
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
import GameUtils from "../gameUtils";

export default class SnakeAIRandom extends SnakeAI {
  constructor(snake) {
    super(snake);
  }

  ai() {
    super.ai();

    const currentPosition = this.snake.getHeadPosition();
    const top = this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.UP));
    const left = this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.LEFT));
    const bottom = this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.BOTTOM));
    const right = this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, GameConstants.Key.RIGHT));

    if(top && left && bottom && right) {
      return GameConstants.Key.UP;
    } else {
      let direction = null;

      while(direction == null || this.snake.grid.isDeadPosition(this.snake.getNextPosition(currentPosition, direction))) {
        const r = GameUtils.randRange(1, 4, this.snake.grid ? this.snake.grid.rngGame : null);

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
  }
}