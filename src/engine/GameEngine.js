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
import GameUtils from "./GameUtils.js";
import GameConstants from "./Constants.js";
import Reactor from "./Reactor.js";
import Grid from "./Grid.js";
import Snake from "./Snake.js";
import TensorflowModelLoader from "./ai/TensorflowModelLoader.js";
import seedrandom from "seedrandom";

export default class GameEngine {
  constructor(grid, snake, speed, enablePause, enableRetry, progressiveSpeed, aiStuckLimit, disableStuckAIDetection, aiUltraModelSettings) {
    // Game settings
    this.grid = grid;
    this.snakes = snake;
    this.speed = speed == null ? 8 : speed;
    this.initialSpeed = speed == null ? 8 : speed;
    this.initialSpeedUntouched = speed == null ? 8 : speed;
    this.enablePause = enablePause == null ? true : enablePause;
    this.enableRetry = enableRetry == null ? true : enableRetry;
    this.progressiveSpeed = progressiveSpeed == null ? false : progressiveSpeed;
    this.aiStuckLimit = aiStuckLimit == null ? 3 : aiStuckLimit;
    this.disableStuckAIDetection = disableStuckAIDetection == null ? false : disableStuckAIDetection;
    this.aiUltraModelSettings = aiUltraModelSettings;
    this.countBeforePlay = 3;
    // Game variables
    this.lastKey = -1;
    this.numFruit = 1;
    this.ticks = 0;
    // Game state variables
    this.isInit = false;
    this.engineLoading = true;
    this.firstStart = true;
    this.starting = false;
    this.paused = true;
    this.exited = false;
    this.killed = false;
    this.isReseted = true;
    this.gameOver = false;
    this.gameFinished = false; // only used if 2 and more snakes
    this.gameMazeWin = false; // used in maze mode
    this.scoreMax = false;
    this.errorOccurred = false;
    this.clientSidePredictionsMode = false; // Enable client-side predictions mode for the online game (disable some functions)
    this.aiStuck = false; // true if one AI is stuck - disabled if an human player is playing
    // Intervals, timeouts, frames
    this.intervalPlay;
    // Events
    this.reactor = new Reactor();
    this.reactor.registerEvent("onStart");
    this.reactor.registerEvent("onPause");
    this.reactor.registerEvent("onContinue");
    this.reactor.registerEvent("onReset");
    this.reactor.registerEvent("onStop");
    this.reactor.registerEvent("onExit");
    this.reactor.registerEvent("onKill");
    this.reactor.registerEvent("onScoreIncreased");
    this.reactor.registerEvent("onUpdate");
    this.reactor.registerEvent("onUpdateCounter");
  }

  async init() {
    if(!this.clientSidePredictionsMode) {
      this.engineLoading = true;

      if(this.snakes == null) {
        this.errorOccurred = true;
        this.snakes = [];
      } else if(!Array.isArray(this.snakes)) {
        this.snakes = [this.snakes];
      } else if((Array.isArray(this.snakes) && this.snakes.length <= 0) || (this.grid.maze && this.snakes.length > 1)) {
        this.errorOccurred = true;
      }

      if(this.grid instanceof Grid == false) {
        this.errorOccurred = true;
      } else if(!this.errorOccurred) {
        await this.initGridAndSnakes();

        // Init Snake colors
        let startHue = GameUtils.randRange(0, 360, this.grid ? new seedrandom(this.grid.seedGame) : null);
  
        for(const snake of this.snakes) {
          if(snake instanceof Snake == false) {
            this.errorOccurred = true;
          } else {
            startHue = GameUtils.addHue(startHue, Math.round(360 / (this.snakes.length)));
            snake.color = startHue;
          }
        }
      }

      this.engineLoading = false;
    }
    
    this.isInit = true;
  }

  async initGridAndSnakes() {
    this.grid.reset();
    this.grid.init();

    if(this.snakes != null) {
      const hasUltraAI = this.snakes
        .find(snake => !snake.customAI && snake.aiLevel === GameConstants.AiLevel.ULTRA);

      if(hasUltraAI && this.aiUltraModelSettings) {
        await this.initAIUltra();
      }

      for(const snake of this.snakes) {
        snake.reset();
      }
      
      for(const snake of this.snakes) {
        await snake.init();
      }
    }

    this.grid.setFruit(this.snakes.length);
  }

  async initAIUltra() {
    const modelLoader = TensorflowModelLoader.getInstance();
    const modelListAPI = this.aiUltraModelSettings.modelListAPI;

    if(modelListAPI) {
      modelLoader.setModelListAPI(this.aiUltraModelSettings.modelListAPI);
    }
    
    await modelLoader.selectModel(this.aiUltraModelSettings.modelID);

    // TODO custom model URL setting
  }

