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
// Old game API
function Game(grid, snake, speed, appendTo, enablePause, enableRetry, progressiveSpeed, canvasWidth, canvasHeight, displayFPS, outputType, disableAnimation) {
    var controller = new GameController(new GameEngine(grid, snake, speed, enablePause, enableRetry, progressiveSpeed));
    controller.gameUI = new GameUI(controller, appendTo, canvasWidth, canvasHeight, displayFPS, outputType, disableAnimation);
    controller.init();

    return controller;
}
// Constants
// Case type
EMPTY_VAL = CaseType.EMPTY;
SNAKE_VAL = CaseType.SNAKE;
FRUIT_VAL = CaseType.FRUIT;
WALL_VAL = CaseType.WALL;
SNAKE_DEAD_VAL = CaseType.SNAKE_DEAD;
SURROUNDED_VAL = CaseType.SURROUNDED;
// Player type
PLAYER_AI = PlayerType.AI;
PLAYER_HUMAN = PlayerType.HUMAN;
PLAYER_HYBRID_HUMAN_AI = PlayerType.HYBRID_HUMAN_AI;
// AI level
AI_LEVEL_RANDOM = AiLevel.RANDOM;
AI_LEVEL_LOW = AiLevel.LOW;
AI_LEVEL_DEFAULT = AiLevel.DEFAULT;
AI_LEVEL_HIGH = AiLevel.HIGH;
AI_LEVEL_ULTRA = AiLevel.ULTRA;
// Output type
OUTPUT_TEXT = OutputType.TEXT;
OUTPUT_GRAPHICAL = OutputType.GRAPHICAL;
// Canvas size
CANVAS_WIDTH = Setting.CANVAS_WIDTH;
CANVAS_HEIGHT = Setting.CANVAS_HEIGHT;
// Directions
UP = Direction.UP;
RIGHT = Direction.RIGHT;
BOTTOM = Direction.BOTTOM;
LEFT = Direction.LEFT;
ANGLE_1 = Direction.ANGLE_1;
ANGLE_2 = Direction.ANGLE_2;
ANGLE_3 = Direction.ANGLE_3;
ANGLE_4 = Direction.ANGLE_4;
// Keys
KEY_UP = Key.UP;
KEY_RIGHT = Key.RIGHT;
KEY_BOTTOM = Key.BOTTOM;
KEY_LEFT = Key.LEFT;
KEY_ENTER = Key.ENTER;
// UI
FONT_FAMILY = Setting.FONT_FAMILY;
FONT_SIZE = Setting.FONT_SIZE;
HEADER_HEIGHT_DEFAULT = Setting.HEADER_HEIGHT_DEFAULT;
TARGET_FPS = Setting.TARGET_FPS;
IMAGE_SNAKE_HUE = Setting.IMAGE_SNAKE_HUE;
IMAGE_SNAKE_SATURATION = Setting.IMAGE_SNAKE_SATURATION;
IMAGE_SNAKE_VALUE = Setting.IMAGE_SNAKE_VALUE;
CAR_TO_PRERENDER = Setting.CAR_TO_PRERENDER
// Infos
APP_VERSION = Setting.APP_VERSION;
DATE_VERSION = Setting.DATE_VERSION;