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
function Grid(width, height, generateWalls, borderWalls, maze, customGrid) {
  this.width = width == undefined ? 20 : width;
  this.height = height == undefined ? 20 : height;
  this.generateWalls = generateWalls == undefined ? false : generateWalls;
  this.borderWalls = borderWalls == undefined ? false : borderWalls;
  this.maze = maze == undefined ? false : maze;
  this.mazeFirstPosition;
  this.grid;
  this.initialGrid;
  this.fruitPos;

  this.init(customGrid);
}

Grid.prototype.init = function(customGrid) {
    if(customGrid != undefined || this.initialGrid != undefined) {
      var gridToCopy;

      if(this.initialGrid != undefined) {
        gridToCopy = this.initialGrid;
      } else {
        gridToCopy = customGrid;
      }

      this.height = gridToCopy.length;
      this.width = gridToCopy[0].length;

      this.initialGrid = new Array(this.height);
      this.grid = new Array(this.height);

      for(var i = 0; i < this.height; i++) {
        this.initialGrid[i] = gridToCopy[i].slice();
        this.grid[i] = gridToCopy[i].slice();
      }
    } else {
      this.grid = new Array(this.height);

      for(var i = 0; i < this.height; i++) {
        this.grid[i] = new Array(this.width);

        for(var j = 0; j < this.width; j++) {
          if((this.borderWalls && (i == 0 || i == this.height - 1 || j == 0 || j == this.width - 1)) || (this.generateWalls && Math.random() > 0.65) || this.maze) {
            this.grid[i][j] = WALL_VAL;
          } else {
            this.grid[i][j] = EMPTY_VAL;
          }
        }
      }

      if(this.maze) {
        this.generateMaze();
      } else if(this.generateWalls) {
        this.fixWalls(this.borderWalls);
      }
    }
};

Grid.prototype.fixWalls = function(borderWalls) {
    if(borderWalls) {
      var startY = 1; var endY = this.height - 1;
      var startX = 1; var endX = this.width - 1;
    } else {
      var startY = 0; var endY = this.height;
      var startX = 0; var endX = this.width;
    }

    for(var i = startY; i < endY; i++) {
      for(var j = startX; j < endX; j++) {
        var currentPos = new Position(j, i);
        var upperCase = this.getNextPosition(currentPos, UP);
        var upperLeftCase = this.getNextPosition(upperCase, LEFT);
        var upperRightCase = this.getNextPosition(upperCase, RIGHT);
        var downCase = this.getNextPosition(currentPos, BOTTOM);
        var downLeftCase = this.getNextPosition(downCase, LEFT);
        var downRightCase = this.getNextPosition(downCase, RIGHT);

        if(this.get(upperLeftCase) == WALL_VAL || this.get(upperRightCase) == WALL_VAL || this.get(downLeftCase) == WALL_VAL || this.get(downRightCase) == WALL_VAL) {
          this.set(EMPTY_VAL, currentPos);
        }
      }
    }
};

Grid.prototype.maze_recursion = function(r, c) {
    var directions = shuffle([UP, RIGHT, BOTTOM, LEFT]);

    for(var i = 0; i < directions.length; i++) {
      switch(directions[i]) {
        case UP:
          if(r - 2 <= 0) continue;

          if(this.get(new Position(c, r - 2)) != EMPTY_VAL) {
            this.set(EMPTY_VAL, new Position(c, r - 2));
            this.set(EMPTY_VAL, new Position(c, r - 1));
            this.maze_recursion(r - 2, c);
          }

          break;
        case RIGHT:
          if(c + 2 >= this.width - 1) continue;

          if(this.get(new Position(c + 2, r)) != EMPTY_VAL) {
            this.set(EMPTY_VAL, new Position(c + 2, r));
            this.set(EMPTY_VAL, new Position(c + 1, r));
            this.maze_recursion(r, c + 2);
          }

          break;
        case BOTTOM:
          if(r + 2 >= this.height - 1) continue;

          if(this.get(new Position(c, r + 2)) != EMPTY_VAL) {
            this.set(EMPTY_VAL, new Position(c, r + 2));
            this.set(EMPTY_VAL, new Position(c, r + 1));
            this.maze_recursion(r + 2, c);
          }

          break;
        case LEFT:
          if(c - 2 <= 0) continue;

          if(this.get(new Position(c - 2, r)) != EMPTY_VAL) {
            this.set(EMPTY_VAL, new Position(c - 2, r));
            this.set(EMPTY_VAL, new Position(c - 1, r));
            this.maze_recursion(r, c - 2);
          }

          break;
      }
    }
};

