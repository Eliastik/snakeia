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
if(typeof(require) !== "undefined") {
  var GameConstants = require("./constants");
  var DrawUtils = require("./drawUtils");
  var i18next = require("../libs/i18next.min");
}

function GameRanking(snakes, fontSize, fontFamily, headerHeight, backgroundColor) {
  this.snakes = snakes;
  this.fontSize = fontSize || Math.floor(GameConstants.Setting.FONT_SIZE / 1.25);
  this.fontFamily = fontFamily || GameConstants.Setting.FONT_FAMILY;
  this.backgroundColor = backgroundColor == undefined ? "rgba(44, 62, 80, 0.75)" : backgroundColor;
  this.headerHeight = headerHeight == undefined ? GameConstants.Setting.HEADER_HEIGHT_DEFAULT : headerHeight;
  this.closed = false;
  this.init = this.init == undefined ? false : this.init;
}

GameRanking.prototype.draw = function(ctx, imageLoader) {
  if(this.snakes != null) {
    var canvas = ctx.canvas;
    ctx.save();

    var title = i18next.t("engine.ranking");
    var maxSizeName = ctx.measureText(title).width;

    var scores = [];

    ctx.font = (this.fontSize / 1.5) + "px " + this.fontFamily;

    for(var i = 0; i < this.snakes.length; i++) {
      var snake = this.snakes[i];
      var text = snake.name + " × " + snake.score;
      var sizeText = ctx.measureText(text).width + 30;

      if(sizeText > maxSizeName) maxSizeName = sizeText;

      scores[i] = {
        username: snake.name,
        score: snake.score,
        gameOver: snake.gameOver,
        text: text,
        id: i
      };
    }

    var width = maxSizeName + 50;
    var height = canvas.height - this.headerHeight;

    ctx.fillStyle = "rgba(75, 75, 75, 0.5)";
    ctx.fillRect(0, this.headerHeight, width, height);
    ctx.font = this.fontSize + "px " + this.fontFamily;

    var yTitle = this.headerHeight + this.fontSize;
    
    DrawUtils.drawText(ctx, i18next.t("engine.ranking"), "rgba(255, 255, 255, 0.75)", this.fontSize, this.fontFamily, "default", null, (width / 2) - (ctx.measureText(title).width / 2), yTitle, false, true);

    var ranking = scores.sort(function(a, b) {
      return b.score - a.score;
    });
    
    var currentY = yTitle + this.fontSize / 1.5;

    for(var i = 0; i < ranking.length; i++) {
      switch(i) {
        case 0:
          DrawUtils.drawImage(ctx, imageLoader.get("assets/images/trophy.png"), 5, currentY, this.fontSize, this.fontSize);
          break;
        case 1:
          DrawUtils.drawImage(ctx, imageLoader.get("assets/images/trophy_silver.png"), 5, currentY, this.fontSize, this.fontSize);
          break;
        case 2:
          DrawUtils.drawImage(ctx, imageLoader.get("assets/images/trophy_bronze.png"), 5, currentY, this.fontSize, this.fontSize);
          break;
      }

      DrawUtils.drawText(ctx, ranking[i].text, (ranking[i].gameOver ? "rgba(231, 76, 60, 0.75)" : "rgba(255, 255, 255, 0.75)"), this.fontSize / 1.5, this.fontFamily, null, null, 30 + this.fontSize / 1.5, currentY + (this.fontSize / 1.5));
      currentY += this.fontSize + 5;
    }

    ctx.restore();
  }
};

GameRanking.prototype.close = function() {
  this.closed = true;
};

GameRanking.prototype.open = function() {
  this.closed = false;
};

GameRanking.prototype.set = function(snakes, fontSize, headerHeight) {
  GameRanking.apply(this, [snakes, fontSize, null, headerHeight]);
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = GameRanking
}