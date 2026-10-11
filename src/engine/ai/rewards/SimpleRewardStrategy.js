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

export default class SimpleRewardStrategy extends BaseRewardStrategy {

  calculateReward(snake, currentState, done) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();
        
    const fruits = this.findAllPositionsInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT);
    const goldFruits = this.findAllPositionsInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT_GOLD);
        
    if(fruits.length === 0 && goldFruits.length === 0) {
      this.logger.warn("No fruit detected\n");
    }
    
    if(gameOver || done) {
      return GameConstants.AIRewards.GAME_OVER;
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
        
    return GameConstants.AIRewards.MOVE;
  }
}