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

export default class GameRanking extends Component {
  constructor(snakes, currentPlayer, fontSize, fontFamily, headerHeight, backgroundColor, scrollBarColor, disableAnimation, imageLoader, spectatorMode) {
    super();

    this.snakes = snakes;
    this.fontSize = fontSize || Math.floor(GameConstants.Setting.FONT_SIZE / 1.25);
    this.fontFamily = fontFamily || GameConstants.Setting.FONT_FAMILY;
    this.backgroundColor = backgroundColor || "rgba(44, 62, 80, 0.75)";
    this.scrollBarColor = scrollBarColor || "rgba(44, 62, 80, 0.8)";
    this.headerHeight = headerHeight || GameConstants.Setting.HEADER_HEIGHT_DEFAULT;
    this.closed = false;
    this.closing = false;
    this.opening = false;
    this.forceClosing = false;
    this.overflow = false;
    this.back = false;
    this.lastLine = false;
    this.timeLastFrame = 0;
    this.offsetX = 0;
    this.totalTimeX = 0;
    this.totalTime = 0;
    this.canvasTmp = document.createElement("canvas");
    this.disableAnimation = disableAnimation;
    this.imageLoader = imageLoader;
    this.currentPlayer = currentPlayer;
    this.spectatorMode = spectatorMode;

    this.addScrollAction((deltaX, deltaY) => {
      if((this.lastLine && deltaY > 0)) {
        this.offsetScrollY -= deltaY;
        this.back = false;
        this.overflow = false;
      }

      this.totalTime = 0;
      this.timeLastFrame = 0;
    });
  }

