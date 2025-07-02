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
import BaseReplayBuffer from "./BaseReplayBuffer.js";
import SumTree from "./SumTree.js";

export default class PrioritizedReplayBuffer extends BaseReplayBuffer {
  constructor(capacity, rng, calculateWeight = false, alpha = 0.6) {
    super();

    this.capacity = capacity;
    this.rng = rng;
    this.calculateWeight = calculateWeight;
    this.alpha = alpha;
    this.defaultPriority = 1.0;

    this.sumTree = new SumTree(capacity);
    this.currentMaxPriority = Math.pow(this.defaultPriority, this.alpha);
  }

  add(state, action, reward, nextState, done) {
    const data = { state, action, reward, nextState, done };

    const overwrittenData = this.sumTree.data[this.sumTree.write];

    if(overwrittenData) {
      this.cleanOldMemory(overwrittenData);
    }

    this.sumTree.add(this.currentMaxPriority, data);
  }

  sample(batchSize, beta = 0.4) {
    const samples = [];
    const indices = [];
    const weights = [];

    const totalPriority = this.sumTree.total();

    let maxWeight = 0;

    for(let i = 0; i < batchSize; i++) {
      const r = this.rng() * totalPriority;
      const { index, value, data } = this.sumTree.get(r);

      indices.push(index);
      samples.push(data);

      const prob = value / totalPriority;
      const weight = Math.pow(this.sumTree.size * prob, -beta);

      weights.push(weight);

      if(weight > maxWeight) {
        maxWeight = weight;
      }
    }

    const normalizedWeights = weights.map(w => w / maxWeight);

    return {
      samples,
      indices,
      weights: this.calculateWeight ? normalizedWeights : null
    };
  }

  // eslint-disable-next-line no-unused-vars
  updatePriority(treeIndex, tdError, envId) {
    const newPriority = Math.abs(tdError) + 1e-5;
    const priority = Math.pow(newPriority, this.alpha);

    this.sumTree.update(treeIndex, priority);

    if (priority > this.currentMaxPriority) {
      this.currentMaxPriority = priority;
    }
  }

  size() {
    return this.sumTree.size;
  }

  // eslint-disable-next-line no-unused-vars
  changeEnvironment(envId) {
    // Do nothing
  }

  serializeToJson() {
    return {
      capacity: this.capacity,
      calculateWeight: this.calculateWeight,
      alpha: this.alpha,
      currentMaxPriority: this.currentMaxPriority,
      sumtree: this.sumTree.serializeToJson()
    };
  }

  deserializeFromJSON(memory) {
    if(!memory || typeof memory !== "object") {
      throw new Error("Invalid or missing memory data.");
    }

    if(typeof memory.capacity !== "number" || memory.capacity <= 0) {
      throw new Error("Property 'capacity' is missing or invalid.");
    }

    if(typeof memory.calculateWeight !== "boolean") {
      throw new Error("Property 'calculateWeight' is missing or invalid.");
    }

    if(typeof memory.alpha !== "number" || memory.alpha < 0) {
      throw new Error("Property 'alpha' is missing or invalid.");
    }

    if(typeof memory.currentMaxPriority !== "number" || memory.currentMaxPriority < 0) {
      throw new Error("Property 'currentMaxPriority' is missing or invalid.");
    }

    if(!memory.sumtree || typeof memory.sumtree !== "object") {
      throw new Error("Property 'sumtree' is missing or invalid.");
    }

    this.capacity = memory.capacity;
    this.calculateWeight = memory.calculateWeight;
    this.alpha = memory.alpha;
    this.currentMaxPriority = memory.currentMaxPriority;

    this.sumTree.deserializeFromJSON(memory.sumtree);
  }

  static getType() {
    return "PrioritizedReplayBuffer";
  }
}