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
var GameConstants = {
  CaseType: {
    EMPTY: 0,
    SNAKE: 1,
    FRUIT: 2,
    WALL: 3,
    SNAKE_DEAD: 4,
    SURROUNDED: 5
  },
  PlayerType: {
    AI: "PLAYER_AI",
    HUMAN: "PLAYER_HUMAN",
    HYBRID_HUMAN_AI: "PLAYER_HYBRID_HUMAN_AI"
  },
  AiLevel: {
    RANDOM: "AI_LEVEL_RANDOM",
    LOW: "AI_LEVEL_LOW",
    DEFAULT: "AI_LEVEL_DEFAULT",
    HIGH: "AI_LEVEL_HIGH",
    ULTRA: "AI_LEVEL_ULTRA"
  },
  OutputType: {
    TEXT: "OUTPUT_TEXT",
    GRAPHICAL: "OUTPUT_GRAPHICAL"
  },
  Setting: {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    FONT_FAMILY: "Delius",
    FONT_SIZE: 32,
    HEADER_HEIGHT_DEFAULT: 75,
    TARGET_FPS: 60,
    TIME_MULTIPLIER: 15,
    IMAGE_SNAKE_HUE: 75,
    IMAGE_SNAKE_SATURATION: 50,
    IMAGE_SNAKE_VALUE: 77,
    CARS_TO_PRERENDER: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "×"],
    APP_VERSION: "1.5",
    DATE_VERSION: "01/31/2020"
  },
  Direction: {
    UP: 0,
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    DOWN: 2,
    LEFT: 3,
    ANGLE_1: 4,
    ANGLE_2: 5,
    ANGLE_3: 6,
    ANGLE_4: 7
  },
  Key: {
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40,
    LEFT: 37,
    ENTER: 13
  },
  Error: {
    ROOM_NOT_FOUND: "ROOM_NOT_FOUND",
    ROOM_ALREADY_JOINED: "ROOM_ALREADY_JOINED",
    INVALID_SETTINGS: "INVALID_SETTINGS"
  }
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = GameConstants;
}