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
    if(randomValue > this.total) {
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
}