/*
 * Copyright (C) 2019-2026 Eliastik (eliastiksofts.com)
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
import GameConstants from "../../Constants.js";
import BaseRewardStrategy from "./BaseRewardStrategy.js";

export default class BFSRewardStrategy extends BaseRewardStrategy {

  // eslint-disable-next-line no-unused-vars
  calculateReward(snake, currentState, done) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();
    
    const fruits = this.findAllPositionsInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT);
    const goldFruits = this.findAllPositionsInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT_GOLD);
    
    if(fruits.length === 0 && goldFruits.length === 0) {
      this.logger.warn("No fruit detected\n");
    }
    
    if(gameOver) {
      let numberOfEmptyCaseAround = 0;
    
      for(const directionNext of [GameConstants.Direction.UP, GameConstants.Direction.DOWN, GameConstants.Direction.LEFT, GameConstants.Direction.RIGHT]) {
        const nextPosition = snake.getNextPosition(head, directionNext);
    
        if(!snake.grid.isDeadPosition(nextPosition)) {
          numberOfEmptyCaseAround++;
        }
      }
    
      return numberOfEmptyCaseAround >= 1 ?
        GameConstants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND :
        GameConstants.AIRewards.GAME_OVER;
    }
    
    if(snake.isAIStuck(1)) {
      const stuckRatio = snake.stuckCounter / snake.maxLastMoves;
      const penalty = Math.min(0.001 * stuckRatio, GameConstants.AIRewards.STUCK_MAX_PENALTY);
      return GameConstants.AIRewards.MOVE - penalty;
    }
    
    for(const fruit of fruits) {
      if(head.x === fruit.x && head.y === fruit.y) {
        return GameConstants.AIRewards.FRUIT_EATEN;
      }
    }
    
    for(const fruitGold of goldFruits) {
      if(head.x === fruitGold.x && head.y === fruitGold.y) {
        return GameConstants.AIRewards.GOLD_FRUIT_EATEN;
      }
    }
    
    if(fruits.length > 0 || goldFruits.length > 0) {
      const prevHead = snake.get(1);
    
      if(prevHead) {
        const distFromHead = this.bfsAll(snake, head.x, head.y);
        const distFromPrev = this.bfsAll(snake, prevHead.x, prevHead.y);
        const key = (pos) => pos.y * snake.grid.width + pos.x;
    
        let closestFruit = null;
        let closestFruitDist = Infinity;
    
        for(const fruit of fruits) {
          const d = distFromHead[key(fruit)];
    
          if(d !== -1 && d < closestFruitDist) {
            closestFruitDist = d;
            closestFruit = fruit;
          }
        }
    
        let closestGoldFruit = null;
        let closestGoldFruitDist = Infinity;
    
        for(const fruitGold of goldFruits) {
          const d = distFromHead[key(fruitGold)];
    
          if(d !== -1 && d < closestGoldFruitDist) {
            closestGoldFruitDist = d;
            closestGoldFruit = fruitGold;
          }
        }
    
        let targetFruit = null;
    
        if(closestFruit && closestGoldFruit) {
          targetFruit = closestGoldFruitDist <= closestFruitDist * 0.8 ? closestGoldFruit : closestFruit;
        } else if(closestFruit) {
          targetFruit = closestFruit;
        } else if(closestGoldFruit) {
          targetFruit = closestGoldFruit;
        }
    
        if(targetFruit) {
          const distAfter = distFromHead[key(targetFruit)];
          const distBefore = distFromPrev[key(targetFruit)];
    
          if(distAfter === -1) {
            return GameConstants.AIRewards.MOVE - 0.05;
          }
    
          return GameConstants.AIRewards.MOVE + (distBefore - distAfter) * 0.05;
        }
      }
    }
    
    return GameConstants.AIRewards.MOVE;
  }
    
  bfsAll(snake, fromX, fromY) {
    const grid = snake.grid;
    const size = grid.width * grid.height;
    const dist = new Int16Array(size).fill(-1);
    const queue = new Int32Array(size);
    
    const startKey = fromY * grid.width + fromX;
    dist[startKey] = 0;
    queue[0] = startKey;
    let head = 0, tail = 1;
    
    while(head < tail) {
      const key = queue[head++];
      const x = key % grid.width;
      const y = (key - x) / grid.width;
      const d = dist[key];
    
      if(x > 0) {
        const nk = key - 1;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x - 1, y)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }
    
      if(x < grid.width - 1) {
        const nk = key + 1;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x + 1, y)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }
    
      if(y > 0) {
        const nk = key - grid.width;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x, y - 1)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }
    
      if(y < grid.height - 1) {
        const nk = key + grid.width;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x, y + 1)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }
    }
    
    return dist;
  }
    
  bfsDistance(snake, fromX, fromY, toX, toY) {
    return this.bfsAll(snake, fromX, fromY)[toY * snake.grid.width + toX];
  }
}