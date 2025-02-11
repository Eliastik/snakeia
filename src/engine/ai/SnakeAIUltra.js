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
import * as tf from "@tensorflow/tfjs";

export default class SnakeAIUltra extends SnakeAI {
  constructor(enableTrainingMode, modelLocation) {
    super();

    this._aiLevelText = "ultra";
    this.enableTrainingMode = enableTrainingMode;
    this.modelLocation = modelLocation;

    this.mainModel = null;
    this.targetModel = null;

    this.modelHeight = 10;
    this.modelWidth = 10;
    this.modelDepth = 2;

    this.enableTargetModel = false;
    this.syncTargetEvery = 1000;
    this.stepsSinceLastSync = 0;

    this.gamma = 0.95;
    this.epsilonMax = 1.0;
    this.epsilonMin = 0.01;
    this.epsilon = this.epsilonMax;
    this.learningRate = 0.001;
    this.batchSize = 32;
    this.maxMemoryLength = 2000;

    this.memory = [];
    this.lastAction = null;
    this.currentQValue = 0;
    this.currentEpoch = 0;

    this.summaryWriter = null;
  }

  async setup(summaryWriter) {
    this.mainModel = await this.createOrLoadModel(this.enableTrainingMode, this.modelLocation);

    if(this.enableTrainingMode) {
      if(this.enableTargetModel) {
        this.targetModel = this.createModel();
        this.targetModel.setWeights(this.mainModel.getWeights());
      }

      this.summaryWriter = summaryWriter;
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
    const model = tf.sequential();

    model.add(tf.layers.conv2d({
      inputShape: [this.modelHeight, this.modelWidth, this.modelDepth],
      filters: 32,
      kernelSize: 3,
      activation: "relu",
      padding: "same"
    }));

    model.add(tf.layers.conv2d({
      filters: 64,
      kernelSize: 3,
      activation: "relu",
      padding: "same"
    }));

    model.add(tf.layers.flatten());

    model.add(tf.layers.dense({
      units: 128,
      activation: "relu"
    }));

    model.add(tf.layers.dense({
      // TODO reduce to 3 (turn right/left/continue)
      units: 4, // Number of possible actions
      activation: "linear"
    }));

    model.compile({
      optimizer: tf.train.adam(this.learningRate),
      loss: "meanSquaredError"
    });

    return model;
  }

  ai(snake) {
    let action = null;

    if(Math.random() < this.epsilon && this.enableTrainingMode) {
      action = this.getRandomAction();
    } else {
      action = this.getBestAction(snake);
    }

    this.lastAction = action;
  
    return action;
  }

  getRandomAction() {
    const r = GameUtils.randRange(1, 4);
    
    switch(r) {
    case 1:
      return GameConstants.Key.UP;
    case 2:
      return GameConstants.Key.LEFT;
    case 3:
      return GameConstants.Key.BOTTOM;
    case 4:
      return GameConstants.Key.RIGHT;
    }
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

      return GameConstants.ActionMappingInverse[actionIndex];
    });
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

      const padHeight = this.modelHeight - height;
      const padWidth = this.modelWidth - width;

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
    this.memory.push({ state, action, reward, nextState, done });

    if(this.memory.length > this.maxMemoryLength) {
      const removedMemory = this.memory.shift();

      if(removedMemory && removedMemory.state) {
        removedMemory.state.dispose();
      }

      if(removedMemory && removedMemory.nextState) {
        removedMemory.nextState.dispose();
      }
    }
  }

  async train() {
    if(this.memory.length < this.batchSize) return;

    const batch = this.loadBatches();

    const inputs = [];
    const targets = [];

    tf.tidy(() => {
      const nextStates = tf.stack(batch.map(({ nextState }) => nextState));
      const states = tf.stack(batch.map(({ state }) => state));
  
      const currentModel = this.enableTargetModel ? this.targetModel : this.mainModel;
      const qNextBatch = currentModel.predict(nextStates);
      const qCurrentBatch = currentModel.predict(states);
  
      const qNextMaxValues = qNextBatch.max(1).arraySync();
      const qCurrentValues = qCurrentBatch.arraySync();
  
      batch.forEach(({ state, action, reward, done }, index) => {
        let target = reward;
  
        if(!done) {
          target += this.gamma * qNextMaxValues[index];
        }
  
        const qValues = qCurrentValues[index];
        const actionIndex = GameConstants.ActionMapping[action];

        qValues[actionIndex] = target;
  
        inputs.push(state);
        targets.push(qValues);
      });
    });

    const inputTensors = tf.stack(inputs);
    const targetTensors = tf.stack(targets);

    const fitData = await this.mainModel.fit(inputTensors, targetTensors, { batchSize: this.batchSize, epochs: 1, verbose: 0, shuffle: true });

    if(this.summaryWriter) {
      this.summaryWriter.scalar("loss", fitData.history.loss[0], this.currentEpoch);
      this.summaryWriter.scalar("epsilon", this.epsilon, this.currentEpoch);
    }

    // Cleanup tensors
    inputTensors.dispose();
    targetTensors.dispose();

    if(this.stepsSinceLastSync >= this.syncTargetEvery) {
      this.synchronizeTargetNetwork();
      this.stepsSinceLastSync = 0;
    }

    this.stepsSinceLastSync++;
    this.currentEpoch++;
  }

  loadBatches() {
    const batch = [];

    for(let i = 0; i < this.batchSize; i++) {
      const index = Math.floor(Math.random() * this.memory.length);
      batch.push(this.memory[index]);
    }

    return batch;
  }

  synchronizeTargetNetwork() {
    if(this.enableTargetModel) {
      this.targetModel.setWeights(this.mainModel.getWeights());
      console.info("Target network synchronized!");
    }
  }

  calculateReward(snake, currentState) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();

    const fruit = this.findPositionInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT);
    const fruitGold = this.findPositionInState(currentState.fruitsAndWallsLayer, GameConstants.CaseType.FRUIT_GOLD);

    if(!fruit) {
      console.warn("No fruit detected");
    }

    if(gameOver) {
      // TODO unit test
      let numberOfEmptyCaseAround = 0;

      for(const directionNext of [GameConstants.Direction.UP, GameConstants.Direction.DOWN, GameConstants.Direction.LEFT, GameConstants.Direction.RIGHT]) {
        const nextPosition = snake.getNextPosition(head, directionNext);

        if(!snake.grid.isDeadPosition(nextPosition)) {
          numberOfEmptyCaseAround++;
        }
      }

      if(numberOfEmptyCaseAround >= 1) {
        return -15;
      }

      return -10;
    }

    // TODO lower reward if blocked (isAIStuck)

    if(fruit && head.x === fruit.x && head.y === fruit.y) {
      return 10;
    }

    if(fruitGold && head.x === fruitGold.x && head.y === fruitGold.y) {
      return 30;
    }

    return -0.2;
  }

  async step(snake, currentState) {
    const nextState = this.getState(snake);
    const reward = this.calculateReward(snake, currentState);
    const done = snake.gameOver;

    const currentStateTensor = this.stateToTensor(currentState);
    const nextStateTensor = this.stateToTensor(nextState);

    this.remember(currentStateTensor, this.lastAction, reward, nextStateTensor, done);
  }

  async saveModel(destination) {
    await this.mainModel.save(destination);
  }
}