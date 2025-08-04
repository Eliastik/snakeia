/* eslint-disable no-undef */
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
import i18next from "i18next";
import { Game, WorkersAvailable } from "./src/Shim";
import GameConstants from "./src/engine/Constants";
import Snake from "./src/engine/Snake";
import Grid from "./src/engine/Grid";
import GameGroup from "./src/engine/GameGroup";
import OnlineClient from "./src/engine/OnlineClient";
import GameUI from "./src/ui/GameUI.js";
import { NotificationMessage } from "jsgametools";
import seedrandom from "seedrandom";
import StorageFactory from "./src/StorageFactory";
import { Timer, TimerInterval } from "./src/Timers";
import SnakeAIUltraModelLoader from "./src/engine/ai/SnakeAIUltraModelLoader.js";
import semver from "semver";

// Modes :
window.SOLO_AI = "SOLO_AI";
window.SOLO_PLAYER = "SOLO_PLAYER";
window.PLAYER_VS_AI = "PLAYER_VS_AI";
window.AI_VS_AI = "AI_VS_AI";
window.BATTLE_ROYALE = "BATTLE_ROYALE";
window.BATTLE_ROYALE_ONLINE = "BATTLE_ROYALE_ONLINE";
// URIs :
window.UPDATER_URI = "https://www.eliastiksofts.com/snakeia/update/?format=json";
window.SERVERS_LIST_URI = "https://www.eliastiksofts.com/snakeia/serversList/?format=json";
// Levels types :
window.LEVEL_REACH_SCORE = "LEVEL_REACH_SCORE";
window.LEVEL_REACH_MAX_SCORE = "LEVEL_REACH_MAX_SCORE";
window.LEVEL_MULTI_BEST_SCORE = "LEVEL_MULTI_BEST_SCORE";
window.LEVEL_MULTI_REACH_SCORE_FIRST = "LEVEL_MULTI_REACH_SCORE_FIRST";
window.LEVEL_REACH_SCORE_ON_TIME = "LEVEL_REACH_SCORE_ON_TIME";
window.LEVEL_MAZE_WIN = "LEVEL_MAZE_WIN";
window.DEFAULT_LEVEL = "DEFAULT_LEVEL";
window.DOWNLOADED_LEVEL = "DOWNLOADED_LEVEL";
// Level type array
const LEVEL_TYPES = [LEVEL_REACH_SCORE, LEVEL_REACH_MAX_SCORE, LEVEL_MULTI_BEST_SCORE, LEVEL_REACH_SCORE_ON_TIME, LEVEL_MULTI_REACH_SCORE_FIRST, LEVEL_MAZE_WIN];
// Default levels :
// Level model : { settings: [heightGrid, widthGrid, borderWalls, generateWalls, sameGrid, speed, progressiveSpeed, aiLevel, numberIA, generateMaze, customGrid, mazeForceAuto, seedGrid, seedGame], type: levelType(see below), typeValue: levelTypeValue(score, time, ...), version: (version min to play the level) }
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
window.DOWNLOAD_DEFAULT_URI = "https://www.eliastiksofts.com/snakeia/downloadLevels/?player={player}&ver={appVersion}&format=json";
window.SOLO_PLAYER_DOWNLOAD_LEVELS_TO = "snakeia_solo_player_downloadedLevels";
window.SOLO_AI_DOWNLOAD_LEVELS_TO = "snakeia_solo_ai_downloadedLevels";

const onlineClient = new OnlineClient();
const storageGlobal = new StorageFactory();

let selectedMode = SOLO_AI;
let customSettings = {};
let workersAvailable = false;

document.getElementById("versionTxt").innerHTML = GameConstants.Setting.APP_VERSION;
document.getElementById("appVersion").innerHTML = GameConstants.Setting.APP_VERSION;
document.getElementById("dateTxt").innerHTML = DATE_VERSION;
document.getElementById("appUpdateDate").innerHTML = DATE_VERSION;

if(!storageGlobal.isSupported) {
  document.getElementById("localstorageDisabled").style.display = "block";
}

// Settings handling
WorkersAvailable(result => {
  workersAvailable = result; 
  showSettings();
});

function restoreSettings() {
  customSettings = {
    enableAnimations: isAnimationsDefaultEnabled(),
    onlineEnableClientSidePredictions: false,
    renderBlur: false,
    enableMultithreading: true,
    showDebugInfo: false,
    textOutput: false,
    graphicSkin: "flat",
    graphicType: "2d",
    maxFPS: -1,
    unlockAllLevels: false,
    darkMode: "auto",
    aiUltraModelId: null,
    aiUltraModelCustomURL: null,
    levelsAILevel: "high"
  };
}

function saveSettings() {
  storageGlobal.setItem("snakeia_settings", JSON.stringify(customSettings));
  showSettings();
}

function getSettings() {
  const settingsFromStorage = (storageGlobal.getItem("snakeia_settings") && JSON.parse(storageGlobal.getItem("snakeia_settings")));

  if(!settingsFromStorage) {
    return customSettings;
  }

  return {
    ...customSettings,
    ...settingsFromStorage
  };
}

function showSettings() {
  const settings = getSettings();

  document.getElementById("enableAnimations").checked = false;
  document.getElementById("renderBlur").checked = false;
  document.getElementById("enableMultithreading").checked = false;
  document.getElementById("onlineEnableClientSidePredictions").checked = false;
  document.getElementById("showDebugInfo").checked = false;
  document.getElementById("textOutput").checked = false;

  if(isAnimationsEnabled()) document.getElementById("enableAnimations").checked = true;
  if(settings.renderBlur) document.getElementById("renderBlur").checked = true;
  if(settings.enableMultithreading && workersAvailable) document.getElementById("enableMultithreading").checked = true;
  if(settings.onlineEnableClientSidePredictions) document.getElementById("onlineEnableClientSidePredictions").checked = true;
  if(settings.showDebugInfo) document.getElementById("showDebugInfo").checked = true;
  if(settings.textOutput) document.getElementById("textOutput").checked = true;
  document.getElementById("graphicSkin").value = settings.graphicSkin;
  document.getElementById("graphicType").value = settings.graphicType;
  document.getElementById("levelsAILevelSelect").value = settings.levelsAILevel;

  if(!workersAvailable) {
    document.getElementById("enableMultithreading").disabled = true;
    document.getElementById("multithreadingNotAvailable").style.display = "inline-block";
  } else {
    document.getElementById("enableMultithreading").disabled = false;
    document.getElementById("multithreadingNotAvailable").style.display = "none";
  }

  if(settings.maxFPS && !isNaN(settings.maxFPS)) {
    document.getElementById("maxFPS").value = settings.maxFPS;
  } else {
    document.getElementById("maxFPS").value = -1;
  }

  checkDarkMode();
}

function isDarkModeEnabled() {
  const settings = getSettings();

  if(settings) {
    if(!settings.darkMode || settings.darkMode === "auto") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else if(settings.darkMode === "enabled") {
      return true;
    }
  }

  return false;
}

function isAnimationsDefaultEnabled() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isAnimationsEnabled() {
  const settings = getSettings();

  if(settings && typeof settings.enableAnimations !== "undefined") {
    return settings.enableAnimations;
  }

  return isAnimationsDefaultEnabled();
}

function checkDarkMode() {
  const darkModeEnabled = isDarkModeEnabled();

  if(darkModeEnabled) {
    document.getElementById("darkModeCheckbox").checked = true;

    document.body.classList.remove("light");
    document.body.classList.add("dark");

    document.querySelectorAll(".logoLight").forEach(logo => logo.style.display = "none");
    document.querySelectorAll(".logoDark").forEach(logo => logo.style.display = "inline");
  } else {
    document.getElementById("darkModeCheckbox").checked = false;

    document.body.classList.remove("dark");
    document.body.classList.add("light");

    document.querySelectorAll(".logoLight").forEach(logo => logo.style.display = "inline");
    document.querySelectorAll(".logoDark").forEach(logo => logo.style.display = "none");
  }
}

restoreSettings();
customSettings = getSettings();
showSettings();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  checkDarkMode();
});

document.getElementById("enableAnimations").onchange = function() {
  customSettings.enableAnimations = this.checked;
  saveSettings();
};

document.getElementById("renderBlur").onchange = function() {
  customSettings.renderBlur = this.checked;
  saveSettings();
};

document.getElementById("enableMultithreading").onchange = function() {
  customSettings.enableMultithreading = this.checked;
  saveSettings();
};

document.getElementById("onlineEnableClientSidePredictions").onchange = function() {
  customSettings.onlineEnableClientSidePredictions = this.checked;
  saveSettings();
};

document.getElementById("showDebugInfo").onchange = function() {
  customSettings.showDebugInfo = this.checked;
  saveSettings();
};

document.getElementById("textOutput").onclick = function() {
  customSettings.textOutput = this.checked;
  saveSettings();
};

document.getElementById("graphicSkin").onchange = function() {
  customSettings.graphicSkin = this.value;
  saveSettings();
};

document.getElementById("graphicType").onchange = function() {
  customSettings.graphicType = this.value;
  saveSettings();
};

document.getElementById("maxFPS").oninput = function() {
  customSettings.maxFPS = this.value;
  saveSettings();
};

document.getElementById("darkModeCheckbox").onchange = function() {
  customSettings.darkMode = this.checked ? "enabled" : "disabled";
  saveSettings();
};

document.getElementById("resetParameters").onclick = function() {
  restoreSettings();
  saveSettings();
};

function normalizeVersion(version) {
  const parts = version.split(".");

  while(parts.length < 3) {
    parts.push("0");
  }

  return parts.slice(0, 3).join(".");
}