  draw(context) {
    if(this.snakes != null && !this.closed) {
      super.draw(context);
  
      this.canvasTmp.width = context.canvas.width;
      this.canvasTmp.height = context.canvas.height;

      const canvas = this.canvasTmp;
      const ctx = this.canvasTmp.getContext("2d");

      ctx.save();

      const title = i18next.t("engine.ranking");
      let maxSizeName = ctx.measureText(title).width;

      const scores = [];
      let numPlayer = 0;
      let numAI = 0;

      ctx.font = (this.fontSize / 1.5) + "px " + this.fontFamily;
      const sizeNumber = ctx.measureText("" + this.snakes.length).width + 15;

      for(let i = 0; i < this.snakes.length; i++) {
        const snake = this.snakes[i];

        if(snake.player == GameConstants.PlayerType.HUMAN || snake.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
          numPlayer++;
        } else {
          numAI++;
        }

        const text = snake.name + " × " + snake.score + " (" + ((this.currentPlayer == i && !this.spectatorMode ? i18next.t("engine.playerHuman") : (this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) ? i18next.t("engine.playerMin") + numPlayer : i18next.t("engine.aiMin") + numAI)) + ")";
        const sizeText = ctx.measureText(text).width + 30;

        if(sizeText > maxSizeName) maxSizeName = sizeText;

        scores[i] = {
          username: snake.name,
          score: snake.score,
          gameOver: snake.gameOver,
          text: text,
          rank: 0,
          id: i
        };

        lastScore = snake.score;
      }
      
      this.x = -(EasingFunctions.easeInOutCubic(this.offsetX / this.width) * this.width);
      this.y = this.headerHeight;
      this.width = maxSizeName + sizeNumber + 15;
      this.height = canvas.height - this.headerHeight;

      ctx.fillStyle = "rgba(75, 75, 75, 0.35)";
      ctx.fillRect(this.x, this.headerHeight, this.width, this.height);
      ctx.font = this.fontSize + "px " + this.fontFamily;

      let yTitle = this.headerHeight + this.fontSize - this.offsetScrollY + 10;

      // Scroll variables
      const maxHeight = this.snakes.length * (this.fontSize + 5) + this.fontSize + 10 + (this.fontSize / 1.5);
      const clientHeight = this.height * (this.height / maxHeight);
      const scrollAreaSize = this.height - clientHeight;
      let percentScrollbar = this.offsetScrollY / (maxHeight - this.height);

      if(scrollAreaSize * percentScrollbar + clientHeight > this.height) { // Limit max scroll
        this.offsetScrollY += (this.height - (scrollAreaSize * percentScrollbar + clientHeight));
      }

      if(yTitle > this.headerHeight + this.fontSize + 10) { // Limit min scroll
        yTitle = this.headerHeight + this.fontSize + 10;
        this.offsetScrollY = 0;
      }
      
      percentScrollbar = this.offsetScrollY / (maxHeight - this.height);

      if(yTitle + this.fontSize - 10 >= this.headerHeight) {
        Utils.drawText(ctx, i18next.t("engine.ranking"), "rgba(255, 255, 255, 0.5)", Math.round(this.fontSize), this.fontFamily, "default", null, Math.round((this.width / 2) - (ctx.measureText(title).width / 2) + this.x), Math.round(yTitle), false, true);
      }

      const ranking = scores.sort((a, b) => {
        return b.score - a.score;
      });

      let rank = 0;
      let lastScore = 0;

      for(let i = 0; i < ranking.length; i++) {
        if(ranking[i].score < lastScore) {
          rank++;
        }

        ranking[i].rank = rank;

        lastScore = ranking[i].score;
      }
      
      let currentY = yTitle + this.fontSize / 1.5;
      this.overflow = false;

      if(this.timeLastFrame <= 0) this.timeLastFrame = performance.now();
      let offsetTime = performance.now() - this.timeLastFrame;
      this.timeLastFrame = performance.now();

      let numberRankDrawn = 0;

      for(let i = 0; i < ranking.length; i++) {
        if(currentY + this.fontSize > this.headerHeight) {
          if(ranking[i].rank >= 0 && ranking[i].rank < 3 && ranking[i].score > 0) {
            switch(ranking[i].rank) {
              case 0:
                Utils.drawImage(ctx, this.imageLoader ? this.imageLoader.get("assets/images/trophy.png", Math.round(this.fontSize), Math.round(this.fontSize)) : null, 5 + this.x, currentY, Math.round(this.fontSize), Math.round(this.fontSize));
                break;
              case 1:
                Utils.drawImage(ctx, this.imageLoader ? this.imageLoader.get("assets/images/trophy_silver.png", Math.round(this.fontSize), Math.round(this.fontSize)) : null, 5 + this.x, currentY, Math.round(this.fontSize), Math.round(this.fontSize));
                break;
              case 2:
                Utils.drawImage(ctx, this.imageLoader ? this.imageLoader.get("assets/images/trophy_bronze.png", Math.round(this.fontSize), Math.round(this.fontSize)) : null, 5 + this.x, currentY, Math.round(this.fontSize), Math.round(this.fontSize));
                break;
            }
          } else {
            Utils.drawText(ctx, "" + (ranking[i].rank + 1), "rgba(255, 255, 255, 0.5)", Math.round(this.fontSize / 1.5), this.fontFamily, null, null, Math.round((this.fontSize / 1.5) / 2 + 5 + this.x), Math.round(currentY + (this.fontSize / 1.5)));
          }

          Utils.drawText(ctx, ranking[i].text, (ranking[i].gameOver ? "rgba(231, 76, 60, 0.5)" : "rgba(255, 255, 255, 0.5)"), Math.round(this.fontSize / 1.5), this.fontFamily, null, null, Math.round(5 + sizeNumber + this.fontSize / 1.5 + this.x), Math.round(currentY + (this.fontSize / 1.5)));

          numberRankDrawn++;
        }

        currentY += Math.round(this.fontSize) + 5;

        if(currentY > canvas.height && !this.back) {
          this.lastLine = false;
          this.totalTime += offsetTime;

          if(this.totalTime > 5000) {
            this.overflow = true;
          }

          break;
        } else if(i == this.snakes.length - 1) {
          if(!this.back) this.totalTime = 0;
          this.back = true;
          this.lastLine = true;
        }
      }

      if(numberRankDrawn <= 0) {
        this.offsetScrollY = 0;
        this.timeLastFrame = performance.now();
        offsetTime = 0;
      }

      if(this.back) {
        this.totalTime += offsetTime;

        if(this.totalTime > 5000) {
          if(this.offsetScrollY > 0) {
            this.offsetScrollY -= offsetTime / 20;
          } else {
            this.back = false;
            this.totalTime = 0;
          }
        }
      } else if(this.overflow) {
        this.offsetScrollY += offsetTime / 20;
      }

      if(this.disableAnimation && this.closing) {
        this.closing = false;
        this.closed = true;
      } else if(this.disableAnimation && this.closing) {
        this.opening = false;
        this.closed = false;
      } else {
        if(this.closing) {
          if(this.forceClosing) {
            this.offsetX = this.width;
          } else {
            this.offsetX += offsetTime / 3;
          }
    
          if(this.offsetX >= this.width) {
            this.closing = false;
            this.closed = true;
            this.forceClosing = false;
          }
        } else if(this.opening) {
          this.offsetX -= offsetTime / 3;
    
          if(this.offsetX <= 0) {
            this.offsetX = 0;
            this.opening = false;
            this.closed = false;
          }
        }
      }
      
      // Scrollbar drawing
      if(clientHeight <= this.height) {
        ctx.fillStyle = this.scrollBarColor;
        ctx.fillRect(this.x + this.width - 15, this.headerHeight + scrollAreaSize * percentScrollbar, 15, clientHeight);
      }

      Utils.drawImageData(context, this.canvasTmp, 0, this.headerHeight, this.width, this.height, 0, this.headerHeight, this.width, this.height);
      ctx.restore();
    } else {
      this.overflow = false;
      this.back = false;
      this.timeLastFrame = performance.now();
      this.offsetScrollY = 0;
      this.totalTime = 0;
    }
  }

  close() {
    this.closing = true;
    this.opening = false;
    this.forceClosing = false;
  }

  forceClose() {
    this.closing = true;
    this.opening = false;
    this.forceClosing = true;
  }

  open() {
    this.closing = false;
    this.opening = true;
    this.closed = false;
    this.forceClosing = false;
  }

  set(snakes, fontSize, headerHeight, currentPlayer, imageLoader, spectatorMode) {
    this.snakes = snakes;
    this.fontSize = fontSize;
    this.headerHeight = headerHeight;
    this.currentPlayer = currentPlayer;
    this.imageLoader = imageLoader;
    this.spectatorMode = spectatorMode;
  }
}