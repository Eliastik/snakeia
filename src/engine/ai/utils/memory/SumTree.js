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
export default class SumTree {
  constructor(capacity) {
    this.capacity = capacity;
    this.tree = new Float32Array(2 * capacity - 1);
    this.data = new Array(capacity);
    this.size = 0;
    this.write = 0;
  }
  
  total() {
    return this.tree[0];
  }
  
  add(p, data) {
    const index = this.write + this.capacity - 1;

    this.data[this.write] = data;
    this.update(index, p);
  
    this.write++;

    if(this.write >= this.capacity) {
      this.write = 0;
    }

    if(this.size < this.capacity) {
      this.size++;
    }
  }
  
  update(index, p) {
    const change = p - this.tree[index];
    this.tree[index] = p;

    while(index !== 0) {
      index = Math.floor((index - 1) / 2);
      this.tree[index] += change;
    }
  }
  
  get(randomValue) {
    if(randomValue > this.total()) {
      throw new Error("SumTree: randomValue is greater than total");
    }

    let index = 0;

    while(2 * index + 1 < this.tree.length) {
      const left = 2 * index + 1;
      const right = left + 1;

      if(randomValue <= this.tree[left]) {
        index = left;
      } else {
        index = right;
        randomValue -= this.tree[left];
      }
    }

    return {
      index,
      value: this.tree[index],
      data: this.getData(index)
    };
  }
  
  getData(treeIndex) {
    const dataIndex = treeIndex - (this.capacity - 1);
    return this.data[dataIndex];
  }

  serializeToJson() {
    return {
      capacity: this.capacity,
      tree: Array.from(this.tree),
      data: this.data,
      size: this.size,
      write: this.write
    };
  }

  deserializeFromJSON(memory) {
    if(!memory || typeof memory !== "object") {
      throw new Error("Invalid or missing memory data.");
    }

    if(typeof memory.capacity !== "number" || memory.capacity <= 0) {
      throw new Error("Property 'capacity' is missing or invalid.");
    }

    if(!Array.isArray(memory.tree)) {
      throw new Error("Property 'tree' must be an array.");
    }

    if(!Array.isArray(memory.data)) {
      throw new Error("Property 'data' must be an array.");
    }

    if(typeof memory.size !== "number" || memory.size < 0 || memory.size > memory.capacity) {
      throw new Error("Property 'size' is missing or invalid.");
    }

    if(typeof memory.write !== "number" || memory.write < 0 || memory.write >= memory.capacity) {
      throw new Error("Property 'write' is missing or invalid.");
    }

    if(memory.tree.length !== 2 * memory.capacity - 1) {
      throw new Error("Length of 'tree' array is inconsistent with capacity.");
    }

    this.capacity = memory.capacity;
    this.tree = new Float32Array(memory.tree);
    this.data = memory.data.slice(0, this.capacity);
    this.size = memory.size;
    this.write = memory.write;
  }
}