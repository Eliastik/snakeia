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
  var i18next = require("./libs/i18next.min");
  var Game = require("./src/shim");
  var GameConstants = require("./src/constants");
  var Snake = require("./src/snake");
  var Grid = require("./src/grid");
  var NotificationMessage = require('./src/notificationMessage');
  var GameGroup = require('./src/gameGroup');
  var OnlineClient = require('./src/onlineClient');
  var GameUI = require('./src/gameUI.js');
}

// Modes :
window.SOLO_AI = "SOLO_AI";
window.SOLO_PLAYER = "SOLO_PLAYER";
window.PLAYER_VS_AI = "PLAYER_VS_AI";
window.AI_VS_AI = "AI_VS_AI";
window.BATTLE_ROYALE = "BATTLE_ROYALE";
window.BATTLE_ROYALE_ONLINE = "BATTLE_ROYALE_ONLINE";
// URIs :
window.UPDATER_URI = "https://www.eliastiksofts.com/snakeia/update.php";
window.SERVERS_LIST_URI = "https://www.eliastiksofts.com/snakeia/serversList.php";
// Levels types :
window.LEVEL_REACH_SCORE = "LEVEL_REACH_SCORE";
window.LEVEL_REACH_MAX_SCORE = "LEVEL_REACH_MAX_SCORE";
window.LEVEL_MULTI_BEST_SCORE = "LEVEL_MULTI_BEST_SCORE";
window.LEVEL_MULTI_REACH_SCORE_FIRST = "LEVEL_MULTI_REACH_SCORE_FIRST";
window.LEVEL_REACH_SCORE_ON_TIME = "LEVEL_REACH_SCORE_ON_TIME";
window.LEVEL_MAZE_WIN = "LEVEL_MAZE_WIN";
window.DEFAULT_LEVEL = "DEFAULT_LEVEL";
window.DOWNLOADED_LEVEL = "DOWNLOADED_LEVEL";
// Default levels :
// Level model : { settings: [heightGrid, widthGrid, borderWalls, generateWalls, sameGrid, speed, progressiveSpeed, aiLevel, numberIA, generateMaze, customGrid, mazeForceAuto], type: levelType(see below), typeValue: levelTypeValue(score, time, ...), version: (version min to play the level) }
window.DEFAULT_LEVELS_SOLO_PLAYER = {
  1: { settings: [20, 20, false, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 20, version: GameConstants.Setting.APP_VERSION },
  2: { settings: [20, 20, true, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 20, version: GameConstants.Setting.APP_VERSION },
  3: { settings: [20, 20, true, true, true, 15, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 15, version: GameConstants.Setting.APP_VERSION },
  4: { settings: [20, 20, false, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE_ON_TIME, typeValue: [20, 60], version: GameConstants.Setting.APP_VERSION },
  5: { settings: [10, 10, true, false, true, 15, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 20, version: GameConstants.Setting.APP_VERSION },
  6: { settings: [15, 15, true, true, true, 15, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 20, version: GameConstants.Setting.APP_VERSION },
  7: { settings: [15, 15, false, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE_ON_TIME, typeValue: [20, 45], version: GameConstants.Setting.APP_VERSION },
  8: { settings: [20, 20, false, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 35, version: GameConstants.Setting.APP_VERSION },
  9: { settings: [15, 15, false, false, false, null, false, null, 1], type: LEVEL_MULTI_BEST_SCORE, typeValue: null, version: GameConstants.Setting.APP_VERSION },
  10: { settings: [10, 10, false, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE_ON_TIME, typeValue: [10, 15], version: GameConstants.Setting.APP_VERSION },
  11: { settings: [20, 20, false, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 50, version: GameConstants.Setting.APP_VERSION },
  12: { settings: [20, 20, true, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 50, version: GameConstants.Setting.APP_VERSION },
  13: { settings: [20, 20, true, true, true, 15, false, null, 0], type: LEVEL_REACH_SCORE_ON_TIME, typeValue: [15, 60], version: GameConstants.Setting.APP_VERSION },
  14: { settings: [20, 20, true, false, true, 5, true, null, 0], type: LEVEL_REACH_SCORE, typeValue: 30, version: GameConstants.Setting.APP_VERSION },
  15: { settings: [15, 15, false, false, true, null, false, null, 1], type: LEVEL_REACH_SCORE_ON_TIME, typeValue: [15, 60], version: GameConstants.Setting.APP_VERSION },
  16: { settings: [20, 20, false, false, true, null, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 75, version: GameConstants.Setting.APP_VERSION },
  17: { settings: [15, 15, true, false, true, 15, false, null, 2], type: LEVEL_MULTI_BEST_SCORE, typeValue: null, version: GameConstants.Setting.APP_VERSION },
  18: { settings: [5, 5, true, false, true, 25, false, null, 0], type: LEVEL_REACH_MAX_SCORE, typeValue: null, version: GameConstants.Setting.APP_VERSION },
  19: { settings: [5, 5, false, true, true, 10, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 10, version: GameConstants.Setting.APP_VERSION },
  20: { settings: [20, 20, false, true, true, 15, false, null, 0], type: LEVEL_REACH_SCORE, typeValue: 50, version: GameConstants.Setting.APP_VERSION }
};
window.SOLO_PLAYER_SAVE = "snakeia_solo_player_";
window.DEFAULT_LEVELS_SOLO_AI = DEFAULT_LEVELS_SOLO_PLAYER;
window.SOLO_AI_SAVE = "snakeia_solo_ai_";
// Downloadable levels :
window.DOWNLOAD_DEFAULT_URI = "https://www.eliastiksofts.com/snakeia/downloadLevels.php?player={player}&ver={appVersion}";
window.SOLO_PLAYER_DOWNLOAD_LEVELS_TO = "snakeia_solo_player_downloadedLevels";
window.SOLO_AI_DOWNLOAD_LEVELS_TO = "snakeia_solo_ai_downloadedLevels";

var selectedMode = SOLO_AI;
var enableAnimations = true;
var showDebugInfo = false;
var onlineClient = new OnlineClient();

document.getElementById("versionTxt").innerHTML = GameConstants.Setting.APP_VERSION;
document.getElementById("appVersion").innerHTML = GameConstants.Setting.APP_VERSION;
document.getElementById("dateTxt").innerHTML = DATE_VERSION;
document.getElementById("appUpdateDate").innerHTML = DATE_VERSION;

document.getElementById("enableAnimations").onchange = function() {
  enableAnimations = this.checked;
};

// Libs
String.prototype.strcmp = function(str) {
  return ((this == str) ? 0 : ((this > str) ? 1 : -1));
};

// https://github.com/MichalZalecki/storage-factory
function storageFactory(storage) {
  var inMemoryStorage = {};

  try {
    var storage = storage || window.localStorage;
  } catch(e) {
    var storage = null;
  }

  function isSupported() {
    try {
      var testKey = "__some_random_key_you_are_not_going_to_use__";
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch(e) {
      return false;
    }
  }

  this.isSupported = function() {
    return isSupported();
  };

  this.clear = function() {
    if(isSupported()) {
      storage.clear();
    } else {
      inMemoryStorage = {};
    }
  }

  this.getItem = function(name) {
    if(isSupported()) {
      return storage.getItem(name);
    }

    if(inMemoryStorage.hasOwnProperty(name)) {
      return inMemoryStorage[name];
    }

    return null;
  }

  this.key = function(index) {
    if(isSupported()) {
      return storage.key(index);
    } else {
      return Object.keys(inMemoryStorage)[index] || null;
    }
  }

  this.removeItem = function(name) {
    if(isSupported()) {
      storage.removeItem(name);
    } else {
      delete inMemoryStorage[name];
    }
  }

  this.setItem = function(name, value) {
    if(isSupported()) {
      storage.setItem(name, value);
    } else {
      inMemoryStorage[name] = String(value);
    }
  }

  this.length = function() {
    if(isSupported()) {
      return storage.length;
    } else {
      return Object.keys(inMemoryStorage).length;
    }
  }
}

var storageGlobal = new storageFactory();

if(!storageGlobal.isSupported()) {
  document.getElementById("localstorageDisabled").style.display = "block";
}

function Timer(callback, delay, timerInterval) {
  var timerId, start, remaining = delay;

  this.pause = function() {
    window.clearTimeout(timerId);
    timerInterval != null && timerInterval.stop != null && timerInterval.stop();
    remaining -= Date.now() - start;
  };

  this.resume = function() {
    start = Date.now();
    window.clearTimeout(timerId);
    timerInterval != null && timerInterval.stop != null && timerInterval.stop();
    timerId = window.setTimeout(callback, remaining);
    timerInterval != null && timerInterval.start != null && timerInterval.start();
  };

  this.reset = function() {
    window.clearTimeout(timerId);
    timerInterval != null && timerInterval.stop != null && timerInterval.stop();
    remaining = delay;
  };

  this.getTime = function() {
    return remaining - (Date.now() - start);
  };
}

function TimerInterval(callback) {
  this.interval;

  this.start = function() {
    this.interval = setInterval(callback, 1000);
  };

  this.stop = function() {
    clearInterval(this.interval);
  };
}

window.enableDebugMode = function() {
  showDebugInfo = true;
  console.log(i18next.t("debugModeEnabled"));
}

// Updater
function checkUpdate() {
  var script = document.createElement("script");
  script.src = UPDATER_URI;

  document.getElementsByTagName('head')[0].appendChild(script);
}

window.updateCallback = function(data) {
  if(typeof(data) !== "undefined" && data !== null && typeof(data.version) !== "undefined" && data.version !== null) {
    var newVersionTest = GameConstants.Setting.APP_VERSION.strcmp(data.version);

    if(newVersionTest < 0) {
      document.getElementById("updateAvailable").style.display = "block";
      document.getElementById("appUpdateVersion").textContent = data.version;

      var appUpdateDate = DATE_VERSION;

      if(typeof(data.date) !== "undefined" && data.date !== null) {
          var appUpdateDate = data.date;
      }

      document.getElementById("appUpdateDate").textContent = appUpdateDate;

      var downloadURL = "http://eliastiksofts.com/snakeia/downloads/index.php";

      if(typeof(data.url) !== "undefined" && data.url !== null) {
          var downloadURL = data.url;
      }

      document.getElementById("appDownloadLink").onclick = function() {
          window.open(downloadURL, '_blank');
      };

      document.getElementById("appDownloadURLGet").onclick = function() {
          prompt(i18next.t("update.URLToDownload"), downloadURL);
      };

      var changes = i18next.t("update.noChanges");

      if(typeof(data.changes) !== "undefined" && data.changes !== null) {
          var changes = data.changes;
      }

      document.getElementById("appUpdateChanges").onclick = function() {
          alert(i18next.t("update.changes") + "\n" + changes);
      };

      translateContent();
    }
  }
}

checkUpdate();

// Load server list
function loadServerList() {
  var script = document.createElement("script");
  script.src = SERVERS_LIST_URI;

  document.getElementsByTagName('head')[0].appendChild(script);
  document.getElementById("loadingServersList").style.display = "inline-block";
  document.getElementById("serverListGroup").innerHTML = "";
}

window.listServersCallback = function(data) {
  document.getElementById("serverListGroup").innerHTML = "";

  if(data != null && data.length > 0) {
    for(var i = 0; i < data.length; i++) {
      if(data[i]["url"] != null && data[i]["port"] != null) {
        var url = data[i]["url"];
        var port = data[i]["port"];

        var linkServer = document.createElement("a");
        linkServer.classList.add("list-group-item");
        linkServer.classList.add("list-group-item-action");
        linkServer.textContent = data[i]["name"];

        linkServer.onclick = function() {
          connectToServer(url, port);
        };
  
        var serverAddress = document.createElement("div");
        serverAddress.classList.add("small");
        serverAddress.classList.add("text-muted");
        serverAddress.textContent = url + ":" + port;
        linkServer.appendChild(serverAddress);
  
        document.getElementById("serverListGroup").appendChild(linkServer);
      }
    }
  } else {
    var noServerFound = document.createElement("strong");
    noServerFound.textContent = i18next.t("servers.noServerFound");

    document.getElementById("serverListGroup").appendChild(noServerFound);
  }

  var linkCustomServerIcon = document.createElement("span");
  linkCustomServerIcon.classList.add("fui-new");
  linkCustomServerIcon.classList.add("mr-2");

  var linkCustomServerText = document.createElement("span");
  linkCustomServerText.textContent = i18next.t("servers.customServer");

  var linkCustomServer = document.createElement("a");
  linkCustomServer.classList.add("list-group-item");
  linkCustomServer.classList.add("list-group-item-action");
  
  linkCustomServer.appendChild(linkCustomServerIcon);
  linkCustomServer.appendChild(linkCustomServerText);

  linkCustomServer.onclick = function() {
    var url = prompt(i18next.t("servers.enterCustomServer"), "http://");

    if(url.trim() != "") {
      connectToServer(url);
    }
  };
  
  document.getElementById("serverListGroup").appendChild(linkCustomServer);
  document.getElementById("loadingServersList").style.display = "none";
}

function connectToServer(url, port) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("levelContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("serverListContainer").style.display = "none";
  document.getElementById("roomsOnlineListContainer").style.display = "none";
  document.getElementById("roomsOnlineCreation").style.display = "none";
  document.getElementById("errorRoomCreation").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("connectingToServer").style.display = "block";
  document.getElementById("roomsOnlineJoin").style.display = "none";

  onlineClient.connect(url, port, function(success) {
    document.getElementById("connectingToServer").style.display = "none";

    if(!success) {
      alert(i18next.t("servers.connectionError"));
      displayServerList();
    } else {
      displayRoomsList();
    }
  });
}

document.getElementById("cancelConnectingToServer").onclick = function() {
  document.getElementById("connectingToServer").style.display = "none";
  onlineClient.disconnect();
  displayServerList();
};

function displayRooms() {
  document.getElementById("loadingRoomsOnlineList").style.display = "inline-block";
  document.getElementById("roomsOnlineListGroup").innerHTML = "";
  document.getElementById("refreshRooms").disabled = "disabled";

  onlineClient.displayRooms(function(data) { // Request rooms data
    document.getElementById("roomsOnlineListGroup").innerHTML = "";
    document.getElementById("errorRoomsList").style.display = "none";
    document.getElementById("refreshRooms").disabled = "";
  
    if(data != null && data.error) {
      document.getElementById("errorRoomsList").style.display = "block";
    } else if(data != null && Object.keys(data).length > 0) {
      for(var i = 0; i < Object.keys(data).length; i++) {
        var room = data[Object.keys(data)[i]];
        var code = room["code"];
  
        var linkRoom = document.createElement("a");
        linkRoom.classList.add("list-group-item");
        linkRoom.classList.add("list-group-item-action");
        linkRoom.textContent = i18next.t("servers.room", { number: (i + 1) });
  
        linkRoom.onclick = function() {
          joinRoom(code);
        };
  
        var gameInfos = document.createElement("div");
        gameInfos.classList.add("small");
        gameInfos.classList.add("text-muted");
        gameInfos.textContent = i18next.t("servers.infos", { width : room.width, height: room.height, speed: room.speed });
  
        var gameInfosSecond = document.createElement("div");
        gameInfosSecond.classList.add("small");
        gameInfosSecond.classList.add("text-muted");
        gameInfosSecond.textContent = room.borderWalls ? i18next.t("servers.infosBorderWalls") : "";
        
        var gameInfosThird = document.createElement("div");
        gameInfosThird.classList.add("small");
        gameInfosThird.classList.add("text-muted");
        gameInfosThird.textContent = room.generateWalls ? i18next.t("servers.infosGenerateWalls") : "";
  
        var gameInfosPlayers = document.createElement("div");
        gameInfosPlayers.classList.add("small");
        gameInfosPlayers.classList.add("text-muted");
        gameInfosPlayers.textContent = i18next.t("servers.infosPlayers", { count : room.players });
  
        linkRoom.appendChild(gameInfos);
        linkRoom.appendChild(gameInfosSecond);
        linkRoom.appendChild(gameInfosThird);
        linkRoom.appendChild(gameInfosPlayers);
  
        document.getElementById("roomsOnlineListGroup").appendChild(linkRoom);
      }
    } else {
      var noRoomFound = document.createElement("strong");
      noRoomFound.textContent = i18next.t("servers.noRoomound");
  
      document.getElementById("roomsOnlineListGroup").appendChild(noRoomFound);
    }
      
    document.getElementById("loadingRoomsOnlineList").style.display = "none";
  });
}

document.getElementById("refreshRooms").onclick = function() {
  displayRooms();
};

function joinRoom(code) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("levelContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("serverListContainer").style.display = "none";
  document.getElementById("roomsOnlineListContainer").style.display = "none";
  document.getElementById("roomsOnlineCreation").style.display = "none";
  document.getElementById("errorRoomCreation").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById("connectingToServer").style.display = "none";
  document.getElementById("roomsOnlineJoin").style.display = "block";

  onlineClient.joinRoom(code, function(data) {
    document.getElementById("roomsOnlineJoin").style.display = "none";

    if(data.success) {
      var ui = new GameUI(null, document.getElementById("gameContainer"));
      var game = onlineClient.getGame(ui);
      game.init();

      document.getElementById("gameContainer").style.display = "block";
      document.getElementById("titleGame").innerHTML = i18next.t("game.currentMode") + " " + i18next.t("menu.onlineBattleRoyale");

      game.setDisplayFPS(showDebugInfo ? true : false);

      if(ui.canvas != undefined) {
        ui.canvas.scrollIntoView();
      }

      game.onExit(function() {
        onlineClient.stopGame();
        displayRoomsList();
      });

      game.onKill(function() {
        onlineClient.stopGame();
        displayRoomsList();
      });

      document.getElementById("backToMenuGame").onclick = function() {
        if(confirm(i18next.t("game.confirmQuit"))) {
          onlineClient.stopGame();
          displayRoomsList();
          group = null;
        }
      };
    } else {
      alert(i18next.t("servers.connectionError"));
      displayServerList();
    }
  });
}

document.getElementById("joinPrivateRoom").onclick = function() {
  var code = prompt(i18next.t("servers.enterCode"));

  if(code != null) {
    joinRoom(code);
  }
};

// Simple modes
function selectMode(mode) {
  selectedMode = mode;

  if(selectedMode == SOLO_PLAYER) {
    document.getElementById("iaSettings").style.display = "none";
  } else {
    document.getElementById("iaSettings").style.display = "block";
  }

  if(selectedMode == SOLO_AI) {
    document.getElementById("autoRetrySettings").style.display = "block";
  } else {
    document.getElementById("autoRetrySettings").style.display = "none";
  }

  if(selectedMode == BATTLE_ROYALE) {
    document.getElementById("numberIASettings").style.display = "block";
  } else {
    document.getElementById("numberIASettings").style.display = "none";
  }

  if(selectedMode == PLAYER_VS_AI || selectedMode == AI_VS_AI || selectedMode == BATTLE_ROYALE) {
    document.getElementById("sameGridDiv").style.display = "block";
  } else {
    document.getElementById("sameGridDiv").style.display = "none";
  }

  if(selectedMode == SOLO_AI || selectedMode == SOLO_PLAYER) {
    document.getElementById("mazeGridDiv").style.display = "block";
  } else {
    document.getElementById("mazeGridDiv").style.display = "none";
  }

  if(selectedMode == BATTLE_ROYALE_ONLINE) {
    document.getElementById("sameGridDiv").style.display = "none";
    document.getElementById("mazeGridDiv").style.display = "none";
    document.getElementById("iaSettings").style.display = "none";
    document.getElementById("autoRetrySettings").style.display = "none";
    document.getElementById("progressiveSpeedDiv").style.display = "none";
    document.getElementById("privateGameDiv").style.display = "block";
  } else {
    document.getElementById("privateGameDiv").style.display = "none";
  }

  displaySettings();
}

document.getElementById("soloAi").onclick = function() {
  selectMode(SOLO_AI);
};

document.getElementById("soloPlayer").onclick = function() {
  selectMode(SOLO_PLAYER);
};

document.getElementById("playerVsAi").onclick = function() {
  selectMode(PLAYER_VS_AI);
};

document.getElementById("aiVsAi").onclick = function() {
  selectMode(AI_VS_AI);
};

document.getElementById("battleRoyale").onclick = function() {
  selectMode(BATTLE_ROYALE);
};

document.getElementById("createRoom").onclick = function() {
  selectMode(BATTLE_ROYALE_ONLINE);
};

function displaySettings() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("levelContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("serverListContainer").style.display = "none";
  document.getElementById("roomsOnlineListContainer").style.display = "none";
  document.getElementById("roomsOnlineCreation").style.display = "none";
  document.getElementById("errorRoomCreation").style.display = "none";
  document.getElementById("settings").style.display = "block";
  document.getElementById("connectingToServer").style.display = "none";
  document.getElementById("roomsOnlineJoin").style.display = "none";
  checkSameGrid();
  checkGameSpeed();
  checkPlayer();
  checkFailSettings();
  checkMazeGrid();

  if(selectedMode == BATTLE_ROYALE_ONLINE) {
    document.getElementById("backToMenu").onclick = function() {
      displayRoomsList();
    };
  } else {
    document.getElementById("backToMenu").onclick = function() {
      displayMenu();
    };
  }
}

function displayMenu() {
  document.getElementById("settings").style.display = "none";
  document.getElementById("levelContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("serverListContainer").style.display = "none";
  document.getElementById("roomsOnlineListContainer").style.display = "none";
  document.getElementById("roomsOnlineCreation").style.display = "none";
  document.getElementById("errorRoomCreation").style.display = "none";
  document.getElementById("menu").style.display = "block";
  document.getElementById("connectingToServer").style.display = "none";
  document.getElementById("roomsOnlineJoin").style.display = "none";
}

document.getElementById("backToMenu").onclick = function() {
  displayMenu();
};

document.getElementById("backToMenuLevelList").onclick = function() {
  displayMenu();
};

document.getElementById("backToMenuServerList").onclick = function() {
  displayMenu();
};

function displayServerList() {
  selectMode(BATTLE_ROYALE_ONLINE);
  document.getElementById("settings").style.display = "none";
  document.getElementById("levelContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("serverListContainer").style.display = "block";
  document.getElementById("roomsOnlineListContainer").style.display = "none";
  document.getElementById("roomsOnlineCreation").style.display = "none";
  document.getElementById("errorRoomCreation").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("connectingToServer").style.display = "none";
  document.getElementById("roomsOnlineJoin").style.display = "none";
  loadServerList();
}

document.getElementById("onlineBattleRoyale").onclick = function() {
  displayServerList();
};

document.getElementById("backToServersRoomsList").onclick = function() {
  displayServerList();
};

function displayRoomsList() {
  document.getElementById("settings").style.display = "none";
  document.getElementById("levelContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("serverListContainer").style.display = "none";
  document.getElementById("roomsOnlineListContainer").style.display = "block";
  document.getElementById("roomsOnlineCreation").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("connectingToServer").style.display = "none";
  document.getElementById("roomsOnlineJoin").style.display = "none";
  displayRooms();
}

function displayLevelList(player) {
  document.getElementById("settings").style.display = "none";
  document.getElementById("levelContainer").style.display = "block";
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("serverListContainer").style.display = "none";
  document.getElementById("roomsOnlineListContainer").style.display = "none";
  document.getElementById("roomsOnlineCreation").style.display = "none";
  document.getElementById("errorRoomCreation").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("connectingToServer").style.display = "none";
  document.getElementById("roomsOnlineJoin").style.display = "none";
  document.getElementById("levelDownloading").innerHTML = "";
  document.getElementById("btnDeblockDiv").innerHTML = "";

  if(player == PLAYER_HUMAN) {
    document.getElementById("titleLevelList").innerHTML = i18next.t("levels.titlePlayer");
    document.getElementById("levelListDefault").innerHTML = getListLevel(PLAYER_HUMAN, DEFAULT_LEVEL);
    document.getElementById("levelListDownloadAI").style.display = "none";
    document.getElementById("levelListDownloadPlayer").style.display = "block";
    document.getElementById("levelListDownloadPlayer").innerHTML = getListLevel(PLAYER_HUMAN, DOWNLOADED_LEVEL);
  } else if(player == PLAYER_AI) {
    document.getElementById("titleLevelList").innerHTML = i18next.t("levels.titleAI");
    document.getElementById("levelListDefault").innerHTML = getListLevel(PLAYER_AI, DEFAULT_LEVEL);
    document.getElementById("levelListDownloadAI").style.display = "block";
    document.getElementById("levelListDownloadPlayer").style.display = "none";
    document.getElementById("levelListDownloadAI").innerHTML = getListLevel(PLAYER_AI, DOWNLOADED_LEVEL);
  }
}

document.getElementById("levelsSoloPlayer").onclick = function() {
  displayLevelList(PLAYER_HUMAN);
};

document.getElementById("levelsSoloAI").onclick = function() {
  displayLevelList(PLAYER_AI);
};

function checkSameGrid() {
  if(document.getElementById("sameGrid").checked && (selectedMode == PLAYER_VS_AI || selectedMode == AI_VS_AI || selectedMode == BATTLE_ROYALE)) {
    document.getElementById("progressiveSpeed").checked = false;
    document.getElementById("progressiveSpeed").disabled = true;
    document.getElementById("autoRetry").checked = false;
    document.getElementById("autoRetry").disabled = true;
  } else {
    document.getElementById("progressiveSpeed").disabled = false;
    document.getElementById("autoRetry").disabled = false;
  }
}

function checkGameSpeed() {
  if(document.getElementById("gameSpeed").value == "custom") {
    document.getElementById("customSpeedSettings").style.display = "block";
  } else {
    document.getElementById("customSpeedSettings").style.display = "none";
  }
}

document.getElementById("gameSpeed").onchange = function() {
  checkGameSpeed();
};

function checkPlayer() {
  if(selectedMode == SOLO_PLAYER || selectedMode == PLAYER_VS_AI || (selectedMode == BATTLE_ROYALE && document.getElementById("battleAgainstAIs").checked)) {
    document.getElementById("playerSettings").style.display = "block";
  } else {
    document.getElementById("playerSettings").style.display = "none";
  }
}

function checkMazeGrid() {
  if(document.getElementById("mazeGrid").checked && (selectedMode == SOLO_AI || selectedMode == SOLO_PLAYER)) {
    document.getElementById("borderWalls").checked = false;
    document.getElementById("borderWalls").disabled = true;
    document.getElementById("generateWalls").checked = false;
    document.getElementById("generateWalls").disabled = true;
    document.getElementById("aiAssistant").checked = false;
    document.getElementById("aiAssistant").disabled = true;
  } else {
    document.getElementById("borderWalls").disabled = false;
    document.getElementById("generateWalls").disabled = false;
    document.getElementById("aiAssistant").disabled = false;
  }
}

function gameCanFailToInit(heightGrid, widthGrid, borderWalls, generateWalls, numberPlayers) {
  var heightGrid = parseInt(heightGrid);
  var widthGrid = parseInt(widthGrid);

  var numberEmptyCases = heightGrid * widthGrid;

  if(borderWalls) {
    numberEmptyCases -= (((widthGrid + heightGrid) * 2) - 4);
  }

  if(generateWalls) {
    if(borderWalls) {
      numberEmptyCases -= ((heightGrid * widthGrid) * 0.1);
    } else {
      numberEmptyCases -= ((heightGrid * widthGrid) * 0.1675);
    }
  }

  var neededCases = numberPlayers * 5;

  if(numberEmptyCases >= neededCases) {
    return false;
  } else {
    return true;
  }
}

function checkFailSettings() {
  document.getElementById("possibleFailInitGame").style.display = "none";

  if(validateSettings(true)) {
    var heightGrid = document.getElementById("heightGrid").value;
    var widthGrid = document.getElementById("widthGrid").value;
    var borderWalls = document.getElementById("borderWalls").checked;
    var generateWalls = document.getElementById("generateWalls").checked;
    var sameGrid = document.getElementById("sameGrid").checked;
    var numberIA = document.getElementById("numberIA").value;
    var battleAgainstAIs = document.getElementById("battleAgainstAIs").checked;

    var numberPlayers = 1;

    if(selectedMode == PLAYER_VS_AI || selectedMode == AI_VS_AI) {
      if(sameGrid) {
        numberPlayers = 2;
      }
    } else if(selectedMode == BATTLE_ROYALE) {
      if(sameGrid) {
        if(battleAgainstAIs) {
          numberPlayers = parseInt(numberIA) + 1;
        } else {
          numberPlayers = numberIA;
        }
      }
    }

    if(gameCanFailToInit(heightGrid, widthGrid, borderWalls, generateWalls, numberPlayers)) {
      document.getElementById("possibleFailInitGame").style.display = "block";
    }
  }
}

document.getElementById("heightGrid").onchange = function() {
  checkFailSettings();
};

document.getElementById("widthGrid").onchange = function() {
  checkFailSettings();
};

document.getElementById("borderWalls").onchange = function() {
  checkFailSettings();
};

document.getElementById("generateWalls").onchange = function() {
  checkFailSettings();
};

document.getElementById("sameGrid").onchange = function() {
  checkSameGrid();
  checkGameSpeed();
  checkFailSettings();
};

document.getElementById("numberIA").onchange = function() {
  checkFailSettings();
};

document.getElementById("battleAgainstAIs").onchange = function() {
  checkPlayer();
  checkFailSettings();
};

document.getElementById("mazeGrid").onchange = function() {
  checkMazeGrid();
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
  document.getElementById("aiLevel").classList.remove("is-invalid");
  document.getElementById("invalidaiLevel").style.display = "none";
  document.getElementById("numberIA").classList.remove("is-invalid");
  document.getElementById("invalidIANumber").style.display = "none";
  document.getElementById("resultLevels").innerHTML = "";
  document.getElementById("gameStatus").innerHTML = "";
  document.getElementById("gameOrder").innerHTML = "";
  document.getElementById("gameStatusError").innerHTML = "";

  if(resetValues) {
    document.getElementById("heightGrid").value = 20;
    document.getElementById("widthGrid").value = 20;
    document.getElementById("borderWalls").checked = false;
    document.getElementById("generateWalls").checked = false;
    document.getElementById("mazeGrid").checked = false;
    document.getElementById("sameGrid").checked = true;
    document.getElementById("gameSpeed").value = 8;
    document.getElementById("progressiveSpeed").checked = false;
    document.getElementById("customSpeed").value = 8;
    document.getElementById("customSpeedSettings").style.display = "none";
    document.getElementById("aiLevel").value = "normal";
    document.getElementById("autoRetry").checked = false;
    document.getElementById("numberIA").value = 20;
    document.getElementById("battleAgainstAIs").checked = false;
    document.getElementById("aiAssistant").checked = false;
    document.getElementById("privateGame").checked = false;
  }

  checkSameGrid();
  checkGameSpeed();
  checkPlayer();
  checkFailSettings();
  checkMazeGrid();
}

document.getElementById("resetSettings").onclick = function() {
  resetForm(true);
};

function validateSettings(returnValidation) {
  if(!returnValidation) {
    resetForm(false);
  }

  var heightGrid = document.getElementById("heightGrid").value;
  var widthGrid = document.getElementById("widthGrid").value;
  var borderWalls = document.getElementById("borderWalls").checked;
  var generateWalls = document.getElementById("generateWalls").checked;
  var mazeGrid = document.getElementById("mazeGrid").checked;
  var sameGrid = document.getElementById("sameGrid").checked;
  var speed = document.getElementById("gameSpeed").value;
  var progressiveSpeed = document.getElementById("progressiveSpeed").checked;
  var customSpeed = document.getElementById("customSpeed").value;
  var aiLevel = document.getElementById("aiLevel").value;
  var autoRetry = document.getElementById("autoRetry").checked;
  var numberIA = document.getElementById("numberIA").value;
  var battleAgainstAIs = document.getElementById("battleAgainstAIs").checked;

  if(document.getElementById("aiAssistant").checked) {
    var playerHumanType = PLAYER_HYBRID_HUMAN_AI;
  } else {
    var playerHumanType = PLAYER_HUMAN;
  }

  var formValidated = true;

  if(heightGrid.trim() == "" || isNaN(heightGrid) || heightGrid < 5 || heightGrid > 100) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("heightGrid").classList.add("is-invalid");
      document.getElementById("invalidHeight").style.display = "block";
    }
  } else {
    heightGrid = parseInt(heightGrid);
  }

  if(widthGrid.trim() == "" || isNaN(widthGrid) || widthGrid < 5 || widthGrid > 100) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("widthGrid").classList.add("is-invalid");
      document.getElementById("invalidWidth").style.display = "block";
    }
  } else {
    widthGrid = parseInt(widthGrid);
  }

  if(speed != "custom" && (speed.trim() == "" || isNaN(speed) || speed < 1 || speed > 100)) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("gameSpeed").classList.add("is-invalid");
      document.getElementById("invalidSpeed").style.display = "block";
    }
  } else if(speed != "custom") {
    speed = parseInt(speed);
  }

  if(speed == "custom" && (customSpeed.trim() == "" || isNaN(customSpeed) || customSpeed < 1 || customSpeed > 100)) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("customSpeed").classList.add("is-invalid");
      document.getElementById("invalidCustomSpeed").style.display = "block";
    }
  } else if(speed == "custom") {
    speed = parseInt(customSpeed);
  }

  if(selectedMode != SOLO_PLAYER && selectedMode != BATTLE_ROYALE_ONLINE && (aiLevel != "low" && aiLevel != "normal" && aiLevel != "high" && aiLevel != "random")) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("aiLevel").classList.add("is-invalid");
      document.getElementById("invalidaiLevel").style.display = "block";
    }
  } else if(selectedMode != SOLO_PLAYER && selectedMode != BATTLE_ROYALE_ONLINE) {
    switch(aiLevel) {
      case "random":
        aiLevel = AI_LEVEL_RANDOM;
        break;
      case "low":
        aiLevel = AI_LEVEL_LOW;
        break;
      case "normal":
        aiLevel = AI_LEVEL_DEFAULT;
        break;
      case "high":
        aiLevel = AI_LEVEL_HIGH;
        break;
      case "ultra":
        aiLevel = AI_LEVEL_ULTRA;
        break;
      default:
        aiLevel = AI_LEVEL_DEFAULT;
        break;
    }
  }

  if(selectedMode == BATTLE_ROYALE && (numberIA.trim() == "" || isNaN(numberIA) || numberIA < 2 || numberIA > 100)) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("numberIA").classList.add("is-invalid");
      document.getElementById("invalidIANumber").style.display = "block";
    }
  } else if(selectedMode == BATTLE_ROYALE) {
    numberIA = parseInt(numberIA);
  }

  if(selectedMode != SOLO_AI) {
    autoRetry = false;
  }

  if(returnValidation) {
    return formValidated;
  }

  if(formValidated) {
    document.getElementById("roomsOnlineCreation").style.display = "block";
    document.getElementById("settings").style.display = "none";
    document.getElementById("errorRoomCreation").style.display = "none";

    if(selectedMode == BATTLE_ROYALE_ONLINE) {
      onlineClient.createRoom({
        speed: speed,
        heightGrid: heightGrid,
        widthGrid: widthGrid,
        borderWalls: borderWalls,
        generateWalls: generateWalls,
        customSpeed: customSpeed,
        enableAI: false,
        private: document.getElementById("privateGame").checked
      }, function(data) {
        if(data.connection_error) {
          alert(i18next.t("servers.connectionError"));
          displayServerList();
        } else {
          if(data.success) {
            joinRoom(data.code);
          } else {
            document.getElementById("errorRoomCreation").style.display = "block";
            displayRoomsList();
          }
        }
      });
    } else {
      document.getElementById("settings").style.display = "none";
      document.getElementById("menu").style.display = "none";
      document.getElementById("levelContainer").style.display = "none";
      document.getElementById("serverListContainer").style.display = "none";
      document.getElementById("roomsOnlineListContainer").style.display = "none";
      document.getElementById("roomsOnlineCreation").style.display = "none";
      document.getElementById("errorRoomCreation").style.display = "none";
      document.getElementById("gameContainer").style.display = "block";
      document.getElementById("connectingToServer").style.display = "none";
      document.getElementById("roomsOnlineJoin").style.display = "none";

      var titleGame = "";

      switch(selectedMode) {
        case SOLO_AI:
          titleGame = i18next.t("menu.soloAi");
          break;
        case SOLO_PLAYER:
          titleGame = i18next.t("menu.soloPlayer");
          break;
        case PLAYER_VS_AI:
          titleGame = i18next.t("menu.playerVsAi");
          break;
        case AI_VS_AI:
          titleGame = i18next.t("menu.aiVsAi");
          break;
        case BATTLE_ROYALE:
          titleGame = i18next.t("menu.battleRoyale");
          break;
      }

      document.getElementById("titleGame").innerHTML = i18next.t("game.currentMode") + " " + titleGame;

      var games = [];

      if(selectedMode == SOLO_AI) {
        var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, mazeGrid);
        var snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);

        games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations));
      } else if(selectedMode == SOLO_PLAYER) {
        var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, mazeGrid);
        var snake = new Snake(RIGHT, 3, grid, playerHumanType);

        games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations));
      } else if(selectedMode == PLAYER_VS_AI) {
        var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
        var snake = new Snake(RIGHT, 3, grid, playerHumanType);

        if(sameGrid) {
          var snake2 = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);
          games.push(new Game(grid, [snake, snake2], speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations));
        } else {
          var grid2 = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
          var snake2 = new Snake(RIGHT, 3, grid2, PLAYER_AI, aiLevel, autoRetry);

          games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed, null, null, null, null, !enableAnimations));
          games.push(new Game(grid2, snake2, speed, document.getElementById("gameContainer"), false, false, progressiveSpeed, null, null, null, null, !enableAnimations));
        }
      } else if(selectedMode == AI_VS_AI) {
        var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
        var snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);

        if(sameGrid) {
          var snake2 = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);
          games.push(new Game(grid, [snake, snake2], speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations));
        } else {
          var grid2 = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
          var snake2 = new Snake(RIGHT, 3, grid2, PLAYER_AI, aiLevel, autoRetry);

          games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations));
          games.push(new Game(grid2, snake2, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations));
        }
      } else if(selectedMode == BATTLE_ROYALE) {
        if(sameGrid) {
          var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
          var snakes = [];

          if(battleAgainstAIs) {
            snakes.push(new Snake(RIGHT, 3, grid, playerHumanType, aiLevel, autoRetry));
          }

          for(var i = 0; i < numberIA; i++) {
            snakes.push(new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry));
          }

          games.push(new Game(grid, snakes, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations));
        } else {
          if(battleAgainstAIs) {
            var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
            var snake = new Snake(RIGHT, 3, grid, playerHumanType, aiLevel, autoRetry);

            games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed, 350, 250, null, null, !enableAnimations));
          }

          for(var i = 0; i < numberIA; i++) {
            var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
            var snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);

            games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed, 350, 250, null, null, !enableAnimations));
          }
        }
      }

      var group = new GameGroup(games);
      group.setDisplayFPS(showDebugInfo ? true : false);
      group.start();

      if(group.games[0].canvas != undefined) {
        group.games[0].canvas.scrollIntoView();
      }

      if(mazeGrid && (selectedMode == SOLO_AI || selectedMode == SOLO_PLAYER)) {
        group.setNotification(new NotificationMessage(i18next.t("engine.mazeMode"), null, "rgba(52, 152, 219, 0.5)", 5, null, null, null, true));
      }

      document.getElementById("backToMenuGame").onclick = function() {
        if(confirm(i18next.t("game.confirmQuit"))) {
          group.killAll();
          displayMenu();
          group = null;
        }
      };

      group.onStop(function() {
        if(selectedMode == PLAYER_VS_AI || selectedMode == AI_VS_AI || selectedMode == BATTLE_ROYALE && !group.errorOccurred()) {
          var resultMessage = "";
          var winners = group.getWinners();

          if(selectedMode == PLAYER_VS_AI) {
            if(winners.index.length == 2) {
              resultMessage = i18next.t("game.equalityPlayerVSAI");
            } else if(winners.index[0] == 0) {
              resultMessage = i18next.t("game.winPlayerVSAI");
            } else if(winners.index[0] == 1) {
              resultMessage = i18next.t("game.losePlayerVSAI");
            }
          } else if(selectedMode == AI_VS_AI) {
            if(winners.index.length == 1) {
              resultMessage = i18next.t("game.oneWinnerAIVSAI", { numWinner: winners.index[0] + 1 });
            } else if(winners.index.length == 2) {
              resultMessage = i18next.t("game.equalityAIVSAI");
            }
          } else if(selectedMode == BATTLE_ROYALE) {
            if(winners.index.length == 1) {
              if(battleAgainstAIs && winners.index[0] == 0) {
                resultMessage = i18next.t("game.playerWinnerBattleRoyale", { score: winners.score });
              } else {
                resultMessage = i18next.t("game.oneWinnerBattleRoyale", { numWinner: (battleAgainstAIs ? winners.index[0] : winners.index[0] + 1), score: winners.score });
              }
            } else if(battleAgainstAIs && winners.index.length == 2 && winners.index[0] == 0) {
              resultMessage = i18next.t("game.winnerAIBattleRoyale") + " " + i18next.t("game.winnersNumBattleRoyale", { numWinner: winners.index[1] }) + " " + i18next.t("game.andPlayerWinnersBattleRoyale") + " " + i18next.t("game.winPlayerScoreBattleRoyale", { score: winners.score });
            } else if(winners.index.length > 1) {
              var playerWinnerBattleRoyale = false;
              resultMessage = i18next.t("game.winnersBattleRoyale") + " ";

              for(var i = 0; i < winners.index.length; i++) {
                if(battleAgainstAIs && winners.index[i] == 0) {
                  var playerWinnerBattleRoyale = true;
                } else {
                  resultMessage = resultMessage + i18next.t("game.winnersNumBattleRoyale", { numWinner: (battleAgainstAIs ? winners.index[i] : winners.index[i] + 1) });

                  if((i + 1) < winners.index.length - 1) {
                    resultMessage = resultMessage + ", ";
                  } else if((i + 1) == winners.index.length - 1) {
                    resultMessage = resultMessage + " " + i18next.t("game.andWinnersBattleRoyale") + " ";
                  }
                }
              }

              if(battleAgainstAIs && playerWinnerBattleRoyale) {
                resultMessage = resultMessage + " " + i18next.t("game.andPlayerWinnersBattleRoyale") + " " + i18next.t("game.winPlayerScoreBattleRoyale", { score: winners.score });
              } else {
                resultMessage = resultMessage + " " + i18next.t("game.winScoreBattleRoyale", { score: winners.score });
              }
            }
          }

          if(resultMessage.trim() != "") {
            document.getElementById("gameOrder").innerHTML = resultMessage;
            group.setNotification(new NotificationMessage(resultMessage, null, "rgba(52, 152, 219, 0.5)", 15, null, null, null, true));
          }
        }
      });

      group.onExit(function() {
        if(selectedMode == SOLO_AI || selectedMode == SOLO_PLAYER || selectedMode == AI_VS_AI || (selectedMode == PLAYER_VS_AI && sameGrid) || (selectedMode == BATTLE_ROYALE && sameGrid)) {
          group.killAll();
          displayMenu();
        }
      });

      group.onReset(function() {
        document.getElementById("resultLevels").innerHTML = "";
        document.getElementById("gameStatus").innerHTML = "";
        document.getElementById("gameOrder").innerHTML = "";
        document.getElementById("gameStatusError").innerHTML = "";
        group.closeNotification();
      });
    }
  }
}

