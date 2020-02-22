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
if(typeof(require) !== "undefined") {
  var i18next = require("../libs/i18next.min");
  var GameUtils = require("./gameUtils");
  var GameConstants = require("./constants");
  var Position = require("./position");
  var ImageLoader = require('./imageLoader');
  var Buttons = require('./button');
  var Button = Buttons.Button;
  var ButtonImage = Buttons.ButtonImage;
  var NotificationMessage = require('./notificationMessage');
}

function GameUI(controller, appendTo, canvasWidth, canvasHeight, displayFPS, outputType, disableAnimation) {
  // Assets loader
  this.imageLoader;
  this.assetsLoaded = false;
  // Game settings
  this.controller = controller;
  this.appendTo = appendTo;
  this.displayFPS = displayFPS == undefined ? false : displayFPS;
  this.outputType = outputType == undefined ? GameConstants.OutputType.GRAPHICAL : outputType;
  this.disableAnimation = disableAnimation == undefined ? false : disableAnimation;
  // UI variables
  this.lastKey = -1;
  this.frame = 0;
  this.lastFrame = 0;
  this.offsetFrame = 0;
  this.lastFrameTime = 0;
  this.currentFPS = 0;
  // Copy of engine variables
  this.grid = null;
  this.snakes = null;
  this.speed = 8;
  this.initialSpeed = 8;
  this.ticks = 0;
  this.countBeforePlay = 3;
  this.numFruit = 0;
  this.paused = true;
  this.exited = false;
  this.killed = false;
  this.isReseted = true;
  this.gameOver = false;
  this.gameFinished = false;
  this.gameMazeWin = false;
  this.scoreMax = false;
  this.enablePause = false;
  this.enableRetry = false;
  this.progressiveSpeed = false;
  // Game state variables
  this.errorOccurred = false;
  this.fullscreen = false;
  // Menus state variables
  this.lastKeyMenu = -1;
  this.selectedButton = 0;
  this.confirmReset = false;
  this.confirmExit = false;
  this.getInfos = false;
  this.getInfosGame = false;
  this.timeoutAutoRetry = null;
  // DOM elements and others settings
  this.textarea;
  this.canvas;
  this.canvasCtx;
  this.canvasWidth = canvasWidth == undefined ? GameConstants.Setting.CANVAS_WIDTH : canvasWidth;
  this.canvasHeight = canvasHeight == undefined ? GameConstants.Setting.CANVAS_HEIGHT : canvasHeight;
  this.fontSize = GameConstants.Setting.FONT_SIZE;
  this.headerHeight = GameConstants.Setting.HEADER_HEIGHT_DEFAULT;
  this.timerToDisplay;
  this.bestScoreToDisplay;
  this.preRenderedFont;
  // Intervals, timeouts, frames
  this.intervalCountFPS;
  // Buttons
  this.btnFullScreen;
  this.btnPause;
  this.btnContinue;
  this.btnRetry;
  this.btnQuit;
  this.btnYes;
  this.btnNo;
  this.btnOK;
  this.btnAbout;
  this.btnInfosGame;
  this.btnTopArrow;
  this.btnRightArrow;
  this.btnLeftArrow;
  this.btnBottomArrow;
  this.btnExitFullScreen;
  this.btnEnterFullScreen;
  // Notification
  this.notificationMessage;

  this.init();
}

