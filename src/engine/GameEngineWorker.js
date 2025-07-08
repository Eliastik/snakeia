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
import GameConstants from "./Constants.js";
import Position from "./Position.js";
import Grid from "./Grid.js";
import Snake from "./Snake.js";
import GameEngine from "./GameEngine.js";

let game;

function copySnakes(snakes) {
  const snakesCopy = [];

  if(snakes) {
    snakes.forEach(snake => {
      if(snake) {
        const snakeCopy = new Snake();
  
        snakeCopy.color = snake.color;
        snakeCopy.direction = snake.direction;
        snakeCopy.errorInit = snake.errorInit;
        snakeCopy.gameOver = snake.gameOver;
        snakeCopy.autoRetry = snake.autoRetry;
        snakeCopy.aiLevel = snake.aiLevel;
  
        if(snake.lastTail) {
          snakeCopy.lastTail = JSON.parse(JSON.stringify(snake.lastTail));
        }
  
        if(snake.lastHead) {
          snakeCopy.lastHead = JSON.parse(JSON.stringify(snake.lastHead));
        }
  
        snakeCopy.lastTailMoved = snake.lastTailMoved;
        snakeCopy.lastHeadMoved = snake.lastHeadMoved;
        snakeCopy.name = snake.name;
        snakeCopy.player = snake.player;
  
        if(snake.queue) {
          snakeCopy.queue = JSON.parse(JSON.stringify(snake.queue));
        }
  
        snakeCopy.score = snake.score;
        snakeCopy.scoreMax = snake.scoreMax;
        snakeCopy.ticksDead = snake.ticksDead;
        snakeCopy.ticksWithoutAction = snake.ticksWithoutAction;
        snakeCopy.grid = null;
  
        if(snake.snakeAI && snake.snakeAI.aiLevelText) {
          snakeCopy.snakeAI.aiLevelText = snake.snakeAI.aiLevelText;
        }
  
        snakesCopy.push(snakeCopy);
      }
    });
  }

  return snakesCopy;
}

function copyGrid(grid) {
  const copy = JSON.parse(JSON.stringify(grid));

  if(copy) {
    copy.rngGrid = null;
    copy.rngGame = null;
  }

  return copy;
}

function parseSnakes(snakes, grid) {
  let gridCopy = game ? (grid ?? game.grid) : grid;
  gridCopy = Object.assign(new Grid(), gridCopy);

  snakes = snakes ?? game?.snakes;
  const snakesCopy = (Array.isArray(snakes) ? snakes : [snakes]).map(snake => {
    const newSnake = Object.assign(new Snake(), snake);
    newSnake.grid = gridCopy;
    newSnake.queue = newSnake.queue.map(pos => Object.assign(new Position(), pos));
    return newSnake;
  });

  return { grid: gridCopy, snakes: snakesCopy };
}