document.getElementById("validateSettings").onclick = function() {
  validateSettings();
};

// Levels
function getTitleSave(player, type) {
  if(type == DEFAULT_LEVEL) {
    if(player == PLAYER_HUMAN) {
      var save = SOLO_PLAYER_SAVE + "defautLevelsSave";
    } else if(player == PLAYER_AI) {
      var save = SOLO_AI_SAVE + "defautLevelsSave";
    }
  } else if(type == DOWNLOADED_LEVEL) {
    if(player == PLAYER_HUMAN) {
      var save = SOLO_PLAYER_SAVE + "downloadedLevelsSave";
    } else if(player == PLAYER_AI) {
      var save = SOLO_AI_SAVE + "downloadedLevelsSave";
    }
  }

  return save;
}

function getSave(player, type) {
  if(storageGlobal.getItem(getTitleSave(player, type)) == null) {
    initSaveLevel(player, type, false);
  }

  try {
    var res = JSON.parse(storageGlobal.getItem(getTitleSave(player, type)));
    return res;
  } catch(e) {
    initSaveLevel(player, type, true);
    return getSave(player, type);
  }
}

function getLevelSave(level, player, type) {
  return getSave(player, type)[level];
}

function setLevelSave(value, level, player, type) {
    var save = getTitleSave(player, type);
    var item = getSave(player, type);
    var levels = getLevels(player, type);

    if(item != null) {
      if(Array.isArray(value) && value.length >= 2 && Array.isArray(item[level]) && item[level].length >= 2 && item[level][0] == true) {
        if(levels[level]["type"] != LEVEL_REACH_SCORE_ON_TIME && levels[level]["type"] != LEVEL_MULTI_REACH_SCORE_FIRST && levels[level]["type"] != LEVEL_MAZE_WIN) {
          if(value[1] < item[level][1]) {
            value[1] = item[level][1];
          }
        } else {
          if(value[1] > item[level][1]) {
            value[1] = item[level][1];
          }
        }
      }

      item[level] = value;
      storageGlobal.setItem(save, JSON.stringify(item));

      return true;
    }

    return false;
}

