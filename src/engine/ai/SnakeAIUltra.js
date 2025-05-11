/*
 * Copyright (C) 2019-2025 Eliastik (eliastiksofts.com)
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
import SnakeAI from "./SnakeAI.js";
import GameConstants from "../Constants.js";
import Position from "../Position.js";
import GameUtils from "../GameUtils.js";
import TensorflowModelLoader from "./TensorflowModelLoader.js";
import MultiEnvironmentReplayBuffer from "./utils/memory/MultiEnvironmentReplayBuffer.js";
import DuelingQLayer from "./utils/layers/DuelingQLayer.js";
import NoisyDense from "./utils/layers/NoisyDenseLayer.js";
import * as tf from "@tensorflow/tfjs";
import seedrandom from "seedrandom";

export default class SnakeAIUltra extends SnakeAI {
  constructor(enableTrainingMode, modelLocation, seed, logger) {
    super();

    this.aiLevelText = "ultra";
    this.enableTrainingMode = enableTrainingMode;
    this.modelLocation = modelLocation;
    this.trainingRandomSeed = seed || new seedrandom().int32();
    this.trainingRng = new seedrandom(this.trainingRandomSeed);
    this.logger = logger || console;

    this.mainModel = null;
    this.targetModel = null;

    // Model and training settings
    this.modelHeight = 10;
    this.modelWidth = 10;
    this.modelDepth = 2;
    this.numberOfPossibleActions = 4;

    this.enableTargetModel = true; // Double DQN
    this.enableDuelingQLearning = true; // Dueling DQN
    this.enableNoisyNetwork = true; // Noisy Network
    this.enableVariableInputSize = false; // Enable Variable Input Size for model (experimental)
    this.syncTargetEvery = 1000;
    this.stepsSinceLastSync = 0;

    this.gamma = 0.95;
    this.epsilonMax = 1.0; // Not used if Noisy Network is enabled
    this.epsilonMin = 0.005; // Not used if Noisy Network is enabled
    this.epsilon = this.epsilonMax; // Not used if Noisy Network is enabled
    this.learningRate = 0.001;
    this.batchSize = 32;
    this.maxMemoryLength = 100000;
    // End of model and training settings

    this.memory = new MultiEnvironmentReplayBuffer(this.maxMemoryLength, this.trainingRng, "prioritized");
    this.currentEnv = null;
    this.lastAction = null;
    this.currentQValue = 0;
    this.currentEpoch = 0;

    this.summaryWriter = null;

    // TODO
    // - Fix double Qlearning -> OK
    // - Prioritized Experience Replay -> OK
    // - Dueling DQN -> OK
    // - Increase memory size + optimize -> OK
    // - Noisy Networks -> OK
    // - Disable AI stuck detection on GameEngine -> OK
    // - Memory : sample memory of different environments (wall or without walls, etc.) -> OK
    // - Retest 3 moves -> Not working
    // - Check prioritized implementation - Fix memory leak -> OK
    // - Enhance multi environment -> OK
    // * Ideas:
    // - Retest NoisyDenseLayers changes
    // - Variable grid size
    // - Data augmentation (reverse the grid etc...)?
    // * Others:
    // - Feed the input with N previous frames?
    // - Distributional RL - Categorical DQN - Multi step learning?
  }

  async setup(summaryWriter) {
    this.mainModel = await this.createOrLoadModel(this.enableTrainingMode, this.modelLocation);

    if(this.enableTrainingMode) {
      if(this.enableTargetModel) {
        this.targetModel = this.createModel();
        this.targetModel.setWeights(this.mainModel.getWeights());
      }

      this.summaryWriter = summaryWriter;

      this.logger.info(`INFO: The current seed for this training process is: ${this.trainingRandomSeed}\n`);

      if(this.enableNoisyNetwork) {
        this.resetNoisyLayers();
      }
    } else {
      if(this.enableNoisyNetwork) {
        this.clearNoisyLayers();
      }
    }
  }

  async createOrLoadModel(enableTrainingMode, modelLocation) {
    if(!enableTrainingMode) {
      return await this.loadModel(modelLocation);
    }

    return this.createModel();
  }

  async loadModel(modelLocation) {
    const modelLoader = TensorflowModelLoader.getInstance();
    return await modelLoader.loadModel(modelLocation);
  }

  createModel() {
    const DenseLayer = (config) => this.enableNoisyNetwork ? new NoisyDense(config) : tf.layers.dense(config);

    const input = tf.input({
      shape: [
        this.enableVariableInputSize ? null : this.modelHeight,
        this.enableVariableInputSize ? null : this.modelWidth,
        this.modelDepth
      ]
    });
  
    const conv1 = tf.layers.conv2d({
      filters: 32,
      kernelSize: this.enableVariableInputSize ? 1 : 3,
      activation: "relu",
      padding: "same"
    }).apply(input);
  
    const conv2 = tf.layers.conv2d({
      filters: 64,
      kernelSize: this.enableVariableInputSize ? 1 : 3,
      activation: "relu",
      padding: "same"
    }).apply(conv1);
  
    const flattenOrPooling = this.enableVariableInputSize ?
      tf.layers.globalAveragePooling2d({ dataFormat: "channelsFirst", trainable: true }).apply(conv2) :
      tf.layers.flatten().apply(conv2);
  
    const dense1 = DenseLayer({
      units: 64,
      activation: "relu"
    }).apply(flattenOrPooling);

    const advantage = DenseLayer({
      units: this.numberOfPossibleActions,
      activation: "linear"
    }).apply(dense1);

    let model;
  
    if(this.enableDuelingQLearning) {
      const dense2 = DenseLayer({
        units: 64,
        activation: "relu"
      }).apply(flattenOrPooling);

      const value = DenseLayer({
        units: 1,
        activation: "linear"
      }).apply(dense2);
    
      const qValues = new DuelingQLayer().apply([value, advantage]);
    
      model = tf.model({
        inputs: input,
        outputs: qValues
      });
    } else {
      model = tf.model({
        inputs: input,
        outputs: advantage
      });
    }
  
    model.compile({
      optimizer: tf.train.rmsprop(this.learningRate), // Or Adam
      loss: (yTrue, yPred) => tf.losses.huberLoss(yTrue, yPred) // Or Mean Square Root
    });

    return model;
  }
  
  resetNoisyLayers() {
    if(this.enableNoisyNetwork && this.enableTrainingMode) {
      this.mainModel.layers.forEach(layer => {
        if(layer instanceof NoisyDense) {
          layer.resetNoise();
        }
      });
  
      if(this.enableTargetModel && this.targetModel) {
        this.targetModel.layers.forEach(layer => {
          if(layer instanceof NoisyDense) {
            layer.resetNoise();
          }
        });
      }
    }
  }
  
  clearNoisyLayers() {
    if(this.enableNoisyNetwork) {
      this.mainModel.layers.forEach(layer => {
        if(layer instanceof NoisyDense) {
          layer.removeNoise();
        }
      });
  
      if(this.enableTargetModel && this.targetModel) {
        this.targetModel.layers.forEach(layer => {
          if(layer instanceof NoisyDense) {
            layer.removeNoise();
          }
        });
      }
    }
  }

  ai(snake) {
    let action = null;

    if(this.trainingRng() < this.epsilon && this.enableTrainingMode && !this.enableNoisyNetwork) {
      action = this.getRandomAction();
    } else {
      action = this.getBestAction(snake);
    }

    this.lastAction = action;
  
    return this.actionToKey(snake, action);
  }

  getRandomAction() {
    return GameUtils.randRange(0, this.numberOfPossibleActions - 1);
  }

  getBestAction(snake) {
    return tf.tidy(() => {
      const currentState = this.stateToTensor(this.getState(snake));
      const currentStateTensor = currentState.expandDims(0);
  
      const qValues = this.mainModel.predict(currentStateTensor);
  
      const actionIndex = qValues.argMax(1).arraySync()[0];

      if(this.summaryWriter) {
        const maxValue = qValues.max().arraySync();
        this.currentQValue = maxValue;
      }

      return actionIndex;
    });
  }

  actionToKey(snake, actionIndex) {
    if(this.numberOfPossibleActions === 4) {
      return GameConstants.ActionMappingInverse[actionIndex];
    } else if(this.numberOfPossibleActions === 3) {
      const { direction } = snake.getHeadPosition();

      if(actionIndex === GameConstants.AIActions.CONTINUE) {
        return GameConstants.ActionMappingInverse[direction];
      }

      if(actionIndex === GameConstants.AIActions.TURN_LEFT) {
        switch(direction) {
        case GameConstants.Direction.UP:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.LEFT];
        case GameConstants.Direction.BOTTOM:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.RIGHT];
        case GameConstants.Direction.RIGHT:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.TOP];
        case GameConstants.Direction.LEFT:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.BOTTOM];
        }
      }

      if(actionIndex === GameConstants.AIActions.TURN_RIGHT) {
        switch(direction) {
        case GameConstants.Direction.UP:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.RIGHT];
        case GameConstants.Direction.BOTTOM:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.LEFT];
        case GameConstants.Direction.RIGHT:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.BOTTOM];
        case GameConstants.Direction.LEFT:
          return GameConstants.ActionMappingInverse[GameConstants.Direction.TOP];
        }
      }
    } else {
      throw new Error(`Error: this number of possible actions (${this.numberOfPossibleActions}) is not supported`);
    }

    throw new Error(`Error: no action was mapped for actionIndex ${actionIndex}`);
  }

  getState(snake) {
    const grid = snake.grid;

    const snakesLayer = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));
    const fruitsAndWallsLayer = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));
    
    for(let i = 0; i < grid.height; i++) {
      for(let j = 0; j < grid.width; j++) {
        const position = new Position(j, i);
        const cellValue = grid.get(position);

        // AI Snake
        if(snake.positionInQueue(position)) {
          if(snake.getHeadPosition().equals(position)) {
            snakesLayer[i][j] = 3;
          } else if(snake.getTailPosition().equals(position)) {
            snakesLayer[i][j] = 2;
          } else {
            snakesLayer[i][j] = 1;
          }
        } else if(cellValue === GameConstants.CaseType.SNAKE) { // Opponent Snakes
          // TODO opponent Snakes - special value for head/tail?
          snakesLayer[i][j] = 4;
        }

        // Fruits
        if(cellValue === GameConstants.CaseType.FRUIT) {
          fruitsAndWallsLayer[i][j] = 1;
        } else if(cellValue === GameConstants.CaseType.FRUIT_GOLD) {
          fruitsAndWallsLayer[i][j] = 2;
        }

        // Walls
        if(cellValue === GameConstants.CaseType.WALL || cellValue == GameConstants.CaseType.SNAKE_DEAD) {
          fruitsAndWallsLayer[i][j] = 3;
        }
      }
    }

    return { snakesLayer, fruitsAndWallsLayer };
  }

  stateToTensor(stateArray) {
    return tf.tidy(() => {
      const snakesTensor = tf.tensor(stateArray.snakesLayer);
      const fruitsAndWallsTensor = tf.tensor(stateArray.fruitsAndWallsLayer);

      const height = snakesTensor.shape[0];
      const width = snakesTensor.shape[1];

      const padHeight = this.enableVariableInputSize ? height : this.modelHeight - height;
      const padWidth = this.enableVariableInputSize ? width : this.modelWidth - width;

      const padConfig = [[0, padHeight], [0, padWidth]]; 
      const padValue = -1;

      return tf.stack([
        tf.pad(snakesTensor, padConfig, padValue),
        tf.pad(fruitsAndWallsTensor, padConfig, padValue)
      ], -1);
    });
  }

  findPositionInState(stateArray, targetValue) {
    for(let i = 0; i < stateArray.length; i++) {
      for(let j = 0; j < stateArray[i].length; j++) {
        if(stateArray[i][j] === GameConstants.CaseTypeAIValue[targetValue]) {
          return { x: j, y: i };
        }
      }
    }

    return null;
  }

  remember(state, action, reward, nextState, done) {
    this.memory.add(state, action, reward, nextState, done);
  }

  async train() {
    if(this.memory.size() < this.batchSize) return;

    const batch = this.loadBatches();

    const { inputs, targets, meanTDError } = tf.tidy(() => {
      const nextStates = tf.stack(batch.samples.map(({ nextState }) => nextState));
      const states = tf.stack(batch.samples.map(({ state }) => state));
      const rewards = tf.tensor1d(batch.samples.map(({ reward }) => reward));
      const dones = tf.tensor1d(batch.samples.map(({ done }) => done ? 0 : 1));
      const actions = tf.tensor1d(batch.samples.map(({ action }) => action), "int32");
  
      const qNextBatch = (this.enableTargetModel ? this.targetModel : this.mainModel).predict(nextStates);
      const qCurrentBatch = this.mainModel.predict(states);
  
      const qNextMax = qNextBatch.max(1);
      const qValues = qCurrentBatch.clone();

      // Bellman Equation
      const discountedFutureRewards = qNextMax.mul(this.gamma).mul(dones);
      const targetQs = rewards.add(discountedFutureRewards);

      const actionMask = tf.oneHot(actions, qValues.shape[1]);
      const qCurrentActions = qCurrentBatch.mul(actionMask).sum(1);

      const tdErrors = targetQs.sub(qCurrentActions).abs();
      const meanTDError = tdErrors.mean().arraySync();

      tdErrors.arraySync().forEach((error, index) => {
        this.memory.updatePriority(batch.indices[index], error, batch.envAssignments ? batch.envAssignments[index] : null);
      });

      const updatedQValues = qValues.mul(tf.scalar(1).sub(actionMask)).add(actionMask.mul(targetQs.expandDims(1)));

      return { inputs: states, targets: updatedQValues, meanTDError };
    });

    const fitData = await this.mainModel.fit(inputs, targets, { batchSize: this.batchSize, epochs: 1, verbose: 0, shuffle: true });

    if(this.summaryWriter) {
      this.summaryWriter.scalar("loss", fitData.history.loss[0], this.currentEpoch);
      this.summaryWriter.scalar("td_error", meanTDError, this.currentEpoch);
      this.summaryWriter.scalar("epsilon", this.epsilon, this.currentEpoch);
    }

    // Cleanup tensors
    inputs.dispose();
    targets.dispose();

    if(this.stepsSinceLastSync >= this.syncTargetEvery) {
      this.synchronizeTargetNetwork();
      this.stepsSinceLastSync = 0;
    }

    this.stepsSinceLastSync++;
    this.currentEpoch++;
  }

  loadBatches() {
    return this.memory.sample(this.batchSize);
  }

  synchronizeTargetNetwork() {
    if(this.enableTargetModel) {
      this.targetModel.setWeights(this.mainModel.getWeights());

      this.logger.info("Target network synchronized!\n");
    }
  }

  calculateReward(snake, currentState, done) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();

    const fruit = this.findPositionInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT);
    const fruitGold = this.findPositionInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT_GOLD);

    if(!fruit) {
      this.logger.warn("No fruit detected\n");
    }

    if(gameOver) {
      let numberOfEmptyCaseAround = 0;

      for(const directionNext of [GameConstants.Direction.UP, GameConstants.Direction.DOWN, GameConstants.Direction.LEFT, GameConstants.Direction.RIGHT]) {
        const nextPosition = snake.getNextPosition(head, directionNext);

        if(!snake.grid.isDeadPosition(nextPosition)) {
          numberOfEmptyCaseAround++;
        }
      }

      if(numberOfEmptyCaseAround >= 1) {
        return GameConstants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND;
      }

      return GameConstants.AIRewards.GAME_OVER;
    }

    if(done && snake.isAIStuck(3)) {
      return GameConstants.AIRewards.STUCK;
    }

    if(fruit && head.x === fruit.x && head.y === fruit.y) {
      return GameConstants.AIRewards.FRUIT_EATEN;
    }

    if(fruitGold && head.x === fruitGold.x && head.y === fruitGold.y) {
      return GameConstants.AIRewards.GOLD_FRUIT_EATEN;
    }

    return GameConstants.AIRewards.MOVE;
  }

  async step(snake, currentState, done) {
    const nextState = this.getState(snake);
    const reward = this.calculateReward(snake, currentState, done);

    const currentStateTensor = this.stateToTensor(currentState);
    const nextStateTensor = this.stateToTensor(nextState);

    this.remember(currentStateTensor, this.lastAction, reward, nextStateTensor, done);
  }

  changeEnvironment(envId) {
    this.logger.info(`Changing environment to: ${envId}\n`);

    this.resetNoisyLayers();

    if(this.memory) {
      this.memory.changeEnvironment(envId);
    }

    this.currentEnv = envId;
  }

  beginEpisode() {
    this.resetNoisyLayers();
  }

  async saveModel(destination) {
    await this.mainModel.save(destination);
  }
}