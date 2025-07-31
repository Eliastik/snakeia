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
import GridUI from "./GridUI";
import GameConstants from "../engine/Constants";
import GameUtils from "../engine/GameUtils";
import Position from "../engine/Position";
import { Utils } from "jsgametools";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import chroma from "chroma-js";

const defaultQualitySettings = {
  enableShadows: true,
  enableAntialiasing: true,
  shadowResolution: 4096,
  minSnakeTubularSegments: 2,
  maxSnakeTubularSegments: 512,
  minSnakeRadiusSegments: 2,
  maxSnakeRadiusSegments: 128,
  maxSnakeLengthForMaxDetail: 50
};

export default class GridUI3D extends GridUI {
  constructor(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, modelLoader, currentPlayer, graphicType) {
    super(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, modelLoader, currentPlayer);

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

    this.qualitySettings = {
      ...defaultQualitySettings,
      ...this.getQualityPresetSettings(graphicType)
    };

    this.initThreeJS();
  }

  getQualityPresetSettings(graphicType) {
    switch(graphicType) {
    case "3dMinimal":
      return {
        enableShadows: false,
        enableAntialiasing: false
      };
    case "3dLow":
      return {
        enableShadows: true,
        enableAntialiasing: false,
        shadowResolution: 512
      };
    case "3dNormal":
      return {
        enableShadows: true,
        enableAntialiasing: true,
        shadowResolution: 1024
      };
    case "3dMedium":
      return {
        enableShadows: true,
        enableAntialiasing: true,
        shadowResolution: 2048
      };
    case "3dHigh":
      return {
        enableShadows: true,
        enableAntialiasing: true,
        shadowResolution: 4096
      };
    }
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
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.gridGroup = new THREE.Group();
    this.snakesGroup = new THREE.Group();

    this.scene.add(this.gridGroup, this.snakesGroup);
  }

  setupControls(canvas) {
    if(!this.areControlsInit) {
      this.controls = new OrbitControls(this.camera, canvas);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.1;
      this.controls.screenSpacePanning = false;
      this.controls.minDistance = 0;
      this.controls.maxDistance = 500;
      this.controls.maxPolarAngle = Math.PI / 2;

      this.scene.add(this.controls);

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

      this.setupLights();

      this.setupCameraAndSize();
  
      this.setupGrid();

      this.updateSnakes(caseSize, canvas, totalWidth, offsetY);

      this.saveCurrentState(canvas);

      this.drawGrid(ctx, offsetX, offsetY, totalWidth, totalHeight, caseSize);
  
      ctx.restore();
    }
  }

  drawGrid(ctx, offsetX, offsetY, totalWidth, totalHeight, caseSize) {
    this.renderer.render(this.scene, this.camera);

    Utils.drawImageData(ctx, this.renderer.domElement, offsetX, offsetY, totalWidth, totalHeight, 0, 0, totalWidth, totalHeight);

    if (this.snakes.length > 1) {
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

      this.renderer.setSize(this.width, this.height);

      this.isCameraInit = true;
    }
  }

  setupLights() {
    if(!this.isLightInit) {
      const gridSize = Math.max(this.grid.width, this.grid.height);
      const halfGrid = gridSize / 2;
      const padding = 2;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(-halfGrid * 0.5, halfGrid * 0.5, halfGrid * 2);
      dirLight.target.position.set(0, 0, 0);

      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = this.qualitySettings.shadowResolution;
      dirLight.shadow.mapSize.height = this.qualitySettings.shadowResolution;

      dirLight.shadow.camera.near = 1;
      dirLight.shadow.camera.far = 100;

      dirLight.shadow.camera.left = -halfGrid - padding;
      dirLight.shadow.camera.right = halfGrid + padding;
      dirLight.shadow.camera.top = halfGrid + padding;
      dirLight.shadow.camera.bottom = -halfGrid - padding;

      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = halfGrid * 4;

      this.scene.add(ambientLight);
      this.scene.add(dirLight);

      this.isLightInit = true;
    }
  }
  
