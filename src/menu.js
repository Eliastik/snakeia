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
}

function Menu(buttons, text, colors, fontSize, fontFamily, alignement, x, backgroundColor, blurCanvas) {
  this.buttons = buttons;
  this.text = text;
  this.colors = colors;
  this.fontSize = fontSize || Math.floor(GameConstants.Setting.FONT_SIZE / 1.25);
  this.fontFamily = fontFamily || GameConstants.Setting.FONT_FAMILY;
  this.alignement = alignement || "center";
  this.x = x || 0;
  this.backgroundColor = backgroundColor == undefined ? "rgba(44, 62, 80, 0.75)" : backgroundColor;
  this.blurCanvas = blurCanvas == undefined ? false : blurCanvas;
  this.disabled = false;
  this.lastKey = this.lastKey == undefined ? -1 : this.lastKey;
  this.selectedButton = this.selectedButton == undefined ? 0 : this.selectedButton;
  this.init = this.init == undefined ? false : this.init;
}

Menu.prototype.draw = function(ctx, func) {
  var self = this;

  if(!this.disabled) {
    if(!this.init) {
      document.addEventListener("keydown", function(evt) {
        if(!self.disabled) {
          self.lastKey = evt.keyCode;
        }
      });

      this.init = true;
    }

    if(this.blurCanvas) {
      DrawUtils.blurCanvas(ctx, 5);
    }

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    var heightText = DrawUtils.wrapTextLines(ctx, this.text, null, this.fontSize)["height"];
    var heightButtons = 0;
  
    if(this.buttons != null) {
      if(this.lastKey == GameConstants.Key.UP) {
        this.selectedButton--;
      } else if(this.lastKey == GameConstants.Key.BOTTOM) {
        this.selectedButton++;
      }
  
      if(this.selectedButton >= this.buttons.length) {
        this.selectedButton = 0;
      } else if(this.selectedButton < 0) {
        this.selectedButton = this.buttons.length - 1;
      }
  
      for(var i = 0; i < this.buttons.length; i++) {
        if(this.buttons[i].autoHeight) {
          heightButtons += DrawUtils.wrapTextLines(ctx, this.buttons[i].text, null, this.buttons[i].getFontSize(ctx))["height"] + 8;
        } else {
          heightButtons += this.buttons[i].height + 5;
        }
      }
    }
  
    var totalHeight = heightText + heightButtons;
    var startY = ctx.canvas.height / 2 - totalHeight / 2 + 16;
    var currentY = startY + heightText;
  
    DrawUtils.drawText(ctx, this.text, this.colors, this.fontSize, this.fontFamily, this.alignement, "default", this.x, startY, true);
  
    if(this.buttons != null) {
      for(var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].y = currentY;
  
        if(this.selectedButton == i) {
          this.buttons[i].selected = true;
        } else {
          this.buttons[i].selected = false;
        }
  
        this.buttons[i].enable();
        this.buttons[i].draw(ctx);
  
        if(this.selectedButton == i && this.lastKey == GameConstants.Key.ENTER && this.buttons[i].triggerClick != null && !this.buttons[i].disabled) {
          this.lastKey = -1;
          this.selectedButton = 0;
          this.buttons[i].triggerClick();
          break;
        }
  
        currentY += this.buttons[i].height + 8;
      }
    }
  
    if(func != null) {
      func(true);
    }
  }

  this.lastKey = -1;
};

Menu.prototype.disable = function() {
  this.disabled = true;
};

Menu.prototype.enable = function() {
  this.disabled = false;
};

Menu.prototype.set = function(buttons, text, colors, alignement, x,) {
  Menu.apply(this, [buttons, text, colors, this.fontSize, this.fontFamily, alignement, x, this.backgroundColor, this.blurCanvas]);
  this.enable();
};

// Export module
if(typeof(module) !== "undefined") {
  module.exports = Menu
}