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
import { Row, Utils, Style, ImageContainer, Label } from "jsgametools";
import GameConstants from "../engine/Constants";
import i18next from "i18next";

export default class Header extends Row {
  constructor(height, backgroundColor, snakes, enablePause, btnFullScreen, btnPause, btnRank, gameRanking, bestScoreToDisplay, numFruit, imageLoader) {
    super(0, 0, null, null, new Style({ "backgroundColor": backgroundColor || "#27AE60" }));

    this.rowButtons = new Row(null, null, null, null, new Style({ "alignement": "right", "spaceBetweenComponents": 5, "verticalAlignement": "center" }));
    this.fruitImage = new ImageContainer("assets/images/skin/flat/fruit.png", null, null, null, null, new Style({ "alignement": "left", "verticalAlignement": "center" }), imageLoader);
    this.labelScore = new Label("", null, null, new Style({ "verticalAlignement": "center" }));

    this.setButtons(btnFullScreen, btnPause, btnRank);
    super.addAll(this.fruitImage, this.labelScore, this.rowButtons);

    this.minHeight = height;
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

  draw(context) {
    const canvas = context.canvas;
    const ctx = canvas.getContext("2d");

    ctx.save();

    this.minWidth = canvas.width;

    if(this.fruitImage) {
      this.fruitImage.width = this.height;
    }

    if(this.btnPause) {
      this.btnPause.width = this.height * 0.85;
      this.btnPause.height = this.height * 0.85;
      this.btnPause.style.set("verticalAlignement", "center");
    }

    if(this.btnFullScreen) {
      this.btnFullScreen.width = this.height * 0.85;
      this.btnFullScreen.height = this.height * 0.85;
      this.btnFullScreen.style.set("verticalAlignement", "center");
    }

    if(this.btnRank) {
      this.btnRank.width = this.height * 0.85;
      this.btnRank.height = this.height * 0.85;
      this.btnRank.style.set("verticalAlignement", "center");
    }

    if(this.gameRanking && (this.gameRanking.closing || this.gameRanking.closed)) {
      this.btnRank.style.set("backgroundColor", "rgba(0, 0, 0, 0)");
    } else {
      this.btnRank.style.set("backgroundColor", this.btnRank.style.backgroundColorDown);
    }

    this.fruitImage.loadImage(this.imageLoader);

    /*Utils.drawImage(ctx, this.imageLoader.get("assets/images/skin/flat/fruit.png", Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1)), Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1))), 5, 5, Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1)), Math.round(this.height * 0.85 * (this.bestScoreToDisplay ? 0.5 : 1)));*/

    if(this.snakes != null && this.snakes.length == 1) {
      this.labelScore.text = "× " + this.snakes[0].score;
      this.labelScore.style.set("fontSize", Math.round(this.height * 0.43 * (this.bestScoreToDisplay ? 0.75 : 1)));
    } else {
      this.labelScore.text = i18next.t("engine.num") + (this.numFruit != null ? this.numFruit : "???");
      this.labelScore.style.set("fontSize", Math.round(this.height * 0.43 * (this.bestScoreToDisplay ? 0.75 : 1)));
    }

    if(this.bestScoreToDisplay) {
      Utils.drawImage(ctx, this.imageLoader.get("assets/images/trophy.png", Math.round(this.height * 0.425), Math.round(this.height * 0.425)), 5, Math.round(8 + this.height * 0.425), Math.round(this.height * 0.425), Math.round(this.height * 0.425));
      Utils.drawText(ctx, this.bestScoreToDisplay, "black", Math.round(this.height * 0.43 * (this.bestScoreToDisplay ? 0.75 : 1)), GameConstants.Setting.FONT_FAMILY, "default", "default", Math.round(this.height * 0.9 * (this.bestScoreToDisplay ? 0.58 : 1)), Math.round(this.height * 0.425 + this.height * 0.67 * (this.bestScoreToDisplay ? 0.63 : 1)));
    }

    super.draw(context);
    ctx.restore();
  }

  set(snakes, imageLoader, bestScoreToDisplay, height, numFruit, enablePause) {
    this.enablePause = enablePause;
    this.snakes = snakes;
    this.imageLoader = imageLoader;
    this.bestScoreToDisplay = bestScoreToDisplay;
    this.minHeight = height;
    this.numFruit = numFruit;
  }

  setButtons(btnFullScreen, btnPause, btnRank) {
    this.rowButtons.clear();
    this.btnFullScreen = btnFullScreen;
    this.btnPause = btnPause;
    this.btnRank = btnRank;
    
    if(btnRank) this.rowButtons.add(btnRank);
    if(btnPause) this.rowButtons.add(btnPause);
    if(btnFullScreen) this.rowButtons.add(btnFullScreen);
  }

  set minHeight(minHeight) {
    super.minHeight = minHeight;
    super.maxHeight = minHeight;
  }

  get height() {
    return this.minHeight || this.maxHeight || super.height || 0;
  }
}