function initSaveLevel(player, type, force) {
  if(typeof(Storage) !== "undefined") {
    var save = getTitleSave(player, type);
    var item = storageGlobal.getItem(save);

    if(item == null || force) {
      storageGlobal.setItem(save, JSON.stringify({ version: GameConstants.Setting.APP_VERSION }));
      setLevelSave([false, 0], 1, player, type);
    }

    return false;
  } else {
    return false;
  }
}

function getLevels(player, type) {
  if(type == DEFAULT_LEVEL) {
    if(player == PLAYER_HUMAN) {
      return DEFAULT_LEVELS_SOLO_PLAYER;
    } else if(player == PLAYER_AI) {
      return DEFAULT_LEVELS_SOLO_AI;
    }
  } else if(type == DOWNLOADED_LEVEL) {
    if(player == PLAYER_HUMAN) {
      try {
        return JSON.parse(storageGlobal.getItem(SOLO_PLAYER_DOWNLOAD_LEVELS_TO));
      } catch(e) {
        return null;
      }
    } else if(player == PLAYER_AI) {
      try {
        return JSON.parse(storageGlobal.getItem(SOLO_AI_DOWNLOAD_LEVELS_TO));
      } catch(e) {
        return null;
      }
    }
  }

  return null;
}

function canPlay(level, player, type) {
  var res = true;
  var levels = getLevels(player, type);

  if(levels == null) {
    return false;
  }

  for(var i = 1; i < level; i++) {
    var save = getLevelSave(i, player, type);

    if(save == null || (!save[0] && levelCompatible(levels[i]["type"], levels[i]["version"]))) {
      res = false;
    }
  }

  return res;
}

