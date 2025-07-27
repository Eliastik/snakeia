import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class ModelLoader {
  constructor() {
    this.loader = new GLTFLoader();
    this.cache = new Map();
    this.nbModelsToLoad = 0;
  }

  async preload(key, url) {
    if(this.cache.has(key)) return;

    const gltf = await new Promise((resolve, reject) => {
      this.loader.load(
        url,
        resolve,
        undefined,
        reject
      );
    });

    this.cache.set(key, gltf);
  }

  get(key) {
    const gltf = this.cache.get(key);
    if(!gltf) return null;

    return gltf.scene.clone(true);
  }

  preloadAll(assets) {
    this.nbModelsToLoad = Object.keys(assets).length;

    const promises = Object.entries(assets).map(([key, url]) => this.preload(key, url));
    return Promise.all(promises);
  }
}