onmessage = async e => {
  const data = e.data;

  if(data.length > 1 && data[0] == "init") {
    try {
      const parsed = parseSnakes(data[1]["snakes"], data[1]["grid"]);
      const grid = parsed["grid"];
      const snakes = parsed["snakes"];
  
      game = new GameEngine(grid, snakes, data[1]["speed"], data[1]["enablePause"], data[1]["enableRetry"], data[1]["progressiveSpeed"], data[1]["aiStuckLimit"], data[1]["disableStuckAIDetection"], data[1]["aiUltraModelSettings"]);

      game.onExit(() => {
        self.postMessage(["exit", {
          "paused": game.paused,
          "gameOver": game.gameOver,
          "gameFinished": game.gameFinished,
          "exited": game.exited,
          "confirmReset": false,
          "confirmExit": false,
          "getInfos": false,
          "getInfosGame": false,
          "errorOccurred": game.errorOccurred
        }]);
      });

      await game.init();
    } catch(e) {
      console.error(e);

      self.postMessage(["init", {
        "errorOccurred": true
      }]);

      return;
    }

    self.postMessage(["init", {
      "snakes": copySnakes(game.snakes),
      "grid": copyGrid(game.grid),
      "enablePause": game.enablePause,
      "enableRetry": game.enableRetry,
      "progressiveSpeed": game.progressiveSpeed,
      "offsetFrame": game.speed * GameConstants.Setting.TIME_MULTIPLIER,
      "errorOccurred": game.errorOccurred
    }]);

    game.onReset(() => {
      self.postMessage(["reset", {
        "paused": game.paused,
        "isReseted": game.isReseted,
        "exited": game.exited,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "numFruit": game.numFruit,
        "ticks": game.ticks,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "gameMazeWin": game.gameMazeWin,
        "starting": game.starting,
        "initialSpeed": game.initialSpeed,
        "speed": game.speed,
        "offsetFrame": game.speed * GameConstants.Setting.TIME_MULTIPLIER,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred,
        "aiStuck": game.aiStuck,
        "precAiStuck": false
      }]);
    });

    game.onStart(() => {
      self.postMessage(["start", {
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "starting": game.starting,
        "countBeforePlay": game.countBeforePlay,
        "paused": game.paused,
        "isReseted": game.isReseted,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });

    game.onPause(() => {
      self.postMessage(["pause", {
        "paused": game.paused,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });

    game.onContinue(() => {
      self.postMessage(["continue", {
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });

    game.onStop(() => {
      self.postMessage(["stop", {
        "paused": game.paused,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });

    game.onKill(() => {
      self.postMessage(["kill", {
        "paused": game.paused,
        "gameOver": game.gameOver,
        "killed": game.killed,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "gameFinished": game.gameFinished,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });

    game.onScoreIncreased(() => {
      self.postMessage(["scoreIncreased", {}]);
    });
    
    game.onUpdate(() => {
      self.postMessage(["update", {
        "paused": game.paused,
        "isReseted": game.isReseted,
        "exited": game.exited,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "numFruit": game.numFruit,
        "ticks": game.ticks,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "gameMazeWin": game.gameMazeWin,
        "starting": game.starting,
        "initialSpeed": game.initialSpeed,
        "speed": game.speed,
        "countBeforePlay": game.countBeforePlay,
        "offsetFrame": 0,
        "errorOccurred": game.errorOccurred,
        "aiStuck": game.aiStuck
      }]);
    });

    game.onUpdateCounter(() => {
      self.postMessage(["updateCounter", {
        "paused": game.paused,
        "isReseted": game.isReseted,
        "exited": game.exited,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "numFruit": game.numFruit,
        "ticks": game.ticks,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "gameMazeWin": game.gameMazeWin,
        "starting": game.starting,
        "initialSpeed": game.initialSpeed,
        "speed": game.speed,
        "countBeforePlay": game.countBeforePlay,
        "errorOccurred": game.errorOccurred
      }]);
    });
  } else if(game != null) {
    const message = data[0];

    switch(message) {
    case "reset":
      game.reset();
      break;
    case "start":
      game.start();
      break;
    case "stop":
      game.stop(false);
      break;
    case "finish":
      game.stop(true);
      break;
    case "pause":
      game.pause();
      break;
    case "kill":
      game.kill();
      break;
    case "tick":
      game.paused = false;
      game.countBeforePlay = -1;
      game.tick();
      break;
    case "ping":
      self.postMessage("pong");
      break;
    case "exit":
      game.exit();
      break;
    case "forceStart":
      game.forceStart();
      break;
    case "key":
      if(data.length > 1) {
        game.lastKey = data[1];

        const playerSnake = game.getPlayer(1, GameConstants.PlayerType.HUMAN) || game.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI);

        if(playerSnake != null && playerSnake.lastKey != null) {
          playerSnake.lastKey = data[1];
        }
      }
      break;
    case "update":
      if(data.length > 1) {
        if(data[1]["key"] == "snakes") {
          const d = parseSnakes(data[1]["data"]);
          if(d) game.snakes = d.snakes;
        } else if(data[1]["key"] == "grid") {
          const d = parseSnakes(null, data[1]["data"]);
          if(d) game.grid = d.grid;
        } else {
          game[data[1]["key"]] = data[1]["data"];
        }
      }
      break;
    case "destroySnakes":
      if(data[1] && data[2]) game.destroySnakes(data[1], data[2]);
      break;
    }
  } else if(data == "ping") {
    self.postMessage("pong");
  }
};

self.postMessage("ready");