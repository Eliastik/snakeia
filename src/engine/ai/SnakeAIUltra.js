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
    this.enableActionMasking = true; // Enable Action Masking (avoid dead actions)
    this.enableEnvEmbedding = true; // Enable Environment Embedding (pass env features to model)

    // Hyperparameters
    this.gamma = 0.99;
    this.epsilonMax = 1.0; // Not used if Noisy Network is enabled
    this.epsilonMin = 0.005; // Not used if Noisy Network is enabled
    this.epsilon = this.epsilonMax; // Not used if Noisy Network is enabled
    this.learningRate = 0.0001;
    this.batchSize = 256;
    this.syncTargetEvery = 1000; // Sync the Target Model each N training steps
    this.maxMemoryLength = 50000;
    this.nStep = 3;
    this.frameStackSize = 4; // Number of frames to stack (1 = disabled)
    this.softTargetUpdatesCoefficient = 0.005;
    this.envFeatureSize = 6; // [gridWidth/W, gridHeight/H, hasWalls, hasRandomWalls, isMaze, hasOpponents]
    this.envEmbedSize = 16;
    // END OF SETTINGS

    // Replay memory
    this.memory = new MultiEnvironmentReplayBuffer(this.maxMemoryLength, this.trainingRng, this.logger, "prioritized");

    // N-Steps buffers (key = instanceId)
    this.nStepBuffers = new Map();

    // Frame stacks (key = instanceId)
    this.frameStacks = new Map();

    // Training state
    this.currentEnv = null;
    this.currentEnvFeatures = null;
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
    // - N Step Learning -> OK
    // - Frame stacking -> OK
    // - Data augmentation (reverse the grid etc...)? -> OK
    // - Performance optimizations -> OK
    // - Pass environment characteristics to model (grid size, random walls, opponents, maze mode, etc.) -> OK, need tests
    // * Ideas:
    // - Use IS weights for Prioritized Experience Replay
    // - Distributional RL - Categorical DQN?
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
    this.logger.info(this.enableActionMasking ? "Action masking enabled\n" : "Action masking disabled\n");
    this.logger.info(this.enableEnvEmbedding ? `Env embedding enabled (features=${this.envFeatureSize}, embed=${this.envEmbedSize})\n` : "Env embedding disabled\n");
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

    const stateInput = tf.input({
      shape: [
        this.enableVariableInputSize ? null : this.modelHeight,
        this.enableVariableInputSize ? null : this.modelWidth,
        this.modelDepth * this.frameStackSize
      ],
      name: "state_input"
    });

    const conv1 = tf.layers.conv2d({
      filters: 32,
      kernelSize: 3,
      activation: "relu",
      padding: "same",
      dtype: this.dtype
    }).apply(stateInput);

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

    // Optional second input: environment features
    let trunk = flattenOrPooling;
    let modelInputs = stateInput;

    if(this.enableEnvEmbedding) {
      const envInput = tf.input({ shape: [this.envFeatureSize], name: "env_input" });

      const envEmbed = tf.layers.dense({
        units: this.envEmbedSize,
        activation: "relu",
        dtype: this.dtype,
        name: "env_embed"
      }).apply(envInput);

      trunk = tf.layers.concatenate({ name: "trunk_merged" }).apply([flattenOrPooling, envEmbed]);
      modelInputs = [stateInput, envInput];
    }

    const dense1 = DenseLayer({
      units: 64,
      activation: "relu",
      dtype: this.dtype,
      seed: this.trainingRng()
    }).apply(trunk);

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
      }).apply(trunk);

      const value = DenseLayer({
        units: 1,
        activation: "linear",
        dtype: this.dtype,
        seed: this.trainingRng()
      }).apply(dense2);

      const qValues = new DuelingQLayer().apply([value, advantage]);

      model = tf.model({ inputs: modelInputs, outputs: qValues, dtype: this.dtype });
    } else {
      model = tf.model({ inputs: modelInputs, outputs: advantage, dtype: this.dtype });
    }

    return model;
  }
  
  // Returns a Float32Array(6) of normalised env features
  envFeaturesToArray(features) {
    return new Float32Array([
      features.gridWidth  / this.modelWidth,
      features.gridHeight / this.modelHeight,
      features.hasWalls       ? 1 : 0,
      features.hasRandomWalls ? 1 : 0,
      features.isMaze         ? 1 : 0,
      features.hasOpponents ? 1 : 0
    ]);
  }

  envFeaturesToTensor(features) {
    return tf.tensor1d(this.envFeaturesToArray(features), this.dtype);
  }

  neutralEnvFeatures() {
    return {
      gridWidth: this.modelWidth, gridHeight: this.modelHeight,
      hasWalls: false, hasRandomWalls: false, isMaze: false, hasOpponents: false
    };
  }

  extractEnvFeaturesFromGrid(grid) {
    return {
      gridWidth:      grid.width,
      gridHeight:     grid.height,
      hasWalls:       grid.borderWalls  ?? false,
      hasRandomWalls: grid.randomWalls  ?? false,
      isMaze:         grid.maze         ?? false,
      hasOpponents:   grid.hasOpponents ?? false
    };
  }

  // For a single inference call: stateTensor already has batch dim [1,H,W,C]
  wrapInputSingle(stateTensor, envFeatures) {
    if(!this.enableEnvEmbedding) return stateTensor;
    const f = envFeatures ?? this.currentEnvFeatures ?? this.neutralEnvFeatures();
    return [stateTensor, this.envFeaturesToTensor(f).expandDims(0)];
  }

  // For a batch call: statesBatch is [N,H,W,C], envFeaturesArr is Array(N)
  wrapInputBatch(statesBatch, envFeaturesArr) {
    if(!this.enableEnvEmbedding) return statesBatch;
    const rows = envFeaturesArr.map(f => this.envFeaturesToArray(f ?? this.currentEnvFeatures ?? this.neutralEnvFeatures()));
    const flat = new Float32Array(rows.length * this.envFeatureSize);
    rows.forEach((r, i) => flat.set(r, i * this.envFeatureSize));
    return [statesBatch, tf.tensor2d(flat, [rows.length, this.envFeatureSize], this.dtype)];
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
    if(this.enableFrameStacking) {
      const currentScore = snake.score;

      if(this._lastScore === undefined) {
        this._lastScore = currentScore;
      }
    
      if(currentScore !== this._lastScore) {
        this.resetFrameStack("inference");
        this._lastScore = currentScore;
      }
    }
  
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
      const state = this.getState(snake, instanceId);
      const stateTensor = this.stateToTensor(state).expandDims(0);
      const envFeatures = this.currentEnvFeatures ?? this.extractEnvFeaturesFromGrid(snake.grid);
      const modelInput = this.wrapInputSingle(stateTensor, envFeatures);

      const qValues = this.mainModel.predict(modelInput);
      const values = Array.from(qValues.dataSync());

      if(this.enableActionMasking) {
        const deadActions = this.getDeadActions(snake);
        deadActions.forEach(a => { values[a] = -Infinity; });
      }

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
          const statesBatch = tf.stack(stateTensors);
          const envFeaturesArr = snakesForInference.map(({ snake }) =>
            this.currentEnvFeatures ?? this.extractEnvFeaturesFromGrid(snake.grid)
          );
          const modelInput = this.wrapInputBatch(statesBatch, envFeaturesArr);
          const qValuesBatch = this.mainModel.predict(modelInput);
          const qValuesArray = qValuesBatch.arraySync();

          return qValuesArray.map((qValues, i) => {
            let values = qValues;

            if(this.enableActionMasking) {
              values = Array.from(qValues);
              const deadActions = this.getDeadActions(snakesForInference[i].snake);
              deadActions.forEach(a => { values[a] = -Infinity; });
            }

            const { maxValue, maxIndex } = GameUtils.fastArgMax(values);

            if(this.summaryWriter) {
              this.currentQValue = maxValue;
            }

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

  // TODO fix
  getDeadActions(snake) {
    const head = snake.getHeadPosition();
    const deadActions = new Set();

    const actionDirections = this.numberOfPossibleActions === 3 ? [
      { action: GameConstants.AIActions.CONTINUE,   dir: head.direction },
      { action: GameConstants.AIActions.TURN_LEFT,  dir: this.turnLeft(head.direction) },
      { action: GameConstants.AIActions.TURN_RIGHT, dir: this.turnRight(head.direction) }
    ] : [
      { action: GameConstants.ActionMapping[GameConstants.Direction.UP],    dir: GameConstants.Direction.UP },
      { action: GameConstants.ActionMapping[GameConstants.Direction.DOWN],  dir: GameConstants.Direction.DOWN },
      { action: GameConstants.ActionMapping[GameConstants.Direction.LEFT],  dir: GameConstants.Direction.LEFT },
      { action: GameConstants.ActionMapping[GameConstants.Direction.RIGHT], dir: GameConstants.Direction.RIGHT }
    ];

    for(const { action, dir } of actionDirections) {
      const next = snake.getNextPosition(head, dir);
      
      if(snake.grid.isDeadPosition(next)) {
        deadActions.add(action);
      }
    }

    if(deadActions.size >= this.numberOfPossibleActions) {
      return new Set();
    }

    return deadActions;
  }

  turnLeft(direction) {
    switch(direction) {
    case GameConstants.Direction.UP:     return GameConstants.Direction.LEFT;
    case GameConstants.Direction.LEFT:   return GameConstants.Direction.BOTTOM;
    case GameConstants.Direction.BOTTOM: return GameConstants.Direction.RIGHT;
    case GameConstants.Direction.RIGHT:  return GameConstants.Direction.UP;
    }
  }

  turnRight(direction) {
    switch(direction) {
    case GameConstants.Direction.UP:     return GameConstants.Direction.RIGHT;
    case GameConstants.Direction.RIGHT:  return GameConstants.Direction.BOTTOM;
    case GameConstants.Direction.BOTTOM: return GameConstants.Direction.LEFT;
    case GameConstants.Direction.LEFT:   return GameConstants.Direction.UP;
    }
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

  getState(snake, instanceId = "inference", pushToFrameStack = true) {
    const { snakesLayer, fruitsAndWallsLayer } = this.getStateRaw(snake);

    let state = { snakesLayer, fruitsAndWallsLayer };

    if(this.enableStateRotation) {
      const headDirection = snake.getHeadPosition().direction;
      state = { ...this.rotateStateLayers(state, headDirection), headDirection };
    }

    if(this.enableFrameStacking && instanceId) {
      const flat = this.stateToFlatArray(state);
      return this.getStackedState(instanceId, flat, pushToFrameStack);
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

  findAllPositionsInState(stateArray, targetValue) {
    const positions = [];
    const targetTypeValue = GameConstants.CaseTypeAIValue[targetValue];
    
    for(let i = 0; i < stateArray.length; i++) {
      for(let j = 0; j < stateArray[i].length; j++) {
        if(stateArray[i][j] === targetTypeValue) {
          positions.push({ x: j, y: i });
        }
      }
    }

    return positions;
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

  getStackedState(instanceId, currentStateFlat, pushToFrameStack = true) {
    const stack = this.getFrameStack(instanceId);

    if(pushToFrameStack) {
      this.pushFrame(instanceId, currentStateFlat);
    }

    const virtualLength = pushToFrameStack ? stack.length : stack.length + 1;
    const frames = [];

    for(let i = 0; i < this.frameStackSize; i++) {
      const frameIdx = virtualLength - this.frameStackSize + i;

      if(frameIdx < 0) {
        frames.push(currentStateFlat);
      } else if(frameIdx < stack.length) {
        frames.push(stack[frameIdx]);
      } else {
        frames.push(currentStateFlat);
      }
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

  resetFrameStack(instanceId) {
    this.frameStacks.delete(instanceId);
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
    let effectiveN = 0;

    for(let i = 0; i < buffer.length; i++) {
      cumulatedReward += discount * buffer[i].reward;
      discount *= this.gamma;
      effectiveN++;

      if(buffer[i].done) {
        break;
      }
    }

    const first = buffer[0];
    const last = buffer[buffer.length - 1];

    this.remember(first.state, first.action, cumulatedReward, last.nextState, last.done, effectiveN);
  }

  flushNStepBuffer(instanceId) {
    const buffer = this.getNStepBuffer(instanceId);

    while(buffer.length > 0) {
      this.commitNStep(buffer);
      buffer.shift();
    }
  }

  remember(state, action, reward, nextState, done, effectiveN = null) {
    const stateFlat = state.data ? state : this.stateToFlatArray(state);
    const nextStateFlat = nextState.data ? nextState : this.stateToFlatArray(nextState);

    const nToStore = effectiveN ?? (this.enableNStepsLearning ? this.nStep : 1);
    const envFeatures = this.currentEnvFeatures ?? this.neutralEnvFeatures();

    this.memory.add(stateFlat, action, reward, nextStateFlat, done, nToStore, envFeatures);

    if(this.enableDataAugmentation) {
      // Horizontal flip
      const flippedH = this.flipState(stateFlat, true, false);
      const flippedHNext = this.flipState(nextStateFlat, true, false);

      this.memory.add(flippedH, this.flipActionHorizontal(action), reward, flippedHNext, done, nToStore, envFeatures);

      // Vertical flip
      const flippedV = this.flipState(stateFlat, false, true);
      const flippedVNext = this.flipState(nextStateFlat, false, true);

      this.memory.add(flippedV, this.flipActionVertical(action), reward, flippedVNext, done, nToStore, envFeatures);

      // Horizontal + vertical flip combined
      const flippedHV = this.flipState(stateFlat, true, true);
      const flippedHVNext = this.flipState(nextStateFlat, true, true);

      this.memory.add(flippedHV, this.flipActionHorizontal(this.flipActionVertical(action)), reward, flippedHVNext, done, nToStore, envFeatures);
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

    const actualBatchSize = batch.samples.length;

    const { inputs, targets, meanTDError } = tf.tidy(() => {
      const nextStates = tf.stack(batch.samples.map(({ nextState }) => this.stateToTensor(nextState)));
      const states = tf.stack(batch.samples.map(({ state }) => this.stateToTensor(state)));
      const rewards = tf.tensor1d(batch.samples.map(({ reward }) => reward), this.dtype);
      const dones = tf.tensor1d(batch.samples.map(({ done }) => done ? 0 : 1), this.dtype);
      const actions = tf.tensor1d(batch.samples.map(({ action }) => action), "int32");

      // Build env batch — use stored envFeatures per sample, fallback to neutral
      const envFeaturesArr = batch.samples.map(s => s.envFeatures ?? this.neutralEnvFeatures());
      const statesIn     = this.wrapInputBatch(states,     envFeaturesArr);
      const nextStatesIn = this.wrapInputBatch(nextStates, envFeaturesArr);

      let qNextMax;

      if(this.enableDoubleDQN) {
        const qNextMain   = this.mainModel.predict(nextStatesIn);
        const qNextTarget = this.targetModel.predict(nextStatesIn);

        const bestNextActions = qNextMain.argMax(1);

        const batchIndices = tf.range(0, actualBatchSize, 1, "int32");
        const stackedIndices = tf.stack([batchIndices, bestNextActions], 1);

        qNextMax = tf.gatherND(qNextTarget, stackedIndices);
      } else {
        qNextMax = this.mainModel.predict(nextStatesIn).max(1);
      }

      const qCurrentBatch = this.mainModel.predict(statesIn);
      const qValues = qCurrentBatch.clone();

      // Bellman equation with optional N-step gamma
      const gammaNs = tf.tensor1d(
        batch.samples.map(s => Math.pow(this.gamma, s.nStep ?? this.nStep)),
        this.dtype
      );
      const targetQs = rewards.add(qNextMax.mul(gammaNs).mul(dones));

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

    // Rebuild statesIn for fit (tidy disposed it) — wrapInputBatch creates a new tensor2d
    const envFeaturesArrFit = batch.samples.map(s => s.envFeatures ?? this.neutralEnvFeatures());
    const fitInputs = this.wrapInputBatch(inputs, envFeaturesArrFit);

    const fitData = await this.mainModel.fit(fitInputs, targets, { batchSize: actualBatchSize, epochs: 1, verbose: 0, shuffle: true });

    // Dispose env tensor created for fit (state tensor disposed below)
    if(this.enableEnvEmbedding && Array.isArray(fitInputs)) {
      fitInputs[1].dispose();
    }

    if(this.summaryWriter) {
      this.summaryWriter.scalar("loss", fitData.history.loss[0], this.currentEpoch);
      this.summaryWriter.scalar("td_error", meanTDError, this.currentEpoch);
      this.summaryWriter.scalar("epsilon", this.epsilon, this.currentEpoch);
    }

    // Cleanup tensors
    inputs.dispose();
    targets.dispose();

    if(this.enableSoftTargetUpdates) {
      this.synchronizeTargetNetwork();
    } else if(this.stepsSinceLastSync >= this.syncTargetEvery) {
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
      if(!forceHardTargetUpdates && this.enableSoftTargetUpdates) {
        const mainWeights = this.mainModel.getWeights();
        const targetWeights = this.targetModel.getWeights();

        const updatedWeights = mainWeights.map((w, i) =>
          tf.tidy(() => w.mul(this.softTargetUpdatesCoefficient).add(targetWeights[i].mul(1 - this.softTargetUpdatesCoefficient)))
        );

        this.targetModel.setWeights(updatedWeights);
        updatedWeights.forEach(w => w.dispose());
      } else {
        this.logger.info("Synchronizing target network...\n");
        this.targetModel.setWeights(this.mainModel.getWeights());
        this.logger.info("Target network synchronized!\n");
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  calculateReward(snake, currentState, done) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();

    const fruits = this.findAllPositionsInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT);
    const goldFruits = this.findAllPositionsInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT_GOLD);

    if(fruits.length === 0 && goldFruits.length === 0) {
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

    for(const fruit of fruits) {
      if(head.x === fruit.x && head.y === fruit.y) {
        return GameConstants.AIRewards.FRUIT_EATEN;
      }
    }

    for(const fruitGold of goldFruits) {
      if(head.x === fruitGold.x && head.y === fruitGold.y) {
        return GameConstants.AIRewards.GOLD_FRUIT_EATEN;
      }
    }

    if(fruits.length > 0 || goldFruits.length > 0) {
      const prevHead = snake.get(1);

      if(prevHead) {
        const distFromHead = this.bfsAll(snake, head.x, head.y);
        const distFromPrev = this.bfsAll(snake, prevHead.x, prevHead.y);
        const key = (pos) => pos.y * snake.grid.width + pos.x;

        let closestFruit = null;
        let closestFruitDist = Infinity;

        for(const fruit of fruits) {
          const d = distFromHead[key(fruit)];

          if(d !== -1 && d < closestFruitDist) {
            closestFruitDist = d;
            closestFruit = fruit;
          }
        }

        let closestGoldFruit = null;
        let closestGoldFruitDist = Infinity;

        for(const fruitGold of goldFruits) {
          const d = distFromHead[key(fruitGold)];

          if(d !== -1 && d < closestGoldFruitDist) {
            closestGoldFruitDist = d;
            closestGoldFruit = fruitGold;
          }
        }

        let targetFruit = null;

        if(closestFruit && closestGoldFruit) {
          targetFruit = closestGoldFruitDist <= closestFruitDist * 0.8 ? closestGoldFruit : closestFruit;
        } else if(closestFruit) {
          targetFruit = closestFruit;
        } else if(closestGoldFruit) {
          targetFruit = closestGoldFruit;
        }

        if(targetFruit) {
          const distAfter = distFromHead[key(targetFruit)];
          const distBefore = distFromPrev[key(targetFruit)];

          if(distAfter === -1) {
            return GameConstants.AIRewards.MOVE - 0.05;
          }

          return GameConstants.AIRewards.MOVE + (distBefore - distAfter) * 0.05;
        }
      }
    }

    return GameConstants.AIRewards.MOVE;
  }

  bfsAll(snake, fromX, fromY) {
    const grid = snake.grid;
    const size = grid.width * grid.height;
    const dist = new Int16Array(size).fill(-1);
    const queue = new Int32Array(size);

    const startKey = fromY * grid.width + fromX;
    dist[startKey] = 0;
    queue[0] = startKey;
    let head = 0, tail = 1;

    while(head < tail) {
      const key = queue[head++];
      const x = key % grid.width;
      const y = (key - x) / grid.width;
      const d = dist[key];

      if(x > 0) {
        const nk = key - 1;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x - 1, y)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }

      if(x < grid.width - 1) {
        const nk = key + 1;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x + 1, y)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }

      if(y > 0) {
        const nk = key - grid.width;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x, y - 1)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }

      if(y < grid.height - 1) {
        const nk = key + grid.width;
        if(dist[nk] === -1 && !grid.isDeadPositionXY(x, y + 1)) { dist[nk] = d + 1; queue[tail++] = nk; }
      }
    }

    return dist;
  }

  bfsDistance(snake, fromX, fromY, toX, toY) {
    return this.bfsAll(snake, fromX, fromY)[toY * snake.grid.width + toX];
  }

  step(snake, currentState, done, reward, action = null, instanceId = "inference") {
    const nextStateData = this.getState(snake, instanceId, false);

    if(this.enableNStepsLearning && this.nStep > 1 && instanceId) {
      this.rememberNStep(currentState, action ?? this.lastAction, reward, nextStateData, done, instanceId);
    } else {
      this.remember(currentState, action ?? this.lastAction, reward, nextStateData, done);
    }
  }

  changeEnvironment(envId, envFeatures = null) {
    if(this.currentEnv !== envId) {
      this.logger.info(`Changing environment to: ${envId}\n`);

      if(this.memory) {
        this.memory.changeEnvironment(envId);
      }

      this.currentEnv = envId;
      this.currentEnvFeatures = envFeatures;
    }
  }

  beginEpisode(instanceId = "inference") {
    this.resetNoisyLayers();

    this._lastScore = undefined;

    if(instanceId) {
      if(this.enableNStepsLearning) {
        this.flushNStepBuffer(instanceId);
      }

      if(this.enableFrameStacking) {
        this.resetFrameStack(instanceId);
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

  static get METADATA_SCHEMA() {
    return {
      trainingConfig: {
        dtype:                        { type: "string",  target: "dtype" },
        enableDuelingQLearning:       { type: "boolean", target: "enableDuelingQLearning" },
        enableDoubleDQN:              { type: "boolean", target: "enableDoubleDQN" },
        enableSoftTargetUpdates:      { type: "boolean", target: "enableSoftTargetUpdates" },
        enableNoisyNetwork:           { type: "boolean", target: "enableNoisyNetwork" },
        enableStateRotation:          { type: "boolean", target: "enableStateRotation", fallback: false },
        enableNStepsLearning:         { type: "boolean", target: "enableNStepsLearning", fallback: false },
        enableDataAugmentation:       { type: "boolean", target: "enableDataAugmentation" },
        enableActionMasking:          { type: "boolean", target: "enableActionMasking", fallback: false },
        enableEnvEmbedding:           { type: "boolean", target: "enableEnvEmbedding",   fallback: false },
        syncTargetEvery:              { type: "number",  target: "syncTargetEvery", hyperParam: true },
        gamma:                        { type: "number",  target: "gamma", hyperParam: true },
        epsilonMax:                   { type: "number",  target: "epsilonMax", hyperParam: true },
        epsilonMin:                   { type: "number",  target: "epsilonMin", hyperParam: true },
        epsilon:                      { type: "number",  target: "epsilon", hyperParam: true },
        learningRate:                 { type: "number",  target: "learningRate", hyperParam: true },
        batchSize:                    { type: "number",  target: "batchSize", hyperParam: true },
        nStep:                        { type: "number",  target: "nStep", hyperParam: true },
        softTargetUpdatesCoefficient: { type: "number",  target: "softTargetUpdatesCoefficient", hyperParam: true }
      },
      modelInfo: {
        modelHeight:            { type: "number",  target: "modelHeight" },
        modelWidth:             { type: "number",  target: "modelWidth" },
        modelDepth:             { type: "number",  target: "modelDepth" },
        numberOfPossibleActions:{ type: "number",  target: "numberOfPossibleActions" },
        enableVariableInputSize:{ type: "boolean", target: "enableVariableInputSize" },
        frameStackSize:         { type: "number",  target: "frameStackSize", fallback: 1 },
        envFeatureSize:         { type: "number",  target: "envFeatureSize",   fallback: 6 },
        envEmbedSize:           { type: "number",  target: "envEmbedSize",     fallback: 16 },
      },
      trainingState: {
        lastAction:         { type: "number",  target: "lastAction" },
        currentQValue:      { type: "number",  target: "currentQValue" },
        currentEpoch:       { type: "number",  target: "currentEpoch" },
        stepsSinceLastSync: { type: "number",  target: "stepsSinceLastSync" }
      }
    };
  }

  exportMetadata() {
    const schema = SnakeAIUltra.METADATA_SCHEMA;

    const buildSection = (sectionSchema) =>
      Object.fromEntries(
        Object.entries(sectionSchema).map(([key, { target }]) => [key, this[target]])
      );

    return {
      trainingConfig: {
        ...buildSection(schema.trainingConfig),
        trainingRandomSeed: this.trainingRandomSeed
      },
      modelInfo: buildSection(schema.modelInfo),
      trainingState: {
        ...buildSection(schema.trainingState),
        trainingRng: this.trainingRng.state(),
        currentEnv:  this.currentEnv
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

      const schema = SnakeAIUltra.METADATA_SCHEMA;

      const loadSection = (source, sectionSchema) => {
        if(!source) return;

        for(const [key, { type, target, fallback, hyperParam }] of Object.entries(sectionSchema)) {
          if(hyperParam && !this.loadHyperParametersFromMetadata) continue;

          if(typeof source[key] === type) {
            this[target] = source[key];
          } else if(source[key] === undefined && fallback !== undefined) {
            this[target] = fallback;
          }
        }
      };

      if(metadata.trainingConfig) {
        const config = metadata.trainingConfig;

        if(typeof config.trainingRandomSeed === "number") {
          this.trainingRandomSeed = config.trainingRandomSeed;
          this.trainingRng = new seedrandom(this.trainingRandomSeed, { state: true });
        }
      }

      loadSection(metadata.trainingConfig, schema.trainingConfig);
      loadSection(metadata.modelInfo, schema.modelInfo);
      loadSection(metadata.trainingState, schema.trainingState);

      if(!this.loadHyperParametersFromMetadata) {
        this.logger.info("Loading hyperparameters from metadata is disabled. Skipping hyperparameters loading.\n");
      }

      if(metadata.trainingState) {
        const state = metadata.trainingState;

        if(state.trainingRng) this.trainingRng = seedrandom("", { state: state.trainingRng });
        if(state.currentEnv !== undefined && this.memoryRestoredFromState) this.currentEnv = state.currentEnv;
      }

      this.logger.info("Metadata correctly loaded from file\n");
    } catch(err) {
      this.logger.error(`Error loading metadata: ${err.message}\n`);
    }
  }
}