Grid.prototype.generateMaze = function() {
    this.mazeFirstPosition = new Position(1, 1, RIGHT);
    this.set(EMPTY_VAL, this.mazeFirstPosition);
    this.maze_recursion(1, 1);
};

Grid.prototype.set = function(value, position) {
    this.grid[position.y][position.x] = value;
};

Grid.prototype.get = function(position) {
    return this.grid[position.y][position.x];
};

Grid.prototype.valToChar = function(value) {
    switch(value) {
      case EMPTY_VAL:
        return "-";
      case SNAKE_VAL:
        return "o";
      case SNAKE_DEAD_VAL:
        return "O";
      case FRUIT_VAL:
        return "x";
      case WALL_VAL:
        return "#";
      case SURROUNDED_VAL:
        return "/";
    }
};

Grid.prototype.getImageCase = function(position) {
    var imageRes = "";

    switch(this.get(position)) {
        case WALL_VAL:
          imageRes = "assets/images/wall.png";
          break;
        case FRUIT_VAL:
          imageRes = "assets/images/fruit.png";
          break;
    }

    return imageRes;
};

Grid.prototype.getGraph = function(ignoreSnakePos) {
    var res = new Array(this.height);

    for(var i = 0; i < this.height; i++) {
      res[i] = new Array(this.width);

      for(var j = 0; j < this.width; j++) {
        var currentPos = new Position(j, i);

        if(ignoreSnakePos && this.get(currentPos) == SNAKE_VAL) {
          res[i][j] = 0;
        } else if(this.isDeadPosition(currentPos)) {
          res[i][j] = 1;
        } else {
          res[i][j] = 0;
        }
      }
    }

    return res;
};

Grid.prototype.getRandomPosition = function() {
    return new Position(randRange(0, this.width - 1), randRange(0, this.height - 1));
};

Grid.prototype.setFruit = function() {
    var tried = [1];

    if(this.fruitPos != null && this.get(this.fruitPos) == FRUIT_VAL) {
      this.set(EMPTY_VAL, this.fruitPos);
    }

    if(this.getTotal(EMPTY_VAL) > 0) {
      var randomPos = this.getRandomPosition();

      while(this.get(randomPos) != EMPTY_VAL || this.isFruitSurrounded(randomPos, true) || (this.maze && !this.testFruitMaze(randomPos, tried))) {
        if(this.getTotal(EMPTY_VAL) <= 0) {
          return false;
        }

        randomPos = this.getRandomPosition();
      }

      this.fruitPos = randomPos;
      this.set(FRUIT_VAL, randomPos);
    } else {
      return false;
    }

    return true;
};

Grid.prototype.testFruitMaze = function(position, tried) { // Maze mode: avoid putting the fruit too close to the Snake
    var grid = this.getGraph(true);
    var graph = new Lowlight.Astar.Configuration(grid, {
      order: "yx",
      torus: false,
      diagonals: false,
      cutting: false,
      cost(a, b) { return b == 1 ? null : 1 }
    });
    var path = graph.path({x: this.mazeFirstPosition.x, y: this.mazeFirstPosition.y}, {x: position.x, y: position.y});

    if(path.length < Math.ceil(this.getTotal(EMPTY_VAL) / (1 * Math.ceil(tried[0] / 4)))) {
      tried[0]++;
      return false;
    } else {
      tried[0]++;
      return true;
    }
};