  async reset() {
    this.paused = true;
    this.isReseted = true;
    this.exited = false;
    this.clearIntervalPlay();

    this.numFruit = 1;
    this.ticks = 0;
    this.lastKey = -1;
    this.scoreMax = false;
    this.errorOccurred = false;
    this.gameOver = false;
    this.gameFinished = false;
    this.gameMazeWin = false;
    this.starting = false;
    this.initialSpeed = this.initialSpeedUntouched;
    this.speed = this.initialSpeedUntouched;
    this.aiStuck = false;

    if(this.grid.seedGrid) {
      this.grid.seedGrid = "" + (parseInt(this.grid.seedGrid) + 1);
    }

    if(this.grid.seedGame) {
      this.grid.seedGame = "" + (parseInt(this.grid.seedGame) + 1);
    }

    await this.initGridAndSnakes();

    this.reactor.dispatchEvent("onReset");
    this.start();
  }

  start() {
    this.reactor.dispatchEvent("onUpdateCounter");
    
    if(!this.errorOccurred) {
      if(this.snakes != null) {
        for(const snake of this.snakes) {
          if(snake.errorInit) {
            this.errorOccurred = true;
            this.stop();
          }
        }
      }

      if(this.paused && !this.gameOver && !this.killed && !this.scoreMax && !this.starting) {
        this.starting = true;

        if(!this.firstStart) {
          this.reactor.dispatchEvent("onContinue");
        }

        this.countBeforePlay = 3;
        this.clearIntervalPlay();
        this.reactor.dispatchEvent("onUpdateCounter");

        this.intervalPlay = setInterval(() => {
          this.countBeforePlay--;
          this.reactor.dispatchEvent("onUpdateCounter");

          if(this.countBeforePlay < 0) {
            this.forceStart();
          }
        }, 1000);
      }
    }
  }

  forceStart() {
    this.clearIntervalPlay();
    this.countBeforePlay = -1;
    this.paused = false;
    this.isReseted = false;
    this.firstStart = false;
    this.starting = false;
    this.reactor.dispatchEvent("onStart");
    this.tick();
  }

  clearIntervalPlay() {
    clearInterval(this.intervalPlay);
  }

  continue() {
    if(!this.clientSidePredictionsMode) {
      this.start();
      this.reactor.dispatchEvent("onContinue");
    }
  }

  stop(finish) {
    if(!this.gameOver && !this.clientSidePredictionsMode) {
      this.paused = true;
      this.gameOver = true;
      if(finish) this.gameFinished = true;
      this.clearIntervalPlay();
      this.reactor.dispatchEvent("onStop");
    }
  }

  pause() {
    if(!this.paused && !this.clientSidePredictionsMode) {
      this.paused = true;
      this.clearIntervalPlay();
      this.reactor.dispatchEvent("onPause");
    }
  }

  kill() {
    if(!this.killed) {
      this.paused = true;
      this.gameOver = true;
      this.killed = true;

      if(this.snakes != null) {
        for(const snake of this.snakes) {
          snake.kill();
        }

        this.snakes = [];
      }

      this.clearIntervalPlay();
      this.grid = null;
      this.snakes = null;
      this.reactor.dispatchEvent("onKill");
    }
  }

  exit() {
    if(!this.exited) {
      this.stop();
      this.exited = true;
      this.reactor.dispatchEvent("onExit");
    }
  }

  destroySnakes(exceptionIds, types) {
    for(let i = 0; i < this.snakes.length; i++) {
      if(exceptionIds && Array.isArray(exceptionIds) && exceptionIds.indexOf(i) < 0 && types.indexOf(this.snakes[i].player) > -1) {
        this.snakes[i].setGameOver(this.ticks);
      }
    }
  }

  getNBPlayer(type) {
    let numPlayer = 0;

    if(this.snakes != null) {
      for(const snake of this.snakes) {
        if(snake.player == type) {
          numPlayer++;
        }
      }
    }

    return numPlayer;
  }

  getPlayer(num, type) {
    let numPlayer = 0;

    if(this.snakes != null) {
      for(const snake of this.snakes) {
        if(snake.player == type) {
          numPlayer++;
        }

        if(numPlayer == num) {
          return snake;
        }
      }
    }

    return null;
  }

  tick() {
    setTimeout(() => {
      this.doTick();
    }, this.initialSpeed * GameConstants.Setting.TIME_MULTIPLIER);
  }

