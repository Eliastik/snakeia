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
import GameConstants from "../Constants.js";

export default class SnakeAI {
  constructor() {
    this.aiFruitGoalsSorted = [];
    this.aiLevelText = "custom";
  }

  ai(snake) {
    const currentPosition = snake.getHeadPosition();
    const fruitPositions = snake.grid.fruitPositions || [];
    const fruitPosGold = snake.grid.fruitPosGold;

    const goals = [];

    for(const fruitPos of fruitPositions) {
      if(snake.grid.get(fruitPos) === GameConstants.CaseType.FRUIT) {
        const dist = Math.abs(fruitPos.x - currentPosition.x) + Math.abs(fruitPos.y - currentPosition.y);
        goals.push({ type: GameConstants.CaseType.FRUIT, position: fruitPos, dist });
      }
    }

    if(fruitPosGold && snake.grid.get(fruitPosGold) === GameConstants.CaseType.FRUIT_GOLD) {
      const dist = Math.abs(fruitPosGold.x - currentPosition.x) + Math.abs(fruitPosGold.y - currentPosition.y);
      const closestNormalDist = goals.length > 0 ? Math.min(...goals.map(g => g.dist)) : Infinity;
      const goldPriority = closestNormalDist <= dist * 0.8 ? 1 : 0;

      goals.push({ type: GameConstants.CaseType.FRUIT_GOLD, position: fruitPosGold, dist, goldPriority });
    }

    goals.sort((a, b) => {
      const pa = a.goldPriority ?? 1;
      const pb = b.goldPriority ?? 1;
      if(pa !== pb) return pa - pb;
      return a.dist - b.dist;
    });

    this.aiFruitGoalsSorted = goals;

    return null;
  }
}