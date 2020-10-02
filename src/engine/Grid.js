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
import GameUtils from "./GameUtils";
import GameConstants from "./Constants";
import Position from "./Position";
import seedrandom from "seedrandom";
import * as Lowlight from "../../libs/lowlight.astar.min";

export default class Grid {
  constructor(width, height, generateWalls, borderWalls, maze, customGrid, mazeForceAuto, seedGrid, seedGame) {
    this.width = width == undefined ? 20 : width;
    this.height = height == undefined ? 20 : height;
    this.generateWalls = generateWalls == undefined ? false : generateWalls;
    this.borderWalls = borderWalls == undefined ? false : borderWalls;
    this.maze = maze == undefined ? false : maze;
    this.mazeFirstPosition = new Position(1, 1, GameConstants.Direction.RIGHT);
    this.mazeForceAuto = mazeForceAuto == undefined ? false : mazeForceAuto;
    this.grid;
    this.initialGrid;
    this.fruitPos;
    this.fruitPosGold;
    this.customGrid = customGrid;
    this.seedGrid = "" + parseInt(seedGrid);
    this.seedGame = "" + parseInt(seedGame);
    this.rngGrid;
    this.rngGame;
  }

  init(customGrid) {
    if(customGrid != undefined || this.initialGrid != undefined) {
      let gridToCopy;

      if(this.initialGrid != undefined) {
        gridToCopy = this.initialGrid;
      } else {
        gridToCopy = customGrid;
      }

      this.height = gridToCopy.length;
      this.width = gridToCopy[0].length;

      this.initialGrid = new Array(this.height);
      this.grid = new Array(this.height);

      for(let i = 0; i < this.height; i++) {
        this.initialGrid[i] = gridToCopy[i].slice();
        this.grid[i] = gridToCopy[i].slice();
      }
    } else {
      this.grid = new Array(this.height);

      for(let i = 0; i < this.height; i++) {
        this.grid[i] = new Array(this.width);

        for(let j = 0; j < this.width; j++) {
          if((this.borderWalls && (i == 0 || i == this.height - 1 || j == 0 || j == this.width - 1)) || (this.generateWalls && this.rngGrid() > 0.65) || this.maze) {
            this.grid[i][j] = GameConstants.CaseType.WALL;
          } else {
            this.grid[i][j] = GameConstants.CaseType.EMPTY;
          }
        }
      }

      if(this.maze) {
        this.generateMaze();
      } else if(this.generateWalls) {
        this.fixWalls(this.borderWalls);
      }
    }

    this.fruitPosGold = null;
  }

  reset() {
    this.grid = undefined;
    this.initialGrid = undefined;
    this.fruitPos = undefined;
    this.fruitPosGold = undefined;
    this.rngGrid = new seedrandom(this.seedGrid);
    this.rngGame = new seedrandom(this.seedGame);
  }

  fixWalls(borderWalls) {
    let startY, startX, endY, endX;

    if(borderWalls) {
      startY = 1; endY = this.height - 1;
      startX = 1; endX = this.width - 1;
    } else {
      startY = 0; endY = this.height;
      startX = 0; endX = this.width;
    }

    for(let i = startY; i < endY; i++) {
      for(let j = startX; j < endX; j++) {
        const currentPos = new Position(j, i);
        const upperCase = this.getNextPosition(currentPos, GameConstants.Direction.UP);
        const upperLeftCase = this.getNextPosition(upperCase, GameConstants.Direction.LEFT);
        const upperRightCase = this.getNextPosition(upperCase, GameConstants.Direction.RIGHT);
        const downCase = this.getNextPosition(currentPos, GameConstants.Direction.BOTTOM);
        const downLeftCase = this.getNextPosition(downCase, GameConstants.Direction.LEFT);
        const downRightCase = this.getNextPosition(downCase, GameConstants.Direction.RIGHT);

        if(this.get(upperLeftCase) == GameConstants.CaseType.WALL || this.get(upperRightCase) == GameConstants.CaseType.WALL || this.get(downLeftCase) == GameConstants.CaseType.WALL || this.get(downRightCase) == GameConstants.CaseType.WALL) {
          this.set(GameConstants.CaseType.EMPTY, currentPos);
        }
      }
    }
  }

