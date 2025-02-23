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
export default class PrioritizedReplayBuffer {
  constructor(capacity, rng, alpha = 0.6) {
    this.capacity = capacity;
    this.rng = rng;
    this.alpha = alpha;
    this.buffer = [];
    this.priorities = [];
    this.position = 0;
  }

  add(state, action, reward, nextState, done) {
    const maxPriority = this.priorities.length > 0 ? Math.max(...this.priorities) : 1.0;

    if(this.buffer.length < this.capacity) {
      this.buffer.push({ state, action, reward, nextState, done });
      this.priorities.push(maxPriority);
    } else {
      const removedMemory = this.buffer[this.position];

      this.buffer[this.position] = { state, action, reward, nextState, done };
      this.priorities[this.position] = maxPriority;
      this.position = (this.position + 1) % this.capacity;

      this.cleanOldMemory(removedMemory);
    }
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
    const prioritiesRaised = this.priorities.map(p => Math.pow(p, this.alpha));
    const totalPriority = prioritiesRaised.reduce((a, b) => a + b, 0);
    const probabilities = prioritiesRaised.map(p => p / totalPriority);

    const indices = [];

    for(let i = 0; i < batchSize; i++) {
      const rand = this.rng();
      let cumulative = 0;

      for(let j = 0; j < probabilities.length; j++) {
        cumulative += probabilities[j];
        if(rand < cumulative) {
          indices.push(j);
          break;
        }
      }
    }

    const samples = indices.map(index => this.buffer[index]);

    const weights = indices.map(index => {
      const prob = probabilities[index];
      return Math.pow(this.buffer.length * prob, -beta);
    });

    const maxWeight = Math.max(...weights);
    const normalizedWeights = weights.map(w => w / maxWeight);

    return {
      samples,
      indices,
      weights: normalizedWeights
    };
  }

  updatePriority(indice, tdError) {
    this.priorities[indice] = Math.abs(tdError) + 1e-5;
  }

  size() {
    return this.buffer.length;
  }
}