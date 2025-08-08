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

    this.qualitySettings = graphicType !== "3dCustom" || !customGraphicsPreset ? 
      this.getQualityPresetSettings(graphicType) :
      {
        ...this.getQualityPresetSettings(GameConstants.DefaultQualitySettings3D),
        ...this.resolveQualitySettings(customGraphicsPreset)
      };

    this.initThreeJS();

    this.is3DRendering = true;

    /**
     * TODO :
     * - Rotation animation (tail/head)
     * - Optimize Snake body generation when there are multiple parts (don't update not moving parts)
     * - Better graphical effects?
     * - Fix bug when crossing grids -> OK
     * - Draw eyes on the Snake head -> OK
     * - Fix animations/Snake drawing when the Snake cross the side of the grid -> OK
     * - Advanced quality settings -> OK
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
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);

    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(0, 0, 0);
  
    this.renderer = new THREE.WebGLRenderer({ antialias: this.qualitySettings.enableAntialiasing, alpha: true });

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
    this.snakesGroup = new THREE.Group();

    this.scene.add(this.gridGroup, this.snakesGroup);
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

      this.saveCurrentState(canvas);

      this.drawGrid(ctx, offsetX, offsetY, totalWidth, totalHeight, caseSize);

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

  drawGrid(ctx, offsetX, offsetY, totalWidth, totalHeight, caseSize) {
    this.renderer.render(this.scene, this.camera);

    Utils.drawImageData(ctx, this.renderer.domElement, offsetX, offsetY, totalWidth, totalHeight, 0, 0, totalWidth, totalHeight);

    if(this.snakes.length > 1) {
      this.drawSnakeInfos(ctx, offsetX, offsetY, caseSize, this.currentPlayer);
    }
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
  
  setupGrid() {
    if(this.forceRedraw || this.gridStateChanged) {
      this.clearGrid();

      const totalCells = this.grid.width * this.grid.height;
      const halfCells = Math.floor(totalCells / 2);

      const ground = this.constructGround();
      const wallInstancedMesh = this.constructWallMesh();
      const lightGrayCellInstancedMesh = this.constructLightGrayCell(totalCells, halfCells);
      const darkGrayCellInstancedMesh = this.constructDarkGrayCell(halfCells);

      this.gridGroup.add(ground, wallInstancedMesh, lightGrayCellInstancedMesh, darkGrayCellInstancedMesh);

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
            const { fruitModel, pointLight } = this.constructFruit(xPosition, yPosition, caseType);
            this.gridGroup.add(fruitModel, pointLight);
          }

          if(!Object.values(GameConstants.CaseType).includes(caseType)) {
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
            
              this.gridGroup.add(unknownModel);
            }
          }
        }
      }
    }
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
    if(!this.wallTexture) {
      const wallImage = this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/${GameUtils.getImageCase(GameConstants.CaseType.WALL)}`);
      this.wallTexture = new THREE.CanvasTexture(wallImage);
      this.wallTexture.colorSpace = THREE.SRGBColorSpace;
    }

    const wallGeometry = new THREE.BoxGeometry(1, 1, 1.5);
    const wallMaterial = this.getMaterial({ map: this.wallTexture, toneMapped: false });
    const wallInstancedMesh = new THREE.InstancedMesh(wallGeometry, wallMaterial, this.countWalls());
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

      const box = new THREE.Box3().setFromObject(this.fruitModel );

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
            roughnessMap: child.material.roughnessMap
          });
        }

        child.castShadow = true;
        child.receiveShadow = true;
      });
    }
  }

  setupGoldFruit() {
    if(this.fruitModelGold) {
      return;
    }

    this.fruitModelGold = this.modelLoader.get("fruit");

    if(this.fruitModel) {
      const fruitGoldColor = 0xFFD700;

      this.fruitGoldPointLight = new THREE.PointLight(fruitGoldColor, 0.8, 2);

      const box = new THREE.Box3().setFromObject(this.fruitModelGold);

      const size = new THREE.Vector3();
      box.getSize(size);

      this.fruitModelGold.scale.setScalar(0.8 / size.x);
      this.fruitModelGold.rotation.x = Math.PI / 2;

      this.fruitModelGold.traverse(child => {
        if(child.isMesh) {
          child.material = this.getMaterial({
            color: fruitGoldColor,
            metalness: 0.75,
            roughness: 0.2
          });
        }

        child.castShadow = true;
        child.receiveShadow = true;
      });
    }
  }

  constructFruit(xPosition, yPosition, caseType) {
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

      fruitModel.position.set(xPosition, yPosition, 0.5);

      return { fruitModel, pointLight };
    }
  }

  shouldUpdateSnakeBodyGeometry(snakeIndex, snake) {
    const shouldUpdateBasedOnTicks = this.oldTicks < this.ticks || this.oldTicks === undefined || (this.ticks === 0 && this.oldTicks !== 0);
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
    this.disposeMesh(meshes.headMesh);
    this.disposeMesh(meshes.tailMesh);
    this.disposeMesh(meshes.snakeMaterial);
    this.disposeGroup(meshes.eyesGroup);

    this.snakesGroup.remove(meshes.headMesh, meshes.tailMesh, meshes.eyesGroup);

    this.snakesMeshes[snakeIndex] = null;
  }

  updateSnakes() {
    for(let i = 0; i < this.snakes.length; i++) {
      this.updateSnake(i);
    }
    
    this.oldTicks = this.ticks;
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

    const headGeometry = this.generateHeadGeometry(snake);
    const tailGeometry = this.generateTailGeometry(snake);

    const headMesh = this.createSnakeMesh(headGeometry, snakeMaterial);
    const tailMesh = this.createSnakeMesh(tailGeometry, snakeMaterial);

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

  updateSnakeGeometry(snakeIndex, snake) {
    const snakeMaterial = this.snakesMeshes[snakeIndex].snakeMaterial;
    const segmentsPositions = this.calculateSnakeSegmentsPositions(snake);

    const snakeGeometry = this.generateSnakeBodyGeometry(segmentsPositions, snake, snakeMaterial);
    const snakeMesh = this.generateSnakeBodyMesh(snakeGeometry, snakeMaterial);

    this.snakesGroup.add(...snakeMesh);

    this.snakesMeshes[snakeIndex].bodyParts = snakeMesh;
  }

  animateSnakeHead(snakeIndex, snake) {
    this.animateSnake({
      snakeIndex,
      snake,
      mesh: this.snakesMeshes[snakeIndex].headMesh,
      from: snake.get(1),
      to: snake.getHeadPosition(),
      snakePart: 0,
      type: "head"
    });
  }

  animateSnakeTail(snakeIndex, snake) {
    this.animateSnake({
      snakeIndex,
      snake,
      mesh: this.snakesMeshes[snakeIndex].tailMesh,
      from: snake.getTailPosition(),
      to: snake.get(snake.length() - 2),
      snakePart: -1,
      type: "tail"
    });
  }

  animateSnake({ snake, mesh, from, to, snakePart, type }) {
    const fromDir = from.direction;
    const targetDir = to.direction;

    const fromPos = this.gridPositionTo3DPosition(from);
    const toPos = this.gridPositionTo3DPosition(to);

    const animationPercentage = this.calculateAnimationPercentage(snake, snakePart);

    const margin = this.getSnakeMargin(targetDir, type);

    this.handleSnakeGridCrossing(toPos, fromPos, snakePart);

    const fromVec = new THREE.Vector3(fromPos.x + margin.x, fromPos.y + margin.y, 0.3);
    const toVec = new THREE.Vector3(toPos.x + margin.x, toPos.y + margin.y, 0.3);

    const interpolated = new THREE.Vector3().lerpVectors(
      fromVec,
      toVec,
      animationPercentage
    );

    mesh.position.copy(interpolated);

    this.animateSnakeRotation(snake, snakePart, fromDir, targetDir, animationPercentage, mesh);
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

  animateSnakeRotation(snake, snakePart, fromDir, targetDir, animationPercentage, mesh) {
    const baseAngle = this.getRotationFromDirection(targetDir);

    let graphicDirection;

    if(snakePart == 0) {
      if(snake.length() > 1) {
        graphicDirection = snake.getGraphicDirection(1);
      } else {
        graphicDirection = snake.getGraphicDirection(0);
      }
    }

    if(fromDir !== targetDir && snakePart !== -1) {
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

  getSnakeMargin(direction, type) {
    const marginMap = {
      head: {
        [GameConstants.Direction.RIGHT]: { x: -0.2, y: 0 },
        [GameConstants.Direction.LEFT]:  { x:  0.2, y: 0 },
        [GameConstants.Direction.UP]:    { x:  0,   y: -0.2 },
        [GameConstants.Direction.DOWN]:  { x:  0,   y:  0.2 },
      },
      tail: {
        [GameConstants.Direction.RIGHT]: { x: -0.6, y: 0 },
        [GameConstants.Direction.LEFT]:  { x:  0.6, y: 0 },
        [GameConstants.Direction.UP]:    { x:  0,   y: -0.6 },
        [GameConstants.Direction.DOWN]:  { x:  0,   y:  0.6 },
      }
    };

    return marginMap[type]?.[direction] || { x: 0, y: 0 };
  }

  getRotationFromDirection(direction) {
    return {
      [GameConstants.Direction.RIGHT]: -Math.PI / 2,
      [GameConstants.Direction.LEFT]: Math.PI / 2,
      [GameConstants.Direction.DOWN]: Math.PI,
      [GameConstants.Direction.UP]: 0
    }[direction] ?? 0;
  }

  createSnakeMesh(snakeGeometry, material) {
    const mesh = new THREE.Mesh(snakeGeometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  calculateSnakeSegmentsPositions(snake) {
    const segments = [];
    let currentSegment = [];

    let previousPosition = null;

    for(let i = 0; i < snake.length(); i++) {
      const currentPosition = snake.get(i);
      const currentPosition3D = this.gridPositionTo3DPosition(currentPosition);

      const currentPositionVector = new THREE.Vector3(
        currentPosition3D.x,
        currentPosition3D.y,
        0.3
      );

      const direction = snake.get(i).direction;

      if(i === 0) {
        switch(direction) {
        case GameConstants.Direction.RIGHT: currentPositionVector.x -= 0.6; break;
        case GameConstants.Direction.LEFT:  currentPositionVector.x += 0.6; break;
        case GameConstants.Direction.BOTTOM: currentPositionVector.y += 0.6; break;
        case GameConstants.Direction.TOP:    currentPositionVector.y -= 0.6; break;
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

          const fakeEnd = previousPositionVector.clone().add(wrapOffset);
          const fakeStart = currentPositionVector.clone().sub(wrapOffset);

          currentSegment.push(fakeEnd);

          if(currentSegment.length >= 2) {
            segments.push(currentSegment);
          }

          currentSegment = [fakeStart];
        }
      }

      currentSegment.push(currentPositionVector);
      previousPosition = currentPosition;
    }

    if(currentSegment.length >= 2) {
      segments.push(currentSegment);
    }

    return segments;
  }

  generateSnakeBodyGeometry(segments, snake) {
    const tubesGeometries = [];

    for(const segment of segments) {
      const geometry = this.getSnakeBodyGeometry(snake, segment);
      tubesGeometries.push(geometry);
    }

    return tubesGeometries;
  }

  generateSnakeBodyMesh(tubesGeometries, material) {
    const tubesMeshes = [];

    for(const geometry of tubesGeometries) {
      const tube = new THREE.Mesh(geometry, material);
      tube.castShadow = true;
      tube.receiveShadow = true;

      this.snakesGroup.add(tube);

      tubesMeshes.push(tube);
    }

    return tubesMeshes;
  }

  generateHeadGeometry(snake) {
    const { radiusSegments } = this.calculateSnakeGeometryQuality(snake);
    return new THREE.CapsuleGeometry(0.35, 0.6, radiusSegments, 8);
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


  generateTailGeometry(snake) {
    const { radiusSegments } = this.calculateSnakeGeometryQuality(snake);
    return new THREE.CapsuleGeometry(0.35, 1, radiusSegments, 8);
  }

  getSnakeMaterial(snake) {
    const baseColor = chroma(this.baseSnakeColor);
    const rotated = baseColor.set("hsl.h", (baseColor.get("hsl.h") + snake.color) % 360);
    const [r, g, b] = rotated.rgb();
    const snakeColor = new THREE.Color(r / 255, g / 255, b / 255);
    snakeColor.convertSRGBToLinear();

    return this.getMaterial({ color: snakeColor });
  }

  getSnakeBodyGeometry(snake, points) {
    const { tubularSegments, radiusSegments } = this.calculateSnakeGeometryQuality(snake);

    const curve = new THREE.CatmullRomCurve3(points, false);
   
    return new THREE.TubeGeometry(curve, tubularSegments, 0.35, radiusSegments, false);
  }

  calculateSnakeGeometryQuality(snake) {
    const normalizedLength = Math.min(snake.length() / this.qualitySettings.snakeSegments.maxLength, 1);

    const tubularSegments = Math.floor(this.qualitySettings.snakeSegments.minTubular + normalizedLength * (this.qualitySettings.snakeSegments.maxTubular - this.qualitySettings.snakeSegments.minTubular));
    const radiusSegments = Math.floor(this.qualitySettings.snakeSegments.minRadius + normalizedLength * (this.qualitySettings.snakeSegments.maxRadius - this.qualitySettings.snakeSegments.minRadius));

    return { tubularSegments, radiusSegments };
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

  cleanAfterGameExit() {
    if(this.scene) {
      this.disposeGroup(this.gridGroup);
      this.disposeGroup(this.snakesGroup);

      this.fruitModel?.clear();
      this.fruitModelGold?.clear();

      this.scene.remove(this.gridGroup, this.snakesGroup);

      this.gridGroup?.clear();
      this.snakesGroup?.clear();
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