  maze_recursion(r, c) {
    const directions = GameUtils.shuffle([GameConstants.Direction.UP, GameConstants.Direction.RIGHT, GameConstants.Direction.BOTTOM, GameConstants.Direction.LEFT], this.rngGrid);

    for(let i = 0; i < directions.length; i++) {
      switch(directions[i]) {
        case GameConstants.Direction.UP:
          if(r - 2 <= 0) continue;

          if(this.get(new Position(c, r - 2)) != GameConstants.CaseType.EMPTY) {
            this.set(GameConstants.CaseType.EMPTY, new Position(c, r - 2));
            this.set(GameConstants.CaseType.EMPTY, new Position(c, r - 1));
            this.maze_recursion(r - 2, c);
          }

          break;
        case GameConstants.Direction.RIGHT:
          if(c + 2 >= this.width - 1) continue;

          if(this.get(new Position(c + 2, r)) != GameConstants.CaseType.EMPTY) {
            this.set(GameConstants.CaseType.EMPTY, new Position(c + 2, r));
            this.set(GameConstants.CaseType.EMPTY, new Position(c + 1, r));
            this.maze_recursion(r, c + 2);
          }

          break;
        case GameConstants.Direction.BOTTOM:
          if(r + 2 >= this.height - 1) continue;

          if(this.get(new Position(c, r + 2)) != GameConstants.CaseType.EMPTY) {
            this.set(GameConstants.CaseType.EMPTY, new Position(c, r + 2));
            this.set(GameConstants.CaseType.EMPTY, new Position(c, r + 1));
            this.maze_recursion(r + 2, c);
          }

          break;
        case GameConstants.Direction.LEFT:
          if(c - 2 <= 0) continue;

          if(this.get(new Position(c - 2, r)) != GameConstants.CaseType.EMPTY) {
            this.set(GameConstants.CaseType.EMPTY, new Position(c - 2, r));
            this.set(GameConstants.CaseType.EMPTY, new Position(c - 1, r));
            this.maze_recursion(r, c - 2);
          }

          break;
      }
    }
  }

  generateMaze() {
    this.mazeFirstPosition = new Position(1, 1, GameConstants.Direction.RIGHT);
    this.set(GameConstants.CaseType.EMPTY, this.mazeFirstPosition);
    this.maze_recursion(1, 1);
  }

  set(value, position) {
    this.grid[position.y][position.x] = value;
  }

  get(position) {
    return this.grid[position.y][position.x];
  }

  valToChar(value) {
    switch(value) {
      case GameConstants.CaseType.EMPTY:
        return "-";
      case GameConstants.CaseType.SNAKE:
        return "o";
      case GameConstants.CaseType.SNAKE_DEAD:
        return "O";
      case GameConstants.CaseType.FRUIT:
        return "x";
      case GameConstants.CaseType.WALL:
        return "#";
      case GameConstants.CaseType.SURROUNDED:
        return "/";
      case GameConstants.CaseType.FRUIT_GOLD:
        return "X";
    }
  }

  getImageCase(position) {
    switch(this.get(position)) {
      case GameConstants.CaseType.WALL:
        return "wall.png";
      case GameConstants.CaseType.FRUIT:
        return "fruit.png";
      case GameConstants.CaseType.FRUIT_GOLD:
        return "fruit_gold.png";
      case GameConstants.CaseType.EMPTY:
        return "";
      case GameConstants.CaseType.SNAKE:
        return "";
      case GameConstants.CaseType.SNAKE_DEAD:
        return "";
      case GameConstants.CaseType.SURROUNDED:
        return "";
      case GameConstants.CaseType.CROSSED:
        return "";
    }

    return "unknown.png";
  }

  getGraph(ignoreSnakePos) {
    const res = new Array(this.height);

    for(let i = 0; i < this.height; i++) {
      res[i] = new Array(this.width);

      for(let j = 0; j < this.width; j++) {
        const currentPos = new Position(j, i);

        if(ignoreSnakePos && this.get(currentPos) == GameConstants.CaseType.SNAKE) {
          res[i][j] = 0;
        } else if(this.isDeadPosition(currentPos)) {
          res[i][j] = 1;
        } else {
          res[i][j] = 0;
        }
      }
    }

    return res;
  }

  getRandomPosition() {
    return new Position(GameUtils.randRange(0, this.width - 1, this.rngGame), GameUtils.randRange(0, this.height - 1, this.rngGame));
  }