const processUpdateData = data => {
  if(typeof(data) !== "undefined" && data !== null && typeof(data.version) !== "undefined" && data.version !== null) {
    const newVersionTest = semver.lt(GameConstants.Setting.APP_VERSION, normalizeVersion(data.version));

    if(newVersionTest) {
      document.getElementById("updateAvailable").style.display = "block";
      document.getElementById("appUpdateVersion").textContent = data.version;

      let appUpdateDate = DATE_VERSION;

      if(typeof(data.date) !== "undefined" && data.date !== null) {
        appUpdateDate = data.date;
      }

      document.getElementById("appUpdateDate").textContent = appUpdateDate;

      let downloadURL = "http://eliastiksofts.com/snakeia/downloads/";

      if(typeof(data.url) !== "undefined" && data.url !== null) {
        downloadURL = data.url;
      }

      document.getElementById("appDownloadLink").onclick = () => {
        window.open(downloadURL, "_blank");
      };

      document.getElementById("appDownloadURLGet").onclick = () => {
        prompt(i18next.t("update.URLToDownload"), downloadURL);
      };

      let changes = i18next.t("update.noChanges");

      if(typeof(data.changes) !== "undefined" && data.changes !== null) {
        changes = data.changes;
      }

      document.getElementById("appUpdateChanges").onclick = () => {
        alert(i18next.t("update.changes") + "\n" + changes);
      };

      translateContent();
    }
  }
};

// Updater
function checkUpdate() {
  fetch(UPDATER_URI)
    .then(response => response.json())
    .then(data => {
      processUpdateData(data);
    })
    .catch(error => {
      console.error(error);
    });
}

const processServersListData = data => {
  document.getElementById("serverListGroup").innerHTML = "";

  if(data != null && data.length > 0) {
    for(let i = 0; i < data.length; i++) {
      if(data[i]["url"] != null) {
        const url = data[i]["url"];
        const port = data[i]["port"];
        const name = data[i]["name"];

        const linkServer = document.createElement("a");
        linkServer.classList.add("list-group-item");
        linkServer.classList.add("list-group-item-action");

        if(name != null) {
          linkServer.textContent = name;
        } else {
          linkServer.textContent = i18next.t("servers.untitled");
        }

        linkServer.onclick = (((u, p) => {
          connectToServer(u, p);
        }).bind(null, url, port));
  
        const serverAddress = document.createElement("div");
        serverAddress.classList.add("small");
        serverAddress.classList.add("text-muted");

        if(port != null && port.trim() != "") {
          serverAddress.textContent = url + ":" + port;
        } else {
          serverAddress.textContent = url;
        }

        linkServer.appendChild(serverAddress);
  
        document.getElementById("serverListGroup").appendChild(linkServer);
      }
    }
  } else {
    const noServerFound = document.createElement("strong");
    noServerFound.textContent = i18next.t("servers.noServerFound");

    document.getElementById("serverListGroup").appendChild(noServerFound);
  }

  document.getElementById("loadingServersList").style.display = "none";
};

// Load server list
function loadServerList() {
  document.getElementById("loadingServersList").style.display = "inline-block";
  document.getElementById("serverListGroup").innerHTML = "";

  fetch(SERVERS_LIST_URI)
    .then(response => response.json())
    .then(data => {
      processServersListData(data);
    })
    .catch(error => {
      console.error(error);
    });
}

document.getElementById("linkCustomServer").onclick = () => {
  const url = prompt(i18next.t("servers.enterCustomServer"), "http://");

  if(url != null && url.trim() != "") {
    connectToServer(url);
  }
};

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
  document.getElementById("authenticationServer").style.display = "none";

  onlineClient.connect(url, port, (success, data, id) => {
    document.getElementById("connectingToServer").style.display = "none";

    if(!success) {
      if(data == GameConstants.Error.AUTHENTICATION_REQUIRED || data == GameConstants.Error.BANNED) {
        document.getElementById("authenticationServerContainer").innerHTML = "";
        
        const authentIframe = document.createElement("iframe");
        const authentUrl = onlineClient.getURL() + `/authentication?lang=${i18next.language.substring(0, 2)}&theme=${isDarkModeEnabled() ? "dark" : "light"}` + (id ? "&id=" + id : "");

        authentIframe.id = "authent_frame";
        authentIframe.src = authentUrl;
        authentIframe.classList.add("frame-responsive");

        document.getElementById("authenticationServerContainer").appendChild(authentIframe);
        document.getElementById("linkAuthenticationServer").href = authentUrl;

        displayAuthentication();
      } else if(data == GameConstants.Error.DISCONNECTED) {
        alert(i18next.t("servers.disconnectedError"));
        displayServerList();
      } else {
        alert(i18next.t("servers.connectionError"));
        displayServerList();
      }
    } else {
      displayRoomsList();
    }
  });
}

document.getElementById("cancelConnectingToServer").onclick = () => {
  document.getElementById("connectingToServer").style.display = "none";
  onlineClient.disconnect();
  displayServerList();
};

document.getElementById("cancelAuthenticationToServer").onclick = () => {
  document.getElementById("authenticationServerContainer").innerHTML = "";
  document.getElementById("connectingToServer").style.display = "none";
  onlineClient.disconnect();
  displayServerList();
};

function displayRooms() {
  document.getElementById("loadingRoomsOnlineList").style.display = "inline-block";
  document.getElementById("roomsOnlineListGroup").innerHTML = "";
  document.getElementById("refreshRooms").disabled = "disabled";
  document.getElementById("errorRoomJoin").style.display = "none";
  document.getElementById("errorServerVersion").style.display = "none";

  onlineClient.displayRooms((success, data) => { // Request rooms data
    document.getElementById("roomsOnlineListGroup").innerHTML = "";
    document.getElementById("errorRoomsList").style.display = "none";
    document.getElementById("refreshRooms").disabled = "";
  
    if(!success) {
      if(data == GameConstants.Error.AUTHENTICATION_REQUIRED) {
        connectToServer(onlineClient.url, onlineClient.port);
      } else {
        document.getElementById("errorRoomsList").style.display = "block";
      }
    } else if(data.rooms != null && Object.keys(data.rooms).length > 0) {
      for(let i = 0; i < Object.keys(data.rooms).length; i++) {
        const room = data.rooms[Object.keys(data.rooms)[i]];
        const code = room["code"];
  
        const linkRoom = document.createElement("a");
        linkRoom.classList.add("list-group-item");
        linkRoom.classList.add("list-group-item-action");
        linkRoom.textContent = i18next.t("servers.room", { number: (i + 1) }) + (room.state != null ? " " + (
          room.state == GameConstants.GameState.SEARCHING_PLAYERS ? i18next.t("servers.searchingPlayers") :
            room.state == GameConstants.GameState.STARTING ? i18next.t("servers.starting") :
              room.state == GameConstants.GameState.STARTED ? i18next.t("servers.started") : ""
        ) : "");
  
        linkRoom.onclick = () => {
          joinRoom(code);
        };
  
        const gameInfos = document.createElement("div");
        gameInfos.classList.add("small");
        gameInfos.classList.add("text-muted");
        gameInfos.textContent = i18next.t("servers.infos", { width : room.width, height: room.height, speed: room.speed });
  
        const gameInfosSecond = document.createElement("div");
        gameInfosSecond.classList.add("small");
        gameInfosSecond.classList.add("text-muted");
        gameInfosSecond.textContent = room.borderWalls ? i18next.t("servers.infosBorderWalls") : "";
        
        const gameInfosThird = document.createElement("div");
        gameInfosThird.classList.add("small");
        gameInfosThird.classList.add("text-muted");
        gameInfosThird.textContent = room.generateWalls ? i18next.t("servers.infosGenerateWalls") : "";
  
        const gameInfosPlayers = document.createElement("div");
        gameInfosPlayers.classList.add("small");
        gameInfosPlayers.classList.add("text-muted");
        gameInfosPlayers.textContent = i18next.t("servers.infosPlayers", { count : room.players, max: room.maxPlayers });
  
        linkRoom.appendChild(gameInfos);
        linkRoom.appendChild(gameInfosSecond);
        linkRoom.appendChild(gameInfosThird);
        linkRoom.appendChild(gameInfosPlayers);
  
        if(room.spectators > 0) {
          const gameInfosSpectators = document.createElement("div");
          gameInfosSpectators.classList.add("small");
          gameInfosSpectators.classList.add("text-muted");
          gameInfosSpectators.textContent = i18next.t("servers.infosSpectators", { count : room.spectators });
          linkRoom.appendChild(gameInfosSpectators);
        }
  
        document.getElementById("roomsOnlineListGroup").appendChild(linkRoom);
      }
    } else {
      const noRoomFound = document.createElement("strong");
      noRoomFound.textContent = i18next.t("servers.noRoomound");
  
      document.getElementById("roomsOnlineListGroup").appendChild(noRoomFound);
    }

    if(data && data.version) {
      onlineClient.engineServerVersion = data.version;
      onlineClient.serverVersion = data.serverVersion;

      if(data.version != GameConstants.Setting.APP_VERSION) {
        document.getElementById("errorServerVersion").style.display = "block";
        document.getElementById("errorServerVersionText").textContent = i18next.t("servers.errorServerVersion", { server_version: data.version, client_version: GameConstants.Setting.APP_VERSION });
      }
    }
      
    document.getElementById("loadingRoomsOnlineList").style.display = "none";
    document.getElementById("serverAddress").textContent = onlineClient.url + (onlineClient.port != null && onlineClient.port.trim() != "" ? (":" + onlineClient.port) : "");
  });
}

