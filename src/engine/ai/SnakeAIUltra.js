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
import SnakeAIUltraModelLoader from "./SnakeAIUltraModelLoader.js";
import MultiEnvironmentReplayBuffer from "./utils/memory/MultiEnvironmentReplayBuffer.js";
import PrioritizedReplayBuffer from "./utils/memory/PrioritizedReplayBuffer.js";
import UniformReplayBuffer from "./utils/memory/UniformReplayBuffer.js";
import DuelingQLayer from "./utils/layers/DuelingQLayer.js";
import NoisyDense from "./utils/layers/NoisyDenseLayer.js";
import * as tf from "@tensorflow/tfjs";
import seedrandom from "seedrandom";

export default class SnakeAIUltra extends SnakeAI {
  constructor(enableTrainingMode, modelLocation, seed, logger, fileReader) {
    super();

    this.aiLevelText = "ultra";
    this.enableTrainingMode = enableTrainingMode;
    this.modelLocation = modelLocation;
    this.trainingRandomSeed = seed || new seedrandom().int32();
    this.trainingRng = new seedrandom(this.trainingRandomSeed, { state: true });
    this.logger = logger || console;
    this.fileReader = fileReader || {
      readJSON: async (location) => await (await fetch(location)).json()
    };

    this.mainModel = null;
    this.targetModel = null;

    // Model and training settings
    this.modelHeight = 25;
    this.modelWidth = 25;
    this.modelDepth = 2;
    this.numberOfPossibleActions = 4;
    this.dtype = "float32";

    this.enableTargetModel = true; // Enable Double DQN
    this.enableDuelingQLearning = true; // Enable Dueling DQN
    this.enableNoisyNetwork = true; // Enable Noisy Network for exploration
    /* Enable Variable Input Size for the model (experimental).
       If disabled and the input (grid size) of the game is different than the input size of the model, the input will be padded. */
    this.enableVariableInputSize = false;
    this.syncTargetEvery = 1000; // Sync the Target Model each N training steps

    this.gamma = 0.95;
    this.epsilonMax = 1.0; // Not used if Noisy Network is enabled
    this.epsilonMin = 0.005; // Not used if Noisy Network is enabled
    this.epsilon = this.epsilonMax; // Not used if Noisy Network is enabled
    this.learningRate = 0.001;
    this.batchSize = 32;
    this.maxMemoryLength = 100000;
    // End of model and training settings

    this.memory = new MultiEnvironmentReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger, "prioritized");
    this.currentEnv = null;
    this.lastAction = null;
    this.currentQValue = 0;
    this.currentEpoch = 0;
    this.stepsSinceLastSync = 0;

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
    // - Retest NoisyDenseLayers changes -> OK
    // - Store memory with the model? To improve fine tuning -> OK
    // - Variable grid size -> OK, need some more tests
    // * Ideas:
    // - Add direction information for Snake head?
    // - Data augmentation (reverse the grid etc...)?
    // - Feed the input with N previous frames?
    // - Distributional RL - Categorical DQN - Multi step learning?
    // - Reproducible training with seed: some fixes needed?
  }

  async setup(summaryWriter) {
    this.mainModel = await this.createOrLoadModel(this.enableTrainingMode, this.modelLocation);
      
    if(this.modelLocation) {
      await this.loadMetadata(`${this.modelLocation}/metadata.json`);
    }

    if(this.enableTrainingMode) {
      if(this.modelLocation) {
        await this.loadMemory(`${this.modelLocation}/memory.json`);
      }

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
    const modelLoader = SnakeAIUltraModelLoader.getInstance(this.fileReader);

    if(enableTrainingMode) {
      return this.loadModelTrainingMode(modelLocation, modelLoader);
    } else {
      return this.loadModelStandardMode(modelLocation, modelLoader);
    }
  }

  async loadModelTrainingMode(modelLocation, modelLoader) {
    const model = modelLocation ?
      await modelLoader.loadModel(this.processModelLocation(modelLocation)) :
      this.createModel();

    this.compileModel(model);

    return model;
  }

  async loadModelStandardMode(modelLocation, modelLoader) {
    if(modelLocation) {
      return modelLoader.loadModel(this.processModelLocation(modelLocation));
    }

    const model = await modelLoader.loadSelectedModel();
      
    this.modelLocation = modelLoader.getSelectedModel().location;

    return model;
  }

  processModelLocation(modelLocation) {
    // eslint-disable-next-line no-undef
    const isNode = typeof process !== "undefined" && process.release.name === "node";
    return isNode ? `file://${modelLocation}` : `${modelLocation}`;
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
      kernelSize: 3,
      activation: "relu",
      padding: "same",
      dtype: this.dtype
    }).apply(input);
  
    const conv2 = tf.layers.conv2d({
      filters: 64,
      kernelSize: 3,
      activation: "relu",
      padding: "same",
      dtype: this.dtype
    }).apply(conv1);
  
    const flattenOrPooling = this.enableVariableInputSize ?
      tf.layers.globalAveragePooling2d({ dataFormat: "channelsLast", trainable: true, dtype: this.dtype }).apply(conv2) :
      tf.layers.flatten({ dtype: this.dtype }).apply(conv2);
  
    const dense1 = DenseLayer({
      units: 64,
      activation: "relu",
      dtype: this.dtype,
      seed: this.trainingRng()
    }).apply(flattenOrPooling);

    const advantage = DenseLayer({
      units: this.numberOfPossibleActions,
      activation: "linear",
      dtype: this.dtype,
      seed: this.trainingRng()
    }).apply(dense1);

    let model;
  
    if(this.enableDuelingQLearning) {
      const dense2 = DenseLayer({
        units: 64,
        activation: "relu",
        dtype: this.dtype,
        seed: this.trainingRng()
      }).apply(flattenOrPooling);

      const value = DenseLayer({
        units: 1,
        activation: "linear",
        dtype: this.dtype,
        seed: this.trainingRng()
      }).apply(dense2);
    
      const qValues = new DuelingQLayer().apply([value, advantage]);
    
      model = tf.model({
        inputs: input,
        outputs: qValues,
        dtype: this.dtype
      });
    } else {
      model = tf.model({
        inputs: input,
        outputs: advantage,
        dtype: this.dtype
      });
    }

    return model;
  }
  
  compileModel(model) {
    model.compile({
      optimizer: tf.train.rmsprop(this.learningRate), // Or Adam
      loss: (yTrue, yPred) => tf.losses.huberLoss(yTrue, yPred) // Or Mean Square Root
    });
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
    if(this.enableTrainingMode && snake._precomputedAction !== undefined) {
      const action = snake._precomputedAction;
      delete snake._precomputedAction;
      return this.actionToKey(snake, action);
    }

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
    return GameUtils.randRange(0, this.numberOfPossibleActions - 1, this.trainingRng);
  }

  getBestAction(snake) {
    if(this.enableTrainingMode) {
      this.resetNoisyLayers();
    }

    return tf.tidy(() => {
      const currentStateTensor = this.stateToTensor(this.getState(snake)).expandDims(0);
  
      const qValues = this.mainModel.predict(currentStateTensor);
      const values = qValues.dataSync();

      const { maxValue, maxIndex } = GameUtils.fastArgMax(values);

      if(this.summaryWriter) {
        this.currentQValue = maxValue;
      }

      return maxIndex;
    });
  }

  aiBatch(snakes) {
    if(this.enableTrainingMode) {
      this.resetNoisyLayers();
    }

    const actions = new Array(snakes.length);
    const snakesForInference = [];
    const inferenceIndices = [];

    for(let i = 0; i < snakes.length; i++) {
      if(this.trainingRng() < this.epsilon && this.enableTrainingMode && !this.enableNoisyNetwork) {
        actions[i] = this.getRandomAction();
      } else {
        snakesForInference.push(snakes[i]);
        inferenceIndices.push(i);
      }
    }

    if(snakesForInference.length > 0) {
      const stateTensors = snakesForInference.map(snake =>
        this.stateToTensor(this.getState(snake))
      );

      try {
        const batchResults = tf.tidy(() => {
          const batch = tf.stack(stateTensors);
          const qValuesBatch = this.mainModel.predict(batch);
          const qValuesArray = qValuesBatch.arraySync();

          return qValuesArray.map((qValues) => {
            const { maxValue, maxIndex } = GameUtils.fastArgMax(qValues);
            if(this.summaryWriter) this.currentQValue = maxValue;
            return maxIndex;
          });
        });

        inferenceIndices.forEach((originalIndex, i) => {
          actions[originalIndex] = batchResults[i];
        });
      } finally {
        stateTensors.forEach(t => t.dispose());
      }
    }

    return actions;
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
    
    for(let y = 0; y < grid.height; y++) {
      for(let x = 0; x < grid.width; x++) {
        const position = new Position(x, y);
        const cellValue = grid.get(position);

        // AI Snake
        if(snake.positionInQueue(position)) {
          if(snake.getHeadPosition().equals(position)) {
            snakesLayer[y][x] = 3;
          } else if(snake.getTailPosition().equals(position)) {
            snakesLayer[y][x] = 2;
          } else {
            snakesLayer[y][x] = 1;
          }
        } else if(cellValue === GameConstants.CaseType.SNAKE) { // Opponent Snakes
          // TODO opponent Snakes - special value for head/tail?
          snakesLayer[y][x] = 4;
        }

        // Fruits
        if(cellValue === GameConstants.CaseType.FRUIT) {
          fruitsAndWallsLayer[y][x] = 1;
        } else if(cellValue === GameConstants.CaseType.FRUIT_GOLD) {
          fruitsAndWallsLayer[y][x] = 2;
        }

        // Walls
        if(cellValue === GameConstants.CaseType.WALL || cellValue == GameConstants.CaseType.SNAKE_DEAD) {
          fruitsAndWallsLayer[y][x] = 3;
        }
      }
    }

    return { snakesLayer, fruitsAndWallsLayer };
  }

  stateToTensor(stateArray) {
    const inputHeight = stateArray.snakesLayer.length;
    const inputWidth = stateArray.snakesLayer[0].length;

    const targetHeight = this.enableVariableInputSize ? inputHeight : this.modelHeight;
    const targetWidth = this.enableVariableInputSize ? inputWidth : this.modelWidth;

    const channels = 2;
    const padValue = -1;
    const data = new Float32Array(targetHeight * targetWidth * channels);

    for(let y = 0; y < targetHeight; y++) {
      for(let x = 0; x < targetWidth; x++) {
        const index = (y * targetWidth + x) * channels;

        const isInside = y < inputHeight && x < inputWidth;

        data[index]     = isInside ? stateArray.snakesLayer[y][x] : padValue;
        data[index + 1] = isInside ? stateArray.fruitsAndWallsLayer[y][x] : padValue;
      }
    }

    return tf.tensor(data, [targetHeight, targetWidth, channels], this.dtype);
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

    if(!batch.samples || batch.samples.length === 0) return;

    const { inputs, targets, meanTDError } = tf.tidy(() => {
      const nextStates = tf.stack(batch.samples.map(({ nextState }) => this.stateToTensor(nextState)));
      const states = tf.stack(batch.samples.map(({ state }) => this.stateToTensor(state)));
      const rewards = tf.tensor1d(batch.samples.map(({ reward }) => reward), this.dtype);
      const dones = tf.tensor1d(batch.samples.map(({ done }) => done ? 0 : 1), this.dtype);
      const actions = tf.tensor1d(batch.samples.map(({ action }) => action), "int32");
  
      const qNextBatch = (this.enableTargetModel ? this.targetModel : this.mainModel).predict(nextStates);
      const qCurrentBatch = this.mainModel.predict(states);
  
      const qNextMax = qNextBatch.max(1);
      const qValues = qCurrentBatch.clone();

      // Bellman Equation
      const discountedFutureRewards = qNextMax.mul(this.gamma).mul(dones);
      const targetQs = rewards.add(discountedFutureRewards);

      const actionMask = tf.oneHot(actions, qValues.shape[1], undefined, undefined, this.dtype);
      const qCurrentActions = qCurrentBatch.mul(actionMask).sum(1);

      const tdErrors = targetQs.sub(qCurrentActions).abs();
      const meanTDError = tdErrors.mean().dataSync()[0];

      tdErrors.dataSync().forEach((error, index) => {
        this.memory.updatePriority(batch.indices[index], error, batch.envAssignments ? batch.envAssignments[index] : null);
      });

      const updatedQValues = qValues.mul(tf.scalar(1).sub(actionMask)).add(actionMask.mul(targetQs.expandDims(1)));

      qValues.dispose();

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

  step(snake, currentState, done, action = null) {
    const nextState = this.getState(snake);
    const reward = this.calculateReward(snake, currentState, done);

    this.remember(currentState, action ?? this.lastAction, reward, nextState, done);
  }

  changeEnvironment(envId) {
    if(this.currentEnv !== envId) {
      this.logger.info(`Changing environment to: ${envId}\n`);

      if(this.memory) {
        this.memory.changeEnvironment(envId);
      }

      this.currentEnv = envId;
    }
  }

  beginEpisode() {
    this.resetNoisyLayers();
  }

  exportMemory() {
    let type = "";

    if(this.memory instanceof UniformReplayBuffer) {
      type = UniformReplayBuffer.getType();
    } else if(this.memory instanceof PrioritizedReplayBuffer) {
      type = PrioritizedReplayBuffer.getType();
    } else if(this.memory instanceof MultiEnvironmentReplayBuffer) {
      type = MultiEnvironmentReplayBuffer.getType();
    }

    return {
      memory: this.memory.serializeToJson(),
      type,
      maxMemoryLength: this.maxMemoryLength
    };
  }

  exportMetadata() {
    return {
      trainingConfig: {
        dtype: this.dtype,
        trainingRandomSeed: this.trainingRandomSeed,
        enableDuelingQLearning: this.enableDuelingQLearning,
        enableNoisyNetwork: this.enableNoisyNetwork,
        syncTargetEvery: this.syncTargetEvery,
        gamma: this.gamma,
        epsilonMax: this.epsilonMax,
        epsilonMin: this.epsilonMin,
        epsilon: this.epsilon,
        learningRate: this.learningRate,
        batchSize: this.batchSize
      },
      modelInfo: {
        modelHeight: this.modelHeight,
        modelWidth: this.modelWidth,
        modelDepth: this.modelDepth,
        numberOfPossibleActions: this.numberOfPossibleActions,
        enableVariableInputSize: this.enableVariableInputSize
      },
      trainingState: {
        trainingRng: this.trainingRng.state(),
        currentEnv: this.currentEnv,
        lastAction: this.lastAction,
        currentQValue: this.currentQValue,
        currentEpoch: this.currentEpoch,
        stepsSinceLastSync: this.stepsSinceLastSync
      }
    };
  }

  async loadMemory(memoryLocation) {
    try {
      this.logger.info(`Loading memory from file: ${memoryLocation}\n`);

      const memoryJSON = await this.fileReader.readJSON(memoryLocation);

      if(!memoryJSON) {
        this.logger.warn(`No memory found at location: ${memoryLocation}\n`);
        return;
      }

      if(!("type" in memoryJSON)) {
        throw new Error("The 'type' property is missing in the memory file.");
      }

      if(!("maxMemoryLength" in memoryJSON) || typeof memoryJSON.maxMemoryLength !== "number") {
        this.logger.warn("maxMemoryLength missing or invalid in the memory file.\n");
      } else {
        this.maxMemoryLength = memoryJSON.maxMemoryLength;
      }

      switch(memoryJSON.type) {
      case UniformReplayBuffer.getType():
        this.memory = new UniformReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger);
        break;
      case PrioritizedReplayBuffer.getType():
        this.memory = new PrioritizedReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger);
        break;
      case MultiEnvironmentReplayBuffer.getType():
        this.memory = new MultiEnvironmentReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger);
        break;
      default:
        throw new Error(`Unknown memory type: ${memoryJSON.type}`);
      }

      if(!("memory" in memoryJSON)) {
        throw new Error("The memory data to deserialize are missing or are invalid.");
      }

      this.memory.deserializeFromJSON(memoryJSON.memory);

      this.logger.info("Memory correctly loaded from file\n");
    } catch (err) {
      this.logger.error(`Error loading memory: ${err.message}\n`);
      this.memory = new MultiEnvironmentReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger);
    }
  }

  async loadMetadata(metadataLocation) {
    try {
      this.logger.info(`Loading metadata from file: ${metadataLocation}\n`);

      const modelLoader = SnakeAIUltraModelLoader.getInstance(this.fileReader);

      const metadata = await modelLoader.loadModelMetadata(metadataLocation);

      if(!metadata) {
        this.logger.warn(`No metadata found at location: ${metadataLocation}\n`);
        return;
      }

      if(metadata.trainingConfig) {
        const config = metadata.trainingConfig;

        if(config.dtype) this.dtype = config.dtype;

        if(typeof config.trainingRandomSeed === "number") {
          this.trainingRandomSeed = config.trainingRandomSeed;
          this.trainingRng = new seedrandom(this.trainingRandomSeed, { state: true });
        }

        if(typeof config.enableDuelingQLearning === "boolean") this.enableDuelingQLearning = config.enableDuelingQLearning;
        if(typeof config.enableNoisyNetwork === "boolean") this.enableNoisyNetwork = config.enableNoisyNetwork;
        if(typeof config.syncTargetEvery === "number") this.syncTargetEvery = config.syncTargetEvery;
        if(typeof config.gamma === "number") this.gamma = config.gamma;
        if(typeof config.epsilonMax === "number") this.epsilonMax = config.epsilonMax;
        if(typeof config.epsilonMin === "number") this.epsilonMin = config.epsilonMin;
        if(typeof config.epsilon === "number") this.epsilon = config.epsilon;
        if(typeof config.learningRate === "number") this.learningRate = config.learningRate;
        if(typeof config.batchSize === "number") this.batchSize = config.batchSize;
      }

      if(metadata.modelInfo) {
        const modelInfo = metadata.modelInfo;

        if(typeof modelInfo.modelHeight === "number") this.modelHeight = modelInfo.modelHeight;
        if(typeof modelInfo.modelWidth === "number") this.modelWidth = modelInfo.modelWidth;
        if(typeof modelInfo.modelDepth === "number") this.modelDepth = modelInfo.modelDepth;
        if(typeof modelInfo.numberOfPossibleActions === "number") this.numberOfPossibleActions = modelInfo.numberOfPossibleActions;
        if(typeof modelInfo.enableVariableInputSize === "boolean") this.enableVariableInputSize = modelInfo.enableVariableInputSize;
      }

      if(metadata.trainingState) {
        const state = metadata.trainingState;

        if(state.trainingRng) {
          this.trainingRng = seedrandom("", { state: state.trainingRng });
        }

        if(state.currentEnv !== undefined) this.currentEnv = state.currentEnv;
        if(state.lastAction !== undefined) this.lastAction = state.lastAction;
        if(state.currentQValue !== undefined) this.currentQValue = state.currentQValue;
        if(state.currentEpoch !== undefined) this.currentEpoch = state.currentEpoch;
        if(state.stepsSinceLastSync !== undefined) this.stepsSinceLastSync = state.stepsSinceLastSync;
      }

      this.logger.info("Metadata correctly loaded from file\n");
    } catch (err) {
      this.logger.error(`Error loading metadata: ${err.message}\n`);
    }
  }
}