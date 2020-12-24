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
import GameConstants from "./engine/Constants";
import GameController from "./engine/GameController";
import GameControllerWorker from "./engine/GameControllerWorker";
import GameUI from "./ui/GameUI";
import GameEngine from "./engine/GameEngine";
import { NotificationMessage as Notification, Style, Label } from "jsgametools";

// Polyfills
if(typeof(window) !== "undefined") {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame;
}

if(typeof(document) !== "undefined" && typeof(document.fullscreenElement) === "undefined") {
  Object.defineProperty(document, "fullscreenElement", {
    get: function() {
      return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.oFullscreenElement;
    }
  });
}

if(typeof(document) !== "undefined") {
  document.exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
}

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

// Test if Workerd are supported
function WorkersAvailable(callback) {
  if(typeof(window) !== "undefined") {
    try {
      if(!window.Worker) throw "Workers not supported";
      const testWorker = new Worker("dist/GameEngineWorker.js");

      if(testWorker) {
        testWorker.postMessage("ping");

        testWorker.onmessage = e => {
          if(e.data == "pong") {
            testWorker.terminate();
            return callback(true);
          }
        };
      }
    } catch(e) {
      return callback(false);
    }
  }
}

let workersAvailable = false;

WorkersAvailable(result => {
  workersAvailable = result; 
});

// Old game API
function Game(grid, snake, speed, appendTo, enablePause, enableRetry, progressiveSpeed, canvasWidth, canvasHeight, displayFPS, outputType, settings, ui, onlineMode) {
  let controller;

  const engine = new GameEngine(grid, snake, speed, enablePause, enableRetry, progressiveSpeed);
  engine.init();
  
  if(workersAvailable && settings.enableMultithreading) {
    controller = new GameControllerWorker(engine);
  } else {
    controller = new GameController(engine);
  }
  
  if(ui) {
    controller.gameUI = ui;
  } else {
    controller.gameUI = new GameUI(controller, appendTo, canvasWidth, canvasHeight, displayFPS, outputType, settings);
  }
  
  if(onlineMode) controller.onlineMode = true;
  controller.init();
  
  return controller;
}

// Old NotificationMessage API
class NotificationMessage extends Notification {
  constructor(text, textColor, backgroundColor, delayBeforeClosing, animationDelay, fontSize, fontFamily, foreGround, disableAnimation, closeButton) {
    super(new Style({
      "backgroundColor": backgroundColor || "rgba(46, 204, 113, 0.5)",
      "foreground": foreGround,
      "disableAnimation": disableAnimation
    }), delayBeforeClosing);

    this.label = new Label(text, null, null, new Style({
      "fontSize": fontSize,
      "fontFamily": fontFamily,
      "fontColor": textColor || "white",
      "alignement": "center",
      "verticalAlignement": "center"
    }));
    this.add(this.label);
  }

  set fontSize(fontSize) {
    if(this.label) {
      this.label.style.set("fontSize", fontSize);
    }
  }

  get fontSize() {
    if(this.label) {
      return this.label.style.fontSize;
    }
  }
}

// Constants shim
// Player type
if(typeof(window) !== "undefined") {
  window.PLAYER_AI = GameConstants.PlayerType.AI;
  window.PLAYER_HUMAN = GameConstants.PlayerType.HUMAN;
  window.PLAYER_HYBRID_HUMAN_AI = GameConstants.PlayerType.HYBRID_HUMAN_AI;
  // AI level
  window.AI_LEVEL_RANDOM = GameConstants.AiLevel.RANDOM;
  window.AI_LEVEL_LOW = GameConstants.AiLevel.LOW;
  window.AI_LEVEL_DEFAULT = GameConstants.AiLevel.DEFAULT;
  window.AI_LEVEL_HIGH = GameConstants.AiLevel.HIGH;
  window.AI_LEVEL_ULTRA = GameConstants.AiLevel.ULTRA;
  // Directions
  window.UP = GameConstants.Direction.UP;
  window.RIGHT = GameConstants.Direction.RIGHT;
  window.BOTTOM = GameConstants.Direction.BOTTOM;
  window.LEFT = GameConstants.Direction.LEFT;
  window.ANGLE_1 = GameConstants.Direction.ANGLE_1;
  window.ANGLE_2 = GameConstants.Direction.ANGLE_2;
  window.ANGLE_3 = GameConstants.Direction.ANGLE_3;
  window.ANGLE_4 = GameConstants.Direction.ANGLE_4;
  // Infos
  window.APP_VERSION = GameConstants.Setting.APP_VERSION;
  window.DATE_VERSION = GameConstants.Setting.DATE_VERSION;
}

export { Game, WorkersAvailable, NotificationMessage }