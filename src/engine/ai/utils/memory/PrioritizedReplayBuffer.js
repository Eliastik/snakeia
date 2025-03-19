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
import SumTree from "./SumTree.js";

export default class PrioritizedReplayBuffer {
  constructor(capacity, rng, calculateWeight = false, alpha = 0.6) {
    this.capacity = capacity;
    this.rng = rng;
    this.calculateWeight = calculateWeight;
    this.alpha = alpha;
    this.defaultPriority = 1.0;

    this.sumTree = new SumTree(capacity);
  }

  add(state, action, reward, nextState, done) {
    let maxPriority = this.defaultPriority;

    if(this.sumTree.size > 0) {
      const start = this.sumTree.capacity - 1;
      const leafPriorities = Array.from(this.sumTree.tree.slice(start, start + this.sumTree.size));
      maxPriority = Math.max(...leafPriorities, this.defaultPriority);
    }

    const data = { state, action, reward, nextState, done };

    const overwrittenData = this.sumTree.data[this.sumTree.write];
    
    if(overwrittenData) {
      this.cleanOldMemory(overwrittenData);
    }

    this.sumTree.add(Math.pow(maxPriority, this.alpha), data);
  }

  cleanOldMemory(removedMemory) {
    if(removedMemory && removedMemory.state) {
      removedMemory.state.dispose();
    }

    if(removedMemory && removedMemory.nextState) {
      removedMemory.nextState.dispose();
    }
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

      if(!data) {
        console.log(r, index, this.sumTree.total(), this.sumTree.size, data);
      }

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
    this.sumTree.update(treeIndex, Math.pow(newPriority, this.alpha));
  }

  size() {
    return this.sumTree.size;
  }

  // eslint-disable-next-line no-unused-vars
  changeEnvironment(envId) {
    // Do nothing
  }
}