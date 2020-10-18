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

// French
i18next.addResourceBundle("fr", "translation", {
  "debugModeEnabled": "Mode de debug activé",
  "lang": {
    "fr": "Français",
    "en": "English"
  },
  "update": {
    "updateAvailable": "Une mise à jour du jeu est disponible",
    "version": "Version",
    "of": "du",
    "current": "Vous disposez actuellement de la version",
    "versionDate": "{{date, DD/MM/YYYY}}",
    "download": "Télécharger la mise à jour",
    "getURL": "Obtenir l'adresse URL du téléchargement",
    "getChanges": "Obtenir la liste des changements",
    "URLToDownload": "Adresse URL menant au téléchargement :",
    "noChanges": "Aucun changement renseigné.",
    "changes": "Changements de la nouvelle version :"
  },
  "menu": {
    "selectGame": "Sélectionnez un mode de jeu :",
    "soloAi": "IA solo",
    "soloPlayer": "Joueur solo",
    "playerVsAi": "Joueur VS IA",
    "aiVsAi": "IA VS IA",
    "battleRoyale": "Battle Royale",
    "onlineBattleRoyale": "Battle Royale en ligne",
    "levelsSoloPlayer": "Niveaux (joueur solo)",
    "levelsSoloAI": "Niveaux (IA solo)",
    "version": "Version",
    "versionDate": "{{date, DD/MM/YYYY}}",
    "by": "Par",
    "infos": "Plus d'infos",
    "readme": "Fichier Lisez-moi",
    "source": "Télécharger la source",
    "language": "Langue :",
    "othersSettings": "Paramètres",
    "enableAnimations": "Activer les animations",
    "showDebugInfo": "Activer le mode de débogage",
    "renderBlur": "Activer le rendu de flou",
    "enableMultithreading": "Activer le multi-threading",
    "onlineEnableClientSidePredictions": "Activer les prédictions côté client pour le jeu en ligne",
    "settingNotAvailable": "Ce paramètre est actuellement indisponible.",
    "multithreadingInfos": "Si activé, le moteur de jeu et le moteur graphique seront exécutés de manière indépendante ce qui améliorera les performances du jeu.",
    "onlineEnableClientSidePredictionsInfos": "Si activé, les performances du mode de jeu en ligne seront plus stables. Fonctionnalité expérimentale.",
    "textOutput": "Activer le rendu en mode texte",
    "graphicSkin": "Skin graphique :",
    "flat": "Flat (par défaut)",
    "tropical": "Tropical",
    "pixel": "Pixel",
    "maxFPS": "FPS maximum :"
  },
  "settings": {
    "title": "Paramètres de la partie :",
    "possibleFailInitGame": "Il est possible que l'initialisation de la partie échoue avec vos paramètres car il n'y aura pas assez d'espace pour placer tous les Snake. Dans ce cas, un message « Une erreur est survenue » peut s'afficher. Essayez avec d'autres paramètres.",
    "gridSize": "Taille de la grille :",
    "placeholderHeight": "Hauteur",
    "placeholderWidth": "Largeur",
    "invalidSize": "Cette valeur doit être comprise entre {{min}} et {{max}}",
    "options": "Autres options :",
    "borderWalls": "Entourer la grille de murs",
    "generateWalls": "Générer des murs à des positions aléatoires",
    "mazeGrid": "Générer un labyrinthe",
    "sameGrid": "Partie sur la même grille",
    "speed": "Vitesse du jeu :",
    "speedSelect": {
      "1": "1 – La plus rapide",
      "3": "3 – Rapide",
      "5": "5 – Moyenne",
      "8": "8 – Normale",
      "10": "10 – Assez lente",
      "15": "15 – Lente",
      "20": "20 – Très lente",
      "25": "25 – Extrêmement lente",
      "custom": "Vitesse personnalisée…"
    },
    "invalidSpeed": "Cette valeur doit être comprise entre {{min}} et {{max}}",
    "progressiveSpeed": "Augmenter la vitesse progressivement",
    "customSpeed": "Vitesse personnalisée :",
    "placeholderCustomSpeed": "Entrez la vitesse…",
    "customSpeedHelp": "Plus le nombre est élevé, plus la vitesse du jeu est lente, et inversement",
    "playerSettings": "Options du joueur :",
    "aiAssistant": "Activer l'assistant IA",
    "aiAssistantInfos": "En activant cette option, une IA tentera de corriger votre trajectoire si vous êtes sur le point de vous écraser sur un obstacle. Réduit la difficulté du jeu.",
    "aiLevel": "Niveau de l'IA :",
    "aiLevelSelect": {
      "random": "Au hasard",
      "low": "Faible",
      "normal": "Normal",
      "high": "Élevé",
      "ultra": "Ultra"
    },
    "invalidaiLevel": "Cette valeur est invalide",
    "autoRetry": "Faire que l'IA recommence auto sa partie après un Game Over",
    "numberIA": "Nombre d'IA :",
    "placeholderNumberIA": "Entrez le nombre…",
    "invalidIANumber": "Cette valeur doit être comprise entre 2 et 100",
    "battleAgainstAIs": "Jouer contre les IA",
    "validate": "Valider",
    "reset": "Réinitialiser",
    "backToMenu": "Retour au menu",
    "privateGame": "Garder la partie privée",
    "enableAI": "Activer les IA",
    "seedGrid": "Valeur aléatoire grille :",
    "seedGame": "Valeur aléatoire jeu :",
    "advancedSettings": "Paramètres avancés…",
    "invalidValue": "Cette valeur est invalide."
  },
  "game": {
    "backToMenu": "Retour au menu",
    "currentMode": "Mode de jeu actuel :",
    "confirmQuit": "Êtes-vous sûr de vouloir retourner au menu ?",
    "equalityPlayerVSAI": "Vous avez fini ex-aequo avec l'IA !",
    "winPlayerVSAI": "Bravo, vous avez gagné !",
    "losePlayerVSAI": "Dommage, l'IA vous a battu avec un score supérieur !",
    "oneWinnerAIVSAI": "L'IA n°{{numWinner}} a gagné !",
    "equalityAIVSAI": "Les deux IA ont fini ex-aequo !",
    "oneWinnerBattleRoyale": "L'IA n°{{numWinner}} a gagné avec un score de {{score}} !",
    "winnersBattleRoyale": "Les IA",
    "winnerAIBattleRoyale": "L'IA",
    "winnersNumBattleRoyale": "n°{{numWinner}}",
    "andWinnersBattleRoyale": "et",
    "andPlayerWinnersBattleRoyale": "ainsi que vous",
    "winScoreBattleRoyale": "ont gagné avec un score de {{score}} !",
    "winPlayerScoreBattleRoyale": "avez gagné avec un score de {{score}} !",
    "playerWinnerBattleRoyale": "Vous avez gagné avec un score de {{score}} !"
  },
  "levels": {
    "default": "Niveaux par défaut",
    "downloaded": "Niveaux téléchargés",
    "titlePlayer": "Niveaux (joueur solo)",
    "titleAI": "Niveaux (IA solo)",
    "emptyList": "Aucun niveau trouvé…",
    "download": "Télécharger des niveaux",
    "downloadLink": "Les niveaux seront téléchargés depuis {{url}}",
    "editDownloadURL": "Modifier l'URL de téléchargement",
    "editDownloadURLPrompt": "Entrez l'URL de téléchargement des niveaux.\n* Variables disponibles :\n{player} - type de joueur (humain, IA)\n{appVersion} - version de l'application.\n\nLa modification de ce paramètre peut faire planter le jeu ou vous exposer à des problèmes de sécurité. Ne la modifiez que si vous savez ce que vous faites. Ce paramètre n'est pas persistant et sera effacé si vous rechargez l'application.",
    "downloading": "Téléchargement en cours, veuillez patienter… Si le bouton reste grisé après plus de 10 secondes, cliquez sur le bouton ci-dessous pour le débloquer et réessayer le téléchargement :",
    "buttonDeblock": "Débloquer le téléchargement",
    "disabledLevel": "Niveau bloqué. Terminez les niveaux précédents pour le débloquer.",
    "notCompatible": "Ce niveau n'est pas compatible avec cette version du jeu. Mettez-le à jour.",
    "goalAchieved": "Objectif atteint ! Vous pouvez passer au prochain niveau.",
    "goalNotAchieved": "Objectif raté ! Essayez à nouveau.",
    "level": "Niveau",
    "reachScore": "Atteignez au moins le score de {{value}} pour passer ce niveau !",
    "reachScoreTime": "Atteignez le score de {{value}} en moins de {{count}} seconde !",
    "reachScoreTime_plural": "Atteignez le score de {{value}} en moins de {{count}} secondes !",
    "reachMaxScore": "Atteignez le score maximal pour cette grille pour passer ce niveau !",
    "multiBestScore": "Terminez cette partie en obtenant un meilleur score que l'adversaire pour passer ce niveau !",
    "multiBestScore_plural": "Terminez cette partie en obtenant un meilleur score que les adversaires pour passer ce niveau !",
    "multiReachScoreFirst": "Atteignez le score de {{value}} avant l'adversaire pour passer ce niveau !",
    "multiReachScoreFirst_plural": "Atteignez le score de {{value}} avant les adversaires pour passer ce niveau !",
    "mazeMode": "Mode labyrinthe ! Trouvez le chemin vers la pomme pour passer ce niveau.\nLe Snake n'avance pas automatiquement.",
    "bestScore": "Meilleur score : {{count}}",
    "bestTime": "Meilleur temps : {{count}} seconde",
    "bestTime_plural": "Meilleur temps : {{count}} secondes",
    "bestScoreShort": "× {{count}}",
    "bestTimeShort": "{{count}} seconde",
    "bestTimeShort_plural": "{{count}} secondes",
    "timerRemaining": "Il reste {{count}} seconde",
    "timerRemaining_plural": "Il reste {{count}} secondes",
    "localstorageDisabled": "Les cookies sont désactivés sur votre navigateur. Vous perdrez votre progression au prochain rechargement de la page. Activez-les puis rechargez la page pour éviter cela.",
    "difficulty": "Difficulté :",
    "levelBonusShop": "Boutique des bonus",
    "displayBonusShop": "Afficher la boutique…",
    "bonusNotApplicable": "Ce bonus n'est pas applicable.",
    "notEnoughFruits": "Vous n'avez pas assez de crédit pour acheter ce bonus.",
    "bonusAlreadyEquipped": "Vous êtes déjà équipé d'un bonus. Utilisez-le en jouant à un niveau ou vendez-le.",
    "bonusEquipped": "Bonus équipé :",
    "none": "aucun",
    "sellBonus": "Vendre le bonus",
    "bonus": {
      "passLevel": "Passer un niveau",
      "passLevelInfo": "Ce bonus vous permet de passer un niveau. Achetez-le, puis sélectionnez un niveau : celui-ci sera automatiquement passé, comme si vous l'aviez réussi.",
      "aiAssistant": "Mode assistant IA",
      "aiAssistantInfo": "Ce bonus permet d'activer le mode assistant IA. Achetez-le, puis sélectionnez un niveau : le mode assistant IA sera activé. Ne fonctionne pas pour certains niveaux, comme les labyrinthes.",
      "unlockAllLevels": "Débloquer tous les niveaux",
      "unlockAllLevelsInfo": "Ce bonus vous permet de débloquer tous les niveaux, qu'ils soient présents ou futurs.",
      "increaseGoldFruits": "Augmenter la fréquence d'apparition des pommes dorées",
      "increaseGoldFruitsInfo": "Ce bonus vous permet d'augmenter la fréquence d'apparition des pommes dorées : la chance d'apparition passe de 1 chance sur 100 à 1 chance sur 3.",
      "destroyAis": "Détruire les IAs adverses",
      "destroyAisInfo": "Ce bonus vous permet de détruire les IAs adverses, ce qui rend les niveaux contenant des IAs plus faciles.",
      "unknown": "Bonus inconnu",
      "unknownInfo": "Ce bonus est inconnu. Peut-être a-t-il été acheté sur une version plus récente du jeu."
    }
  },
  "servers": {
    "serverList": "Liste des serveurs",
    "selectInfo": "Sélectionnez un serveur :",
    "noServerFound": "Aucun serveur trouvé…",
    "loadingList": "Chargement de la liste des serveurs… Veuillez patienter.",
    "noRoomound": "Aucune salle trouvée…",
    "infos": "{{width}}×{{height}} – Vitesse : {{speed}}",
    "infosBorderWalls": "Grille entourée de murs",
    "infosGenerateWalls": "Murs générés aléatoirement",
    "infosPlayers": "{{count}} joueur/{{max}}",
    "infosPlayers_plural": "{{count}} joueurs/{{max}}",
    "infosSpectators": "{{count}} spectateur",
    "infosSpectators_plural": "{{count}} spectateurs",
    "backToList": "Retour à la liste des serveurs",
    "roomsListTitle": "Liste des salles",
    "roomsListInfos": "Sélectionnez une salle :",
    "loadingRooms": "Chargement de la liste des salles… Veuillez patienter.",
    "createRoom": "Créer une salle",
    "connectionError": "Une erreur est survenue lors de la connexion au serveur. Veuillez réessayer.",
    "errorLoadingRooms": "Une erreur est survenue lors du chargement de la liste des salles. Veuillez réessayer.",
    "creatingRoom": "Création de la salle… Veuillez patienter.",
    "room": "Salle n°{{number}}",
    "errorRoomCreation": "Une erreur est survenue lors de la création de la salle. Veuillez réessayer.",
    "joinPrivateRoom": "Rejoindre une salle privée",
    "enterCode": "Entrez le code de la salle :",
    "customServer": "Serveur personnalisé…",
    "enterCustomServer": "Entrez l'adresse du serveur :",
    "connectingToServer": "Connexion au serveur… Veuillez patienter.",
    "cancel": "Annuler",
    "refreshRooms": "Actualiser la liste",
    "joinRoom": "Connexion à la salle… Veuillez patienter.",
    "errorRoomJoin": "Une erreur est survenue lors de la connexion à la salle. Veuillez réessayer.",
    "errorReason": "Raison de l'erreur :",
    "errorReason_unknown": "Inconnue",
    "errorRoomJoinReason_roomNotFound": "La salle n'a pas été trouvée.",
    "errorRoomJoinReason_roomAlreadyJoined": "Vous avez déjà rejoint cette salle.",
    "errorRoomCreationReason_maxRoomLimitReached": "Le nombre maximal de salles que le serveur peut gérer a été atteint.",
    "errorRoomCreationReason_invalidSettings": "Paramètres invalides.",
    "errorRoomCreationReason_alreadyCreatedRoom": "Vous avez déjà créé une salle ou vous avez déjà rejoint une salle.",
    "errorServerVersion": "La version de ce serveur ({{server_version}}) est différente de votre version du jeu ({{client_version}}). Vous risquez de rencontrer des problèmes.",
    "addressLabel": "Adresse du serveur :",
    "roomCode": "Code de la salle :",
    "untitled": "Sans titre",
    "searchingPlayers": "(recherche de joueurs)",
    "started": "(partie démarrée)",
    "starting": "(démarrage en cours)",
    "authenticationServer": "Authentification au serveur",
    "linkAuthenticationServer": "Si le formulaire ne s'affiche pas, cliquez ici",
    "disconnectedError": "Vous avez été déconnecté du serveur. Veuillez réessayer."
  }
}, true, false);

