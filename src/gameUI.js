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
import GameUtils from "./gameUtils";
import GameConstants from "./constants";
import Position from "./position";
import GameRanking from "./gameRanking";
import { ImageLoader, Button, ButtonImage, NotificationMessage, Utils, Menu, Label, ProgressBar, Constants } from "jsgametools";
Constants.Setting.FONT_FAMILY = "DELIUS";

export default class GameUI {
  constructor(controller, appendTo, canvasWidth, canvasHeight, displayFPS, outputType, settings) {
    // Assets loader
    this.imageLoader;
    this.assetsLoaded = false;
    // Game settings
    this.controller = controller;
    this.appendTo = appendTo;
    this.displayFPS = displayFPS == undefined ? false : displayFPS;
    this.outputType = outputType == undefined ? GameConstants.OutputType.GRAPHICAL : outputType;
    this.outputType = settings && settings.textOutput ? GameConstants.OutputType.TEXT : this.outputType;
    this.disableAnimation = settings && !settings.enableAnimations;
    this.renderBlur = settings && settings.renderBlur;
    this.graphicSkin = (settings && settings.graphicSkin) || "flat";
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
    this.pingLatency = -1;
    // Menus state variables
    this.menu = new Menu(null, this.renderBlur);
    this.confirmReset = false;
    this.confirmExit = false;
    this.getInfos = false;
    this.getInfosGame = false;
    this.getAdvancedInfosGame = false;
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
    this.timerToDisplay = null;
    this.bestScoreToDisplay = null;
    this.isFilterHueAvailable = Utils.isFilterHueAvailable();
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
    this.btnAdvanced;
    this.btnInfosGame;
    this.btnTopArrow;
    this.btnRightArrow;
    this.btnLeftArrow;
    this.btnBottomArrow;
    this.btnExitFullScreen;
    this.btnEnterFullScreen;
    this.btnStartGame;
    this.btnRank;
    // Notification
    this.notificationMessage;
    // Label
    this.labelMenus;
    // Progress bar
    this.progressBarLoading = new ProgressBar(null, null, this.canvasWidth / 4, 25, null, null, null, 0.5, this.disableAnimation, "center");

    this.init();
  }

  init() {
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
      this.btnAdvanced = new Button(i18next.t("engine.infosGameAdvanced"), null, null, "center", "#3498db", "#246A99", "#184766");
      this.btnTopArrow = new ButtonImage("assets/images/up.png", 64, 92, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
      this.btnRightArrow = new ButtonImage("assets/images/right.png", 0, 46, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
      this.btnLeftArrow = new ButtonImage("assets/images/left.png", 128, 46, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
      this.btnBottomArrow = new ButtonImage("assets/images/bottom.png", 64, 0, "right", "bottom", 64, 64, "rgba(255, 255, 255, 0.25)", "rgba(149, 165, 166, 0.25)");
      this.btnExitFullScreen = new Button(i18next.t("engine.exitFullScreen"), null, null, "center", "#3498db", "#246A99", "#184766");
      this.btnEnterFullScreen = new Button(i18next.t("engine.enterFullScreen"), null, null, "center", "#3498db", "#246A99", "#184766");
      this.btnStartGame = new Button(i18next.t("engine.servers.startGame"), null, null, "center", "#3498db", "#246A99", "#184766");
      this.labelMenus = new Label("", null, null, GameConstants.Setting.FONT_SIZE, GameConstants.Setting.FONT_FAMILY, "white", "center");

      this.btnFullScreen.setClickAction(() => {
        this.toggleFullscreen();
        this.pause();
      });

      this.btnPause.setClickAction(() => {
        this.pause();
      });

      this.btnRank.setClickAction(() => {
        if(this.gameRanking.closing || this.gameRanking.closed) {
          this.gameRanking.open();
        } else {
          this.gameRanking.close();
        }
      });

      this.btnTopArrow.setClickAction(() => {
        this.controller.key(GameConstants.Key.UP);
      });

      this.btnBottomArrow.setClickAction(() => {
        this.controller.key(GameConstants.Key.BOTTOM);
      });

      this.btnLeftArrow.setClickAction(() => {
        this.controller.key(GameConstants.Key.LEFT);
      });

      this.btnRightArrow.setClickAction(() => {
        this.controller.key(GameConstants.Key.RIGHT);
      });
    }
    
    this.setIntervalCountFPS();

    document.addEventListener("keydown", (evt) => {
      if(!this.killed) {
        const keyCode = evt.keyCode;
    
        if(keyCode == 90 || keyCode == 87) keyCode = GameConstants.Key.UP; // W or Z
        if(keyCode == 65 || keyCode == 81) keyCode = GameConstants.Key.LEFT; // A or Q
        if(keyCode == 83) keyCode = GameConstants.Key.BOTTOM; // S
        if(keyCode == 68) keyCode = GameConstants.Key.RIGHT; // D
    
        if(!this.paused) {
          if(keyCode == GameConstants.Key.ENTER) {
            this.pause();
          } else {
            this.controller.key(keyCode);
          }
        } else if(this.countBeforePlay < 0) {
          this.lastKeyMenu = keyCode;
        }
      
        evt.preventDefault();
      }
    });

    window.addEventListener("resize", () => {
      this.autoResizeCanvas();
    }, true);

    this.autoResizeCanvas();
    this.loadAssets();
    this.startDraw();
  }

  autoResizeCanvas() {
    if(this.outputType == GameConstants.OutputType.GRAPHICAL && !this.killed) {
      Utils.autoResizeCanvas(this.canvas, this.canvasWidth, this.canvasHeight);
    }
  }

  setIntervalCountFPS() {
    this.clearIntervalCountFPS();

    this.intervalCountFPS = window.setInterval(() => {
      this.countFPS();
    }, 1000);
  }

  countFPS() {
    if(this.lastFrame > 0) this.currentFPS = this.frame - this.lastFrame;
    this.lastFrame = this.frame;
  }

  clearIntervalCountFPS() {
    clearInterval(this.intervalCountFPS);
  }

  getNBPlayer(type) {
    return this.controller.getNBPlayer(type);
  }

  getPlayer(num, type) {
    return this.controller.getPlayer(num, type);
  }

  reset() {
    this.controller && this.controller.reset();
  }

  start() {
    this.controller && this.controller.start();
  }

  forceStart() {
    this.controller && this.controller.forceStart();
  }

  stop() {
    this.controller && this.controller.stop();
  }

  pause() {
    this.controller && this.controller.pause();
  }

  kill() {
    this.controller && this.controller.kill();
  }

  exit() {
    this.controller && this.controller.exit();
  }

  tick() {
    this.controller && this.controller.tick();
  }

  setKill() {
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
        this.canvas.width = 0;
        this.canvas.height = 0;
        this.appendTo.removeChild(this.canvas);
        this.canvas = null;
        this.canvasCtx = null;
        this.imageLoader.clear();
      }
    }
  }

