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
import i18next from "i18next";
import GridUI from "./GridUI";
import GameConstants from "../engine/Constants";
import GameUtils from "../engine/GameUtils";
import Position from "../engine/Position";
import { Utils } from "jsgametools";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import chroma from "chroma-js";

export default class GridUI3D extends GridUI {
  constructor(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, modelLoader, currentPlayer, graphicType, customGraphicsPreset, debugMode) {
    super(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, modelLoader, currentPlayer, debugMode);

    this.snakesMeshes = [];

    this.segmentGeometryCache = {};
    this.transitionSegmentGeometryCache = {};

    this.cameraPresetsByHeight = {
      5: { fov: 5, distance: 60, zoom: 1 },
      10: { fov: 8, distance: 75, zoom: 1 },
      20: { fov: 12, distance: 100, zoom: 1 },
      50: { fov: 30, distance: 125, zoom: 1 },
      75: { fov: 45, distance: 135, zoom: 1 },
      100: { fov: 55, distance: 120, zoom: 1 }
    };

    this.cameraPresetsByWidth = {
      5: { fov: 30, distance: 10, zoom: 1 },
      10: { fov: 30, distance: 20, zoom: 1 },
      20: { fov: 30, distance: 40, zoom: 1 },
      50: { fov: 30, distance: 95, zoom: 1 },
      75: { fov: 45, distance: 100, zoom: 1 },
      100: { fov: 55, distance: 120, zoom: 1 }
    };

    this.snakeBodyRenderingMethod = "INDIVIDUAL"; // or TUBES (old method) or INDIVIDUAL (new method)

    this.qualitySettings = graphicType !== "3dCustom" || !customGraphicsPreset ? 
      this.getQualityPresetSettings(graphicType) :
      {
        ...this.getQualityPresetSettings(GameConstants.DefaultQualitySettings3D),
        ...this.resolveQualitySettings(customGraphicsPreset)
      };

    this.initThreeJS();

    this.is3DRendering = true;
    this.hasGoldFruit = false;
    this.goldFruitPosition = null;
    this.firstUpdatedReflections = false;
    this.goldFruitFirstFrame = true;

    /**
     * TODO :
     * - Optimize TubeGeomtry geometry (reduce geometry quality)
     */
  }

  resolveQualitySettings(preset) {
    if(!preset) return {};
    const resolved = {};

    for(const key in GameConstants.QualitySettings3DIndividualPresets) {
      const def = GameConstants.QualitySettings3DIndividualPresets[key];
      const value = preset[key];

      if(typeof value === "undefined") continue;
      
      if(def.type === "choice" && typeof value === "string") {
        resolved[key] = def.presets[value];
      } else {
        resolved[key] = value;
      }
    }

    return resolved;
  }

  getQualityPresetSettings(graphicType) {
    const preset = graphicType === "3dCustom" ?
      GameConstants.QualitySettings3DPreset[GameConstants.DefaultQualitySettings3D] :
      GameConstants.QualitySettings3DPreset[graphicType];
      
    return this.resolveQualitySettings(preset);
  }

