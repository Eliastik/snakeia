
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
import SnakeAI from "./SnakeAI.js";
import GameConstants from "../Constants.js";

export default class SnakeAILow extends SnakeAI {
  constructor() {
    super();
    this.aiLevelText = "low";
    this.prevDirection = null;
    this.currDirection = null;
  }

  ai(snake) {
    super.ai(snake);

    const head = snake.getHeadPosition();
    const fruitGoal = this.targetFruit ?? this.aiFruitGoalsSorted[0];
    
    if(!fruitGoal) {
      return;
    }

    const fruitPos = fruitGoal.position;
    const grid = snake.grid;
    const { LEFT, RIGHT, UP, BOTTOM } = GameConstants.Key;

    const isDeadAt      = (dir) => grid.isDeadPosition(snake.getNextPosition(head, dir));
    const isDeadDiagAt  = (dir1, dir2) => grid.isDeadPosition(snake.getNextPosition(snake.getNextPosition(head, dir1), dir2));

    const obstacle = {
      left:      isDeadAt(LEFT),
      right:     isDeadAt(RIGHT),
      up:        isDeadAt(UP),
      down:      isDeadAt(BOTTOM),
      upLeft:    isDeadDiagAt(UP,     LEFT),
      upRight:   isDeadDiagAt(UP,     RIGHT),
      downLeft:  isDeadDiagAt(BOTTOM, LEFT),
      downRight: isDeadDiagAt(BOTTOM, RIGHT),
    };

    let nextDirection = this.getDirectionToFruit(head, fruitPos, grid);

    if(nextDirection === RIGHT  && obstacle.right) nextDirection = LEFT;
    if(nextDirection === LEFT   && obstacle.left)  nextDirection = RIGHT;
    if(nextDirection === UP     && obstacle.up)    nextDirection = BOTTOM;
    if(nextDirection === BOTTOM && obstacle.down)  nextDirection = UP;

    if(isDeadAt(nextDirection)) {
      if(this.prevDirection && !isDeadAt(this.prevDirection)) {
        nextDirection = this.prevDirection;
      } else {
        if(obstacle.upLeft   && obstacle.upRight  && !obstacle.down)  nextDirection = BOTTOM;
        if(obstacle.upLeft   && obstacle.upRight  && !obstacle.right) nextDirection = RIGHT;
        if(obstacle.upLeft   && obstacle.upRight  && !obstacle.left)  nextDirection = LEFT;

        if(obstacle.downLeft && obstacle.downRight && !obstacle.up)   nextDirection = UP;
        if(obstacle.downLeft && obstacle.downRight && !obstacle.right) nextDirection = RIGHT;
        if(obstacle.downLeft && obstacle.downRight && !obstacle.left)  nextDirection = LEFT;

        if(obstacle.upLeft   && obstacle.downLeft  && !obstacle.right) nextDirection = RIGHT;
        if(obstacle.upLeft   && obstacle.downLeft  && !obstacle.up)    nextDirection = UP;
        if(obstacle.upLeft   && obstacle.downLeft  && !obstacle.down)  nextDirection = BOTTOM;

        if(obstacle.upRight  && obstacle.downRight && !obstacle.left)  nextDirection = LEFT;
        if(obstacle.upRight  && obstacle.downRight && !obstacle.up)    nextDirection = UP;
        if(obstacle.upRight  && obstacle.downRight && !obstacle.down)  nextDirection = BOTTOM;
      }
    }

    if(isDeadAt(nextDirection)) {
      nextDirection = [UP, RIGHT, BOTTOM, LEFT].find(dir => !isDeadAt(dir)) ?? nextDirection;
    }

    if(nextDirection !== this.currDirection) {
      this.prevDirection = this.currDirection;
    }

    this.currDirection = nextDirection;

    return nextDirection;
  }

  getDirectionToFruit(head, fruitPos, grid) {
    const { LEFT, RIGHT, UP, BOTTOM } = GameConstants.Key;
    const dx = fruitPos.x - head.x;
    const dy = fruitPos.y - head.y;

    if(dx !== 0) {
      if(dx > 0) {
        return Math.abs(dx) > grid.width  / 2 ? LEFT   : RIGHT;
      } else {
        return Math.abs(dx) > grid.width  / 2 ? RIGHT  : LEFT;
      }
    }

    if(dy > 0) {
      return Math.abs(dy) > grid.height / 2 ? UP     : BOTTOM;
    } else {
      return Math.abs(dy) > grid.height / 2 ? BOTTOM : UP;
    }
  }
}