  shouldUpdateEngine() {
    const isMaze = this.grid.maze;
    const forceAuto = this.grid.mazeForceAuto;
    const nbHuman = this.getNBPlayer(GameConstants.PlayerType.HUMAN);
    const nbHybrid = this.getNBPlayer(GameConstants.PlayerType.HYBRID_HUMAN_AI);
    const totalHuman = nbHuman + nbHybrid;
    const playerInput = (this.getPlayer(1, GameConstants.PlayerType.HYBRID_HUMAN_AI) ||
                         this.getPlayer(1, GameConstants.PlayerType.HUMAN))?.lastKey;

    return this.grid &&
      (!isMaze || forceAuto || totalHuman === 0 || (totalHuman > 0 && playerInput !== -1));
  }

  doTick() {
    if(this.paused || this.killed) {
      return;
    }

    if(this.shouldUpdateEngine()) {
      let scoreIncreased, setFruitError = false;

      this.ticks++;

      for(const snake of this.snakes) {
        const initialDirection = snake.direction;

        setFruitError = false;
        snake.lastTailMoved = false;
        snake.lastHeadMoved = false;

        if(!snake.gameOver && !snake.scoreMax) {
          const headSnakePos = this.moveSnake(snake, initialDirection);

          if(headSnakePos) {
            if(this.grid.isDeadPosition(headSnakePos)) {
              snake.setGameOver(this.ticks);
            } else {
              const { scoreHasIncreased, setFruit } = this.handleSnakeMoveResult(headSnakePos, snake);
  
              if(scoreHasIncreased) {
                scoreIncreased = true;
              }
  
              // Set a new fruit if the current fruit is eaten
              if(!this.scoreMax && setFruit && !this.clientSidePredictionsMode) {
                setFruitError = !this.grid.setFruit(this.snakes.length);
              }
            }
          }
        }
      }

      // Check stuck fruits
      setFruitError = this.handleStuckFruits(setFruitError);

      // Check if the game should end
      this.checkEndGameCondition(setFruitError);

      // Send events about the current game state update
      this.reactor.dispatchEvent("onUpdate");

      if(scoreIncreased) {
        this.reactor.dispatchEvent("onScoreIncreased");
      }
    }

    this.tick();
  }

  moveSnake(snake, initialDirection) {
    if(snake.player == GameConstants.PlayerType.HUMAN || snake.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
      snake.moveTo(snake.lastKey);
      snake.lastKey = -1;
    } else if(snake.player == GameConstants.PlayerType.AI && (!this.clientSidePredictionsMode || (this.clientSidePredictionsMode && snake.aiLevel != GameConstants.AiLevel.RANDOM))) {
      snake.moveTo(snake.ai());
    }

    const headSnakePos = snake.getHeadPosition();
    const nextIsDeadPosition = this.grid.isDeadPosition(snake.getNextPosition(headSnakePos, snake.direction));

    if(snake.player == GameConstants.PlayerType.HYBRID_HUMAN_AI && nextIsDeadPosition) {
      snake.direction = initialDirection;
      snake.moveTo(snake.ai());
      snake.lastKey = -1;
    }

    // If maze and player human, ignore dead position
    if(this.grid.maze && snake.player == GameConstants.PlayerType.HUMAN && nextIsDeadPosition) {
      snake.direction = initialDirection;
      snake.lastKey = -1;
      return null;
    }

    return snake.getNextPosition(headSnakePos, snake.direction);
  }

  handleSnakeMoveResult(headSnakePos, snake) {
    const cellType = this.grid.get(headSnakePos);

    if(cellType == GameConstants.CaseType.FRUIT || cellType == GameConstants.CaseType.FRUIT_GOLD) {
      return this.handleScoreIncrease(snake, cellType, headSnakePos);
    } else {
      snake.insert(headSnakePos);

      if(!this.grid.maze) {
        snake.remove();
        snake.lastTailMoved = true;
        snake.lastHeadMoved = true;
      }
    }

    return { goldFruit: false, scoreHasIncreased: false, setFruit: false };
  }

  handleScoreIncrease(snake, cellType, headSnakePos) {
    let setFruit = false;
    let goldFruit = false;

    if(cellType == GameConstants.CaseType.FRUIT) {
      snake.increaseScore(1);

      this.grid.set(GameConstants.CaseType.EMPTY, this.grid.fruitPos);
      this.grid.fruitPos = null;
    } else if(cellType == GameConstants.CaseType.FRUIT_GOLD) {
      snake.increaseScore(3);
      
      goldFruit = true;

      this.grid.set(GameConstants.CaseType.EMPTY, this.grid.fruitPosGold);
      this.grid.fruitPosGold = null;
    }

    snake.insert(headSnakePos);

    if(this.grid.maze) {
      this.gameMazeWin = true;
      this.gameFinished = true;

      this.stop();
    } else if(snake.hasMaxScore() && this.snakes.length <= 1) {
      this.scoreMax = true;
      snake.scoreMax = true;

      this.stop();
    } else {
      this.numFruit++;

      if(!goldFruit) {
        setFruit = true;
      }
    }

    this.handleSpeedIncrease(snake);

    return { goldFruit, scoreHasIncreased: true, setFruit };
  }