GameUI.prototype.init = function() {
  var self = this;

  this.imageLoader = new ImageLoader();

  if(this.outputType == GameConstants.OutputType.TEXT) {
    this.textarea = document.createElement("textarea");
    this.appendTo.appendChild(this.textarea);
    this.assetsLoaded = true;
  } else if(this.outputType == GameConstants.OutputType.GRAPHICAL) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.canvasCtx = this.canvas.getContext("2d");
    this.appendTo.appendChild(this.canvas);
    this.btnFullScreen = new ButtonImage("assets/images/fullscreen.png", null, 5, "right", null, 64, 64);
    this.btnPause = new ButtonImage("assets/images/pause.png", null, 5, null, null, 64, 64);
    this.btnContinue = new Button(i18next.t("engine.continue"), null, null, "center", "#3498db", "#246A99");
    this.btnRetry = new Button(i18next.t("engine.reset"), null, null, "center", "#3498db", "#246A99");
    this.btnQuit = new Button(i18next.t("engine.exit"), null, null, "center", "#3498db", "#246A99");
    this.btnYes = new Button(i18next.t("engine.yes"), null, null, "center", "#3498db", "#246A99");
    this.btnNo = new Button(i18next.t("engine.no"), null, null, "center", "#3498db", "#246A99");
    this.btnOK = new Button(i18next.t("engine.ok"), null, null, "center", "#3498db", "#246A99");
    this.btnAbout = new Button(i18next.t("engine.about"), null, null, "center", "#3498db", "#246A99");
    this.btnInfosGame = new Button(i18next.t("engine.infosGame"), null, null, "center", "#3498db", "#246A99");
    this.btnTopArrow = new ButtonImage("assets/images/up.png", 64, 92, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnRightArrow = new ButtonImage("assets/images/right.png", 0, 46, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnLeftArrow = new ButtonImage("assets/images/left.png", 128, 46, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnBottomArrow = new ButtonImage("assets/images/bottom.png", 64, 0, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnExitFullScreen = new Button(i18next.t("engine.exitFullScreen"), null, null, "center", "#3498db", "#246A99");
    this.btnEnterFullScreen = new Button(i18next.t("engine.enterFullScreen"), null, null, "center", "#3498db", "#246A99");

    this.btnFullScreen.addClickAction(this.canvas, function() {
      self.toggleFullscreen();
      self.pause();
    });

    this.btnPause.addClickAction(this.canvas, function() {
      self.pause();
    });

    this.btnTopArrow.addClickAction(this.canvas, function() {
      self.controller.key(GameConstants.Key.UP);
    });

    this.btnBottomArrow.addClickAction(this.canvas, function() {
      self.controller.key(GameConstants.Key.BOTTOM);
    });

    this.btnLeftArrow.addClickAction(this.canvas, function() {
      self.controller.key(GameConstants.Key.LEFT);
    });

    this.btnRightArrow.addClickAction(this.canvas, function() {
      self.controller.key(GameConstants.Key.RIGHT);
    });
  }
  
  this.setIntervalCountFPS();

  document.addEventListener("keydown", function(evt) {
    if(!self.killed) {
      var keyCode = evt.keyCode;
  
      if(keyCode == 90 || keyCode == 87) keyCode = GameConstants.Key.UP; // W or Z
      if(keyCode == 65 || keyCode == 81) keyCode = GameConstants.Key.LEFT; // A or Q
      if(keyCode == 83) keyCode = GameConstants.Key.BOTTOM; // S
      if(keyCode == 68) keyCode = GameConstants.Key.RIGHT; // D
  
      if(!self.paused) {
        if(keyCode == GameConstants.Key.ENTER) {
          self.pause();
        } else {
          self.controller.key(keyCode);
        }
      } else if(self.countBeforePlay < 0) {
        self.lastKeyMenu = keyCode;
      }
    
      evt.preventDefault();
    }
  });

  window.addEventListener("resize", function() {
    self.autoResizeCanvas();
  }, true);

  this.autoResizeCanvas();
  this.loadAssets();
  this.startDraw();
};

GameUI.prototype.autoResizeCanvas = function() {
  if(this.outputType == GameConstants.OutputType.GRAPHICAL && !this.killed) {
    if(!document.fullscreenElement) {
      if(this.canvasWidth >= document.documentElement.clientWidth * 0.85) {
        var ratio = this.canvasWidth / this.canvasHeight;
        this.canvas.width = document.documentElement.clientWidth * 0.85;
        this.canvas.height = this.canvas.width / ratio;
      } else {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
      }
    } else if(document.fullscreenElement == this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
};

GameUI.prototype.setIntervalCountFPS = function() {
  var self = this;

  this.clearIntervalCountFPS();

  this.intervalCountFPS = window.setInterval(function() {
    self.countFPS();
  }, 1000);
};

GameUI.prototype.countFPS = function() {
  if(this.lastFrame > 0) this.currentFPS = this.frame - this.lastFrame;
  this.lastFrame = this.frame;
};

GameUI.prototype.clearIntervalCountFPS = function() {
  clearInterval(this.intervalCountFPS);
};

GameUI.prototype.getNBPlayer = function(type) {
  return this.controller.getNBPlayer(type);
};

GameUI.prototype.getPlayer = function(num, type) {
  return this.controller.getPlayer(num, type);
};

GameUI.prototype.reset = function() {
  this.controller.reset();
};

GameUI.prototype.start = function() {
  this.controller.start();
};

GameUI.prototype.stop = function() {
  this.controller.stop();
};

GameUI.prototype.pause = function() {
  this.controller.pause();
};

GameUI.prototype.kill = function() {
  this.controller.kill();
};

GameUI.prototype.exit = function() {
  this.controller.exit();
};

GameUI.prototype.tick = function() {
  this.controller.tick();
};

GameUI.prototype.setKill = function() {
  this.killed = true;
  this.clearIntervalCountFPS();

  this.grid = null;
  this.snakes = null;
  this.preRenderedFont = null;

  if(this.appendTo != null) {
    if(this.outputType == GameConstants.OutputType.TEXT && this.textarea != null) {
      this.appendTo.removeChild(this.textarea);
      this.textarea = null;
    } else if(this.outputType == GameConstants.OutputType.GRAPHICAL && this.canvas != null) {
      this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.appendTo.removeChild(this.canvas);
      this.canvas = null;
      this.canvasCtx = null;
      this.imageLoader.clear();
    }
  }
};

GameUI.prototype.toggleFullscreen = function() {
  var self = this;

  if(this.outputType == GameConstants.OutputType.GRAPHICAL && !this.killed) {
    if(!document.fullscreenElement) {
      if(this.canvas.requestFullscreen) {
        this.canvas.requestFullscreen();
      } else if(this.canvas.mozRequestFullScreen) {
        this.canvas.mozRequestFullScreen();
      } else if(this.canvas.webkitRequestFullscreen) {
        this.canvas.webkitRequestFullscreen();
      } else if(this.canvas.msRequestFullscreen) {
        this.canvas.msRequestFullscreen();
      } else if(this.canvas.oRequestFullscreen) {
        this.canvas.oRequestFullscreen();
      }
    } else {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    var onfullscreenchange = function() {
      if(self.outputType == GameConstants.OutputType.GRAPHICAL && !self.killed) {
        if(document.fullscreenElement == self.canvas) {
          self.fullscreen = true;
        } else {
          self.fullscreen = false;
        }

        self.autoResizeCanvas();

        if(document.fullscreenElement == self.canvas && typeof(screen.orientation) !== "undefined" && typeof(screen.orientation.lock) !== "undefined") {
          screen.orientation.lock("landscape").catch(function() {});
        }
      }
    };

    if(typeof(document.onfullscreenchange) !== "undefined") {
      document.onfullscreenchange = onfullscreenchange;
    } else if(typeof(document.onmsfullscreenchange) !== "undefined") {
      document.onmsfullscreenchange = onfullscreenchange;
    } else if(typeof(document.onmozfullscreenchange) !== "undefined") {
      document.onmozfullscreenchange = onfullscreenchange;
    } else if(typeof(document.onwebkitfullscreenchange) !== "undefined") {
      document.onwebkitfullscreenchange = onfullscreenchange;
    } else if(typeof(document.onokitfullscreenchange) !== "undefined") {
      document.onofullscreenchange = onfullscreenchange;
    }

    onfullscreenchange();
  }
};

GameUI.prototype.loadAssets = function() {
  var self = this;

  if(!this.errorOccurred && this.outputType != GameConstants.OutputType.TEXT) {
    this.imageLoader.load(["assets/images/snake_4.png", "assets/images/snake_3.png", "assets/images/snake_2.png", "assets/images/snake.png", "assets/images/body_4_end.png", "assets/images/body_3_end.png", "assets/images/body_2_end.png", "assets/images/body_end.png", "assets/images/body_2.png", "assets/images/body.png", "assets/images/wall.png", "assets/images/fruit.png", "assets/images/body_angle_1.png", "assets/images/body_angle_2.png", "assets/images/body_angle_3.png", "assets/images/body_angle_4.png", "assets/images/pause.png", "assets/images/fullscreen.png", "assets/images/snake_dead_4.png", "assets/images/snake_dead_3.png", "assets/images/snake_dead_2.png", "assets/images/snake_dead.png", "assets/images/up.png", "assets/images/left.png", "assets/images/right.png", "assets/images/bottom.png", "assets/images/close.png", "assets/images/trophy.png", "assets/images/clock.png"], function() {
      if(self.imageLoader.hasError == true) {
        self.errorOccurred = true;
      } else {
        self.assetsLoaded = true;
        self.btnFullScreen.loadImage(self.imageLoader);
        self.btnPause.loadImage(self.imageLoader);
        self.btnTopArrow.loadImage(self.imageLoader);
        self.btnBottomArrow.loadImage(self.imageLoader);
        self.btnLeftArrow.loadImage(self.imageLoader);
        self.btnRightArrow.loadImage(self.imageLoader);
        self.start();
      }
    }, this);
  } else if(!this.errorOccurred && this.outputType == GameConstants.OutputType.TEXT) {
    this.assetsLoaded = true;
    this.start();
  }
};

GameUI.prototype.startDraw = function(renderBlur) {
  var self = this;

  requestAnimationFrame(function() {
    if(!self.killed) {
      if(!document.hasFocus() && !self.paused) {
        self.controller.pause();
      }
  
      self.draw(renderBlur);
      self.frame++;

      if(!self.paused) {
        self.offsetFrame += (Date.now() - self.lastFrameTime);
        self.lastFrameTime = Date.now();
      }

      self.startDraw();
    }
  });
}

GameUI.prototype.draw = function(renderBlur) {
  var self = this;
  
  if(this.outputType == GameConstants.OutputType.TEXT && !this.killed) {
    if(this.grid != null) {
      this.textarea.style.width = this.grid.width * 16.5 + "px";
      this.textarea.style.height = this.grid.height * 16 + 100 + "px";
    }

    this.textarea.innerHTML = this.toString();
  } else if(this.outputType == GameConstants.OutputType.GRAPHICAL && !this.killed) {
    var ctx = this.canvasCtx;
    var displayBestScore = false;
    var renderBlur = renderBlur == undefined ? false : renderBlur;
    this.fontSize = GameConstants.Setting.FONT_SIZE;
    this.headerHeight = GameConstants.Setting.HEADER_HEIGHT_DEFAULT;

    if(this.canvas.width <= GameConstants.Setting.CANVAS_WIDTH / 1.25) {
      this.fontSize /= 1.25;
      this.headerHeight = GameConstants.Setting.HEADER_HEIGHT_DEFAULT / 1.25;
    } else if(this.canvas.width >= GameConstants.Setting.CANVAS_WIDTH * 1.5) {
      this.fontSize *= 1.25;
      this.headerHeight = GameConstants.Setting.HEADER_HEIGHT_DEFAULT * 1.25;
    }

    this.btnPause.width = this.headerHeight * 0.85;
    this.btnPause.height = this.btnPause.width;
    this.btnPause.y = (this.headerHeight / 2) - (this.btnPause.height / 2);
    this.btnFullScreen.width = this.headerHeight * 0.85;
    this.btnFullScreen.height = this.btnFullScreen.width;
    this.btnFullScreen.y = (this.headerHeight / 2) - (this.btnFullScreen.height / 2);

    if(renderBlur) {
      ctx.filter = "blur(5px)";
    }

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(204, 207, 211, 1)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#27AE60";
    ctx.fillRect(0, 0, this.canvas.width, this.headerHeight);
    ctx.font = this.fontSize + "px " + GameConstants.Setting.FONT_FAMILY;
    ctx.fillStyle = "black";

    this.btnFullScreen.draw(this);

    if(this.enablePause) {
      this.btnPause.x = this.btnFullScreen.x - this.btnPause.width - 10;
      this.btnPause.draw(this);
    }

    if(this.assetsLoaded && !this.errorOccurred) {

      if(this.bestScoreToDisplay != undefined && this.bestScoreToDisplay != null) {
        displayBestScore = true;
      }

      this.drawImage(ctx, "assets/images/fruit.png", 5, 5, this.headerHeight * 0.85 * (displayBestScore ? 0.5 : 1), this.headerHeight * 0.85 * (displayBestScore ? 0.5 : 1));

      if(this.snakes != null && this.snakes.length <= 1) {
        this.drawText(ctx, "× " + this.snakes[0].score, "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
      } else {
        this.drawText(ctx, i18next.t("engine.num") + (this.numFruit != null ? this.numFruit : "???"), "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
      }

      if(displayBestScore) {
        this.drawImage(ctx, "assets/images/trophy.png", 5, 8 + this.headerHeight * 0.425, this.headerHeight * 0.425, this.headerHeight * 0.425);
        this.drawText(ctx, this.bestScoreToDisplay, "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.425 + this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
      }

      if(this.grid != null && (!this.grid.maze || (this.grid.maze && (!this.paused || this.gameOver || this.gameFinished)))) {
        var caseHeight = Math.floor((this.canvas.height - this.headerHeight) / this.grid.height);
        var caseWidth = Math.floor(this.canvas.width / this.grid.width);
        caseHeight = caseHeight > caseWidth ? caseWidth : caseHeight;
        caseWidth = caseWidth > caseHeight ? caseHeight : caseWidth;

        var totalWidth = caseWidth * this.grid.width;

        for(var i = 0; i < this.grid.height; i++) {
          for(var j = 0; j < this.grid.width; j++) {
            var caseX = Math.floor(j * caseWidth + ((this.canvas.width - totalWidth) / 2));
            var caseY = this.headerHeight + i * caseHeight;

            if((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
              ctx.fillStyle = "rgba(127, 140, 141, 0.75)";
            } else {
              ctx.fillStyle = "rgba(44, 62, 80, 0.75)";
            }

            ctx.fillRect(caseX, caseY, caseWidth, caseHeight);
            this.drawImage(ctx, this.grid.getImageCase(new Position(j, i)), caseX, caseY, caseWidth, caseHeight);
          }
        }

        this.drawSnake(ctx, caseWidth, caseHeight, totalWidth, renderBlur);
      }

      if(this.timerToDisplay != undefined && this.timerToDisplay != null && this.timerToDisplay >= 0) {
        this.drawImage(ctx, "assets/images/clock.png", this.headerHeight * 0.24, this.headerHeight + 15, this.headerHeight * 0.64, this.headerHeight * 0.64);
        this.drawText(ctx, "" + this.timerToDisplay, "rgba(0, 0, 0, 0.5)", GameConstants.Setting.FONT_SIZE, GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight, this.headerHeight + 15 + this.headerHeight * 0.475);
      }
    } else if(!this.assetsLoaded && !renderBlur) {
      var percentLoaded = Math.floor((100 * Object.keys(this.imageLoader.images).length) / this.imageLoader.nbImagesToLoad);
      this.drawMenu(ctx, [], i18next.t("engine.loading") + "\n" + percentLoaded + "%", "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, true);
    }

    if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && !this.notificationMessage.foreGround) {
      this.notificationMessage.draw(this);
    }

    if(this.snakes != null) {
      for(var i = 0; i < this.snakes.length; i++) {
        if(this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
          this.btnTopArrow.draw(this);
          this.btnBottomArrow.draw(this);
          this.btnRightArrow.draw(this);
          this.btnLeftArrow.draw(this);
          break;
        }
      }
    }

    this.disableAllButtons();

    if(!renderBlur) {
      if(this.exited) {
        this.drawMenu(ctx, this.fullscreen ? [this.btnExitFullScreen] : [], i18next.t("engine.exited"), "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, true, function() {
          self.btnExitFullScreen.addClickAction(self.canvas, function() {
            self.toggleFullscreen();
          });
        });
      } else if(this.errorOccurred) {
       this.drawMenu(ctx, [this.btnQuit], this.imageLoader.hasError ? i18next.t("engine.errorLoading") : i18next.t("engine.error"), "red", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, true, function() {
         self.btnQuit.addClickAction(self.canvas, function() {
           self.confirmExit = false;
           self.selectedButton = 0;
           self.exit();
         });
       });
     } else if(this.getInfosGame) {
        this.drawMenu(ctx, [this.btnOK], (this.snakes != null && this.snakes.length <= 1 ? i18next.t("engine.player") + " " + (((this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HUMAN) || (this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HYBRID_HUMAN_AI)) ? i18next.t("engine.playerHuman") : i18next.t("engine.playerAI")) : "") + (this.getNBPlayer(GameConstants.PlayerType.AI) > 0 ? "\n" +  i18next.t("engine.aiLevel") + " " + this.getPlayer(1, GameConstants.PlayerType.AI).getAILevelText() : "") + "\n" + i18next.t("engine.sizeGrid") + " " + (this.grid != null && this.grid.width ? this.grid.width : "???") + "×" + (this.grid != null && this.grid.height ? this.grid.height : "???") + "\n" + i18next.t("engine.currentSpeed") + " " + (this.initialSpeed != null ? this.initialSpeed : "???") + (this.snakes != null && this.snakes.length <= 1 && this.progressiveSpeed ? "\n" + i18next.t("engine.progressiveSpeed") : "") + (this.grid != null && !this.grid.maze && this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HYBRID_HUMAN_AI ? "\n" + i18next.t("engine.assistAI") : "") + (this.grid != null && this.grid.maze ? "\n" + i18next.t("engine.mazeModeMin") : ""), "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
          self.btnOK.addClickAction(self.canvas, function() {
            self.getInfosGame = false;
            self.selectedButton = 0;
          });
        });
      }  else if(this.getInfos) {
        this.drawMenu(ctx, [this.btnInfosGame, this.btnOK], i18next.t("engine.aboutScreen.title") + "\nwww.eliastiksofts.com\n\n" + i18next.t("engine.aboutScreen.versionAndDate", { version: GameConstants.Setting.APP_VERSION, date: new Intl.DateTimeFormat(i18next.language).format(new Date(GameConstants.Setting.DATE_VERSION)), interpolation: { escapeValue: false } }), "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
          self.btnInfosGame.addClickAction(self.canvas, function() {
            self.getInfosGame = true;
            self.selectedButton = 0;
          });

          self.btnOK.addClickAction(self.canvas, function() {
            self.getInfos = false;
            self.selectedButton = 0;
          });
        });
      } else if(this.confirmExit) {
        this.drawMenu(ctx, [this.btnNo, this.btnYes], i18next.t("engine.exitConfirm"), "#E74C3C", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, true, function() {
          self.btnYes.addClickAction(self.canvas, function() {
            self.confirmExit = false;
            self.selectedButton = 0;
            self.exit();
          });

          self.btnNo.addClickAction(self.canvas, function() {
            self.confirmExit = false;
            self.selectedButton = 0;
          });
        });
      } else if(this.assetsLoaded && this.countBeforePlay >= 0) {
        if(this.snakes != null && ((this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HUMAN) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) || (this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI) != null))) {
          if(this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) {
            var playerHuman = this.getPlayer(1, GameConstants.PlayerType.HUMAN);
          } else {
            var playerHuman = this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI);
          }

          var colorName = GameUtils.hslToName(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color), GameConstants.Setting.IMAGE_SNAKE_SATURATION, GameConstants.Setting.IMAGE_SNAKE_VALUE);
          var colorRgb = GameUtils.hsvToRgb(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color) / 360, GameConstants.Setting.IMAGE_SNAKE_SATURATION / 100, GameConstants.Setting.IMAGE_SNAKE_VALUE / 100);

          if(this.countBeforePlay > 0) {
            this.drawMenu(ctx, !this.fullscreen ? [this.btnEnterFullScreen] : [], "" + this.countBeforePlay + "\n" + (GameUtils.isFilterHueAvailable() ? i18next.t("engine.colorPlayer", { color: colorName }) : i18next.t("engine.arrowPlayer")), (GameUtils.isFilterHueAvailable() ? ["white", "rgb(" + colorRgb[0] + ", " + colorRgb[1] + ", " + colorRgb[2] + ")"] : ["white", "#3498db"]), this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
              self.btnEnterFullScreen.addClickAction(self.canvas, function() {
                self.toggleFullscreen();
              });
            });
          } else {
            this.drawMenu(ctx, !this.fullscreen ? [this.btnEnterFullScreen] : [], i18next.t("engine.ready") + "\n" + (GameUtils.isFilterHueAvailable() ? i18next.t("engine.colorPlayer", { color: colorName }) : i18next.t("engine.arrowPlayer")), (GameUtils.isFilterHueAvailable() ? ["white", "rgb(" + colorRgb[0] + ", " + colorRgb[1] + ", " + colorRgb[2] + ")"] : ["white", "#3498db"]), this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
              self.btnEnterFullScreen.addClickAction(self.canvas, function() {
                self.toggleFullscreen();
              });
            }, true);
          }
        } else {
          if(this.countBeforePlay > 0) {
            this.drawMenu(ctx, !this.fullscreen ? [this.btnEnterFullScreen] : [], "" + this.countBeforePlay, "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
              self.btnEnterFullScreen.addClickAction(self.canvas, function() {
                self.toggleFullscreen();
              });
            });
          } else {
            this.drawMenu(ctx, !this.fullscreen ? [this.btnEnterFullScreen] : [], i18next.t("engine.ready"), "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
              self.btnEnterFullScreen.addClickAction(self.canvas, function() {
                self.toggleFullscreen();
              });
            }, true);
          }
        }
      } else if(this.confirmReset && !this.gameOver) {
        this.drawMenu(ctx, [this.btnNo, this.btnYes], i18next.t("engine.resetConfirm"), "#E74C3C", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, true, function() {
          self.btnYes.addClickAction(self.canvas, function() {
            self.confirmReset = false;
            self.selectedButton = 0;
            self.reset();
          });

          self.btnNo.addClickAction(self.canvas, function() {
            self.confirmReset = false;
            self.selectedButton = 0;
          });
        });
      } else if(this.gameFinished) {
        this.drawMenu(ctx, this.enableRetry ? [this.btnRetry, this.btnQuit] : [this.btnQuit], (this.grid.maze && this.gameMazeWin) ? i18next.t("engine.mazeWin") : i18next.t("engine.gameFinished"), (this.grid.maze && this.gameMazeWin) ? "#2ecc71" : "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, true, function() {
          self.btnRetry.addClickAction(self.canvas, function() {
            self.selectedButton = 0;
            self.reset();
          });

          self.btnQuit.addClickAction(self.canvas, function() {
            self.confirmExit = true;
            self.selectedButton = 0;
          });
        });
      } else if(this.scoreMax && this.snakes.length <= 1) {
        this.drawMenu(ctx, this.enableRetry ? [this.btnRetry, this.btnQuit] : (this.fullscreen ? [this.btnExitFullScreen] : []), i18next.t("engine.scoreMax"), "#2ecc71", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, true, function() {
          self.btnRetry.addClickAction(self.canvas, function() {
            self.selectedButton = 0;
            self.reset();
          });

          self.btnQuit.addClickAction(self.canvas, function() {
            self.confirmExit = true;
            self.selectedButton = 0;
          });

          self.btnExitFullScreen.addClickAction(self.canvas, function() {
            self.toggleFullscreen();
          });
        });
      } else if(this.gameOver && this.snakes.length <= 1) {
        this.drawMenu(ctx, this.enableRetry && !this.snakes[0].autoRetry ? [this.btnRetry, this.btnQuit] : (this.fullscreen ? [this.btnExitFullScreen] : []), i18next.t("engine.gameOver"), "#E74C3C", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
          if(self.snakes[0].autoRetry && self.timeoutAutoRetry == null) {
            self.timeoutAutoRetry = setTimeout(function() {
              self.selectedButton = 0;
              self.reset();
              self.timeoutAutoRetry = null;
            }, 500);
          } else {
            self.btnRetry.addClickAction(self.canvas, function() {
              self.selectedButton = 0;
              self.reset();
            });

            self.btnQuit.addClickAction(self.canvas, function() {
              self.confirmExit = true;
              self.selectedButton = 0;
            });

            self.btnExitFullScreen.addClickAction(self.canvas, function() {
              self.toggleFullscreen();
            });
          }
        });
      } else if(this.paused && !this.gameOver && this.assetsLoaded) {
        this.drawMenu(ctx, this.enablePause ? (this.enableRetry ? [this.btnContinue, this.btnRetry, this.btnAbout, this.btnQuit] : [this.btnContinue, this.btnAbout, this.btnQuit]) : [this.btnContinue, this.btnAbout], i18next.t("engine.pause"), "white", this.fontSize, GameConstants.Setting.FONT_FAMILY, "center", null, false, function() {
          self.btnContinue.addClickAction(self.canvas, function() {
            self.selectedButton = 0;
            self.start();
          });

          self.btnRetry.addClickAction(self.canvas, function() {
            self.confirmReset = true;
            self.selectedButton = 0;
          });

          self.btnQuit.addClickAction(self.canvas, function() {
            self.confirmExit = true;
            self.selectedButton = 0;
          });

          self.btnAbout.addClickAction(self.canvas, function() {
            self.getInfos = true;
            self.selectedButton = 0;
          });
        });
      } else if(this.assetsLoaded) {
        this.btnFullScreen.enable();

        if(this.snakes != null) {
          for(var i = 0; i < this.snakes.length; i++) {
            if(this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
              this.btnTopArrow.enable();
              this.btnBottomArrow.enable();
              this.btnLeftArrow.enable();
              this.btnRightArrow.enable();
              break;
            }
          }
        }

        if(this.enablePause) {
          this.btnPause.enable();
        }

        if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && !this.notificationMessage.foreGround) {
          this.notificationMessage.enableCloseButton();
        }

        if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && this.notificationMessage.foreGround) {
          this.notificationMessage.draw(this);
        }
      }
    }

    if(this.displayFPS) {
      this.drawText(ctx, this.getDebugText(), "rgba(255, 255, 255, 0.5)", this.fontSize / 1.5, GameConstants.Setting.FONT_FAMILY, "right", "bottom", null, null, true);
    }

    if(renderBlur) {
      ctx.filter = "none";
    }
  }
};

