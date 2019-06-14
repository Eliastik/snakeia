// Constants
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
document.fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
document.onfullscreenchange = document.onfullscreenchange || document.onwebkitfullscreenchange || document.onwebkitfullscreenchange || document.MSFullscreenChange;
// Case type
EMPTY_VAL = 0;
SNAKE_VAL = 1;
FRUIT_VAL = 2;
WALL_VAL = 3;
// Player type
PLAYER_IA = "PLAYER_IA";
PLAYER_HUMAN = "PLAYER_HUMAN";
// Output prototype
OUTPUT_TEXT = "OUTPUT_TEXT";
OUTPUT_GRAPHICAL = "OUTPUT_GRAPHICAL";
// Canvas size
CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 600;
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

function Position(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
}

Position.prototype.equals = function(otherPosition) {
  return this.x == otherPosition.x && this.y == otherPosition.y;
}

function Grid(width, height, generateWalls, borderWalls) {
  this.width = width;
  this.height = height;
  this.grid;
  this.fruitPos = new Position(0, 0);

  this.init = function() {
    this.grid = new Array(this.height);

    for(i = 0; i < this.height; i++) {
      this.grid[i] = new Array(this.width);
      for(j = 0; j < this.width; j++) {
        if((borderWalls && (i == 0 || i == this.height - 1 || j == 0 || j == this.width - 1)) || (generateWalls && Math.random() > 0.90)) {
          this.grid[i][j] = WALL_VAL;
        } else {
          this.grid[i][j] = EMPTY_VAL;
        }
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

function Snake(direction, length, grid, player) {
  this.direction = direction;
  this.grid = grid;
  this.queue = [];
  this.player = player;

  this.init = function() {
    var posValidated = false;
    var startPos;

    while(!posValidated) {
      posValidated = true;
      startPos = grid.getRandomPosition();

      for(i = length - 1; i >= 0; i--) {
        var posX = startPos.x - i;

        if(posX < 0) {
          posX = this.grid.width - -posX;
        }

        if(grid.get(new Position(posX, startPos.y)) == WALL_VAL) {
          posValidated = false;
        }
      }
    }

    for(i = length - 1; i >= 0; i--) {
        var posX = startPos.x - i;

        if(posX < 0) {
          posX = this.grid.width - -posX;
        }

        this.insert(new Position(posX, startPos.y, this.direction));
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

  this.get = function(index) {
    return new Position(this.queue[index].x, this.queue[index].y, this.queue[index].direction);
  }

  this.set = function(index, position) {
    if(index >= 0 && index < this.length()) {
      this.queue[index] = position;
    }
  }

  this.getHeadPosition = function() {
    return this.get(0);
  }

  this.getTailPosition = function() {
    return this.get(this.length() - 1);
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

    var graph = new Graph(this.grid.getGraph(currentPosition));
    var start = graph.grid[currentPosition.x][currentPosition.y];
    var end = graph.grid[fruitPos.x][fruitPos.y];
    var result = astar.search(graph, start, end);

    if(result.length > 0) {
        var nextPosition = new Position(result[0].x, result[0].y);
    }

    if(result.length > 0) {
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

function Game(grid, snake, speed, outputType, appendTo) {
  this.grid = grid;
  this.snake = snake;
  this.speed = speed;
  this.outputType = outputType;
  this.score = 0;
  this.frame = 0;
  this.paused = true;
  this.gameOver = false;
  this.lastKey = -1;
  this.textarea;
  this.canvas;
  this.canvasCtx;
  this.assetsLoaded = false;
  this.appendTo = appendTo;

  this.init = function() {
    if(this.outputType == OUTPUT_TEXT) {
      this.textarea = document.createElement("textarea");
      this.textarea.style.width = this.grid.width * 16.5 + "px";
      this.textarea.style.height = this.grid.height * 19 + "px";
      this.appendTo.appendChild(this.textarea);
      this.assetsLoaded = true;
    } else if(this.outputType == OUTPUT_GRAPHICAL) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
      this.canvasCtx = this.canvas.getContext("2d");
      this.appendTo.appendChild(this.canvas);
    }

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
    if(this.paused && !this.gameOver && this.assetsLoaded) {
      this.paused = false;
      this.tick();
    }

    this.loadAssets();
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
          headSnakePos.direction = self.snake.direction;

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
            default:
              headSnakePos.x++;
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
          } else {
            if(self.grid.get(headSnakePos) == FRUIT_VAL) {
              self.score++;
              self.grid.setFruit();
            } else {
              self.snake.remove();
            }

            self.snake.insert(headSnakePos);
          }
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

  this.kill = function() {
    this.stop();

    if(this.outputType == OUTPUT_TEXT) {
      this.appendTo.removeChild(this.textarea);
    } else if(this.outputType == OUTPUT_GRAPHICAL) {
      this.appendTo.removeChild(this.canvas);
    }
  }

  this.toggleFullscreen = function() {
    var full = false;

    if(!document.fullscreenElement) {
      if(this.canvas.requestFullscreen) {
        this.canvas.requestFullscreen();
        full = true;
      } else if(this.canvas.mozRequestFullScreen) {
        this.canvas.mozRequestFullScreen();
        full = true;
      } else if(this.canvas.webkitRequestFullscreen) {
        this.canvas.webkitRequestFullscreen();
        full = true;
      } else if(this.canvas.msRequestFullscreen) {
        this.canvas.msRequestFullscreen();
        full = true;
      }
    } else {
      if(document.exitFullscreen) {
        if(this.canvas.exitFullscreen) {
          this.canvas.exitFullscreen();
          full = true;
        } else if(this.canvas.mozCancelFullScreen) {
          this.canvas.mozCancelFullScreen();
          full = true;
        } else if(this.canvas.webkitExitFullscreen) {
          this.canvas.webkitExitFullscreen();
          full = true;
        } else if(this.canvas.msExitFullscreen) {
          this.canvas.msExitFullscreen();
          full = true;
        }
      }
    }

    if(full) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      var self = this;

      document.onfullscreenchange = function(event) {
        if(!document.fullscreenElement) {
          self.canvas.width = CANVAS_WIDTH;
          self.canvas.height = CANVAS_HEIGHT;
        }
      };
    } else {
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
    }
  }

  this.loadAssets = function() {
    var assets = ["assets/images/snake_4.png", "assets/images/snake_3.png", "assets/images/snake_2.png", "assets/images/snake.png", "assets/images/body_4_end.png", "assets/images/body_3_end.png", "assets/images/body_2_end.png", "assets/images/body_end.png", "assets/images/body_2.png", "assets/images/body.png", "assets/images/wall.png", "assets/images/fruit.png", "assets/images/body_angle_1.png", "assets/images/body_angle_2.png", "assets/images/body_angle_3.png", "assets/images/body_angle_4.png"];
    var numLoaded = 0;
    var self = this;

    for(var i = 0; i < assets.length; i++) {
        var image = new Image();
        image.src = assets[i];

        image.onload = function() {
          numLoaded++;

          if(numLoaded >= assets.length) {
            if(!self.assetsLoaded) {
              self.assetsLoaded = true;
              self.start();
            }
          }
        };

        image.onerror = function() {
          numLoaded++;

          if(numLoaded >= assets.length) {
            if(!self.assetsLoaded) {
              self.assetsLoaded = true;
              self.start();
            }
          }
        };
      }
  }

  this.updateUI = function() {
    if(this.outputType == OUTPUT_TEXT) {
      this.textarea.innerHTML = this.toString();
    } else if(this.outputType == OUTPUT_GRAPHICAL) {
      var ctx = this.canvasCtx;
      var caseHeight = Math.floor((this.canvas.height - 75) / this.grid.height);
      var caseWidth = Math.floor(this.canvas.width / this.grid.width);
      caseHeight = caseHeight > caseWidth ? caseWidth : caseHeight;
      caseWidth = caseWidth > caseHeight ? caseHeight : caseWidth;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = "rgba(44, 62, 80, 0.25)";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = "#27AE60";
      ctx.fillRect(0, 0, this.canvas.width, 75);
      ctx.font = '32px sans-serif';
      ctx.fillStyle = "black";
      ctx.fillText("Score : " + this.score, 15, 50);

      if(this.assetsLoaded) {
        var totalWidth = caseWidth * this.grid.width;

        for(i = 0; i < this.grid.height; i++) {
          for(j = 0; j < this.grid.width; j++) {
            var caseX = Math.floor(j * caseWidth + ((this.canvas.width - totalWidth) / 2));
            var caseY = 75 + i * caseHeight;

            if((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
              ctx.fillStyle = "rgba(127, 140, 141, 0.75)";
            } else {
              ctx.fillStyle = "rgba(44, 62, 80, 0.75)";
            }

            ctx.fillRect(caseX, caseY, caseWidth, caseHeight);
            this.drawImage(ctx, this.getImageCase(new Position(j, i)), caseX, caseY, caseWidth, caseHeight);
          }
        }

        this.drawSnake(ctx, caseWidth, caseHeight, totalWidth);
      } else {
        this.drawText(ctx, "Chargement des ressources…", "black", 0, this.canvas.height / 2, true);
      }

      if(this.gameOver) {
        ctx.fillStyle = "rgba(44, 62, 80, 0.75)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawText(ctx, "Game Over !", "#E74C3C", 0, this.canvas.height / 2, true);
      }
    }
  }

  this.init();
}

Game.prototype.toString = function() {
  return this.grid.toString() + "\nScore : " + this.score + "\nFrames : " + this.frame + (this.gameOver ? "\nGame Over !" : "");
}

Game.prototype.getImageCase = function(position) {
  var imageRes = "";

  switch(this.grid.get(new Position(j, i))) {
      case WALL_VAL:
        imageRes = "assets/images/wall.png";
        break;
      case FRUIT_VAL:
        imageRes = "assets/images/fruit.png";
        break;
  }

  return imageRes;
}

Game.prototype.drawImage = function(ctx, imgSrc, x, y, width, height) {
  if(imgSrc != "") {
    var imageCase = new Image();
    imageCase.src = imgSrc;
    ctx.drawImage(imageCase, x, y, width, height);
  }
}

Game.prototype.drawText = function(ctx, text, color, x, y, alignCenter) {
  var precFillStyle = ctx.fillStyle;
  ctx.fillStyle = color;

  if(alignCenter) {
    ctx.fillText(text, (this.canvas.width / 2) - (ctx.measureText(text).width / 2), y);
  } else {
    ctx.fillText(text, x, y);
  }
}

Game.prototype.drawSnake = function(ctx, caseWidth, caseHeight, totalWidth) {
  for(var i = 0; i < this.snake.length(); i++) {
    var position = this.snake.get(i);
    var posX = position.x;
    var posY = position.y;
    var caseX = Math.floor(posX * caseWidth + ((this.canvas.width - totalWidth) / 2));
    var caseY = 75 + posY * caseHeight;
    var imageLoc = "";

    if(i == 0) {
      var direction = this.snake.getHeadPosition().direction;

      switch(direction) {
        case BOTTOM:
          imageLoc = "assets/images/snake.png";
          break;
        case RIGHT:
          imageLoc = "assets/images/snake_2.png";
          break;
        case UP:
          imageLoc = "assets/images/snake_3.png";
          break;
        case LEFT:
          imageLoc = "assets/images/snake_4.png";
          break;
      }
    } else if(i == this.snake.length() - 1) {
      var direction = this.snake.get(i - 1).direction;

      switch(direction) {
        case BOTTOM:
          imageLoc = "assets/images/body_end.png";
          break;
        case RIGHT:
          imageLoc = "assets/images/body_2_end.png";
          break;
        case UP:
          imageLoc = "assets/images/body_3_end.png";
          break;
        case LEFT:
          imageLoc = "assets/images/body_4_end.png";
          break;
      }
    } else {
      var prec = this.snake.get(i - 1);
      var next = this.snake.get(i + 1);

      if(prec.x < posX && next.x > posX || next.x < posX && prec.x > posX) {
        imageLoc = "assets/images/body_2.png";
      } else if(prec.x < posX && next.y > posY || next.x < posX && prec.y > posY) {
        imageLoc = "assets/images/body_angle_1.png";
      } else if(prec.y < posY && next.y > posY || next.y < posY && prec.y > posY) {
        imageLoc = "assets/images/body.png";
      } else if(prec.y < posY && next.x < posX || next.y < posY && prec.x < posX) {
        imageLoc = "assets/images/body_angle_4.png";
      } else if(prec.x > posX && next.y < posY || next.x > posX && prec.y < posY) {
        imageLoc = "assets/images/body_angle_3.png";
      } else if(prec.y > posY && next.x > posX || next.y > posY && prec.x > posX) {
        imageLoc = "assets/images/body_angle_2.png";
      } else if(prec.y == posY) {
        imageLoc = "assets/images/body_2.png";
      } else if(prec.x == posX) {
        imageLoc = "assets/images/body.png";
      }
    }

    this.drawImage(ctx, imageLoc, caseX, caseY, caseWidth, caseHeight);
  }
}

function gameTest() {
  var grid = new Grid(20, 20, false, false);
  var snake = new Snake(RIGHT, 1, grid, PLAYER_HUMAN);
  var game = new Game(grid, snake, 5, OUTPUT_GRAPHICAL, document.getElementById("gameDiv"));
  game.start();

  document.getElementById("pauseBtn").onclick = function() {
    game.pause();
  }

  document.getElementById("startBtn").onclick = function() {
    game.start();
  }

  document.getElementById("restartBtn").onclick = function() {
    game.kill();
    gameTest();
  }

  document.getElementById("fullscreenBtn").onclick = function() {
    game.toggleFullscreen();
  }
}

gameTest();
