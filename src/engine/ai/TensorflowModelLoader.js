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
import GameConstants from "../Constants.js";
import * as tf from "@tensorflow/tfjs";

export default class TensorflowModelLoader {

  static instance = null;
  
  static modelCache = new Map();
  static metadataCache = new Map();
  static modelListCache = null;
  static selectedModel = null;
  static modelAPILocation = null;

  static fileReader = null;

  constructor() {
    if(TensorflowModelLoader.instance) {
      return TensorflowModelLoader.instance;
    }

    TensorflowModelLoader.instance = this;
  }

  static getInstance(fileReader) {
    if(!TensorflowModelLoader.instance) {
      TensorflowModelLoader.instance = new TensorflowModelLoader();
    }
    
    if(fileReader) {
      TensorflowModelLoader.fileReader = fileReader;
    }
    
    return TensorflowModelLoader.instance;
  }

  async loadModel(location) {
    const modelLocation = `${location}/model.json`;

    if(TensorflowModelLoader.modelCache.has(modelLocation)) {
      return TensorflowModelLoader.modelCache.get(modelLocation);
    }

    const model = await tf.loadLayersModel(modelLocation);

    TensorflowModelLoader.modelCache.set(modelLocation, model);

    return model;
  }

  async loadModelMetadata(location) {
    if(TensorflowModelLoader.metadataCache.has(location)) {
      return TensorflowModelLoader.metadataCache.get(location);
    }

    const metadata = await TensorflowModelLoader.fileReader.readJSON(location);

    TensorflowModelLoader.metadataCache.set(location, metadata);

    return metadata;
  }

  async loadSelectedModel() {
    if(!TensorflowModelLoader.selectedModel) {
      await this.selectDefaultModel();
    }

    return this.loadModel(TensorflowModelLoader.selectedModel.location);
  }

  async loadModelList() {
    if(!TensorflowModelLoader.modelListCache) {
      const result = await fetch(this.modelAPILocation || GameConstants.DefaultAIModelsListAPI);
      const modelList = await result.json();

      TensorflowModelLoader.modelListCache = modelList;
    }
  }

  async getModelList() {
    await this.loadModelList();
    return TensorflowModelLoader.modelListCache;
  }

  getSelectedModel() {
    return TensorflowModelLoader.selectedModel;
  }

  async selectModel(modelId) {
    await this.loadModelList();

    const selectedModel = TensorflowModelLoader.modelListCache.find(model => model.id === modelId);

    if(selectedModel) {
      TensorflowModelLoader.selectedModel = selectedModel;
    } else {
      this.selectDefaultModel();
    }
  }

  async selectCustomModel(location) {
    TensorflowModelLoader.selectedModel = { id: "custom", location, isDefault: false };
  }

  async selectDefaultModel() {
    await this.loadModelList();
    this.selectModel(TensorflowModelLoader.modelListCache.find(model => model.isDefault).id);
  }

  setModelListAPI(modelAPILocation) {
    this.modelAPILocation = modelAPILocation;
  }
}