GameUI.prototype.setDisplayFPS = function(display) {
  this.displayFPS = display;
};

GameUI.prototype.disableAllButtons = function() {
  if(this.outputType == GameConstants.OutputType.GRAPHICAL) {
    this.btnContinue.disable();
    this.btnRetry.disable();
    this.btnQuit.disable();
    this.btnYes.disable();
    this.btnNo.disable();
    this.btnOK.disable();
    this.btnOK.disable();
    this.btnAbout.disable();
    this.btnInfosGame.disable();
    this.btnFullScreen.disable();
    this.btnPause.disable();
    this.btnExitFullScreen.disable();
    this.btnEnterFullScreen.disable();

    if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && !this.notificationMessage.foreGround) {
      this.notificationMessage.disableCloseButton();
    }

    this.btnTopArrow.disable();
    this.btnBottomArrow.disable();
    this.btnRightArrow.disable();
    this.btnLeftArrow.disable();
  }
};

GameUI.prototype.setNotification = function(notification) {
  if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage) {
    this.notificationMessage.close();
  }

  this.notificationMessage = notification;

  if(this.notificationMessage instanceof NotificationMessage && this.disableAnimation) {
    this.notificationMessage.disableAnimation = true;
  }
};

GameUI.prototype.setTimeToDisplay = function(time) {
  this.timerToDisplay = time;
};

