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
import { Component, Utils, EasingFunctions } from "jsgametools";
import i18next from "i18next";
import Position from "../engine/Position";

export default class GridUI extends Component {
  constructor(snakes, grid, speed, disableAnimation, graphicSkin, isFilterHueAvailable, headerHeight, imageLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver) {
    super();

    this.snakes = snakes;
    this.grid = grid;
    this.speed = speed;
    this.disableAnimation = disableAnimation;
    this.isFilterHueAvailable = isFilterHueAvailable;
    this.headerHeight = headerHeight;
    this.imageLoader = imageLoader;
    this.graphicSkin = graphicSkin;
    this.currentPlayer = currentPlayer;
    this.gameFinished = gameFinished;
    this.offsetFrame = 0;
    this.countBeforePlay = countBeforePlay;
    this.spectatorMode = spectatorMode;
    this.ticks = ticks;
    this.gameOver = gameOver;

    this.canvasTmp = document.createElement("canvas");
  }

  draw(context) {
    if(this.grid && this.grid.grid) {
      super.draw(context);

      const canvas = context.canvas;
      const ctx = canvas.getContext("2d");
  
      this.canvasTmp.width = canvas.width;
      this.canvasTmp.height = canvas.height;
  
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
  
      for(let i = 0; i < this.grid.height; i++) {
        for(let j = 0; j < this.grid.width; j++) {
          const caseX = offsetX + j * caseSize;
          const caseY = offsetY + i * caseSize;
  
          if(i == 0 && j == 0) {
            this.x = caseX;
            this.y = caseY;
          }
  
          if((i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)) {
            ctx.fillStyle = "rgba(127, 140, 141, 0.75)";
          } else {
            ctx.fillStyle = "rgba(44, 62, 80, 0.75)";
          }
  
          ctx.fillRect(caseX, caseY, caseSize, caseSize);
          Utils.drawImage(ctx,
            this.imageLoader.get("assets/images/skin/" + this.graphicSkin + "/" + this.grid.getImageCase(new Position(j, i)),
              caseSize,
              Math.round(caseSize)),
            Math.round(caseX),
            Math.round(caseY),
            Math.round(caseSize),
            Math.round(caseSize));
        }
      }
  
      this.drawSnake(ctx, caseSize, offsetY, totalWidth, this.currentPlayer);
  
      this.canvasTmp.width = 0;
      this.canvasTmp.height = 0;
  
      ctx.restore();
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

  drawSnake(ctx, caseSize, offsetY, totalWidth, currentPlayer) {
    if(this.snakes != null) {
      const canvas = this.canvasTmp;
      const ctxTmp = this.canvasTmp.getContext("2d");
    
      for(let j = 0; j < this.snakes.length; j++) {
        ctxTmp.clearRect(0, 0, this.canvasTmp.width, this.canvasTmp.height);

        if(this.snakes[j].color != undefined) {
          ctxTmp.filter = "hue-rotate(" + this.snakes[j].color + "deg)";
        }

        for(let i = this.snakes[j].length() - 1; (i >= -1 && this.snakes[j].length() > 1) || i >= 0; i--) { // -1 == tail
          let position;

          if(i == -1) {
            position = this.snakes[j].get(this.snakes[j].length() - 1);
          } else {
            position = this.snakes[j].get(i);
          }

          let caseX = 0;
          let caseY = 0;
          let direction = position.direction;
          let angle = 0;
          let imageLoc = "";
          let eraseBelow = true;

          if(i == 0) {
            direction = this.snakes[j].getHeadPosition().direction;
          } else if(i == -1) {
            if(!this.disableAnimation && !this.snakes[j].gameOver && !this.snakes[j].scoreMax && !this.gameFinished && this.snakes[j].lastTailMoved) {
              direction = this.snakes[j].getTailPosition().direction;
            } else {
              direction = this.snakes[j].get(this.snakes[j].length() - 2).direction;
            }
          } else {
            direction = this.snakes[j].getGraphicDirection(i);
          }

          // Animation
          if(!this.disableAnimation && (i == 0 || (i == -1 && this.snakes[j].lastTailMoved)) && !this.snakes[j].scoreMax && ((!this.gameFinished && !this.gameOver) || this.snakes[j].gameOver) && (!this.snakes[j].gameOver || (this.snakes[j].gameOver && this.ticks < this.snakes[j].ticksDead + 2))) {
            let offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER); // Percentage of the animation

            if(this.snakes[j].gameOver && this.snakes[j].ticksDead) {
              if(this.ticks <= this.snakes[j].ticksDead) {
                offset = 1 - offset; // Dead animation
                offset = EasingFunctions.easeInCubic(offset);
              } else {
                offset = EasingFunctions.easeOutBounce(offset);
              }
            }

            offset = Math.max(0, Math.min(1, offset));

            const offsetX = (caseSize * offset) - caseSize;
            const offsetY = (caseSize * offset) - caseSize;

            let currentPosition = position;
            let graphicDirection;

            if(i == 0) {
              if(this.snakes[j].length() > 1) {
                graphicDirection = this.snakes[j].getGraphicDirection(1);
              } else {
                graphicDirection = this.snakes[j].getGraphicDirection(0);
              }
            } else if(i == -1) {
              graphicDirection = this.snakes[j].getGraphicDirectionFor(this.snakes[j].getTailPosition(), this.snakes[j].lastTail, this.snakes[j].get(this.snakes[j].length() - 2));
            }

            if(i == -1 && this.snakes[j].length() > 1) {
              currentPosition = this.snakes[j].get(this.snakes[j].length() - 1);
            }

            if((i == 0 || i == -1) && (graphicDirection == GameConstants.Direction.ANGLE_1 || graphicDirection == GameConstants.Direction.ANGLE_2 || graphicDirection == GameConstants.Direction.ANGLE_3 || graphicDirection == GameConstants.Direction.ANGLE_4)) {
              if(i == 0) {
                angle = -90;
              }

              if(i == 0) {
                angle += -128.073 * Math.pow(offset, 2) + 222.332 * offset - 5.47066; // Interpolated rotation animation
              } else if(i == -1) {
                angle += 126.896 * Math.pow(offset, 2) + -33.6471 * offset + 1.65942; // Interpolated rotation animation tail
              }

              if(i == 0 && ((graphicDirection == GameConstants.Direction.ANGLE_4 && direction == GameConstants.Direction.UP) || (graphicDirection == GameConstants.Direction.ANGLE_1 && direction == GameConstants.Direction.LEFT) || (graphicDirection == GameConstants.Direction.ANGLE_2 && direction == GameConstants.Direction.BOTTOM) || (graphicDirection == GameConstants.Direction.ANGLE_3 && direction == GameConstants.Direction.RIGHT))) {
                angle = -angle;
              } else if(i == -1 && ((graphicDirection == GameConstants.Direction.ANGLE_4 && direction == GameConstants.Direction.RIGHT) || (graphicDirection == GameConstants.Direction.ANGLE_3 && direction == GameConstants.Direction.BOTTOM) || (graphicDirection == GameConstants.Direction.ANGLE_1 && direction == GameConstants.Direction.UP) || (graphicDirection == GameConstants.Direction.ANGLE_2 && direction == GameConstants.Direction.LEFT))) {
                angle = -angle;
              }

              eraseBelow = false;
            }

            switch(currentPosition.direction) {
            case GameConstants.Direction.UP:
              caseY -= offsetY;
              break;
            case GameConstants.Direction.BOTTOM:
              caseY += offsetY;
              break;
            case GameConstants.Direction.RIGHT:
              caseX += offsetX;
              break;
            case GameConstants.Direction.LEFT:
              caseX -= offsetX;
              break;
            }
          }

          if(i == this.snakes[j].length() - 1) {
            direction = this.snakes[j].getGraphicDirectionFor(position, this.snakes[j].get(i - 1), this.snakes[j].lastTail);
          }

          const posX = position.x;
          const posY = position.y;

          caseX += Math.floor(posX * caseSize + ((canvas.width - totalWidth) / 2));
          caseY += offsetY + posY * caseSize;

          if(i == 0) {
            if(this.snakes[j].gameOver && !this.snakes[j].scoreMax) {
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
          } else if(i == -1) {
            switch(direction) {
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
          } else {
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
          }

          Utils.drawImage(ctxTmp, this.imageLoader.get(imageLoc, Math.round(caseSize), Math.round(caseSize)), Math.round(caseX), Math.round(caseY), Math.round(caseSize), Math.round(caseSize), null, null, null, null, eraseBelow, Math.round(angle));
        }

        Utils.drawImageData(ctx, this.canvasTmp, Math.round((canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, Math.round(caseSize * this.grid.height), Math.floor((canvas.width - totalWidth) / 2), this.headerHeight, totalWidth, Math.round(caseSize * this.grid.height));
        ctxTmp.filter = "none";
      }

      if(this.snakes.length > 1) {
        this.drawSnakeInfos(ctx, totalWidth, caseSize, currentPlayer);
      }
    }
  }

  drawSnakeInfos(ctx, totalWidth, caseSize, currentPlayer) {
    let numPlayer = 0;
    let numAI = 0;

    for(let i = 0; i < this.snakes.length; i++) {
      if(this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
        numPlayer++;
      } else {
        numAI++;
      }

      const position = this.snakes[i].get(0);

      if(position != null) {
        const posX = position.x;
        const posY = position.y;
        let caseX = Math.floor(posX * caseSize + ((this.canvasTmp.width - totalWidth) / 2));
        let caseY = this.headerHeight + posY * caseSize;
    
        if(!this.disableAnimation && !this.snakes[i].gameOver && !this.gameFinished && !this.gameOver) {
          let offset = this.offsetFrame / (this.speed * GameConstants.Setting.TIME_MULTIPLIER);
          offset = (offset > 1 ? 1 : offset);
          const offsetX = (caseSize * offset) - caseSize;
          const offsetY = (caseSize * offset) - caseSize;
    
          switch(position.direction) {
          case GameConstants.Direction.UP:
            caseY -= offsetY;
            break;
          case GameConstants.Direction.BOTTOM:
            caseY += offsetY;
            break;
          case GameConstants.Direction.RIGHT:
            caseX += offsetX;
            break;
          case GameConstants.Direction.LEFT:
            caseX -= offsetX;
            break;
          }
        }
    
        Utils.drawText(ctx, ((this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) ? i18next.t("engine.playerMin") + numPlayer : i18next.t("engine.aiMin") + numAI) + "\n× " + this.snakes[i].score, "rgb(255, 255, 255)", Math.round(caseSize / 2), GameConstants.Setting.FONT_FAMILY, null, null, caseX, caseY - Math.round(caseSize / 1.75), false, true);
    
        if(!this.spectatorMode && (currentPlayer == i && this.countBeforePlay >= 0 && (currentPlayer != null || (this.isFilterHueAvailable && this.snakes.length > 2) || (!this.isFilterHueAvailable && this.snakes.length > 1)))) {
          Utils.drawArrow(ctx, Math.round(caseX + (caseSize / 2)), Math.round(caseY - caseSize * 2), Math.round(caseX + (caseSize / 2)), Math.round(caseY - 5));
        }
      }
    }
  }

  set(snakes, grid, speed, offsetFrame, headerHeight, imageLoader, currentPlayer, gameFinished, countBeforePlay, spectatorMode, ticks, gameOver) {
    this.snakes = snakes;
    this.grid = grid;
    this.speed = speed;
    this.headerHeight = headerHeight;
    this.imageLoader = imageLoader;
    this.currentPlayer = currentPlayer;
    this.gameFinished = gameFinished;
    this.offsetFrame = offsetFrame;
    this.countBeforePlay = countBeforePlay;
    this.spectatorMode = spectatorMode;
    this.ticks = ticks;
    this.gameOver = gameOver;
  }
}