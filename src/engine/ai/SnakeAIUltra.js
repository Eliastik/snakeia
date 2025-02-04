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
import * as tf from "@tensorflow/tfjs";

export default class SnakeAIUltra extends SnakeAI {
  constructor(enableTrainingMode, modelLocation) {
    super();

    this._aiLevelText = "ultra";
    this.enableTrainingMode = enableTrainingMode;
    this.modelLocation = modelLocation;

    this.model = null;
    this.modelHeight = 50;
    this.modelWidth = 50;
    this.memory = [];
    this.gamma = 0.95;
    this.epsilon = 1.0;
    this.epsilonDecay = 0.95;
    this.epsilonMin = 0.01;
    this.learningRate = 0.001;
    this.batchSize = 32;
    this.maxMemoryLength = 2000;
    this.lastAction = null;
  }

  async setup() {
    this.model = await this.createOrLoadModel(this.enableTrainingMode, this.modelLocation);
  }

  async createOrLoadModel(enableTrainingMode, modelLocation) {
    if(!enableTrainingMode) {
      return await tf.loadLayersModel(modelLocation);
    }

    const model = tf.sequential();
  
    model.add(tf.layers.conv2d({
      inputShape: [this.modelHeight, this.modelWidth, 3],
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
      units: 4, // Number of possible actions
      activation: "linear"
    }));
  
    model.compile({
      optimizer: tf.train.adam(this.learningRate),
      loss: "meanSquaredError"
    });
  
    return model;
  }

  loadModel() {
    // TODO
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
  
      const qValues = this.model.predict(currentStateTensor);
      const qValuesArray = qValues.dataSync();
  
      const actionIndex = qValuesArray.indexOf(tf.max(qValuesArray).arraySync());

      return GameConstants.ActionMappingInverse[actionIndex];
    });
  }

  getState(snake) {
    const grid = snake.grid;

    const snakesLayer = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));
    const fruitsLayer = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));
    const wallsLayer = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));
    
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
          fruitsLayer[i][j] = 1;
        } else if(cellValue === GameConstants.CaseType.FRUIT_GOLD) {
          fruitsLayer[i][j] = 2;
        }

        // Walls
        if(cellValue === GameConstants.CaseType.WALL || cellValue == GameConstants.CaseType.SNAKE_DEAD) {
          wallsLayer[i][j] = 1;
        }
      }
    }

    return { snakesLayer, fruitsLayer, wallsLayer };
  }

  stateToTensor(stateArray) {
    return tf.tidy(() => {
      const stateTensor = tf.stack([
        tf.tensor(stateArray.snakesLayer),
        tf.tensor(stateArray.fruitsLayer),
        tf.tensor(stateArray.wallsLayer)
      ]);

      const stateTensorTransposed = stateTensor.transpose([1, 2, 0]);

      const currentShape = stateTensorTransposed.shape;
      const expectedShape = [this.modelHeight, this.modelWidth];

      if(currentShape[0] !== expectedShape[0] || currentShape[1] !== expectedShape[1]) {
        return tf.image.resizeNearestNeighbor(stateTensorTransposed, expectedShape);
      }
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

    const batch = [];

    for(let i = 0; i < this.batchSize; i++) {
      const index = Math.floor(Math.random() * this.memory.length);
      batch.push(this.memory[index]);
    }

    const inputs = [];
    const targets = [];

    for(const { state, action, reward, nextState, done } of batch) {
      tf.tidy(() => {
        let target = reward;
  
        if(!done) {
          const qNext = this.model.predict(nextState.expandDims(0)).dataSync();
          target += this.gamma * tf.max(qNext).arraySync();
        }
  
        const qValues = this.model.predict(state.expandDims(0)).dataSync();
  
        const actionIndex = GameConstants.ActionMapping[action];
  
        qValues[actionIndex] = target;
  
        inputs.push(state);
        targets.push(qValues);
      });
    }

    const inputTensors = tf.stack(inputs);
    const targetTensors = tf.stack(targets);

    await this.model.fit(inputTensors, targetTensors, { epochs: 1, verbose: 0 });

    // Cleanup tensors
    inputTensors.dispose();
    targetTensors.dispose();

    if(this.epsilon > this.epsilonMin) {
      this.epsilon *= this.epsilonDecay;
    }
  }

  calculateReward(snake, currentState) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();

    const fruit = this.findPositionInState(currentState.fruitsLayer, GameConstants.CaseType.FRUIT);
    const fruitGold = this.findPositionInState(currentState.fruitsLayer, GameConstants.CaseType.FRUIT_GOLD);

    if(gameOver) {
      return -100;
    }

    if(fruit && head.x === fruit.x && head.y === fruit.y) {
      return 10;
    }

    if(fruitGold && head.x === fruitGold.x && head.y === fruitGold.y) {
      return 30;
    }

    return -0.1;
  }

  async step(snake, currentState) {
    const nextState = this.getState(snake);
    const reward = this.calculateReward(snake, currentState);
    const done = snake.gameOver;

    const currentStateTensor = this.stateToTensor(currentState);
    const nextStateTensor = this.stateToTensor(nextState);

    this.remember(currentStateTensor, this.lastAction, reward, nextStateTensor, done);
  }
}