GameUI.prototype.setBestScore = function(score) {
  if(score != undefined && score != null && score.trim() != "") {
    this.bestScoreToDisplay = score;
  }
};

GameUI.prototype.getDebugText = function() {
  return i18next.t("engine.debug.fps") + " : " + this.currentFPS + " / " + i18next.t("engine.debug.frames") + " : " + this.frame + " / " + i18next.t("engine.debug.ticks") + " : " + this.ticks + " / " + i18next.t("engine.debug.speed") + " : " + this.speed;
};

GameUI.prototype.toString = function() {
  return (this.grid != null ? this.grid.toString() : "") + "\n" + (this.snakes != null && this.snakes.length <= 1 ? i18next.t("engine.score") + " : " + (this.snakes != null ? this.snakes[0].score : "") : "") + (this.displayFPS ? "\n" + this.getDebugText() : "") + (this.gameOver && !this.scoreMax ? "\n" + i18next.t("engine.gameOver") : "") + (this.scoreMax ? "\n" + i18next.t("engine.scoreMax") : "") + (!this.gameOver && this.paused ? "\n" + i18next.t("engine.debug.paused") : "") + (this.countBeforePlay > 0 ? "\n" + this.countBeforePlay : "");
};

GameUI.prototype.preRenderFont = function(cars, size, color, fontFamily) {
  cars.push("?"); cars.push(" "); cars.push("A");

  for(var i = 0; i < cars.length; i++) {
    var canvasTmp = document.createElement("canvas");
    var ctxTmp = canvasTmp.getContext("2d");
    ctxTmp.font = size + "px " + fontFamily;
    var width = ctxTmp.measureText(cars[i]).width;

    canvasTmp.width = width;
    canvasTmp.height = size + (size / 6);

    ctxTmp.font = size + "px " + fontFamily;
    ctxTmp.fillStyle = color;
    ctxTmp.textBaseline = "top";
    ctxTmp.fillText(cars[i], 0, 0);

    this.preRenderedFont[cars[i]] = canvasTmp;
  }
};

