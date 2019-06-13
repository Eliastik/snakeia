// Constants
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
// Case type
EMPTY_VAL = 0;
SNAKE_VAL = 1;
FRUIT_VAL = 2;
WALL_VAL = 3;
// Player type
PLAYER_IA = 0;
PLAYER_HUMAN = 1;
// Output prototype
OUTPUT_TEXT = 0;
OUTPUT_GRAPHICAL = 1;
// Directions
UP = 0;
RIGHT = 1;
BOTTOM = 2;
LEFT = 3;
// Keys
KEY_UP = 38;
KEY_RIGHT = 39;
KEY_BOTTOM = 40;
KEY_LEFT = 37;

// return an integer between min (inclusive) and max (inclusive)
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function valToChar(value) {
  switch(value) {
    case EMPTY_VAL:
      return "-";
      break;
    case SNAKE_VAL:
      return "o";
      break;
    case FRUIT_VAL:
      return "x";
      break;
    case WALL_VAL:
      return "#";
      break;
  }
}

function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.equals = function(otherPosition) {
  return this.x == otherPosition.x && this.y == otherPosition.y;
}

function Grid(width, height) {
  this.width = width || 20;
  this.height = height || 20;
  this.grid = [];
  this.fruitPos = new Position(0, 0);

  this.init = function() {
    for(i = 0; i < this.height; i++) {
      this.grid.push([]);
      for(j = 0; j < this.width; j++) {
        this.grid[i].push(EMPTY_VAL);
      }
    }
  }

  this.set = function(value, position) {
    this.grid[position.y][position.x] = value;
  }

  this.get = function(position) {
    return this.grid[position.y][position.x];
  }

  this.getGraph = function(snakePos) {
    var res = [];

    for(i = 0; i < this.height; i++) {
      res.push([]);
      for(j = 0; j < this.width; j++) {
        var currentVal = this.get(new Position(j, i));

        if(!snakePos.equals(new Position(j, i)) && (currentVal == SNAKE_VAL || currentVal == WALL_VAL)) {
          res[i].push(0);
        } else {
          res[i].push(1);
        }
      }
    }

    return res;
  }

  this.getRandomPosition = function() {
    return new Position(randRange(0, this.width - 1), randRange(0, this.height - 1));
  }

  this.setFruit = function() {
    this.set(EMPTY_VAL, this.fruitPos);

    var randomPos = this.getRandomPosition();

    while(this.get(randomPos) != EMPTY_VAL) {
      randomPos = this.getRandomPosition();
    }

    this.fruitPos = randomPos;
    this.set(FRUIT_VAL, randomPos);
  }

  this.init();
}

Grid.prototype.toString = function() {
  res = "";

  for(i = 0; i < this.height; i++) {
    for(j = 0; j < this.width; j++) {
      res += valToChar(this.get(new Position(j, i))) + " ";
    }

    res += "\n";
  }

  return res;
}

function Snake(direction, startPos, length, grid, player) {
  this.direction = direction || RIGHT;
  this.grid = grid;
  this.queue = [];
  this.player = player || PLAYER_HUMAN;

  this.init = function() {
    for(i = length; i >= 0; i--) {
        var posX = startPos.x - i;

        if(posX < 0) {
          posX = this.grid.width - -posX;
        }

        this.insert(new Position(posX, startPos.y));
    }
  }

  this.insert = function(position) {
    this.queue.unshift(position);
    this.grid.set(SNAKE_VAL, position);
  }

  this.remove = function() {
    var last = this.queue.pop();
    this.grid.set(EMPTY_VAL, last);
  }

  this.length = function() {
    return this.queue.length;
  }

  this.getHeadPosition = function() {
    return new Position(this.queue[0].x, this.queue[0].y);
  }

  this.getTailPosition = function() {
    return new Position(this.queue[this.length() - 1].x, this.queue[this.length() - 1].y);
  }

  this.moveTo = function(direction) {
    if(direction != null) {
      if(direction == KEY_LEFT && this.direction != RIGHT) {
        this.direction = LEFT;
      }

      if(direction == KEY_UP && this.direction != BOTTOM) {
        this.direction = UP;
      }

      if(direction == KEY_RIGHT && this.direction != LEFT) {
        this.direction = RIGHT;
      }

      if(direction == KEY_BOTTOM && this.direction != UP) {
        this.direction = BOTTOM;
      }
    }
  }

  this.ia = function() {
    var currentPosition = this.getHeadPosition();
    var fruitPos = new Position(this.grid.fruitPos.x, this.grid.fruitPos.y);

    var graph = new Graph(this.grid.getGraph(this.getHeadPosition()));
    var start = graph.grid[currentPosition.x][currentPosition.y];
    var end = graph.grid[fruitPos.x][fruitPos.y];
    var result = astar.search(graph, start, end, {}, true);

    if(result.length > 1) {
      var nextPosition = new Position(result[1].x, result[1].y);
      console.log(result, start, end, this.grid.getGraph(this.getHeadPosition()));

      if(nextPosition.x > currentPosition.x) {
        return KEY_RIGHT;
      } else if(nextPosition.x < currentPosition.x) {
        return KEY_LEFT;
      } else if(nextPosition.y < currentPosition.y) {
        return KEY_UP;
      } else if(nextPosition.y > currentPosition.y) {
        return KEY_BOTTOM;
      }
    }
  }

  this.init();
}