document.getElementById("refreshRooms").onclick = () => {
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
  document.getElementById("authenticationServer").style.display = "none";
  document.getElementById("errorRoomJoin").style.display = "none";

  onlineClient.joinRoom(code, data => {
    document.getElementById("roomsOnlineJoin").style.display = "none";

    if(data.success) {
      const ui = new GameUI(null, document.getElementById("gameContainer"), null, null, (customSettings.showDebugInfo ? true : false), null, customSettings);
      const game = onlineClient.getGame(ui, customSettings);
      game.init();

      document.getElementById("gameContainer").style.display = "block";
      document.getElementById("titleGame").innerHTML = i18next.t("game.currentMode") + " " + i18next.t("menu.onlineBattleRoyale");
      document.getElementById("gameOrder").textContent = i18next.t("servers.roomCode") + " " + code;
      document.getElementById("gameStatus").textContent = "";
      document.getElementById("gameStatusError").textContent = "";

      if(ui.canvas != undefined) {
        ui.canvas.scrollIntoView();
      }

      game.onExit(() => {
        onlineClient.stopGame();
        displayRoomsList();
      });

      game.onKill(() => {
        onlineClient.stopGame();
        displayRoomsList();
      });

      document.getElementById("backToMenuGame").onclick = () => {
        if(confirm(i18next.t("game.confirmQuit"))) {
          onlineClient.stopGame();
          displayRoomsList();
        }
      };
    } else {
      const errorCode = data.errorCode;
      let errorCode_text = "";

      switch(errorCode) {
      case GameConstants.Error.ROOM_NOT_FOUND:
        errorCode_text = i18next.t("servers.errorRoomJoinReason_roomNotFound");
        break;
      case GameConstants.Error.ROOM_ALREADY_JOINED:
        errorCode_text = i18next.t("servers.errorRoomJoinReason_roomAlreadyJoined");
        break;
      case GameConstants.Error.ALREADY_CREATED_ROOM:
        errorCode_text = i18next.t("servers.errorRoomCreationReason_alreadyCreatedRoom");
        break;
      default:
        errorCode_text = i18next.t("servers.errorReason_unknown");
        break;
      }

      document.getElementById("errorRoomJoinReason").textContent = errorCode_text;
      document.getElementById("errorRoomJoin").style.display = "block";
      document.getElementById("roomsOnlineJoin").style.display = "none";
      document.getElementById("roomsOnlineListContainer").style.display = "block";
    }
  });
}

document.getElementById("joinPrivateRoom").onclick = () => {
  const code = prompt(i18next.t("servers.enterCode"));

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
    document.getElementById("autoRetrySettings").style.display = "none";
    document.getElementById("progressiveSpeedDiv").style.display = "none";
    document.getElementById("privateGameDiv").style.display = "block";
    document.getElementById("iaSettings").style.display = "none";
    document.getElementById("seedSettings").style.display = "none";
    document.getElementById("modalSelectAIUltraModelButton").style.display = "none";

    if(onlineClient.serverSettings && onlineClient.serverSettings.enableAI) {
      document.getElementById("enableAIDiv").style.display = "block";
    } else {
      document.getElementById("enableAIDiv").style.display = "none";
    }
  } else {
    document.getElementById("progressiveSpeedDiv").style.display = "block";
    document.getElementById("seedSettings").style.display = "block";
    document.getElementById("privateGameDiv").style.display = "none";
    document.getElementById("enableAIDiv").style.display = "none";

    if(document.getElementById("aiLevel").value === "ultra") {
      document.getElementById("modalSelectAIUltraModelButton").style.display = "block";
    } else {
      document.getElementById("modalSelectAIUltraModelButton").style.display = "none";
    }
  }

  displaySettings();
}

document.getElementById("soloAi").onclick = () => {
  selectMode(SOLO_AI);
};

document.getElementById("soloPlayer").onclick = () => {
  selectMode(SOLO_PLAYER);
};

document.getElementById("playerVsAi").onclick = () => {
  selectMode(PLAYER_VS_AI);
};

document.getElementById("aiVsAi").onclick = () => {
  selectMode(AI_VS_AI);
};

document.getElementById("battleRoyale").onclick = () => {
  selectMode(BATTLE_ROYALE);
};

document.getElementById("createRoom").onclick = () => {
  selectMode(BATTLE_ROYALE_ONLINE);
};

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
  document.getElementById("authenticationServer").style.display = "none";
  document.getElementById("parameters").style.display = "none";
}

function displaySettings() {
  displayMenu();
  document.getElementById("settings").style.display = "block";
  document.getElementById("menu").style.display = "none";

  resetForm(false, true);

  if(selectedMode == BATTLE_ROYALE_ONLINE) {
    document.getElementById("backToMenu").onclick = () => {
      displayRoomsList();
    };
  } else {
    document.getElementById("backToMenu").onclick = () => {
      displayMenu();
    };
  }
}

function displayOthersSettings() {
  displayMenu();
  document.getElementById("menu").style.display = "none";
  document.getElementById("parameters").style.display = "block";
}

document.getElementById("backToMenu").onclick = () => {
  displayMenu();
};

document.getElementById("backToMenuLevelList").onclick = () => {
  displayMenu();
};

document.getElementById("backToMenuParameters").onclick = () => {
  displayMenu();
};

document.getElementById("othersSettings").onclick = () => {
  displayOthersSettings();
};

document.getElementById("backToMenuServerList").onclick = () => {
  onlineClient.disconnect();
  displayMenu();
};

document.getElementById("collapseSeedSettingsBtn").onclick = e => {
  const collapse = document.getElementById("collapseSeedSettings");

  if(collapse && collapse.classList.contains("show")) {
    collapse.classList.remove("show");
  } else if(collapse) {
    collapse.classList.add("show");
  }

  e.preventDefault();
  e.stopPropagation();
};

document.getElementById("collapseAdvancedSettingsBtn").onclick = e => {
  const collapse = document.getElementById("collapseAdvancedSettings");

  if(collapse && collapse.classList.contains("show")) {
    collapse.classList.remove("show");
  } else if(collapse) {
    collapse.classList.add("show");
  }

  e.preventDefault();
  e.stopPropagation();
};

document.getElementById("collapseLevelBonusShopLink").onclick = e => {
  const collapse = document.getElementById("collapseLevelBonusShop");

  if(collapse && collapse.classList.contains("show")) {
    collapse.classList.remove("show");
  } else if(collapse) {
    collapse.classList.add("show");
  }

  e.preventDefault();
  e.stopPropagation();
};

function displayServerList() {
  selectMode(BATTLE_ROYALE_ONLINE);
  displayMenu();
  document.getElementById("menu").style.display = "none";
  document.getElementById("serverListContainer").style.display = "block";
  loadServerList();
}

document.getElementById("onlineBattleRoyale").onclick = () => {
  displayServerList();
};

document.getElementById("backToServersRoomsList").onclick = () => {
  onlineClient.disconnect();
  displayServerList();
};

function displayRoomsList() {
  displayMenu();
  document.getElementById("menu").style.display = "none";
  document.getElementById("roomsOnlineListContainer").style.display = "block";
  displayRooms();
}

function displayAuthentication() {
  displayMenu();
  document.getElementById("menu").style.display = "none";
  document.getElementById("authenticationServer").style.display = "block";
}

function displayLevelList(player) {
  displayMenu();
  document.getElementById("menu").style.display = "none";
  document.getElementById("levelContainer").style.display = "block";

  document.getElementById("levelDownloading").innerHTML = "";
  document.getElementById("btnDeblockDiv").innerHTML = "";
  document.getElementById("bonusList").innerHTML = "";

  if(player == PLAYER_HUMAN) {
    document.getElementById("titleLevelList").innerHTML = i18next.t("levels.titlePlayer");
    document.getElementById("levelsAILevel").style.display = "none";
    document.getElementById("levelListDefault").innerHTML = getListLevel(PLAYER_HUMAN, DEFAULT_LEVEL);
    document.getElementById("levelListDownloadAI").style.display = "none";
    document.getElementById("levelListDownloadPlayer").style.display = "block";
    document.getElementById("levelListDownloadPlayer").innerHTML = getListLevel(PLAYER_HUMAN, DOWNLOADED_LEVEL);
    document.getElementById("fruitNumberCount").innerHTML = getNumberFruits(PLAYER_HUMAN);
    document.getElementById("bonusList").appendChild(getListBonus(PLAYER_HUMAN));
  } else if(player == PLAYER_AI) {
    document.getElementById("titleLevelList").innerHTML = i18next.t("levels.titleAI");
    document.getElementById("levelsAILevel").style.display = "block";
    document.getElementById("levelListDefault").innerHTML = getListLevel(PLAYER_AI, DEFAULT_LEVEL);
    document.getElementById("levelListDownloadAI").style.display = "block";
    document.getElementById("levelListDownloadPlayer").style.display = "none";
    document.getElementById("levelListDownloadAI").innerHTML = getListLevel(PLAYER_AI, DOWNLOADED_LEVEL);
    document.getElementById("fruitNumberCount").innerHTML = getNumberFruits(PLAYER_AI);
    document.getElementById("bonusList").appendChild(getListBonus(PLAYER_AI));
  }
}

document.getElementById("levelsSoloPlayer").onclick = () => {
  displayLevelList(PLAYER_HUMAN);
};

