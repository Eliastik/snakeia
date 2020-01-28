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

if(typeof(screen) !== "undefined") {
  screen.orientation = screen.msOrientation || screen.mozOrientation || screen.orientation;
}

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

// Old game API
function Game(grid, snake, speed, appendTo, enablePause, enableRetry, progressiveSpeed, canvasWidth, canvasHeight, displayFPS, outputType, disableAnimation) {
  var controller;
  
  try { // Test if Worker is supported
    if(!window.Worker) throw "Worker not supported";
    new Worker("assets/js/src/gameEngineWorker.js").terminate();
    controller = new GameControllerWorker(new GameEngine(grid, snake, speed, enablePause, enableRetry, progressiveSpeed));
  } catch(e) {
    controller = new GameController(new GameEngine(grid, snake, speed, enablePause, enableRetry, progressiveSpeed));
  }
  
  controller.gameUI = new GameUI(controller, appendTo, canvasWidth, canvasHeight, displayFPS, outputType, disableAnimation);
  controller.init();
  
  return controller;
}

// Constants
// Player type
PLAYER_AI = GameConstants.PlayerType.AI;
PLAYER_HUMAN = GameConstants.PlayerType.HUMAN;
PLAYER_HYBRID_HUMAN_AI = GameConstants.PlayerType.HYBRID_HUMAN_AI;
// AI level
AI_LEVEL_RANDOM = GameConstants.AiLevel.RANDOM;
AI_LEVEL_LOW = GameConstants.AiLevel.LOW;
AI_LEVEL_DEFAULT = GameConstants.AiLevel.DEFAULT;
AI_LEVEL_HIGH = GameConstants.AiLevel.HIGH;
AI_LEVEL_ULTRA = GameConstants.AiLevel.ULTRA;
// Directions
UP = GameConstants.Direction.UP;
RIGHT = GameConstants.Direction.RIGHT;
BOTTOM = GameConstants.Direction.BOTTOM;
LEFT = GameConstants.Direction.LEFT;
ANGLE_1 = GameConstants.Direction.ANGLE_1;
ANGLE_2 = GameConstants.Direction.ANGLE_2;
ANGLE_3 = GameConstants.Direction.ANGLE_3;
ANGLE_4 = GameConstants.Direction.ANGLE_4;
// UI
FONT_FAMILY = GameConstants.Setting.FONT_FAMILY;
FONT_SIZE = GameConstants.Setting.FONT_SIZE;
HEADER_HEIGHT_DEFAULT = GameConstants.Setting.HEADER_HEIGHT_DEFAULT;
TARGET_FPS = GameConstants.Setting.TARGET_FPS;
IMAGE_SNAKE_HUE = GameConstants.Setting.IMAGE_SNAKE_HUE;
IMAGE_SNAKE_SATURATION = GameConstants.Setting.IMAGE_SNAKE_SATURATION;
IMAGE_SNAKE_VALUE = GameConstants.Setting.IMAGE_SNAKE_VALUE;
CAR_TO_PRERENDER = GameConstants.Setting.CAR_TO_PRERENDER
// Infos
APP_VERSION = GameConstants.Setting.APP_VERSION;
DATE_VERSION = GameConstants.Setting.DATE_VERSION;

// Export module
if(typeof(module) !== "undefined") {
  module.exports = {
    Game: Game
  };
}