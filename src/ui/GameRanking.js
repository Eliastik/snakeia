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
import { Col, Row, EasingFunctions, Style, Label, ImageContainer } from "jsgametools";
import i18next from "i18next";

export default class GameRanking extends Col {
  constructor(snakes, currentPlayer, fontSize, fontFamily, headerHeight, backgroundColor, scrollBarColor, disableAnimation, imageLoader, spectatorMode) {
    super(null, null, null, null, new Style({
      "backgroundColor": backgroundColor || "rgba(75, 75, 75, 0.35)",
      "scrollbarColor": scrollBarColor || "rgba(44, 62, 80, 0.8)",
      "fontFamily": fontFamily || GameConstants.Setting.FONT_FAMILY,
      "fontSize": fontSize || Math.floor(GameConstants.Setting.FONT_SIZE / 1.25)
    }));

    this.snakes = snakes;
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
      this.update();
      super.draw(context);

      const canvas = this.canvasTmp;
      const ctx = this.canvasTmp.getContext("2d");

      ctx.save();

      if(this.timeLastFrame <= 0) this.timeLastFrame = performance.now();
      let offsetTime = performance.now() - this.timeLastFrame;
      this.timeLastFrame = performance.now();

      // TODO: auto scroll

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
    this.style.set("fontSize", fontSize);
    this.headerHeight = headerHeight;
    this.currentPlayer = currentPlayer;
    this.imageLoader = imageLoader;
    this.spectatorMode = spectatorMode;
  }

  get scores() {
    const scores = [];
    const ctx = this.canvas.getContext("2d");

    let numPlayer = 0;
    let numAI = 0;

    for(let i = 0; i < this.snakes.length; i++) {
      const snake = this.snakes[i];

      if(snake.player == GameConstants.PlayerType.HUMAN || snake.player == GameConstants.PlayerType.HYBRID_HUMAN_AI) {
        numPlayer++;
      } else {
        numAI++;
      }

      const text = snake.name + " × " + snake.score + " (" + ((this.currentPlayer == i && !this.spectatorMode ? i18next.t("engine.playerHuman") : (this.snakes[i].player == GameConstants.PlayerType.HUMAN || this.snakes[i].player == GameConstants.PlayerType.HYBRID_HUMAN_AI) ? i18next.t("engine.playerMin") + numPlayer : i18next.t("engine.aiMin") + numAI)) + ")";
      const sizeText = ctx.measureText(text).width + 30;

      scores[i] = {
        username: snake.name,
        score: snake.score,
        gameOver: snake.gameOver,
        sizeText: sizeText,
        text: text,
        rank: 0,
        id: i
      };
    }

    return scores;
  }

  get rank() {
    const scores = this.scores;
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

    return ranking;
  }

  update() {
    this.clear();
    
    const ranking = this.rank;
    this.add(new Label(i18next.t("engine.ranking"), null, null, new Style({ "fontColor": "rgba(255, 255, 255, 0.5)", "fontSize": this.style.fontSize, "fontFamily": this.style.fontFamily, "alignement": "center", "bold": true })));

    for(let i = 0; i < ranking.length; i++) {
      const labelStyle = new Style({ "fontColor": "rgba(255, 255, 255, 0.5)", "fontSize": this.style.fontSize / 1.5, "fontFamily": this.style.FONT_FAMILY, "verticalAlignement": "center" });
      const row = new Row(null, null, null, null, new Style({
        "spaceBetweenComponents": 15,
        "alignement": "left"
      }));

      if(ranking[i].rank >= 0 && ranking[i].rank < 3 && ranking[i].score > 0) {
        switch(ranking[i].rank) {
          case 0:
            row.add(new ImageContainer("assets/images/trophy.png", null, null, Math.round(this.style.fontSize), Math.round(this.style.fontSize), null, this.imageLoader));
            break;
          case 1:
            row.add(new ImageContainer("assets/images/trophy_silver.png", null, null, Math.round(this.style.fontSize), Math.round(this.style.fontSize), null, this.imageLoader));
            break;
          case 2:
            row.add(new ImageContainer("assets/images/trophy_bronze.png", null, null, Math.round(this.style.fontSize), Math.round(this.style.fontSize), null, this.imageLoader));
            break;
          }
      } else {
        const labelRank = new Label("" + ranking[i].rank, null, null, labelStyle);
        labelRank.style.set("fontSize", this.style.fontSize);
        row.add(labelRank);
      }

      const labelName = new Label(ranking[i].text, null, null, labelStyle);
      row.add(labelName);

      this.add(row);
    }
  }

  get minHeight() {
    return this.maxHeight;
  }

  get maxHeight() {
    return this.canvas.height - this.headerHeight;
  }

  get minWidth() {
    return this.innerWidth;
  }

  get maxWidth() {
    return this.innerWidth;
  }

  get x() {
    return -(EasingFunctions.easeInOutCubic(this.offsetX / this.width) * this.width);
  }

  get y() {
    return this.headerHeight;
  }

  get defaultStyle() {
    return new Style({
      "backgroundColor": "rgba(75, 75, 75, 0.35)",
      "scrollbarColor": "rgba(44, 62, 80, 0.8)",
      "fontFamily": GameConstants.Setting.FONT_FAMILY,
      "fontSize": Math.floor(GameConstants.Setting.FONT_SIZE / 1.25),
      "padding": 20,
      "spaceBetweenComponents": 5
    });
  }
}