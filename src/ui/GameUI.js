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
import GameUtils from "../engine/GameUtils";
import GraphicsUtils from "./GraphicsUtils";
import GameConstants from "../engine/Constants";
import GameRanking from "./GameRanking";
import { ImageLoader, Button, ButtonImage, NotificationMessage, Utils, Menu, Label, ProgressBar, Constants, EasingFunctions } from "jsgametools";
import GridUI from "./GridUI";
import Header from "./Header";
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
    this.maxFPS = (settings && settings.maxFPS) || -1;
    // UI variables
    this.lastKey = -1;
    this.frame = 0;
    this.lastFrame = 0;
    this.offsetFrame = 0;
    this.lastFrameTime = 0;
    this.currentFPS = 0;
    this.engineLoading = false;
    // Swipe detection variables
    this.touchEventStartX;
    this.touchEventStartY;
    this.touchEventStartTimestamp;
    this.touchEventOffsetX = 0;
    this.touchEventOffsetY = 0;
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
    this.aiStuck = false;
    this.precAiStuck = false;
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
    // Components
    this.isFilterHueAvailable = Utils.isFilterHueAvailable();
    this.gameRanking = new GameRanking(this.snakes, null, null, null, GameConstants.Setting.HEADER_HEIGHT_DEFAULT, null, null, this.disableAnimation, this.imageLoader);
    this.header = new Header(GameConstants.Setting.HEADER_HEIGHT_DEFAULT, null, this.snakes, this.enablePause, null, null, null, this.gameRanking, this.bestScoreToDisplay, this.numFruit, this.imageLoader);
    this.gridUI = new GridUI(this.snakes, this.grid, this.speed, this.disableAnimation, this.graphicSkin, this.isFilterHueAvailable, this.header.height, this.imageLoader);
    this.progressBarLoading = new ProgressBar(null, null, this.canvasWidth / 4, 25, null, null, null, 0.5, this.disableAnimation, "center");
    this.notificationMessage;
    this.labelMenus;
    // DOM elements and others settings
    this.textarea;
    this.canvas;
    this.canvasCtx;
    this.canvasWidth = canvasWidth == undefined ? GameConstants.Setting.CANVAS_WIDTH : canvasWidth;
    this.canvasHeight = canvasHeight == undefined ? GameConstants.Setting.CANVAS_HEIGHT : canvasHeight;
    this.fontSize = GameConstants.Setting.FONT_SIZE;
    this.timerToDisplay = null;
    this.bestScoreToDisplay = null;
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

      this.header.setButtons(this.btnFullScreen, this.btnPause, this.btnRank);

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
      
      if(this.canvas) {
        this.canvas.addEventListener("touchstart", event => {
          const changedTouches = event.changedTouches[0];
          const position = this.getTouchPos(this.canvas, changedTouches);

          if(!this.gameRanking.hovered) {
            this.touchEventStartX = position.x;
            this.touchEventStartY = position.y;
            this.touchEventStartTimestamp = performance.now();
          }
        });

        const touchSwipeEvent =  event => {
          const changedTouches = event.changedTouches[0];
          const position = this.getTouchPos(this.canvas, changedTouches);

          if(!this.gameRanking.hovered) {
            this.touchEventOffsetX += (position.x - this.touchEventStartX);
            this.touchEventOffsetY += (position.y - this.touchEventStartY);

            if(performance.now() - this.touchEventStartTimestamp >= 250) {
              this.touchEventOffsetX = 0;
              this.touchEventOffsetY = 0;
            }

            if(this.touchEventOffsetX < 0 && Math.abs(this.touchEventOffsetX) > 50) {
              this.controller.key(GameConstants.Key.LEFT);
            } else if(this.touchEventOffsetX > 0 && Math.abs(this.touchEventOffsetX) > 50) {
              this.controller.key(GameConstants.Key.RIGHT);
            } else if(this.touchEventOffsetY < 0 && Math.abs(this.touchEventOffsetY) > 50) {
              this.controller.key(GameConstants.Key.UP);
            } else if(this.touchEventOffsetY > 0 && Math.abs(this.touchEventOffsetY) > 50) {
              this.controller.key(GameConstants.Key.BOTTOM);
            }

            this.touchEventStartX = position.x;
            this.touchEventStartY = position.y;
          }
        };

        this.canvas.addEventListener("touchend", () => {
          this.touchEventOffsetX = 0;
          this.touchEventOffsetY = 0;
        });

        this.canvas.addEventListener("touchmove", event => {
          touchSwipeEvent(event);
          event.preventDefault();
        });
      }
    }
    
    this.setIntervalCountFPS();

    document.addEventListener("keydown", (evt) => {
      if(!this.killed) {
        let keyCode = evt.keyCode;
    
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
  
  getTouchPos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
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
      this.imageLoader.load(["assets/images/skin/" + this.graphicSkin + "/snake_4.png", "assets/images/skin/" + this.graphicSkin + "/snake_3.png", "assets/images/skin/" + this.graphicSkin + "/snake_2.png", "assets/images/skin/" + this.graphicSkin + "/snake.png", "assets/images/skin/" + this.graphicSkin + "/body_4_end.png", "assets/images/skin/" + this.graphicSkin + "/body_3_end.png", "assets/images/skin/" + this.graphicSkin + "/body_2_end.png", "assets/images/skin/" + this.graphicSkin + "/body_end.png", "assets/images/skin/" + this.graphicSkin + "/body_2.png", "assets/images/skin/" + this.graphicSkin + "/body.png", "assets/images/skin/" + this.graphicSkin + "/wall.png", "assets/images/skin/" + this.graphicSkin + "/fruit.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_1.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_2.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_3.png", "assets/images/skin/" + this.graphicSkin + "/body_angle_4.png", "assets/images/pause.png", "assets/images/fullscreen.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead_4.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead_3.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead_2.png", "assets/images/skin/" + this.graphicSkin + "/snake_dead.png", "assets/images/up.png", "assets/images/left.png", "assets/images/right.png", "assets/images/bottom.png", "assets/images/trophy.png", "assets/images/trophy_silver.png", "assets/images/trophy_bronze.png", "assets/images/clock.png", "assets/images/skin/" + this.graphicSkin + "/fruit_gold.png", "assets/images/ranking.png", "assets/images/skin/flat/fruit.png", "assets/images/skin/" + this.graphicSkin + "/unknown.png"], () => {
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
    requestAnimationFrame(time => this.beforeDraw(time));
  }

  beforeDraw(time) {
    if(!this.killed) {
      if(!document.hasFocus() && !this.paused && this.outputType != GameConstants.OutputType.TEXT) {
        this.controller.pause();
      }

      const offsetFrame = time - this.lastFrameTime;
      if(this.maxFPS < 1 || offsetFrame > 1000 / this.maxFPS) {
        this.lastFrameTime = time;
        this.frame++;
  
        if((!this.paused && !this.onlineMode) || this.onlineMode || this.gameOver || this.gameFinished) {
          this.offsetFrame += offsetFrame;
          const offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER);

          if((this.gameOver || this.gameFinished) && offset >= 0.95) {
            this.offsetFrame = 0;
            this.ticks++;
          }
        }
  
        this.draw();
        this.lastTime = Date.now();  
      }

      this.startDraw();
    }
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
      this.currentPlayer = this.controller.getCurrentPlayer();

      this.fontSize = GameConstants.Setting.FONT_SIZE;
      this.header.height = GameConstants.Setting.HEADER_HEIGHT_DEFAULT;

      if(this.canvas.width <= GameConstants.Setting.CANVAS_WIDTH / 1.25) {
        this.fontSize /= 1.25;
        this.header.height = GameConstants.Setting.HEADER_HEIGHT_DEFAULT / 1.25;
      } else if(this.canvas.width >= GameConstants.Setting.CANVAS_WIDTH * 1.5) {
        this.fontSize *= 1.25;
        this.header.height = GameConstants.Setting.HEADER_HEIGHT_DEFAULT * 1.25;
      }

      Constants.Setting.FONT_SIZE = this.fontSize;
      this.labelMenus.size = this.fontSize;
      
      if(this.notificationMessage) {
        this.notificationMessage.fontSize = this.fontSize;
        this.notificationMessage.fontSizeInitial = this.fontSize;
        this.notificationMessage.easingFunction = EasingFunctions.easeInOutCubic;
      }

      if(this.gameRanking) {
        this.gameRanking.fontSize = this.fontSize;
      }

      this.menu.disable();

      Utils.clear(ctx);
      ctx.fillStyle = "rgba(204, 207, 211, 1)";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.font = this.fontSize + "px " + GameConstants.Setting.FONT_FAMILY;

      if(this.assetsLoaded && this.engineLoading) {
        this.labelMenus.text = i18next.t("engine.loadingWorker");
        this.labelMenus.color = "white";
        this.menu.set(this.labelMenus);
      } else if(this.assetsLoaded && !this.errorOccurred) {
        this.header.set(this.snakes, this.imageLoader, this.bestScoreToDisplay, this.header.height, this.numFruit, this.enablePause);
        this.header.draw(ctx);

        if(this.grid != null && (!this.grid.maze || (this.grid.maze && (!this.paused || this.gameOver || this.gameFinished)))) {
          this.gridUI.set(this.snakes, this.grid, this.speed, this.offsetFrame, this.header.height, this.imageLoader, this.currentPlayer, this.gameFinished, this.countBeforePlay, this.spectatorMode, this.ticks, this.gameOver);
          this.gridUI.draw(ctx);
        }

        if(this.timerToDisplay != undefined && this.timerToDisplay != null && !isNaN(this.timerToDisplay) && this.timerToDisplay >= 0) {
          const sizesTimer = Utils.drawText(ctx, "" + GameUtils.secondsFormat(this.timerToDisplay), "rgba(0, 0, 0, 0.5)", Math.round(this.fontSize), GameConstants.Setting.FONT_FAMILY, "right", "default", null, Math.round(this.header.height + 15 + this.header.height * 0.475));
          Utils.drawImage(ctx, this.imageLoader.get("assets/images/clock.png", Math.round(this.header.height * 0.64), Math.round(this.header.height * 0.64)), Math.round(sizesTimer["x"] - this.header.height * 0.64 - 10), Math.round(this.header.height + 15), Math.round(this.header.height * 0.64), Math.round(this.header.height * 0.64));
        }
      } else if(!this.assetsLoaded) {
        const percentLoaded = Math.floor((100 * Object.keys(this.imageLoader.images).length) / this.imageLoader.nbImagesToLoad);
        this.labelMenus.text = i18next.t("engine.loading") + "\n" + percentLoaded + "%";
        this.labelMenus.color = "white";
        this.progressBarLoading.percent = percentLoaded / 100;
        this.progressBarLoading.width = this.canvas.width / 4;
        this.menu.set(this.labelMenus, this.progressBarLoading);
      }

      if(this.aiStuck && !this.precAiStuck) {
        this.precAiStuck = true;
        this.setNotification(new NotificationMessage(i18next.t("engine.aiStuck"), null, GameConstants.Setting.ERROR_NOTIF_COLOR, 10));
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

      if(!this.gameFinished && !this.gameOver && this.assetsLoaded && !this.engineLoading && !this.errorOccurred) {
        this.gameRanking.set(this.snakes, this.fontSize, this.header.height, this.currentPlayer, this.imageLoader, this.spectatorMode);
        this.gameRanking.draw(this.canvasCtx, this, this.currentPlayer);
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
      } else if(this.assetsLoaded && !this.engineLoading && this.countBeforePlay >= 0) {
        if(this.snakes != null && ((this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HUMAN) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) || (this.snakes.length > 1 && this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI) <= 1 && this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI) != null) || (this.currentPlayer != null && this.snakes.length > 1))) {
          let playerHuman, colorName, colorRgb;

          if(!this.spectatorMode) {
            if(this.currentPlayer != null && this.currentPlayer > -1) {
              playerHuman = this.getPlayer(this.currentPlayer + 1, GameConstants.PlayerType.HUMAN) || this.getPlayer(this.currentPlayer + 1, GameConstants.PlayerType.HYBRID_HUMAN_AI);
            } else if(this.getPlayer(1, GameConstants.PlayerType.HUMAN) != null) {
              playerHuman = this.getPlayer(1, GameConstants.PlayerType.HUMAN);
            } else {
              playerHuman = this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI);
            }
          }

          if(playerHuman != null) {
            colorName = GraphicsUtils.hslToName(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color), GameConstants.Setting.IMAGE_SNAKE_SATURATION, GameConstants.Setting.IMAGE_SNAKE_VALUE);
            colorRgb = GraphicsUtils.hsvToRgb(GameUtils.addHue(GameConstants.Setting.IMAGE_SNAKE_HUE, playerHuman.color) / 360, GameConstants.Setting.IMAGE_SNAKE_SATURATION / 100, GameConstants.Setting.IMAGE_SNAKE_VALUE / 100);
          }

          if(this.countBeforePlay > 0) {
            this.labelMenus.text = "" + this.countBeforePlay;
          } else {
            this.labelMenus.text = i18next.t("engine.ready");
          }

          this.labelMenus.text += (playerHuman != null ? ("\n" + (this.isFilterHueAvailable && colorName != "???" && (this.graphicSkin == "flat" || this.graphicSkin == "pixel") ? i18next.t("engine.colorPlayer", { color: colorName }) : i18next.t("engine.arrowPlayer"))) : "");

          if(colorRgb && colorRgb.length >= 3) {
            this.labelMenus.color = (this.isFilterHueAvailable && colorName != "???" && (this.graphicSkin == "flat" || this.graphicSkin == "pixel") ? ["white", "rgb(" + colorRgb[0] + ", " + colorRgb[1] + ", " + colorRgb[2] + ")"] : ["white", "#3498db"]);
          } else {
            this.labelMenus.color = "white";
          }
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
        this.enableRetry ? this.menu.set(this.labelMenus, this.btnRetry, this.btnQuit) : (this.fullscreen ? this.menu.set(this.labelMenus, this.btnExitFullScreen) : this.menu.set(this.labelMenus, this.btnQuit));
        
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
        this.enableRetry && this.snakes[0] && !this.snakes[0].autoRetry ? this.menu.set(this.labelMenus, this.btnRetry, this.btnQuit) : (this.fullscreen ? this.menu.set(this.labelMenus, this.btnExitFullScreen) : this.menu.set(this.labelMenus, this.btnQuit));

        if(this.snakes[0] && this.snakes[0].autoRetry && this.timeoutAutoRetry == null) {
          this.timeoutAutoRetry = setTimeout(() => {
            this.reset();
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
      } else if(this.assetsLoaded && !this.engineLoading && this.searchingPlayers) {
        this.labelMenus.text = i18next.t("engine.servers.waitingPlayers") + "\n" + this.playerNumber + "/" + this.maxPlayers + (this.timeStart > 0 ? ("\n\n" + i18next.t("engine.servers.gameStart") + " " + GameUtils.millisecondsFormat(this.timeStart)) : "");
        this.labelMenus.color = "white";
        this.onlineMaster ? this.menu.set(this.labelMenus, this.btnStartGame, this.btnQuit) : this.menu.set(this.labelMenus, this.btnQuit);
        
        this.btnQuit.setClickAction(() => {
          this.confirmExit = true;
        });

        this.btnStartGame.setClickAction(() => {
          this.forceStart();
        });
      } else if(this.paused && !this.gameOver && this.assetsLoaded && !this.engineLoading) {
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
      } else if(this.assetsLoaded && !this.engineLoading) {
        this.btnFullScreen.enable();
        this.gameRanking.enable();

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

        this.timeoutAutoRetry = null;
      }

      this.labelMenus.fontSize = this.fontSize;
      this.menu.draw(this.canvasCtx);

      if((this.gameFinished || this.gameOver) && this.snakes != null && this.snakes.length > 1 && !this.errorOccurred) {
        this.gameRanking.open();
        this.gameRanking.enable();
        this.gameRanking.draw(this.canvasCtx, this, this.currentPlayer);
      }
    
      if(this.notificationMessage != undefined && this.notificationMessage != null && this.notificationMessage instanceof NotificationMessage && this.notificationMessage.foreGround) {
        this.notificationMessage.enableCloseButton();
        this.notificationMessage.draw(this.canvasCtx);
      }

      if(this.displayFPS) {
        Utils.drawText(ctx, this.getDebugText(), "rgba(255, 255, 255, 0.85)", Math.round(this.fontSize / 1.5), GameConstants.Setting.FONT_FAMILY, "right", "bottom", null, null, true);
      }

      if(this.spectatorMode) {
        Utils.drawText(ctx, i18next.t("engine.servers.spectatorMode"), "rgba(255, 255, 255, 0.5)", Math.round(this.fontSize), GameConstants.Setting.FONT_FAMILY, "left", "bottom", null, null, true);
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
      this.gameRanking.disable();

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
}