  initThreeJS() {
    this.isLightInit = false;
    this.isCameraInit = false;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xCCCFD3);

    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);

    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(0, 0, 0);
  
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.qualitySettings.enableAntialiasing,
      alpha: true
    });

    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget((this.qualitySettings && this.qualitySettings.reflectionResolution) || 128);
    this.cubeRenderTarget.texture.type = THREE.HalfFloatType;
    
    this.cubeCamera = new THREE.CubeCamera(0.1, 1000, this.cubeRenderTarget);

    this.renderer.shadowMap.enabled = this.qualitySettings.enableShadows;

    let shadowType = THREE.BasicShadowMap;

    switch(this.qualitySettings.shadowType) {
    case "pcf":
      shadowType = THREE.PCFShadowMap;
      break;
    case "pcfsoft":
      shadowType = THREE.PCFSoftShadowMap;
      break;
    case "vsm":
      shadowType = THREE.VSMShadowMap;
      break;
    }

    this.renderer.shadowMap.type = shadowType;

    this.gridGroup = new THREE.Group();
    this.fruitsGroup = new THREE.Group();
    this.snakesGroup = new THREE.Group();

    this.scene.add(this.gridGroup, this.fruitsGroup, this.snakesGroup);
  }

  setupControls(canvas) {
    if(!this.areControlsInit && this.debugMode) {
      this.controls = new OrbitControls(this.camera, canvas);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.1;
      this.controls.screenSpacePanning = false;
      this.controls.minDistance = 0;
      this.controls.maxDistance = 500;
      this.controls.maxPolarAngle = Math.PI / 2;

      this.areControlsInit = true;
    }
  }

  draw(context) {
    if(this.grid && this.grid.grid) {
      const canvas = context.canvas;
      const ctx = canvas.getContext("2d");

      if(this.oldHeight != canvas.height || this.oldWidth != canvas.width) {
        this.forceRedraw = true;
      }
  
      ctx.save();

      const availableHeight = canvas.height - this.headerHeight;
      const availableWidth = canvas.width;
  
      const caseSize = this.calculateCaseSize(availableHeight, availableWidth);

      const totalWidth = caseSize * this.grid.width;
      const totalHeight = caseSize * this.grid.height;

      const offsetX = Math.floor((availableWidth - totalWidth) / 2);
      const offsetY = Math.floor((availableHeight - totalHeight) / 2) + this.headerHeight;

      this.width = totalWidth;
      this.height = totalHeight;

      this.setupControls(canvas);

      this.setupLights();

      this.setupCameraAndSize();

      this.setupFruit();
      this.setupGoldFruit();
  
      this.setupGrid();

      this.updateSnakes();

      this.drawGrid(ctx, offsetX, offsetY, totalWidth, totalHeight, caseSize);

      this.saveCurrentState(canvas);
    
      this.oldTicks = this.ticks;

      if(this.debugMode) {
        Utils.drawText(ctx, this.getDebugText(), "rgba(255, 255, 255, 0.85)", Math.round(this.fontSize / 1.5), GameConstants.Setting.FONT_FAMILY, "left", "bottom", null, null, true);
      }
  
      ctx.restore();
    }
  }

  getDebugText() {
    const info = this.renderer.info;
    return `${i18next.t("engine.debug.drawcalls")} ${info.render.calls} / ${i18next.t("engine.debug.geometries")} ${info.memory.geometries} / ${i18next.t("engine.debug.textures")} ${info.memory.textures} / ${i18next.t("engine.debug.triangles")} ${info.render.triangles}`;
  }

  getMaterial(options) {
    switch(this.qualitySettings.materialType) {
    case "basic":
      return new THREE.MeshBasicMaterial(options);
    case "lambert":
      return new THREE.MeshLambertMaterial(options);
    case "phong":
      return new THREE.MeshPhongMaterial(options);
    default:
      return new THREE.MeshStandardMaterial(options);
    }
  }

  shouldUpdateBasedOnTicks() {
    return this.oldTicks < this.ticks || this.oldTicks === undefined || (this.ticks === 0 && this.oldTicks !== 0);
  }

  shouldUpdateDynamicReflections() {
    const reflectionQuality = this.qualitySettings && this.qualitySettings.reflectionQuality;
    const reflectionsEnabled = this.qualitySettings && this.qualitySettings.enableReflections;

    const shouldUpdateBasedOnTicks = this.shouldUpdateBasedOnTicks();
    
    const shouldUpdateDynamicThrottled = reflectionQuality === "dynamicThrottled" && shouldUpdateBasedOnTicks;
    const shouldUpdateDynamicOnce = reflectionQuality === "dynamicOnce" && this.gridStateChanged;
    const shouldUpdateStatic = reflectionQuality === "static" && !this.firstUpdatedReflections;

    const shouldUpdateBasedOnQuality = reflectionQuality === "dynamicFull" || shouldUpdateDynamicThrottled || shouldUpdateDynamicOnce || shouldUpdateStatic;

    const hasGoldFruit = this.hasGoldFruit;

    const isFirstGoldFrame = this.goldFruitFirstFrame === true;

    return reflectionsEnabled && shouldUpdateBasedOnQuality && hasGoldFruit && !isFirstGoldFrame;
  }

  drawGrid(ctx, offsetX, offsetY, totalWidth, totalHeight, caseSize) {
    if(!this.shadersCompiled) {
      this.buildShaders();
      this.shadersCompiled = true;
    }

    if(this.shouldUpdateDynamicReflections()) {
      this.updateReflections(this.goldFruitPosition.x, this.goldFruitPosition.y, 0.5);
      this.firstUpdatedReflections = true;
    }
    
    this.goldFruitFirstFrame = false;

    this.renderer.render(this.scene, this.camera);

    Utils.drawImageData(ctx, this.renderer.domElement, offsetX, offsetY, totalWidth, totalHeight, 0, 0, totalWidth, totalHeight);

    if(this.snakes.length > 1) {
      this.drawSnakeInfos(ctx, offsetX, offsetY, caseSize, this.currentPlayer);
    }
  }

  updateReflections(cameraX, cameraY, cameraZ) {
    this.cubeCamera.position.set(cameraX, cameraY, cameraZ);
    this.cubeCamera.update(this.renderer, this.scene);
  }

  interpolateCameraSettings(gridSize, presets) {
    const sizes = Object.keys(presets).map(Number).sort((a, b) => a - b);

    if(gridSize <= sizes[0]) {
      return presets[sizes[0]];
    }

    if(gridSize >= sizes[sizes.length - 1]) {
      return presets[sizes[sizes.length - 1]];
    }

    for(let i = 0; i < sizes.length - 1; i++) {
      const sizeA = sizes[i];
      const sizeB = sizes[i + 1];

      if(gridSize >= sizeA && gridSize <= sizeB) {
        const ratio = (gridSize - sizeA) / (sizeB - sizeA);
        const fov = presets[sizeA].fov + ratio * (presets[sizeB].fov - presets[sizeA].fov);
        const distance = presets[sizeA].distance + ratio * (presets[sizeB].distance - presets[sizeA].distance);
        const zoom = presets[sizeA].zoom + ratio * (presets[sizeB].zoom - presets[sizeA].zoom);

        return { fov, distance, zoom };
      }
    }
  }

  setupCameraAndSize() {
    if(!this.isCameraInit) {
      const gridWidth = this.grid.width;
      const gridHeight = this.grid.height;
      
      const screenAspect = this.width / this.height;
      const gridAspect = this.grid.width / this.grid.height;

      const useWidthPresets = gridAspect > screenAspect;

      const gridSize = useWidthPresets ? gridWidth : gridHeight;
      const presets = useWidthPresets ? this.cameraPresetsByWidth : this.cameraPresetsByHeight;

      const { fov, distance, zoom } = this.interpolateCameraSettings(gridSize, presets);

      this.camera.fov = fov;
      this.camera.aspect = screenAspect;
      this.camera.zoom = zoom;
      this.camera.position.set(0, 0, distance);
      this.camera.lookAt(0, 0, 0);
      this.camera.updateProjectionMatrix();

      this.isCameraInit = true;
    }

    if(!this.isCameraDebugInit && this.debugMode) {
      this.cameraHelper = new THREE.CameraHelper(this.camera);
      this.scene.add(this.cameraHelper);

      this.isCameraDebugInit = true;
    }

    this.renderer.setSize(this.width, this.height);

    if(this.controls) {
      this.controls.update();
    }
  }

  setupLights() {
    if(!this.isLightInit) {
      const gridSize = Math.max(this.grid.width, this.grid.height);
      const halfGrid = gridSize / 2;
      const padding = 2;

      this.ambientLight = new THREE.AmbientLight(0xffffff, 1);

      this.dirLight = new THREE.DirectionalLight(0xffffff, 1.2);

      this.dirLight.position.set(-halfGrid * 0.5, halfGrid * 0.5, halfGrid * 2);
      this.dirLight.target.position.set(0, 0, 0);

      this.dirLight.castShadow = true;
      this.dirLight.shadow.mapSize.width = this.qualitySettings.shadowResolution;
      this.dirLight.shadow.mapSize.height = this.qualitySettings.shadowResolution;

      this.dirLight.shadow.camera.near = 1;
      this.dirLight.shadow.camera.far = 100;

      this.dirLight.shadow.camera.left = -halfGrid - padding;
      this.dirLight.shadow.camera.right = halfGrid + padding;
      this.dirLight.shadow.camera.top = halfGrid + padding;
      this.dirLight.shadow.camera.bottom = -halfGrid - padding;

      this.dirLight.shadow.camera.near = 0.1;
      this.dirLight.shadow.camera.far = halfGrid * 4;

      this.scene.add(this.ambientLight, this.dirLight);

      this.isLightInit = true;
    }

    if(!this.isLightDebugInit && this.debugMode) {
      this.lightHelper = new THREE.DirectionalLightHelper(this.dirLight);
      this.scene.add(this.lightHelper);

      this.isLightDebugInit = true;
    }
  }

  buildShaders() {
    this.fruitModelGold.visible = true;
    this.fruitModelGold.position.set(0, 0, 0.5);

    this.updateReflections(0, 0, 0.5);

    this.renderer.render(this.scene, this.camera);
    this.renderer.compile(this.scene, this.camera);

    this.fruitModelGold.visible = false;
  }

  disposeGroup(group) {
    group.traverse(child => {
      if(child.isMesh) {
        this.disposeMesh(child);
      }
    });
  }

  disposeMesh(mesh) {
    mesh.geometry?.dispose();

    if(Array.isArray(mesh.material)) {
      mesh.material.forEach(mat => mat?.dispose());
    } else {
      mesh.material?.dispose();
    }

    if(mesh.texture?.dispose) {
      mesh.texture.dispose();
    }
  }

  clearGrid() {
    this.disposeGroup(this.gridGroup);
    this.gridGroup.clear();
  }

  hideFruits() {
    this.fruitModel.visible = false;
    this.fruitModelGold.visible = false;
    this.fruitPointLight.visible = false;
    this.fruitGoldPointLight.visible = false;
  }
  
  setupGrid() {
    if(this.forceRedraw || this.gridStateChanged) {
      this.hasGoldFruit = false;

      this.clearGrid();
      this.hideFruits();

      const totalCells = this.grid.width * this.grid.height;
      const halfCells = Math.floor(totalCells / 2);

      const ground = this.constructGround();
      const wallInstancedMesh = this.constructWallMesh();
      const lightGrayCellInstancedMesh = this.constructLightGrayCell(totalCells, halfCells);
      const darkGrayCellInstancedMesh = this.constructDarkGrayCell(halfCells);

      this.gridGroup.add(ground, lightGrayCellInstancedMesh, darkGrayCellInstancedMesh);

      if(wallInstancedMesh) {
        this.gridGroup.add(wallInstancedMesh);
      }

      const halfGridWidth = this.grid.width / 2;
      const halfGridHeight = this.grid.height / 2;

      let wallIndex = 0;
      let lightGrayCellIndex = 0;
      let darkGrayCellIndex = 0;

      for(let y = 0; y < this.grid.height; y++) {
        for(let x = 0; x < this.grid.width; x++) {
          const xPosition = x - halfGridWidth + 0.5;
          const yPosition = (this.grid.height - 1 - y) - halfGridHeight + 0.5;

          const caseType = this.grid.get(new Position(x, y));

          if(caseType === GameConstants.CaseType.WALL) {
            const matrix = new THREE.Matrix4().makeTranslation(xPosition, yPosition, 0.75);
            wallInstancedMesh.setMatrixAt(wallIndex++, matrix);
          } else {
            const matrix = new THREE.Matrix4().makeTranslation(xPosition, yPosition, 0.05);
            const cellMesh = (x + y) % 2 === 0 ? lightGrayCellInstancedMesh : darkGrayCellInstancedMesh;
            cellMesh.setMatrixAt((x + y) % 2 === 0 ? lightGrayCellIndex++ : darkGrayCellIndex++, matrix);
          }

          if(caseType === GameConstants.CaseType.FRUIT || caseType === GameConstants.CaseType.FRUIT_GOLD) {
            this.displayFruit(xPosition, yPosition, caseType);
          }

          if(!Object.values(GameConstants.CaseType).includes(caseType)) {
            const unknownModel = this.constructUnknownModel(xPosition, yPosition);
            
            if(unknownModel) {
              this.gridGroup.add(unknownModel);
            }
          }
        }
      }
    }
  }

  constructUnknownModel(xPosition, yPosition) {
    const unknownModel = this.modelLoader.get("unknown");

    if(unknownModel) {
      const box = new THREE.Box3().setFromObject(unknownModel);

      const size = new THREE.Vector3();
      box.getSize(size);

      unknownModel.scale.setScalar(0.4 / size.x);
      unknownModel.position.set(xPosition - 0.3, yPosition - 0.4, 0.5);
      unknownModel.rotation.x = Math.PI / 2;

      unknownModel.traverse(child => {
        if(child.isMesh) {
          child.material = this.getMaterial({
            map: child.material.map,
            normalMap: child.material.normalMap,
            metalnessMap: child.material.metalnessMap,
            roughnessMap: child.material.roughnessMap
          });

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    return unknownModel;
  }

  constructGround() {
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(this.grid.width, this.grid.height, 2),
      this.getMaterial({ color: 0x95a5a6 })
    );

    ground.receiveShadow = false;
    ground.position.set(0, 0, -1);
    return ground;
  }

  countWalls() {
    let wallsCount = 0;

    for(let y = 0; y < this.grid.height; y++) {
      for(let x = 0; x < this.grid.width; x++) {
        const caseType = this.grid.get(new Position(x, y));

        if(caseType === GameConstants.CaseType.WALL) {
          wallsCount++;
        }
      }
    }

    return wallsCount;
  }

  constructWallMesh() {
    const wallsCount = this.countWalls();

    if(wallsCount <= 0) {
      return null;
    }

    if(!this.wallTexture) {
      const wallImage = this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/${GameUtils.getImageCase(GameConstants.CaseType.WALL)}`);
      this.wallTexture = new THREE.CanvasTexture(wallImage);
      this.wallTexture.colorSpace = THREE.SRGBColorSpace;
    }

    if(!this.wallTextureNormal) {
      const wallTextureNormal = this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/wall_normal.png`);
      this.wallTextureNormal = new THREE.CanvasTexture(wallTextureNormal);
      this.wallTextureNormal.colorSpace = THREE.SRGBColorSpace;
    }

    if(!this.wallTextureHeight) {
      const wallTextureHeight = this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/wall_height.png`);
      this.wallTextureHeight = new THREE.CanvasTexture(wallTextureHeight);
      this.wallTextureHeight.colorSpace = THREE.SRGBColorSpace;
    }

    if(!this.wallTextureAO) {
      const wallTextureAO = this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/wall_ao.png`);
      this.wallTextureAO = new THREE.CanvasTexture(wallTextureAO);
      this.wallTextureAO.colorSpace = THREE.SRGBColorSpace;
    }

    const wallGeometry = new THREE.BoxGeometry(1, 1, 1.5);
    const wallMaterial = this.getMaterial({
      map: this.wallTexture,
      toneMapped: false,
      normalMap: this.wallTextureNormal,
      bumpMap: this.wallTextureHeight,
      bumpScale: 2.0,
      aoMap: this.wallTextureAO,
      aoMapIntensity: 0.75
    });

    const wallInstancedMesh = new THREE.InstancedMesh(wallGeometry, wallMaterial, wallsCount);
    wallInstancedMesh.receiveShadow = true;
    wallInstancedMesh.castShadow = true;

    return wallInstancedMesh;
  }

  constructLightGrayCell(totalCells, halfCells) {
    const lightGrayCellGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const lightGrayCellMaterial = this.getMaterial({ color: 0x95a5a6 });
    const lightGrayCellInstancedMesh = new THREE.InstancedMesh(lightGrayCellGeometry, lightGrayCellMaterial, totalCells % 2 === 0 ? halfCells : halfCells + 1);
    lightGrayCellInstancedMesh.receiveShadow = true;
    lightGrayCellInstancedMesh.castShadow = false;
    return lightGrayCellInstancedMesh;
  }

  constructDarkGrayCell(halfCells) {
    const darkGrayCellGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const darkGrayCellMaterial = this.getMaterial({ color: 0x2c3e50 });
    const darkGrayCellInstancedMesh = new THREE.InstancedMesh(darkGrayCellGeometry, darkGrayCellMaterial, halfCells);
    darkGrayCellInstancedMesh.receiveShadow = true;
    darkGrayCellInstancedMesh.castShadow = false;
    return darkGrayCellInstancedMesh;
  }

  setupFruit() {
    if(this.fruitModel) {
      return;
    }

    this.fruitModel = this.modelLoader.get("fruit");

    if(this.fruitModel) {
      this.fruitPointLight = new THREE.PointLight(0xff1100, 0.8, 2);

      const box = new THREE.Box3().setFromObject(this.fruitModel);

      const size = new THREE.Vector3();
      box.getSize(size);

      this.fruitModel.scale.setScalar(0.8 / size.x);
      this.fruitModel.rotation.x = Math.PI / 2;

      this.fruitModel.traverse(child => {
        if(child.isMesh) {
          child.material = this.getMaterial({
            map: child.material.map,
            normalMap: child.material.normalMap,
            metalnessMap: child.material.metalnessMap,
            roughnessMap: child.material.roughnessMap,
            roughness: 0.4,
          });
        }

        child.castShadow = true;
        child.receiveShadow = true;
      });

      this.fruitsGroup.add(this.fruitModel, this.fruitPointLight);
    }
  }

  setupGoldFruit() {
    if(this.fruitModelGold) {
      return;
    }

    this.fruitModelGold = this.modelLoader.get("fruit");

    if(this.fruitModelGold) {
      const fruitGoldColor = 0xFFD700;

      this.fruitGoldPointLight = new THREE.PointLight(fruitGoldColor, 0.8, 2);

      const box = new THREE.Box3().setFromObject(this.fruitModelGold);

      const size = new THREE.Vector3();
      box.getSize(size);

      this.fruitModelGold.scale.setScalar(0.8 / size.x);
      this.fruitModelGold.rotation.x = Math.PI / 2;

      this.fruitModelGold.traverse(child => {
        if(child.isMesh) {
          const enableReflections = this.qualitySettings && this.qualitySettings.enableReflections;

          child.material = this.getMaterial({
            color: fruitGoldColor,
            metalness: enableReflections ? 0.85 : 0.75,
            roughness: 0.18,
            envMap: enableReflections ? this.cubeRenderTarget.texture : null
          });
        }

        child.castShadow = true;
        child.receiveShadow = true;
      });

      this.fruitsGroup.add(this.fruitModelGold, this.fruitGoldPointLight);
    }
  }

  displayFruit(xPosition, yPosition, caseType) {
    const isGoldFruit = caseType === GameConstants.CaseType.FRUIT_GOLD;
    const fruitModel = isGoldFruit ? this.fruitModelGold : this.fruitModel;
    const pointLight = isGoldFruit ? this.fruitGoldPointLight : this.fruitPointLight;

    if(fruitModel) {
      if(this.qualitySettings.fruitLights) {
        pointLight.visible = true;
        pointLight.position.set(xPosition, yPosition, 0.5);
      } else {
        pointLight.visible = false;
      }

      fruitModel.visible = true;
      fruitModel.position.set(xPosition, yPosition, 0.5);

      if(isGoldFruit) {
        this.hasGoldFruit = true;
        this.goldFruitPosition = { x: xPosition, y: yPosition };
      }
    }
  }

  shouldUpdateSnakeBodyGeometry(snakeIndex, snake) {
    const shouldUpdateBasedOnTicks = this.shouldUpdateBasedOnTicks();
    const shouldUpdateBasedOnState = !snake.gameOver || this.individualSnakeStateHasChanged(snakeIndex);

    return shouldUpdateBasedOnTicks && shouldUpdateBasedOnState;
  }

  cleanOldSnakeGeometry(snakeIndex) {
    if(!this.snakesMeshes) {
      return;
    }
    
    const meshes = this.snakesMeshes[snakeIndex];

    if(meshes && meshes.bodyParts) {
      this.cleanSnakesBodyParts(meshes.bodyParts);
    }
  }

  cleanSnakesBodyParts(bodyParts) {
    if(!bodyParts) {
      return;
    }

    for(const bodyPart of bodyParts) {
      this.disposeMesh(bodyPart);
      this.snakesGroup.remove(bodyPart);
    }
  }

  cleanSnakesMeshes(snakeIndex) {
    const meshes = this.snakesMeshes[snakeIndex];

    this.cleanSnakesBodyParts(meshes.bodyParts);
    this.clearSnakeTransition(snakeIndex, { type: "head" });
    this.clearSnakeTransition(snakeIndex, { type: "tail" });
    this.disposeMesh(meshes.headMesh);
    this.disposeMesh(meshes.tailMesh);
    this.disposeMesh(meshes.snakeMaterial);
    this.disposeGroup(meshes.eyesGroup);

    this.snakesGroup.remove(meshes.headMesh, meshes.tailMesh, meshes.eyesGroup);

    this.snakesMeshes[snakeIndex] = null;
  }

  updateSnakes() {
    this.resetSnakeTransitionCache();

    for(let i = 0; i < this.snakes.length; i++) {
      this.updateSnake(i);
    }
  }

  updateSnake(snakeIndex) {
    const snake = this.snakes[snakeIndex];
    const previousSnakeState = this.oldSnakesState ? this.oldSnakesState[snakeIndex] : null;

    if(previousSnakeState && previousSnakeState.gameOver != snake.gameOver) {
      this.updateSnakeEyes(snakeIndex, snake);
    }

    // If color has changed, we reset the meshes
    if(previousSnakeState && previousSnakeState.color != snake.color) {
      this.cleanSnakesMeshes(snakeIndex);
    }

    if(!this.snakesMeshes[snakeIndex]) {
      this.setupSnake(snake, snakeIndex);
    }

    if(this.shouldUpdateSnakeBodyGeometry(snakeIndex, snake)) {
      this.cleanOldSnakeGeometry(snakeIndex);
      this.updateSnakeGeometry(snakeIndex, snake);
    }

    this.animateSnakeHead(snakeIndex, snake);
    this.animateSnakeTail(snakeIndex, snake);
  }

  updateSnakeEyes(snakeIndex, snake) {
    const meshes = this.snakesMeshes[snakeIndex];

    if(meshes && meshes.eyesGroup) {
      this.disposeGroup(meshes.eyesGroup);
      meshes.headMesh.remove(meshes.eyesGroup);
    }

    const crossGroup = this.createSnakeEyes(snake);
    meshes.headMesh.add(crossGroup);
    meshes.eyesGroup = crossGroup;
  }

  setupSnake(snake, snakeIndex) {
    const snakeMaterial = this.getSnakeMaterial(snake);

    const headMesh = this.modelLoader.get("head");

    headMesh.traverse(child => {
      if(child.isMesh) {
        child.material = snakeMaterial;
      }

      child.castShadow = true;
      child.receiveShadow = true;
    });

    const tailMesh = this.modelLoader.get("tail");

    tailMesh.traverse(child => {
      if(child.isMesh) {
        child.material = snakeMaterial;
      }

      child.castShadow = true;
      child.receiveShadow = true;
    });

    const eyesGroup = this.createSnakeEyes(snake);
    headMesh.add(eyesGroup);

    this.snakesMeshes[snakeIndex] = {
      bodyParts: null,
      headMesh: headMesh,
      tailMesh: tailMesh,
      snakeMaterial,
      eyesGroup,
      snakeIndex
    };

    this.snakesGroup.add(headMesh, tailMesh);
  }

  animateSnakeHead(snakeIndex, snake) {
    this.animateSnake({
      snakeIndex,
      snake,
      mesh: this.snakesMeshes[snakeIndex].headMesh,
      position: snake.getHeadPosition(),
      nextDirection: this.getSnakeDirection(snake, 1, snake.getHeadPosition()),
      snakePart: 0,
      type: "head"
    });
  }

  animateSnakeTail(snakeIndex, snake) {
    this.animateSnake({
      snakeIndex,
      snake,
      mesh: this.snakesMeshes[snakeIndex].tailMesh,
      position: snake.getTailPosition(),
      nextDirection: snake.get(snake.length() - 2).direction,
      snakePart: -1,
      type: "tail"
    });
  }

  getSnakePartGraphicDirection(snakePart, snake) {
    if(snakePart === 0) {
      if(snake.length() > 1) {
        return snake.getGraphicDirection(1);
      }
      
      return snake.getGraphicDirection(0);
    } else if(snakePart === -1) {
      return snake.getGraphicDirectionFor(snake.getTailPosition(), snake.lastTail, snake.get(snake.length() - 2));
    }

    return null;
  }

  animateSnake({ snake, snakeIndex, mesh, position, nextDirection, snakePart, type }) {
    const animationPercentage = this.calculateAnimationPercentage(snake, snakePart);

    const currentDirection = this.getSnakeDirection(snake, snakePart, position);

    const position3D = this.gridPositionTo3DPosition(position);

    const isTurning = this.isSnakePartTurning(snake, snakePart);

    const margin = this.getSnakeMargin(currentDirection, nextDirection, type, isTurning, animationPercentage);

    const caseSize = 1;
    const animationOffset = (caseSize * animationPercentage) - caseSize;

    const offset = new THREE.Vector3(margin.x, margin.y, 0);

    switch(currentDirection) {
    case GameConstants.Direction.UP:
      offset.y += animationOffset;
      break;
    case GameConstants.Direction.DOWN:
      offset.y -= animationOffset;
      break;
    case GameConstants.Direction.RIGHT:
      offset.x += animationOffset;
      break;
    case GameConstants.Direction.LEFT:
      offset.x -= animationOffset;
      break;
    }

    mesh.position.set(position3D.x + offset.x, position3D.y + offset.y, 0.3);

    this.animateSnakeRotation(snake, snakePart, currentDirection, animationPercentage, mesh);
    
    this.updateSnakeTransition(snakeIndex, snake, type, margin);
  }

  isSnakePartTurning(snake, snakePart) {
    return this.shouldDisplayAnimation(snake, snakePart)
      && (snakePart === 0 || snakePart === -1)
      && this.isAngleDirection(this.getSnakePartGraphicDirection(snakePart, snake));
  }

  handleSnakeGridCrossing(toPos, fromPos, snakePart) {
    const deltaX = toPos.x - fromPos.x;
    const deltaY = toPos.y - fromPos.y;

    if(snakePart === -1) {
      if(Math.abs(deltaX) > this.grid.width / 2) {
        if(deltaX > 0) {
          toPos.x -= this.grid.width;
        } else {
          toPos.x += this.grid.width;
        }
      }

      if(Math.abs(deltaY) > this.grid.height / 2) {
        if(deltaY > 0) {
          toPos.y -= this.grid.height;
        } else {
          toPos.y += this.grid.height;
        }
      }
    } else {
      if(Math.abs(deltaX) > this.grid.width / 2) {
        if (deltaX > 0) {
          fromPos.x += this.grid.width;
        } else {
          fromPos.x -= this.grid.width;
        }
      }

      if(Math.abs(deltaY) > this.grid.height / 2) {
        if (deltaY > 0) {
          fromPos.y += this.grid.height;
        } else {
          fromPos.y -= this.grid.height;
        }
      }
    }
  }

  animateSnakeRotation(snake, snakePart, targetDir, animationPercentage, mesh) {
    const baseAngle = this.getHeadAndTailRotationFromDirection(targetDir);

    const graphicDirection = this.getSnakePartGraphicDirection(snakePart, snake);

    if((snakePart == 0 || snakePart == -1) && this.isAngleDirection(graphicDirection)
      && this.shouldDisplayAnimation(snake, snakePart)) {
      const animationAngle = this.calculateAnimationAngle(
        snakePart,
        animationPercentage,
        graphicDirection,
        targetDir
      );
      
      mesh.rotation.z = baseAngle - (animationAngle * (Math.PI / 180));
    } else {
      mesh.rotation.z = baseAngle;
    }
  }

  getSnakeMargin(currentDir, nextDir, type, isTurning, t) {
    const straightMargin = {
      head: {
        [GameConstants.Direction.RIGHT]: { x: -0.35, y: 0 },
        [GameConstants.Direction.LEFT]:  { x:  0.35, y: 0 },
        [GameConstants.Direction.UP]:    { x:  0,   y: -0.35 },
        [GameConstants.Direction.DOWN]:  { x:  0,   y:  0.35 }
      },
      tail: {
        [GameConstants.Direction.RIGHT]: { x:  0.35, y: 0 },
        [GameConstants.Direction.LEFT]:  { x: -0.35, y: 0 },
        [GameConstants.Direction.UP]:    { x:  0,   y: 0.35 },
        [GameConstants.Direction.DOWN]:  { x:  0,   y: -0.35 }
      }
    };

    if(!isTurning) {
      return straightMargin[type]?.[currentDir] || { x: 0, y: 0 };
    }

    const startMargin = straightMargin[type]?.[currentDir] || { x: 0, y: 0 };
    const endMargin   = straightMargin[type]?.[nextDir]    || { x: 0, y: 0 };

    if(type === "head") {
      return {
        x: endMargin.x * (1 - t) + startMargin.x * t,
        y: endMargin.y * (1 - t) + startMargin.y * t
      };
    } else {
      if (t < 0.6) {
        return startMargin;
      } else {
        const localT = (t - 0.6) / 0.4;
        return {
          x: startMargin.x * (1 - localT) + endMargin.x * localT,
          y: startMargin.y * (1 - localT) + endMargin.y * localT
        };
      }
    }
  }

  getHeadAndTailRotationFromDirection(direction) {
    return {
      [GameConstants.Direction.RIGHT]: -Math.PI / 2,
      [GameConstants.Direction.LEFT]: Math.PI / 2,
      [GameConstants.Direction.DOWN]: Math.PI,
      [GameConstants.Direction.UP]: 0
    }[direction] ?? 0;
  }

  createGenericSnakeSegmentGeometry(snake, length, type, isTurning) {
    const { tubularSegments, radiusSegments } = this.calculateSnakeGeometryQualityIndividual(snake, type);

    let points;

    if(!isTurning) {
      if(type === "head") {
        points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(length, 0, 0),
          new THREE.Vector3(length + 0.5, 0, 0)
        ];
      } else {
        points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-length - 0.25, 0, 0),
          new THREE.Vector3(-(length - 1), 0, 0)
        ];
      }
    } else {
      points = [
        new THREE.Vector3(0.5, 0.5 * length, 0),
        new THREE.Vector3(0.5, 0, 0),
        new THREE.Vector3(0, 0, 0)
      ];
    }

    const curve = new THREE.CatmullRomCurve3(points);

    return new THREE.TubeGeometry(curve, tubularSegments, 0.35, radiusSegments, false);
  }

  getCacheKey(type, animationPercentage, isTurning) {
    if(isTurning) {
      return `turn_${animationPercentage.toFixed(2)}`;
    }

    return `${type}_${animationPercentage.toFixed(2)}`;
  }

  updateSnakeTransition(snakeIndex, snake, type) {
    if(type === "tail") return;
    const snakeMeshes = this.snakesMeshes[snakeIndex];
    const meshKey = type + "TransitionMesh";
    const snakePart = type === "head" ? 0 : -1;

    const parentMesh = type === "head" ? snakeMeshes.headMesh : snakeMeshes.tailMesh;

    if(!parentMesh) {
      return;
    }

    const animationPercentage = this.calculateAnimationPercentage(snake, snakePart);
    const caseSize = 1;
    const length = caseSize * animationPercentage;

    const currentDir = type === "head"
      ? this.getSnakeDirection(snake, 0, snake.getHeadPosition())
      : this.getSnakeDirection(snake, -1, snake.getTailPosition());

    const nextDir = type === "head"
      ? this.getSnakeDirection(snake, 0, snake.get(1))
      : this.getSnakeDirection(snake, -1, snake.get(snake.length() - 2));

    const margin = this.getSnakeMargin(currentDir, nextDir, type, false, animationPercentage);
    const isTurning = this.isSnakePartTurning(snake, snakePart);

    const offset = new THREE.Vector3(0, 0, 0);

    const currentGraphicDirection = this.getSnakePartGraphicDirection(snakePart, snake);

    switch(currentGraphicDirection) {
    case GameConstants.Direction.UP:    offset.y = (type === "head" ? -length : length); break;
    case GameConstants.Direction.DOWN:  offset.y = (type === "head" ? length : -length); break;
    case GameConstants.Direction.RIGHT: offset.x = (type === "head" ? -length : length); break;
    case GameConstants.Direction.LEFT:  offset.x = (type === "head" ? length : -length); break;
    case GameConstants.Direction.ANGLE_1:  offset.y = (type === "head" ? -0.5 : 0.5); break;
    case GameConstants.Direction.ANGLE_2:  offset.x = (type === "head" ? 0.5 : -0.5); break;
    case GameConstants.Direction.ANGLE_3:  offset.y = (type === "head" ? 0.5 : -0.5); break;
    case GameConstants.Direction.ANGLE_4:  offset.x = (type === "head" ? -0.5 : 0.5); break;
    }

    offset.add(new THREE.Vector3(margin.x, margin.y, 0));

    const cacheKey = this.getCacheKey(type, animationPercentage, isTurning);

    if(!this.transitionSegmentGeometryCache) {
      this.transitionSegmentGeometryCache = {};
    }
    
    let geometry = this.transitionSegmentGeometryCache[cacheKey];

    if(!geometry) {
      geometry = this.createGenericSnakeSegmentGeometry(snake, length, type, isTurning);
      this.transitionSegmentGeometryCache[cacheKey] = geometry;
    }

    if(!snakeMeshes[meshKey]) {
      const mesh = new THREE.Mesh(geometry, snakeMeshes.snakeMaterial);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.snakesGroup.add(mesh);
      snakeMeshes[meshKey] = mesh;
    } else if (snakeMeshes[meshKey].geometry !== geometry) {
      snakeMeshes[meshKey].geometry.dispose();
      snakeMeshes[meshKey].geometry = geometry;
    }

    if(!isTurning) {
      snakeMeshes[meshKey].position.copy(parentMesh.position).add(offset);
    } else {
      const currentPosition = type === "head"
        ? snake.get(1)
        : snake.get(snake.length() - 2);
      
      const position3D = this.gridPositionTo3DPosition(currentPosition);

      switch(currentDir) {
      case GameConstants.Direction.UP:
        position3D.y += 0.35; break;
      case GameConstants.Direction.RIGHT:
        position3D.x += 0.35; break;
      case GameConstants.Direction.DOWN:
        position3D.y -= 0.35; break;
      case GameConstants.Direction.LEFT:
        position3D.x -= 0.35; break;
      }
  
      snakeMeshes[meshKey].position.copy(new THREE.Vector3(position3D.x, position3D.y, 0.3)).add(offset);
    }
    
    snakeMeshes[meshKey].rotation.y = 0;
    snakeMeshes[meshKey].rotation.z = isTurning ? this.getSnakeTurningTransitionRotationFromDirection(currentGraphicDirection)
      : this.getSnakeStraightTransitionRotationFromDirection(currentGraphicDirection);

    if(isTurning) {
      const mirror = this.isTurningMirror(currentGraphicDirection, currentDir);
      snakeMeshes[meshKey].rotation.z += mirror.rotation.z;
      snakeMeshes[meshKey].rotation.y += mirror.rotation.y;

      snakeMeshes[meshKey].position.x += mirror.position.x;
      snakeMeshes[meshKey].position.y += mirror.position.y;
    } else {
      snakeMeshes[meshKey].rotation.y = 0;
    }
  }

  isTurningMirror(currentGraphicDirection, headDir) {
    if(currentGraphicDirection === GameConstants.Direction.ANGLE_2 && headDir === GameConstants.Direction.RIGHT) {
      return {
        rotation: {
          z: -Math.PI / 2, y: Math.PI
        },
        position: {
          x: -0.5, y: -0.5
        }
      };
    } else if(currentGraphicDirection === GameConstants.Direction.ANGLE_4 && headDir === GameConstants.Direction.LEFT) {
      return {
        rotation: {
          z: -Math.PI / 2, y: Math.PI
        },
        position: {
          x: 0.5, y: 0.5
        }
      };
    } else if(currentGraphicDirection === GameConstants.Direction.ANGLE_1 && headDir === GameConstants.Direction.DOWN) {
      return {
        rotation: {
          z: Math.PI / 2, y: -Math.PI
        },
        position: {
          x: -0.5, y: 0.5
        }
      };
    } else if(currentGraphicDirection === GameConstants.Direction.ANGLE_3 && headDir === GameConstants.Direction.UP) {
      return {
        rotation: {
          z: Math.PI / 2, y: -Math.PI
        },
        position: {
          x: 0.5, y: -0.5
        }
      };
    }

    return {
      rotation: {
        z: 0, y: 0
      },
      position: {
        x: 0, y: 0
      }
    };
  }

  getSnakeStraightTransitionRotationFromDirection(direction) {
    return {
      [GameConstants.Direction.RIGHT]: 0,
      [GameConstants.Direction.LEFT]: -Math.PI,
      [GameConstants.Direction.DOWN]: -Math.PI / 2,
      [GameConstants.Direction.UP]: Math.PI / 2,
      [GameConstants.Direction.ANGLE_1]: Math.PI / 2,
      [GameConstants.Direction.ANGLE_2]: Math.PI,
      [GameConstants.Direction.ANGLE_3]: -Math.PI / 2,
      [GameConstants.Direction.ANGLE_4]: 0
    }[direction] ?? 0;
  }

  getSnakeTurningTransitionRotationFromDirection(direction) {
    return {
      [GameConstants.Direction.RIGHT]: 0,
      [GameConstants.Direction.LEFT]: -Math.PI,
      [GameConstants.Direction.DOWN]: -Math.PI / 2,
      [GameConstants.Direction.UP]: Math.PI / 2,
      [GameConstants.Direction.ANGLE_1]: Math.PI / 2,
      [GameConstants.Direction.ANGLE_2]: Math.PI,
      [GameConstants.Direction.ANGLE_3]: -Math.PI / 2,
      [GameConstants.Direction.ANGLE_4]: 0
    }[direction] ?? 0;
  }

  resetSnakeTransitionCache() {
    if(this.transitionSegmentGeometryCache) {
      for(const k in this.transitionSegmentGeometryCache) {
        const segment = this.transitionSegmentGeometryCache[k];

        if(segment) {
          this.transitionSegmentGeometryCache[k].dispose();
        }
      }
    }

    this.transitionSegmentGeometryCache = {};
  }

  clearSnakeTransition(snakeIndex, options) {
    const { type } = options;
    const snakeMeshes = this.snakesMeshes[snakeIndex];

    const transitionMeshKey = type + "TransitionMesh";

    const oldTransitionMesh = snakeMeshes[transitionMeshKey];

    if(oldTransitionMesh) {
      this.disposeMesh(oldTransitionMesh);
      this.snakesGroup.remove(oldTransitionMesh);
    }
  }

  calculateSnakeSegmentsPositions(snake) {
    const segments = [];
    let currentSegment = [];

    let previousPosition = null;

    for(let i = 0; i < snake.length(); i++) {
      const currentPosition = snake.get(i);
      const currentPosition3D = this.gridPositionTo3DPosition(currentPosition);

      const currentPositionData = {
        vector: new THREE.Vector3(
          currentPosition3D.x,
          currentPosition3D.y,
          0.3
        ),
        direction: this.getSnakeDirection(snake, i, currentPosition)
      };

      const direction = snake.get(i).direction;

      if(i === 0) {
        switch(direction) {
        case GameConstants.Direction.RIGHT: currentPositionData.vector.x -= 0.6; break;
        case GameConstants.Direction.LEFT:  currentPositionData.vector.x += 0.6; break;
        case GameConstants.Direction.BOTTOM: currentPositionData.vector.y += 0.6; break;
        case GameConstants.Direction.TOP:    currentPositionData.vector.y -= 0.6; break;
        }
      }

      if(previousPosition) {
        const dx = currentPosition.x - previousPosition.x;
        const dy = currentPosition.y - previousPosition.y;

        const wrappedX = Math.abs(dx) >= this.grid.width - 1;
        const wrappedY = Math.abs(dy) >= this.grid.height - 1;

        if(wrappedX || wrappedY) {
          const previousPosition3D = this.gridPositionTo3DPosition(previousPosition);

          const previousPositionVector = new THREE.Vector3(
            previousPosition3D.x,
            previousPosition3D.y,
            0.3
          );

          const wrapOffset = new THREE.Vector3(
            wrappedX ? -Math.sign(dx) : 0,
            wrappedY ? Math.sign(dy) : 0,
            0
          );

          const fakeEnd = {
            vector: previousPositionVector.clone().add(wrapOffset),
            direction: null
          };

          const fakeStart = {
            vector: currentPositionData.vector.clone().sub(wrapOffset),
            direction: null
          };

          currentSegment.push(fakeEnd);

          if(currentSegment.length >= 2) {
            segments.push(currentSegment);
          }

          currentSegment = [fakeStart];
        }
      }

      currentSegment.push(currentPositionData);
      previousPosition = currentPosition;
    }

    if(currentSegment.length >= 2) {
      segments.push(currentSegment);
    }

    return segments;
  }

  createSegmentMesh(index, segment, straightMesh, curveMesh) {
    const isAngle = this.isAngleDirection(segment.direction);
    const mesh = isAngle ? curveMesh : straightMesh;

    const segmentTransform = new THREE.Object3D();
    segmentTransform.position.set(segment.vector.x, segment.vector.y, segment.vector.z);

    switch(segment.direction) {
    case GameConstants.Direction.ANGLE_1:
      segmentTransform.rotation.z = Math.PI / 2;
      segmentTransform.position.y -= 0.5;
      break;
    case GameConstants.Direction.ANGLE_2:
      segmentTransform.rotation.z = Math.PI;
      segmentTransform.position.x += 0.5;
      break;
    case GameConstants.Direction.ANGLE_3:
      segmentTransform.rotation.z = -Math.PI / 2;
      segmentTransform.position.y += 0.5;
      break;
    case GameConstants.Direction.ANGLE_4:
      segmentTransform.rotation.z = 0;
      segmentTransform.position.x -= 0.5;
      break;
    case GameConstants.Direction.TOP:
    case GameConstants.Direction.BOTTOM:
      segmentTransform.rotation.z = Math.PI / 2;
      break;
    case GameConstants.Direction.LEFT:
    case GameConstants.Direction.RIGHT:
      segmentTransform.rotation.z = 0;
      break;
    }

    segmentTransform.updateMatrix();
    mesh.setMatrixAt(index, segmentTransform.matrix);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  updateSnakeGeometry(snakeIndex, snake) {
    const snakeMeshes = this.snakesMeshes[snakeIndex];
    const snakeMaterial = snakeMeshes.snakeMaterial;
    const segmentsPositions = this.calculateSnakeSegmentsPositions(snake);

    const snakeMesh = this.snakeBodyRenderingMethod === "TUBES" ? 
      this.generateSnakeBodyMeshTubes(segmentsPositions, snake, snakeMaterial) :
      this.generateSnakeBodyMeshIndividual(segmentsPositions, snake, snakeMaterial);

    if(snakeMesh && snakeMesh.length > 0) {
      this.snakesGroup.add(...snakeMesh);
    }

    snakeMeshes.bodyParts = snakeMesh;
  }

  getSnakeBodyGeometryTubes(snake, points) {
    const { tubularSegments, radiusSegments } = this.calculateSnakeGeometryQualityTubes(snake);

    const curve = new THREE.CatmullRomCurve3(points, false);
   
    return new THREE.TubeGeometry(curve, tubularSegments, 0.35, radiusSegments, false);
  }

  generateSnakeBodyMeshTubes(segmentsPositions, snake, snakeMaterial) {
    const tubesGeometries = [];

    for(const segment of segmentsPositions) {
      const geometry = this.getSnakeBodyGeometryTubes(snake, segment.map(segment => segment.vector));
      tubesGeometries.push(geometry);
    }

    const tubesMeshes = [];

    for(const geometry of tubesGeometries) {
      const tube = new THREE.Mesh(geometry, snakeMaterial);
      tube.castShadow = true;
      tube.receiveShadow = true;

      this.snakesGroup.add(tube);

      tubesMeshes.push(tube);
    }

    return tubesMeshes;
  }

  getSegmentGeometries(tubularSegments, radiusSegments, radius = 0.35) {
    const key = `${tubularSegments}_${radiusSegments}_${radius}`;

    if(this.segmentGeometryCache[key]) {
      return this.segmentGeometryCache[key];
    }

    const straightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(0.5, 0, 0)
    ]);

    const straightGeometry = new THREE.TubeGeometry(straightCurve, tubularSegments, radius, radiusSegments, false);

    const curveCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.5, 0, 0),
      new THREE.Vector3(0.5, 0.5, 0)
    ]);

    const curveGeometry = new THREE.TubeGeometry(curveCurve, tubularSegments, radius, radiusSegments, false);

    this.segmentGeometryCache[key] = { straight: straightGeometry, curve: curveGeometry };

    return this.segmentGeometryCache[key];
  }

  createSnakeSegmentMeshes(snake, material, segmentsPositions) {
    const { radiusSegments, tubularSegments } = this.calculateSnakeGeometryQualityIndividual(snake);

    const gridFlat = segmentsPositions
      .map((segment, segIndex) => 
        segIndex === 0 
          ? segment.slice(2, -1)
          : segment.slice(1, -1)
      )
      .flat();

    const straightCount = gridFlat.filter(part => !this.isAngleDirection(part.direction)).length;
    const curveCount = gridFlat.filter(part => this.isAngleDirection(part.direction)).length;

    const segmentsMeshes = { straightMesh: null, curveMesh: null };

    const { straight, curve } = this.getSegmentGeometries(tubularSegments, radiusSegments);

    if(straightCount > 0) {
      segmentsMeshes.straightMesh = new THREE.InstancedMesh(straight, material, straightCount);
    }

    if(curveCount > 0) {
      segmentsMeshes.curveMesh = new THREE.InstancedMesh(curve, material, curveCount);
    }

    return segmentsMeshes;
  }

  resetSnakeSegmentCache() {
    if(this.segmentGeometryCache) {
      for(const k in this.segmentGeometryCache) {
        const segment = this.segmentGeometryCache[k];

        if(segment) {
          segment.straight.dispose();
          segment.curve.dispose();
        }
      }
    }

    this.segmentGeometryCache = {};
  }

  generateSnakeBodyMeshIndividual(segmentsPositions, snake, snakeMaterial) {
    const { straightMesh, curveMesh } = this.createSnakeSegmentMeshes(snake, snakeMaterial, segmentsPositions);

    let segmentIndex = 0;
    let straightIndex = 0;
    let curveIndex = 0;

    for(const segment of segmentsPositions) {
      for(let i = 1; i < segment.length - 1; i++) {
        // Skip the first position as it is drawn differently
        if(segmentIndex === 0 && i === 1) {
          continue;
        }

        const part = segment[i];
        const isAngle = this.isAngleDirection(part.direction);
        
        this.createSegmentMesh(isAngle ? curveIndex : straightIndex, part, straightMesh, curveMesh);

        if(isAngle) {
          curveIndex++;
        } else {
          straightIndex++;
        }
      }

      segmentIndex++;
    }
    
    return [straightMesh, curveMesh].filter(mesh => mesh != null);
  }

  createSnakeEyes(snake) {
    const group = new THREE.Group();
    const whiteMat = this.getMaterial({ color: 0xffffff });
    const blackMat = this.getMaterial({ color: 0x000000 });

    const eyeGeom = new THREE.SphereGeometry(0.07, 8, 8);
    const eye1 = new THREE.Mesh(eyeGeom, whiteMat);
    const eye2 = new THREE.Mesh(eyeGeom, whiteMat);

    eye1.position.set(0.18, 0.15, 0.3);
    eye2.position.set(-0.18, 0.15, 0.3);

    group.add(eye1, eye2);

    if(snake.gameOver) {
      const barGeom = new THREE.BoxGeometry(0.12, 0.04, 0.02);

      const zOffset = 0.07;

      const bar1a = new THREE.Mesh(barGeom, blackMat);
      const bar1b = new THREE.Mesh(barGeom, blackMat);
      bar1a.rotation.z = Math.PI / 4;
      bar1b.rotation.z = -Math.PI / 4;
      bar1a.position.copy(eye1.position).add(new THREE.Vector3(0, 0, zOffset));
      bar1b.position.copy(eye1.position).add(new THREE.Vector3(0, 0, zOffset));

      const bar2a = new THREE.Mesh(barGeom, blackMat);
      const bar2b = new THREE.Mesh(barGeom, blackMat);
      bar2a.rotation.z = Math.PI / 4;
      bar2b.rotation.z = -Math.PI / 4;
      bar2a.position.copy(eye2.position).add(new THREE.Vector3(0, 0, zOffset));
      bar2b.position.copy(eye2.position).add(new THREE.Vector3(0, 0, zOffset));

      group.add(bar1a, bar1b, bar2a, bar2b);
    } else {
      const pupilGeom = new THREE.SphereGeometry(0.045, 8, 8);
      const pupil1 = new THREE.Mesh(pupilGeom, blackMat);
      const pupil2 = new THREE.Mesh(pupilGeom, blackMat);

      pupil1.position.copy(eye1.position).add(new THREE.Vector3(0, 0.03, 0.03));
      pupil2.position.copy(eye2.position).add(new THREE.Vector3(0, 0.03, 0.03));

      group.add(pupil1, pupil2);
    }

    return group;
  }

  getSnakeMaterial(snake) {
    const baseColor = chroma(this.baseSnakeColor);
    const rotated = baseColor.set("hsl.h", (baseColor.get("hsl.h") + snake.color) % 360);
    const [r, g, b] = rotated.rgb();
    const snakeColor = new THREE.Color(r / 255, g / 255, b / 255);
    snakeColor.convertSRGBToLinear();

    return this.getMaterial({ color: snakeColor });
  }

  calculateSnakeGeometryQualityTubes(snake) {
    const normalizedLength = Math.min(snake.length() / this.qualitySettings.snakeSegments.maxLength, 1);

    const tubularSegments = Math.floor(this.qualitySettings.snakeSegments.minTubular + normalizedLength * (this.qualitySettings.snakeSegments.maxTubular - this.qualitySettings.snakeSegments.minTubular));
    const radiusSegments = Math.floor(this.qualitySettings.snakeSegments.minRadius + normalizedLength * (this.qualitySettings.snakeSegments.maxRadius - this.qualitySettings.snakeSegments.minRadius));

    return { tubularSegments, radiusSegments };
  }

  calculateSnakeGeometryQualityIndividual(snake) {
    const gridArea = this.grid.width * this.grid.height;
    const normalizedGrid = Math.min(gridArea / this.qualitySettings.snakeSegments.maxGridArea, 1);
    const normalizedLength = Math.min(
      snake.length() / this.qualitySettings.snakeSegments.maxLength,
      1
    );

    const rawFactor = (0.8 * normalizedGrid) + (0.2 * normalizedLength);
    const factor = Math.pow(rawFactor, 0.5);

    const snakeCount = this.snakes.length;

    const qualityScale = Math.max(1 / (1 + snakeCount / 5), 0.1);

    const { minTubular, maxTubular, minRadius, maxRadius } = this.qualitySettings.snakeSegments;

    const softMaxTubular = Math.min((maxTubular / 2) * qualityScale, 128);
    const softMaxRadius = Math.min((maxRadius / 2) * qualityScale, 64);

    const tubularSegmentsRaw = softMaxTubular - factor * (softMaxTubular - minTubular);
    const radiusSegmentsRaw = softMaxRadius - factor * (softMaxRadius - minRadius);

    const tubularSegments = Math.max(minTubular, Math.round(tubularSegmentsRaw / 16) * 16);
    const radiusSegments = Math.max(minRadius, Math.round(radiusSegmentsRaw / 8) * 8);

    return { tubularSegments, radiusSegments };
  }

  calculateCaseSize(availableHeight, availableWidth) {
    if(!this.camera || !this.width || !this.height) {
      return super.calculateCaseSize(availableHeight, availableWidth);
    }

    try {
      const depth = 0.5;

      const p0 = new THREE.Vector3(0, 0, depth);
      const p1 = new THREE.Vector3(1, 0, depth);
      const p2 = new THREE.Vector3(0, 1, depth);

      const projectToPixels = (v) => {
        const projected = v.clone().project(this.camera);
        const x = (projected.x + 1) / 2 * this.width;
        const y = (1 - projected.y) / 2 * this.height;
        return {
          x,
          y
        };
      };

      const pos0 = projectToPixels(p0);
      const pos1 = projectToPixels(p1);
      const pos2 = projectToPixels(p2);

      const caseWidth = Math.abs(pos1.x - pos0.x);
      const caseHeight = Math.abs(pos2.y - pos0.y);

      let caseSize = Math.min(caseWidth, caseHeight);
      const widthPercent = availableWidth / (caseSize * this.grid.width);
      const heightPercent = availableHeight / (caseSize * this.grid.height);

      const percent = Math.min(widthPercent, heightPercent);
      caseSize *= percent;

      return Math.floor(caseSize);
    } catch (e) {
      console.warn("Fallback calculate case size", e);
      return super.calculateCaseSize(availableHeight, availableWidth);
    }
  }

  gridPositionTo3DPosition(position) {
    const halfGridWidth = this.grid.width / 2;
    const halfGridHeight = this.grid.height / 2;

    const xPosition = position.x - halfGridWidth + 0.5;
    const yPosition = (this.grid.height - 1 - position.y) - halfGridHeight + 0.5;

    return {
      x: xPosition,
      y: yPosition
    };
  }

  getSnakeScreenPosition(snake, caseSize, offsetX, offsetY) {
    const snakeHead = snake.get(0);
    const snakeFirstSegment = snake.get(1);
    if(!snakeHead || !snakeFirstSegment) return { x: 0, y: 0};

    const shouldAnimateText = !this.disableAnimation && !snake.gameOver && !this.gameFinished && !this.gameOver;
    const pos3D = this.gridPositionTo3DPosition(shouldAnimateText ? snakeFirstSegment : snakeHead);

    const worldPos = new THREE.Vector3(
      pos3D.x - 0.5,
      pos3D.y + 0.5,
      0.5
    );

    if(shouldAnimateText) {
      let progress = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER);
      progress = Math.min(progress, 1);
      switch (snakeHead.direction) {
      case GameConstants.Direction.UP: worldPos.y += progress; break;
      case GameConstants.Direction.BOTTOM: worldPos.y -= progress; break;
      case GameConstants.Direction.RIGHT: worldPos.x += progress; break;
      case GameConstants.Direction.LEFT: worldPos.x -= progress; break;
      }
    }

    const vector = worldPos.clone().project(this.camera);

    const xInWebGL = (vector.x + 1) / 2 * this.width;
    const yInWebGL = (1 - vector.y) / 2 * this.height;

    const x = offsetX + xInWebGL;
    const y = offsetY + yInWebGL;

    return { x: Math.round(x), y: Math.round(y) };
  }

  cleanAfterGameExit() {
    if(this.scene) {
      this.disposeGroup(this.gridGroup);
      this.disposeGroup(this.snakesGroup);
      this.disposeGroup(this.fruitsGroup);

      this.resetSnakeSegmentCache();
      this.resetSnakeTransitionCache();

      this.fruitModel?.clear();
      this.fruitModelGold?.clear();
      this.fruitPointLight?.clear();
      this.fruitGoldPointLight?.clear();

      this.scene.remove(this.gridGroup, this.snakesGroup, this.fruitsGroup);

      this.gridGroup?.clear();
      this.snakesGroup?.clear();
      this.fruitsGroup?.clear();
    }

    this.snakesMeshes = [];

    this.ambientLight?.dispose();
    this.ambientLight?.clear();
    this.ambientLight = null;

    this.lightHelper?.dispose();
    this.lightHelper?.clear();
    this.lightHelper = null;

    this.dirLight?.dispose();
    this.dirLight?.clear();
    this.dirLight = null;

    this.cameraHelper?.dispose();
    this.cameraHelper?.clear();
    this.cameraHelper = null;

    this.camera?.clear();
    this.camera = null;

    this.cubeCamera?.clear();
    this.cubeCamera = null;

    this.cubeRenderTarget?.dispose();
    this.cubeRenderTarget = null;

    this.controls?.dispose();
    this.controls = null;

    this.scene?.clear();
    this.scene = null;

    this.renderer?.dispose();
    this.renderer = null;
  }

  set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode) {
    super.set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode);
  }
}