function levelCompatible(levelType, version) {
  if((levelType != LEVEL_REACH_SCORE && levelType != LEVEL_REACH_MAX_SCORE && levelType != LEVEL_MULTI_BEST_SCORE && levelType != LEVEL_REACH_SCORE_ON_TIME && levelType != LEVEL_MULTI_REACH_SCORE_FIRST && levelType != LEVEL_MAZE_WIN) || GameConstants.Setting.APP_VERSION.strcmp(version) < 0) {
    return false;
  }

  return true;
}

function printResultLevel(level, player, levelType, type, shortVersion) {
  var val = "";
  var resultLevel = getLevelSave(level, player, type);

  if(resultLevel == null) {
    return "";
  }

  var resultLevel = resultLevel[1];

  if(resultLevel <= 0) {
    return "";
  }

  if(shortVersion) {
    if(levelType == LEVEL_REACH_SCORE || levelType == LEVEL_REACH_MAX_SCORE || levelType == LEVEL_MULTI_BEST_SCORE) {
      val = i18next.t("levels.bestScoreShort", { count: resultLevel });
    } else if(levelType == LEVEL_REACH_SCORE_ON_TIME || levelType == LEVEL_MULTI_REACH_SCORE_FIRST || levelType == LEVEL_MAZE_WIN) {
      val = i18next.t("levels.bestTimeShort", { count: Math.round(resultLevel) });
    }
  } else {
    if(levelType == LEVEL_REACH_SCORE || levelType == LEVEL_REACH_MAX_SCORE || levelType == LEVEL_MULTI_BEST_SCORE) {
      val = i18next.t("levels.bestScore", { count: resultLevel });
    } else if(levelType == LEVEL_REACH_SCORE_ON_TIME || levelType == LEVEL_MULTI_REACH_SCORE_FIRST || levelType == LEVEL_MAZE_WIN) {
      val = i18next.t("levels.bestTime", { count: Math.round(resultLevel) });
    }
  }

  return val;
}

