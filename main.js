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

  if(selectedMode == IA_BATTLE_ROYALE) {
    document.getElementById("numberIASettings").style.display = "block";
  } else {
    document.getElementById("numberIASettings").style.display = "none";
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
};

function resetForm(resetValues) {
  document.getElementById("invalidHeight").style.display = "none";
  document.getElementById("invalidWidth").style.display = "none";
  document.getElementById("heightGrid").classList.remove("is-invalid");
  document.getElementById("widthGrid").classList.remove("is-invalid");
  document.getElementById("gameSpeed").classList.remove("is-invalid");
  document.getElementById("invalidSpeed").style.display = "none";
  document.getElementById("customSpeed").classList.remove("is-invalid");
  document.getElementById("invalidCustomSpeed").style.display = "none";
  document.getElementById("iaLevel").classList.remove("is-invalid");
  document.getElementById("invalidIALevel").style.display = "none";
  document.getElementById("numberIA").classList.remove("is-invalid");
  document.getElementById("invalidIANumber").style.display = "none";

  if(resetValues) {
    document.getElementById("heightGrid").value = 20;
    document.getElementById("widthGrid").value = 20;
    document.getElementById("borderWalls").checked = false;
    document.getElementById("generateWalls").checked = false;
    document.getElementById("gameSpeed").value = 5;
    document.getElementById("progressiveSpeed").checked = false;
    document.getElementById("customSpeed").value = 5;
    document.getElementById("customSpeedSettings").style.display = "none";
    document.getElementById("iaLevel").value = "normal";
    document.getElementById("autoRetry").checked = false;
    document.getElementById("numberIA").value = 20;
  }
}

document.getElementById("resetSettings").onclick = function() {
  resetForm(true);
};

function validateSettings() {
  resetForm(false);

  var heightGrid = document.getElementById("heightGrid").value;
  var widthGrid = document.getElementById("widthGrid").value;
  var borderWalls = document.getElementById("borderWalls").checked;
  var generateWalls = document.getElementById("generateWalls").checked;
  var speed = document.getElementById("gameSpeed").value;
  var progressiveSpeed = document.getElementById("progressiveSpeed").checked;
  var customSpeed = document.getElementById("customSpeed").value;
  var iaLevel = document.getElementById("iaLevel").value;
  var autoRetry = document.getElementById("autoRetry").checked;
  var numberIA = document.getElementById("numberIA").value;

  var formValidated = true;

  if(heightGrid.trim() == "" || isNaN(heightGrid) || heightGrid < 5 || heightGrid > 100) {
    formValidated = false;
    document.getElementById("heightGrid").classList.add("is-invalid");
    document.getElementById("invalidHeight").style.display = "block";
  } else {
    heightGrid = parseInt(heightGrid);
  }

  if(widthGrid.trim() == "" || isNaN(widthGrid) || widthGrid < 5 || widthGrid > 100) {
    formValidated = false;
    document.getElementById("widthGrid").classList.add("is-invalid");
    document.getElementById("invalidWidth").style.display = "block";
  } else {
    widthGrid = parseInt(widthGrid);
  }

  if(speed != "custom" && (speed.trim() == "" || isNaN(speed) || speed < 1)) {
    formValidated = false;
    document.getElementById("gameSpeed").classList.add("is-invalid");
    document.getElementById("invalidSpeed").style.display = "block";
  } else if(speed != "custom") {
    speed = parseInt(speed);
  }

  if(speed == "custom" && (customSpeed.trim() == "" || isNaN(customSpeed) || customSpeed < 1)) {
    formValidated = false;
    document.getElementById("customSpeed").classList.add("is-invalid");
    document.getElementById("invalidCustomSpeed").style.display = "block";
  } else if(speed == "custom") {
    speed = parseInt(customSpeed);
  }

  if(selectedMode != JOUEUR_SOLO && (iaLevel != "low" && iaLevel != "normal" && iaLevel != "high")) {
    formValidated = false;
    document.getElementById("iaLevel").classList.add("is-invalid");
    document.getElementById("invalidIALevel").style.display = "block";
  } else if(selectedMode != JOUEUR_SOLO) {
    switch(iaLevel) {
      case "low":
        iaLevel = IA_LEVEL_LOW;
        break;
      case "normal":
        iaLevel = IA_LEVEL_DEFAULT;
        break;
      case "high":
        iaLevel = IA_LEVEL_HIGH;
        break;
      default:
        iaLevel = IA_LEVEL_DEFAULT;
        break;
    }
  }

  if(selectedMode == IA_BATTLE_ROYALE && (numberIA.trim() == "" || isNaN(numberIA) || numberIA < 2 || numberIA > 100)) {
    formValidated = false;
    document.getElementById("numberIA").classList.add("is-invalid");
    document.getElementById("invalidIANumber").style.display = "block";
  } else if(selectedMode == IA_BATTLE_ROYALE) {
    numberIA = parseInt(numberIA);
  }

  if(formValidated) {
    document.getElementById("settings").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";

    var titleGame = "";

    switch(selectedMode) {
      case IA_SOLO:
        titleGame = "IA solo";
        break;
      case JOUEUR_SOLO:
        titleGame = "Joueur solo";
        break;
      case JOUEUR_VS_IA:
        titleGame = "Joueur VS IA";
        break;
      case IA_VS_IA:
        titleGame = "IA VS IA";
        break;
      case IA_BATTLE_ROYALE:
        titleGame = "IA Battle Royale";
        break;
    }

    document.getElementById("titleGame").innerHTML = "Mode de jeu actuel : " + titleGame;

    var games = [];

    if(selectedMode == IA_SOLO) {
      var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_IA, iaLevel, autoRetry);

      games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed));
    } else if(selectedMode == JOUEUR_SOLO) {
      var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_HUMAN);

      games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed));
    } else if(selectedMode == JOUEUR_VS_IA) {
      var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_HUMAN);

      var grid2 = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
      var snake2 = new Snake(RIGHT, 3, grid2, PLAYER_IA, iaLevel, autoRetry);

      games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed));
      games.push(new Game(grid2, snake2, speed, document.getElementById("gameContainer"), false, false, progressiveSpeed));
    } else if(selectedMode == IA_VS_IA) {
      var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
      var snake = new Snake(RIGHT, 3, grid, PLAYER_IA, iaLevel, autoRetry);

      var grid2 = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
      var snake2 = new Snake(RIGHT, 3, grid2, PLAYER_IA, iaLevel, autoRetry);

      games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed));
      games.push(new Game(grid2, snake2, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed));
    } else if(selectedMode == IA_BATTLE_ROYALE) {
      for(var i = 0; i < numberIA; i++) {
        var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
        var snake = new Snake(RIGHT, 3, grid, PLAYER_IA, iaLevel, autoRetry);

        games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed, 350, 250));
      }
    }

    var group = new GameGroup(games);
    group.setDisplayFPS(showDebugInfo ? true : false);
    group.start();

    document.getElementById("backToMenuGame").onclick = function() {
      if(confirm("Êtes-vous sûr de vouloir retourner au menu ? Cela quittera toutes les parties actuelles.")) {
        group.killAll();
        displayMenu();
      }
    };

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