GameUI.prototype.drawImage = function(ctx, imgSrc, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees) {
  this.drawImageWrapper(ctx, this.imageLoader.get(imgSrc), x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees);
};

GameUI.prototype.drawImageData = function(ctx, imageData, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees) {
  this.drawImageWrapper(ctx, imageData, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees);
};

GameUI.prototype.drawImageWrapper = function(ctx, image, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees) {
  var x = (x == undefined || isNaN(x)) ? null : Math.round(x);
  var y = (y == undefined || isNaN(y)) ? null : Math.round(y);
  var width = (width == undefined || isNaN(width)) ? null : Math.round(width);
  var height = (height == undefined || isNaN(height)) ? null : Math.round(height);
  var sx = (sx == undefined || isNaN(sx)) ? null : Math.round(sx);
  var sy = (sy == undefined || isNaN(sy)) ? null : Math.round(sy);
  var sWidth = (sWidth == undefined || isNaN(sWidth)) ? null : Math.round(sWidth);
  var sHeight = (sHeight == undefined || isNaN(sHeight)) ? null : Math.round(sHeight);
  var eraseBelow = eraseBelow == undefined ? false : eraseBelow;
  var degrees = (degrees == undefined || isNaN(degrees)) ? null : degrees;

  if(degrees != undefined) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    x = -(width / 2);
    y = -(height / 2);
  }

  if(eraseBelow) {
    ctx.clearRect(x, y, width, height);
  }

  if(ctx != undefined && image != undefined) {
    if(sx != undefined && sy != undefined && sWidth != undefined && sHeight != undefined) {
      ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    } else {
      ctx.drawImage(image, x, y, width, height);
    }
  }

  if(degrees != undefined) {
    ctx.restore();
  }
};