  handleSpeedIncrease(snake) {
    if(this.snakes.length <= 1 && this.progressiveSpeed && snake.score > 0 && this.initialSpeed > 1) {
      this.initialSpeed = Math.ceil(((-this.initialSpeedUntouched / 100) * snake.score) + this.initialSpeedUntouched);
      this.initialSpeed = this.initialSpeed < 1 ? 1 : this.initialSpeed;
    }
  }

  handleStuckFruits(setFruitError) {
    // If the fruit is in a corridor, we set it in a new cell
    if(!this.scoreMax && !setFruitError && (this.grid.detectCorridor(this.grid.fruitPos) || this.grid.isFruitSurrounded(this.grid.fruitPos, true)) && !this.clientSidePredictionsMode) {
      setFruitError = !this.grid.setFruit(this.snakes.length);
    }

    // If gold fruit is in a corridor, we remove it
    if(!this.scoreMax && this.grid.fruitPosGold != null && (this.grid.detectCorridor(this.grid.fruitPosGold) || this.grid.isFruitSurrounded(this.grid.fruitPosGold, true))) {
      this.grid.set(GameConstants.CaseType.EMPTY, this.grid.fruitPosGold);
      this.grid.fruitPosGold = null;
    }

    return setFruitError;
  }

  checkSnakeAIStuckStatus(snake) {
    const isPartiallyStuck = !this.disableStuckAIDetection ? snake.isAIStuck(this.aiStuckLimit / 2) : false;
    const isFullyStuck = !this.disableStuckAIDetection ? isPartiallyStuck && snake.isAIStuck(this.aiStuckLimit) : false;
    const isHumanPlayer = (snake.player === GameConstants.PlayerType.HUMAN || snake.player === GameConstants.PlayerType.HYBRID_HUMAN_AI) && !snake.gameOver;
    
    return {
      isPartiallyStuck,
      isFullyStuck,
      isHumanPlayer
    };
  }

  checkEndGameCondition(setFruitError) {
    let nbOver = 0;

    let allActiveAIAreStuck = true;
    let allActiveAIAreFullyStuck = true;
    let humanPlayerActive = false;

    for(const snake of this.snakes) {
      if(snake.gameOver || snake.scoreMax) {
        nbOver++;
      } else {
        // Check if AI player is stuck
        const { isPartiallyStuck, isFullyStuck, isHumanPlayer } = this.checkSnakeAIStuckStatus(snake);

        if(isHumanPlayer) {
          humanPlayerActive = true;
        }
        
        if(!isPartiallyStuck) {
          allActiveAIAreStuck = false;
          allActiveAIAreFullyStuck = false;
        } else if(!isFullyStuck) {
          allActiveAIAreFullyStuck = false;
        }
      }
    }

    const shouldEndGame = nbOver >= this.snakes.length || setFruitError || (allActiveAIAreFullyStuck && !humanPlayerActive);

    this.aiStuck = allActiveAIAreStuck && !humanPlayerActive && !shouldEndGame;

    if(shouldEndGame) {
      this.stop();

      if(this.snakes.length > 1) {
        this.gameFinished = true;
      }
    }
  }

  onReset(callback) {
    this.reactor.addEventListener("onReset", callback);
  }

  onStart(callback) {
    this.reactor.addEventListener("onStart", callback);
  }

  onContinue(callback) {
    this.reactor.addEventListener("onContinue", callback);
  }

  onStop(callback) {
    this.reactor.addEventListener("onStop", callback);
  }

  onPause(callback) {
    this.reactor.addEventListener("onPause", callback);
  }

  onExit(callback) {
    this.reactor.addEventListener("onExit", callback);
  }

  onKill(callback) {
    this.reactor.addEventListener("onKill", callback);
  }

  onScoreIncreased(callback) {
    this.reactor.addEventListener("onScoreIncreased", callback);
  }

  onUpdate(callback) {
    this.reactor.addEventListener("onUpdate", callback);
  }

  onUpdateCounter(callback) {
    this.reactor.addEventListener("onUpdateCounter", callback);
  }
}