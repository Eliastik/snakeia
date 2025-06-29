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

function scaledNoise(shape, dtype = "float32") {
  return tf.tidy(() => {
    const x = tf.randomNormal(shape, 0, 1, dtype);
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
    this.activationLayer = this.activationName ? tf.layers.activation({ activation: this.activationName, trainable: false }) : null;
    this.dtype = config.dtype || "float32";

    if(!this.activationLayer) {
      console.warn("NoisyDense layer: no activation function provided or found");
    }
  }

  build(inputShape) {
    this.lastDim = inputShape[inputShape.length - 1];

    if(this.lastDim == null) {
      throw new Error("The last dimension of the input must be defined.");
    }

    const sqrtDim = Math.sqrt(this.lastDim);
    const muInitVal = this.useFactorised ? 1.0 / sqrtDim : Math.sqrt(3.0 / this.lastDim);
    const sigmaInitVal = this.useFactorised ? this.sigma / sqrtDim : 0.017;

    this.muKernel = this.addWeight(
      "muKernel",
      [this.lastDim, this.units],
      this.dtype,
      tf.initializers.randomUniform({ minval: -muInitVal, maxval: muInitVal })
    );

    this.sigmaKernel = this.addWeight(
      "sigmaKernel",
      [this.lastDim, this.units],
      this.dtype,
      tf.initializers.constant({ value: sigmaInitVal })
    );

    this.epsKernel = this.addWeight(
      "epsKernel",
      [this.lastDim, this.units],
      this.dtype,
      tf.initializers.zeros(),
      undefined,
      false
    );

    if(this.useBias) {
      this.muBias = this.addWeight(
        "muBias",
        [this.units],
        this.dtype,
        tf.initializers.randomUniform({ minval: -muInitVal, maxval: muInitVal })
      );

      this.sigmaBias = this.addWeight(
        "sigmaBias",
        [this.units],
        this.dtype,
        tf.initializers.constant({ value: sigmaInitVal })
      );

      this.epsBias = this.addWeight(
        "epsBias",
        [this.units],
        this.dtype,
        tf.initializers.zeros(),
        undefined,
        false
      );
    }

    this.resetNoise();

    super.build(inputShape);
  }

  calculateKernelValue() {
    return tf.tidy(() => tf.add(this.muKernel.read(), tf.mul(this.sigmaKernel.read(), this.epsKernel.read())));
  }

  calculateBiasValue() {
    if(!this.useBias) {
      return null;
    }

    return tf.tidy(() => tf.add(this.muBias.read(), tf.mul(this.sigmaBias.read(), this.epsBias.read())));
  }

  call(inputs) {
    return tf.tidy(() => {
      const input = Array.isArray(inputs) ? inputs[0] : inputs;

      let output = tf.dot(input, this.calculateKernelValue());

      if(this.useBias) {
        output = tf.add(output, this.calculateBiasValue());
      }

      return this.activationLayer != null ? this.activationLayer.apply(output) : output;
    });
  }

  resetNoise() {
    tf.tidy(() => {
      if(this.useFactorised) {
        const inEps = scaledNoise([this.lastDim, 1], this.dtype);
        const outEps = scaledNoise([1, this.units], this.dtype);
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
    return [...inputShape.slice(0, -1), this.units];
  }

  getConfig() {
    const baseConfig = super.getConfig();

    return Object.assign(baseConfig, {
      units: this.units,
      sigma: this.sigma,
      useFactorised: this.useFactorised,
      activation: this.activationName || null,
      useBias: this.useBias,
      dtype: this.dtype
    });
  }

  static get className() {
    return "NoisyDense";
  }
}

tf.serialization.registerClass(NoisyDense);