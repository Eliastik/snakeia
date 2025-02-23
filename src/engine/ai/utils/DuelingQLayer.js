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
import * as tf from "@tensorflow/tfjs";

// Custom layer used for Dueling DQN
export default class DuelingQLayer extends tf.layers.Layer {
  constructor(config) {
    super(config || {});
  }
    
  computeOutputShape(inputShape) {
    return inputShape[1];
  }
    
  call(inputs) {
    return tf.tidy(() => {
      const [value, advantage] = inputs;
      const meanAdvantage = advantage.mean(1, true);
      return value.add(advantage.sub(meanAdvantage));
    });
  }
    
  static get className() {
    return "DuelingQLayer";
  }
}

tf.serialization.registerClass(DuelingQLayer);