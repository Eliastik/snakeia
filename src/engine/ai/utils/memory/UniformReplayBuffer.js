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
  constructor(capacity, rng) {
    super();

    this.capacity = capacity;
    this.rng = rng;
    this.buffer = [];
  }
  
  add(state, action, reward, nextState, done) {
    this.buffer.push({ state, action, reward, nextState, done });

    if(this.buffer.length > this.capacity) {
      const removedMemory = this.buffer.shift();
      this.cleanOldMemory(removedMemory);
    }
  }
  
  sample(batchSize) {
    const samples = [];
    const indices = [];

    for(let i = 0; i < batchSize; i++) {
      const index = Math.floor(this.rng() * this.buffer.length);

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
    return this.buffer.length;
  }

  // eslint-disable-next-line no-unused-vars
  changeEnvironment(envId) {
    // Do nothing
  }

  serializeToJson() {
    return {
      capacity: this.capacity,
      buffer: this.buffer
    };
  }

  deserializeFromJSON(memory) {
    if(!memory || typeof memory !== "object") {
      throw new Error("Invalid or missing memory data.");
    }

    if(typeof memory.capacity !== "number" || memory.capacity <= 0) {
      throw new Error("Property 'capacity' is missing or invalid.");
    }

    if(!Array.isArray(memory.buffer)) {
      throw new Error("Property 'buffer' must be an array.");
    }

    for(const item of memory.buffer) {
      if(typeof item !== "object" || item === null) {
        throw new Error("Buffer contains invalid entry (not an object).");
      }

      const requiredKeys = ["state", "action", "reward", "nextState", "done"];

      for(const key of requiredKeys) {
        if(!(key in item)) {
          throw new Error(`Buffer entry missing required key '${key}'.`);
        }
      }
    }

    this.capacity = memory.capacity;
    this.buffer = memory.buffer.slice(0, this.capacity);
  }

  static getType() {
    return "UniformReplayBuffer";
  }
}