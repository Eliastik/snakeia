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
import semver from "semver";
import * as tf from "@tensorflow/tfjs";

export default class SnakeAIUltraModelLoader {

  static instance = null;
  
  static modelCache = new Map();
  static metadataCache = new Map();
  static modelListCache = null;
  static selectedModel = null;
  static modelAPILocation = null;

  static fileReader = null;

  constructor() {
    if(SnakeAIUltraModelLoader.instance) {
      return SnakeAIUltraModelLoader.instance;
    }

    SnakeAIUltraModelLoader.instance = this;
  }

  static getInstance(fileReader) {
    if(!SnakeAIUltraModelLoader.instance) {
      SnakeAIUltraModelLoader.instance = new SnakeAIUltraModelLoader();
    }
    
    if(fileReader) {
      SnakeAIUltraModelLoader.fileReader = fileReader;
    }
    
    return SnakeAIUltraModelLoader.instance;
  }

  async loadModel(location) {
    const modelLocation = `${location}/model.json`;

    if(SnakeAIUltraModelLoader.modelCache.has(modelLocation)) {
      return SnakeAIUltraModelLoader.modelCache.get(modelLocation);
    }

    const model = await tf.loadLayersModel(modelLocation);

    SnakeAIUltraModelLoader.modelCache.set(modelLocation, model);

    return model;
  }

  async loadModelMetadata(location) {
    if(SnakeAIUltraModelLoader.metadataCache.has(location)) {
      return SnakeAIUltraModelLoader.metadataCache.get(location);
    }

    const metadata = await SnakeAIUltraModelLoader.fileReader.readJSON(location);

    SnakeAIUltraModelLoader.metadataCache.set(location, metadata);

    return metadata;
  }

  async loadSelectedModel() {
    if(!SnakeAIUltraModelLoader.selectedModel) {
      await this.selectDefaultModel();
    }

    return this.loadModel(SnakeAIUltraModelLoader.selectedModel.location);
  }

  async loadModelList() {
    if(!SnakeAIUltraModelLoader.modelListCache) {
      const result = await fetch(this.modelAPILocation || GameConstants.DefaultAIModelsListAPI);
      const modelList = await result.json();

      SnakeAIUltraModelLoader.modelListCache = modelList;
    }
  }

  async getModelList() {
    await this.loadModelList();
    return SnakeAIUltraModelLoader.modelListCache;
  }

  getSelectedModel() {
    return SnakeAIUltraModelLoader.selectedModel;
  }

  async selectModel(modelId) {
    await this.loadModelList();

    const selectedModel = SnakeAIUltraModelLoader.modelListCache.find(model => model.id === modelId);

    if(selectedModel) {
      SnakeAIUltraModelLoader.selectedModel = selectedModel;
    } else {
      this.selectDefaultModel();
    }
  }

  async selectCustomModel(location) {
    SnakeAIUltraModelLoader.selectedModel = { id: "custom", location, isDefault: false };
  }

  async selectDefaultModel() {
    await this.loadModelList();
    this.selectModel(this.getDefaultModel().id);
  }

  isModelCompatible(model) {
    if(!model) {
      return false;
    }

    return semver.valid(model.gameVersion) &&
      semver.lte(model.gameVersion, GameConstants.Setting.APP_VERSION) && !model.isDeprecated;
  }

  getDefaultModel() {
    const models = SnakeAIUltraModelLoader.modelListCache;

    // Filter models compatible with this version of the game
    const compatible = models.filter(this.isModelCompatible);

    // 1: Get the default model
    const preferred = compatible.find(model => model.isDefault);

    if(preferred) {
      return preferred;
    }

    // 2: Get the default fallback model if a default model is not found in the compatible list
    const fallback = models.find(m => m.isDefaultFallback);

    if(fallback) {
      return fallback;
    }

    // 3: Get the most recent compatible model otherwise
    if(compatible.length > 0) {
      return compatible.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    }

    // 4: If no model found, we get the older model otherwise
    if(models.length > 0) {
      return models.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
    }

    return null;
  }

  setModelListAPI(modelAPILocation) {
    this.modelAPILocation = modelAPILocation;
  }
}