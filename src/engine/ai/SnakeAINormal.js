
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
import Position from "../Position.js";
import Lowlight from "../../../libs/lowlight.astar.min.js";

export default class SnakeAINormal extends SnakeAI {

  constructor(enableTorus) {
    super();
    this.enableTorus = enableTorus;
    this.aiLevelText = "normal";

    this.path = [];
    this.oldFruitPosition = null;
    this.oldFruitPositionGold = null;
  }

  ai(snake) {
    super.ai(snake);

    if(this.shouldUpdatePath(snake)) {
      this.updatePath(snake);
    }

    const currentPosition = snake.getHeadPosition();

    if(this.path.length > 0) {
      const nextPositionPath = this.path.pop();
      const nextPosition = new Position(nextPositionPath.x, nextPositionPath.y);
      return new Position(null, null, snake.getDirectionTo(currentPosition, nextPosition)).convertToKeyDirection();
    }

    return null;
  }

  shouldUpdatePath(snake) {
    if(this.path.length === 0) {
      return true;
    }

    const fruitPos = snake.grid.fruitPos;
    const fruitPosGold = snake.grid.fruitPosGold;

    if(this.aiFruitGoal === GameConstants.CaseType.FRUIT_GOLD
      && !fruitPosGold.equals(this.oldFruitPositionGold)
    ) {
      return true;
    }

    if(this.aiFruitGoal === GameConstants.CaseType.FRUIT
      && !fruitPos.equals(this.oldFruitPosition)
    ) {
      return true;
    }

    for(const position of this.path) {
      if(snake.grid.isDeadPosition(new Position(position.x, position.y))) {
        return true;
      }
    }

    return false;
  }

  updatePath(snake) {
    const currentPosition = snake.getHeadPosition();
    const fruitPos = snake.grid.fruitPos;
    const fruitPosGold = snake.grid.fruitPosGold;
    let fruitTarget = fruitPos;

    if(currentPosition && (fruitPos || fruitPosGold)) {
      const grid = snake.grid.getGraph(false);

      const graph = new Lowlight.Astar.Configuration(grid, {
        order: "yx",
        torus: this.enableTorus ? true : false,
        diagonals: false,
        cutting: false,
        static: true,
        cost(a, b) { return b == 1 ? null : 1; }
      });

      if(fruitPosGold && this.aiFruitGoal === GameConstants.CaseType.FRUIT_GOLD) {
        fruitTarget = fruitPosGold;
      }

      let calculatedPath = this.calculatePath(graph, currentPosition, fruitTarget);

      if(calculatedPath.length < 1) {
        if(this.aiFruitGoal === GameConstants.CaseType.FRUIT_GOLD || !fruitPosGold) {
          fruitTarget = fruitPos;
        }

        calculatedPath = this.calculatePath(graph, currentPosition, fruitTarget);
      }

      this.path = calculatedPath.reverse();
      this.path.pop();

      this.oldFruitPosition = fruitPos;
      this.oldFruitPositionGold = fruitPosGold;
    }
  }

  calculatePath(graph, currentPosition, fruitTarget) {
    return graph.path({ x: currentPosition.x, y: currentPosition.y }, { x: fruitTarget ? fruitTarget.x : null, y: fruitTarget ? fruitTarget.y : null });
  }
}