GameUI.prototype.drawText = function(ctx, text, color, size, fontFamily, alignement, verticalAlignement, x, y, wrap, bold) {
  var precFillStyle = ctx.fillStyle;
  var precFont = ctx.font;
  var precFilter = ctx.filter;

  if(!Array.isArray(color)) {
    ctx.fillStyle = color;
  }

  ctx.font = (bold ? "bold " : "") + size + "px " + fontFamily;
  ctx.filter = "none";

  if(wrap) {
    text = this.wrapTextLines(ctx, text)["text"];
  }

  var lines = text.split('\n');

  if(verticalAlignement == "center") {
    y = (this.canvas.height / 2) - (size * lines.length / 2);
  } else if(verticalAlignement == "top") {
    y = 5;
  } else if(verticalAlignement == "bottom") {
    y = (this.canvas.height) - (size * lines.length) / 2 - size / 5;
  }

  for(var i = 0; i < lines.length; i++) {
    var currentText = lines[i];

    if(Array.isArray(color)) {
      var colorIndex = i;

      if(colorIndex > color.length - 1) {
        colorIndex = color.length - 1;
      }

      ctx.fillStyle = color[colorIndex];
    }

    if(alignement == "center") {
      ctx.fillText(currentText, Math.round((this.canvas.width / 2) - (ctx.measureText(currentText).width / 2)), Math.round(y + (size * i)));
    } else if(alignement == "right") {
      ctx.fillText(currentText, Math.round((this.canvas.width) - (ctx.measureText(currentText).width) - 15), Math.round(y + (size * i)));
    } else if(alignement == "left") {
      ctx.fillText(currentText, 5, Math.round(y + (size * i)));
    } else {
      ctx.fillText(currentText, Math.round(x), Math.round(y + (size * i)));
    }
  }

  ctx.fillStyle = precFillStyle;
  ctx.font = precFont;
  ctx.filter = precFilter;

  return {
    x: x,
    y: y,
    height: size * lines.length
  };
};

GameUI.prototype.drawTextBitmap = function(ctx, bitmapFontSet, text, size, x, y, wrap) {
  if(bitmapFontSet == undefined || bitmapFontSet == null) {
    this.preRenderedFont = {};
    this.preRenderFont(GameConstants.Setting.CARS_TO_PRERENDER, GameConstants.Setting.FONT_SIZE * 2, "white", GameConstants.Setting.FONT_FAMILY);
    bitmapFontSet = this.preRenderedFont;
  }

  if(wrap) {
    var testCar = bitmapFontSet["A"];
    text = this.wrapTextLines(ctx, text, testCar.width * (size / testCar.height), size)["text"];
  }

  var lines = text.split('\n');
  var currentY = y;

  for(var i = 0; i < lines.length; i++) {
    var currentText = lines[i];
    var currentX = x;

    for(var j = 0; j < currentText.length; j++) {
      var currentCar = currentText.charAt(j);

      if(bitmapFontSet[currentCar] == undefined || bitmapFontSet[currentCar] == null) {
        var currentCarBitmap = bitmapFontSet["?"];
      } else {
        var currentCarBitmap = bitmapFontSet[currentCar];
      }

      var widthBitmap = currentCarBitmap.width * (size / currentCarBitmap.height);
      this.drawImageData(ctx, currentCarBitmap, currentX, currentY, widthBitmap, size, 0, 0, currentCarBitmap.width, currentCarBitmap.height);
      currentX += widthBitmap;
    }

    if(currentText.length > 0) {
      currentY += size;
    }
  }
};

GameUI.prototype.wrapText = function(text, limit) {
  if(text.length > limit) {
    var p = limit;

    for(; p > 0 && text[p] != " "; p--);

    if(p > 0) {
      var left = text.substring(0, p);
      var right = text.substring(p + 1);
      return left + "\n" + this.wrapText(right, limit);
    }
  }

  return text;
};

GameUI.prototype.wrapTextLines = function(ctx, text, width, fontSize) {
  var lines = text.split("\n");
  var newText = "";
  var widthCar = width || ctx.measureText("A").width;
  var nbCarLine = Math.round(this.canvas.width / widthCar);
  var heightTotal = 0;

  for(var i = 0; i < lines.length; i++) {
    var lineWrap = this.wrapText(lines[i], nbCarLine);
    newText += lineWrap;

    if(i < lines.length - 1) {
      newText += "\n";
    }

    for(var j = 0; j < lineWrap.split("\n").length; j++) {
      heightTotal += parseFloat(fontSize);
    }
  }

  return {
    text: newText,
    height: heightTotal
  };
};

