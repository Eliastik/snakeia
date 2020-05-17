
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
import Position from "../position";

export default class SnakeAINormal extends SnakeAI {
  constructor(snake, enableTorus) {
    super(snake);
    this.enableTorus = enableTorus;
  }

  ai() {
    super.ai();

    const currentPosition = this.snake.getHeadPosition();
    const fruitPos = this.snake.grid.fruitPos;
    const fruitPosGold = this.snake.grid.fruitPosGold;

    if(this.snake.grid.fruitPos) {
      const grid = this.snake.grid.getGraph(false);

      const graph = new Lowlight.Astar.Configuration(grid, {
        order: "yx",
        torus: this.enableTorus ? true : false,
        diagonals: false,
        cutting: false,
        static: true,
        cost(a, b) { return b == 1 ? null : 1 }
      });

      let path = graph.path({ x: currentPosition.x, y: currentPosition.y }, { x: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD ? fruitPosGold.x : fruitPos.x, y: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD ? fruitPosGold.y : fruitPos.y });

      if(path.length < 1) {
        path = graph.path({ x: currentPosition.x, y: currentPosition.y }, { x: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD || !fruitPosGold ? fruitPos.x : fruitPosGold.x, y: this.aiFruitGoal == GameConstants.CaseType.FRUIT_GOLD || !fruitPosGold ? fruitPos.y : fruitPosGold.y });
      }

      if(path.length > 1) {
        const nextPosition = new Position(path[1].x, path[1].y);
        return new Position(null, null, this.snake.getDirectionTo(currentPosition, nextPosition)).convertToKeyDirection();
      }

      grid, graph, path = null;
    }

    return null;
  }
}