window.playLevel = function(level, player, type) {
  var levels = getLevels(player, type);

  if(levels == null) {
    return false;
  }

  if(levels[level] != null) {
    var levelSelected = levels[level];
    var levelSettings = levelSelected["settings"];
    var levelType = levelSelected["type"];
    var levelTypeValue = levelSelected["typeValue"];
    var levelVersion = levelSelected["version"];

    if(!levelCompatible(levelType, levelVersion)) {
      alert(i18next.t("levels.notCompatible"));
      return false;
    }

    if(!canPlay(level, player, type)) {
      alert(i18next.t("levels.disabledLevel"));
      return false;
    }

    var heightGrid = levelSettings[0];
    var widthGrid = levelSettings[1];
    var borderWalls = levelSettings[2];
    var generateWalls = levelSettings[3];
    var sameGrid = levelSettings[4];
    var speed = levelSettings[5];
    var progressiveSpeed = levelSettings[6];
    var aiLevel = levelSettings[7];
    var numberIA = levelSettings[8];
    var generateMaze = levelSettings[9];
    var customGrid = levelSettings[10];
    var mazeForceAuto = levelSettings[11];

    var games = [];

    var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, generateMaze, customGrid, mazeForceAuto);

    if(player == PLAYER_AI) {
      var playerSnake = new Snake(RIGHT, 3, grid, player, AI_LEVEL_HIGH);
    } else if(player == PLAYER_HUMAN) {
      var playerSnake = new Snake(RIGHT, 3, grid, player);
    }

    if(sameGrid) {
      var snakes = [playerSnake];

      for(var i = 0; i < numberIA; i++) {
        snakes.push(new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel));
      }

      var playerGame = new Game(grid, snakes, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, !enableAnimations);
      games.push(playerGame);
    } else {
      if(numberIA + 1 <= 2) {
        var width = null;
        var height = null;
      } else {
        var width = 350;
        var height = 250;
      }

      var playerGame = new Game(grid, playerSnake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, width, height, null, null, !enableAnimations);
      games.push(playerGame);

      for(var i = 0; i < numberIA; i++) {
        var grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls);
        var snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, false);

        games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), false, false, progressiveSpeed, width, height, null, null, !enableAnimations));
      }
    }

    document.getElementById("settings").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("levelContainer").style.display = "none";
    document.getElementById("serverListContainer").style.display = "none";
    document.getElementById("roomsOnlineListContainer").style.display = "none";
    document.getElementById("roomsOnlineCreation").style.display = "none";
    document.getElementById("errorRoomCreation").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("connectingToServer").style.display = "none";
    document.getElementById("roomsOnlineJoin").style.display = "none";

    document.getElementById("resultLevels").innerHTML = "";
    document.getElementById("gameStatus").innerHTML = "";
    document.getElementById("gameOrder").innerHTML = "";
    document.getElementById("gameStatusError").innerHTML = "";

    document.getElementById("titleGame").innerHTML = i18next.t("levels.level") + " " + level;

    var group = new GameGroup(games);
    group.setDisplayFPS(showDebugInfo ? true : false);
    group.start();

    document.getElementById("gameOrder").scrollIntoView();

    var levelTimer = new Timer(null, 0);
    var notificationEndDisplayed = false;
    var notificationStartDisplayed = false;
    var notifErrorColor = "rgba(231, 76, 60, 0.5)";
    var notifInfosColor = "rgba(52, 152, 219, 0.5)";
    var notifInfo;
    var textToDisplayGoal;

    document.getElementById("backToMenuGame").onclick = function() {
      if(confirm(i18next.t("game.confirmQuit"))) {
        levelTimer.pause();
        group.killAll();
        displayLevelList(player);
        group = null;
      }
    };

    function initGoal() {
      if(levelType == LEVEL_REACH_SCORE) {
        playerGame.onScoreIncreased(function() {
          if(playerGame.snakes[0].score >= levelTypeValue) {
            setLevelSave([true, playerGame.snakes[0].score], level, player, type);
            playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved")));
              notificationEndDisplayed = true;
            }
          }
        });

        playerGame.onStop(function() {
          if(playerGame.snakes[0].score < levelTypeValue) {
            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalNotAchieved"), null, notifErrorColor, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
          }
        });
      } else if(levelType == LEVEL_REACH_SCORE_ON_TIME) {
        levelTimer = new Timer(function() {
          playerGame.setTimeToDisplay(0);
          document.getElementById("gameStatus").innerHTML = i18next.t("levels.timerRemaining", { count: 0 });

          if(!notificationEndDisplayed) {
            playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalNotAchieved"), null, notifErrorColor, null, null, null, null, true));
            notificationEndDisplayed = true;
          }

          group.stopAll(true);
        }, levelTypeValue[1] * 1000 - 1, new TimerInterval(function() {
          document.getElementById("gameStatus").innerHTML = i18next.t("levels.timerRemaining", { count: Math.round(levelTimer.getTime() / 1000) });
          playerGame.setTimeToDisplay(Math.round(levelTimer.getTime() / 1000));
        }));

        playerGame.onStart(function() {
          levelTimer.resume();
        });

        playerGame.onPause(function() {
          levelTimer.pause();
        });

        playerGame.onReset(function() {
          levelTimer.reset();
        });

        playerGame.onStop(function() {
          levelTimer.pause();
        });

        playerGame.onScoreIncreased(function() {
          if(playerGame.snakes[0].score >= levelTypeValue[0]) {
            var stop = (levelTypeValue[1] * 1000) - levelTimer.getTime();
            levelTimer.reset();
            group.stopAll(true);
            setLevelSave([true, stop / 1000], level, player, type);
            playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved"), null, null, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
          }
        });
      } else if(levelType == LEVEL_REACH_MAX_SCORE) {
        playerGame.onStop(function() {
          if(playerGame.scoreMax) {
            setLevelSave([true, playerGame.snakes[0].score], level, player, type);
            playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved"), null, null, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
          } else {
            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalNotAchieved"), null, notifErrorColor, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
          }
        });
      } else if(levelType == LEVEL_MULTI_BEST_SCORE) {
        group.onStop(function() {
          var winners = group.getWinners();
          var won = false;

          for(var i = 0; i < winners.winners.length; i++) {
            if(winners.winners[i] == playerGame.snakes[0]) {
              won = true;
              setLevelSave([true, playerGame.snakes[0].score], level, player, type);
              playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

              if(!notificationEndDisplayed) {
                playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved"), null, null, null, null, null, null, true));
                notificationEndDisplayed = true;
              }
            }
          }

          if(!won && !notificationEndDisplayed) {
            playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalNotAchieved"), null, notifErrorColor, null, null, null, null, true));
            notificationEndDisplayed = true;
          }
        });
      } else if(levelType == LEVEL_MULTI_REACH_SCORE_FIRST) {
        var time = 0;

        var timerInterval = new TimerInterval(function() {
          time++;
        });

        playerGame.onStart(function() {
          timerInterval.start();
        });

        playerGame.onPause(function() {
          timerInterval.stop();
        });

        playerGame.onReset(function() {
          time = 0;
          timerInterval.stop();
        });

        playerGame.onStop(function() {
          timerInterval.stop();
        });

        group.onScoreIncreased(function() {
          for(var i = 0; i < group.games.length; i++) {
            for(var j = 0; j < group.games[i].snakes.length; j++) {
              if(group.games[i].snakes[j].score >= levelTypeValue) {
                if(group.games[i].snakes[j] == playerGame.snakes[0]) {
                  group.stopAll(true);
                  setLevelSave([true, time], level, player, type);
                  playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

                  if(!notificationEndDisplayed) {
                    playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved"), null, null, null, null, null, null, true));
                    notificationEndDisplayed = true;
                  }
                } else {
                  group.stopAll(true);

                  if(!notificationEndDisplayed) {
                    playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalNotAchieved"), null, notifErrorColor, null, null, null, null, true));
                    notificationEndDisplayed = true;
                  }
                }
              }
            }
          }
        });
      } else if(levelType == LEVEL_MAZE_WIN) {
        var time = 0;

        var timerInterval = new TimerInterval(function() {
          time++;
        });

        playerGame.onStart(function() {
          timerInterval.start();
        });

        playerGame.onPause(function() {
          timerInterval.stop();
        });

        playerGame.onReset(function() {
          time = 0;
          timerInterval.stop();
        });

        playerGame.onStop(function() {
          timerInterval.stop();
        });

        playerGame.onScoreIncreased(function() {
          if(playerGame.snakes[0].score >= 1) {
            setLevelSave([true, time], level, player, type);
            playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved"), null, null, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
          }
        });
      }
    }

    function displayInfosGoal() {
      playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

      if(levelType == LEVEL_REACH_SCORE) {
        textToDisplayGoal = i18next.t("levels.reachScore", { value: levelTypeValue });
      } else if(levelType == LEVEL_REACH_SCORE_ON_TIME) {
        textToDisplayGoal = i18next.t("levels.reachScoreTime", { value: levelTypeValue[0], count: levelTypeValue[1] });
        document.getElementById("gameStatus").innerHTML = i18next.t("levels.timerRemaining", { count: levelTypeValue[1] });
        playerGame.setTimeToDisplay(levelTypeValue[1]);
      } else if(levelType == LEVEL_REACH_MAX_SCORE) {
        textToDisplayGoal = i18next.t("levels.reachMaxScore");
      } else if(levelType == LEVEL_MULTI_BEST_SCORE) {
        textToDisplayGoal = i18next.t("levels.multiBestScore", { count: numberIA });
      } else if(levelType == LEVEL_MULTI_REACH_SCORE_FIRST) {
        textToDisplayGoal = i18next.t("levels.multiReachScoreFirst", { value: levelTypeValue, count: numberIA });
      } else if(levelType == LEVEL_MAZE_WIN) {
        textToDisplayGoal = i18next.t("levels.mazeMode", { value: levelTypeValue, count: numberIA });
      }

      document.getElementById("gameOrder").innerHTML = textToDisplayGoal.replace("\n", "<br />");
    }

    initGoal();
    displayInfosGoal();

    group.onExit(function() {
      levelTimer.pause();
      group.killAll();
      displayLevelList(player);
    });

    group.onReset(function() {
      document.getElementById("resultLevels").innerHTML = "";
      document.getElementById("gameStatus").innerHTML = "";
      document.getElementById("gameOrder").innerHTML = "";
      document.getElementById("gameStatusError").innerHTML = "";
      notificationEndDisplayed = false;
      notificationStartDisplayed = false;
      displayInfosGoal();
    });

    playerGame.onStart(function() {
      if(!notificationEndDisplayed && !notificationStartDisplayed) {
        notifInfo = new NotificationMessage(textToDisplayGoal, null, notifInfosColor, 10);
        playerGame.setNotification(notifInfo);
        notificationStartDisplayed = true;
      }
    });
  } else {
    return false;
  }
}