  setFruit(numberPlayers, gold) {
    const tried = [1];

    if(!gold && this.fruitPos != null && this.get(this.fruitPos) == GameConstants.CaseType.FRUIT) {
      this.set(GameConstants.CaseType.EMPTY, this.fruitPos);
    }

    if(this.getTotal(GameConstants.CaseType.EMPTY) > 0) {
      let randomPos, numDeadPositionArround;

      do {
        randomPos = this.getRandomPosition();

        const posTop = this.getNextPosition(randomPos, GameConstants.Direction.TOP);
        const posBottom = this.getNextPosition(randomPos, GameConstants.Direction.BOTTOM);
        const posRight = this.getNextPosition(randomPos, GameConstants.Direction.RIGHT);
        const posLeft = this.getNextPosition(randomPos, GameConstants.Direction.LEFT);
        numDeadPositionArround = this.isDeadPosition(posTop, true) + this.isDeadPosition(posBottom, true) + this.isDeadPosition(posRight, true) + this.isDeadPosition(posLeft, true);

        if(numDeadPositionArround >= 3 && this.get(randomPos) == GameConstants.CaseType.EMPTY) {
          this.set(GameConstants.CaseType.SURROUNDED, randomPos);
        }

        if(this.getTotal(GameConstants.CaseType.EMPTY) <= 0) {
          if(this.fruitPosGold) {
            return true;
          } else {
            return false;
          }
        }
      } while(this.get(randomPos) != GameConstants.CaseType.EMPTY || this.isFruitSurrounded(randomPos, true) || (this.maze && !this.testFruitMaze(randomPos, tried)) || numDeadPositionArround >= 3);

      if(gold) {
        this.fruitPosGold = randomPos;
        this.set(GameConstants.CaseType.FRUIT_GOLD, randomPos);
      } else {
        this.fruitPos = randomPos;
        this.set(GameConstants.CaseType.FRUIT, randomPos);
      }
    } else if(this.getTotal(GameConstants.CaseType.EMPTY) <= 0 && this.fruitPosGold) {
      return true;
    } else {
      return false;
    }

    if(!this.maze && this.fruitPosGold == null && GameUtils.randRange(1, numberPlayers > 1 ? GameConstants.Setting.PROB_GOLD_FRUIT_MULTIPLE_PLAYERS : GameConstants.Setting.PROB_GOLD_FRUIT_1_PLAYER, this.rngGame) == 1) {
      this.setFruit(numberPlayers, true);
    }

    return true;
  }

  testFruitMaze(position, tried) { // Maze mode: avoid putting the fruit too close to the Snake
    const grid = this.getGraph(true);
    const graph = new Lowlight.Astar.Configuration(grid, {
      order: "yx",
      torus: false,
      diagonals: false,
      cutting: false,
      cost(a, b) { return b == 1 ? null : 1 }
    });
    const path = graph.path({x: this.mazeFirstPosition.x, y: this.mazeFirstPosition.y}, {x: position.x, y: position.y});

    if(path.length < Math.ceil(this.getTotal(GameConstants.CaseType.EMPTY) / (1 * Math.ceil(tried[0] / 4)))) {
      tried[0]++;
      return false;
    } else {
      tried[0]++;
      return true;
    }
  }

  isCaseSurrounded(position, fill, foundVals, forbiddenVals) {
    if(position == null || position == undefined) {
      return false;
    }

    const gridCopy = JSON.parse(JSON.stringify(this.grid));
    const checkList = [position];

    while(checkList.length > 0) {
      const currentPosition = checkList[0];
      checkList.shift();

      const directions = [this.getNextPosition(currentPosition, GameConstants.Direction.UP), this.getNextPosition(currentPosition, GameConstants.Direction.BOTTOM), this.getNextPosition(currentPosition, GameConstants.Direction.LEFT), this.getNextPosition(currentPosition, GameConstants.Direction.RIGHT)]; // UP, DOWN, LEFT, RIGHT

      for(let i = 0; i < directions.length; i++) {
        if(gridCopy[directions[i].y][directions[i].x] != GameConstants.CaseType.CROSSED && forbiddenVals.indexOf(this.get(directions[i])) > -1) {
          checkList.push(directions[i]);

          if(foundVals.indexOf(this.get(directions[i])) > -1) {
            return false;
          }

          if(fill && this.get(directions[i]) == GameConstants.CaseType.EMPTY) {
            this.set(GameConstants.CaseType.SURROUNDED, directions[i]);
            gridCopy[directions[i].y][directions[i].x] = GameConstants.CaseType.SURROUNDED;
          } else {
            gridCopy[directions[i].y][directions[i].x] = GameConstants.CaseType.CROSSED;
          }
        }
      }
    }

    if(fill && (this.get(position) == GameConstants.CaseType.EMPTY || this.get(position) == GameConstants.CaseType.FRUIT) || this.get(position) == GameConstants.CaseType.FRUIT_GOLD) {
      this.set(GameConstants.CaseType.SURROUNDED, position);
    }

    return true;
  }

