/*
 * Copyright (C) 2019 Eliastik (eliastiksofts.com)
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
// Modes :
IA_SOLO = "IA_SOLO";
JOUEUR_SOLO = "JOUEUR_SOLO";
JOUEUR_VS_IA = "JOUEUR_VS_IA";
IA_VS_IA = "IA_VS_IA";
IA_BATTLE_ROYALE = "IA_BATTLE_ROYALE";

var selectedMode = IA_SOLO;
var showDebugInfo = false;

function selectMode(mode) {
  selectedMode = mode;

  if(selectedMode == JOUEUR_SOLO) {
    document.getElementById("iaSettings").style.display = "none";
  } else {
    document.getElementById("iaSettings").style.display = "block";
  }

  displaySettings();
}

document.getElementById("iaSoloBtn").onclick = function() {
  selectMode(IA_SOLO);
};

document.getElementById("joueurSolo").onclick = function() {
  selectMode(JOUEUR_SOLO);
};

document.getElementById("joueurVsIa").onclick = function() {
  selectMode(JOUEUR_VS_IA);
};

document.getElementById("iaVsIa").onclick = function() {
  selectMode(IA_VS_IA);
};

document.getElementById("iaBattleRoyale").onclick = function() {
  selectMode(IA_BATTLE_ROYALE);
};

function displaySettings() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("settings").style.display = "block";
}

function displayMenu() {
  document.getElementById("settings").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

document.getElementById("backToMenu").onclick = function() {
  displayMenu();
};

document.getElementById("gameSpeed").onchange = function() {
  if(document.getElementById("gameSpeed").value == "custom") {
    document.getElementById("customSpeedSettings").style.display = "block";
  } else {
    document.getElementById("customSpeedSettings").style.display = "none";
  }
}

function validateSettings() {
  document.getElementById("settings").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  var heightGrid = document.getElementById("heightGrid").value;
  var widthGrid = document.getElementById("widthGrid").value;
  var borderWalls = document.getElementById("borderWalls").checked;
  var generateWalls = document.getElementById("generateWalls").checked;
  var speed = document.getElementById("gameSpeed").value;
  var progressiveSpeed = document.getElementById("progressiveSpeed").checked;
  var customSpeed = document.getElementById("customSpeed").value;
  var iaLevel = document.getElementById("iaLevel").value;
  var autoRetry = document.getElementById("autoRetry").checked;

  var formValidated = true;

  console.log(heightGrid, widthGrid, borderWalls, generateWalls, speed, progressiveSpeed, iaLevel, autoRetry);

  if(formValidated) {
    var games = [];

    if(selectedMode == IA_SOLO) {
      var grid = new Grid(5, 5, true, true);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_IA, IA_LEVEL_HIGH);

      games.push(new Game(grid, snake, 1, document.getElementById("gameContainer")));
    } else if(selectedMode == JOUEUR_SOLO) {
      var grid = new Grid(20, 20);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_HUMAN);

      games.push(new Game(grid, snake, 5, document.getElementById("gameContainer")));
    } else if(selectedMode == JOUEUR_VS_IA) {
      var grid = new Grid(20, 20);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_HUMAN);

      var grid2 = new Grid(20, 20);
      var snake2 = new Snake(RIGHT, 3, grid2, PLAYER_IA, IA_LEVEL_HIGH);

      games.push(new Game(grid, snake, 5, document.getElementById("gameContainer"), true, false, false));
      games.push(new Game(grid2, snake2, 5, document.getElementById("gameContainer"), false, false, false));
    } else if(selectedMode == IA_VS_IA) {
      var grid = new Grid(20, 20);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_IA, IA_LEVEL_HIGH);

      var grid2 = new Grid(20, 20);
      var snake2 = new Snake(RIGHT, 3, grid2, PLAYER_IA, IA_LEVEL_HIGH);

      games.push(new Game(grid, snake, 5, document.getElementById("gameContainer"), true, false, false));
      games.push(new Game(grid2, snake2, 5, document.getElementById("gameContainer"), true, false, false));
    } else if(selectedMode == IA_BATTLE_ROYALE) {
      for(var i = 0; i < 20; i++) {
        var grid = new Grid(20, 20);
        var snake = new Snake(RIGHT, 1, grid, PLAYER_IA, IA_LEVEL_HIGH);

        games.push(new Game(grid, snake, 1, document.getElementById("gameContainer"), true, false, false, 350, 250));
      }
    }

    var group = new GameGroup(games);
    group.start();

    group.onStop(function() {
      if(selectedMode == JOUEUR_VS_IA || selectedMode == IA_VS_IA || selectedMode == IA_BATTLE_ROYALE) {
        group.killAll();
        displayMenu();
      }
    });

    group.onExit(function() {
      if(selectedMode == IA_SOLO || selectedMode == JOUEUR_SOLO) {
        group.killAll();
        displayMenu();
      }
    });
  }
}

document.getElementById("validateSettings").onclick = function() {
  validateSettings();
};

function enableDebugMode() {
  showDebugInfo = true;
  console.log("Mode de debug activé");
}