window.editDownloadURL = function() {
  var value = window.prompt(i18next.t("levels.editDownloadURLPrompt"), DOWNLOAD_DEFAULT_URI);

  if(value != null) {
    DOWNLOAD_DEFAULT_URI = value;
  }
}

window.downloadLevels = function(player, button) {
  var url = DOWNLOAD_DEFAULT_URI;
  url = url.replace("{player}", player);
  url = url.replace("{appVersion}", GameConstants.Setting.APP_VERSION);

  var script = document.createElement("script");
  script.src = url;

  var canceled = false;

  window["callbackDownloadLevels"] = function(player, data) {
    if(!canceled) {
      if(player == PLAYER_HUMAN) {
        storageGlobal.setItem(SOLO_PLAYER_DOWNLOAD_LEVELS_TO, JSON.stringify(data));
      } else if(player == PLAYER_AI) {
        storageGlobal.setItem(SOLO_AI_DOWNLOAD_LEVELS_TO, JSON.stringify(data));
      }

      displayLevelList(player);
    }

    document.getElementById("levelDownloading").innerHTML = "";
    document.getElementById("btnDeblockDiv").innerHTML = "";
  };

  button.disabled = true;
  var buttonDeblock = document.createElement("button");
  buttonDeblock.classList = "btn btn-lg btn-warning";
  buttonDeblock.innerHTML = i18next.t("levels.buttonDeblock");

  document.getElementById("levelDownloading").innerHTML = '<strong>' + i18next.t("levels.downloading") + '</strong>';
  document.getElementById("btnDeblockDiv").innerHTML = "";

  document.getElementsByTagName('head')[0].appendChild(script);

  buttonDeblock.onclick = function() {
    canceled = true;
    deblockButton(button, script, "callbackDownloadLevels");
  };

  document.getElementById("btnDeblockDiv").appendChild(buttonDeblock);
}