GameUI.prototype.drawMenu = function(ctx, buttons, text, color, size, fontFamily, alignement, x, wrap, func) {
  var self = this;
  
  ctx.fillStyle = "rgba(44, 62, 80, 0.75)";
  ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);

  var heightText = self.wrapTextLines(ctx, text, null, size)["height"];
  var heightButtons = 0;

  if(buttons != null) {
    if(self.lastKeyMenu == GameConstants.Key.UP) {
      self.selectedButton--;
    } else if(self.lastKeyMenu == GameConstants.Key.BOTTOM) {
      self.selectedButton++;
    }

    if(self.selectedButton >= buttons.length) {
      self.selectedButton = 0;
    } else if(self.selectedButton < 0) {
      self.selectedButton = buttons.length - 1;
    }

    for(var i = 0; i < buttons.length; i++) {
      if(buttons[i].autoHeight) {
        heightButtons += self.wrapTextLines(ctx, buttons[i].text, null, buttons[i].getFontSize(ctx))["height"] + 8;
      } else {
        heightButtons += buttons[i].height + 5;
      }
    }
  }

  var totalHeight = heightText + heightButtons;
  var startY = self.canvas.height / 2 - totalHeight / 2 + 16;
  var currentY = startY + heightText;

  self.drawText(ctx, text, color, size, fontFamily, alignement, "default", x, startY, true);

  var buttonEntered = false;

  if(buttons != null) {
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].y = currentY;

      if(self.selectedButton == i) {
        buttons[i].selected = true;
      } else {
        buttons[i].selected = false;
      }

      buttons[i].enable();
      buttons[i].draw(self);

      if(self.selectedButton == i && self.lastKeyMenu == GameConstants.Key.ENTER && buttons[i].triggerClick != null && !buttons[i].disabled) {
        buttonEntered = true;
        buttons[i].triggerClick();
        break;
      }

      currentY += buttons[i].height + 8;
    }
  }

  if(self.notificationMessage != undefined && self.notificationMessage != null && self.notificationMessage instanceof NotificationMessage && self.notificationMessage.foreGround && !buttonEntered) {
    self.notificationMessage.draw(self);
  }

  if(func != null) {
    func(true);
  }

  self.lastKeyMenu = -1;
};

