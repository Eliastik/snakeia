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
export default {
  CaseType: {
    EMPTY: 0,
    SNAKE: 1,
    FRUIT: 2,
    WALL: 3,
    SNAKE_DEAD: 4,
    SURROUNDED: 5,
    FRUIT_GOLD: 6,
    CROSSED: 7
  },
  CaseTypeText: {
    0: "-",
    1: "o",
    2: "x",
    3: "#",
    4: "O",
    5: "/",
    6: "X",
    7: " "
  },
  CaseTypeAIValue: {
    0: 0,
    1: 4,
    2: 1,
    3: 3,
    4: 3,
    5: 0,
    6: 2,
    7: 0
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
    ULTRA: "AI_LEVEL_ULTRA",
    CUSTOM: "AI_LEVEL_CUSTOM",
    MOCK: "AI_LEVEL_MOCK"
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
    APP_VERSION: "3.0.1",
    DATE_VERSION: "10/07/2025",
    PROB_GOLD_FRUIT_1_PLAYER: 100,
    PROB_GOLD_FRUIT_MULTIPLE_PLAYERS: 50,
    INFO_NOTIF_COLOR: "rgba(52, 152, 219, 0.5)",
    ERROR_NOTIF_COLOR: "rgba(231, 76, 60, 0.5)"
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
  SimpleDirection: {
    UP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
  },
  VerticalDirection: {
    UP: 0,
    BOTTOM: 2
  },
  HorizontalDirection: {
    RIGHT: 1,
    LEFT: 3
  },
  Key: {
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40,
    LEFT: 37,
    ENTER: 13
  },
  ActionMapping: {
    38: 0,
    39: 1,
    40: 2,
    37: 3
  },
  ActionMappingInverse: {
    0: 38,
    1: 39,
    2: 40,
    3: 37
  },
  AIRewards: {
    GAME_OVER: -1,
    GAME_OVER_WITH_EMPTY_CASES_AROUND: -1,
    FRUIT_EATEN: 0.5,
    GOLD_FRUIT_EATEN: 1,
    MOVE: -0.001,
    STUCK: 0
  },
  AIActions: {
    TURN_LEFT: 0,
    TURN_RIGHT: 1,
    CONTINUE: 2
  },
  Error: {
    ROOM_NOT_FOUND: "ROOM_NOT_FOUND",
    ROOM_ALREADY_JOINED: "ROOM_ALREADY_JOINED",
    INVALID_SETTINGS: "INVALID_SETTINGS",
    MAX_ROOM_LIMIT_REACHED: "MAX_ROOM_LIMIT_REACHED",
    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED",
    ALREADY_CREATED_ROOM: "ALREADY_CREATED_ROOM",
    BANNED: "BANNED",
    DISCONNECTED: "DISCONNECTED"
  },
  GameState: {
    STARTING: "STARTING",
    STARTED: "STARTED",
    SEARCHING_PLAYERS: "SEARCHING_PLAYERS",
    AUTHENTICATION_SUCCESS: "AUTHENTICATION_SUCCESS"
  },
  QualitySettings3DIndividualPresets: {
    fruitLights: {
      type: "boolean"
    },
    enableShadows: {
      type: "boolean"
    },
    enableReflections: {
      type: "boolean"
    },
    antialiasing: {
      type: "choice",
      presets: {
        disabled: "disabled",
        fxaa: "fxaa",
        smaa: "smaa",
        msaa: "msaa"
      }
    },
    shadowType: {
      type: "choice",
      presets: {
        low: "basic",
        medium: "pcf",
        high: "pcfsoft"
      }
    },
    shadowResolution: {
      type: "choice",
      presets: {
        low: 512,
        normal: 1024,
        medium: 2048,
        high: 4096,
        ultra: 8192,
        extreme: 16384
      }
    },
    materialType: {
      type: "choice",
      presets: {
        minimum: "basic",
        low: "lambert",
        medium: "phong",
        high: "pbr"
      }
    },
    snakeSegments: {
      type: "choice",
      presets: {
        minimum: {
          minTubular: 4,
          maxTubular: 128,
          minRadius: 4,
          maxRadius: 64,
          maxLength: 50,
          maxGridArea: 10000
        },
        low: {
          minTubular: 4,
          maxTubular: 256,
          minRadius: 4,
          maxRadius: 64,
          maxLength: 50,
          maxGridArea: 10000
        },
        normal: {
          minTubular: 6,
          maxTubular: 256,
          minRadius: 6,
          maxRadius: 64,
          maxLength: 50,
          maxGridArea: 10000
        },
        medium: {
          minTubular: 6,
          maxTubular: 256,
          minRadius: 6,
          maxRadius: 64,
          maxLength: 50,
          maxGridArea: 10000
        },
        high: {
          minTubular: 6,
          maxTubular: 256,
          minRadius: 6,
          maxRadius: 64,
          maxLength: 50,
          maxGridArea: 10000
        },
        ultra: {
          minTubular: 6,
          maxTubular: 512,
          minRadius: 6,
          maxRadius: 128,
          maxLength: 75,
          maxGridArea: 10000
        },
        extreme: {
          minTubular: 6,
          maxTubular: 1024,
          minRadius: 6,
          maxRadius: 256,
          maxLength: 100,
          maxGridArea: 10000
        }
      }
    },
    reflectionQuality: {
      type: "choice",
      presets: {
        low: "static",
        medium: "dynamicOnce",
        high: "dynamicThrottled",
        ultra: "dynamicFull"
      }
    },
    reflectionResolution: {
      type: "choice",
      presets: {
        minimum: 32,
        low: 64,
        medium: 128,
        high: 256,
        ultra: 512,
        extreme: 1024
      }
    }
  },
  QualitySettings3DPreset: {
    "3dMinimal": {
      enableShadows: false,
      enableReflections: false,
      antialiasing: "disabled",
      shadowResolution: "low",
      shadowType: "low",
      materialType: "low",
      snakeSegments: "minimum",
      fruitLights: false,
      reflectionQuality: "low",
      reflectionResolution: "minimum"
    },
    "3dLow": {
      enableShadows: true,
      enableReflections: false,
      antialiasing: "disabled",
      shadowResolution: "low",
      shadowType: "high",
      materialType: "high",
      snakeSegments: "low",
      fruitLights: false,
      reflectionQuality: "low",
      reflectionResolution: "low"
    },
    "3dNormal": {
      enableShadows: true,
      enableReflections: true,
      antialiasing: "fxaa",
      shadowResolution: "normal",
      shadowType: "high",
      materialType: "high",
      snakeSegments: "normal",
      fruitLights: true,
      reflectionQuality: "low",
      reflectionResolution: "low"
    },
    "3dMedium": {
      enableShadows: true,
      enableReflections: true,
      antialiasing: "smaa",
      shadowResolution: "medium",
      shadowType: "high",
      materialType: "high",
      snakeSegments: "medium",
      fruitLights: true,
      reflectionQuality: "medium",
      reflectionResolution: "medium"
    },
    "3dHigh": {
      enableShadows: true,
      enableReflections: true,
      antialiasing: "msaa",
      shadowResolution: "high",
      shadowType: "high",
      materialType: "high",
      snakeSegments: "high",
      fruitLights: true,
      reflectionQuality: "high",
      reflectionResolution: "high"
    },
    "3dUltra": {
      enableShadows: true,
      enableReflections: true,
      antialiasing: "msaa",
      shadowResolution: "ultra",
      shadowType: "high",
      materialType: "high",
      snakeSegments: "ultra",
      fruitLights: true,
      reflectionQuality: "high",
      reflectionResolution: "high"
    },
    "3dExtreme": {
      enableShadows: true,
      enableReflections: true,
      antialiasing: "msaa",
      shadowResolution: "ultra",
      shadowType: "high",
      materialType: "high",
      snakeSegments: "extreme",
      fruitLights: true,
      reflectionQuality: "ultra",
      reflectionResolution: "extreme"
    }
  },
  DefaultQualitySettings3D: "3dNormal",
  DefaultAIModelsListAPI: "https://www.eliastiksofts.com/snakeia/models/"
};