function deblockButton(button, script) {
  button.disabled = false;
  script.src = null;
  document.getElementById("levelDownloading").innerHTML = "";
  document.getElementById("btnDeblockDiv").innerHTML = "";
  document.getElementsByTagName('head')[0].removeChild(script);
}

function getListLevel(player, type) {
  var levels = getLevels(player, type);
  var res = "";

  if(type == DOWNLOADED_LEVEL) {
    res += '<div class="row mb-3"><div class="col text-center"><button class="btn btn-lg btn-warning" onclick="downloadLevels(' + player + ', this);"><span class="fui-plus-circle"></span>&nbsp; ' + i18next.t("levels.download") + '</button><br /><a href="#null" onclick="editDownloadURL();" class="small"><span class="fui-new"></span>&nbsp; ' + i18next.t("levels.editDownloadURL") + '</a></div></div>';
  }

  if(levels == null) {
    return res + "<strong>" + i18next.t("levels.emptyList") + "</strong>";
  }

  var index = 1;
  var empty = true;

  for(var key in levels) {
    if(levels.hasOwnProperty(key)) {
      if(!canPlay(key, player, type)) {
        var button = '<button class="btn btn-lg btn-primary btn-block-85" disabled aria-label="' + i18next.t("levels.disabledLevel") + '" data-balloon-length="fit" data-balloon-pos="up">' + i18next.t("levels.level") + ' ' + index + '</button>';
      } else if(!levelCompatible(levels[key]["type"], levels[key]["version"])) {
        var button = '<button class="btn btn-lg btn-primary btn-block-85" disabled aria-label="' + i18next.t("levels.notCompatible") + '" data-balloon-length="fit" data-balloon-pos="up">' + i18next.t("levels.level") + ' ' + index + '</button>';
      } else {
        var resultLevel = printResultLevel(key, player, levels[key]["type"], type);

        var button = '<button class="btn btn-lg btn-primary btn-block-85" onclick="playLevel(' + key + ', ' + player  + ', ' + type + ');" ' + (resultLevel.trim() != "" ? 'aria-label="' + printResultLevel(key, player, levels[key]["type"], type) + '" data-balloon-length="fit" data-balloon-pos="up"' : '') + '>' + i18next.t("levels.level") + ' ' + index + '</button>';
      }

      if(index == 1) {
        res += '<div class="row mb-2">';
      }

      if(index % 2 == 0) {
        res += '<div class="col pl-0 justify-content-center">' + button + '</div></div><div class="row mb-2">';
      } else {
        res += '<div class="col pr-0 justify-content-center">' + button + '</div>';
      }

      empty = false;
    }

    index++;
  }

  if(empty) {
    return res + "<strong>" + i18next.t("levels.emptyList") + "</strong>";
  }

  if(index % 2 == 0) {
    res += '<div class="col pr-0 justify-content-center"></div>';
  }

  return res + "</div>";
}

