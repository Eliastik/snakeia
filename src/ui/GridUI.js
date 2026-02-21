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
import GameConstants from "../engine/Constants";
import GameUtils from "../engine/GameUtils";
import { Component, Utils, EasingFunctions } from "jsgametools";
import i18next from "i18next";
import Position from "../engine/Position";

export default class GridUI extends Component {
  constructor(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, modelLoader, currentPlayer, debugMode) {
    super();

    this.snakes = snakes;
    this.grid = grid;
    this.speed = speed;
    this.disableAnimation = disableAnimation;
    this.isFilterHueAvailable = isFilterHueAvailable;
    this.headerHeight = headerHeight;
    this.imageLoader = imageLoader;
    this.modelLoader = modelLoader;
    this.graphicSkin = graphicSkin;
    this.currentPlayer = currentPlayer;
    this.offsetFrame = 0;

    this.canvasSnakes = document.createElement("canvas");
    this.canvasGrid = document.createElement("canvas");
    this.fontSize = GameConstants.Setting.FONT_SIZE;

    this.forceRedraw = true;
    this.oldGridState = null;
    this.oldSnakesState = null;
    this.oldWidth = 0;
    this.oldHeight = 0;

    this.baseSnakeColor = "#a0c432";
    this.is3DRendering = false;

    this.setDebugMode(debugMode);
  }

  draw(context) {
    if(this.grid && this.grid.grid) {
      super.draw(context);

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
        
      this.drawGrid(ctx, caseSize, totalWidth, offsetX, offsetY);
  
      this.drawSnakes(ctx, caseSize, offsetX, offsetY, totalWidth, this.currentPlayer);

      this.saveCurrentState(canvas);
  
      ctx.restore();
    }
  }

  saveCurrentState(canvas) {
    this.forceRedraw = false;
    this.oldGridState = JSON.parse(JSON.stringify(this.grid.grid));
    this.oldWidth = canvas.width;
    this.oldHeight = canvas.height;
    this.oldSnakesState = [];

    for(const snake of this.snakes) {
      this.oldSnakesState.push({
        tail: snake.getTailPosition(),
        head: snake.getHeadPosition(),
        firstPosition: snake.get(1),
        length: snake.length(),
        gameOver: snake.gameOver,
        color: snake.color
      });
    }
  }

  resetState() {
    this.forceRedraw = true;
  }

  calculateCaseSize(availableHeight, availableWidth) {
    let caseSize = Math.min(availableHeight / this.grid.height, availableWidth / this.grid.width);

    const heightPercent = availableHeight / (caseSize * this.grid.height);
    const widthPercent = availableWidth / (caseSize * this.grid.width);
    const percent = Math.min(heightPercent, widthPercent);

    caseSize *= percent;
    
    return Math.floor(caseSize);
  }

  get gridStateChanged() {
    if(!this.oldGridState
      || this.oldGridState.length != this.grid.height
      || this.oldGridState[0].length != this.grid.width) {
      return true;
    }

    for(let i = 0; i < this.grid.height; i++) {
      for(let j = 0; j < this.grid.width; j++) {
        const currentPosition = new Position(j, i);

        const oldGridValue = GameUtils.getImageCase(this.oldGridState[i][j]);
        const newGridValue = this.grid.getImageCase(currentPosition);

        if(oldGridValue !== newGridValue) {
          return true;
        }
      }
    }

    return false;
  }
  