GameUI.prototype.drawSnake = function(ctx, caseWidth, caseHeight, totalWidth, blur) {
  var canvasTmp = document.createElement("canvas");
  canvasTmp.width = this.canvas.width;
  canvasTmp.height = this.canvas.height;
  var ctxTmp = canvasTmp.getContext("2d");

  if(this.snakes != null) {
    for(var j = 0; j < this.snakes.length; j++) {
      ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);

      if(this.snakes[j].color != undefined) {
        ctxTmp.filter = "hue-rotate(" + this.snakes[j].color + "deg)";
      }

      if(blur) {
        ctxTmp.filter = ctxTmp.filter + " blur(5px)";
      }

      for(var i = this.snakes[j].length() - 1; (i >= -1 && this.snakes[j].length() > 1) || i >= 0; i--) { // -1 == tail
        if(i == -1) {
          var position = this.snakes[j].get(this.snakes[j].length() - 1);
        } else {
          var position = this.snakes[j].get(i);
        }

        var caseX = 0;
        var caseY = 0;
        var direction = position.direction;
        var angle = 0;
        var imageLoc = "";
        var eraseBelow = true;

        if(i == 0) {
          direction = this.snakes[j].getHeadPosition().direction;
        } else if(i == -1) {
          if(!this.disableAnimation && !this.snakes[j].gameOver && !this.snakes[j].scoreMax && !this.gameFinished && this.snakes[j].lastTailMoved) {
            direction = this.snakes[j].getTailPosition().direction;
          } else {
            direction = this.snakes[j].get(this.snakes[j].length() - 2).direction;
          }
        } else {
          direction = this.snakes[j].getGraphicDirection(i);
        }

        // Animation
        if(!this.disableAnimation && (i == 0 || (i == -1 && this.snakes[j].lastTailMoved)) && !this.snakes[j].gameOver && !this.snakes[j].scoreMax && !this.gameFinished) {
          var offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER); // percentage of the animation
          var offset = (offset > 1 ? 1 : offset);
          var offsetX = (caseWidth * offset) - caseWidth;
          var offsetY = (caseHeight * offset) - caseHeight;

          var currentPosition = position;

          if(i == 0) {
            if(this.snakes[j].length() > 1) {
              var graphicDirection = this.snakes[j].getGraphicDirection(1);
            } else {
              var graphicDirection = this.snakes[j].getGraphicDirection(0);
            }
          } else if(i == -1) {
            var graphicDirection = this.snakes[j].getGraphicDirectionFor(this.snakes[j].getTailPosition(), this.snakes[j].lastTail, this.snakes[j].get(this.snakes[j].length() - 2));
          }

          if(i == -1 && this.snakes[j].length() > 1) {
            currentPosition = this.snakes[j].get(this.snakes[j].length() - 1);
          }

          if((i == 0 || i == -1) && (graphicDirection == GameConstants.Direction.ANGLE_1 || graphicDirection == GameConstants.Direction.ANGLE_2 || graphicDirection == GameConstants.Direction.ANGLE_3 || graphicDirection == GameConstants.Direction.ANGLE_4)) {
            if(i == 0) {
              angle = -90;
            }

            if(i == 0) {
              angle += -128.073 * Math.pow(offset, 2) + 222.332 * offset - 5.47066;
            } else if(i == -1) {
              angle += 126.896 * Math.pow(offset, 2) + -33.6471 * offset + 1.65942;
            }

            if(i == 0 && ((graphicDirection == GameConstants.Direction.ANGLE_4 && direction == GameConstants.Direction.UP) || (graphicDirection == GameConstants.Direction.ANGLE_1 && direction == GameConstants.Direction.LEFT) || (graphicDirection == GameConstants.Direction.ANGLE_2 && direction == GameConstants.Direction.BOTTOM) || (graphicDirection == GameConstants.Direction.ANGLE_3 && direction == GameConstants.Direction.RIGHT))) {
              angle = -angle;
            } else if(i == -1 && ((graphicDirection == GameConstants.Direction.ANGLE_4 && direction == GameConstants.Direction.RIGHT) || (graphicDirection == GameConstants.Direction.ANGLE_3 && direction == GameConstants.Direction.BOTTOM) || (graphicDirection == GameConstants.Direction.ANGLE_1 && direction == GameConstants.Direction.UP) || (graphicDirection == GameConstants.Direction.ANGLE_2 && direction == GameConstants.Direction.LEFT))) {
              angle = - angle;
            }

            eraseBelow = false;
          }

          switch(currentPosition.direction) {
            case GameConstants.Direction.UP:
              caseY -= offsetY;
              break;
            case GameConstants.Direction.BOTTOM:
              caseY += offsetY;
              break;
            case GameConstants.Direction.RIGHT:
              caseX += offsetX;
              break;
            case GameConstants.Direction.LEFT:
              caseX -= offsetX;
              break;
          }
        }

        if(i == this.snakes[j].length() - 1) {
          direction = this.snakes[j].getGraphicDirectionFor(position, this.snakes[j].get(i - 1), this.snakes[j].lastTail);
        }

        var posX = position.x;
        var posY = position.y;
        caseX += Math.floor(posX * caseWidth + ((this.canvas.width - totalWidth) / 2));
        caseY += this.headerHeight + posY * caseHeight;

        if(i == 0) {
          if(this.snakes[j].gameOver && !this.snakes[j].scoreMax) {
            switch(direction) {
              case GameConstants.Direction.BOTTOM:
                imageLoc = "assets/images/snake_dead.png";
                break;
              case GameConstants.Direction.RIGHT:
                imageLoc = "assets/images/snake_dead_2.png";
                break;
              case GameConstants.Direction.UP:
                imageLoc = "assets/images/snake_dead_3.png";
                break;
              case GameConstants.Direction.LEFT:
                imageLoc = "assets/images/snake_dead_4.png";
                break;
            }
          } else {
            switch(direction) {
              case GameConstants.Direction.BOTTOM:
                imageLoc = "assets/images/snake.png";
                break;
              case GameConstants.Direction.RIGHT:
                imageLoc = "assets/images/snake_2.png";
                break;
              case GameConstants.Direction.UP:
                imageLoc = "assets/images/snake_3.png";
                break;
              case GameConstants.Direction.LEFT:
                imageLoc = "assets/images/snake_4.png";
                break;
            }
          }
        } else if(i == -1) {
          switch(direction) {
            case GameConstants.Direction.BOTTOM:
              imageLoc = "assets/images/body_end.png";
              break;
            case GameConstants.Direction.RIGHT:
              imageLoc = "assets/images/body_2_end.png";
              break;
            case GameConstants.Direction.UP:
              imageLoc = "assets/images/body_3_end.png";
              break;
            case GameConstants.Direction.LEFT:
              imageLoc = "assets/images/body_4_end.png";
              break;
          }
        } else {
          switch(direction) {
            case GameConstants.Direction.UP:
              imageLoc = "assets/images/body.png";
              break;
            case GameConstants.Direction.BOTTOM:
              imageLoc = "assets/images/body.png";
              break;
            case GameConstants.Direction.RIGHT:
              imageLoc = "assets/images/body_2.png";
              break;
            case GameConstants.Direction.LEFT:
              imageLoc = "assets/images/body_2.png";
              break;
            case GameConstants.Direction.ANGLE_1:
              imageLoc = "assets/images/body_angle_1.png";
              break;
            case GameConstants.Direction.ANGLE_2:
              imageLoc = "assets/images/body_angle_2.png";
              break;
            case GameConstants.Direction.ANGLE_3:
              imageLoc = "assets/images/body_angle_3.png";
              break;
            case GameConstants.Direction.ANGLE_4:
              imageLoc = "assets/images/body_angle_4.png";
              break;
          }
        }

        this.drawImage(ctxTmp, imageLoc, caseX, caseY, caseWidth, caseHeight, null, null, null, null, eraseBelow, angle);
      }

      this.drawImageData(ctx, canvasTmp, Math.floor((this.canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, caseHeight * this.grid.height, Math.floor((this.canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, caseHeight * this.grid.height);
      ctxTmp.filter = "none";
    }

    if(this.snakes.length > 1) {
      this.drawSnakeInfos(ctx, totalWidth, caseWidth, caseHeight);
    }
  }
};

GameUI.prototype.drawArrow = function(ctx, fromx, fromy, tox, toy) {
  var lineCap = ctx.lineCap;
  var lineWidth = ctx.lineWidth;
  var strokeStyle = ctx.strokeStyle;
  var filter = ctx.filter;
  ctx.lineCap = 'round';
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#FF0000";
  ctx.filter = "";

  ctx.beginPath();
  var headlen = 20;
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  ctx.stroke();

  ctx.lineCap = lineCap;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.filter = filter;
};

GameUI.prototype.drawSnakeInfos = function(ctx, totalWidth, caseWidth, caseHeight) {
  var numPlayer = 0;
  var numAI = 0;

  for(var i = 0; i < this.snakes.length; i++) {
    if(this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
      numPlayer++;
    } else {
      numAI++;
    }

    var position = this.snakes[i].get(0);

    if(position != null) {
      var posX = position.x;
      var posY = position.y;
      var caseX = Math.floor(posX * caseWidth + ((this.canvas.width - totalWidth) / 2));
      var caseY = this.headerHeight + posY * caseHeight;
  
      if(!this.disableAnimation && !this.snakes[i].gameOver) {
        var offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER);
        var offset = (offset > 1 ? 1 : offset);
        var offsetX = (caseWidth * offset) - caseWidth;
        var offsetY = (caseHeight * offset) - caseHeight;
  
        switch(position.direction) {
          case GameConstants.Direction.UP:
            caseY -= offsetY;
            break;
          case GameConstants.Direction.BOTTOM:
            caseY += offsetY;
            break;
          case GameConstants.Direction.RIGHT:
            caseX += offsetX;
            break;
          case GameConstants.Direction.LEFT:
            caseX -= offsetX;
            break;
        }
      }
  
      this.drawText(ctx, ((this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) ? i18next.t("engine.playerMin") + numPlayer : i18next.t("engine.aiMin") + numAI) + "\n× " + this.snakes[i].score, "rgb(255, 255, 255)", Math.round(caseHeight / 2), GameConstants.Setting.FONT_FAMILY, null, null, caseX, caseY - Math.round(caseHeight / 1.75), false, true);
  
      if((this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) && this.countBeforePlay >= 0 && ((GameUtils.isFilterHueAvailable() && this.snakes.length > 2) || (!GameUtils.isFilterHueAvailable() && this.snakes.length > 1))) {
        this.drawArrow(ctx, caseX + (caseWidth / 2), caseY - caseHeight * 2, caseX + (caseWidth / 2), caseY - 5);
      }
    }
  }
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = GameUI;
}