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
import { Component, Utils } from "jsgametools";
import GameConstants from "../engine/Constants";
import i18next from "i18next";

export default class Header extends Component {
  constructor(height, backgroundColor, snakes, enablePause, btnFullScreen, btnPause, btnRank, gameRanking, bestScoreToDisplay, numFruit, imageLoader) {
    super();

    this.height = height;
    this.backgroundColor = backgroundColor || "#27AE60";
    this.snakes = snakes;
    this.btnFullScreen = btnFullScreen;
    this.btnPause = btnPause;
    this.btnRank = btnRank;
    this.enablePause = enablePause;
    this.gameRanking = gameRanking;
    this.bestScoreToDisplay = bestScoreToDisplay;
    this.numFruit = numFruit;
    this.imageLoader = imageLoader;
  }

  draw(ctx) {
    const canvas = ctx.canvas;

    ctx.save();

    if(this.btnPause) {
      this.btnPause.width = this.height * 0.85;
      this.btnPause.height = this.btnPause.width;
      this.btnPause.y = (this.height / 2) - (this.btnPause.height / 2);
    }

    if(this.btnFullScreen) {
      this.btnFullScreen.width = this.height * 0.85;
      this.btnFullScreen.height = this.btnFullScreen.width;
      this.btnFullScreen.y = (this.height / 2) - (this.btnFullScreen.height / 2);
    }

    if(this.btnRank) {
      this.btnRank.width = this.height * 0.85;
      this.btnRank.height = this.btnRank.width;
      this.btnRank.y = (this.height / 2) - (this.btnRank.height / 2);
    }

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, this.height);
    ctx.fillStyle = "black";

    this.width = canvas.width;
    this.btnFullScreen.draw(ctx);

    if(this.enablePause) {
      this.btnPause.x = this.btnFullScreen.x - this.btnPause.width - 10;
      this.btnPause.draw(ctx);

      if(this.snakes != null && this.snakes.length > 1) {
        this.btnRank.x = this.btnPause.x - this.btnPause.width - 10;
        this.btnRank.draw(ctx);
      }
    } else if(this.snakes != null && this.snakes.length > 1) {
      this.btnRank.x = this.btnPause.x - this.btnFullScreen.width - 10;
      this.btnRank.draw(ctx);
    }

    if(this.gameRanking && (this.gameRanking.closing || this.gameRanking.closed)) {
      this.btnRank.color = "rgba(0, 0, 0, 0)";
    } else {
      this.btnRank.color = this.btnRank.colorHover;
    }

    Utils.drawImage(ctx, this.imageLoader.get("assets/images/skin/flat/fruit.png", Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1)), Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1))), 5, 5, Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1)), Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1)));

    if(this.snakes != null && this.snakes.length == 1) {
      Utils.drawText(ctx, "× " + this.snakes[0].score, "black", Math.round(this.height * 0.43 * (this.bestScoreToDisplay ? 0.75 : 1)), GameConstants.Setting.FONT_FAMILY, "default", "default", Math.round(this.height * 0.9 * (this.bestScoreToDisplay ? 0.58 : 1)), Math.round(this.height * 0.67 * (this.bestScoreToDisplay ? 0.63 : 1)));
    } else {
      Utils.drawText(ctx, i18next.t("engine.num") + (this.numFruit != null ? this.numFruit : "???"), "black", Math.round(this.height * 0.43 * (this.bestScoreToDisplay ? 0.75 : 1)), GameConstants.Setting.FONT_FAMILY, "default", "default", Math.round(this.height * 0.9 * (this.bestScoreToDisplay ? 0.58 : 1)), Math.round(this.height * 0.67 * (this.bestScoreToDisplay ? 0.63 : 1)));
    }

    if(this.bestScoreToDisplay) {
      Utils.drawImage(ctx, this.imageLoader.get("assets/images/trophy.png", Math.round(this.height * 0.425), Math.round(this.height * 0.425)), 5, Math.round(8 + this.height * 0.425), Math.round(this.height * 0.425), Math.round(this.height * 0.425));
      Utils.drawText(ctx, this.bestScoreToDisplay, "black", Math.round(this.height * 0.43 * (this.bestScoreToDisplay ? 0.75 : 1)), GameConstants.Setting.FONT_FAMILY, "default", "default", Math.round(this.height * 0.9 * (this.bestScoreToDisplay ? 0.58 : 1)), Math.round(this.height * 0.425 + this.height * 0.67 * (this.bestScoreToDisplay ? 0.63 : 1)));
    }

    ctx.restore();
  }

  set(snakes, imageLoader, bestScoreToDisplay, height, numFruit, enablePause) {
    this.enablePause = enablePause;
    this.snakes = snakes;
    this.imageLoader = imageLoader;
    this.bestScoreToDisplay = bestScoreToDisplay;
    this.height = height;
    this.numFruit = numFruit;
  }

  setButtons(btnFullScreen, btnPause, btnRank) {
    this.btnFullScreen = btnFullScreen;
    this.btnPause = btnPause;
    this.btnRank = btnRank;
  }
}