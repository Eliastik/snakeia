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
    this.aiFruitGoal = GameConstants.CaseType.FRUIT;
    this.aiFruitTargetPos = null; // Stocker la position du fruit cible
    this.aiLevelText = "custom";
  }

  ai(snake) {
    const currentPosition = snake.getHeadPosition();
    const fruitPositions = snake.grid.fruitPositions || [];
    const fruitPosGold = snake.grid.fruitPosGold;

    let closestFruitPos = null;
    let minDistFruit = Infinity;

    for(const fruitPos of fruitPositions) {
      if(snake.grid.get(fruitPos) == GameConstants.CaseType.FRUIT) {
        const dist = Math.abs(fruitPos.x - currentPosition.x) + Math.abs(fruitPos.y - currentPosition.y);
        if(dist < minDistFruit) {
          minDistFruit = dist;
          closestFruitPos = fruitPos;
        }
      }
    }

    const distFruitGold = fruitPosGold && snake.grid.get(fruitPosGold) == GameConstants.CaseType.FRUIT_GOLD
      ? Math.abs(fruitPosGold.x - currentPosition.x) + Math.abs(fruitPosGold.y - currentPosition.y)
      : Infinity;

    if(closestFruitPos && minDistFruit <= distFruitGold * 0.8) {
      this.aiFruitGoal = GameConstants.CaseType.FRUIT;
      this.aiFruitTargetPos = closestFruitPos;
    } else if(distFruitGold !== Infinity) {
      this.aiFruitGoal = GameConstants.CaseType.FRUIT_GOLD;
      this.aiFruitTargetPos = fruitPosGold;
    } else if(closestFruitPos) {
      this.aiFruitGoal = GameConstants.CaseType.FRUIT;
      this.aiFruitTargetPos = closestFruitPos;
    } else {
      this.aiFruitTargetPos = null;
    }

    return null;
  }
}