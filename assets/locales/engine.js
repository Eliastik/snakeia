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
 // French
 i18next.addResourceBundle("fr", "translation", {
   "engine": {
     "score": "Score",
     "num": "n°",
     "initFailed": "Échec de l'initialisation du jeu : le Snake est plus grand que la grille",
     "continue": "Reprendre",
     "reset": "Recommencer la partie",
     "retryInit": "Réessayer",
     "exit": "Quitter",
     "yes": "Oui",
     "no": "Non",
     "ok": "OK",
     "about": "À propos…",
     "infosGame": "Infos partie",
     "player": "Joueur :",
     "playerHuman": "Vous",
     "playerAI": "IA",
     "aiLevel": "Niveau de l'IA :",
     "aiLevelList": {
       "random": "Au hasard",
       "low": "Faible",
       "normal": "Normal",
       "high": "Élevé",
       "ultra": "Ultra"
     },
     "sizeGrid": "Taille de la grille :",
     "currentSpeed": "Vitesse actuelle :",
     "progressiveSpeed": "Vitesse progressive",
     "loading": "Chargement des ressources…",
     "exited": "Cette partie a été définitivement quittée. En attente de la fin des autres parties…",
     "error": "Une erreur est survenue !",
     "errorLoading": "Une erreur est survenue lors du chargement des ressources. Vérifiez votre connexion Internet.",
     "exitConfirm": "Êtes-vous sûr de vouloir quitter la partie ?",
     "resetConfirm": "Êtes-vous sûr de vouloir recommencer la partie ?",
     "scoreMax": "Score maximal atteint !",
     "gameOver": "Game Over !",
     "gameFinished": "Partie terminée !",
     "pause": "Pause",
     "playerMin": "J",
     "aiMin": "IA",
     "aboutScreen": {
       "title": "SnakeIA par Eliastik",
       "versionAndDate": "Version {{version}} ({{date, DD/MM/YYYY}})"
     },
     "debug": {
       "fps": "IPS",
       "frames": "Images",
       "ticks": "Tours",
       "speed": "Vit.",
       "paused": "En pause"
     },
     "colors": {
       "white": "Blanc",
       "gray": "Gris",
       "black": "Noir",
       "red": "Rouge",
       "brown": "Marron",
       "orange": "Orange",
       "yellow": "Jaune",
       "green": "Vert",
       "blue": "Bleu",
       "purple": "Mauve",
       "pink": "Rose"
     },
     "colorPlayer": "Vous êtes le Snake\nen {{color}}",
     "ready": "Prêt ?",
     "assistAI": "Assistant IA",
     "exitFullScreen": "Quitter plein-écran"
   }
}, true, false);

// English
i18next.addResourceBundle("en", "translation", {
  "engine": {
    "score": "Score",
    "num": "n°",
    "initFailed": "Game init failed: the Snake is bigger than the grid",
    "continue": "Continue",
    "reset": "Reset the game",
    "retryInit": "Retry",
    "exit": "Exit",
    "yes": "Yes",
    "no": "No",
    "ok": "OK",
    "about": "About…",
    "infosGame": "Current game infos",
    "player": "Player:",
    "playerHuman": "You",
    "playerAI": "AI",
    "aiLevel": "AI level:",
    "aiLevelList": {
      "random": "Random",
      "low": "Low",
      "normal": "Normal",
      "high": "High",
      "ultra": "Ultra"
    },
    "sizeGrid": "Grid size:",
    "currentSpeed": "Current speed:",
    "progressiveSpeed": "Progressive speed",
    "loading": "Loading resources…",
    "exited": "This game has been definitively exited. Waiting for the end of the other games…",
    "error": "An error has occurred!",
    "errorLoading": "An error occurred while loading resources. Check your Internet connection.",
    "exitConfirm": "Are you sure that you want to exit the game?",
    "resetConfirm": "Are you sure that you want to reset the game?",
    "scoreMax": "Maximum score reached!",
    "gameFinished": "Game finished!",
    "gameOver": "Game Over!",
    "pause": "Pause",
    "playerMin": "P",
    "aiMin": "AI",
    "aboutScreen": {
      "title": "SnakeIA by Eliastik",
      "versionAndDate": "Version {{version}} ({{date, MM/DD/YYYY}})"
    },
    "debug": {
      "fps": "FPS",
      "frames": "Frames",
      "ticks": "Ticks",
      "speed": "Speed",
      "paused": "Paused"
    },
    "colors": {
      "white": "White",
      "gray": "Gray",
      "black": "Black",
      "red": "Red",
      "brown": "Brown",
      "orange": "Orange",
      "yellow": "Yellow",
      "green": "Green",
      "blue": "Blue",
      "purple": "Purple",
      "pink": "Pink"
    },
    "colorPlayer": "You are the Snake\nin {{color}}",
    "ready": "Ready?",
    "assistAI": "AI assistant",
    "exitFullScreen": "Exit fullscreen"
  }
}, true, false);
