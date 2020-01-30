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
function Button(text, x, y, alignement, color, colorHover, width, height, fontSize, fontFamily, fontColor, imgSrc, imageLoader, verticalAlignement) {
  this.x = x || 0;
  this.y = y || 0;
  this.initialX = x;
  this.initialY = y;
  this.width = width || "auto";
  this.height = height || "auto";
  this.autoWidth = (this.width == "auto" ? true : false);
  this.autoHeight = (this.height == "auto" ? true : false);
  this.clicked = false;
  this.hovered = false;
  this.text = text;
  this.fontSize = fontSize || Math.floor(GameConstants.Setting.FONT_SIZE / 1.25);
  this.fontFamily = fontFamily || GameConstants.Setting.FONT_FAMILY;
  this.fontColor = fontColor || "white";
  this.color = color || "rgba(0, 0, 0, 0)";
  this.colorHover = colorHover || "#95a5a6";
  this.triggerClick;
  this.triggerHover;
  this.init = false;
  this.disabled = false;
  this.alignement = alignement || "default";
  this.image;
  this.imgSrc = imgSrc;
  this.verticalAlignement = verticalAlignement || "default";
  this.selected = false;
  this.imageLoader = imageLoader;
}
  
function ButtonImage(imgSrc, x, y, alignement, verticalAlignement, width, height, color, colorHover, imageLoader) {
  return new Button(null, x, y, alignement, color, colorHover, width, height, null, null, null, imgSrc, imageLoader, verticalAlignement);
}
  
Button.prototype.draw = function(game) {
  var canvas = game.canvas;
  var ctx = canvas.getContext("2d");
  var precFillStyle = ctx.fillStyle;
  var precFont = ctx.font;
  this.fontSize = this.getFontSize(ctx);

  ctx.font = this.fontSize + "px " + this.fontFamily;
  var textSize = ctx.measureText(this.text);

  if(this.imgSrc != null && this.imageLoader != null) {
    this.loadImage(this.imageLoader);
  }

  if(this.image != null) {
    var imgWidth = this.image.width;
    var imgHeight = this.image.height;

    if(this.autoWidth) {
      this.width = imgWidth * 1.25;
    }

    if(this.autoHeight) {
      this.height = imgHeight * 1.5;
    }
  } else if(this.text != null) {
    var textWrapped = game.wrapTextLines(ctx, this.text, null, this.fontSize);
    var heightText = textWrapped["height"];

    if(this.autoWidth) {
      this.width = textSize.width + 25;
    }

    if(this.autoHeight) {
      this.height = heightText + this.fontSize / 1.5;
    }
  }

  if(this.alignement == "center") {
    this.x =  (canvas.width / 2) - (this.width / 2) - this.initialX;
  } else if(this.alignement == "right") {
    this.x = (canvas.width) - (this.width) - 5 - this.initialX;
  } else if(this.alignement == "left") {
    this.x = 5;
  }

  if(this.verticalAlignement == "bottom") {
    this.y = (canvas.height) - (this.height) - 5 - this.initialY;
  } else if(this.verticalAlignement == "center") {
    this.y = (canvas.height / 2) - (this.height / 2) - this.initialY;
  } else if(this.verticalAlignement == "top") {
    this.y = 15;
  }

  if(this.hovered) {
    ctx.fillStyle = this.colorHover;
  } else {
    ctx.fillStyle = this.color;
  }

  ctx.fillRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));

  if(this.selected) {
    var initialStrokeStyle = ctx.strokeStyle;
    var initialLineWidth = ctx.lineWidth;
    
    ctx.strokeStyle = "#a2cdd8";
    ctx.lineWidth = 3;
    
    ctx.strokeRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
    
    ctx.strokeStyle = initialStrokeStyle;
    ctx.lineWidth = initialLineWidth;
  }

  if(this.image != null) {
    if(this.image.width > this.width || this.image.height > this.height) {
      var aspectRatio = this.image.width / this.image.height;
      imgWidth = Math.floor(this.width / 1.25);
      imgHeight = Math.floor(imgWidth / aspectRatio);
    }
    
    var imgX = this.x + (this.width / 2) - (imgWidth / 2);
    var imgY = this.y + (this.height / 2) - (imgHeight / 2);
    
    ctx.drawImage(this.image, Math.round(imgX), Math.round(imgY), Math.round(imgWidth), Math.round(imgHeight));
  } else if(this.text != null) {
    ctx.fillStyle = this.fontColor;
    
    var textX = this.x + (this.width / 2) - (textSize.width / 2);
    var textY = this.y + this.fontSize + this.fontSize / 5;
    
    game.drawText(ctx, this.text, this.fontColor, this.fontSize, this.fontFamily, (this.alignement == "center" ? "center" : "default"), "default", Math.round(textX), Math.round(textY), true);
  }

  ctx.fillStyle = precFillStyle;
  ctx.font = precFont;

  if(!this.init && game != null) {
    var self = this;
    
    game.canvas.addEventListener("mousemove", function mouseOverFunction(evt) {
      if(!self.disabled) {
        if(self.isInside(self.getMousePos(game.canvas, evt))) {
          if(self.triggerHover != null && !self.disabled) {
            self.triggerHover();
          }
          
          self.hovered = true;
          self.clicked = false;
        } else {
          self.hovered = false;
        }
      }
    }, false);
    
    game.canvas.addEventListener("click", function clickFunction(evt) {
      if(!self.disabled) {
        if(self.isInside(self.getMousePos(canvas, evt))) {
          if(self.triggerClick != null) {
            self.triggerClick();
          }
          
          self.hovered = false;
          self.clicked = true;
        } else {
          self.clicked = false;
        }
      }
    }, false);
  }

  this.init = true;
};

Button.prototype.getFontSize = function(ctx) {
  return Math.floor(parseInt(ctx.font.match(/\d+/), 10) / 1.25);
};

Button.prototype.getMousePos = function(canvas, event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

Button.prototype.isInside = function(pos) {
  return pos.x > this.x && pos.x < this.x + this.width && pos.y < this.y + this.height && pos.y > this.y;
};

Button.prototype.addClickAction = function(canvas, trigger) {
  this.triggerClick = trigger;
};

Button.prototype.removeClickAction = function(self) {
  if(self.triggerClick != null)  {
    self.triggerClick = null;
  }
};

Button.prototype.addMouseOverAction = function(game, trigger) {
  this.triggerHover = trigger;
};

Button.prototype.removeHoverAction = function(self) {
  if(self.triggerHover != null)  {
    self.triggerHover = null;
  }
};

Button.prototype.disable = function() {
  this.disabled = true;
};

Button.prototype.enable = function() {
  this.disabled = false;
};

Button.prototype.loadImage = function(imageLoader) {
  this.image = imageLoader.get(this.imgSrc);
};