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

export default class UniformReplayBuffer extends BaseReplayBuffer {
  constructor(capacity, rng, logger) {
    super();

    this.capacity = capacity;
    this.rng = rng;
    this.logger = logger;

    this.buffer = new Array(capacity);
    this.position = 0;
    this.totalSize = 0;
  }
  
  add(state, action, reward, nextState, done) {
    const overwrittenData = this.buffer[this.position];

    if(overwrittenData) {
      this.cleanOldMemory(overwrittenData);
    }

    this.buffer[this.position] = { state, action, reward, nextState, done };

    this.position = (this.position + 1) % this.capacity;

    if(this.totalSize < this.capacity) {
      this.totalSize++;
    }
  }
  
  sample(batchSize) {
    const samples = [];
    const indices = [];

    for(let i = 0; i < batchSize; i++) {
      const index = Math.floor(this.rng() * this.totalSize);

      samples.push(this.buffer[index]);
      indices.push(index);
    }

    return {
      samples,
      indices,
      weight: null
    };
  }
  
  // eslint-disable-next-line no-unused-vars
  updatePriority(_indice, _tdError) {
    // Do nothing
  }
  
  size() {
    return this.totalSize;
  }

  // eslint-disable-next-line no-unused-vars
  changeEnvironment(envId) {
    // Do nothing
  }

  serializeToJson() {
    return {
      capacity: this.capacity,
      buffer: this.buffer,
      position: this.position,
      totalSize: this.totalSize
    };
  }

  deserializeFromJSON(memory) {
    if(!memory || typeof memory !== "object") {
      throw new Error("Invalid or missing memory data.");
    }

    if(typeof memory.capacity !== "number" || memory.capacity <= 0) {
      throw new Error("Property 'capacity' is missing or invalid.");
    }

    if(typeof memory.totalSize !== "number" || memory.totalSize < 0 || memory.totalSize > memory.capacity) {
      throw new Error("Property 'totalSize' is missing or invalid.");
    }

    if(typeof memory.position !== "number" || memory.position < 0 || memory.position >= memory.capacity) {
      throw new Error("Property 'position' is missing or invalid.");
    }

    if(!Array.isArray(memory.buffer)) {
      throw new Error("Property 'buffer' must be an array.");
    }

    this.capacity = memory.capacity;
    this.buffer = memory.buffer.slice(0, this.capacity);
    this.position = memory.position;
    this.totalSize = memory.totalSize;
  }

  static getType() {
    return "UniformReplayBuffer";
  }
}