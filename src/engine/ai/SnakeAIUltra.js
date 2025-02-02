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
import GameConstants from "../Constants.js";
import Position from "../Position.js";
import GameUtils from "../GameUtils.js";
import * as tf from "@tensorflow/tfjs";

export default class SnakeAIUltra {
  constructor(enableTrainingMode) {
    this.aiFruitGoal = GameConstants.CaseType.FRUIT;
    this._aiLevelText = "Ultra";
    this.model = this.createModel(10, 10); // Height / width
    this.memory = [];
    this.gamma = 0.95;
    this.epsilon = 0.99;
    this.epsilonDecay = 0.995;
    this.epsilonMin = 0.01;
    this.learningRate = 0.001;
    this.batchSize = 32;
    this.lastAction = null;

    this.enableTrainingMode = enableTrainingMode;
  }

  createModel(height, width) {
    const model = tf.sequential();
  
    model.add(tf.layers.conv2d({
      inputShape: [height, width, 1],
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

  async ai(snake) {
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
    const currentState = this.getState(snake);
    const currentStateTensor = currentState.expandDims(0);

    const qValues = this.model.predict(currentStateTensor);
    const qValuesArray = qValues.arraySync()[0];

    const actionIndex = qValuesArray.indexOf(Math.max(...qValuesArray));

    return GameConstants.ActionMappingInverse[actionIndex];
  }

  getState(snake) {
    const grid = snake.grid;
    const state = new Array(grid.height).fill(0).map(() => new Array(grid.width).fill(0));
    
    for(let i = 0; i < grid.height; i++) {
      for(let j = 0; j < grid.width; j++) {
        const position = new Position(j, i);

        if(snake.positionInQueue(position)) {
          state[i][j] = 1;
        } else {
          state[i][j] = this.cellToStateValue(grid.get(position));
        }
      }
    }

    return tf.tensor(state).expandDims(-1);
  }

  cellToStateValue(cellValue) {
    return GameConstants.CaseTypeAIValue[cellValue];
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

    if(this.memory.length > 2000) {
      this.memory.shift();
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
      let target = reward;

      if(!done) {
        const qNext = this.model.predict(nextState.expandDims(0)).arraySync()[0];
        target += this.gamma * Math.max(...qNext);
      }

      const qValues = this.model.predict(state.expandDims(0)).arraySync()[0];

      const actionIndex = GameConstants.ActionMapping[action];

      qValues[actionIndex] = target;

      inputs.push(state);
      targets.push(qValues);
    }

    const inputTensors = tf.stack(inputs);
    const targetTensors = tf.stack(targets);
    
    await this.model.fit(inputTensors, targetTensors, { epochs: 1, verbose: 0 });

    if(this.epsilon > this.epsilonMin) {
      this.epsilon *= this.epsilonDecay;
    }
  }

  calculateReward(snake, currentState) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();
    const currentStateArray = currentState.arraySync().map(row => 
      row.map(cell => Math.round(cell[0] * 1000) / 1000)
    );

    const fruit = this.findPositionInState(currentStateArray, GameConstants.CaseType.FRUIT);
    const fruitGold = this.findPositionInState(currentStateArray, GameConstants.CaseType.FRUIT_GOLD);

    if(gameOver) return -10;

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

    this.remember(currentState, this.lastAction, reward, nextState, done);
  }
}