// Localization
function listTranslations(languages) {
  if(languages != null) {
    document.getElementById("languageSelect").disabled = true;
    document.getElementById("languageSelect").innerHTML = "";

    for(var i = 0; i < languages.length; i++) {
      document.getElementById("languageSelect").innerHTML = document.getElementById("languageSelect").innerHTML + '<option data-i18n="lang.' + languages[i] + '" value="'+ languages[i] +'"></option>';
    }

    document.getElementById("languageSelect").value = i18next.language.substr(0, 2);
    document.getElementById("languageSelect").disabled = false;
  }
}

function translateContent() {
  listTranslations(i18next.languages);

  var i18nList = document.querySelectorAll("[data-i18n]");

  for(var i = 0, l = i18nList.length; i < l; i++) {
    i18nList[i].innerHTML = i18next.t(i18nList[i].dataset.i18n);
  }

  document.getElementById("dateTxt").innerHTML = i18next.t("menu.versionDate", { date: new Intl.DateTimeFormat(i18next.language).format(new Date(DATE_VERSION)) });

  document.getElementById("heightGrid").placeholder = i18next.t("settings.placeholderHeight");
  document.getElementById("widthGrid").placeholder = i18next.t("settings.placeholderWidth");
  document.getElementById("customSpeed").placeholder = i18next.t("settings.placeholderCustomSpeed");
  document.getElementById("numberIA").placeholder = i18next.t("settings.placeholderNumberIA");

  document.getElementById("appDownloadURLGet").setAttribute("aria-label", i18next.t("update.getURL"));
  document.getElementById("appUpdateChanges").setAttribute("aria-label", i18next.t("update.getChanges"));

  document.getElementById("appUpdateDateLocalized").innerHTML = i18next.t("update.versionDate", { date: new Intl.DateTimeFormat(i18next.language).format(new Date(document.getElementById("appUpdateDate").innerHTML)) });

  document.getElementById("aiAssistantInfos").setAttribute("aria-label", i18next.t("settings.aiAssistantInfos"));
}

document.getElementById("languageSelect").onchange = function() {
  i18next.changeLanguage(document.getElementById("languageSelect").value, function(err, t) {
    translateContent();
  });
};

window.addEventListener("load", function() {
  setTimeout(function() {
    translateContent();
  }, 250);
});

// Installable app
if("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
