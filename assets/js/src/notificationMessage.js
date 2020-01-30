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
function NotificationMessage(text, textColor, backgroundColor, delayBeforeClosing, animationDelay, fontSize, fontFamily, foreGround) {
  this.text = text;
  this.textColor = textColor == undefined ? "rgba(255, 255, 255, 0.75)" : textColor;
  this.backgroundColor = backgroundColor == undefined ? "rgba(46, 204, 113, 0.5)" : backgroundColor;
  this.delayBeforeClosing = delayBeforeClosing == undefined ? 5 : delayBeforeClosing; // second
  this.fontSize = fontSize == undefined ? Math.floor(GameConstants.Setting.FONT_SIZE / 1.25) : fontSize;
  this.fontFamily = fontFamily == undefined ? GameConstants.Setting.FONT_FAMILY : fontFamily;
  this.animationDelay = animationDelay == undefined ? 500 : animationDelay;
  this.foreGround = foreGround == undefined ? false : foreGround;
  this.timeLastFrame = 0;
  this.animationTime = 0;
  this.init = false;
  this.closed = false;
  this.closing = false;
  this.closeButton;
}

NotificationMessage.prototype.draw = function(game) {
  var self = this;

  if(this.text != null) {
    var canvas = game.canvas;

    if(!this.init) {
      this.timeLastFrame = Date.now();

      this.closeButton = new ButtonImage("assets/images/close.png", null, 5, "right", null, 32, 32, null, null, game.imageLoader);
      
      this.closeButton.addClickAction(canvas, function() {
        self.close();
      });
    }

    var offsetTime = Date.now() - this.timeLastFrame;
    this.timeLastFrame = Date.now();

    if(this.animationTime >= this.delayBeforeClosing * 1000 && !this.closing && !this.closed) {
      this.close();
    }

    var ctx = canvas.getContext("2d");
    this.fontSize = this.getFontSize(ctx) * 1.25;

    var heightText = game.wrapTextLines(ctx, this.text, null, this.fontSize)["height"];

    var height = heightText + this.fontSize / 2;
    var width = canvas.width;

    var offsetY = this.animationTime / this.animationDelay;

    if(!this.closing) {
      this.animationTime += offsetTime;
    } else {
      this.animationTime -= offsetTime;
    }

    if(this.animationTime < 0) {
      this.closed = true;
      this.closing = false;
    }

    if(!this.closed) {
      var offsetY = this.animationTime / this.animationDelay;
      var y = canvas.height - (height * (offsetY <= 1 ? offsetY : 1));

      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, y, width, height);

      game.drawText(ctx, this.text, this.textColor, this.fontSize, this.fontFamily, "center", "default", null, y + this.fontSize, true);

      this.closeButton.y = y + 5;

      if(!this.foreGround) {
        this.closeButton.draw(game);
      }

      this.disableCloseButton();
    } else {
      this.disableCloseButton();
    }

    this.init = true;
  }
};

NotificationMessage.prototype.close = function() {
  this.disableCloseButton();

  if(!this.closing) {
    this.closing = true;
    this.animationTime = this.animationDelay;
  }
};

NotificationMessage.prototype.open = function() {
  this.timeLastFrame = 0;
  this.animationTime = 0;
  this.init = false;
  this.closed = false;
  this.closing = false;
};

NotificationMessage.prototype.disableCloseButton = function() {
  if(this.closeButton != undefined && this.closeButton != null && this.closeButton instanceof Button) {
    this.closeButton.disable();
  }
};

NotificationMessage.prototype.enableCloseButton = function() {
  if(this.closeButton != undefined && this.closeButton != null && this.closeButton instanceof Button) {
    this.closeButton.enable();
  }
};

NotificationMessage.prototype.copy = function() {
  return new NotificationMessage(this.text, this.textColor, this.backgroundColor, this.delayBeforeClosing, this.animationDelay, this.fontSize, this.fontFamily, this.foreGround);
};

NotificationMessage.prototype.getFontSize = function(ctx) {
  return Math.floor(parseInt(ctx.font.match(/\d+/), 10) / 1.25);
};