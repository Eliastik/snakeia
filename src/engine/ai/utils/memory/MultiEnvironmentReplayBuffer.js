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
import PrioritizedReplayBuffer from "./PrioritizedReplayBuffer.js";
import UniformReplayBuffer from "./UniformReplayBuffer.js";

export default class MultiEnvironmentReplayBuffer extends BaseReplayBuffer {
  constructor(capacity, rng, bufferType = "uniform", selectMode = "cycling") {
    super();

    this.capacity = capacity;
    this.rng = rng;
    this.buffers = new Map();
    this.currentEnvironment = null;
    this.selectMode = selectMode || "classic";
    this.currentBufferIndex = 0;
  
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
  
    switch(this.selectMode) {
    case "cycling": return this.cyclingSample(envIds, batchSize);
    case "random": return this.randomSample(envIds, batchSize, totalSize);
    case "balanced": return this.balancedSample(envIds, batchSize, totalSize);
    default: return this.classicSample(envIds, batchSize, totalSize);
    }
  }
  
  classicSample(envIds, batchSize, totalSize) {
    const results = envIds
      .map(envId => {
        const buffer = this.buffers.get(envId);
        const bufferSize = buffer.size();

        if(bufferSize === 0) {
          return null;
        }

        return this.sampleBuffer(buffer, Math.max(1, Math.floor(batchSize * (bufferSize / totalSize))), envId);
      })
      .filter(Boolean);

    return {
      samples: results.flatMap(r => r.samples),
      indices: results.flatMap(r => r.indices),
      weight: results.some(r => r.weight) ? results.flatMap(r => r.weight) : null,
      envAssignments: results.flatMap(r => r.envAssignments),
    };
  }

  balancedSample(envIds, batchSize) {
    const envBatchSize = Math.max(1, Math.floor(batchSize / envIds.length));
    const allSamples = envIds.map(envId => this.sampleBuffer(this.buffers.get(envId), envBatchSize, envId));
    
    return {
      samples: allSamples.flatMap(s => s.samples),
      indices: allSamples.flatMap(s => s.indices),
      weight: allSamples.flatMap(s => s.weight).filter(w => w !== null),
      envAssignments: allSamples.flatMap(s => s.envAssignments)
    };
  }

  cyclingSample(envIds, batchSize) {
    const envId = envIds[this.currentBufferIndex];
    const currentBuffer = this.buffers.get(envId);

    this.currentBufferIndex = (this.currentBufferIndex + 1) % envIds.length;

    return this.sampleBuffer(currentBuffer, batchSize, envId);
  }

  randomSample(envIds, batchSize, totalSize) {
    const probabilities = envIds.map(id => this.buffers.get(id).size() / totalSize);
    const envId = this.weightedRandomChoice(envIds, probabilities);
    return this.sampleBuffer(this.buffers.get(envId), batchSize, envId);
  }
  
  weightedRandomChoice(items, weights) {
    const sum = weights.reduce((a, b) => a + b, 0);
    let rand = this.rng() * sum;

    for(let i = 0; i < items.length; i++) {
      if(rand < weights[i]) {
        return items[i];
      }

      rand -= weights[i];
    }

    return items[items.length - 1];
  }
  
  sampleBuffer(buffer, envBatchSize, envId) {
    const { samples, indices, weight } = buffer.sample(envBatchSize);

    return {
      samples,
      indices,
      weight: weight?.length > 0 ? weight : null,
      envAssignments: Array(indices.length).fill(envId)
    };
  }

  updatePriority(indices, tdErrors, envId) {
    const buffer = this.buffers.get(envId);
  
    if(buffer) {
      buffer.updatePriority(indices, tdErrors);
    }
  }

  cleanOldMemory(removedMemory) {
    const buffer = this.buffers.get(this.currentEnvironment);
  
    if(buffer) {
      buffer.cleanOldMemory(removedMemory);
    }
  }
  
  size() {
    let totalSize = 0;

    for(const buffer of this.buffers.values()) {
      totalSize += buffer.size();
    }

    return totalSize;
  }
  
  serializeToJson() {
    return {
      capacity: this.capacity,
      buffers: Array.from(this.buffers.keys()).map(key => {
        return {
          name: key,
          buffer: this.buffers.get(key).serializeToJson()
        };
      }),
      currentEnvironment: this.currentEnvironment,
      selectMode: this.selectMode,
      currentBufferIndex: this.currentBufferIndex
    };
  }
}