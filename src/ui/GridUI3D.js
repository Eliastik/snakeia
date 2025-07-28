/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
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

export default class GridUI3D extends GridUI {
  constructor(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode) {
    super(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode);

    this.initThreeJS();
  }

  initThreeJS() {
    this.isLightInit = false;
    this.isCameraInit = false;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);

    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(0, 0, 0);
  
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.gridGroup = new THREE.Group();

    this.scene.add(this.gridGroup);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 100;
    this.controls.maxPolarAngle = Math.PI / 2;
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

      this.saveCurrentState(canvas);

      this.renderer.render(this.scene, this.camera);

      Utils.drawImageData(ctx, this.renderer.domElement, offsetX, offsetY, totalWidth, totalHeight, 0, 0, totalWidth, totalHeight);
  
      ctx.restore();
    }
  }

  setupCameraAndSize() {
    if(!this.isCameraInit) {
      const fov = 30;
      const fovRadians = THREE.MathUtils.degToRad(fov);
      const distanceZ = (this.grid.height / 2) / Math.tan(fovRadians / 2);

      this.camera.fov = fov;
      this.camera.aspect = this.width / this.height;
      this.camera.position.set(0, 0, distanceZ * 1.05);
      this.camera.lookAt(0, 0, 0);
      this.camera.updateProjectionMatrix();

      this.isCameraInit = true;
    }

    this.renderer.setSize(this.width, this.height);

    this.controls.update();
  }

  setupLights() {
    if(!this.isLightInit) {
      const gridSize = Math.max(this.grid.width, this.grid.height) / 2;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(-gridSize, gridSize, 25);

      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;

      dirLight.shadow.camera.near = 1;
      dirLight.shadow.camera.far = 100;

      dirLight.shadow.camera.left = -gridSize;
      dirLight.shadow.camera.right = gridSize;
      dirLight.shadow.camera.top = gridSize;
      dirLight.shadow.camera.bottom = -gridSize;

      this.scene.add(ambientLight);
      this.scene.add(dirLight);

      // TODO: fix light in large grids (100x100)

      this.isLightInit = true;
    }
  }

  calculateCaseSize(availableHeight, availableWidth) {
    let caseSize = Math.min(availableHeight / this.grid.height, availableWidth / this.grid.width);

    const heightPercent = availableHeight / (caseSize * this.grid.height);
    const widthPercent = availableWidth / (caseSize * this.grid.width);
    const percent = Math.min(heightPercent, widthPercent);

    caseSize *= percent;
    
    return Math.floor(caseSize);
  }
  
  setupGrid() {
    // eslint-disable-next-line no-debugger
    debugger;
    if(this.forceRedraw || this.gridStateChanged) {
      this.gridGroup.clear();

      const ground = new THREE.Mesh(
        new THREE.BoxGeometry(this.grid.width, this.grid.height, 2),
        new THREE.MeshStandardMaterial({ color: 0x95a5a6 })
      );
      ground.receiveShadow = false;
      ground.position.set(0, 0, -1);

      this.gridGroup.add(ground);

      const wallImage = this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/${GameUtils.getImageCase(GameConstants.CaseType.WALL)}`);
      const wallTexture = new THREE.CanvasTexture(wallImage);
      wallTexture.colorSpace = THREE.SRGBColorSpace;

      const wallGeometry = new THREE.BoxGeometry(1, 1, 1.5);
      const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture, toneMapped: false });
      const wallInstancedMesh = new THREE.InstancedMesh(wallGeometry, wallMaterial, this.countWalls());
      wallInstancedMesh.receiveShadow = true;
      wallInstancedMesh.castShadow = true;

      const totalCells = this.grid.width * this.grid.height;
      const halfCells = Math.floor(totalCells / 2);

      const lightGrayCellGeometry = new THREE.BoxGeometry(1, 1, 0.1);
      const lightGrayCellMaterial = new THREE.MeshStandardMaterial({ color: 0x95a5a6 });
      const lightGrayCellInstancedMesh = new THREE.InstancedMesh(lightGrayCellGeometry, lightGrayCellMaterial, totalCells % 2 === 0 ? halfCells : halfCells + 1);
      lightGrayCellInstancedMesh.receiveShadow = true;
      lightGrayCellInstancedMesh.castShadow = false;

      const darkGrayCellGeometry = new THREE.BoxGeometry(1, 1, 0.1);
      const darkGrayCellMaterial = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
      const darkGrayCellInstancedMesh = new THREE.InstancedMesh(darkGrayCellGeometry, darkGrayCellMaterial, halfCells);
      darkGrayCellInstancedMesh.receiveShadow = true;
      darkGrayCellInstancedMesh.castShadow = false;

      this.gridGroup.add(wallInstancedMesh, lightGrayCellInstancedMesh, darkGrayCellInstancedMesh);

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
            const fruitModel = this.modelLoader.get("fruit");

            if(fruitModel) {
              const pointLight = new THREE.PointLight(0xff1100, 0.8, 2);
              pointLight.position.set(xPosition, yPosition, 0.5);

              const box = new THREE.Box3().setFromObject(fruitModel);
              
              const size = new THREE.Vector3();
              box.getSize(size);

              fruitModel.scale.setScalar(0.8 / size.x);
              fruitModel.position.set(xPosition, yPosition, 0.5);
              fruitModel.rotation.x = Math.PI / 2;

              fruitModel.traverse(child => {
                if(child.isMesh) {
                  if(caseType === GameConstants.CaseType.FRUIT_GOLD) {
                    child.material = new THREE.MeshStandardMaterial({
                      color: 0xFFD700,
                      metalness: 0.75,
                      roughness: 0.2,
                    });
                  }
                  
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });

              this.gridGroup.add(fruitModel);
              this.gridGroup.add(pointLight);
            }
          }
        }
      }
    }
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

  setupSnakes() {
    // TODO
  }

  set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode) {
    super.set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode);
  }
}