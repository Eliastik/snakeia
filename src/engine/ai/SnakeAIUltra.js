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
import SnakeAIRandom from "./SnakeAIRandom.js";
import * as tf from "@tensorflow/tfjs";

export default class SnakeAIUltra {
  constructor(enableTrainingMode) {
    this.aiFruitGoal = GameConstants.CaseType.FRUIT;
    this.aiRandom = new SnakeAIRandom();
    this._aiLevelText = "Ultra";
    this.model = this.createModel();
    this.memory = [];
    this.gamma = 0.95;
    this.epsilon = 1.0;
    this.epsilonDecay = 0.995; // 0.995
    this.epsilonMin = 0.01;
    this.learningRate = 0.001; // 0.001
    this.batchSize = 32;
    this.lastAction = null;

    this.enableTrainingMode = enableTrainingMode;
  }

  createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [14], units: 32, activation: "relu" }));
    model.add(tf.layers.dense({ units: 32, activation: "relu" }));
    model.add(tf.layers.dense({ units: 4, activation: "linear" }));
    model.compile({ optimizer: tf.train.adam(this.learningRate), loss: "meanSquaredError" });
    return model;
  }

  async ai(snake) {
    const currentState = this.getState(snake);

    let action = null;

    if(Math.random() < this.epsilon && this.enableTrainingMode) {
      action = await this.aiRandom.ai(snake);
    } else {
      const qValues = this.model.predict(tf.tensor([currentState]));
      const qValuesArray = qValues.arraySync()[0];

      const actionIndex = qValuesArray.indexOf(Math.max(...qValuesArray));

      action = GameConstants.ActionMappingInverse[actionIndex];
    }

    this.lastAction = action;
  
    return action;
  }

  getState(snake) {
    const { grid, direction } = snake;
    const head = snake.getHeadPosition();
    const top = snake.grid.isDeadPosition(snake.getNextPosition(head, GameConstants.Key.UP));
    const left = snake.grid.isDeadPosition(snake.getNextPosition(head, GameConstants.Key.LEFT));
    const bottom = snake.grid.isDeadPosition(snake.getNextPosition(head, GameConstants.Key.BOTTOM));
    const right = snake.grid.isDeadPosition(snake.getNextPosition(head, GameConstants.Key.RIGHT));
    const fruit = grid.fruitPos;
    const fruitGold = grid.fruitPosGold;

    return [
      head.x,
      head.y,
      fruit ? fruit.x : -1,
      fruit ? fruit.y : -1,
      fruitGold ? fruitGold.x : -1,
      fruitGold ? fruitGold.y : -1,
      direction === GameConstants.Direction.UP ? 1 : 0,
      direction === GameConstants.Direction.DOWN ? 1 : 0,
      direction === GameConstants.Direction.LEFT ? 1 : 0,
      direction === GameConstants.Direction.RIGHT ? 1 : 0,
      top ? 1 : 0,
      bottom ? 1 : 0,
      left ? 1 : 0,
      right ? 1 : 0
    ];
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
        const qNext = this.model.predict(tf.tensor([nextState])).arraySync()[0];
        target += this.gamma * Math.max(...qNext);
      }

      const qValues = this.model.predict(tf.tensor([state])).arraySync()[0];

      const actionIndex = GameConstants.ActionMapping[action];

      qValues[actionIndex] = target;

      inputs.push(state);
      targets.push(qValues);
    }
    
    await this.model.fit(tf.tensor(inputs), tf.tensor(targets), { epochs: 1, verbose: 0 });

    if(this.epsilon > this.epsilonMin) {
      this.epsilon *= this.epsilonDecay;
    }
  }

  calculateReward(snake, currentState) {
    const { gameOver } = snake;
    const head = snake.getHeadPosition();
    const fruit = { x: currentState[2], y: currentState[3] };
    const fruitGold = { x: currentState[4], y: currentState[5] };

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
    const done = !snake.gameOver;

    this.remember(currentState, this.lastAction, reward, nextState, done);
  }
}