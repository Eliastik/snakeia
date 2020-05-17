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
import GameConstants from "../constants";

export default class SnakeAI {
  constructor(snake) {
    this.snake = snake;
    this.aiFruitGoal = GameConstants.CaseType.FRUIT;
  }

  ai() {
    const currentPosition = this.snake.getHeadPosition();
    const fruitPos = this.snake.grid.fruitPos;
    const fruitPosGold = this.snake.grid.fruitPosGold;

    if(fruitPos != null) {
      const distFruit = Math.abs(fruitPos.x - currentPosition.x) + Math.abs(fruitPos.y - currentPosition.y);
      const distFruitGold = fruitPosGold != null ? Math.abs(fruitPosGold.x - currentPosition.x) + Math.abs(fruitPosGold.y - currentPosition.y) : -1;
    
      if(fruitPosGold != null && this.snake.grid.get(fruitPosGold) == GameConstants.CaseType.FRUIT_GOLD && this.aiFruitGoal == GameConstants.CaseType.FRUIT) {
        if(distFruitGold < distFruit) {
          this.aiFruitGoal = GameConstants.CaseType.FRUIT_GOLD;
        } else {
          this.aiFruitGoal = GameConstants.CaseType.FRUIT;
        }
      } else if(fruitPosGold == null || this.snake.grid.get(fruitPosGold) != GameConstants.CaseType.FRUIT_GOLD) {
        this.aiFruitGoal = GameConstants.CaseType.FRUIT;
      }
    }

    return null;
  }

  get aiLevelText() {
    return i18next.t("engine.aiLevelList.custom");
  }
}