// English
i18next.addResourceBundle("en", "translation", {
  "debugModeEnabled": "Debug mode enabled",
  "lang": {
    "fr": "Français",
    "en": "English"
  },
  "update": {
    "updateAvailable": "An update of the game is available",
    "version": "Version",
    "of": "of",
    "current": "You currently have the version",
    "versionDate": "{{date, MM/DD/YYYY}}",
    "download": "Download the update",
    "getURL": "Get the URL to the download",
    "getChanges": "Get the list of changes",
    "URLToDownload": "Download URL:",
    "noChanges": "No change provided.",
    "changes": "Changes in the new version:"
  },
  "menu": {
    "selectGame": "Select a game mode:",
    "soloAi": "Single AI",
    "soloPlayer": "Single player",
    "playerVsAi": "Player VS AI",
    "aiVsAi": "AI VS AI",
    "battleRoyale": "Battle Royale",
    "onlineBattleRoyale": "Online Battle Royale",
    "levelsSoloPlayer": "Levels (single player)",
    "levelsSoloAI": "Levels (single AI)",
    "version": "Version",
    "versionDate": "{{date, MM/DD/YYYY}}",
    "by": "By",
    "infos": "More informations",
    "readme": "Readme file",
    "source": "Download the source",
    "language": "Language:",
    "othersSettings": "Settings",
    "enableAnimations": "Enable the animations",
    "showDebugInfo": "Enable the debug mode",
    "renderBlur": "Enable the blur rendering",
    "enableMultithreading": "Enable the multithreading",
    "onlineEnableClientSidePredictions": "Enable the client-side predictions for online game",
    "settingNotAvailable": "This setting is currently unavailable.",
    "multithreadingInfos": "If enabled, the game engine and the graphics engine will run independently which will improve game performance.",
    "onlineEnableClientSidePredictionsInfos": "If enabled, the performance of the online game mode will be more stable. Experimental functionality.",
    "textOutput": "Enable the text mode rendering",
    "graphicSkin": "Graphic skin:",
    "flat": "Flat (by default)",
    "tropical": "Tropical",
    "pixel": "Pixel",
    "maxFPS": "Maximum FPS:"
  },
  "settings": {
    "title": "Game settings:",
    "possibleFailInitGame": "It's possible that the initialization of the game fails with your settings because there will not be enough space to place all the Snake. In this case, a message \"An error has occurred\" may be displayed. Try with other settings.",
    "gridSize": "Grid size:",
    "placeholderHeight": "Height",
    "placeholderWidth": "Width",
    "invalidSize": "This value must be between {{min}} and {{max}}",
    "options": "Others options:",
    "borderWalls": "Surround the grid with walls",
    "generateWalls": "Generate walls at random positions",
    "mazeGrid": "Generate a maze",
    "sameGrid": "Game on the same grid",
    "speed": "Speed:",
    "speedSelect": {
      "1": "1 – Fastest",
      "3": "3 – Fast",
      "5": "5 – Medium",
      "8": "8 – Normal",
      "10": "10 – Quite slow",
      "15": "15 – Slow",
      "20": "20 – Very slow",
      "25": "25 – Extremely slow",
      "custom": "Custom speed…"
    },
    "invalidSpeed": "This value must be between {{min}} and {{max}}",
    "progressiveSpeed": "Increase the speed progressively",
    "customSpeed": "Custom speed:",
    "placeholderCustomSpeed": "Enter the speed…",
    "customSpeedHelp": "The higher the number, the slower the game speed, and vice versa",
    "playerSettings": "Player options:",
    "aiAssistant": "Enable the AI assistant",
    "aiAssistantInfos": "By enabling this option, an AI ​​will try to correct your trajectory if you are about to crash into an obstacle. Reduces the difficulty of the game.",
    "aiLevel": "AI level:",
    "aiLevelSelect": {
      "random": "Random",
      "low": "Low",
      "normal": "Normal",
      "high": "High",
      "ultra": "Ultra"
    },
    "invalidaiLevel": "This value is invalid",
    "autoRetry": "Make the AI restarts its game after a Game Over",
    "numberIA": "Number of AI:",
    "placeholderNumberIA": "Enter the number…",
    "invalidIANumber": "This value must be between 2 and 100",
    "battleAgainstAIs": "Play against AIs",
    "validate": "Validate",
    "reset": "Reset",
    "backToMenu": "Back to the menu",
    "privateGame": "Keep the game private",
    "enableAI": "Enable the AIs",
    "seedGrid": "Grid random value:",
    "seedGame": "Game random value:",
    "advancedSettings": "Advanced settings…",
    "invalidValue": "This value is invalid."
  },
  "game": {
    "backToMenu": "Back to the menu",
    "currentMode": "Current game mode:",
    "confirmQuit": "Are you sure that you want to go back to the menu?",
    "equalityPlayerVSAI": "You finished tied with AI!",
    "winPlayerVSAI": "Congratulations, you won!",
    "losePlayerVSAI": "Too bad, the AI ​​beat you with a higher score!",
    "oneWinnerAIVSAI": "The AI n°{{numWinner}} won!",
    "equalityAIVSAI": "The two AIs finished tied!",
    "oneWinnerBattleRoyale": "The AI n°{{numWinner}} won with a score of {{score}}!",
    "winnersBattleRoyale": "The AIs",
    "winnerAIBattleRoyale": "The AI",
    "winnersNumBattleRoyale": "n°{{numWinner}}",
    "andWinnersBattleRoyale": "and",
    "andPlayerWinnersBattleRoyale": "as well as you",
    "winScoreBattleRoyale": "won with a score of {{score}}!",
    "winPlayerScoreBattleRoyale": "won with a score of {{score}}!",
    "playerWinnerBattleRoyale": "You won with a score of {{score}}!"
  },
  "levels": {
    "default": "Default levels",
    "downloaded": "Downloaded levels",
    "titlePlayer": "Levels (single player)",
    "titleAI": "Levels (single AI)",
    "emptyList": "No level found…",
    "download": "Download levels",
    "downloadLink": "The levels will be downloaded from {{url}}",
    "editDownloadURL": "Edit the download URL",
    "editDownloadURLPrompt": "Enter the download URL of the levels.\n* Available variables:\n{player} - player type (human, AI)\n{appVersion} - version of the application.\n\nChanging this setting may cause the game to crash or expose you to security issues. Only change it if you know what you are doing. This setting is not persistent and will be erased if you reload the application.",
    "downloading": "Downloading, please wait… If the button remains gray after more than 10 seconds, click on the button below to unblock and try again:",
    "buttonDeblock": "Unlock the download",
    "disabledLevel": "Level locked. Complete the previous levels to unlock it.",
    "notCompatible": "This level is not compatible with this version of the game. Update it.",
    "goalAchieved": "Goal achieved! You can move to the next level.",
    "goalNotAchieved": "Goal missed! Try again.",
    "level": "Level",
    "reachScore": "Reach at least the score of {{value}} to pass this level!",
    "reachScoreTime": "Reach the score of {{value}} in less than {{count}} second!",
    "reachScoreTime_plural": "Reach the score of {{value}} in less than {{count}} seconds!",
    "reachMaxScore": "Reach the maximum score for this grid to pass this level!",
    "multiBestScore": "Finish this game by getting a better score than the opponent to pass this level!",
    "multiBestScore_plural": "Finish this game by getting a better score than the opponents to pass this level!",
    "multiReachScoreFirst": "Reach the score of {{value}} before the opponent to pass this level!",
    "multiReachScoreFirst_plural": "Reach the score of {{value}} before the opponents to pass this level!",
    "mazeMode": "Maze mode! Find the path to the apple to pass this level.\nThe Snake doesn't move automatically.",
    "bestScore": "Best score: {{count}}",
    "bestTime": "Best time: {{count}} second",
    "bestTime_plural": "Best time: {{count}} seconds",
    "timerRemaining": "{{count}} second left",
    "timerRemaining_plural": "{{count}} seconds left",
    "bestScoreShort": "× {{count}}",
    "bestTimeShort": "{{count}} second",
    "bestTimeShort_plural": "{{count}} seconds",
    "localstorageDisabled": "Cookies are disabled on your browser. You will lose your progress the next time you reload the page. Activate them and reload the page to avoid this.",
    "difficulty": "Difficulty :",
    "levelBonusShop": "Bonus shop",
    "displayBonusShop": "Display the shop…",
    "bonusNotApplicable": "This bonus is not applicable.",
    "notEnoughFruits": "You don't have enough credit to buy this bonus.",
    "bonusAlreadyEquipped": "You are already equipped with a bonus. Use it while playing a level or sell it.",
    "bonusEquipped": "Equipped bonus:",
    "none": "none",
    "sellBonus": "Sell the bonus",
    "bonus": {
      "passLevel": "Pass a level",
      "passLevelInfo": "This bonus allows you to pass a level. Buy it, then select a level: it will be automatically passed, as if you had succeeded it.",
      "aiAssistant": "Assistant AI mode",
      "aiAssistantInfo": "This bonus enables the AI ​​assistant mode to be activated. Buy it, then select a level: AI assistant mode will be activated. Does not work for some levels, like mazes.",
      "unlockAllLevels": "Unlock all levels",
      "unlockAllLevelsInfo": "This bonus allows you to unlock all levels, whether present or future.",
      "increaseGoldFruits": "Increase the frequency of appearance of golden apples",
      "increaseGoldFruitsInfo": "This bonus allows you to increase the frequency of appearance of golden apples: the chance of appearing is reduced from 1 in 100 to 1 in 3.",
      "destroyAis": "Destroy opponent AIss",
      "destroyAisInfo": "This bonus allows you to destroy enemy AIs, which makes levels with AIs easier.",
      "unknown": "Unknown bonus",
      "unknownInfo": "This bonus is unknown. Perhaps it was purchased on a newer version of the game."
    }
  },
  "servers": {
    "serverList": "Servers list",
    "selectInfo": "Select a server:",
    "noServerFound": "No server found…",
    "loadingList": "Loading servers list… Please wait.",
    "noRoomound": "No room found…",
    "infos": "{{width}}×{{height}} – Speed: {{speed}}",
    "infosBorderWalls": "Grid bordered by walls",
    "infosGenerateWalls": "Random walls",
    "infosPlayers": "{{count}} player/{{max}}",
    "infosPlayers_plural": "{{count}} players/{{max}}",
    "infosSpectators": "{{count}} spectator",
    "infosSpectators_plural": "{{count}} spectators",
    "backToList": "Back to the servers list",
    "roomsListTitle": "Rooms list",
    "roomsListInfos": "Select a room:",
    "loadingRooms": "Loading the rooms list… Please wait.",
    "createRoom": "Create a room",
    "connectionError": "An error has occurred when connecting to the server. Please retry.",
    "errorLoadingRooms": "An error has occurred when loading the rooms list. Please retry.",
    "creatingRoom": "Creating the room… Please wait.",
    "room": "Room n°{{number}}",
    "errorRoomCreation": "An error has occurred when creating the room. Please retry.",
    "joinPrivateRoom": "Join a private room",
    "enterCode": "Enter the code of the room:",
    "customServer": "Custom server…",
    "enterCustomServer": "Enter the address of the server:",
    "connectingToServer": "Connecting to the server… Please wait.",
    "cancel": "Cancel",
    "refreshRooms": "Refresh the list",
    "joinRoom": "Joining the room… Please wait.",
    "errorRoomJoin": "An error has occurred when joining the room. Please retry.",
    "errorReason": "Error reason:",
    "errorReason_unknown": "Unknown",
    "errorRoomJoinReason_roomNotFound": "The room was not found.",
    "errorRoomJoinReason_roomAlreadyJoined": "You already joined this room.",
    "errorRoomCreationReason_maxRoomLimitReached": "The maximum number of rooms the server can manage has been reached.",
    "errorRoomCreationReason_invalidSettings": "Invalid settings.",
    "errorRoomCreationReason_alreadyCreatedRoom": "You have already created a room or you have already joined a room.",
    "errorServerVersion": "This server version ({{server_version}}) is different from your version of the game ({{client_version}}). You may encounter issues.",
    "addressLabel": "Server address:",
    "roomCode": "Room code:",
    "untitled": "Untitled",
    "searchingPlayers": "(searching players)",
    "started": "(game started)",
    "starting": "(game starting)",
    "authenticationServer": "Server authentication",
    "linkAuthenticationServer": "If the form does not appear, click here",
    "disconnectedError": "You have been disconnected from the server. Please retry."
  }
}, true, false);