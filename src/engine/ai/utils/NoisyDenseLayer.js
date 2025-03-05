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

const ACTIVATIONS = {
  linear: x => x,
  relu: tf.relu,
  reluOp: tf.relu,
  sigmoid: tf.sigmoid,
  tanh: tf.tanh,
};

function scaledNoise(shape) {
  return tf.tidy(() => {
    const x = tf.randomNormal(shape);
    return tf.mul(tf.sign(x), tf.sqrt(tf.abs(x)));
  });
}

// Implementation of NoisyDense layer in JS - Inspired by: https://github.com/tensorflow/addons/blob/master/tensorflow_addons/layers/noisy_dense.py
export default class NoisyDense extends tf.layers.Layer {
  constructor(config) {
    super(config);
    this.units = config.units;
    this.sigma = config.sigma === undefined ? 0.5 : config.sigma;
    this.useFactorised = config.useFactorised === undefined ? true : config.useFactorised;
    this.useBias = config.useBias === undefined ? true : config.useBias;
    this.activationName = config.activation;
    this.activation = this.activationName ? ACTIVATIONS[this.activationName] : null;

    if(!this.activation) {
      console.warn("NoisyDense layer: no activation function provided or found");
    }
  }

  build(inputShape) {
    this.lastDim = inputShape[inputShape.length - 1];

    if(this.lastDim == null) {
      throw new Error("The last dimension of the input must be defined.");
    }

    const sqrtDim = Math.sqrt(this.lastDim);
    let muInitVal, sigmaInitVal;

    if(this.useFactorised) {
      muInitVal = 1.0 / sqrtDim;
      sigmaInitVal = this.sigma / sqrtDim;
    } else {
      muInitVal = Math.sqrt(3.0 / this.lastDim);
      sigmaInitVal = 0.017;
    }

    this.muKernel = this.addWeight(
      "muKernel",
      [this.lastDim, this.units],
      "float32",
      tf.initializers.randomUniform({ minval: -muInitVal, maxval: muInitVal })
    );

    this.sigmaKernel = this.addWeight(
      "sigmaKernel",
      [this.lastDim, this.units],
      "float32",
      tf.initializers.constant({ value: sigmaInitVal })
    );

    this.epsKernel = this.addWeight(
      "epsKernel",
      [this.lastDim, this.units],
      "float32",
      tf.initializers.zeros(),
      undefined,
      false
    );

    if(this.useBias) {
      this.muBias = this.addWeight(
        "muBias",
        [this.units],
        "float32",
        tf.initializers.randomUniform({ minval: -muInitVal, maxval: muInitVal })
      );

      this.sigmaBias = this.addWeight(
        "sigmaBias",
        [this.units],
        "float32",
        tf.initializers.constant({ value: sigmaInitVal })
      );

      this.epsBias = this.addWeight(
        "epsBias",
        [this.units],
        "float32",
        tf.initializers.zeros(),
        undefined,
        false
      );
    }

    super.build(inputShape);
  }

  get kernel() {
    return tf.tidy(() => tf.add(this.muKernel.read(), tf.mul(this.sigmaKernel.read(), this.epsKernel.read())));
  }

  get bias() {
    return tf.tidy(() => {
      if(this.useBias) {
        return tf.add(this.muBias.read(), tf.mul(this.sigmaBias.read(), this.epsBias.read()));
      }

      return null;
    });
  }

  call(inputs) {
    return tf.tidy(() => {
      const input = Array.isArray(inputs) ? inputs[0] : inputs;

      let output = tf.dot(input, this.kernel);

      if(this.useBias) {
        output = tf.add(output, this.bias);
      }

      if(this.activation != null) {
        output = this.activation(output);
      }

      return output;
    });
  }

  resetNoise() {
    tf.tidy(() => {
      if(this.useFactorised) {
        const inEps = scaledNoise([this.lastDim, 1]);
        const outEps = scaledNoise([1, this.units]);
        const newEpsKernel = tf.matMul(inEps, outEps);
        this.epsKernel.write(newEpsKernel);

        if(this.useBias) {
          this.epsBias.write(outEps.flatten());
        }
      } else {
        this.epsKernel.write(tf.randomNormal([this.lastDim, this.units]));
      
        if(this.useBias) {
          this.epsBias.write(tf.randomNormal([this.units]));
        }
      }
    });
  }

  removeNoise() {
    tf.tidy(() => {
      this.epsKernel.write(tf.zeros([this.lastDim, this.units]));

      if(this.useBias) {
        this.epsBias.write(tf.zeros([this.units]));
      }
    });
  }

  computeOutputShape(inputShape) {
    const outputShape = inputShape.slice();
    outputShape[outputShape.length - 1] = this.units;
    return outputShape;
  }

  getConfig() {
    const baseConfig = super.getConfig();

    return Object.assign(baseConfig, {
      units: this.units,
      sigma: this.sigma,
      useFactorised: this.useFactorised,
      activation: this.activationName ? this.activationName : null,
      useBias: this.useBias,
    });
  }

  static get className() {
    return "NoisyDense";
  }
}

tf.serialization.registerClass(NoisyDense);