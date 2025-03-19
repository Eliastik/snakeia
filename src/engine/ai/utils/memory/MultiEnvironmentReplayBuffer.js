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
import PrioritizedReplayBuffer from "./PrioritizedReplayBuffer.js";
import UniformReplayBuffer from "./UniformReplayBuffer.js";

export default class MultiEnvironmentReplayBuffer {
  constructor(capacity, rng, bufferType = "uniform") {
    this.capacity = capacity;
    this.rng = rng;
    this.buffers = new Map();
    this.currentEnvironment = null;
  
    this.createBuffer = (capacity) => {
      return bufferType === "prioritized"
        ? new PrioritizedReplayBuffer(capacity, rng)
        : new UniformReplayBuffer(capacity, rng);
    };
  }
  
  changeEnvironment(envId) {
    this.currentEnvironment = envId;
  
    if(!this.buffers.has(envId)) {
      this.buffers.set(envId, this.createBuffer(this.capacity));
    }
  }
  
  add(state, action, reward, nextState, done) {
    if(!this.currentEnvironment) {
      throw new Error("No environment selected. Please use changeEnvironment(envId) to setup the current environment.");
    }
  
    this.buffers.get(this.currentEnvironment).add(state, action, reward, nextState, done);
  }
  
  sample(batchSize) {
    const envIds = Array.from(this.buffers.keys());
    const totalSize = this.size();
    
    if(envIds.length === 0 || totalSize === 0) {
      return { samples: [], indices: [], weight: null };
    }
  
    const samples = [];
    const indices = [];
    const weights = [];
    const envAssignments = [];
  
    for(const envId of envIds) {
      const buffer = this.buffers.get(envId);

      if(buffer.size() > 0) {
        const envBatchSize = Math.max(1, Math.floor(batchSize * (buffer.size() / totalSize)));
        const { samples: envSamples, indices: envIndices, weight: envWeights } = buffer.sample(envBatchSize);
  
        samples.push(...envSamples);
        indices.push(...envIndices);
        envAssignments.push(...Array(envIndices.length).fill(envId));

        if(envWeights) {
          weights.push(...envWeights);
        }
      }
    }
  
    return {
      samples,
      indices,
      weight: weights.length > 0 ? weights : null,
      envAssignments
    };
  }
  
  updatePriority(indices, tdErrors, envId) {
    const buffer = this.buffers.get(envId);
  
    if(buffer) {
      buffer.updatePriority(indices, tdErrors);
    }
  }
  
  size() {
    let totalSize = 0;

    for(const buffer of this.buffers.values()) {
      totalSize += buffer.size();
    }

    return totalSize;
  }
}