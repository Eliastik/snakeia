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
  constructor(capacity, rng, logger, calculateWeight = false, alpha = 0.6, beta = 0.4, espilon = 1e-5, betaIncrementPerSampling = 0.001) {
    super();

    this.capacity = capacity;
    this.rng = rng;
    this.logger = logger;
    this.calculateWeight = calculateWeight;
    this.alpha = alpha;
    this.beta = beta;
    this.espilon = espilon;
    this.betaIncrementPerSampling = betaIncrementPerSampling;

    this.sumTree = new SumTree(capacity);
  }

  add(state, action, reward, nextState, done) {
    const data = { state, action, reward, nextState, done };

    const overwrittenData = this.sumTree.data[this.sumTree.write];

    if(overwrittenData) {
      this.cleanOldMemory(overwrittenData);
    }

    this.sumTree.add(Math.pow(this.sumTree.getMaxPriority(), this.alpha), data);
  }

  sample(batchSize) {
    const samples = [];
    const indices = [];
    const weights = [];

    this.beta = Math.min(1.0, this.beta + this.betaIncrementPerSampling);

    const totalPriority = this.sumTree.total();
    const segment = totalPriority / batchSize;

    let maxWeight = 0;

    for(let i = 0; i < batchSize; i++) {
      const a = segment * i;
      const b = segment * (i + 1);

      const sampled = this.sampleOneWithRetry(a, b);

      if(!sampled) {
        continue;
      }

      const { index, value, data } = sampled;

      indices.push(index);
      samples.push(data);

      if(this.calculateWeight) {
        const prob = value / totalPriority;
        const weight = Math.pow(this.sumTree.size * prob, -this.beta);

        weights.push(weight);

        if(weight > maxWeight) {
          maxWeight = weight;
        }
      }
    }

    return {
      samples,
      indices,
      weights: this.calculateWeight ? weights.map(w => w / maxWeight) : null
    };
  }

  sampleOneWithRetry(a, b, maxRetries = 10) {
    for(let attempt = 0; attempt < maxRetries; attempt++) {
      const r = a + this.rng() * (b - a);

      const { index, value, data } = this.sumTree.get(r);

      if(data) {
        return { index, value, data };
      } else {
        this.logger.warn(`PrioritizedReplayBuffer: Retry sampling, null data at value ${r} (attempt ${attempt + 1})\n`);
      }
    }

    this.logger.error(`PrioritizedReplayBuffer: Failed to sample valid data after ${maxRetries} attempts\n`);

    return null;
  }

  // eslint-disable-next-line no-unused-vars
  updatePriority(treeIndex, tdError, envId) {
    const priority = Math.pow(Math.abs(tdError) + this.espilon, this.alpha);
    this.sumTree.update(treeIndex, priority);
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
      beta: this.beta,
      espilon: this.espilon,
      betaIncrementPerSampling: this.betaIncrementPerSampling,
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

    if(!memory.sumtree || typeof memory.sumtree !== "object") {
      throw new Error("Property 'sumtree' is missing or invalid.");
    }

    this.capacity = memory.capacity;
    this.calculateWeight = memory.calculateWeight;
    this.alpha = memory.alpha;
    this.beta = memory.beta;
    this.espilon = memory.espilon;
    this.betaIncrementPerSampling = memory.betaIncrementPerSampling;

    this.sumTree.deserializeFromJSON(memory.sumtree);
  }

  static getType() {
    return "PrioritizedReplayBuffer";
  }
}