document.getElementById("levelsSoloAI").onclick = () => {
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

document.getElementById("gameSpeed").onchange = () => {
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

function checkEnableAI() {
  if((selectedMode == BATTLE_ROYALE_ONLINE && document.getElementById("enableAI").checked && onlineClient.serverSettings && onlineClient.serverSettings.enableAI) || (selectedMode != BATTLE_ROYALE_ONLINE && selectedMode != SOLO_PLAYER)) {
    document.getElementById("iaSettings").style.display = "block";
  } else {
    document.getElementById("iaSettings").style.display = "none";
  }
}

function gameCanFailToInit(heightGrid, widthGrid, borderWalls, generateWalls, numberPlayers) {
  heightGrid = parseInt(heightGrid);
  widthGrid = parseInt(widthGrid);

  let numberEmptyCases = heightGrid * widthGrid;

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

  const neededCases = numberPlayers * 5;

  if(numberEmptyCases >= neededCases) {
    return false;
  } else {
    return true;
  }
}

function checkFailSettings() {
  document.getElementById("possibleFailInitGame").style.display = "none";

  if(validateSettings(true)) {
    const heightGrid = document.getElementById("heightGrid").value;
    const widthGrid = document.getElementById("widthGrid").value;
    const borderWalls = document.getElementById("borderWalls").checked;
    const generateWalls = document.getElementById("generateWalls").checked;
    const sameGrid = document.getElementById("sameGrid").checked;
    const numberIA = document.getElementById("numberIA").value;
    const battleAgainstAIs = document.getElementById("battleAgainstAIs").checked;

    let numberPlayers = 1;

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

document.getElementById("heightGrid").onchange = () => {
  checkFailSettings();
};

document.getElementById("widthGrid").onchange = () => {
  checkFailSettings();
};

document.getElementById("borderWalls").onchange = () => {
  checkFailSettings();
};

document.getElementById("generateWalls").onchange = () => {
  checkFailSettings();
};

document.getElementById("sameGrid").onchange = () => {
  checkSameGrid();
  checkGameSpeed();
  checkFailSettings();
};

document.getElementById("numberIA").onchange = () => {
  checkFailSettings();
};

document.getElementById("battleAgainstAIs").onchange = () => {
  checkPlayer();
  checkFailSettings();
};

document.getElementById("mazeGrid").onchange = () => {
  checkMazeGrid();
};

document.getElementById("enableAI").onchange = () => {
  checkEnableAI();
};

document.getElementById("resetSeeds").onclick = e => {
  resetForm(false, true);
  e.preventDefault();
  e.stopPropagation();
};

document.getElementById("aiLevel").onchange = function() {
  if(this.value === "ultra" && selectedMode !== BATTLE_ROYALE_ONLINE) {
    document.getElementById("modalSelectAIUltraModelButton").style.display = "block";
  } else {
    document.getElementById("modalSelectAIUltraModelButton").style.display = "none";
  }
};

document.getElementById("levelsAILevelSelect").onchange = function() {
  if(this.value === "ultra" && selectedMode !== BATTLE_ROYALE_ONLINE) {
    document.getElementById("modalLevelSelectAIUltraModelButton").style.display = "block";
  } else {
    document.getElementById("modalLevelSelectAIUltraModelButton").style.display = "none";
  }

  customSettings.levelsAILevel = this.value;
  saveSettings();
};

const modalSelectAIUltraModelInstance = new BSN.Modal(
  "#modalSelectAIUltraModel",
  {
    backdrop: "static",
    keyboard: false
  }
);

function displayCustomURLAIUltraModel(value) {
  if(value === "custom") {
    document.getElementById("aiModelSettingsCustomPath").style.display = "block";
  } else {
    document.getElementById("aiModelSettingsCustomPath").style.display = "none";
  }
}

async function setupAIModelPopup() {
  document.getElementById("errorLoadingModelList").style.display = "none";
  document.getElementById("formSettingsAIUltraModel").style.display = "none";
  document.getElementById("loadingModelList").style.display = "block";

  modalSelectAIUltraModelInstance.show();

  try {
    const modelLoader = SnakeAIUltraModelLoader.getInstance();
    const modelList = await modelLoader.getModelList();

    document.getElementById("formSettingsAIUltraModel").style.display = "block";
    document.getElementById("loadingModelList").style.display = "none";

    if(modelList && Array.isArray(modelList)) {
      const selectElement = document.getElementById("aiModelList");

      selectElement.innerHTML = "";

      modelList.forEach(model => {
        const option = document.createElement("option");
        option.value = model.id;
        option.text = model.name[i18next.language.substring(0, 2)];
        selectElement.appendChild(option);
      });

      const option = document.createElement("option");
      option.value = "custom";
      option.text = i18next.t("modalSelectAIUltraModel.custom");
      selectElement.appendChild(option);

      const selectedModelStorageValue = customSettings.aiUltraModelId;
      const customURLStorage = customSettings.aiUltraModelCustomURL;

      const defaultModel = modelLoader.getDefaultModel();
      const selectedModelId = selectedModelStorageValue ? selectedModelStorageValue : 
        defaultModel?.id;
      const selectedModel = modelList.find(model => model.id === selectedModelId);

      document.getElementById("aiModelList").value = selectedModelId;
      document.getElementById("aiModelPath").value = customURLStorage ? customURLStorage : "";

      const isCompatible = selectedModelStorageValue === "custom" ? true :
        modelLoader.isModelCompatible(selectedModel);

      updateModelDetails(selectedModel, isCompatible, defaultModel?.id === selectedModelId);
      displayCustomURLAIUltraModel(selectedModelId);
    } else {
      document.getElementById("errorLoadingModelList").style.display = "block";
      document.getElementById("formSettingsAIUltraModel").style.display = "none";
    }
  } catch(e) {
    console.error(e);

    document.getElementById("errorLoadingModelList").style.display = "block";
    document.getElementById("loadingModelList").style.display = "none";
    document.getElementById("formSettingsAIUltraModel").style.display = "none";
  }
}

document.getElementById("modalSelectAIUltraModelButton").onclick = () => {
  setupAIModelPopup();
};

document.getElementById("modalLevelSelectAIUltraModelButton").onclick = () => {
  setupAIModelPopup();
};

function updateModelDetails(model, isCompatible, isDefault) {
  if(!model || model.id === "custom") {
    document.getElementById("aiModelDetailsCollapse").style.display = "none";
    document.getElementById("aiModelDetailsCollapseButton").style.display = "none";
    document.getElementById("aiModelDefault").style.display = "none";
    document.getElementById("aiModelNotCompatible").style.display = "none";
    document.getElementById("aiModelDeprecated").style.display = "none";

    return;
  }
  
  document.getElementById("aiModelDetailsCollapse").style.display = null;
  document.getElementById("aiModelDetailsCollapseButton").style.display = null;

  const language = i18next.language.substring(0, 2);
  
  document.getElementById("aiModelName").textContent = model.name[language] || "—";
  document.getElementById("aiModelVersion").textContent = model.version || "—";
  document.getElementById("aiModelGameVersion").textContent = model.gameVersion || "—";
  document.getElementById("aiModelDescription").textContent = model.description[language] || "—";
  document.getElementById("aiModelTechnical").textContent = model.technical[language] || "—";
  document.getElementById("aiModelSize").textContent = model.sizeMb ? model.sizeMb.toFixed(1) : "—";
  document.getElementById("aiModelId").textContent = model.id || "—";
  document.getElementById("aiModelDate").textContent = model.createdAt ?
    new Date(model.createdAt).toLocaleDateString(language, { hour: "numeric", minute: "numeric", second: "numeric" }) : "—";

  if(model.isDeprecated) {
    document.getElementById("aiModelDeprecated").style.display = "block";
  } else {
    document.getElementById("aiModelDeprecated").style.display = "none";
  }

  if(isDefault) {
    document.getElementById("aiModelDefault").style.display = "block";
  } else {
    document.getElementById("aiModelDefault").style.display = "none";
  }

  if(isCompatible) {
    document.getElementById("aiModelNotCompatible").style.display = "none";
  } else {
    document.getElementById("aiModelNotCompatible").style.display = "block";
  }

  const website = document.getElementById("aiModelAuthorWebsite");

  website.textContent = model.author || "—";
  website.href = model.authorWebsite || "#";

  const modelURL = document.getElementById("aiModelURL");

  modelURL.textContent = model.location || "—";
  modelURL.href = model.location || "#";
}

document.getElementById("validateAIUltraModel").onclick = () => {
  const selectElementValue = document.getElementById("aiModelList").value;

  customSettings.aiUltraModelId = selectElementValue;

  if(selectElementValue === "custom") {
    customSettings.aiUltraModelCustomURL = document.getElementById("aiModelPath").value;
  }

  saveSettings();

  modalSelectAIUltraModelInstance.hide();
};

document.getElementById("aiModelList").onchange = async function() {
  const modelLoader = SnakeAIUltraModelLoader.getInstance();
  const modelList = await modelLoader.getModelList();
  const defaultModel = modelLoader.getDefaultModel();

  const model = this.value === "custom" ? { id: "custom" } :
    modelList.find(model => model.id === this.value);

  const isCompatible = this.value === "custom" ? true :
    modelLoader.isModelCompatible(model);

  displayCustomURLAIUltraModel(this.value);
  updateModelDetails(model, isCompatible, defaultModel?.id === this.value);
};

function resetForm(resetValues, resetSeeds) {
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
  document.getElementById("seedGrid").classList.remove("is-invalid");
  document.getElementById("invalidSeedGrid").style.display = "none";
  document.getElementById("seedGame").classList.remove("is-invalid");
  document.getElementById("invalidSeedGame").style.display = "none";

  document.getElementById("resultLevels").innerHTML = "";
  document.getElementById("gameStatus").innerHTML = "";
  document.getElementById("gameOrder").innerHTML = "";
  document.getElementById("gameStatusError").innerHTML = "";

  if(resetSeeds) {
    document.getElementById("seedGrid").value = new seedrandom(Date.now()).int32();
    document.getElementById("seedGame").value = new seedrandom(Date.now() + 1).int32();
  }

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
    document.getElementById("enableAI").checked = false;
  }

  checkSameGrid();
  checkGameSpeed();
  checkPlayer();
  checkFailSettings();
  checkMazeGrid();
  checkEnableAI();
}

document.getElementById("resetSettings").onclick = () => {
  resetForm(true, true);
};

function validateSettings(returnValidation) {
  if(!returnValidation) {
    resetForm(false, false);
  }

  let heightGrid = document.getElementById("heightGrid").value;
  let widthGrid = document.getElementById("widthGrid").value;
  const borderWalls = document.getElementById("borderWalls").checked;
  const generateWalls = document.getElementById("generateWalls").checked;
  const mazeGrid = document.getElementById("mazeGrid").checked;
  const sameGrid = document.getElementById("sameGrid").checked;
  let speed = document.getElementById("gameSpeed").value;
  const progressiveSpeed = document.getElementById("progressiveSpeed").checked;
  const customSpeed = document.getElementById("customSpeed").value;
  let aiLevel = document.getElementById("aiLevel").value;
  let autoRetry = document.getElementById("autoRetry").checked;
  let numberIA = document.getElementById("numberIA").value;
  const battleAgainstAIs = document.getElementById("battleAgainstAIs").checked;
  let seedGrid = document.getElementById("seedGrid").value;
  let seedGame = document.getElementById("seedGame").value;
  let playerHumanType;

  let minGridSize = 5;
  let maxGridSize = 100;
  let minSpeed = 1;
  let maxSpeed = 100;
  let enableAI = true;

  if(selectedMode == BATTLE_ROYALE_ONLINE && onlineClient.serverSettings) {
    const serverSettings = onlineClient.serverSettings;

    minGridSize = serverSettings.minGridSize != undefined ? serverSettings.minGridSize : minGridSize;
    maxGridSize = serverSettings.maxGridSize != undefined ? serverSettings.maxGridSize : maxGridSize;
    minSpeed = serverSettings.minSpeed != undefined ? serverSettings.minSpeed : minSpeed;
    maxSpeed = serverSettings.maxSpeed != undefined ? serverSettings.maxSpeed : maxSpeed;
    enableAI = serverSettings.enableAI;
  }

  document.getElementById("invalidHeight").textContent = i18next.t("settings.invalidSize", { min: minGridSize, max: maxGridSize });
  document.getElementById("invalidWidth").textContent = i18next.t("settings.invalidSize", { min: minGridSize, max: maxGridSize });
  document.getElementById("invalidSpeed").textContent = i18next.t("settings.invalidSpeed", { min: minSpeed, max: maxSpeed });
  document.getElementById("invalidCustomSpeed").textContent = i18next.t("settings.invalidSpeed", { min: minSpeed, max: maxSpeed });

  if(document.getElementById("aiAssistant").checked) {
    playerHumanType = PLAYER_HYBRID_HUMAN_AI;
  } else {
    playerHumanType = PLAYER_HUMAN;
  }

  let formValidated = true;

  if(heightGrid.trim() == "" || isNaN(heightGrid) || heightGrid < minGridSize || heightGrid > maxGridSize) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("heightGrid").classList.add("is-invalid");
      document.getElementById("invalidHeight").style.display = "block";
    }
  } else {
    heightGrid = parseInt(heightGrid);
  }

  if(widthGrid.trim() == "" || isNaN(widthGrid) || widthGrid < minGridSize || widthGrid > maxGridSize) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("widthGrid").classList.add("is-invalid");
      document.getElementById("invalidWidth").style.display = "block";
    }
  } else {
    widthGrid = parseInt(widthGrid);
  }

  if(speed != "custom" && (speed.trim() == "" || isNaN(speed) || speed < minSpeed || speed > maxSpeed)) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("gameSpeed").classList.add("is-invalid");
      document.getElementById("invalidSpeed").style.display = "block";
    }
  } else if(speed != "custom") {
    speed = parseInt(speed);
  }

  if(speed == "custom" && (customSpeed.trim() == "" || isNaN(customSpeed) || customSpeed < minSpeed || customSpeed > maxSpeed)) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("customSpeed").classList.add("is-invalid");
      document.getElementById("invalidCustomSpeed").style.display = "block";
    }
  } else if(speed == "custom") {
    speed = parseInt(customSpeed);
  }

  if(selectedMode != SOLO_PLAYER && selectedMode != BATTLE_ROYALE_ONLINE && (aiLevel != "low" && aiLevel != "normal" && aiLevel != "high" && aiLevel != "ultra" && aiLevel != "random")) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("aiLevel").classList.add("is-invalid");
      document.getElementById("invalidaiLevel").style.display = "block";
    }
  } else if((selectedMode != SOLO_PLAYER && selectedMode != BATTLE_ROYALE_ONLINE) || (selectedMode == BATTLE_ROYALE_ONLINE && document.getElementById("enableAI").checked)) {
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

  if(selectedMode != BATTLE_ROYALE_ONLINE && (seedGrid.trim() == "" || isNaN(seedGrid))) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("seedGrid").classList.add("is-invalid");
      document.getElementById("invalidSeedGrid").style.display = "block";
    }
  }

  if(selectedMode != BATTLE_ROYALE_ONLINE && (seedGame.trim() == "" || isNaN(seedGame))) {
    formValidated = false;

    if(!returnValidation) {
      document.getElementById("seedGame").classList.add("is-invalid");
      document.getElementById("invalidSeedGame").style.display = "block";
    }
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
        private: document.getElementById("privateGame").checked,
        enableAI: enableAI ? document.getElementById("enableAI").checked : false,
        levelAI: aiLevel
      }, data => {
        const errorCode = data.errorCode;

        if(data.connection_error) {
          if(errorCode == GameConstants.Error.AUTHENTICATION_REQUIRED) {
            connectToServer(onlineClient.url, onlineClient.port);
          } else if(data == GameConstants.Error.DISCONNECTED) {
            alert(i18next.t("servers.disconnectedError"));
            displayServerList();
          } else {
            alert(i18next.t("servers.connectionError"));
            displayServerList();
          }
        } else {
          if(data.success) {
            joinRoom(data.code);
          } else {
            if(errorCode == GameConstants.Error.AUTHENTICATION_REQUIRED) {
              connectToServer(onlineClient.url, onlineClient.port);
            } else {
              let errorCode_text = "";
  
              switch(errorCode) {
              case GameConstants.Error.INVALID_SETTINGS:
                errorCode_text = i18next.t("servers.errorRoomCreationReason_invalidSettings");
                break;
              case GameConstants.Error.MAX_ROOM_LIMIT_REACHED:
                errorCode_text = i18next.t("servers.errorRoomCreationReason_maxRoomLimitReached");
                break;
              case GameConstants.Error.ALREADY_CREATED_ROOM:
                errorCode_text = i18next.t("servers.errorRoomCreationReason_alreadyCreatedRoom");
                break;
              default:
                errorCode_text = i18next.t("servers.errorReason_unknown");
                break;
              }
  
              document.getElementById("errorRoomCreation").style.display = "block";
              document.getElementById("errorRoomCreationReason").textContent = errorCode_text;
              displayRoomsList();
            }
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
      document.getElementById("authenticationServer").style.display = "none";

      let titleGame = "";

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

      const games = [];

      if(selectedMode == SOLO_AI) {
        const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, mazeGrid, null, false, seedGrid, seedGame);
        const snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);

        games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
      } else if(selectedMode == SOLO_PLAYER) {
        const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, mazeGrid, null, false, seedGrid, seedGame);
        const snake = new Snake(RIGHT, 3, grid, playerHumanType);

        games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
      } else if(selectedMode == PLAYER_VS_AI) {
        const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, false, null, false, seedGrid, seedGame);
        const snake = new Snake(RIGHT, 3, grid, playerHumanType);

        if(sameGrid) {
          const snake2 = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);
          games.push(new Game(grid, [snake, snake2], speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
        } else {
          const grid2 = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, false, null, false, parseInt(seedGrid) + 1, parseInt(seedGame) + 1);
          const snake2 = new Snake(RIGHT, 3, grid2, PLAYER_AI, aiLevel, autoRetry);

          games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
          games.push(new Game(grid2, snake2, speed, document.getElementById("gameContainer"), false, false, progressiveSpeed, null, null, null, null, customSettings));
        }
      } else if(selectedMode == AI_VS_AI) {
        const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, false, null, false, seedGrid, seedGame);
        const snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);

        if(sameGrid) {
          const snake2 = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);
          games.push(new Game(grid, [snake, snake2], speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
        } else {
          const grid2 = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, false, null, false, parseInt(seedGrid) + 1, parseInt(seedGame) + 1);
          const snake2 = new Snake(RIGHT, 3, grid2, PLAYER_AI, aiLevel, autoRetry);

          games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
          games.push(new Game(grid2, snake2, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
        }
      } else if(selectedMode == BATTLE_ROYALE) {
        if(sameGrid) {
          const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, false, null, false, seedGrid, seedGame);
          const snakes = [];

          if(battleAgainstAIs) {
            snakes.push(new Snake(RIGHT, 3, grid, playerHumanType, aiLevel, autoRetry));
          }

          for(let i = 0; i < numberIA; i++) {
            snakes.push(new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry));
          }

          games.push(new Game(grid, snakes, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings));
        } else {
          if(battleAgainstAIs) {
            const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, false, null, false, seedGrid, seedGame);
            const snake = new Snake(RIGHT, 3, grid, playerHumanType, aiLevel, autoRetry);

            games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed, 350, 250, null, null, customSettings));
          }

          for(let i = 0; i < numberIA; i++) {
            seedGrid++;
            seedGame++;

            const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, false, null, false, seedGrid, seedGame);
            const snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, autoRetry);

            games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), true, false, progressiveSpeed, 350, 250, null, null, customSettings));
          }
        }
      }

      const group = new GameGroup(games);
      group.setDebugMode(customSettings.showDebugInfo ? true : false);
      group.start();

      if(group.games[0].canvas != undefined) {
        group.games[0].canvas.scrollIntoView();
      }

      if(mazeGrid && (selectedMode == SOLO_AI || selectedMode == SOLO_PLAYER)) {
        group.setNotification(new NotificationMessage(i18next.t("engine.mazeMode"), null, GameConstants.Setting.INFO_NOTIF_COLOR, 5, null, null, null, true));
      }

      document.getElementById("backToMenuGame").onclick = () => {
        if(confirm(i18next.t("game.confirmQuit"))) {
          group.killAll();
          displayMenu();
        }
      };

      group.onStop(() => {
        if(selectedMode == PLAYER_VS_AI || selectedMode == AI_VS_AI || selectedMode == BATTLE_ROYALE && !group.errorOccurred()) {
          let resultMessage = "";
          const winners = group.getWinners();

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
              let playerWinnerBattleRoyale = false;
              resultMessage = i18next.t("game.winnersBattleRoyale") + " ";

              for(let i = 0; i < winners.index.length; i++) {
                if(battleAgainstAIs && winners.index[i] == 0) {
                  playerWinnerBattleRoyale = true;
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
            group.setNotification(new NotificationMessage(resultMessage, null, GameConstants.Setting.INFO_NOTIF_COLOR, 15, null, null, null, true));
          }
        }
      });

      group.onExit(() => {
        if(selectedMode == SOLO_AI || selectedMode == SOLO_PLAYER || selectedMode == AI_VS_AI || (selectedMode == PLAYER_VS_AI && sameGrid) || (selectedMode == BATTLE_ROYALE && sameGrid)) {
          group.killAll();
          displayMenu();
        }
      });

      group.onReset(() => {
        document.getElementById("resultLevels").innerHTML = "";
        document.getElementById("gameStatus").innerHTML = "";
        document.getElementById("gameOrder").innerHTML = "";
        document.getElementById("gameStatusError").innerHTML = "";
        group.closeNotification();
      });
    }
  }
}