  isFruitSurrounded(position, fill) {
    const surrounded = this.isCaseSurrounded(position, false, [GameConstants.CaseType.SNAKE], [GameConstants.CaseType.EMPTY, GameConstants.CaseType.SNAKE]);

    if(surrounded && fill) {
      this.isCaseSurrounded(position, true, [GameConstants.CaseType.SNAKE], [GameConstants.CaseType.EMPTY, GameConstants.CaseType.SNAKE]);
    }

    return surrounded;
  }

  getOnLine(type, line) {
    let tot = 0;

    for(let j = 0; j < this.width; j++) {
      if(this.get(new Position(j, line)) == type) {
        tot++;
      }
    }

    return tot;
  }

  getTotal(type) {
    let tot = 0;

    for(let i = 0; i < this.height; i++) {
      tot += this.getOnLine(type, i);
    }

    return tot;
  }

  getNextPosition(oldPos, newDirection) {
    const position = new Position(oldPos.x, oldPos.y, newDirection);

    switch(newDirection) {
      case GameConstants.Direction.LEFT:
        position.x--;
        position.direction = GameConstants.Direction.LEFT;
        break;
      case GameConstants.Direction.UP:
        position.y--;
        position.direction = GameConstants.Direction.UP;
        break;
      case GameConstants.Direction.RIGHT:
        position.x++;
        position.direction = GameConstants.Direction.RIGHT;
        break;
      case GameConstants.Direction.BOTTOM:
        position.y++;
        position.direction = GameConstants.Direction.BOTTOM;
        break;
      case GameConstants.Key.LEFT:
        position.x--;
        position.direction = GameConstants.Key.LEFT;
        break;
      case GameConstants.Key.UP:
        position.y--;
        position.direction = GameConstants.Key.UP;
        break;
      case GameConstants.Key.RIGHT:
        position.x++;
        position.direction = GameConstants.Direction.RIGHT;
        break;
      case GameConstants.Key.BOTTOM:
        position.y++;
        position.direction = GameConstants.Direction.BOTTOM;
        break;
    }

    if(position.x < 0) {
      position.x = this.width - 1;
    } else if(position.x >= this.width) {
      position.x = 0;
    }

    if(position.y < 0) {
      position.y = this.height - 1;
    } else if(position.y >= this.height) {
      position.y = 0;
    }

    return position;
  }

  getDirectionTo(position, otherPosition) {
    if(this.getNextPosition(position, GameConstants.Direction.UP).equals(otherPosition)) {
      return GameConstants.Direction.UP;
    } else if(this.getNextPosition(position, GameConstants.Direction.BOTTOM).equals(otherPosition)) {
      return GameConstants.Direction.BOTTOM;
    } else if(this.getNextPosition(position, GameConstants.Direction.RIGHT).equals(otherPosition)) {
      return GameConstants.Direction.RIGHT;
    } else if(this.getNextPosition(position, GameConstants.Direction.LEFT).equals(otherPosition)) {
      return GameConstants.Direction.LEFT;
    }

    return -1;
  }

  isDeadPosition(position, excludeSnake) {
    return (!excludeSnake && this.get(position) == GameConstants.CaseType.SNAKE) || this.get(position) == GameConstants.CaseType.WALL || this.get(position) == GameConstants.CaseType.SNAKE_DEAD;
  }

  toString() {
    let res = "";

    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        res += this.valToChar(this.get(new Position(j, i))) + " ";
      }

      res += "\n";
    }

    return res;
  }
}