function Game(grid, snake, speed, outputType) {
  this.grid = grid || new Grid(20, 20);
  this.snake = snake || new Snake(RIGHT, grid.getRandomPosition(), 3, grid, PLAYER_HUMAN);
  this.speed = speed || 5;
  this.outputType = outputType || OUTPUT_TEXT;
  this.score = 0;
  this.frame = 0;
  this.paused = true;
  this.gameOver = false;
  this.lastKey = -1;

  this.init = function() {
    this.grid.setFruit();
    this.updateUI();

    // keyboard events
    var self = this;

    document.addEventListener("keydown", function(evt) {
      if(!self.paused) {
        self.lastKey = evt.keyCode;
      }
    });
  }

  this.start = function() {
    if(this.paused && !this.gameOver) {
      this.paused = false;
      this.tick();
    }
  }

  this.tick = function() {
    this.updateUI();
    var self = this;

    window.requestAnimationFrame(function() {
      if(!self.paused) {
        self.frame++;

        if(self.snake.player == PLAYER_HUMAN) {
          self.snake.moveTo(self.lastKey);
        } else if(self.snake.player == PLAYER_IA) {
          self.snake.moveTo(self.snake.ia());
        }

        if(self.frame % self.speed == 0) {
          var headSnakePos = self.snake.getHeadPosition();

          switch(self.snake.direction) {
            case LEFT:
              headSnakePos.x--;
              break;
            case UP:
              headSnakePos.y--;
              break;
            case RIGHT:
              headSnakePos.x++;
              break;
            case BOTTOM:
              headSnakePos.y++;
              break;
          }

          if(headSnakePos.x < 0) {
            headSnakePos.x = self.grid.width - 1;
          } else if(headSnakePos.x >= self.grid.width) {
            headSnakePos.x = 0;
          }

          if(headSnakePos.y < 0) {
            headSnakePos.y = self.grid.height - 1;
          } else if(headSnakePos.y >= self.grid.height) {
            headSnakePos.y = 0;
          }

          if(self.grid.get(headSnakePos) == SNAKE_VAL || self.grid.get(headSnakePos) == WALL_VAL) {
            self.stop();
            alert("Perdu !");
          }

          if(self.grid.get(headSnakePos) == FRUIT_VAL) {
            self.score++;
            self.grid.setFruit();
          } else {
            self.snake.remove();
          }

          self.snake.insert(headSnakePos);
        }

        self.tick();
      }
    });
  }

  this.stop = function() {
    this.paused = true;
    this.gameOver = true;
  }

  this.pause = function() {
      this.paused = true;
  }

  this.updateUI = function() {
    if(this.outputType == OUTPUT_TEXT) {
      document.getElementById("test").innerHTML = this.toString();
    }
  }

  this.init();
}

Game.prototype.toString = function() {
  return this.grid.toString() + "\nScore : " + this.score + "\nFrames : " + this.frame;
}

function gameTest() {
  var grid = new Grid(20, 20);
  var snake = new Snake(RIGHT, grid.getRandomPosition(), 2, grid, PLAYER_HUMAN);
  var game = new Game(grid, snake, 8, OUTPUT_TEXT);
  game.start();

  document.getElementById("pauseBtn").onclick = function() {
    game.pause();
  }

  document.getElementById("startBtn").onclick = function() {
    game.start();
  }

  document.getElementById("restartBtn").onclick = function() {
    game.stop();
    gameTest();
  }
}

gameTest();