document.getElementById("validateSettings").onclick = () => {
  validateSettings();
};

// Levels
const levelsBonusData = {
  "BONUS_AI_ASSISTANT": {
    "text": "levels.bonus.aiAssistant",
    "information": "levels.bonus.aiAssistantInfo",
    "price": 25,
    "applicableTo": [GameConstants.PlayerType.HUMAN]
  },
  "BONUS_INCREASE_GOLD_FRUIT_PROB": {
    "text": "levels.bonus.increaseGoldFruits",
    "information": "levels.bonus.increaseGoldFruitsInfo",
    "price": 50,
    "applicableTo": [GameConstants.PlayerType.AI, GameConstants.PlayerType.HUMAN]
  },
  "BONUS_NO_TIME_LIMIT": {
    "text": "levels.bonus.noTimeLimit",
    "information": "levels.bonus.noTimeLimitInfo",
    "price": 75,
    "applicableTo": [GameConstants.PlayerType.AI, GameConstants.PlayerType.HUMAN]
  },
  "BONUS_DESTROY_AIS": {
    "text": "levels.bonus.destroyAis",
    "information": "levels.bonus.destroyAisInfo",
    "price": 75,
    "applicableTo": [GameConstants.PlayerType.AI, GameConstants.PlayerType.HUMAN]
  },
  "BONUS_PASS_LEVEL": {
    "text": "levels.bonus.passLevel",
    "information": "levels.bonus.passLevelInfo",
    "price": 100,
    "applicableTo": [GameConstants.PlayerType.AI, GameConstants.PlayerType.HUMAN]
  },
  "BONUS_UNLOCK_ALL_LEVELS": {
    "text": "levels.bonus.unlockAllLevels",
    "information": "levels.bonus.unlockAllLevelsInfo",
    "price": 1000,
    "applicableTo": [GameConstants.PlayerType.AI, GameConstants.PlayerType.HUMAN]
  }
};

