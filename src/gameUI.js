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
  var ImageLoader = require("./imageLoader");
  var Buttons = require("./button");
  var Button = Buttons.Button;
  var ButtonImage = Buttons.ButtonImage;
  var NotificationMessage = require("./notificationMessage");
  var DrawUtils = require("./drawUtils");
  var Menu = require("./menu");
  var GameRanking = require('./gameRanking');
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
  this.countBeforePlay = -1;
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
  // Online variables
  this.onlineMode = false;
  this.enableRetryPauseMenu = true;
  this.searchingPlayers = false;
  this.playerNumber = 0;
  this.maxPlayers = 0;
  this.timeStart = 0;
  this.lastTime = 0;
  this.currentPlayer = null;
  this.spectatorMode = null;
  this.onlineMaster = false;
  // Menus state variables
  this.menu = new Menu(null, "", "white", null, null, "center");
  this.confirmReset = false;
  this.confirmExit = false;
  this.getInfos = false;
  this.getInfosGame = false;
  this.timeoutAutoRetry = null;
  // Game ranking
  this.gameRanking = new GameRanking();
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
  this.isFilterHueAvailable = DrawUtils.isFilterHueAvailable();
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
  this.btnStartGame;
  this.btnCloseNotification;
  this.btnRank;
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
    this.btnRank = new ButtonImage("assets/images/ranking.png", null, 5, null, null, 64, 64);
    this.btnContinue = new Button(i18next.t("engine.continue"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnRetry = new Button(i18next.t("engine.reset"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnQuit = new Button(i18next.t("engine.exit"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnYes = new Button(i18next.t("engine.yes"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnNo = new Button(i18next.t("engine.no"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnOK = new Button(i18next.t("engine.ok"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnAbout = new Button(i18next.t("engine.about"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnInfosGame = new Button(i18next.t("engine.infosGame"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnTopArrow = new ButtonImage("assets/images/up.png", 64, 92, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnRightArrow = new ButtonImage("assets/images/right.png", 0, 46, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnLeftArrow = new ButtonImage("assets/images/left.png", 128, 46, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnBottomArrow = new ButtonImage("assets/images/bottom.png", 64, 0, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
    this.btnExitFullScreen = new Button(i18next.t("engine.exitFullScreen"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnEnterFullScreen = new Button(i18next.t("engine.enterFullScreen"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnStartGame = new Button(i18next.t("engine.servers.startGame"), null, null, "center", "#3498db", "#246A99", "#184766");
    this.btnCloseNotification = new ButtonImage("assets/images/close.png", null, 5, "right", null, 32, 32, null, null, this.imageLoader);

    this.btnFullScreen.addClickAction(function() {
      self.toggleFullscreen();
      self.pause();
    });

    this.btnPause.addClickAction(function() {
      self.pause();
    });

    this.btnRank.addClickAction(function() {
      if(self.gameRanking.closing || self.gameRanking.closed) {
        self.gameRanking.open();
      } else {
        self.gameRanking.close();
      }
    });

    this.btnTopArrow.addClickAction(function() {
      self.controller.key(GameConstants.Key.UP);
    });

    this.btnBottomArrow.addClickAction(function() {
      self.controller.key(GameConstants.Key.BOTTOM);
    });

    this.btnLeftArrow.addClickAction(function() {
      self.controller.key(GameConstants.Key.LEFT);
    });

    this.btnRightArrow.addClickAction(function() {
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
  this.controller && this.controller.reset();
};

GameUI.prototype.start = function() {
  this.controller && this.controller.start();
};

GameUI.prototype.forceStart = function() {
  this.controller && this.controller.forceStart();
};

GameUI.prototype.stop = function() {
  this.controller && this.controller.stop();
};

GameUI.prototype.pause = function() {
  this.controller && this.controller.pause();
};

GameUI.prototype.kill = function() {
  this.controller && this.controller.kill();
};

GameUI.prototype.exit = function() {
  this.controller && this.controller.exit();
};

GameUI.prototype.tick = function() {
  this.controller && this.controller.tick();
};

GameUI.prototype.setKill = function() {
  this.killed = true;
  this.clearIntervalCountFPS();

  this.grid = null;
  this.snakes = null;

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
    this.imageLoader.load(["assets/images/snake_4.png", "assets/images/snake_3.png", "assets/images/snake_2.png", "assets/images/snake.png", "assets/images/body_4_end.png", "assets/images/body_3_end.png", "assets/images/body_2_end.png", "assets/images/body_end.png", "assets/images/body_2.png", "assets/images/body.png", "assets/images/wall.png", "assets/images/fruit.png", "assets/images/body_angle_1.png", "assets/images/body_angle_2.png", "assets/images/body_angle_3.png", "assets/images/body_angle_4.png", "assets/images/pause.png", "assets/images/fullscreen.png", "assets/images/snake_dead_4.png", "assets/images/snake_dead_3.png", "assets/images/snake_dead_2.png", "assets/images/snake_dead.png", "assets/images/up.png", "assets/images/left.png", "assets/images/right.png", "assets/images/bottom.png", "assets/images/close.png", "assets/images/trophy.png", "assets/images/trophy_silver.png", "assets/images/trophy_bronze.png", "assets/images/clock.png", "assets/images/fruit_gold.png", "assets/images/ranking.png"], function() {
      if(self.imageLoader.hasError) {
        self.errorOccurred = true;
      } else {
        self.assetsLoaded = true;
        self.btnFullScreen.loadImage(self.imageLoader);
        self.btnPause.loadImage(self.imageLoader);
        self.btnRank.loadImage(self.imageLoader);
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
      self.lastTime = Date.now();
      self.frame++;

      if((!self.paused && !self.onlineMode) || self.onlineMode) {
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
    var currentPlayer = this.getCurrentPlayer();
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

    this.btnRank.width = this.headerHeight * 0.85;
    this.btnRank.height = this.btnRank.width;
    this.btnRank.y = (this.headerHeight / 2) - (this.btnRank.height / 2);

    this.menu.fontSize = this.fontSize;
    this.menu.disable();

    if(renderBlur) {
      ctx.filter = "blur(5px)";
    }

    DrawUtils.clear(ctx);
    ctx.fillStyle = "rgba(204, 207, 211, 1)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#27AE60";
    ctx.fillRect(0, 0, this.canvas.width, this.headerHeight);
    ctx.font = this.fontSize + "px " + GameConstants.Setting.FONT_FAMILY;
    ctx.fillStyle = "black";

    this.btnFullScreen.draw(this.canvasCtx);

    if(this.enablePause) {
      this.btnPause.x = this.btnFullScreen.x - this.btnPause.width - 10;
      this.btnPause.draw(this.canvasCtx);

      if(this.snakes != null && this.snakes.length > 1) {
        this.btnRank.x = this.btnPause.x - this.btnPause.width - 10;
        this.btnRank.draw(this.canvasCtx);
      }
    } else if(this.snakes != null && this.snakes.length > 1) {
      this.btnRank.x = this.btnPause.x - this.btnFullScreen.width - 10;
      this.btnRank.draw(this.canvasCtx);
    }

    if(this.gameRanking.closing || this.gameRanking.closed) {
      this.btnRank.color = "rgba(0, 0, 0, 0)";
    } else {
      this.btnRank.color = this.btnRank.colorHover;
    }

    if(this.assetsLoaded && !this.errorOccurred) {
      if(this.bestScoreToDisplay != undefined && this.bestScoreToDisplay != null) {
        displayBestScore = true;
      }

      DrawUtils.drawImage(ctx, this.imageLoader.get("assets/images/fruit.png"), 5, 5, this.headerHeight * 0.85 * (displayBestScore ? 0.5 : 1), this.headerHeight * 0.85 * (displayBestScore ? 0.5 : 1));

      if(this.snakes != null && this.snakes.length <= 1) {
        DrawUtils.drawText(ctx, "× " + this.snakes[0].score, "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
      } else {
        DrawUtils.drawText(ctx, i18next.t("engine.num") + (this.numFruit != null ? this.numFruit : "???"), "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
      }

      if(displayBestScore) {
        DrawUtils.drawImage(ctx, this.imageLoader.get("assets/images/trophy.png"), 5, 8 + this.headerHeight * 0.425, this.headerHeight * 0.425, this.headerHeight * 0.425);
        DrawUtils.drawText(ctx, this.bestScoreToDisplay, "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.425 + this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
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
            DrawUtils.drawImage(ctx, this.imageLoader.get(this.grid.getImageCase(new Position(j, i))), caseX, caseY, caseWidth, caseHeight);
          }
        }

        this.drawSnake(ctx, caseWidth, caseHeight, totalWidth, renderBlur, currentPlayer);
      }

      if(this.timerToDisplay != undefined && this.timerToDisplay != null && !isNaN(this.timerToDisplay) && this.timerToDisplay >= 0) {
        DrawUtils.drawImage(ctx, this.imageLoader.get("assets/images/clock.png"), this.headerHeight * 0.24, this.headerHeight + 15, this.headerHeight * 0.64, this.headerHeight * 0.64);
        DrawUtils.drawText(ctx, "" + GameUtils.secondsFormat(this.timerToDisplay), "rgba(0, 0, 0, 0.5)", GameConstants.Setting.FONT_SIZE, GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight, this.headerHeight + 15 + this.headerHeight * 0.475);
      }
    } else if(!this.assetsLoaded && !renderBlur) {
      var percentLoaded = Math.floor((100 * Object.keys(this.imageLoader.images).length) / this.imageLoader.nbImagesToLoad);
      this.menu.set([], i18next.t("engine.loading") + "\n" + percentLoaded + "%", "white");
    }

    if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && !this.notificationMessage.foreGround) {
      this.notificationMessage.draw(this, this.btnCloseNotification);
    }

    if(this.snakes != null && (this.getNBPlayer(GameConstants.PlayerType.HUMAN) > 0 || this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) > 0) && (this.getNBPlayer(GameConstants.PlayerType.HUMAN) <= 1 || this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) <= 1 || this.currentPlayer != null) && !this.spectatorMode) {
      this.btnTopArrow.draw(this.canvasCtx);
      this.btnBottomArrow.draw(this.canvasCtx);
      this.btnRightArrow.draw(this.canvasCtx);
      this.btnLeftArrow.draw(this.canvasCtx);
    }

    this.gameRanking.set(this.snakes, this.fontSize, this.headerHeight);

    if(this.snakes != null && this.snakes.length <= 1) {
      this.gameRanking.close();
    }

    if(!this.gameFinished && !this.gameOver) {
      this.gameRanking.draw(this.canvasCtx, this, currentPlayer);
    }

    this.disableAllButtons();

    if(this.searchingPlayers && this.lastTime > 0) {
      this.timeStart -= Math.max(0, Date.now() - this.lastTime);
    } else {
      this.timeStart = 0;
    }

    var nextGameText = (this.timeStart > 0 ? ("\n\n" + i18next.t("engine.servers.nextGameStart") + " " + GameUtils.millisecondsFormat(this.timeStart)) : "");

    if(!renderBlur) {
      if(this.exited) {
        this.menu.set(this.fullscreen ? [this.btnExitFullScreen] : [], i18next.t("engine.exited"), "white");
        
        this.btnExitFullScreen.addClickAction(function() {
          self.toggleFullscreen();
        });
      } else if(this.errorOccurred) {
        this.menu.set([this.btnQuit], this.imageLoader.hasError ? i18next.t("engine.errorLoading") : i18next.t("engine.error"), "#E74C3C");
        
        this.btnQuit.addClickAction(function() {
          self.confirmExit = false;
          self.selectedButton = 0;
          self.exit();
        });
     } else if(this.getInfosGame) {
        this.menu.set([this.btnOK],
        (this.snakes != null && this.snakes.length <= 1 && !this.spectatorMode ? i18next.t("engine.player") + " " + (((this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HUMAN && !this.spectatorMode) || (this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HYBRID_HUMAN_AI)) ? i18next.t("engine.playerHuman") : i18next.t("engine.playerAI")) : "") + (this.getNBPlayer(GameConstants.PlayerType.AI) > 0 ? "\n" +  i18next.t("engine.aiLevel") + " " + this.getPlayer(1, GameConstants.PlayerType.AI).getAILevelText() : "") + "\n" + i18next.t("engine.sizeGrid") + " " + (this.grid != null && this.grid.width ? this.grid.width : "???") + "×" + (this.grid != null && this.grid.height ? this.grid.height : "???") + "\n" + i18next.t("engine.currentSpeed") + " " + (this.initialSpeed != null ? this.initialSpeed : "???") + (this.snakes != null && this.snakes.length <= 1 && this.progressiveSpeed ? "\n" + i18next.t("engine.progressiveSpeed") : "") + (this.grid != null && !this.grid.maze && this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HYBRID_HUMAN_AI ? "\n" + i18next.t("engine.assistAI") : "") + (this.grid != null && this.grid.maze ? "\n" + i18next.t("engine.mazeModeMin") : "") + (this.onlineMode ? "\n" + i18next.t("engine.onlineMode") : ""),
        "white");
        
        this.btnOK.addClickAction(function() {
          self.getInfosGame = false;
          self.selectedButton = 0;
        });
      } else if(this.getInfos) {
        this.menu.set([this.btnInfosGame, this.btnOK], i18next.t("engine.aboutScreen.title") + "\nwww.eliastiksofts.com\n\n" + i18next.t("engine.aboutScreen.versionAndDate", { version: GameConstants.Setting.APP_VERSION, date: new Intl.DateTimeFormat(i18next.language).format(new Date(GameConstants.Setting.DATE_VERSION)), interpolation: { escapeValue: false } }), "white");
        
        this.btnInfosGame.addClickAction(function() {
          self.getInfosGame = true;
          self.selectedButton = 0;
        });

        this.btnOK.addClickAction(function() {
          self.getInfos = false;
          self.selectedButton = 0;
        });
      } else if(this.confirmExit) {
        this.menu.set([this.btnNo, this.btnYes], i18next.t("engine.exitConfirm"), "#E74C3C");
        
        this.btnYes.addClickAction(function() {
          self.confirmExit = false;
          self.selectedButton = 0;
          self.exit();
        });
        
        this.btnNo.addClickAction(function() {
          self.confirmExit = false;
          self.selectedButton = 0;
        });
      } else if(this.assetsLoaded && this.countBeforePlay >= 0) {
        if(this.snakes != null && ((this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HUMAN) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) || (this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI) != null) || this.currentPlayer != null)) {
          if(this.currentPlayer != null) {
            var playerHuman = this.getPlayer(this.currentPlayer, GameConstants.PlayerType.HUMAN);
          } else if(this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) {
            var playerHuman = this.getPlayer(1, GameConstants.PlayerType.HUMAN);
          } else {
            var playerHuman = this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI);
          }

          if(playerHuman != null) {
            var colorName = GameUtils.hslToName(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color), GameConstants.Setting.IMAGE_SNAKE_SATURATION, GameConstants.Setting.IMAGE_SNAKE_VALUE);
            var colorRgb = GameUtils.hsvToRgb(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color) / 360, GameConstants.Setting.IMAGE_SNAKE_SATURATION / 100, GameConstants.Setting.IMAGE_SNAKE_VALUE / 100);
          }

          if(this.countBeforePlay > 0) {
            this.menu.set(!this.fullscreen ? [this.btnEnterFullScreen] : [], "" + this.countBeforePlay + (playerHuman != null ? ("\n" + (this.isFilterHueAvailable && colorName != "???" ? i18next.t("engine.colorPlayer", { color: colorName }) : i18next.t("engine.arrowPlayer"))) : ""), (this.isFilterHueAvailable && colorName != "???" ? ["white", "rgb(" + colorRgb[0] + ", " + colorRgb[1] + ", " + colorRgb[2] + ")"] : ["white", "#3498db"]));
            
            this.btnEnterFullScreen.addClickAction(function() {
              self.toggleFullscreen();
            });
          } else {
            this.menu.set(!this.fullscreen ? [this.btnEnterFullScreen] : [], i18next.t("engine.ready") + (playerHuman != null ? ("\n" + (this.isFilterHueAvailable && colorName != "???" ? i18next.t("engine.colorPlayer", { color: colorName }) : i18next.t("engine.arrowPlayer"))) : ""), (this.isFilterHueAvailable && colorName != "???" ? ["white", "rgb(" + colorRgb[0] + ", " + colorRgb[1] + ", " + colorRgb[2] + ")"] : ["white", "#3498db"]));
            
            this.btnEnterFullScreen.addClickAction(function() {
              self.toggleFullscreen();
            });
          }
        } else {
          if(this.countBeforePlay > 0) {
            this.menu.set(!this.fullscreen ? [this.btnEnterFullScreen] : [], "" + this.countBeforePlay, "white");
            
            this.btnEnterFullScreen.addClickAction(function() {
              self.toggleFullscreen();
            });
          } else {
            this.menu.set(!this.fullscreen ? [this.btnEnterFullScreen] : [], i18next.t("engine.ready"), "white");
            
            this.btnEnterFullScreen.addClickAction(function() {
              self.toggleFullscreen();
            });
          }
        }
      } else if(this.confirmReset && !this.gameOver) {
        this.menu.set([this.btnNo, this.btnYes], i18next.t("engine.resetConfirm"), "#E74C3C");
        
        this.btnYes.addClickAction(function() {
          self.confirmReset = false;
          self.selectedButton = 0;
          self.reset();
        });

        this.btnNo.addClickAction(function() {
          self.confirmReset = false;
          self.selectedButton = 0;
        });
      } else if(this.gameFinished) {
        this.menu.set(this.enableRetry ? [this.btnRetry, this.btnQuit] : [this.btnQuit], (this.grid.maze && this.gameMazeWin) ? i18next.t("engine.mazeWin") : i18next.t("engine.gameFinished") + nextGameText, (this.grid.maze && this.gameMazeWin) ? "#2ecc71" : "white");
        
        this.btnRetry.addClickAction(function() {
          self.selectedButton = 0;
          self.reset();
        });

        this.btnQuit.addClickAction(function() {
          self.confirmExit = true;
          self.selectedButton = 0;
        });
      } else if(this.scoreMax && this.snakes.length <= 1) {
        this.menu.set(this.enableRetry ? [this.btnRetry, this.btnQuit] : (this.fullscreen ? [this.btnExitFullScreen] : []), i18next.t("engine.scoreMax") + nextGameText, "#2ecc71");
        
        this.btnRetry.addClickAction(function() {
          self.selectedButton = 0;
          self.reset();
        });

        this.btnQuit.addClickAction(function() {
          self.confirmExit = true;
          self.selectedButton = 0;
        });

        this.btnExitFullScreen.addClickAction(function() {
          self.toggleFullscreen();
        });
      } else if(this.gameOver && this.snakes.length <= 1) {
        this.menu.set(this.enableRetry && !this.snakes[0].autoRetry ? [this.btnRetry, this.btnQuit] : (this.fullscreen ? [this.btnExitFullScreen] : []), i18next.t("engine.gameOver") + nextGameText, "#E74C3C");

        if(this.snakes[0].autoRetry && this.timeoutAutoRetry == null) {
          this.timeoutAutoRetry = setTimeout(function() {
            self.selectedButton = 0;
            self.reset();
            self.timeoutAutoRetry = null;
          }, 500);
        } else {
          this.btnRetry.addClickAction(function() {
            self.selectedButton = 0;
            self.reset();
          });

          this.btnQuit.addClickAction(function() {
            self.confirmExit = true;
            self.selectedButton = 0;
          });

          this.btnExitFullScreen.addClickAction(function() {
            self.toggleFullscreen();
          });
        }
      } else if(this.assetsLoaded && this.searchingPlayers) {
        this.menu.set(this.onlineMaster ? [this.btnStartGame, this.btnQuit] : [this.btnQuit], i18next.t("engine.servers.waitingPlayers") + "\n" + this.playerNumber + "/" + this.maxPlayers + (this.timeStart > 0 ? ("\n\n" + i18next.t("engine.servers.gameStart") + " " + GameUtils.millisecondsFormat(this.timeStart)) : ""), "white");
        
        this.btnQuit.addClickAction(function() {
          self.confirmExit = true;
        });

        this.btnStartGame.addClickAction(function() {
          self.forceStart();
        });
      } else if(this.paused && !this.gameOver && this.assetsLoaded) {
        this.menu.set(this.enablePause ? (this.enableRetry && this.enableRetryPauseMenu ? [this.btnContinue, this.btnRetry, this.btnAbout, this.btnQuit] : [this.btnContinue, this.btnAbout, this.btnQuit]) : [this.btnContinue, this.btnAbout], i18next.t("engine.pause"), "white");
        
        this.btnContinue.addClickAction(function() {
          self.selectedButton = 0;
          self.start();
        });

        this.btnRetry.addClickAction(function() {
          self.confirmReset = true;
          self.selectedButton = 0;
        });

        this.btnQuit.addClickAction(function() {
          self.confirmExit = true;
          self.selectedButton = 0;
        });

        this.btnAbout.addClickAction(function() {
          self.getInfos = true;
          self.selectedButton = 0;
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

        if(this.snakes != null && this.snakes.length > 1) {
          this.btnRank.enable();
        }

        if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && !this.notificationMessage.foreGround) {
          this.notificationMessage.enableCloseButton();
        }
      }
    
      this.menu.draw(this.canvasCtx);

      if(this.gameFinished || this.gameOver) {
        this.gameRanking.draw(this.canvasCtx, this, currentPlayer);
      }
    
      if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && this.notificationMessage.foreGround) {
        this.notificationMessage.draw(this.canvasCtx, this.btnCloseNotification);
        this.notificationMessage.enableCloseButton();
      }
    }

    if(this.displayFPS) {
      DrawUtils.drawText(ctx, this.getDebugText(), "rgba(255, 255, 255, 0.5)", this.fontSize / 1.5, GameConstants.Setting.FONT_FAMILY, "right", "bottom", null, null, true);
    }

    if(this.spectatorMode) {
      DrawUtils.drawText(ctx, i18next.t("engine.servers.spectatorMode"), "rgba(255, 255, 255, 0.5)", this.fontSize, GameConstants.Setting.FONT_FAMILY, "left", "bottom", null, null, true);
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
    this.btnRank.disable();
    this.btnExitFullScreen.disable();
    this.btnEnterFullScreen.disable();
    this.btnStartGame.disable();

    if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage) {
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

GameUI.prototype.getCurrentPlayer = function() {
  if(this.snakes != null) {
    var nbPlayers = this.getNBPlayer(GameConstants.PlayerType.HUMAN);
    var nbPlayersHybrid = this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI);
  
    for(var i = 0; i < this.snakes.length; i++) {
      if((this.currentPlayer == null && nbPlayers <= 1 && nbPlayersHybrid <= 1 && (this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI)) || this.currentPlayer == (i + 1)) {
        return i;
      }
    }
  }

  return -1;
};

GameUI.prototype.drawSnake = function(ctx, caseWidth, caseHeight, totalWidth, blur, currentPlayer) {
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

        DrawUtils.drawImage(ctxTmp, this.imageLoader.get(imageLoc), caseX, caseY, caseWidth, caseHeight, null, null, null, null, eraseBelow, angle);
      }

      DrawUtils.drawImageData(ctx, canvasTmp, Math.floor((this.canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, caseHeight * this.grid.height, Math.floor((this.canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, caseHeight * this.grid.height);
      ctxTmp.filter = "none";
    }

    if(this.snakes.length > 1) {
      this.drawSnakeInfos(ctx, totalWidth, caseWidth, caseHeight, currentPlayer);
    }
  }
};

GameUI.prototype.drawSnakeInfos = function(ctx, totalWidth, caseWidth, caseHeight, currentPlayer) {
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
  
      DrawUtils.drawText(ctx, ((this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) ? i18next.t("engine.playerMin") + numPlayer : i18next.t("engine.aiMin") + numAI) + "\n× " + this.snakes[i].score, "rgb(255, 255, 255)", Math.round(caseHeight / 2), GameConstants.Setting.FONT_FAMILY, null, null, caseX, caseY - Math.round(caseHeight / 1.75), false, true);
  
      if((currentPlayer == i && this.countBeforePlay >= 0 && (this.currentPlayer != null || (this.isFilterHueAvailable && this.snakes.length > 2)) || (!this.isFilterHueAvailable && this.snakes.length > 1))) {
        DrawUtils.drawArrow(ctx, caseX + (caseWidth / 2), caseY - caseHeight * 2, caseX + (caseWidth / 2), caseY - 5);
      }
    }
  }
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = GameUI;
}