  toggleFullscreen() {
    if(this.outputType == GameConstants.OutputType.GRAPHICAL && !this.killed) {
      Utils.toggleFullscreen(this.canvas);
    
      const onfullscreenchange = () => {
        if(this.outputType == GameConstants.OutputType.GRAPHICAL && !this.killed) {
          if(document.fullscreenElement == this.canvas) {
            this.fullscreen = true;
          } else {
            this.fullscreen = false;
          }

          if(document.fullscreenElement == this.canvas && typeof(screen.orientation) !== "undefined" && typeof(screen.orientation.lock) !== "undefined") {
            screen.orientation.lock("landscape").catch(() => {});
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
  }

  loadAssets() {
    if(!this.errorOccurred && this.outputType != GameConstants.OutputType.TEXT) {
      this.imageLoader.load(["assets/images/skin/" + this.graphicSkin + "/snake_4.png", "assets/images/skin/" + this.graphicSkin + "/snake_3.png", "assets/images/skin/" + this.graphicSkin + "/snake_2.png", "assets/images/skin/" + this.graphicSkin + "/snake.png", "assets/images/skin/" + this.graphicSkin + "/body_4_end.png", "assets/images/skin/" + this.graphicSkin + "/body_3_end.png", "assets/images/skin/" + this.graphicSkin + "/body_2_end.png", "assets/images/skin/" + this.graphicSkin + "/body_end.png", "assets/images/skin/" + this.graphicSkin + "/body_2.png", "assets/images/skin/" + this.graphicSkin + "/body.png", "assets/images/skin/" + this.graphicSkin + "/wall.png", "assets/images/skin/" + this.graphicSkin + "/fruit.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_1.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_2.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_3.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_4.png", "assets/images/pause.png", "assets/images/fullscreen.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead_4.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead_3.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead_2.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead.png", "assets/images/up.png", "assets/images/left.png", "assets/images/right.png", "assets/images/bottom.png", "assets/images/trophy.png", "assets/images/trophy_silver.png", "assets/images/trophy_bronze.png", "assets/images/clock.png", "assets/images/skin/" + this.graphicSkin + "/fruit_gold.png", "assets/images/ranking.png", "assets/images/skin/flat/fruit.png"], () => {
        if(this.imageLoader.hasError) {
          this.errorOccurred = true;
        } else {
          this.assetsLoaded = true;
          this.btnFullScreen.loadImage(this.imageLoader);
          this.btnPause.loadImage(this.imageLoader);
          this.btnRank.loadImage(this.imageLoader);
          this.btnTopArrow.loadImage(this.imageLoader);
          this.btnBottomArrow.loadImage(this.imageLoader);
          this.btnLeftArrow.loadImage(this.imageLoader);
          this.btnRightArrow.loadImage(this.imageLoader);
          this.start();
        }
      }, this);
    } else if(!this.errorOccurred && this.outputType == GameConstants.OutputType.TEXT) {
      this.assetsLoaded = true;
      this.start();
    }
  }

  startDraw() {
    requestAnimationFrame(() => {
      if(!this.killed) {
        if(!document.hasFocus() && !this.paused) {
          this.controller.pause();
        }
    
        this.draw();
        this.lastTime = Date.now();
        this.frame++;

        if((!this.paused && !this.onlineMode) || this.onlineMode) {
          this.offsetFrame += (Date.now() - this.lastFrameTime);
          this.lastFrameTime = Date.now();
        }

        this.startDraw();
      }
    });
  }

  draw() {
    if(this.outputType == GameConstants.OutputType.TEXT && !this.killed) {
      if(this.grid != null) {
        this.textarea.style.width = this.grid.width * 16.5 + "px";
        this.textarea.style.height = this.grid.height * 16 + 100 + "px";
      }

      this.textarea.innerHTML = this.toString();
    } else if(this.outputType == GameConstants.OutputType.GRAPHICAL && !this.killed) {
      const ctx = this.canvasCtx;
      let displayBestScore = false;
      const currentPlayer = this.controller.getCurrentPlayer();

      this.fontSize = GameConstants.Setting.FONT_SIZE;
      this.headerHeight = GameConstants.Setting.HEADER_HEIGHT_DEFAULT;

      if(this.canvas.width <= GameConstants.Setting.CANVAS_WIDTH / 1.25) {
        this.fontSize /= 1.25;
        this.headerHeight = GameConstants.Setting.HEADER_HEIGHT_DEFAULT / 1.25;
      } else if(this.canvas.width >= GameConstants.Setting.CANVAS_WIDTH * 1.5) {
        this.fontSize *= 1.25;
        this.headerHeight = GameConstants.Setting.HEADER_HEIGHT_DEFAULT * 1.25;
      }

      Constants.Setting.FONT_SIZE = this.fontSize;
      this.labelMenus.size = this.fontSize;
      
      if(this.notificationMessage) {
        this.notificationMessage.fontSize = this.fontSize;
        this.notificationMessage.fontSizeInitial = this.fontSize;
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

      this.menu.disable();

      Utils.clear(ctx);
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

      if((this.gameRanking.closing || this.gameRanking.closed) && this.assetsLoaded) {
        this.btnRank.color = "rgba(0, 0, 0, 0)";
      } else if(this.assetsLoaded) {
        this.btnRank.color = this.btnRank.colorHover;
      }

      if(this.assetsLoaded && !this.errorOccurred) {
        if(this.bestScoreToDisplay != undefined && this.bestScoreToDisplay != null) {
          displayBestScore = true;
        }

        Utils.drawImage(ctx, this.imageLoader.get("assets/images/skin/flat/fruit.png"), 5, 5, this.headerHeight * 0.85 * (displayBestScore ? 0.5 : 1), this.headerHeight * 0.85 * (displayBestScore ? 0.5 : 1));

        if(this.snakes != null && this.snakes.length == 1) {
          Utils.drawText(ctx, "× " + this.snakes[0].score, "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
        } else {
          Utils.drawText(ctx, i18next.t("engine.num") + (this.numFruit != null ? this.numFruit : "???"), "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
        }

        if(displayBestScore) {
          Utils.drawImage(ctx, this.imageLoader.get("assets/images/trophy.png"), 5, 8 + this.headerHeight * 0.425, this.headerHeight * 0.425, this.headerHeight * 0.425);
          Utils.drawText(ctx, this.bestScoreToDisplay, "black", this.headerHeight * 0.43 * (displayBestScore ? 0.75 : 1), GameConstants.Setting.FONT_FAMILY, "default", "default", this.headerHeight * 0.9 * (displayBestScore ? 0.58 : 1), this.headerHeight * 0.425 + this.headerHeight * 0.67 * (displayBestScore ? 0.63 : 1));
        }

        if(this.grid != null && (!this.grid.maze || (this.grid.maze && (!this.paused || this.gameOver || this.gameFinished)))) {
          let caseHeight = Math.floor((this.canvas.height - this.headerHeight) / this.grid.height);
          let caseWidth = Math.floor(this.canvas.width / this.grid.width);
          caseHeight = caseHeight > caseWidth ? caseWidth : caseHeight;
          caseWidth = caseWidth > caseHeight ? caseHeight : caseWidth;

          const totalWidth = caseWidth * this.grid.width;

          for(let i = 0; i < this.grid.height; i++) {
            for(let j = 0; j < this.grid.width; j++) {
              const caseX = Math.floor(j * caseWidth + ((this.canvas.width - totalWidth) / 2));
              const caseY = this.headerHeight + i * caseHeight;

              if((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
                ctx.fillStyle = "rgba(127, 140, 141, 0.75)";
              } else {
                ctx.fillStyle = "rgba(44, 62, 80, 0.75)";
              }

              ctx.fillRect(caseX, caseY, caseWidth, caseHeight);
              Utils.drawImage(ctx, this.imageLoader.get("assets/images/skin/" + this.graphicSkin + "/" + this.grid.getImageCase(new Position(j, i))), caseX, caseY, caseWidth, caseHeight);
            }
          }

          this.drawSnake(ctx, caseWidth, caseHeight, totalWidth, currentPlayer);
        }

        if(this.timerToDisplay != undefined && this.timerToDisplay != null && !isNaN(this.timerToDisplay) && this.timerToDisplay >= 0) {
          const sizesTimer = Utils.drawText(ctx, "" + GameUtils.secondsFormat(this.timerToDisplay), "rgba(0, 0, 0, 0.5)", this.fontSize, GameConstants.Setting.FONT_FAMILY, "right", "default", null, this.headerHeight + 15 + this.headerHeight * 0.475);
          Utils.drawImage(ctx, this.imageLoader.get("assets/images/clock.png"), sizesTimer["x"] - this.headerHeight * 0.64 - 10, this.headerHeight + 15, this.headerHeight * 0.64, this.headerHeight * 0.64);
        }
      } else if(!this.assetsLoaded) {
        const percentLoaded = Math.floor((100 * Object.keys(this.imageLoader.images).length) / this.imageLoader.nbImagesToLoad);
        this.labelMenus.text = i18next.t("engine.loading") + "\n" + percentLoaded + "%";
        this.labelMenus.color = "white";
        this.progressBarLoading.percent = percentLoaded / 100;
        this.progressBarLoading.width = this.canvas.width / 4;
        this.menu.set(this.labelMenus, this.progressBarLoading);
      }

      if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && !this.notificationMessage.foreGround) {
        this.notificationMessage.draw(this);
      }

      if(this.snakes != null && (this.getNBPlayer(GameConstants.PlayerType.HUMAN) > 0 || this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) > 0) && (this.getNBPlayer(GameConstants.PlayerType.HUMAN) <= 1 || this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) <= 1 || this.currentPlayer != null) && !this.spectatorMode) {
        this.btnTopArrow.draw(this.canvasCtx);
        this.btnBottomArrow.draw(this.canvasCtx);
        this.btnRightArrow.draw(this.canvasCtx);
        this.btnLeftArrow.draw(this.canvasCtx);
      }

      if(this.snakes != null && this.snakes.length <= 1) {
        this.gameRanking.forceClose();
      }

      if(!this.gameFinished && !this.gameOver && this.assetsLoaded) {
        this.gameRanking.set(this.snakes, this.fontSize, this.headerHeight);
        this.gameRanking.draw(this.canvasCtx, this, currentPlayer);
      }

      this.disableAllButtons();

      if(this.searchingPlayers && this.lastTime > 0) {
        this.timeStart -= Math.max(0, Date.now() - this.lastTime);
      } else {
        this.timeStart = 0;
      }

      const nextGameText = (this.timeStart > 0 ? ("\n\n" + i18next.t("engine.servers.nextGameStart") + " " + GameUtils.millisecondsFormat(this.timeStart)) : "");

      if(this.exited) {
        this.labelMenus.text = i18next.t("engine.exited");
        this.labelMenus.color = "white";
        this.fullscreen ? this.menu.set(this.labelMenus, this.btnExitFullScreen) : this.menu.set(this.labelMenus);
        
        this.btnExitFullScreen.setClickAction(() => {
          this.toggleFullscreen();
        });
      } else if(this.errorOccurred) {
        this.labelMenus.text = this.imageLoader.hasError ? i18next.t("engine.errorLoading") : i18next.t("engine.error");
        this.labelMenus.color = "#E74C3C";
        this.menu.set(this.labelMenus, this.btnQuit);
        
        this.btnQuit.setClickAction(() => {
          this.confirmExit = false;
          this.exit();
        });
      } else if(this.getInfosGame) {
        if(this.getAdvancedInfosGame && (this.grid && (this.grid.seedGrid || this.grid.seedGame))) {
          this.labelMenus.text = (this.grid.seedGrid ? i18next.t("engine.seedGrid") + "\n" + this.grid.seedGrid : "") + (this.grid.seedGame ? "\n" + i18next.t("engine.seedGame") + "\n" + this.grid.seedGame : "");
          this.menu.set(this.labelMenus, this.btnOK);
          
          this.btnOK.setClickAction(() => {
            this.getAdvancedInfosGame = false;
          });
        } else {
          this.labelMenus.text = (this.snakes != null && this.snakes.length <= 1 && !this.spectatorMode ? i18next.t("engine.player") + " " + (((this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HUMAN && !this.spectatorMode) || (this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HYBRID_HUMAN_AI)) ? i18next.t("engine.playerHuman") : i18next.t("engine.playerAI")) : "") + (this.getNBPlayer(GameConstants.PlayerType.AI) > 0 ? "\n" +  i18next.t("engine.aiLevel") + " " + i18next.t("engine.aiLevelList." + this.getPlayer(1, GameConstants.PlayerType.AI).getAILevelText()) : "") + "\n" + i18next.t("engine.sizeGrid") + " " + (this.grid != null && this.grid.width ? this.grid.width : "???") + "×" + (this.grid != null && this.grid.height ? this.grid.height : "???") + "\n" + i18next.t("engine.currentSpeed") + " " + (this.initialSpeed != null ? this.initialSpeed : "???") + (this.snakes != null && this.snakes.length <= 1 && this.progressiveSpeed ? "\n" + i18next.t("engine.progressiveSpeed") : "") + (this.grid != null && !this.grid.maze && this.snakes != null && this.snakes[0].player == GameConstants.PlayerType.HYBRID_HUMAN_AI ? "\n" + i18next.t("engine.assistAI") : "") + (this.grid != null && this.grid.maze ? "\n" + i18next.t("engine.mazeModeMin") : "") + (this.onlineMode ? "\n" + i18next.t("engine.onlineMode") : "") + (this.pingLatency > -1 ? "\n" + i18next.t("engine.ping") + " " + this.pingLatency + " ms" : "");

          (this.grid && (this.grid.seedGrid || this.grid.seedGame)) ? this.menu.set(this.labelMenus, this.btnAdvanced, this.btnOK) : this.menu.set(this.labelMenus, this.btnOK);
          
          this.btnOK.setClickAction(() => {
            this.getInfosGame = false;
          });
    
          this.btnAdvanced.setClickAction(() => {
            this.getAdvancedInfosGame = true;
          });
        }
        
        this.labelMenus.color = "white";
      } else if(this.getInfos) {
        this.labelMenus.text = i18next.t("engine.aboutScreen.title") + "\nwww.eliastiksofts.com\n\n" + i18next.t("engine.aboutScreen.versionAndDate", { version: GameConstants.Setting.APP_VERSION, date: new Intl.DateTimeFormat(i18next.language).format(new Date(GameConstants.Setting.DATE_VERSION)), interpolation: { escapeValue: false } });
        this.labelMenus.color = "white";
        this.menu.set(this.labelMenus, this.btnInfosGame, this.btnOK);
        
        this.btnInfosGame.setClickAction(() => {
          this.getInfosGame = true;
        });

        this.btnOK.setClickAction(() => {
          this.getInfos = false;
        });
      } else if(this.confirmExit) {
        this.labelMenus.text = i18next.t("engine.exitConfirm");
        this.labelMenus.color = "#E74C3C";
        this.menu.set(this.labelMenus, this.btnNo, this.btnYes);
        
        this.btnYes.setClickAction(() => {
          this.confirmExit = false;
          this.exit();
        });
        
        this.btnNo.setClickAction(() => {
          this.confirmExit = false;
        });
      } else if(this.assetsLoaded && this.countBeforePlay >= 0) {
        if(this.snakes != null && ((this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HUMAN) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) || (this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI) != null) || (this.currentPlayer != null && this.snakes.length > 1))) {
          let playerHuman, colorName, colorRgb;

          if(this.currentPlayer != null) {
            playerHuman = this.getPlayer(this.currentPlayer, GameConstants.PlayerType.HUMAN);
          } else if(this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) {
            playerHuman = this.getPlayer(1, GameConstants.PlayerType.HUMAN);
          } else {
            playerHuman = this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI);
          }

          if(playerHuman != null) {
            colorName = GameUtils.hslToName(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color), GameConstants.Setting.IMAGE_SNAKE_SATURATION, GameConstants.Setting.IMAGE_SNAKE_VALUE);
            colorRgb = GameUtils.hsvToRgb(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color) / 360, GameConstants.Setting.IMAGE_SNAKE_SATURATION / 100, GameConstants.Setting.IMAGE_SNAKE_VALUE / 100);
          }

          if(this.countBeforePlay > 0) {
            this.labelMenus.text = "" + this.countBeforePlay;
          } else {
            this.labelMenus.text = i18next.t("engine.ready");
          }

          this.labelMenus.text += (playerHuman != null ? ("\n" + (this.isFilterHueAvailable && colorName != "???" && this.graphicSkin == "flat" ? i18next.t("engine.colorPlayer", { color: colorName }) : i18next.t("engine.arrowPlayer"))) : "");
          this.labelMenus.color = (this.isFilterHueAvailable && colorName != "???" && this.graphicSkin == "flat" ? ["white", "rgb(" + colorRgb[0] + ", " + colorRgb[1] + ", " + colorRgb[2] + ")"] : ["white", "#3498db"]);
        } else {
          if(this.countBeforePlay > 0) {
            this.labelMenus.text = "" + this.countBeforePlay;
          } else {
            this.labelMenus.text = i18next.t("engine.ready");
          }

          this.labelMenus.color = "white";
        }

        !this.fullscreen ? this.menu.set(this.labelMenus, this.btnEnterFullScreen) : this.menu.set(this.labelMenus);
          
        this.btnEnterFullScreen.setClickAction(() => {
          this.toggleFullscreen();
        });
      } else if(this.confirmReset && !this.gameOver) {
        this.labelMenus.text = i18next.t("engine.resetConfirm");
        this.labelMenus.color = "#E74C3C";
        this.menu.set(this.labelMenus, this.btnNo, this.btnYes);
        
        this.btnYes.setClickAction(() => {
          this.confirmReset = false;
          this.reset();
        });

        this.btnNo.setClickAction(() => {
          this.confirmReset = false;
        });
      } else if(this.gameFinished) {
        this.labelMenus.text = (this.grid.maze && this.gameMazeWin) ? i18next.t("engine.mazeWin") : i18next.t("engine.gameFinished") + nextGameText;
        this.labelMenus.color = (this.grid.maze && this.gameMazeWin) ? "#2ecc71" : "white";
        this.enableRetry ? this.menu.set(this.labelMenus, this.btnRetry, this.btnQuit) : this.menu.set(this.labelMenus, this.btnQuit);
        
        this.btnRetry.setClickAction(() => {
          this.reset();
        });

        this.btnQuit.setClickAction(() => {
          this.confirmExit = true;
        });
      } else if(this.scoreMax && this.snakes.length <= 1) {
        this.labelMenus.text = i18next.t("engine.scoreMax") + nextGameText;
        this.labelMenus.color = "#2ecc71";
        this.enableRetry ? this.menu.set(this.labelMenus, this.btnRetry, this.btnQuit) : (this.fullscreen ? this.menu.set(this.labelMenus, this.btnExitFullScreen) : this.menu.set(this.labelMenus));
        
        this.btnRetry.setClickAction(() => {
          this.reset();
        });

        this.btnQuit.setClickAction(() => {
          this.confirmExit = true;
        });

        this.btnExitFullScreen.setClickAction(() => {
          this.toggleFullscreen();
        });
      } else if(this.gameOver && this.snakes.length <= 1) {
        this.labelMenus.text = i18next.t("engine.gameOver") + nextGameText;
        this.labelMenus.color = "#E74C3C";
        this.enableRetry && this.snakes[0] && !this.snakes[0].autoRetry ? this.menu.set(this.labelMenus, this.btnRetry, this.btnQuit) : (this.fullscreen ? this.menu.set(this.labelMenus, this.btnExitFullScreen) : this.menu.set(this.labelMenus));

        if(this.snakes[0] && this.snakes[0].autoRetry && this.timeoutAutoRetry == null) {
          this.timeoutAutoRetry = setTimeout(() => {
            this.reset();
            this.timeoutAutoRetry = null;
          }, 500);
        } else {
          this.btnRetry.setClickAction(() => {
            this.reset();
          });

          this.btnQuit.setClickAction(() => {
            this.confirmExit = true;
          });

          this.btnExitFullScreen.setClickAction(() => {
            this.toggleFullscreen();
          });
        }
      } else if(this.assetsLoaded && this.searchingPlayers) {
        this.labelMenus.text = i18next.t("engine.servers.waitingPlayers") + "\n" + this.playerNumber + "/" + this.maxPlayers + (this.timeStart > 0 ? ("\n\n" + i18next.t("engine.servers.gameStart") + " " + GameUtils.millisecondsFormat(this.timeStart)) : "");
        this.labelMenus.color = "white";
        this.onlineMaster ? this.menu.set(this.labelMenus, this.btnStartGame, this.btnQuit) : this.menu.set(this.labelMenus, this.btnQuit);
        
        this.btnQuit.setClickAction(() => {
          this.confirmExit = true;
        });

        this.btnStartGame.setClickAction(() => {
          this.forceStart();
        });
      } else if(this.paused && !this.gameOver && this.assetsLoaded) {
        this.labelMenus.text = i18next.t("engine.pause");
        this.labelMenus.color = "white";
        this.enablePause ? (this.enableRetry && this.enableRetryPauseMenu ? this.menu.set(this.labelMenus, this.btnContinue, this.btnRetry, this.btnAbout, this.btnQuit) : this.menu.set(this.labelMenus, this.btnContinue, this.btnAbout, this.btnQuit)) : (this.menu.set(this.labelMenus, this.btnContinue, this.btnAbout));
        
        this.btnContinue.setClickAction(() => {
          this.start();
        });

        this.btnRetry.setClickAction(() => {
          this.confirmReset = true;
        });

        this.btnQuit.setClickAction(() => {
          this.confirmExit = true;
        });

        this.btnAbout.setClickAction(() => {
          this.getInfos = true;
        });
      } else if(this.assetsLoaded) {
        this.btnFullScreen.enable();

        if(this.snakes != null) {
          for(let i = 0; i < this.snakes.length; i++) {
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

      this.labelMenus.fontSize = this.fontSize;
      this.menu.draw(this.canvasCtx);

      if((this.gameFinished || this.gameOver) && this.snakes != null && this.snakes.length > 1) {
        this.gameRanking.open();
        this.gameRanking.draw(this.canvasCtx, this, currentPlayer);
      }
    
      if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && this.notificationMessage.foreGround) {
        this.notificationMessage.enableCloseButton();
        this.notificationMessage.draw(this.canvasCtx);
      }

      if(this.displayFPS) {
        Utils.drawText(ctx, this.getDebugText(), "rgba(255, 255, 255, 0.85)", this.fontSize / 1.5, GameConstants.Setting.FONT_FAMILY, "right", "bottom", null, null, true);
      }

      if(this.spectatorMode) {
        Utils.drawText(ctx, i18next.t("engine.servers.spectatorMode"), "rgba(255, 255, 255, 0.5)", this.fontSize, GameConstants.Setting.FONT_FAMILY, "left", "bottom", null, null, true);
      }
    }
  }

  setDisplayFPS(display) {
    this.displayFPS = display;
  }

  disableAllButtons() {
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
  }

  setNotification(notification) {
    if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage) {
      this.notificationMessage.close();
    }

    this.notificationMessage = notification;

    if(this.notificationMessage instanceof NotificationMessage && this.disableAnimation) {
      this.notificationMessage.disableAnimation = true;
    }

    if(this.notificationMessage) this.notificationMessage.open();
  }

  setTimeToDisplay(time) {
    this.timerToDisplay = time;
  }

  setBestScore(score) {
    if(score != undefined && score != null && score.trim() != "") {
      this.bestScoreToDisplay = score;
    }
  }

  getDebugText() {
    return i18next.t("engine.debug.fps") + " " + this.currentFPS + " / " + i18next.t("engine.debug.frames") + " " + this.frame + " / " + i18next.t("engine.debug.ticks") + " " + this.ticks + " / " + i18next.t("engine.debug.speed") + " " + this.speed + (this.pingLatency > -1 ? " / " + i18next.t("engine.ping") + " " + this.pingLatency + " ms" : "");
  }

  toString() {
    return (this.grid != null ? this.grid.toString() : "") + "\n" + (this.snakes != null && this.snakes.length <= 1 ? i18next.t("engine.score") + " : " + (this.snakes != null ? this.snakes[0].score : "") : "") + (this.displayFPS ? "\n" + this.getDebugText() : "") + (this.gameOver && !this.scoreMax ? "\n" + i18next.t("engine.gameOver") : "") + (this.scoreMax ? "\n" + i18next.t("engine.scoreMax") : "") + (!this.gameOver && this.paused ? "\n" + i18next.t("engine.debug.paused") : "") + (this.countBeforePlay > 0 ? "\n" + this.countBeforePlay : "");
  }

  drawSnake(ctx, caseWidth, caseHeight, totalWidth, currentPlayer) {
    if(this.snakes != null) {
      const canvasTmp = document.createElement("canvas");
      canvasTmp.width = this.canvas.width;
      canvasTmp.height = this.canvas.height;
      const ctxTmp = canvasTmp.getContext("2d");
    
      for(let j = 0; j < this.snakes.length; j++) {
        ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);

        if(this.snakes[j].color != undefined) {
          ctxTmp.filter = "hue-rotate(" + this.snakes[j].color + "deg)";
        }

        for(let i = this.snakes[j].length() - 1; (i >= -1 && this.snakes[j].length() > 1) || i >= 0; i--) { // -1 == tail
          let position;

          if(i == -1) {
            position = this.snakes[j].get(this.snakes[j].length() - 1);
          } else {
            position = this.snakes[j].get(i);
          }

          let caseX = 0;
          let caseY = 0;
          let direction = position.direction;
          let angle = 0;
          let imageLoc = "";
          let eraseBelow = true;

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
            let offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER); // percentage of the animation
            offset = (offset > 1 ? 1 : offset);
            const offsetX = (caseWidth * offset) - caseWidth;
            const offsetY = (caseHeight * offset) - caseHeight;

            let currentPosition = position;
            let graphicDirection;

            if(i == 0) {
              if(this.snakes[j].length() > 1) {
                graphicDirection = this.snakes[j].getGraphicDirection(1);
              } else {
                graphicDirection = this.snakes[j].getGraphicDirection(0);
              }
            } else if(i == -1) {
              graphicDirection = this.snakes[j].getGraphicDirectionFor(this.snakes[j].getTailPosition(), this.snakes[j].lastTail, this.snakes[j].get(this.snakes[j].length() - 2));
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

          const posX = position.x;
          const posY = position.y;
          caseX += Math.floor(posX * caseWidth + ((this.canvas.width - totalWidth) / 2));
          caseY += this.headerHeight + posY * caseHeight;

          if(i == 0) {
            if(this.snakes[j].gameOver && !this.snakes[j].scoreMax) {
              switch(direction) {
                case GameConstants.Direction.BOTTOM:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead.png";
                  break;
                case GameConstants.Direction.RIGHT:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead_2.png";
                  break;
                case GameConstants.Direction.UP:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead_3.png";
                  break;
                case GameConstants.Direction.LEFT:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead_4.png";
                  break;
              }
            } else {
              switch(direction) {
                case GameConstants.Direction.BOTTOM:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake.png";
                  break;
                case GameConstants.Direction.RIGHT:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_2.png";
                  break;
                case GameConstants.Direction.UP:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_3.png";
                  break;
                case GameConstants.Direction.LEFT:
                  imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_4.png";
                  break;
              }
            }
          } else if(i == -1) {
            switch(direction) {
              case GameConstants.Direction.BOTTOM:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_end.png";
                break;
              case GameConstants.Direction.RIGHT:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_2_end.png";
                break;
              case GameConstants.Direction.UP:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_3_end.png";
                break;
              case GameConstants.Direction.LEFT:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_4_end.png";
                break;
            }
          } else {
            switch(direction) {
              case GameConstants.Direction.UP:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body.png";
                break;
              case GameConstants.Direction.BOTTOM:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body.png";
                break;
              case GameConstants.Direction.RIGHT:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_2.png";
                break;
              case GameConstants.Direction.LEFT:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_2.png";
                break;
              case GameConstants.Direction.ANGLE_1:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_1.png";
                break;
              case GameConstants.Direction.ANGLE_2:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_2.png";
                break;
              case GameConstants.Direction.ANGLE_3:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_3.png";
                break;
              case GameConstants.Direction.ANGLE_4:
                imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_4.png";
                break;
            }
          }

          Utils.drawImage(ctxTmp, this.imageLoader.get(imageLoc), caseX, caseY, caseWidth, caseHeight, null, null, null, null, eraseBelow, angle);
        }

        Utils.drawImageData(ctx, canvasTmp, Math.floor((this.canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, caseHeight * this.grid.height, Math.floor((this.canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, caseHeight * this.grid.height);
        ctxTmp.filter = "none";
      }

      canvasTmp.width = 0;
      canvasTmp.height = 0;

      if(this.snakes.length > 1) {
        this.drawSnakeInfos(ctx, totalWidth, caseWidth, caseHeight, currentPlayer);
      }
    }
  }

  drawSnakeInfos(ctx, totalWidth, caseWidth, caseHeight, currentPlayer) {
    let numPlayer = 0;
    let numAI = 0;

    for(let i = 0; i < this.snakes.length; i++) {
      if(this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
        numPlayer++;
      } else {
        numAI++;
      }

      const position = this.snakes[i].get(0);

      if(position != null) {
        const posX = position.x;
        const posY = position.y;
        let caseX = Math.floor(posX * caseWidth + ((this.canvas.width - totalWidth) / 2));
        let caseY = this.headerHeight + posY * caseHeight;
    
        if(!this.disableAnimation && !this.snakes[i].gameOver) {
          let offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER);
          offset = (offset > 1 ? 1 : offset);
          const offsetX = (caseWidth * offset) - caseWidth;
          const offsetY = (caseHeight * offset) - caseHeight;
    
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
    
        Utils.drawText(ctx, ((this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) ? i18next.t("engine.playerMin") + numPlayer : i18next.t("engine.aiMin") + numAI) + "\n× " + this.snakes[i].score, "rgb(255, 255, 255)", Math.round(caseHeight / 2), GameConstants.Setting.FONT_FAMILY, null, null, caseX, caseY - Math.round(caseHeight / 1.75), false, true);
    
        if(currentPlayer == i && this.countBeforePlay >= 0 && (currentPlayer != null || (this.isFilterHueAvailable && this.snakes.length > 2) || (!this.isFilterHueAvailable && this.snakes.length > 1))) {
          Utils.drawArrow(ctx, caseX + (caseWidth / 2), caseY - caseHeight * 2, caseX + (caseWidth / 2), caseY - 5);
        }
      }
    }
  }
}