function getTitleSave(player, type) {
  if(type == DEFAULT_LEVEL) {
    if(player == PLAYER_HUMAN) {
      return SOLO_PLAYER_SAVE + "defautLevelsSave";
    } else if(player == PLAYER_AI) {
      return SOLO_AI_SAVE + "defautLevelsSave";
    }
  } else if(type == DOWNLOADED_LEVEL) {
    if(player == PLAYER_HUMAN) {
      return SOLO_PLAYER_SAVE + "downloadedLevelsSave";
    } else if(player == PLAYER_AI) {
      return SOLO_AI_SAVE + "downloadedLevelsSave";
    }
  }

  return null;
}

function getSave(player, type) {
  if(storageGlobal.getItem(getTitleSave(player, type)) == null) {
    initSaveLevel(player, type, false);
  }

  try {
    const res = JSON.parse(storageGlobal.getItem(getTitleSave(player, type)));
    return res;
  } catch(e) {
    console.error(e);

    initSaveLevel(player, type, true);
    return getSave(player, type);
  }
}

function getLevelSave(level, player, type) {
  return getSave(player, type)[level];
}

function setLevelSave(value, level, player, type) {
  const save = getTitleSave(player, type);
  const item = getSave(player, type);
  const levels = getLevels(player, type);

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

function setAddFruitLevelSave(player, score) {
  const save = getTitleSave(player, DEFAULT_LEVEL);
  const item = getSave(player, DEFAULT_LEVEL);

  if(item != null) {
    if(!item["numFruits"] || isNaN(item["numFruits"])) {
      item["numFruits"] = 0;
    }

    item["numFruits"] += score;
    storageGlobal.setItem(save, JSON.stringify(item));

    return true;
  }

  return false;
}

function initSaveLevel(player, type, force) {
  if(typeof(Storage) !== "undefined") {
    const save = getTitleSave(player, type);
    const item = storageGlobal.getItem(save);

    if(item == null || force) {
      storageGlobal.setItem(save, JSON.stringify({ version: GameConstants.Setting.APP_VERSION, numFruits: 0, currentBonus: null, unlockAllLevels: false }));
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
        console.error(e);
        return null;
      }
    } else if(player == PLAYER_AI) {
      try {
        return JSON.parse(storageGlobal.getItem(SOLO_AI_DOWNLOAD_LEVELS_TO));
      } catch(e) {
        console.error(e);
        return null;
      }
    }
  }

  return null;
}

function canPlay(level, player, type) {
  if(customSettings.unlockAllLevels) return true;
  if(getSave(player, DEFAULT_LEVEL).unlockAllLevels) return true;

  let res = true;
  const levels = getLevels(player, type);

  if(levels == null) {
    return false;
  }

  for(let i = 1; i < level; i++) {
    const save = getLevelSave(i, player, type);

    if(save == null || (!save[0] && levelCompatible(levels[i]["type"], levels[i]["version"]))) {
      res = false;
    }
  }

  return res;
}

function levelCompatible(levelType, version) {
  const isKnownLevelType = LEVEL_TYPES.includes(levelType);
  const isCompatibleVersion = semver.gte(GameConstants.Setting.APP_VERSION, normalizeVersion(version));
  
  return isKnownLevelType && isCompatibleVersion;
}