  setupGrid() {
    if(this.forceRedraw || this.gridStateChanged) {
      this.gridGroup.clear();

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
        }
      }
    }
  }

  constructGround() {
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(this.grid.width, this.grid.height, 2),
      new THREE.MeshStandardMaterial({ color: 0x95a5a6 })
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
    const wallImage = this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/${GameUtils.getImageCase(GameConstants.CaseType.WALL)}`);
    const wallTexture = new THREE.CanvasTexture(wallImage);
    wallTexture.colorSpace = THREE.SRGBColorSpace;

    const wallGeometry = new THREE.BoxGeometry(1, 1, 1.5);
    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture, toneMapped: false });
    const wallInstancedMesh = new THREE.InstancedMesh(wallGeometry, wallMaterial, this.countWalls());
    wallInstancedMesh.receiveShadow = true;
    wallInstancedMesh.castShadow = true;
    return wallInstancedMesh;
  }

  constructLightGrayCell(totalCells, halfCells) {
    const lightGrayCellGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const lightGrayCellMaterial = new THREE.MeshStandardMaterial({ color: 0x95a5a6 });
    const lightGrayCellInstancedMesh = new THREE.InstancedMesh(lightGrayCellGeometry, lightGrayCellMaterial, totalCells % 2 === 0 ? halfCells : halfCells + 1);
    lightGrayCellInstancedMesh.receiveShadow = true;
    lightGrayCellInstancedMesh.castShadow = false;
    return lightGrayCellInstancedMesh;
  }

  constructDarkGrayCell(halfCells) {
    const darkGrayCellGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const darkGrayCellMaterial = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    const darkGrayCellInstancedMesh = new THREE.InstancedMesh(darkGrayCellGeometry, darkGrayCellMaterial, halfCells);
    darkGrayCellInstancedMesh.receiveShadow = true;
    darkGrayCellInstancedMesh.castShadow = false;
    return darkGrayCellInstancedMesh;
  }

  constructFruit(xPosition, yPosition, caseType) {
    const fruitModel = this.modelLoader.get("fruit");

    if (fruitModel) {
      const isGoldFruit = caseType === GameConstants.CaseType.FRUIT_GOLD;
      const fruitColor = isGoldFruit ? 0xFFD700 : 0xff1100;

      const pointLight = new THREE.PointLight(fruitColor, 0.8, 2);
      pointLight.position.set(xPosition, yPosition, 0.5);

      const box = new THREE.Box3().setFromObject(fruitModel);

      const size = new THREE.Vector3();
      box.getSize(size);

      fruitModel.scale.setScalar(0.8 / size.x);
      fruitModel.position.set(xPosition, yPosition, 0.5);
      fruitModel.rotation.x = Math.PI / 2;

      fruitModel.traverse(child => {
        if(child.isMesh) {
          if(isGoldFruit) {
            child.material = new THREE.MeshStandardMaterial({
              color: fruitColor,
              metalness: 0.75,
              roughness: 0.2,
            });
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      return { fruitModel, pointLight };
    }
  }

  shouldUpdateSnakes() {
    return this.oldTicks < this.ticks || this.oldTicks === undefined || (this.ticks === 0 && this.oldTicks !== 0);
  }

  updateSnakes(caseSize, canvas, totalWidth, offsetY) {
    if(!this.shouldUpdateSnakes()) {
      return;
    }

    this.oldTicks = this.ticks;

    this.snakesMeshes.forEach(({ mesh, snakeIndex }) => {
      if(this.snakes[snakeIndex] && !this.snakes[snakeIndex].gameOver) {
        if(mesh.geometry) mesh.geometry.dispose();

        if(mesh.material) {
          if(Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }

        this.snakesGroup.remove(mesh);
      }
    });

    for(let i = 0; i < this.snakes.length; i++) {
      const snake = this.snakes[i];

      if(snake.gameOver) {
        continue;
      }

      if(snake.color != undefined) {
        // TODO color
      }

      const points = [];

      for(let i = 0; i < snake.length(); i++) {
        const meshInfo = this.getSnakePart3DPosition(i, snake, caseSize, totalWidth, offsetY, canvas);

        if(meshInfo) {
          const { x, y, z } = meshInfo.position;
          points.push(new THREE.Vector3(x, y, z));
        }
      }

      if(points.length >= 2) {
        const geometry = this.getSnakeGeometry(snake, points);
        const material = this.getSnakeMaterial(snake);

        const tube = new THREE.Mesh(geometry, material);
        tube.castShadow = true;
        tube.receiveShadow = true;

        this.snakesGroup.add(tube);
        this.snakesMeshes[i] = { mesh: tube, snakeIndex: i };
      }
    }
  }

  getSnakeMaterial(snake) {
    const baseColor = chroma(this.baseSnakeColor);
    const rotated = baseColor.set("hsl.h", (baseColor.get("hsl.h") + snake.color) % 360);
    const [r, g, b] = rotated.rgb();
    const snakeColor = new THREE.Color(r / 255, g / 255, b / 255);
    snakeColor.convertSRGBToLinear();

    return new THREE.MeshStandardMaterial({ color: snakeColor });
  }

  getSnakeGeometry(snake, points) {
    const normalizedLength = Math.min(snake.length() / this.qualitySettings.maxSnakeLengthForMaxDetail, 1);

    const tubularSegments = Math.floor(this.qualitySettings.minSnakeTubularSegments + normalizedLength * (this.qualitySettings.maxSnakeTubularSegments - this.qualitySettings.minSnakeTubularSegments));
    const radiusSegments = Math.floor(this.qualitySettings.minSnakeRadiusSegments + normalizedLength * (this.qualitySettings.maxSnakeRadiusSegments - this.qualitySettings.minSnakeRadiusSegments));

    const curve = new THREE.CatmullRomCurve3(points, false);
   
    return new THREE.TubeGeometry(curve, tubularSegments, 0.35, radiusSegments, false);
  }

  getSnakePart3DPosition(partNumber, snake, caseSize, totalWidth, offsetY, canvas) {
    let position;

    if(partNumber === -1) {
      position = snake.getTailPosition();
    } else {
      position = snake.get(partNumber);
    }

    const direction = this.getSnakeDirection(snake, partNumber, position);

    const { animationPercentage, currentPosition } = this.calculateSnakeAnimation(snake, partNumber, position, direction);

    /*const { finalCaseX, finalCaseY } = this.calculateCasePositionWithAnimation(
      animationPercentage, currentPosition, caseSize, canvas, totalWidth, offsetY
    );*/

    const gridX = currentPosition.x;
    const gridY = currentPosition.y;

    const halfGridWidth = this.grid.width / 2;
    const halfGridHeight = this.grid.height / 2;

    const xPosition = gridX - halfGridWidth + 0.5;
    const yPosition = (this.grid.height - 1 - gridY) - halfGridHeight + 0.5;

    return {
      position: {
        x: xPosition,
        y: yPosition,
        z: 0.3
      }
    };
  }

  set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode) {
    super.set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode);
  }
}