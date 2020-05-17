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
import GameConstants from "./constants";
import { Utils } from "jsgametools";
import i18next from "i18next";

export default class GameRanking {
  constructor(snakes, fontSize, fontFamily, headerHeight, backgroundColor) {
    this.snakes = snakes;
    this.fontSize = fontSize || Math.floor(GameConstants.Setting.FONT_SIZE / 1.25);
    this.fontFamily = fontFamily || GameConstants.Setting.FONT_FAMILY;
    this.backgroundColor = backgroundColor == undefined ? "rgba(44, 62, 80, 0.75)" : backgroundColor;
    this.headerHeight = headerHeight == undefined ? GameConstants.Setting.HEADER_HEIGHT_DEFAULT : headerHeight;
    this.closed = this.closed == undefined ? false : this.closed;
    this.closing = this.closing == undefined ? false : this.closing;
    this.opening = this.opening == undefined ? false : this.opening;
    this.forceClosing = this.forceClosing == undefined ? false : this.forceClosing;
    this.overflow = this.overflow == undefined ? false : this.overflow;
    this.back = this.back == undefined ? false : this.back;
    this.timeLastFrame = this.timeLastFrame == undefined ? 0 : this.timeLastFrame;
    this.offsetX = this.offsetX == undefined ? 0 : this.offsetX;
    this.offsetY = this.offsetY == undefined ? 0 : this.offsetY;
    this.totalTimeX = this.totalTimeX == undefined ? 0 : this.totalTimeX;
    this.totalTime = this.totalTime == undefined ? 0 : this.totalTime;
  }

  draw(ctx, ui, currentPlayer) {
    if(this.snakes != null && !this.closed) {
      const imageLoader = ui.imageLoader;
      const canvas = ctx.canvas;
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

        const text = snake.name + " × " + snake.score + " (" + ((currentPlayer == i ? i18next.t("engine.playerHuman") : (this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) ? i18next.t("engine.playerMin") + numPlayer : i18next.t("engine.aiMin") + numAI)) + ")";
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

      const width = maxSizeName + sizeNumber + 15;
      const height = canvas.height - this.headerHeight;

      ctx.fillStyle = "rgba(75, 75, 75, 0.35)";
      ctx.fillRect(-this.offsetX, this.headerHeight, width, height);
      ctx.font = this.fontSize + "px " + this.fontFamily;

      const yTitle = this.headerHeight + this.fontSize - this.offsetY + 10;

      if(yTitle - this.fontSize >= this.headerHeight) {
        Utils.drawText(ctx, i18next.t("engine.ranking"), "rgba(255, 255, 255, 0.5)", this.fontSize, this.fontFamily, "default", null, (width / 2) - (ctx.measureText(title).width / 2) - this.offsetX, yTitle, false, true);
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

      if(this.timeLastFrame <= 0) this.timeLastFrame = Date.now();
      const offsetTime = Date.now() - this.timeLastFrame;
      this.timeLastFrame = Date.now();

      for(let i = 0; i < ranking.length; i++) {
        if(currentY > this.headerHeight) {
          if(ranking[i].rank >= 0 && ranking[i].rank < 3 && ranking[i].score > 0) {
            switch(ranking[i].rank) {
              case 0:
                Utils.drawImage(ctx, imageLoader.get("assets/images/trophy.png"), 5 - this.offsetX, currentY, this.fontSize, this.fontSize);
                break;
              case 1:
                Utils.drawImage(ctx, imageLoader.get("assets/images/trophy_silver.png"), 5 - this.offsetX, currentY, this.fontSize, this.fontSize);
                break;
              case 2:
                Utils.drawImage(ctx, imageLoader.get("assets/images/trophy_bronze.png"), 5 - this.offsetX, currentY, this.fontSize, this.fontSize);
                break;
            }
          } else {
            Utils.drawText(ctx, "" + (ranking[i].rank + 1), "rgba(255, 255, 255, 0.5)", this.fontSize / 1.5, this.fontFamily, null, null, (this.fontSize / 1.5) / 2 + 5 - this.offsetX, currentY + (this.fontSize / 1.5));
          }

          Utils.drawText(ctx, ranking[i].text, (ranking[i].gameOver ? "rgba(231, 76, 60, 0.5)" : "rgba(255, 255, 255, 0.5)"), this.fontSize / 1.5, this.fontFamily, null, null, 5 + sizeNumber + this.fontSize / 1.5 - this.offsetX, currentY + (this.fontSize / 1.5));
        }

        currentY += this.fontSize + 5;

        if(currentY > canvas.height && !this.back) {
          this.totalTime += offsetTime;

          if(this.totalTime > 5000) {
            this.overflow = true;
          }

          break;
        } else if(i == this.snakes.length - 1) {
          if(!this.back) this.totalTime = 0;
          this.back = true;
        }
      }

      if(this.back) {
        this.totalTime += offsetTime;

        if(this.totalTime > 5000) {
          if(this.offsetY > 0) {
            this.offsetY -= offsetTime / 20;
          } else {
            this.back = false;
            this.totalTime = 0;
          }
        }
      } else if(this.overflow) {
        this.offsetY += offsetTime / 20;
      }

      if(ui.disableAnimation && this.closing) {
        this.closing = false;
        this.closed = true;
      } else if(ui.disableAnimation && this.closing) {
        this.opening = false;
        this.closed = false;
      } else {
        if(this.closing) {
          if(this.forceClosing) {
            this.offsetX = width;
          } else {
            this.offsetX += offsetTime / 3;
          }
    
          if(this.offsetX >= width) {
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

      ctx.restore();
    } else {
      this.overflow = false;
      this.back = false;
      this.timeLastFrame = Date.now();
      this.offsetY = 0;
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

  set(snakes, fontSize, headerHeight) {
    GameRanking.apply(this, [snakes, fontSize, null, headerHeight]);
  }
}