  drawGrid(ctx, caseSize, totalWidth, offsetX, offsetY) {
    const canvasGrid = this.canvasGrid;
    const ctxGrid = canvasGrid.getContext("2d");

    if(this.forceRedraw || this.gridStateChanged) {
      canvasGrid.width = ctx.canvas.width;
      canvasGrid.height = ctx.canvas.height;
      
      ctxGrid.clearRect(0, 0, canvasGrid.width, canvasGrid.height);

      for(let i = 0; i < this.grid.height; i++) {
        for(let j = 0; j < this.grid.width; j++) {
          const caseX = offsetX + j * caseSize;
          const caseY = offsetY + i * caseSize;
  
          if(i == 0 && j == 0) {
            this.x = caseX;
            this.y = caseY;
          }
  
          if((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
            ctxGrid.fillStyle = "rgba(127, 140, 141, 0.75)";
          } else {
            ctxGrid.fillStyle = "rgba(44, 62, 80, 0.75)";
          }
  
          ctxGrid.fillRect(caseX, caseY, caseSize, caseSize);
          Utils.drawImage(ctxGrid,
            this.imageLoader.get(`assets/images/skin/${this.graphicSkin}/${this.grid.getImageCase(new Position(j, i))}`,
              caseSize,
              Math.round(caseSize)),
            Math.round(caseX),
            Math.round(caseY),
            Math.round(caseSize),
            Math.round(caseSize));
        }
      }
    }

    Utils.drawImageData(ctx, canvasGrid, offsetX, offsetY, totalWidth, Math.round(caseSize * this.grid.height), offsetX, offsetY, totalWidth, Math.round(caseSize * this.grid.height));
  }

  snakeStateHasChanged() {
    for(let i = 0; i < this.snakes.length; i++) {
      if(this.individualSnakeStateHasChanged(i)) {
        return true;
      }
    }

    return false;
  }

  individualSnakeStateHasChanged(snakeIndex) {
    const width = this.grid.width;
    const height = this.grid.height;

    const snake = this.snakes[snakeIndex];
    const oldState = this.oldSnakesState && this.oldSnakesState[snakeIndex];

    if(oldState) {
      const currentLength = snake.length();
      const currentTail = snake.getTailPosition();
      const currentHead = snake.getHeadPosition();
      const currentFirstPosition = snake.get(1);

      if(!snake.lastTail || currentLength > oldState.length) {
        return true;
      }

      const wrappedDistance = (current, old, max) =>
        Math.min(Math.abs(current - old), max - Math.abs(current - old));

      if(wrappedDistance(currentHead.x, oldState.head.x, width) > 1 ||
        wrappedDistance(currentHead.y, oldState.head.y, height) > 1 ||
        wrappedDistance(currentTail.x, oldState.tail.x, width) > 1 ||
        wrappedDistance(currentTail.y, oldState.tail.y, height) > 1 ||
        wrappedDistance(currentFirstPosition.x, oldState.firstPosition.x, width) > 1 ||
        wrappedDistance(currentFirstPosition.y, oldState.firstPosition.y, height) > 1) {
        return true;
      }
    }

    return false;
  }

  drawSnakes(ctx, caseSize, offsetX, offsetY, totalWidth, currentPlayer) {
    if(this.snakes != null) {
      const canvasSnake = this.canvasSnakes;
      const ctxTmp = canvasSnake.getContext("2d");

      // Differential Snake rendering is enabled only when in maze mode
      const snakeStateChanged = !this.grid.maze || this.graphicSkin === "pixel" || this.onlineMode || this.snakeStateHasChanged();

      if(this.forceRedraw || snakeStateChanged) {
        canvasSnake.width = ctx.canvas.width;
        canvasSnake.height = ctx.canvas.height;
  
        ctxTmp.clearRect(0, 0, canvasSnake.width, canvasSnake.height);
      }
    
      if(this.forceRedraw || snakeStateChanged) {
        // Full redraw
        for(const snake of this.snakes) {
          this.fullSnakeRendering(snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
        }
      } else {
        // Differential redraw
        // Draw the tail, first body part and then head
        [-1, 1, 0].forEach(part => {
          for(const snake of this.snakes) {
            if(snake.length() > part) {
              this.differentialSnakeRendering(snake, part, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
            }
          }
        });
      }

      Utils.drawImageData(ctx, canvasSnake, offsetX, offsetY, totalWidth, Math.round(caseSize * this.grid.height), offsetX, offsetY, totalWidth, Math.round(caseSize * this.grid.height));

      if(this.snakes.length > 1) {
        this.drawSnakeInfos(ctx, offsetX, offsetY, caseSize, currentPlayer);
      }
    }
  }

  fullSnakeRendering(snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp) {
    for(let i = snake.length() - 1; (i >= -1 && snake.length() > 1) || i >= 0; i--) { // -1 == tail
      this.drawSnakePart(i, snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
    }
  }

  differentialSnakeRendering(snake, part, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp) {
    if(part === -1 && !snake.gameOver && snake.lastTailMoved) {
      this.eraseTail(snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
    }

    if(part === 0 && snake.gameOver) {
      this.eraseHead(snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
    }

    // Redraw only the head, tail and case below head
    this.drawSnakePart(part, snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
  }

  eraseTail(snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp) {
    const lastTailPos = snake.lastTail;
    const animationPercentage = this.calculateAnimationPercentage(snake, -1);

    this.clearCase(lastTailPos, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
    this.clearCase(lastTailPos, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp, animationPercentage);
  }

  eraseHead(snake, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp) {
    const headPosition = snake.getHeadPosition();
    this.clearCase(headPosition, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp);
  }

  clearCase(position, caseSize, canvasSnake, totalWidth, offsetY, ctxTmp, animationPercentage = 1) {
    if(position) {
      const { finalCaseX, finalCaseY } = this.calculateCasePositionWithAnimation(animationPercentage, position, caseSize,
        canvasSnake, totalWidth, offsetY);

      ctxTmp.clearRect(Math.round(finalCaseX), Math.round(finalCaseY), Math.round(caseSize), Math.round(caseSize));
    }
  }

  calculateCasePositionWithAnimation(animationPercentage = 1, currentPosition, caseSize, canvas, totalWidth, offsetY) {
    const animationOffset = (caseSize * animationPercentage) - caseSize;

    let finalCaseX = Math.floor(currentPosition.x * caseSize + ((canvas.width - totalWidth) / 2));
    let finalCaseY = offsetY + currentPosition.y * caseSize;

    switch(currentPosition.direction) {
    case GameConstants.Direction.UP:
      finalCaseY -= animationOffset;
      break;
    case GameConstants.Direction.BOTTOM:
      finalCaseY += animationOffset;
      break;
    case GameConstants.Direction.RIGHT:
      finalCaseX += animationOffset;
      break;
    case GameConstants.Direction.LEFT:
      finalCaseX -= animationOffset;
      break;
    }

    return { finalCaseX, finalCaseY };
  }

  drawSnakePart(partNumber, snake, caseSize, canvas, totalWidth, offsetY, ctxTmp) {
    if(snake.color != undefined) {
      ctxTmp.filter = "hue-rotate(" + snake.color + "deg)";
    }

    let position;

    if(partNumber == -1) { // Tail
      position = snake.getTailPosition();
    } else {
      position = snake.get(partNumber);
    }

    const direction = this.getSnakeDirection(snake, partNumber, position);

    // Animation
    const { angle, eraseBelow, animationPercentage, currentPosition } = this.calculateSnakeAnimation(snake, partNumber, position, direction);

    const { finalCaseX, finalCaseY } = this.calculateCasePositionWithAnimation(animationPercentage, currentPosition, caseSize,
      canvas, totalWidth, offsetY);

    let imageLoc = "";

    if(partNumber == 0) {
      imageLoc = this.getSnakeHeadImage(snake, direction, imageLoc);
    } else if(partNumber == -1) {
      imageLoc = this.getSnakeTailImage(direction, imageLoc);
    } else {
      imageLoc = this.getSnakeBodyImage(direction, imageLoc);
    }

    Utils.drawImage(ctxTmp, this.imageLoader.get(imageLoc, Math.round(caseSize), Math.round(caseSize)), Math.round(finalCaseX), Math.round(finalCaseY), Math.round(caseSize), Math.round(caseSize), null, null, null, null, eraseBelow, Math.round(angle));

    ctxTmp.filter = "none";
  }

  shouldDisplaySnakeAnimation(snake, partNumber) {
    const animationDisabled = this.disableAnimation;
    const isHead = partNumber == 0;
    const isTailAndShouldAnimateTail = partNumber == -1 && snake.lastTailMoved;
    const snakeIsScoreMax = snake.scoreMax;
    const gameNotFinished = !this.gameFinished && !this.gameOver;
    const snakeIsGameOver = snake.gameOver;
    const ticksDeadAnimation = this.ticks < snake.ticksDead + 2;

    return !animationDisabled &&
      (isHead || isTailAndShouldAnimateTail) &&
      (!snakeIsScoreMax && (gameNotFinished || snakeIsGameOver)) &&
      (!snakeIsGameOver || (snakeIsGameOver && ticksDeadAnimation));
  }

  calculateAnimationPercentage(snake, partNumber) {
    if(!this.shouldDisplaySnakeAnimation(snake, partNumber)) {
      return 1;
    }

    let offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER); // Percentage of the animation

    if(snake.gameOver && snake.ticksDead) {
      if(this.ticks <= snake.ticksDead) {
        offset = 1 - offset; // Dead animation
        offset = EasingFunctions.easeInCubic(offset);
      } else {
        offset = EasingFunctions.easeOutBounce(offset);
      }
    }

    return Math.max(0, Math.min(1, offset));
  }

  calculateSnakeAnimation(snake, partNumber, position, direction) {
    let eraseBelow = true;
    let angle = 0;
    let animationPercentage = 1;
    let currentPosition = position;

    if(this.shouldDisplaySnakeAnimation(snake, partNumber)) {
      animationPercentage = this.calculateAnimationPercentage(snake, partNumber);

      let graphicDirection;

      if(partNumber == 0) {
        if(snake.length() > 1) {
          graphicDirection = snake.getGraphicDirection(1);
        } else {
          graphicDirection = snake.getGraphicDirection(0);
        }
      } else if(partNumber == -1) {
        graphicDirection = snake.getGraphicDirectionFor(snake.getTailPosition(), snake.lastTail, snake.get(snake.length() - 2));
      }

      if(partNumber == -1 && snake.length() > 1) {
        currentPosition = snake.getTailPosition();
      }

      if((partNumber == 0 || partNumber == -1) && this.isAngleDirection(graphicDirection)) {
        angle = this.calculateAnimationAngle(partNumber, animationPercentage, graphicDirection, direction);
        eraseBelow = false;
      }
    }

    return { angle, eraseBelow, animationPercentage, currentPosition };
  }

  calculateAnimationAngle(partNumber, offset, graphicDirection, direction) {
    let angle = 0;

    if(partNumber == 0) {
      angle = -90;
    }

    if(partNumber == 0) {
      angle += -128.073 * Math.pow(offset, 2) + 222.332 * offset - 5.47066; // Interpolated rotation animation
    } else if(partNumber == -1) {
      angle += 126.896 * Math.pow(offset, 2) + -33.6471 * offset + 1.65942; // Interpolated rotation animation tail
    }

    if (partNumber == 0 && ((graphicDirection == GameConstants.Direction.ANGLE_4 && direction == GameConstants.Direction.UP) || (graphicDirection == GameConstants.Direction.ANGLE_1 && direction == GameConstants.Direction.LEFT) || (graphicDirection == GameConstants.Direction.ANGLE_2 && direction == GameConstants.Direction.BOTTOM) || (graphicDirection == GameConstants.Direction.ANGLE_3 && direction == GameConstants.Direction.RIGHT))) {
      angle = -angle;
    } else if (partNumber == -1 && ((graphicDirection == GameConstants.Direction.ANGLE_4 && direction == GameConstants.Direction.RIGHT) || (graphicDirection == GameConstants.Direction.ANGLE_3 && direction == GameConstants.Direction.BOTTOM) || (graphicDirection == GameConstants.Direction.ANGLE_1 && direction == GameConstants.Direction.UP) || (graphicDirection == GameConstants.Direction.ANGLE_2 && direction == GameConstants.Direction.LEFT))) {
      angle = -angle;
    }

    return angle;
  }

  getSnakeDirection(snake, partNumber, position) {
    if(partNumber == 0) { // Head
      return snake.getHeadPosition().direction;
    } else if(partNumber == -1) { // Tail
      if(!this.disableAnimation && !snake.gameOver && !snake.scoreMax && !this.gameFinished && snake.lastTailMoved) {
        return snake.getTailPosition().direction;
      } else {
        return snake.get(snake.length() - 2).direction;
      }
    } else if(partNumber == snake.length() - 1) {
      return snake.getGraphicDirectionFor(position, snake.get(partNumber - 1), snake.lastTail);
    }
    
    return snake.getGraphicDirection(partNumber);
  }

  isAngleDirection(direction) {
    const angleDirections = [GameConstants.Direction.ANGLE_1, GameConstants.Direction.ANGLE_2, GameConstants.Direction.ANGLE_3, GameConstants.Direction.ANGLE_4];
    return angleDirections.includes(direction);
  }

  getSnakeHeadImage(snake, direction, imageLoc) {
    if(snake.gameOver && !snake.scoreMax) {
      switch(direction) {
      case GameConstants.Direction.BOTTOM:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead.png";
        break;
      case GameConstants.Direction.RIGHT:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead_2.png";
        break;
      case GameConstants.Direction.UP:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead_3.png";
        break;
      case GameConstants.Direction.LEFT:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_dead_4.png";
        break;
      }
    } else {
      switch(direction) {
      case GameConstants.Direction.BOTTOM:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake.png";
        break;
      case GameConstants.Direction.RIGHT:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_2.png";
        break;
      case GameConstants.Direction.UP:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_3.png";
        break;
      case GameConstants.Direction.LEFT:
        imageLoc = "assets/images/skin/" + this.graphicSkin + "/snake_4.png";
        break;
      }
    }
    return imageLoc;
  }

  getSnakeTailImage(direction, imageLoc) {
    switch (direction) {
    case GameConstants.Direction.BOTTOM:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_end.png";
      break;
    case GameConstants.Direction.RIGHT:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_2_end.png";
      break;
    case GameConstants.Direction.UP:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_3_end.png";
      break;
    case GameConstants.Direction.LEFT:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_4_end.png";
      break;
    }
    return imageLoc;
  }

  getSnakeBodyImage(direction, imageLoc) {
    switch(direction) {
    case GameConstants.Direction.UP:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body.png";
      break;
    case GameConstants.Direction.BOTTOM:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body.png";
      break;
    case GameConstants.Direction.RIGHT:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_2.png";
      break;
    case GameConstants.Direction.LEFT:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_2.png";
      break;
    case GameConstants.Direction.ANGLE_1:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_1.png";
      break;
    case GameConstants.Direction.ANGLE_2:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_2.png";
      break;
    case GameConstants.Direction.ANGLE_3:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_3.png";
      break;
    case GameConstants.Direction.ANGLE_4:
      imageLoc = "assets/images/skin/" + this.graphicSkin + "/body_angle_4.png";
      break;
    }
    return imageLoc;
  }

  getSnakeScreenPosition(snake, caseSize, offsetX, offsetY) {
    const head = snake.get(0);
    if(!head) return { x: 0, y: 0};

    let caseX = Math.floor(head.x * caseSize + offsetX);
    let caseY = Math.floor(head.y * caseSize + offsetY);

    if(!this.disableAnimation && !snake.gameOver && !this.gameFinished && !this.gameOver) {
      let progress = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER);
      progress = Math.min(progress, 1);

      const animOffset = (caseSize * progress) - caseSize;

      switch(head.direction) {
      case GameConstants.Direction.UP: caseY -= animOffset; break;
      case GameConstants.Direction.BOTTOM: caseY += animOffset; break;
      case GameConstants.Direction.RIGHT: caseX += animOffset; break;
      case GameConstants.Direction.LEFT: caseX -= animOffset; break;
      }
    }

    return { x: caseX, y: caseY };
  }

  drawSnakeInfos(ctx, offsetX, offsetY, caseSize, currentPlayer) {
    let numPlayer = 0;
    let numAI = 0;

    for(let i = 0; i < this.snakes.length; i++) {
      const snake = this.snakes[i];

      if(snake.player === GameConstants.PlayerType.HUMAN || snake.player === GameConstants.PlayerType.HYBRID_HUMAN_AI) {
        numPlayer++;
      } else {
        numAI++;
      }

      const screenPos = this.getSnakeScreenPosition(snake, caseSize, offsetX, offsetY);

      const label = (snake.player === GameConstants.PlayerType.HUMAN || snake.player === GameConstants.PlayerType.HYBRID_HUMAN_AI)
        ? i18next.t("engine.playerMin") + numPlayer
        : i18next.t("engine.aiMin") + numAI;

      Utils.drawText(
        ctx,
        `${label}\n× ${snake.score}`,
        "rgb(255, 255, 255)",
        Math.round(caseSize / 2),
        GameConstants.Setting.FONT_FAMILY,
        null,
        null,
        screenPos.x,
        screenPos.y - Math.round(caseSize / 1.75),
        false,
        true
      );

      if(!this.spectatorMode && currentPlayer === i && this.countBeforePlay >= 0) {
        Utils.drawArrow(
          ctx,
          Math.round(screenPos.x + (caseSize / 2)),
          Math.round(screenPos.y - caseSize * 2),
          Math.round(screenPos.x + (caseSize / 2)),
          Math.round(screenPos.y - 5)
        );
      }
    }
  }

  cleanAfterGameExit() {
    this.canvasSnakes = null;
    this.canvasGrid = null;
  }

  setDebugMode(debugMode) {
    this.debugMode = debugMode;
  }

  set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, modelLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver, onlineMode, paused) {
    this.snakes = snakes;
    this.grid = grid;
    this.speed = speed;
    this.headerHeight = headerHeight;
    this.imageLoader = imageLoader;
    this.modelLoader = modelLoader;
    this.currentPlayer = currentPlayer;
    this.gameFinished = gameFinished;
    this.offsetFrame = offsetFrame;
    this.countBeforePlay = countBeforePlay;
    this.spectatorMode = spectatorMode;
    this.ticks = ticks;
    this.gameOver = gameOver;
    this.onlineMode = onlineMode;
    this.gamePaused = paused;
  }
}