Grid.prototype.isCaseSurrounded = function(position, fill, foundVals, forbiddenVals) {
    if(position == null || position == undefined) {
      return false;
    }

    var fill = fill == undefined ? false : fill;

    var checkList = [position];
    var complete = [];

    while(checkList.length > 0) {
      var currentPosition = checkList[0];
      checkList.shift();

      var directions = [this.getNextPosition(currentPosition, UP), this.getNextPosition(currentPosition, BOTTOM), this.getNextPosition(currentPosition, LEFT), this.getNextPosition(currentPosition, RIGHT)]; // UP, DOWN, LEFT, RIGHT

      for(var i = 0; i < directions.length; i++) {
        var alreadyCompleted = false;

        if(directions[i].indexIn(complete) > -1 || directions[i].indexIn(checkList) > -1) {
          alreadyCompleted = true;
        }

        if(!alreadyCompleted && (forbiddenVals.indexOf(this.get(directions[i])) > -1)) {
          checkList.push(directions[i]);

          if(foundVals.indexOf(this.get(directions[i])) > -1) {
            return false;
          }

          if(fill && this.get(directions[i]) == EMPTY_VAL) {
            this.set(SURROUNDED_VAL, directions[i]);
          }
        }
      }

      complete.push(currentPosition);
    }

    if(fill && (this.get(position) == EMPTY_VAL || this.get(position) == FRUIT_VAL)) {
      this.set(SURROUNDED_VAL, position);
    }

    return true;
};

Grid.prototype.isFruitSurrounded = function(position, fill) {
    var surrounded = this.isCaseSurrounded(position, false, [SNAKE_VAL], [EMPTY_VAL, SNAKE_VAL]);

    if(surrounded && fill) {
      this.isCaseSurrounded(position, true, [SNAKE_VAL], [EMPTY_VAL, SNAKE_VAL]);
    }

    return surrounded;
};

Grid.prototype.getOnLine = function(type, line) {
    var tot = 0;

    for(var j = 0; j < this.width; j++) {
      if(this.get(new Position(j, line)) == type) {
        tot++;
      }
    }

    return tot;
};

Grid.prototype.getTotal = function(type) {
    var tot = 0;

    for(var i = 0; i < this.height; i++) {
      tot += this.getOnLine(type, i);
    }

    return tot;
};

Grid.prototype.getNextPosition = function(oldPos, newDirection) {
    var position = new Position(oldPos.x, oldPos.y, newDirection);

    switch(newDirection) {
      case LEFT:
        position.x--;
        position.direction = LEFT;
        break;
      case UP:
        position.y--;
        position.direction = UP;
        break;
      case RIGHT:
        position.x++;
        position.direction = RIGHT;
        break;
      case BOTTOM:
        position.y++;
        position.direction = BOTTOM;
        break;
      case KEY_LEFT:
        position.x--;
        position.direction = LEFT;
        break;
      case KEY_UP:
        position.y--;
        position.direction = UP;
        break;
      case KEY_RIGHT:
        position.x++;
        position.direction = RIGHT;
        break;
      case KEY_BOTTOM:
        position.y++;
        position.direction = BOTTOM;
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
};

Grid.prototype.getDirectionTo = function(position, otherPosition) {
    if(this.getNextPosition(position, UP).equals(otherPosition)) {
      return UP;
    } else if(this.getNextPosition(position, BOTTOM).equals(otherPosition)) {
      return BOTTOM;
    } else if(this.getNextPosition(position, RIGHT).equals(otherPosition)) {
      return RIGHT;
    } else if(this.getNextPosition(position, LEFT).equals(otherPosition)) {
      return LEFT;
    }

    return -1;
};

Grid.prototype.isDeadPosition = function(position) {
    return this.get(position) == SNAKE_VAL || this.get(position) == WALL_VAL || this.get(position) == SNAKE_DEAD_VAL;
};

Grid.prototype.toString = function() {
  res = "";

  for(var i = 0; i < this.height; i++) {
    for(var j = 0; j < this.width; j++) {
      res += this.valToChar(this.get(new Position(j, i))) + " ";
    }

    res += "\n";
  }

  return res;
};