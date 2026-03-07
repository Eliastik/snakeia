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
  constructor(enableTrainingMode, modelLocation, seed, logger, fileReader, loadHyperParametersFromMetadata, loadMemoryFromSave) {
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
    this.loadHyperParametersFromMetadata = loadHyperParametersFromMetadata;
    this.loadMemoryFromSave = loadMemoryFromSave;

    // Models
    this.mainModel = null;
    this.targetModel = null;

    // SETTINGS
    // Model settings
    this.modelHeight = 25;
    this.modelWidth = 25;
    this.modelDepth = 2;
    this.numberOfPossibleActions = 3;
    this.dtype = "float32";

    // Model features settings
    this.enableDoubleDQN = true; // Enable Double DQN
    this.enableSoftTargetUpdates = true; // Enable Soft Targets Updates for DQN
    this.enableDuelingQLearning = true; // Enable Dueling DQN
    this.enableNoisyNetwork = true; // Enable Noisy Network for exploration
    /* Enable Variable Input Size for the model (experimental).
       If disabled and the input (grid size) of the game is different than the input size of the model, the input will be padded. */
    this.enableVariableInputSize = false;
    this.enableStateRotation = true; // Rotate the state so that the snake head is always facing "UP"
    this.enableNStepsLearning = true; // Enable N-Steps learning
    this.enableDataAugmentation = true; // Enable automatic data augmentation

    // Hyperparameters
    this.gamma = 0.99;
    this.epsilonMax = 1.0; // Not used if Noisy Network is enabled
    this.epsilonMin = 0.005; // Not used if Noisy Network is enabled
    this.epsilon = this.epsilonMax; // Not used if Noisy Network is enabled
    this.learningRate = 0.001;
    this.batchSize = 64;
    this.syncTargetEvery = 1000; // Sync the Target Model each N training steps
    this.maxMemoryLength = 50000;
    this.nStep = 3;
    this.frameStackSize = 3; // Number of frames to stack (1 = disabled)
    this.softTargetUpdatesCoefficient = 0.005;
    // END OF SETTINGS

    // Replay memory
    this.memory = new MultiEnvironmentReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger, "prioritized");

    // N-Steps buffers (key = instanceId)
    this.nStepBuffers = new Map();

    // Frame stacks (key = instanceId)
    this.frameStacks = new Map();

    // Training state
    this.currentEnv = null;
    this.lastAction = null;
    this.currentQValue = 0;
    this.currentEpoch = 0;
    this.stepsSinceLastSync = 0;

    this.memoryRestoredFromState = false;

    this.summaryWriter = null;

    this.tfOne = tf.scalar(1);

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
    // - Variable grid size -> OK
    // - Always keep the grid "UP" -> OK
    // - Add direction information for Snake head? -> Not needed with state rotation
    // - Multi step learning -> OK, need tests
    // - Frame stacking -> OK, need tests
    // * Ideas:
    // - Data augmentation (reverse the grid etc...)?
    // - Distributional RL - Categorical DQN?
    // - Performance optimizations
    // - Reproducible training with seed: some fixes needed?
  }

  get enableFrameStacking() {
    return this.frameStackSize > 1;
  }

  async setup(summaryWriter) {
    this.mainModel = await this.createOrLoadModel(this.enableTrainingMode, this.modelLocation);

    if(this.enableTrainingMode && this.modelLocation) {
      await this.loadMemory(`${this.modelLocation}/memory.json`);
    }
      
    if(this.modelLocation) {
      await this.loadMetadata(`${this.modelLocation}/metadata.json`);
    }

    if(this.enableTrainingMode) {
      if(this.enableDoubleDQN) {
        this.targetModel = this.createModel();
        this.targetModel.setWeights(this.mainModel.getWeights());
      }

      this.summaryWriter = summaryWriter;

      this.logger.info(`INFO: The current seed for this training process is: ${this.trainingRandomSeed}\n`);

      if(this.enableNoisyNetwork) {
        this.resetNoisyLayers();
      }

      this.logModelCharacteristics();
    } else {
      if(this.enableNoisyNetwork) {
        this.clearNoisyLayers();
      }
    }
  }

  logModelCharacteristics() {
    this.logger.info(this.enableDuelingQLearning ? "Dueling DQN enabled\n" : "Dueling DQN disabled\n");
    this.logger.info(this.enableDoubleDQN ? "Double DQN enabled\n" : "Double DQN disabled\n");
    this.logger.info(this.enableSoftTargetUpdates ? `Soft target updates enabled (coefficient: ${this.softTargetUpdatesCoefficient})\n` : "Soft target updates disabled\n");
    this.logger.info(this.enableNoisyNetwork ? "Noisy Network enabled\n" : "Noisy Network disabled\n");
    this.logger.info(this.enableVariableInputSize ? "Variable input size enabled\n" : "Variable input size disabled\n");
    this.logger.info(this.enableStateRotation ? "State rotation enabled\n" : "State rotation disabled\n");
    this.logger.info(this.enableNStepsLearning ? `N Steps Learning enabled (n=${this.nStep})\n` : "N Steps Learning disabled\n");
    this.logger.info(this.enableFrameStacking ? `Frame stacking enabled (size=${this.frameStackSize})\n` : "Frame stacking disabled\n");
    this.logger.info(this.enableDataAugmentation ? "Data augmentation enabled\n" : "Data augmentation disabled\n");
    this.logger.info(`Model input shape: [${this.enableVariableInputSize ? "variable" : this.modelHeight}, ${this.enableVariableInputSize ? "variable" : this.modelWidth}, ${this.modelDepth * this.frameStackSize}]\n`);
    this.logger.info(`Model output (number of possible actions): ${this.numberOfPossibleActions}\n`);
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
        this.modelDepth * this.frameStackSize
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
  
      if(this.enableDoubleDQN && this.targetModel) {
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
  
      if(this.enableDoubleDQN && this.targetModel) {
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

  getBestAction(snake, instanceId = "inference") {
    if(this.enableTrainingMode) {
      this.resetNoisyLayers();
    }

    return tf.tidy(() => {
      const currentStateTensor = this.stateToTensor(this.getState(snake, instanceId)).expandDims(0);
  
      const qValues = this.mainModel.predict(currentStateTensor);
      const values = qValues.dataSync();

      const { maxValue, maxIndex } = GameUtils.fastArgMax(values);

      if(this.summaryWriter) {
        this.currentQValue = maxValue;
      }

      return maxIndex;
    });
  }

  aiBatch(snakes, instanceIds = null, precomputedStates = null) {
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
        snakesForInference.push({ snake: snakes[i], instanceId: instanceIds?.[i] ?? "inference" });
        inferenceIndices.push(i);
      }
    }

    if(snakesForInference.length > 0) {
      const stateTensors = snakesForInference.map(({ snake, instanceId }, i) => {
        const state = precomputedStates?.[inferenceIndices[i]] ?? this.getState(snake, instanceId);
        return this.stateToTensor(state);
      });

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

  rotateStateLayers(state, direction) {
    let rotations = 0;

    switch(direction) {
    case GameConstants.Direction.UP:     rotations = 0; break;
    case GameConstants.Direction.RIGHT:  rotations = 3; break;
    case GameConstants.Direction.BOTTOM: rotations = 2; break;
    case GameConstants.Direction.LEFT:   rotations = 1; break;
    }

    if(rotations === 0) return state;

    const { snakesLayer, fruitsAndWallsLayer } = state;
    const h = snakesLayer.length;
    const w = snakesLayer[0].length;

    const newH = (rotations % 2 === 1) ? w : h;
    const newW = (rotations % 2 === 1) ? h : w;

    const newSnakes = Array.from({ length: newH }, () => new Array(newW).fill(0));
    const newFruits = Array.from({ length: newH }, () => new Array(newW).fill(0));

    for(let y = 0; y < h; y++) {
      for(let x = 0; x < w; x++) {
        let dstX, dstY;

        switch(rotations) {
        case 1: dstX = h - y - 1; dstY = x; break;
        case 2: dstX = w - x - 1; dstY = h - y - 1; break;
        case 3: dstX = y; dstY = w - x - 1; break;
        }

        newSnakes[dstY][dstX] = snakesLayer[y][x];
        newFruits[dstY][dstX] = fruitsAndWallsLayer[y][x];
      }
    }

    return { snakesLayer: newSnakes, fruitsAndWallsLayer: newFruits };
  }

  getStateRaw(snake) {
    const grid = snake.grid;

    const snakesLayer = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));
    const fruitsAndWallsLayer = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));

    for(let y = 0; y < grid.height; y++) {
      for(let x = 0; x < grid.width; x++) {
        const cellValue = grid.getXY(x, y);

        // AI Snake
        if(snake.positionInQueue(x, y)) {
          if(snake.getHeadPosition().equalsXY(x, y)) {
            snakesLayer[y][x] = 3;
          } else if (snake.getTailPosition().equalsXY(x, y)) {
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

  getState(snake, instanceId = null) {
    const { snakesLayer, fruitsAndWallsLayer } = this.getStateRaw(snake);

    let state = { snakesLayer, fruitsAndWallsLayer };

    if(this.enableStateRotation) {
      const headDirection = snake.getHeadPosition().direction;
      state = { ...this.rotateStateLayers(state, headDirection), headDirection };
    }

    if(this.enableFrameStacking && instanceId) {
      const flat = this.stateToFlatArray(state);
      this.pushFrame(instanceId, flat);
      return this.getStackedState(instanceId, flat);
    }

    return state;
  }

  stateToTensor(stateArray) {
    if(stateArray?.data) {
      let data;

      if(stateArray.data instanceof Float32Array) {
        // Memory already stored as Float32Array format
        data = stateArray.data;
      } else if(stateArray.data instanceof Uint8Array) {
        // Memory already stored as Uint8Array format (msgpack)
        const bytes = stateArray.data;
        const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
        data = new Float32Array(buffer);
      }

      return tf.tensor(data, [stateArray.height, stateArray.width, stateArray.channels], this.dtype);
    }

    // 2D format from getState (no frame stacking, or old memory)
    const { data, width: targetWidth, height: targetHeight, channels } = this.stateToFlatArray(stateArray);

    return tf.tensor(data, [targetHeight, targetWidth, channels], this.dtype);
  }

  stateToFlatArray(stateArray) {
    // Filter to get only arrays (not headDirection)
    const layers = Object.values(stateArray).filter(v => Array.isArray(v));

    const firstChannel = layers[0];
    const inputHeight = firstChannel.length;
    const inputWidth = firstChannel[0].length;

    const targetHeight = this.enableVariableInputSize ? inputHeight : this.modelHeight;
    const targetWidth = this.enableVariableInputSize ? inputWidth : this.modelWidth;

    const channels = layers.length;

    const padValue = -1;
    const data = new Float32Array(targetHeight * targetWidth * channels);

    for(let y = 0; y < targetHeight; y++) {
      for(let x = 0; x < targetWidth; x++) {
        const index = (y * targetWidth + x) * channels;
        const isInside = y < inputHeight && x < inputWidth;

        for(let c = 0; c < channels; c++) {
          data[index + c] = isInside ? layers[c][y][x] : padValue;
        }
      }
    }

    return { data, width: targetWidth, height: targetHeight, channels, headDirection: stateArray.headDirection };
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

  // Frame stacking

  getFrameStack(instanceId) {
    if(!this.frameStacks.has(instanceId)) {
      this.frameStacks.set(instanceId, []);
    }
    return this.frameStacks.get(instanceId);
  }

  pushFrame(instanceId, stateFlat) {
    const stack = this.getFrameStack(instanceId);
    stack.push(stateFlat);

    if(stack.length > this.frameStackSize) {
      stack.shift();
    }
  }

  getStackedState(instanceId, currentStateFlat) {
    const stack = this.getFrameStack(instanceId);
    const frames = [];

    for(let i = 0; i < this.frameStackSize; i++) {
      const frameIdx = stack.length - this.frameStackSize + i;
      // Duplicate first frame when not enough history
      frames.push(frameIdx < 0 ? currentStateFlat : stack[frameIdx]);
    }

    const totalLength = currentStateFlat.data.length * this.frameStackSize;
    const stackedData = new Float32Array(totalLength);

    for(let i = 0; i < this.frameStackSize; i++) {
      stackedData.set(frames[i].data, i * currentStateFlat.data.length);
    }

    return {
      data: stackedData,
      width: currentStateFlat.width,
      height: currentStateFlat.height,
      channels: currentStateFlat.channels * this.frameStackSize,
      headDirection: currentStateFlat.headDirection
    };
  }

  // N-Step learning

  getNStepBuffer(instanceId) {
    if(!this.nStepBuffers.has(instanceId)) {
      this.nStepBuffers.set(instanceId, []);
    }

    return this.nStepBuffers.get(instanceId);
  }

  rememberNStep(state, action, reward, nextState, done, instanceId) {
    const buffer = this.getNStepBuffer(instanceId);
    buffer.push({ state, action, reward, nextState, done });

    if(done) {
      this.flushNStepBuffer(instanceId);
      return;
    }

    if(buffer.length >= this.nStep) {
      this.commitNStep(buffer);
      buffer.shift();
    }
  }

  commitNStep(buffer) {
    let cumulatedReward = 0;
    let discount = 1;

    for(let i = 0; i < buffer.length; i++) {
      cumulatedReward += discount * buffer[i].reward;
      discount *= this.gamma;
      if(buffer[i].done) break;
    }

    const first = buffer[0];
    const last = buffer[buffer.length - 1];

    this.remember(first.state, first.action, cumulatedReward, last.nextState, last.done);
  }

  flushNStepBuffer(instanceId) {
    const buffer = this.getNStepBuffer(instanceId);

    while(buffer.length > 0) {
      this.commitNStep(buffer);
      buffer.shift();
    }
  }

  remember(state, action, reward, nextState, done) {
    const stateFlat = state.data ? state : this.stateToFlatArray(state);
    const nextStateFlat = nextState.data ? nextState : this.stateToFlatArray(nextState);

    this.memory.add(stateFlat, action, reward, nextStateFlat, done);

    if(this.enableDataAugmentation) {
      // Horizontal flip
      const flippedH = this.flipState(stateFlat, true, false);
      const flippedHNext = this.flipState(nextStateFlat, true, false);

      this.memory.add(flippedH, this.flipActionHorizontal(action), reward, flippedHNext, done);

      // Vertical flip
      const flippedV = this.flipState(stateFlat, false, true);
      const flippedVNext = this.flipState(nextStateFlat, false, true);

      this.memory.add(flippedV, this.flipActionVertical(action), reward, flippedVNext, done);

      // Horizontal + vertical flip combined
      const flippedHV = this.flipState(stateFlat, true, true);
      const flippedHVNext = this.flipState(nextStateFlat, true, true);

      this.memory.add(flippedHV, this.flipActionHorizontal(this.flipActionVertical(action)), reward, flippedHVNext, done);
    }
  }

  flipState(stateFlat, flipH = false, flipV = false) {
    const { data, width, height, channels, headDirection } = stateFlat;
    const flipped = new Float32Array(data.length);

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const srcIndex = (y * width + x) * channels;
        const dstX = flipH ? (width - 1 - x) : x;
        const dstY = flipV ? (height - 1 - y) : y;
        const dstIndex = (dstY * width + dstX) * channels;

        for(let c = 0; c < channels; c++) {
          flipped[dstIndex + c] = data[srcIndex + c];
        }
      }
    }

    return { data: flipped, width, height, channels, headDirection };
  }

  flipActionHorizontal(action) {
    if(this.numberOfPossibleActions === 3) {
      if(!this.enableStateRotation) {
        return GameConstants.AIActions.CONTINUE;
      }

      switch(action) {
      case GameConstants.AIActions.TURN_LEFT:
        return GameConstants.AIActions.TURN_RIGHT;
      case GameConstants.AIActions.TURN_RIGHT:
        return GameConstants.AIActions.TURN_LEFT;
      }
    } else if(this.numberOfPossibleActions === 4) {
      switch(action) {
      case GameConstants.ActionMapping[GameConstants.Direction.LEFT]:
        return GameConstants.ActionMapping[GameConstants.Direction.RIGHT];
      case GameConstants.ActionMapping[GameConstants.Direction.RIGHT]:
        return GameConstants.ActionMapping[GameConstants.Direction.LEFT];
      }
    }

    return action;
  }

  flipActionVertical(action) {
    if(this.numberOfPossibleActions === 3) {
      return GameConstants.AIActions.CONTINUE;
    } else if(this.numberOfPossibleActions === 4) {
      switch(action) {
      case GameConstants.ActionMapping[GameConstants.Direction.UP]:
        return GameConstants.ActionMapping[GameConstants.Direction.DOWN];
      case GameConstants.ActionMapping[GameConstants.Direction.DOWN]:
        return GameConstants.ActionMapping[GameConstants.Direction.UP];
      default:
        return action;
      }
    }

    return action;
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

      let qNextMax;

      if(this.enableDoubleDQN) {
        const qNextMain = this.mainModel.predict(nextStates);
        const qNextTarget = this.targetModel.predict(nextStates);

        const bestNextActions = qNextMain.argMax(1);

        const batchIndices = tf.range(0, this.batchSize, 1, "int32");
        const stackedIndices = tf.stack([batchIndices, bestNextActions], 1);

        qNextMax = tf.gatherND(qNextTarget, stackedIndices);
      } else {
        qNextMax = this.mainModel.predict(nextStates).max(1);
      }
  
      const qCurrentBatch = this.mainModel.predict(states);
      const qValues = qCurrentBatch.clone();

      // Bellman equation with optional N-step gamma
      const gammaN = this.enableNStepsLearning ? Math.pow(this.gamma, this.nStep) : this.gamma;
      const targetQs = rewards.add(qNextMax.mul(gammaN).mul(dones));

      const actionMask = tf.oneHot(actions, qValues.shape[1], undefined, undefined, this.dtype);
      const qCurrentActions = qCurrentBatch.mul(actionMask).sum(1);

      const tdErrors = targetQs.sub(qCurrentActions).abs();
      const tdErrorsArray = tdErrors.dataSync();

      const meanTDError = tdErrorsArray.reduce((a, b) => a + b, 0) / tdErrorsArray.length;

      tdErrorsArray.forEach((error, index) => {
        this.memory.updatePriority(batch.indices[index], error, batch.envAssignments ? batch.envAssignments[index] : null);
      });
      
      const updatedQValues = qValues.mul(this.tfOne.sub(actionMask)).add(actionMask.mul(targetQs.expandDims(1)));

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
    const memory = this.memory.sample(this.batchSize);

    if(!this.enableStateRotation) {
      return memory;
    }

    memory.samples = memory.samples.filter(sample =>
      sample.state.headDirection !== undefined &&
      sample.nextState.headDirection !== undefined
    );
    
    return memory;
  }

  synchronizeTargetNetwork(forceHardTargetUpdates = false) {
    if(this.enableDoubleDQN) {
      this.logger.info("Synchronizing target network...\n");

      if(!forceHardTargetUpdates && this.enableSoftTargetUpdates) {
        const mainWeights = this.mainModel.getWeights();
        const targetWeights = this.targetModel.getWeights();

        const updatedWeights = mainWeights.map((w, i) =>
          tf.tidy(() => w.mul(this.softTargetUpdatesCoefficient).add(targetWeights[i].mul(1 - this.softTargetUpdatesCoefficient)))
        );

        this.targetModel.setWeights(updatedWeights);
        updatedWeights.forEach(w => w.dispose());
      } else {
        this.targetModel.setWeights(this.mainModel.getWeights());
      }

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

      return numberOfEmptyCaseAround >= 1 ?
        GameConstants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND :
        GameConstants.AIRewards.GAME_OVER;
    }

    if(snake.isAIStuck(1)) {
      const stuckRatio = snake.stuckCounter / snake.maxLastMoves;
      const penalty = Math.min(0.001 * stuckRatio, GameConstants.AIRewards.STUCK_MAX_PENALTY);
      return GameConstants.AIRewards.MOVE - penalty;
    }

    if(fruit && head.x === fruit.x && head.y === fruit.y) {
      return GameConstants.AIRewards.FRUIT_EATEN;
    }

    if(fruitGold && head.x === fruitGold.x && head.y === fruitGold.y) {
      return GameConstants.AIRewards.GOLD_FRUIT_EATEN;
    }

    if(fruit) {
      const prevHead = snake.get(1);

      if(prevHead) {
        const distBefore = this.bfsDistance(snake, prevHead.x, prevHead.y, fruit.x, fruit.y);
        const distAfter = this.bfsDistance(snake, head.x, head.y, fruit.x, fruit.y);

        if(distAfter === -1) {
          return GameConstants.AIRewards.MOVE - 0.05;
        }

        return GameConstants.AIRewards.MOVE + (distBefore - distAfter) * 0.05;
      }
    }

    return GameConstants.AIRewards.MOVE;
  }

  bfsDistance(snake, fromX, fromY, toX, toY) {
    const grid = snake.grid;
    const visited = new Set();
    const queue = [[fromX, fromY, 0]];
  
    visited.add(`${fromX},${fromY}`);

    while(queue.length > 0) {
      const [x, y, dist] = queue.shift();

      if(x === toX && y === toY) {
        return dist;
      }

      for(const [dx, dy] of [[0,-1],[0,1],[-1,0],[1,0]]) {
        const nx = x + dx;
        const ny = y + dy;

        if(nx < 0 || ny < 0 || nx >= grid.width || ny >= grid.height) {
          continue;
        }

        const key = `${nx},${ny}`;
        if(visited.has(key)) continue;
        visited.add(key);

        if(!grid.isDeadPositionXY(nx, ny)) {
          queue.push([nx, ny, dist + 1]);
        }
      }
    }

    return -1;
  }

  step(snake, currentState, done, reward, action = null, instanceId = null) {
    const nextStateData = this.getState(snake, instanceId);

    if(this.enableNStepsLearning && this.nStep > 1 && instanceId) {
      this.rememberNStep(currentState, action ?? this.lastAction, reward, nextStateData, done, instanceId);
    } else {
      this.remember(currentState, action ?? this.lastAction, reward, nextStateData, done);
    }
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

  beginEpisode(instanceId = null) {
    this.resetNoisyLayers();

    if(instanceId) {
      if(this.enableNStepsLearning) {
        this.flushNStepBuffer(instanceId);
      }

      if(this.enableFrameStacking) {
        this.frameStacks.delete(instanceId);
      }

      this.nStepBuffers.delete(instanceId);
    }
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
        enableDoubleDQN: this.enableDoubleDQN,
        enableSoftTargetUpdates: this.enableSoftTargetUpdates,
        enableNoisyNetwork: this.enableNoisyNetwork,
        syncTargetEvery: this.syncTargetEvery,
        gamma: this.gamma,
        epsilonMax: this.epsilonMax,
        epsilonMin: this.epsilonMin,
        epsilon: this.epsilon,
        learningRate: this.learningRate,
        batchSize: this.batchSize,
        enableStateRotation: this.enableStateRotation,
        enableNStepsLearning: this.enableNStepsLearning,
        enableDataAugmentation: this.enableDataAugmentation,
        nStep: this.nStep,
        softTargetUpdatesCoefficient: this.softTargetUpdatesCoefficient
      },
      modelInfo: {
        modelHeight: this.modelHeight,
        modelWidth: this.modelWidth,
        modelDepth: this.modelDepth,
        frameStackSize: this.frameStackSize,
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
    if(!this.loadMemoryFromSave) {
      this.logger.info("Memory loading from file is disabled. Skipping memory loading.\n");
      this.memoryRestoredFromState = false;
      return;
    }

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
      this.memoryRestoredFromState = true;
    } catch (err) {
      this.logger.error(`Error loading memory: ${err.message}\n`);
      this.memory = new MultiEnvironmentReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger);
      this.memoryRestoredFromState = false;
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

        if(typeof config.enableDoubleDQN === "boolean") this.enableDoubleDQN = config.enableDoubleDQN;
        if(typeof config.enableSoftTargetUpdates === "boolean") this.enableSoftTargetUpdates = config.enableSoftTargetUpdates;
        if(typeof config.enableDuelingQLearning === "boolean") this.enableDuelingQLearning = config.enableDuelingQLearning;
        if(typeof config.enableNoisyNetwork === "boolean") this.enableNoisyNetwork = config.enableNoisyNetwork;
        if(typeof config.enableNStepsLearning === "boolean") this.enableNStepsLearning = config.enableNStepsLearning;
        if(typeof config.enableDataAugmentation === "boolean") this.enableDataAugmentation = config.enableDataAugmentation;

        if(typeof config.enableStateRotation === "boolean") {
          this.enableStateRotation = config.enableStateRotation;
        } else if(config.enableStateRotation === undefined) {
          // To stay compatible with old models
          this.enableStateRotation = false;
        }

        if(this.loadHyperParametersFromMetadata) {
          if(typeof config.syncTargetEvery === "number") this.syncTargetEvery = config.syncTargetEvery;
          if(typeof config.gamma === "number") this.gamma = config.gamma;
          if(typeof config.epsilonMax === "number") this.epsilonMax = config.epsilonMax;
          if(typeof config.epsilonMin === "number") this.epsilonMin = config.epsilonMin;
          if(typeof config.epsilon === "number") this.epsilon = config.epsilon;
          if(typeof config.learningRate === "number") this.learningRate = config.learningRate;
          if(typeof config.batchSize === "number") this.batchSize = config.batchSize;
          if(typeof config.nStep === "number") this.nStep = config.nStep;
          if(typeof config.softTargetUpdatesCoefficient === "number") this.softTargetUpdatesCoefficient = config.softTargetUpdatesCoefficient;
        } else {
          this.logger.info("Loading hyperparameters from metadata is disabled. Skipping hyperparameters loading.\n");
        }
      }

      if(metadata.modelInfo) {
        const modelInfo = metadata.modelInfo;

        if(typeof modelInfo.modelHeight === "number") this.modelHeight = modelInfo.modelHeight;
        if(typeof modelInfo.modelWidth === "number") this.modelWidth = modelInfo.modelWidth;
        if(typeof modelInfo.modelDepth === "number") this.modelDepth = modelInfo.modelDepth;
        if(typeof modelInfo.numberOfPossibleActions === "number") this.numberOfPossibleActions = modelInfo.numberOfPossibleActions;
        if(typeof modelInfo.enableVariableInputSize === "boolean") this.enableVariableInputSize = modelInfo.enableVariableInputSize;

        if(typeof modelInfo.frameStackSize === "number") {
          this.frameStackSize = modelInfo.frameStackSize;
        } else {
          // To stay compatible with old models
          this.frameStackSize = 1;
        }
      }

      if(metadata.trainingState) {
        const state = metadata.trainingState;

        if(state.trainingRng) {
          this.trainingRng = seedrandom("", { state: state.trainingRng });
        }

        if(state.currentEnv !== undefined && this.memoryRestoredFromState) this.currentEnv = state.currentEnv;
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