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

export default class PotentialRewardStrategy extends BaseRewardStrategy {

  constructor(logger = null, options = {}) {
    super(logger);

    this.gamma = options.gamma ?? 0.99;

    this.distanceWeight = options.distanceWeight ?? 0.10;
    this.spaceWeight = options.spaceWeight ?? 0.05;

    this.goldBonus = options.goldBonus ?? 3;

    this.includeSurrounded = options.includeSurrounded ?? true;

    this.enableStuckPenalty = options.enableStuckPenalty ?? false;

    this.potentialCache = new Map();

    this.lastPhi = 0;
    this.lastShaping = 0;
    this.floodFillCount = 0;
  }

  reset(instanceId = "inference") {
    this.potentialCache.delete(instanceId);
  }

  resetAll() {
    this.potentialCache.clear();
  }

  calculateReward(snake, currentState, done = false, instanceId = "inference") {
    const { gameOver } = snake;
    const isTerminalTransition = Boolean(done) || gameOver;
    const head = snake.getHeadPosition();

    const previousPotential = this.potentialCache.get(instanceId) ?? 0;

    let baseReward;

    if(gameOver) {
      baseReward = this.getDeathReward(snake, head);
    } else {
      const eatenFruit = this.getEatenFruit(head, currentState);

      if(eatenFruit === GameConstants.CaseType.FRUIT_GOLD) {
        baseReward = GameConstants.AIRewards.GOLD_FRUIT_EATEN;
      } else if(eatenFruit === GameConstants.CaseType.FRUIT) {
        baseReward = GameConstants.AIRewards.FRUIT_EATEN;
      } else if(isTerminalTransition) {
        baseReward = GameConstants.AIRewards.MOVE;
      } else {
        baseReward = GameConstants.AIRewards.MOVE;

        if(this.enableStuckPenalty && snake.isAIStuck(1)) {
          const stuckRatio = snake.stuckCounter / snake.maxLastMoves;
          baseReward -= Math.min(0.001 * stuckRatio, GameConstants.AIRewards.STUCK_MAX_PENALTY);
        }
      }
    }

    let nextPotential = 0;

    if(isTerminalTransition) {
      this.potentialCache.delete(instanceId);
    } else {
      nextPotential = this.computePotential(snake);
      this.potentialCache.set(instanceId, nextPotential);
    }

    const shaping = this.gamma * nextPotential - previousPotential;

    this.lastPhi = nextPotential;
    this.lastShaping = shaping;

    return baseReward + shaping;
  }

  getEatenFruit(head, currentState) {
    if(!currentState || !currentState.fruitsAndWallsLayer) {
      return null;
    }

    const row = currentState.fruitsAndWallsLayer[head.y];

    if(!row || head.x < 0 || head.x >= row.length) {
      return null;
    }

    const cellValue = row[head.x];

    if(cellValue === GameConstants.CaseTypeAIValue[GameConstants.CaseType.FRUIT_GOLD]) {
      return GameConstants.CaseType.FRUIT_GOLD;
    }

    if(cellValue === GameConstants.CaseTypeAIValue[GameConstants.CaseType.FRUIT]) {
      return GameConstants.CaseType.FRUIT;
    }

    return null;
  }

  getDeathReward(snake, head) {
    let numberOfEmptyCaseAround = 0;

    for(const directionNext of [GameConstants.Direction.UP, GameConstants.Direction.DOWN, GameConstants.Direction.LEFT, GameConstants.Direction.RIGHT]) {
      const nextPosition = snake.getNextPosition(head, directionNext);

      if(!snake.grid.isDeadPosition(nextPosition, false, this.includeSurrounded)) {
        numberOfEmptyCaseAround++;
      }
    }

    return numberOfEmptyCaseAround >= 1 ?
      GameConstants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND :
      GameConstants.AIRewards.GAME_OVER;
  }

  floodFillFromHead(snake) {
    const grid = snake.grid;
    const width = grid.width;
    const height = grid.height;
    const size = width * height;
    const head = snake.getHeadPosition();

    const dist = new Int16Array(size).fill(-1);
    const queue = new Int32Array(size);

    const startKey = head.y * width + head.x;
    dist[startKey] = 0;
    queue[0] = startKey;

    let queueHead = 0, queueTail = 1;
    let reachArea = 1;
    let diameter = 0;
    let closestFruitDistance = -1;

    while(queueHead < queueTail) {
      const key = queue[queueHead++];
      const x = key % width;
      const y = (key - x) / width;
      const d = dist[key];

      if(d > diameter) {
        diameter = d;
      }

      for(let i = 0; i < 4; i++) {
        let nx, ny;

        if(i === 0) { nx = x - 1; ny = y; }
        else if(i === 1) { nx = x + 1; ny = y; }
        else if(i === 2) { nx = x; ny = y - 1; }
        else { nx = x; ny = y + 1; }

        if(nx < 0 || nx >= width || ny < 0 || ny >= height) {
          continue;
        }

        const nk = ny * width + nx;

        if(dist[nk] !== -1) {
          continue;
        }

        const caseType = grid.getXY(nx, ny);

        if(caseType === GameConstants.CaseType.SNAKE
          || caseType === GameConstants.CaseType.WALL
          || caseType === GameConstants.CaseType.SNAKE_DEAD
          || (this.includeSurrounded && caseType === GameConstants.CaseType.SURROUNDED)) {
          continue;
        }

        dist[nk] = d + 1;
        queue[queueTail++] = nk;
        reachArea++;

        if(caseType === GameConstants.CaseType.FRUIT || caseType === GameConstants.CaseType.FRUIT_GOLD) {
          let effectiveDistance = d + 1;

          if(caseType === GameConstants.CaseType.FRUIT_GOLD) {
            effectiveDistance = Math.max(0, effectiveDistance - this.goldBonus);
          }

          if(closestFruitDistance === -1 || effectiveDistance < closestFruitDistance) {
            closestFruitDistance = effectiveDistance;
          }
        }
      }
    }

    this.floodFillCount++;

    return { dist, reachArea, diameter, closestFruitDistance };
  }

  computePotential(snake) {
    const { reachArea, diameter, closestFruitDistance } = this.floodFillFromHead(snake);
    const grid = snake.grid;
    const totalCells = grid.width * grid.height;

    const spaceTerm = totalCells > 0 ? reachArea / totalCells : 0;

    let distanceTerm = 0;

    if(closestFruitDistance !== -1) {
      const normalizer = Math.max(1, diameter);
      distanceTerm = 1 - (closestFruitDistance / normalizer);

      if(distanceTerm < 0) {
        distanceTerm = 0;
      }
    }

    return this.distanceWeight * distanceTerm + this.spaceWeight * spaceTerm;
  }
}