function printResultLevel(level, player, levelType, type, shortVersion) {
  let val = "";
  let resultLevel = getLevelSave(level, player, type);

  if(resultLevel == null) {
    return "";
  }

  resultLevel = resultLevel[1];

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

window.playLevel = (level, player, type) => {
  const levelSave = getLevelSave(level, player, type);
  const bonus = getSave(player, DEFAULT_LEVEL)["currentBonus"];
  const levels = getLevels(player, type);

  if(levels == null) {
    return false;
  }

  if(levels[level] != null) {
    const levelSelected = levels[level];
    const levelSettings = levelSelected["settings"];
    const levelType = levelSelected["type"];
    let levelTypeValue = levelSelected["typeValue"];
    const levelVersion = levelSelected["version"];

    if(!levelCompatible(levelType, levelVersion)) {
      alert(i18next.t("levels.notCompatible"));
      return false;
    }

    if(!canPlay(level, player, type)) {
      alert(i18next.t("levels.disabledLevel"));
      return false;
    }

    if(bonus == "BONUS_PASS_LEVEL" && (!levelSave || levelSave[0] != true)) {
      setLevelSave([true, Array.isArray(levelTypeValue) && levelTypeValue.length >= 2 ? levelTypeValue[1] : levelTypeValue], level, player, type);
      buyBonus(null, player);
      displayLevelList(player);
      return true;
    }

    if(bonus == "BONUS_NO_TIME_LIMIT" && levelType == LEVEL_REACH_SCORE_ON_TIME) {
      levelTypeValue = [levelTypeValue[0], -1];
      buyBonus(null, player);
    }

    const heightGrid = levelSettings[0];
    const widthGrid = levelSettings[1];
    const borderWalls = levelSettings[2];
    const generateWalls = levelSettings[3];
    const sameGrid = levelSettings[4];
    const speed = levelSettings[5];
    const progressiveSpeed = levelSettings[6];
    const aiLevel = levelSettings[7];
    const numberIA = levelSettings[8];
    const generateMaze = levelSettings[9];
    const customGrid = levelSettings[10];
    const mazeForceAuto = levelSettings[11];
    const seedGrid = levelSettings[12];
    const seedGame = levelSettings[13];
    let destroyAis = false;

    const games = [];

    const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, generateMaze, customGrid, mazeForceAuto, seedGrid, seedGame, !generateMaze && bonus == "BONUS_INCREASE_GOLD_FRUIT_PROB");
    let playerSnake;
    let playerGame;

    if(!generateMaze && bonus == "BONUS_INCREASE_GOLD_FRUIT_PROB") {
      buyBonus(null, player);
    }

    if(player == PLAYER_AI) {
      const settings = getSettings();
      let aiLevel = AI_LEVEL_HIGH;

      switch(settings.levelsAILevel) {
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

      playerSnake = new Snake(RIGHT, 3, grid, player, aiLevel);
    } else if(player == PLAYER_HUMAN) {
      if(bonus == "BONUS_AI_ASSISTANT" && !generateMaze) {
        playerSnake = new Snake(RIGHT, 3, grid, GameConstants.PlayerType.HYBRID_HUMAN_AI);
        buyBonus(null, player);
      } else {
        playerSnake = new Snake(RIGHT, 3, grid, player);
      }
    }

    if(sameGrid) {
      const snakes = [playerSnake];

      for(let i = 0; i < numberIA; i++) {
        snakes.push(new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel));
        destroyAis = bonus == "BONUS_DESTROY_AIS";
      }

      playerGame = new Game(grid, snakes, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, null, null, null, null, customSettings);
      games.push(playerGame);
    } else {
      let width, height;

      if(numberIA + 1 <= 2) {
        width = null;
        height = null;
      } else {
        width = 350;
        height = 250;
      }

      playerGame = new Game(grid, playerSnake, speed, document.getElementById("gameContainer"), true, true, progressiveSpeed, width, height, null, null, customSettings);
      games.push(playerGame);

      for(let i = 0; i < numberIA; i++) {
        const grid = new Grid(widthGrid, heightGrid, generateWalls, borderWalls, generateMaze, customGrid, mazeForceAuto, seedGrid, seedGame);
        const snake = new Snake(RIGHT, 3, grid, PLAYER_AI, aiLevel, false);
        destroyAis = bonus == "BONUS_DESTROY_AIS";

        games.push(new Game(grid, snake, speed, document.getElementById("gameContainer"), false, false, progressiveSpeed, width, height, null, null, customSettings));
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
    document.getElementById("authenticationServer").style.display = "none";

    document.getElementById("resultLevels").innerHTML = "";
    document.getElementById("gameStatus").innerHTML = "";
    document.getElementById("gameOrder").innerHTML = "";
    document.getElementById("gameStatusError").innerHTML = "";

    document.getElementById("titleGame").innerHTML = i18next.t("levels.level") + " " + level;

    const group = new GameGroup(games);
    group.setDebugMode(customSettings.showDebugInfo ? true : false);
    group.start();
    group.closeRanking();

    document.getElementById("gameOrder").scrollIntoView();

    let levelTimer = new Timer(null, 0);
    let notificationEndDisplayed = false;
    let notificationStartDisplayed = false;
    const notifErrorColor = GameConstants.Setting.ERROR_NOTIF_COLOR;
    const notifInfosColor = GameConstants.Setting.INFO_NOTIF_COLOR;
    let notifInfo;
    let textToDisplayGoal;

    document.getElementById("backToMenuGame").onclick = () => {
      if(confirm(i18next.t("game.confirmQuit"))) {
        levelTimer.pause();
        group.killAll();
        displayLevelList(player);
      }
    };

    function initGoal() {
      let lastScorePlayer = 0;

      if(levelType == LEVEL_REACH_SCORE) {
        playerGame.onScoreIncreased(() => {
          setAddFruitLevelSave(player, playerGame.snakes[0].score - lastScorePlayer);
          lastScorePlayer = playerGame.snakes[0].score;

          if(playerGame.snakes[0].score >= levelTypeValue) {
            setLevelSave([true, playerGame.snakes[0].score], level, player, type);
            playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved")));
              notificationEndDisplayed = true;
            }
          }
        });

        playerGame.onStop(() => {
          lastScorePlayer = 0;

          if(playerGame.snakes[0].score < levelTypeValue) {
            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalNotAchieved"), null, notifErrorColor, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
          }
        });

        playerGame.onReset(() => {
          lastScorePlayer = 0;
        });
      } else if(levelType == LEVEL_REACH_SCORE_ON_TIME) {
        if(levelTypeValue[1] >= 0) {
          levelTimer = new Timer(() => {
            playerGame.setTimeToDisplay(0);
            document.getElementById("gameStatus").innerHTML = i18next.t("levels.timerRemaining", { count: 0 });
  
            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalNotAchieved"), null, notifErrorColor, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
  
            group.stopAll(true);
          }, levelTypeValue[1] * 1000 - 1, new TimerInterval(() => {
            document.getElementById("gameStatus").innerHTML = i18next.t("levels.timerRemaining", { count: Math.round(levelTimer.getTime() / 1000) });
            playerGame.setTimeToDisplay(Math.round(levelTimer.getTime() / 1000));
          }));
        }

        playerGame.onStart(() => {
          levelTimer.resume();
        });

        playerGame.onPause(() => {
          levelTimer.pause();
        });

        playerGame.onReset(() => {
          levelTimer.reset();
        });

        playerGame.onStop(() => {
          levelTimer.pause();
        });

        playerGame.onScoreIncreased(() => {
          if(playerGame.snakes[0].score >= levelTypeValue[0]) {
            const stop = (levelTypeValue[1] * 1000) - levelTimer.getTime();
            levelTimer.reset();
            group.stopAll(true);
            setLevelSave([true, stop / 1000], level, player, type);
            setAddFruitLevelSave(player, playerGame.snakes[0].score);
            playerGame.setBestScore(printResultLevel(level, player, levelType, type, true));

            if(!notificationEndDisplayed) {
              playerGame.setNotification(new NotificationMessage(i18next.t("levels.goalAchieved"), null, null, null, null, null, null, true));
              notificationEndDisplayed = true;
            }
          }
        });
      } else if(levelType == LEVEL_REACH_MAX_SCORE) {
        playerGame.onStop(() => {
          if(playerGame.scoreMax) {
            setLevelSave([true, playerGame.snakes[0].score], level, player, type);
            setAddFruitLevelSave(player, playerGame.snakes[0].score);
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
        group.onStop(() => {
          const winners = group.getWinners();
          let won = false;

          for(let i = 0; i < winners.winners.length; i++) {
            if(winners.winners[i] == playerGame.snakes[0]) {
              won = true;
              setLevelSave([true, playerGame.snakes[0].score], level, player, type);
              setAddFruitLevelSave(player, playerGame.snakes[0].score);
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
        let time = 0;

        const timerInterval = new TimerInterval(() => {
          time++;
        });

        playerGame.onStart(() => {
          timerInterval.start();
        });

        playerGame.onPause(() => {
          timerInterval.stop();
        });

        playerGame.onReset(() => {
          time = 0;
          timerInterval.stop();
        });

        playerGame.onStop(() => {
          timerInterval.stop();
        });

        group.onScoreIncreased(() => {
          for(let i = 0; i < group.games.length; i++) {
            for(let j = 0; j < group.games[i].snakes.length; j++) {
              if(group.games[i].snakes[j].score >= levelTypeValue) {
                if(group.games[i].snakes[j] == playerGame.snakes[0]) {
                  group.stopAll(true);
                  setLevelSave([true, time], level, player, type);
                  setAddFruitLevelSave(player, playerGame.snakes[0].score);
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
        let time = 0;

        const timerInterval = new TimerInterval(() => {
          time++;
        });

        playerGame.onStart(() => {
          timerInterval.start();
        });

        playerGame.onPause(() => {
          timerInterval.stop();
        });

        playerGame.onReset(() => {
          time = 0;
          timerInterval.stop();
        });

        playerGame.onStop(() => {
          timerInterval.stop();
        });

        playerGame.onScoreIncreased(() => {
          if(playerGame.snakes[0].score >= 1) {
            setLevelSave([true, time], level, player, type);
            setAddFruitLevelSave(player, Math.round((playerGame.grid.width * playerGame.grid.height) / 50));
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
        if(levelTypeValue[1] >= 0) document.getElementById("gameStatus").innerHTML = i18next.t("levels.timerRemaining", { count: levelTypeValue[1] });
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

    group.onExit(() => {
      levelTimer.pause();
      group.killAll();
      displayLevelList(player);
    });

    group.onReset(() => {
      document.getElementById("resultLevels").innerHTML = "";
      document.getElementById("gameStatus").innerHTML = "";
      document.getElementById("gameOrder").innerHTML = "";
      document.getElementById("gameStatusError").innerHTML = "";
      notificationEndDisplayed = false;
      notificationStartDisplayed = false;
      displayInfosGoal();
    });

    playerGame.onStart(() => {
      if(!notificationEndDisplayed && !notificationStartDisplayed) {
        notifInfo = new NotificationMessage(textToDisplayGoal, null, notifInfosColor, 10);
        playerGame.setNotification(notifInfo);
        notificationStartDisplayed = true;
      }
      
      if(destroyAis) {
        group.destroySnakes([0], [GameConstants.PlayerType.AI]);
        buyBonus(null, player);
      }
    });
  } else {
    return false;
  }
};

window.editDownloadURL = () => {
  const value = window.prompt(i18next.t("levels.editDownloadURLPrompt"), DOWNLOAD_DEFAULT_URI);

  if(value != null) {
    DOWNLOAD_DEFAULT_URI = value;
  }
};

window.downloadLevels = (player, button) => {
  let url = DOWNLOAD_DEFAULT_URI;
  url = url.replace("{player}", player);
  url = url.replace("{appVersion}", GameConstants.Setting.APP_VERSION);

  button.disabled = true;

  const buttonDeblock = document.createElement("button");
  buttonDeblock.classList = "btn btn-lg btn-warning";
  buttonDeblock.innerHTML = i18next.t("levels.buttonDeblock");

  document.getElementById("levelDownloading").innerHTML = "<strong>" + i18next.t("levels.downloading") + "</strong>";
  document.getElementById("btnDeblockDiv").innerHTML = "";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (player == PLAYER_HUMAN) {
        storageGlobal.setItem(SOLO_PLAYER_DOWNLOAD_LEVELS_TO, JSON.stringify(data));
      } else if (player == PLAYER_AI) {
        storageGlobal.setItem(SOLO_AI_DOWNLOAD_LEVELS_TO, JSON.stringify(data));
      }

      displayLevelList(player);

      document.getElementById("levelDownloading").innerHTML = "";
      document.getElementById("btnDeblockDiv").innerHTML = "";
      
      button.disabled = false;
    })
    .catch(error => {
      console.error("Error downloading levels:", error);
      document.getElementById("levelDownloading").innerHTML = i18next.t("levels.downloadError");
      
      button.disabled = false;
    });
};

function getNumberFruits(player) {
  const item = getSave(player, DEFAULT_LEVEL);

  if(item != null) {
    if(!item["numFruits"] || isNaN(item["numFruits"])) {
      item["numFruits"] = 0;
    }

    return item["numFruits"];
  }

  return false;
}

function getListLevel(player, type) {
  const levels = getLevels(player, type);
  let res = "";

  if(type == DOWNLOADED_LEVEL) {
    res += "<div class=\"row mb-3\"><div class=\"col text-center\"><button class=\"btn btn-lg btn-warning\" onclick=\"downloadLevels(" + player + ", this);\"><span class=\"fui-plus-circle\"></span>&nbsp; " + i18next.t("levels.download") + "</button><br /><a href=\"#null\" onclick=\"editDownloadURL();\" class=\"small\"><span class=\"fui-new\"></span>&nbsp; " + i18next.t("levels.editDownloadURL") + "</a></div></div>";
  }

  if(levels == null) {
    return res + "<strong>" + i18next.t("levels.emptyList") + "</strong>";
  }

  let index = 1;
  let empty = true;

  for(const key in levels) {
    let button;

    if(Object.prototype.hasOwnProperty.call(levels, key)) {
      if(!canPlay(key, player, type)) {
        button = "<button class=\"btn btn-lg btn-primary btn-block-85\" disabled aria-label=\"" + i18next.t("levels.disabledLevel") + "\" data-balloon-length=\"fit\" data-balloon-pos=\"up\">" + i18next.t("levels.level") + " " + index + "</button>";
      } else if(!levelCompatible(levels[key]["type"], levels[key]["version"])) {
        button = "<button class=\"btn btn-lg btn-primary btn-block-85\" disabled aria-label=\"" + i18next.t("levels.notCompatible") + "\" data-balloon-length=\"fit\" data-balloon-pos=\"up\">" + i18next.t("levels.level") + " " + index + "</button>";
      } else {
        const resultLevel = printResultLevel(key, player, levels[key]["type"], type);

        button = "<button class=\"btn btn-lg btn-primary btn-block-85\" onclick=\"playLevel(" + key + ", " + player  + ", " + type + ");\" " + (resultLevel.trim() != "" ? "aria-label=\"" + printResultLevel(key, player, levels[key]["type"], type) + "\" data-balloon-length=\"fit\" data-balloon-pos=\"up\"" : "") + ">" + i18next.t("levels.level") + " " + index + "</button>";
      }

      if(index == 1) {
        res += "<div class=\"row mb-2\">";
      }

      if(index % 2 == 0) {
        res += "<div class=\"col pl-0 justify-content-center\">" + button + "</div></div><div class=\"row mb-2\">";
      } else {
        res += "<div class=\"col pr-0 justify-content-center\">" + button + "</div>";
      }

      empty = false;
    }

    index++;
  }

  if(empty) {
    return res + "<strong>" + i18next.t("levels.emptyList") + "</strong>";
  }

  if(index % 2 == 0) {
    res += "<div class=\"col pr-0 justify-content-center\"></div>";
  }

  return res + "</div>";
}

function getListBonus(player) {
  const item = getSave(player, DEFAULT_LEVEL);
  const div = document.createElement("div");

  const p = document.createElement("p");
  p.classList.add("mb-1");
  const pStrong = document.createElement("strong");
  pStrong.textContent = i18next.t("levels.bonusEquipped") + " ";
  const bonus = document.createElement("span");
  bonus.textContent = item["currentBonus"] ? (levelsBonusData[item["currentBonus"]] ? i18next.t(levelsBonusData[item["currentBonus"]].text) : i18next.t("levels.bonus.unknown")) : i18next.t("levels.none");

  p.appendChild(pStrong);
  p.appendChild(bonus);

  if(item["currentBonus"]) {
    const sellBonusLink = document.createElement("a");
    sellBonusLink.addEventListener("click", () => sellBonus(player));
    sellBonusLink.setAttribute("aria-label", i18next.t("levels.sellBonus"));
    sellBonusLink.setAttribute("data-balloon-length", "medium");
    sellBonusLink.classList.add("text-danger", "ml-2");
    sellBonusLink.style.cursor = "pointer";

    const sellBonusSpan = document.createElement("span");
    sellBonusSpan.classList.add("fui-cross");

    sellBonusLink.appendChild(sellBonusSpan);
    p.appendChild(sellBonusLink);
  }

  div.appendChild(p);

  for(const key in levelsBonusData) {
    const subDiv = document.createElement("div");
    subDiv.classList.add("m-2");

    const divBtnGroup = document.createElement("div");
    divBtnGroup.classList.add("btn-group", "flex-wrap");

    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.textContent = i18next.t(levelsBonusData[key].text);
    button.style.width = "250px";
    button.setAttribute("data-balloon-length", "large");

    if(levelsBonusData[key].applicableTo.indexOf(player) < 0 || (item["unlockAllLevels"] && (key == "BONUS_UNLOCK_ALL_LEVELS" || key == "BONUS_PASS_LEVEL"))) {
      button.disabled = true;
      button.classList.add("disabled");
      button.setAttribute("aria-label", i18next.t("levels.bonusNotApplicable"));
    } else if(levelsBonusData[key].price > getNumberFruits(player)) {
      button.disabled = true;
      button.classList.add("disabled");
      button.setAttribute("aria-label", i18next.t("levels.notEnoughFruits"));
    } else if(item["currentBonus"] != null) {
      button.disabled = true;
      button.classList.add("disabled");
      button.setAttribute("aria-label", i18next.t("levels.bonusAlreadyEquipped"));
    } else {
      button.addEventListener("click", () => buyBonus(key, player));
    }

    const buttonInfo = document.createElement("div");
    buttonInfo.classList.add("btn", "btn-info");
    buttonInfo.setAttribute("aria-label", i18next.t(levelsBonusData[key].information));
    buttonInfo.setAttribute("data-balloon-length", "large");
    const iconInfo = document.createElement("span");
    iconInfo.classList.add("fui-question-circle");
    buttonInfo.appendChild(iconInfo);

    const buttonPrice = document.createElement("div");
    buttonPrice.style.width = "125px";
    const image = document.createElement("img");
    image.classList.add("align-text-bottom");
    image.src = "assets/images/skin/flat/fruit.png";
    image.width = 24;
    image.height = 24;
    const span2 = document.createElement("span");
    span2.textContent = " × " + levelsBonusData[key].price;
    buttonPrice.appendChild(image);
    buttonPrice.appendChild(span2);

    divBtnGroup.appendChild(button);
    divBtnGroup.appendChild(buttonInfo);
    divBtnGroup.appendChild(buttonPrice);

    subDiv.appendChild(divBtnGroup);
    div.appendChild(subDiv);
  }

  return div;
}

function buyBonus(bonus, player) {
  const save = getTitleSave(player, DEFAULT_LEVEL);
  const item = getSave(player, DEFAULT_LEVEL);

  if(bonus == null) {
    item["currentBonus"] = null;
    storageGlobal.setItem(save, JSON.stringify(item));
  } else if(levelsBonusData[bonus].applicableTo.indexOf(player) < 0 || (item["unlockAllLevels"] && (bonus == "BONUS_UNLOCK_ALL_LEVELS" || bonus == "BONUS_PASS_LEVEL"))) {
    alert(i18next.t("levels.bonusNotApplicable"));
  } else if(levelsBonusData[bonus].price > getNumberFruits(player)) {
    alert(i18next.t("levels.notEnoughFruits"));
  } else if(item["currentBonus"] != null) {
    alert(i18next.t("levels.bonusAlreadyEquipped"));
  } else {
    item["numFruits"] -= levelsBonusData[bonus].price;

    if(bonus == "BONUS_UNLOCK_ALL_LEVELS") {
      item["unlockAllLevels"] = true;
    } else {
      item["currentBonus"] = bonus;
    }

    storageGlobal.setItem(save, JSON.stringify(item));
    displayLevelList(player);

    return true;
  }

  return false;
}

function sellBonus(player) {
  const save = getTitleSave(player, DEFAULT_LEVEL);
  const item = getSave(player, DEFAULT_LEVEL);

  if(item["currentBonus"] != null) {
    if(levelsBonusData[item["currentBonus"]] || confirm(i18next.t("levels.bonus.unknownInfo"))) {
      if(levelsBonusData[item["currentBonus"]]) {
        item["numFruits"] += levelsBonusData[item["currentBonus"]].price;
      }

      item["currentBonus"] = null;
      storageGlobal.setItem(save, JSON.stringify(item));
      displayLevelList(player);
  
      return true;
    }
  }

  return false;
}

// Localization
function listTranslations(languages) {
  if(languages != null) {
    document.getElementById("languageSelect").disabled = true;
    document.getElementById("languageSelect").innerHTML = "";

    for(let i = 0; i < languages.length; i++) {
      document.getElementById("languageSelect").innerHTML = document.getElementById("languageSelect").innerHTML + "<option data-i18n=\"lang." + languages[i] + "\" value=\""+ languages[i] +"\"></option>";
    }

    document.getElementById("languageSelect").value = i18next.language.substr(0, 2);
    document.getElementById("languageSelect").disabled = false;
  }
}

function translateContent() {
  listTranslations(i18next.languages);

  const i18nList = document.querySelectorAll("[data-i18n]");

  for(let i = 0, l = i18nList.length; i < l; i++) {
    i18nList[i].innerHTML = i18next.t(i18nList[i].dataset.i18n);
  }

  document.getElementById("dateTxt").innerHTML = i18next.t("menu.versionDate", { date: new Intl.DateTimeFormat(i18next.language.substr(0, 2)).format(new Date(DATE_VERSION)) });

  document.getElementById("heightGrid").placeholder = i18next.t("settings.placeholderHeight");
  document.getElementById("widthGrid").placeholder = i18next.t("settings.placeholderWidth");
  document.getElementById("customSpeed").placeholder = i18next.t("settings.placeholderCustomSpeed");
  document.getElementById("numberIA").placeholder = i18next.t("settings.placeholderNumberIA");

  document.getElementById("appDownloadURLGet").setAttribute("aria-label", i18next.t("update.getURL"));
  document.getElementById("appUpdateChanges").setAttribute("aria-label", i18next.t("update.getChanges"));

  document.getElementById("appUpdateDateLocalized").innerHTML = i18next.t("update.versionDate", { date: new Intl.DateTimeFormat(i18next.language.substr(0, 2)).format(new Date(document.getElementById("appUpdateDate").innerHTML)) });

  document.getElementById("aiAssistantInfos").setAttribute("aria-label", i18next.t("settings.aiAssistantInfos"));
  document.getElementById("multithreadingInfos").setAttribute("aria-label", i18next.t("menu.multithreadingInfos"));
  document.getElementById("seedGridInfos").setAttribute("aria-label", i18next.t("settings.seedGridInfos"));
  document.getElementById("seedGameInfos").setAttribute("aria-label", i18next.t("settings.seedGameInfos"));
  document.getElementById("onlineEnableClientSidePredictionsInfos").setAttribute("aria-label", i18next.t("menu.onlineEnableClientSidePredictionsInfos"));
  document.querySelectorAll(".settingNotAvailable").forEach(e => {
    e.setAttribute("aria-label", i18next.t("menu.settingNotAvailable"));
  });
}

document.getElementById("languageSelect").onchange = () => {
  i18next.changeLanguage(document.getElementById("languageSelect").value, () => {
    translateContent();
  });
};

window.addEventListener("load", () => {
  setTimeout(() => {
    translateContent();
    checkUpdate();
  }, 250);
});

// Installable app
if("serviceWorker" in navigator) {
  //navigator.serviceWorker.register("service-worker.js");
}