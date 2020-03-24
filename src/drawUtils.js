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
}

var DrawUtils = {
  preRenderedFont: {},
  lastKey: -1,
  preRenderFont: function(cars, size, color, fontFamily) {
    cars.push("?"); cars.push(" "); cars.push("A");
    
    for(var i = 0; i < cars.length; i++) {
      var canvasTmp = document.createElement("canvas");
      var ctxTmp = canvasTmp.getContext("2d");
      ctxTmp.font = size + "px " + fontFamily;
      var width = ctxTmp.measureText(cars[i]).width;
      
      canvasTmp.width = width;
      canvasTmp.height = size + (size / 6);
      
      ctxTmp.font = size + "px " + fontFamily;
      ctxTmp.fillStyle = color;
      ctxTmp.textBaseline = "top";
      ctxTmp.fillText(cars[i], 0, 0);
      
      this.preRenderedFont[cars[i]] = canvasTmp;
    }
  },
  drawImage: function(ctx, image, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees) {
    this.drawImageWrapper(ctx, image, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees);
  },
  drawImageData: function(ctx, imageData, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees) {
    this.drawImageWrapper(ctx, imageData, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees);
  },
  drawImageWrapper: function(ctx, image, x, y, width, height, sx, sy, sWidth, sHeight, eraseBelow, degrees) {
    var x = (x == undefined || isNaN(x)) ? null : Math.round(x);
    var y = (y == undefined || isNaN(y)) ? null : Math.round(y);
    var width = (width == undefined || isNaN(width)) ? null : Math.round(width);
    var height = (height == undefined || isNaN(height)) ? null : Math.round(height);
    var sx = (sx == undefined || isNaN(sx)) ? null : Math.round(sx);
    var sy = (sy == undefined || isNaN(sy)) ? null : Math.round(sy);
    var sWidth = (sWidth == undefined || isNaN(sWidth)) ? null : Math.round(sWidth);
    var sHeight = (sHeight == undefined || isNaN(sHeight)) ? null : Math.round(sHeight);
    var eraseBelow = eraseBelow == undefined ? false : eraseBelow;
    var degrees = (degrees == undefined || isNaN(degrees)) ? null : degrees;
  
    if(degrees != undefined) {
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(degrees * Math.PI / 180);
      x = -(width / 2);
      y = -(height / 2);
    }
  
    if(eraseBelow) {
      ctx.clearRect(x, y, width, height);
    }
  
    if(ctx != undefined && image != undefined) {
      if(sx != undefined && sy != undefined && sWidth != undefined && sHeight != undefined) {
        ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
      } else {
        ctx.drawImage(image, x, y, width, height);
      }
    }
  
    if(degrees != undefined) {
      ctx.restore();
    }
  },
  drawText: function(ctx, text, color, size, fontFamily, alignement, verticalAlignement, x, y, wrap, bold) {
    var precFillStyle = ctx.fillStyle;
    var precFont = ctx.font;
    var precFilter = ctx.filter;

    if(!Array.isArray(color)) {
      ctx.fillStyle = color;
    }

    ctx.font = (bold ? "bold " : "") + size + "px " + fontFamily;
    ctx.filter = "none";

    if(wrap) {
      text = this.wrapTextLines(ctx, text)["text"];
    }
    
    var lines = text.split("\n");

    if(verticalAlignement == "center") {
      y = (ctx.canvas.height / 2) - (size * lines.length / 2);
    } else if(verticalAlignement == "top") {
      y = 5;
    } else if(verticalAlignement == "bottom") {
      y = (ctx.canvas.height) - (size * lines.length) / 2 - size / 5;
    }

    for(var i = 0; i < lines.length; i++) {
      var currentText = lines[i];

      if(Array.isArray(color)) {
        var colorIndex = i;

        if(colorIndex > color.length - 1) {
          colorIndex = color.length - 1;
        }

        ctx.fillStyle = color[colorIndex];
      }

      if(alignement == "center") {
        ctx.fillText(currentText, Math.round((ctx.canvas.width / 2) - (ctx.measureText(currentText).width / 2)), Math.round(y + (size * i)));
      } else if(alignement == "right") {
        ctx.fillText(currentText, Math.round((ctx.canvas.width) - (ctx.measureText(currentText).width) - 15), Math.round(y + (size * i)));
      } else if(alignement == "left") {
        ctx.fillText(currentText, 5, Math.round(y + (size * i)));
      } else {
        ctx.fillText(currentText, Math.round(x), Math.round(y + (size * i)));
      }
    }

    ctx.fillStyle = precFillStyle;
    ctx.font = precFont;
    ctx.filter = precFilter;

    return {
      x: x,
      y: y,
      height: size * lines.length
    };
  },
  drawTextBitmap: function(ctx, bitmapFontSet, text, size, x, y, wrap) {
    if(bitmapFontSet == undefined || bitmapFontSet == null) {
      this.preRenderedFont = {};
      DrawUtils.preRenderFont(GameConstants.Setting.CARS_TO_PRERENDER, GameConstants.Setting.FONT_SIZE * 2, "white", GameConstants.Setting.FONT_FAMILY);
      bitmapFontSet = this.preRenderedFont;
    }

    if(wrap) {
      var testCar = bitmapFontSet["A"];
      text = this.wrapTextLines(ctx, text, testCar.width * (size / testCar.height), size)["text"];
    }

    var lines = text.split("\n");
    var currentY = y;

    for(var i = 0; i < lines.length; i++) {
      var currentText = lines[i];
      var currentX = x;

      for(var j = 0; j < currentText.length; j++) {
        var currentCar = currentText.charAt(j);

        if(bitmapFontSet[currentCar] == undefined || bitmapFontSet[currentCar] == null) {
          var currentCarBitmap = bitmapFontSet["?"];
        } else {
          var currentCarBitmap = bitmapFontSet[currentCar];
        }

        var widthBitmap = currentCarBitmap.width * (size / currentCarBitmap.height);
        DrawUtils.drawImageData(ctx, currentCarBitmap, currentX, currentY, widthBitmap, size, 0, 0, currentCarBitmap.width, currentCarBitmap.height);
        currentX += widthBitmap;
      }

      if(currentText.length > 0) {
        currentY += size;
      }
    }
  },
  wrapText: function(text, limit) {
    if(text.length > limit) {
      var p = limit;

      for(; p > 0 && text[p] != " "; p--);

      if(p > 0) {
        var left = text.substring(0, p);
        var right = text.substring(p + 1);
        return left + "\n" + this.wrapText(right, limit);
      }
    }

    return text;
  },
  wrapTextLines: function(ctx, text, width, fontSize) {
    var lines = text.split("\n");
    var newText = "";
    var widthCar = width || ctx.measureText("A").width;
    var nbCarLine = Math.round(ctx.canvas.width / widthCar);
    var heightTotal = 0;

    for(var i = 0; i < lines.length; i++) {
      var lineWrap = this.wrapText(lines[i], nbCarLine);
      newText += lineWrap;

      if(i < lines.length - 1) {
        newText += "\n";
      }

      for(var j = 0; j < lineWrap.split("\n").length; j++) {
        heightTotal += parseFloat(fontSize);
      }
    }

    return {
      text: newText,
      height: heightTotal
    };
  },
  drawArrow: function(ctx, fromx, fromy, tox, toy) {
    var lineCap = ctx.lineCap;
    var lineWidth = ctx.lineWidth;
    var strokeStyle = ctx.strokeStyle;
    var filter = ctx.filter;
    ctx.lineCap = "round";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#FF0000";
    ctx.filter = "";
  
    ctx.beginPath();
    var headlen = 20;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  
    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.filter = filter;
  },
  clear: function(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },
  isFilterHueAvailable: function() {
    var canvas = document.createElement("canvas");
    canvas.width = 5;
    canvas.height = 5;
    var ctx = canvas.getContext("2d");
  
    ctx.fillStyle = "#FF0000";
    ctx.filter = "hue-rotate(90deg)";
    ctx.fillRect(0, 0, 5, 5);
    var color = ctx.getImageData(0, 0, 1, 1).data;
  
    if(color[0] == 255 && color[1] == 0 && color[2] == 0) {
      return false;
    }
  
    return true;
  },
  blurCanvas: function(ctx, length) {
    ctx.save();
    ctx.filter = "blur(" + length  + "px)";
    this.drawImageData(ctx, ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  }
};

// Export module
if(typeof(module) !== "undefined") {
    module.exports = DrawUtils;
}