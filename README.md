<img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/assets/images/logo/logo.png" width="300" alt="SnakeIA" />
<p><img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/screenshot.png" width="300" alt="Screenshot" /> <img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/screenshot2.png" width="300" alt="Screenshot" /></p> <img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/screenshot3.png" width="300" alt="Screenshot" /></p>

# English

A Snake version with an artificial intelligence. This version has many game modes. You can play against the AI, or let it play alone. A Battle Royale mode is also available, this mode sees between 2 and 100 AI fight! Many settings are available to vary the games. A Levels mode (for the player and the AI) is also available, it's a series of level with a particular goal to achieve (get a minimum score, get a score in time, …). Downloadable levels are available.

An online game mode is also available! Game servers are already opened so you can play online with others players. This repository hosts the client and the game engine used by the server program. Check the repository [SnakeIA Server](https://github.com/Eliastik/snakeia-server) for more informations.

Game written in pure JavaScript and object oriented.

* Online version of this game: [www.eliastiksofts.com/snakeia/demo](http://www.eliastiksofts.com/snakeia/demo/)
* Github repository: [https://github.com/Eliastik/snakeia](https://github.com/Eliastik/snakeia)

## About the AIs (Artificial Intelligence)

The game features multiple AI modes that play the game autonomously.

The AI Ultra mode is a trained AI using the Deep Q-Learning algorithm along with several enhancements, including Dueling Layers, Double Q-Learning, Noisy Networks, Prioritized Experience Replay, and more.
It is developed using the TensorFlow.js framework.

Other AI modes include:

* Random: Performs random actions.
* Low: A basic heuristic (rule-based) AI.
* Normal: Uses the A* algorithm (pathfinding), but does not support torus mode.
* High: Uses the A* algorithm with torus mode enabled and falls back to the Low mode heuristics if it gets stuck.

## About this game

* Version: 2.2
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* License: GNU GPLv3 (see LICENCE.txt file)

### Credits

* Uses the JavaScript library [Lowlight.Astar](https://github.com/lowlighter/astar) under [MIT](https://opensource.org/licenses/mit-license.php) license
* Uses the JavaScript library [Socket.IO client](https://github.com/socketio/socket.io-client) under [MIT](https://github.com/socketio/socket.io-client/blob/master/LICENSE) license
* Uses the JavaScript library [i18next](https://github.com/i18next/i18next) (with the module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) under [MIT](https://opensource.org/licenses/mit-license.php) license for the translation engine
* Uses the Tensorflow.js framework for Ultra AI mode
* Uses the CSS framework [Bootstrap 4](https://getbootstrap.com/) and the theme [Flat UI](https://designmodo.github.io/Flat-UI/)
* Uses the CSS library [balloon.css](https://kazzkiq.github.io/balloon.css/) under [MIT](https://github.com/kazzkiq/balloon.css/blob/master/LICENSE) license
* Uses graphic elements from [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728), [Trophy](https://www.flaticon.com/free-icon/cup_625398), [Clock](https://www.flaticon.com/free-icon/clock_214288), [Snake](https://www.flaticon.com/free-icon/snake_194210) (changed), [Rank](https://www.flaticon.com/free-icon/ranking_2665632) (changed)
* Uses the font [Delius](https://www.fontsquirrel.com/fonts/delius) under SIL Open Font License
* The "tropical" graphic skin uses as a base a [picture from here](https://commons.wikimedia.org/wiki/File:Gunther%27s_Racer_Coluber_gracilis_Snake_snake_by_Dr._Raju_Kasambe_(23).jpg) under Creative Commons Attribution-Share Alike 4.0 International license, [this picture](https://www.piqsels.com/fr/public-domain-photo-zbzjp) under [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en) license and [this picture](https://commons.wikimedia.org/wiki/File:Red_brick_wall_texture.JPG) under Creative Commons Attribution-Share Alike 3.0 Unported license

## Changelog

* Version 2.2 (10/18/2020):
  - Addition of a bonus shop for the Levels game mode: this store allows you to buy bonuses among 6 available, in exchange for apples (which can be collected in the levels);
  - The apples are no longer placed in the corridors (zone where only one row/col of the grid is empty) whatever their size;
  - The game now detects when Snakes are placed near a wall or another Snake: in this case, the Snake is flipped the other way;
  - The game now detects if the last AIs are blocked: in this case, if the AIs remain blocked, the game ends (unless one or more human players are still playing);
  - AIs now better detect golden apples;
  - Bug fixes and adjustments:
    - Fixed an animation bug;
    - The ZQSD/WASD keys are recognized again;
    - Fixed a bug with random values ​​that did not give the same results depending on whether they came from a game that had been restarted or not;
    - Fixed a bug with the counter before a new game in the online game mode;
    - Fixed a crash in the online game mode when the client side predictions mode was enabled;
    - Removed the message "An error has occurred" that appeared stealthily in the online game mode when a room was joined and which could block the game for the user;
    - Fixed a possible bug when multi-threading was enabled in the settings and which could prevent a game from starting;
    - Fixed other minor bugs;
    - Addition of new unit tests related to the new features added;
    - Small corrections of the English translation.

* Version 2.1.1 (01/06/2020) :
  - Added an animation when a Snake loses (it bounces on the obstacle);
  - It's now possible to move the Snake by sliding your finger in the desired direction;
  - The ranking can now be scrolled using the mouse wheel or via the finger on mobile devices, and a scrollbar is now displayed;
  - Added a new graphic skin (Pixel);
  - Improvement of the animations;
  - It's now possible to limit the FPS (frames per second) in the settings;
  - The unknown cell type will now display a "?";
  - Bug fixes and other adjustments;
  - Technical improvements:
    - The classes have been converted to ES6+ classes, the build script now uses Babel;
    - The functions of the game UI have been separated into several classes inheriting from JSGameTools.Component;
    - The different AI levels now have their own classes, it's possible to pass a custom AI class to the Snake constructor;
    - performance.now used instead of Date.now for animation calculations.

* Version 2.1 (5/3/2020):
  - Improvement of the online game mode: possibility of enabling AIs in online mode, client-side predictions (improves performance, experimental functionality disabled by default), latency (ping) displayed in the game informations;
  - Settings menu added to adjust different game settings;
  - Addition of a new graphic skin (Tropical), this skin can be enabled in the game settings;
  - Golden apples can appear sometimes in all game modes: these types of apples increase the score by 3 at once;
  - The game now uses two different pseudo-random number generators that can be initialized by seeds; these seeds can be customized in the Advanced settings when creating a new game (not available in online mode) - the same seed will result in an identical game if the others settings are the same;
  - Major performance improvement;
  - Bug fixes and other adjustments:
    - Apples are no longer placed on a cell surrounded by 3 or more walls;
    - When there is no more free space available, the game stops only when all the apples have been reached;
    - A progress bar has been added to the resource loading screen;
    - The server can now send a notification to the client in the online game mode;
    - Bug fixes with Safari browser;
    - Other minor bug fixes.
  - Technical modifications:
    - The graphical user interface elements have been moved to the [JSGameTools](https://github.com/Eliastik/JSGameTools) module;
    - JavaScript dependencies are now managed via npm;
    - GameEngineWorker build managed by Webpack;
    - Addition of unit tests.

* Version 2.0.1 (3/18/2020):
  - Fixed online mode authentication

* Version 2.0 (3/18/2020):
  - Added an online game mode! This is the Battle Royale mode playable online. Servers are already opened and can be used. Check the repository [SnakeIA Server](https://github.com/Eliastik/snakeia-server) for more informations.
  - Many fixes and improvements, although every effort has been made for the online game mode.

* Version 1.5 (1/31/2020):
  - Performance improvement (multi-threading);
  - Fixed speed management: the game is smoother;
  - Major changes in the architecture of the game code (MVC, other changes);
  - Bug fixes and other adjustments.

* Version 1.4.2 (10/7/2019):
  - Added a labyrinth mode: it's now possible to generate mazes. The goal is to find the path to the apple through the maze. Levels of this type are also possible (to download later).
  - Bug fixes and other adjustments.

* Version 1.4.1 (9/29/2019):
  - The movement of the Snakes is now animated;
  - The player's Snake is indicated by an arrow in a game with several AI opponents;
  - The game can now be played with the ZQSD/WASD keys;
  - Bug fixes, performance improvements and others adjustments.

* Version 1.4.0.1 (9/7/2019):
  - Fixed a problem affecting performance;
  - The game is paused when full-screen mode is enabled or exited;
  - Updated software libraries;
  - Others minors fixes.

* Version 1.4 (8/2/2019):
  - The game now detects if the apple is blocked by obstacles (walls, dead Snake) and inaccessible then avoids to put the apple in these places or changes its position;
  - Many improvements of the game interface:
    - The top banner and its elements resize automatically according to the size of the screen;
    - All game infos (winners, level goal, level won/failed messages) are displayed at the bottom of the game interface as notifications;
    - Display of the best score/time directly in the game interface in Levels mode;
    - Display of the remaining time for the levels involving a counter;
    - Buttons resize automatically if necessary;
    - Improved text display (automatic line wrap, etc.);
    - Display of the percentage of loading of the resources;
    - The page now scrolls to the game interface when starting a game;
    - Displaying a full-screen mode button while displaying the counter before the start of a game;
    - Display of a button Exit full-screen when possible and necessary;
    - The game prevents scrolling of the page with the arrows of the keyboard during a game;
    - Others minors adjustments of the interface.
  - Fixed a bug that reduced the performance and fluidity of the game during a game involving multiple players (human or AI) due to the display of text above the Snake;
  - Improved processing of resource loading errors;
  - Other bugfixes and adjustments.

* Version 1.3.2.1 (7/25/2019):
  - Additions to use the game in offline mode and to be offered installation on compatible platforms;
  - Other corrections.

* Version 1.3.2 (7/25/2019):
  - Added the AI assistant for the player. By enabling this option, an AI ​​will try to correct your trajectory if you are about to crash into an obstacle. Reduces the difficulty of the game ;
  - Bug fixes and others adjustments.

* Version 1.3.1 (7/18/2019):
  - Correction of the speed at the start of the game if the frame rate is greater or less than 60;
  - Added a new type of level: reach a given score before the opponents (no level exploits it for the moment);
  - Fixed others bugs and fixed compatibility with Microsoft Edge and Safari.

* Version 1.3 (7/12/2019):
  - Possibility for several players to play on the same grid! This mode supports a hundred players (a human player and a hundred AI) on the same grid! Players are differentiated according to their color. Their name and score are displayed above each one;
  - Introduction of Levels game mode (for AI and player);
  - Generation of a random color for each Snake at each new game;
  - The menus are navigable with the keyboard, it's also possible to pause the game by pressing the Enter key;
  - Bug fixes and adjustments (see commits on Github);
  - Added a level of AI "Random" (random movements of the AI).

* Version 1.2 (7/3/2019):
  - Migration to the Lowlight.Astar software library, which supports torus-shaped grids, which improves AI performance;
  - Correction and improvement of the performances of the AI ​​in low level mode;
  - Fixed the generation of walls at random positions: dead ends are now detected and removed;
  - Fixed a bug with the translation engine during the initial loading of the page: in some cases, the page was not translated and the language menu did not load;
  - Support for resource loading errors: an error message is displayed in this case;
  - A Current game infos menu is available in the Pause menu > About…;
  - The minimum speed allowed is now 100;
  - Simplifications of the code.

* Version 1.1 (6/30/2019):
  - Integration of the i18next translation engine and translation of the application into English;
  - Various improvements and bug fixes:
    - The menus and texts automatically adapt to the width of the game space and the screen resolution (automatic reduction/increase of text size and buttons, automatic line jump);
    - Optimization of the display of the control buttons for the player (arrows), this improves performance;
    - The default speed is now 8;
    - Other minor bug fixes and texts fixes.

* Version 1.0 (6/19/2019):
    - Initial version

## How to compile

You can compile yourself the JavaScript code if you made a change. To do this, you have to install Node.js and npm.

To install Node.js and npm for your OS, read this page: https://docs.npmjs.com/getting-started/installing-node

Git clone the repository and cd to the project directory (or download it directly from Github):
````
git clone https://github.com/Eliastik/snakeia.git
cd snakeia
````

Then run this command to install the dependencies:
````
npm install
````
Then to compile:

* Dev mode: `npm run build-dev`
* Prod mode: `npm run build`
* Watch mode: `npm run watch`

This will compile the JavaScript code into the sub-directory "dist".

SnakeIA contains some unit tests. To execute them, launch the command `npm run test`.

## How to train the AI

The Ultra AI mode is powered by a Deep Q-Learning algorithm, trained on multiple games using TensorFlow.js.

To train the AI, first install the dependencies:

````
npm install
````

Then run the following command:

```
npm run train-ai
```

You can customize the training settings in the train-ai.mjs script.

# Français

Une version du Snake dotée d'une intelligence artificielle. Cette version est dotée de nombreux modes de jeu. Vous pouvez notamment jouer contre l'IA, ou la laisser jouer seule. Un mode Battle Royale est également disponible, ce mode voit s'affronter entre 2 et 100 IA ! De nombreux paramétrages sont disponibles pour varier les parties. Un mode Niveaux (pour le joueur et l'IA) est également disponible, il s'agit d'un série de niveau dotés d'un objectif particulier à accomplir (obtenir un score minimal, obtenir un score en un certain temps, …). Des niveaux téléchargeables sont disponibles.

Un mode de jeu en ligne est disponible ! Des serveurs sont déjà ouverts pour que vous puissiez jouer avec d'autres joueurs. Ce dépôt fourni le client ainsi que le moteur de jeu utilisé par le programme serveur. Plus d'informations sur le dépôt [SnakeIA Server](https://github.com/Eliastik/snakeia-server).

Jeu programmé en JavaScript pur et en orienté objet.

* Version en ligne de ce jeu : [www.eliastiksofts.com/snakeia/demo](http://www.eliastiksofts.com/snakeia/demo/)
* Dépôt Github : [https://github.com/Eliastik/snakeia](https://github.com/Eliastik/snakeia)

# À propos des IA (Intelligences Artificielles)

Le jeu propose plusieurs modes d’IA capables de jouer de manière autonome.

Le mode IA Ultra est une intelligence artificielle entraînée avec l’algorithme de Deep Q-Learning, amélioré par plusieurs optimisations telles que les Dueling Layers, le Double Q-Learning, les Noisy Networks, le Prioritized Experience Replay, et d'autres encore.
Elle a été développée grâce au framework TensorFlow.js.

Les autres modes d’IA sont :

* Aléatoire : Effectue des actions au hasard.
* Faible : Une IA basique utilisant des heuristiques (basée sur des règles).
* Normale : Une IA utilisant l’algorithme de recherche de chemin A*, mais sans mode tore.
* Élevée : Une IA basée sur A* avec le mode tore activé, et qui utilise les heuristiques du mode Faible si elle se retrouve bloquée.

## À propos du jeu

* Version du jeu : 2.2
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* Licence : GNU GPLv3 (voir le fichier LICENCE.txt)

### Crédits

* Utilise la bibliothèque logicielle JavaScript [Lowlight.Astar](https://github.com/lowlighter/astar) sous licence [MIT](https://opensource.org/licenses/mit-license.php)
* Utilise la bibliothèque logicielle JavaScript [Socket.IO client](https://github.com/socketio/socket.io-client) sous licence [MIT](https://github.com/socketio/socket.io-client/blob/master/LICENSE)
* Utilise la bibliothèque logicielle JavaScript [i18next](https://github.com/i18next/i18next) (avec le module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) sous licence [MIT](https://opensource.org/licenses/mit-license.php) pour le moteur de traduction
* Utilise le framework Tensorflow.js pour le mode d'IA ultra
* Utilise le framework CSS [Bootstrap 4](https://getbootstrap.com/) et le thème [Flat UI](https://designmodo.github.io/Flat-UI/)
* Utilise la bibliothèque logicielle CSS [balloon.css](https://kazzkiq.github.io/balloon.css/) sous licence [MIT](https://github.com/kazzkiq/balloon.css/blob/master/LICENSE)
* Utilise des éléments graphiques venant de [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728), [Trophy](https://www.flaticon.com/free-icon/cup_625398), [Clock](https://www.flaticon.com/free-icon/clock_214288), [Snake](https://www.flaticon.com/free-icon/snake_194210) (modifié), [Rank](https://www.flaticon.com/free-icon/ranking_2665632) (modifié)
* Utilise la police de caractères [Delius](https://www.fontsquirrel.com/fonts/delius) sous licence SIL Open Font License
* Le skin graphique "tropical" utilise comme base une [photo venant d'ici](https://commons.wikimedia.org/wiki/File:Gunther%27s_Racer_Coluber_gracilis_Snake_snake_by_Dr._Raju_Kasambe_(23).jpg) sous licence Creative Commons Attribution-Share Alike 4.0 International, [cette photo](https://www.piqsels.com/fr/public-domain-photo-zbzjp) sous licence [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en) et [cette photo](https://commons.wikimedia.org/wiki/File:Red_brick_wall_texture.JPG) sous licence Creative Commons Attribution-Share Alike 3.0 Unported

## Journal des changements

* Version 2.2 (18/10/2020) :
  - Ajout d'une boutique de bonus pour le mode de jeu Niveaux : cette boutique permet d'acheter des bonus parmi 6 disponibles, en échange de pommes (qui peuvent être ramassées dans les niveaux) ;
  - Les pommes ne sont plus placées dans les couloirs (zone où une seule ligne/colonne de la grille est vide) quelque soit leur taille ;
  - Le jeu détecte désormais lorsque les Snake sont placés près d'un mur ou d'un autre Snake : dans ce cas, le Snake est retourné dans l'autre sens ;
  - Le jeu détecte désormais si les dernières IAs sont bloquées : dans ce cas, si les IAs restent bloquées, la partie se termine (sauf si un ou plusieurs joueurs humains jouent encore) ;
  - Les IAs détectent désormais mieux les pommes dorées ;
  - Correction de bugs et ajustements :
    - Correction d'un bug d'animation ;
    - Les touches ZQSD/WASD sont à nouveau reconnues ;
    - Correction d'un bug avec les valeurs aléatoires qui ne donnaient pas les mêmes résultats selon s'ils venaient d'une partie qui avait été recommencée ou non ;
    - Correction d'un bug avec le compteur avant une nouvelle partie dans le mode de jeu en ligne ;
    - Détection d'un plantage dans le mode de jeu en ligne lorsque le mode Prédictions côté client était activé ;
    - Suppression du message "Une erreur est survenue" qui apparaissait furtivement dans le mode de jeu en ligne lorsqu'une salle était rejointe et qui pouvait bloquer la partie pour l'utilisateur ;
    - Correction d'un possible bug lorsque le multi-threading était activé dans les paramètres et qui pouvait empêcher le démarrage d'une partie ;
    - Correction d'autres bugs mineurs ;
    - Ajout de nouveaux tests unitaires en rapport avec les nouvelles fonctionnalités ajoutées ;
    - Petites corrections de la traduction en anglais.

* Version 2.1.1 (01/06/2020) :
  - Ajout d'une animation lorsqu'un Snake perd (il rebondi sur l'obstacle) ;
  - Il est désormais possible de déplacer le Snake en glissant le doigt dans la direction voulue ;
  - Le classement peut désormais être défilé à l'aide de la molette de la souris ou via le doigt sur les appareils mobiles, et une barre de défilement est désormais affichée ;
  - Ajout d'un nouveau skin graphique (Pixel) ;
  - Amélioration des animations ;
  - Il est désormais possible de limiter les FPS (images par seconde) dans les paramètres ;
  - Les types de cases inconnues afficheront désormais une image "?" ;
  - Corrections de bugs et autres ajustements ;
  - Améliorations techniques :
    - Les classes ont été converties en classes ES6+, le script de build utilise désormais Babel ;
    - Les fonctions de l'interface utilisateur du jeu ont été séparées en plusieurs classes héritant de JSGameTools.Component ;
    - Les différents niveaux d'IA ont désormais leurs propres classes, il est possible de passer une classe d'IA personnalisée au constructeur de Snake ;
    - Utilisation de performance.now au lieu de Date.now pour les calculs d'animation.

* Version 2.1 (03/05/2020) :
  - Amélioration du mode de jeu en ligne : possibilité d'activer les IA en mode en ligne, prédictions côté-client (améliore les performances, fonctionnalité expérimentale désactivée par défaut), latence (ping) affichée dans les informations de la partie ;
  - Menu Paramètres ajouté afin de régler différents paramètres du jeu ;
  - Ajout d'un nouveau skin graphique (Tropical), ce skin peut être activé dans les paramètres du jeu ;
  - Des pommes en or peuvent apparaître à certains moments dans tous les modes de jeu : ces types de pommes augmentent le score de 3 d'un seul coup ;
  - Le jeu utilise désormais deux générateurs de nombres pseudo-aléatoires différents pouvant être initialisés par des graines ; ces graines peuvent être personnalisées dans les Paramètres avancés lors de la création d'une nouvelle partie (non disponible en mode en ligne) - une même graine résultera en une partie identique si les autres paramètres sont les mêmes ;
  - Amélioration majeure des performances ;
  - Corrections de bugs et autres ajustements :
    - Les pommes ne sont désormais plus placées sur une case entourée de 3 murs ou plus ;
    - Lorsqu'il n'y a plus d'espace libre disponible, la partie s'arrête uniquement lorsque toutes les pommes ont été atteintes ;
    - Une barre de progression a été ajoutée à l'écran de chargement des ressources ;
    - Le serveur peut désormais envoyer une notification au client en mode de jeu en ligne ;
    - Correction de bugs avec le navigateur Safari ;
    - Autres corrections de bugs mineurs.
  - Modifications techniques :
    - Les éléments graphiques d'interface utilisateur ont été déplacés vers le module [JSGameTools](https://github.com/Eliastik/JSGameTools) ;
    - Les dépendences JavaScript sont désormais gérées via npm ;
    - Build du GameEngineWorker géré par Webpack ;
    - Ajout de tests unitaires.

* Version 2.0.1 (18/03/2020) :
  - Correction de l'authentification au mode de jeu en ligne

* Version 2.0 (18/03/2020) :
  - Ajout d'un mode de jeu en ligne ! Il s'agit du mode Battle Royale jouable en ligne. Des serveurs sont déjà ouverts et peuvent être utilisés. Plus d'informations sur le dépôt [SnakeIA Server](https://github.com/Eliastik/snakeia-server).
  - De nombreuses corrections et améliorations, bien que tous les efforts ait été portés sur le mode de jeu en ligne.

* Version 1.5 (31/01/2020) :
  - Amélioration des performances (multi-threading) ;
  - Correction de la gestion de la vitesse : le jeu est plus fluide ;
  - Grands changements dans l'architecture du code du jeu (MVC, autres changements) ;
  - Corrections de bugs et autres ajustements.

* Version 1.4.2 (07/10/2019) :
  - Ajout d'un mode labyrinthe : il est désormais possible de générer des labyrinthes. Le but est de trouver le chemin vers la pomme à travers le labyrinthe. Des niveaux de ce type sont également possibles (à télécharger ultérieurement).
  - Corrections de bugs et autres ajustements.

* Version 1.4.1 (29/09/2019) :
  - Le déplacement des Snake est désormais animé, rendant le jeu plus fluide ;
  - Le Snake du joueur est désigné par une flèche lors d'une partie avec plusieurs adversaires IA ;
  - Le jeu peut désormais se jouer avec les touches ZQSD/WASD ;
  - Correction de bugs, amélioration des performances et autres ajustements.

* Version 1.4.0.1 (07/09/2019) :
  - Correction d'un problème affectant les performances ;
  - Le jeu se met en pause lors de la mise en plein-écran ou lorsque le mode plein-écran est quitté ;
  - Bibliothèques logicielles mises à jour ;
  - Autres corrections mineures.

* Version 1.4 (02/08/2019) :
  - Le jeu détecte désormais si la pomme est bloquée par des obstacles (murs, Snake ayant perdu) et si elle est inaccessible et évite de poser la pomme à ces endroits ou change sa position ;
  - Nombreuses améliorations de l'interface du jeu :
    - Le bandeau du haut et ses éléments se redimensionnent automatiquement selon la taille de l'écran ;
    - Toutes les infos du jeu (gagnants, consignes des niveaux, messages de niveau réussi/échoué) sont affichées en bas de l'interface du jeu sous forme de notifications ;
    - Affichage du meilleur score/temps directement dans l'interface du jeu en mode Niveaux ;
    - Affichage du temps restant pour les niveaux impliquant un compteur ;
    - Les boutons se redimensionnent automatiquement si nécessaire ;
    - Amélioration de l'affichage du texte (saut automatique de ligne, etc.) ;
    - Affichage du pourcentage de chargement des ressources ;
    - La page défile désormais vers l'interface du jeu lors du démarrage d'une partie ;
    - Affichage d'un bouton Mode plein-écran lors de l'affichage du compteur avant le début d'une partie ;
    - Affichage d'un bouton Quitter plein-écran lorsque possible et nécessaire ;
    - Le jeu empêche le défilement de la page avec les flèches du clavier en cours de partie ;
    - Autres ajustements mineurs de l'interface.
  - Correction d'un bug qui réduisait les performances et la fluidité du jeu lors d'une partie impliquant plusieurs joueurs (humains ou IA) dû à l'affichage du texte au dessus des Snake ;
  - Amélioration de la gestion des erreurs de chargement des ressources ;
  - Autres corrections de bugs et ajustements.

* Version 1.3.2.1 (25/07/2019) :
  - Ajout permettant d'utiliser le jeu en mode hors-ligne et de se voir proposer l'installation sur les plateformes compatibles ;
  - Autres corrections.

* Version 1.3.2 (25/07/2019) :
  - Ajout de l'assistant IA pour le joueur. En activant cette option, une IA tentera de corriger votre trajectoire si vous êtes sur le point de vous écraser sur un obstacle. Réduit la difficulté du jeu ;
  - Corrections de bugs et autres ajustements.

* Version 1.3.1 (18/07/2019) :
  - Correction de la vitesse au démarrage du jeu si le taux d'images par seconde est supérieur ou inférieur à 60 ;
  - Ajout d'un nouveau type de niveau : atteindre un score donné avant les adversaires (aucun niveau ne l'exploite pour l'instant) ;
  - Corrections d'autres bugs et de la compatibilité avec Microsoft Edge et Safari.

* Version 1.3 (12/07/2019) :
  - Possibilité pour plusieurs joueurs de jouer sur la même grille de jeu ! Ce mode supporte une centaine de joueurs (un joueur humain et une centaine d'IA) sur la même grille ! Les joueurs sont différentiés en fonction de leur couleur. Leur nom ainsi que leur score est affiché au dessus de chacun d'eux ;
  - Introduction du mode de jeu Niveaux (pour l'IA et le joueur) ;
  - Génération d'une couleur aléatoire pour chaque Snake à chaque nouvelle partie ;
  - Les menus sont navigables au clavier, il est également possible de mettre en pause le jeu en appuyant sur la touche Entrer ;
  - Corrections de bugs et ajustements (voir les commits sur Github) ;
  - Ajout d'un niveau d'IA "Au hasard" (mouvements aléatoires de l'IA).

* Version 1.2 (03/07/2019) :
  - Migration vers la bibliothèque logicielle Lowlight.Astar, qui supporte les grilles en forme de tore, ce qui améliore les performances de l'IA ;
  - Correction et amélioration des performances de l'IA en mode faible ;
  - Correction de la génération des murs à des positions aléatoires : les impasses sont désormais détectées et supprimées ;
  - Correction d'un bug avec le moteur de traduction lors du chargement initial de la page : dans certains cas, la page ne se traduisait pas et le menu des langues ne se chargeait pas ;
  - Prise en charge des erreurs de chargement des ressources : un message d'erreur est affiché dans ce cas ;
  - Un menu Info partie est disponible dans le menu Pause > À propos… ;
  - La vitesse minimale autorisée est désormais de 100 ;
  - Simplifications du code.

* Version 1.1 (30/06/2019) :
  - Intégration du moteur de traduction i18next et traduction de l'application en anglais ;
  - Améliorations diverses et corrections de bugs :
    - Les menus et les textes s'adaptent automatiquement à la largeur de l'espace du jeu et à la résolution de l'écran (réduction/augmentation automatique de la taille du texte et des boutons, saut automatique de ligne) ;
    - Optimisation de l'affichage des boutons de contrôle pour le joueur (flèches), cela améliore les performances ;
    - La vitesse par défaut est désormais 8 ;
    - Autres corrections mineures de bugs et des textes.

* Version 1.0 (19/06/2019) :
    - Version initiale

## Comment compiler

Vous pouvez compiler vous-même le code JavaScript si vous avez effectué un changement. Pour cela, vous devez avoir installé Node.js et npm.

Pour installer Node.js et npm sur votre système, suivez le guide : https://docs.npmjs.com/getting-started/installing-node

Effectuez un clonage du dépôt et déplacez-vous dedans (ou téléchargez-le directement depuis Github) :
````
git clone https://github.com/Eliastik/snakeia.git
cd snakeia
````

Puis lancez cette commande pour installer les dépendances :
````
npm install
````
Puis pour compiler :

* Mode développement : `npm run build-dev`
* Mode production : `npm run build`
* Mode automatique : `npm run watch`

Cela va compiler le code JavaScript dans le sous-répertoire "dist".

SnakeIA contient quelques tests unitaires. Pour les exécuter, lancer la commande `npm run test`.

## Comment entraîner l’IA

Le mode IA Ultra fonctionne avec un algorithme de Deep Q-Learning, entraîné sur de nombreuses parties grâce à TensorFlow.js.

Pour entraîner l’IA, commencez par installer les dépendances :

```
npm install
```

Puis lancez la commande suivante :

```
npm run train-ai
```

Vous pouvez personnaliser les paramètres d'entraînement dans le fichier `train-ai.mjs`.

## TO-DO list

### Prochaine version (3.0 ?)

- [ ] Améliorer l'IA (défi : machine learning -> deep Q-learning) (En cours)
  - [ ] Récupération du modèle : API à appeler qui retourne la version + date version + URL vers le modèle / éventuellement une liste de version pour choisir la version du modèle ?
  - [x] Afficher informations sur les niveaux de l'IA
  - [ ] Corriger les pommes qui disparaissent en fin de partie (pour permettre d'avoir le vrai état de fin)
- [ ] Mettre à jour socket.io
- [x] Bug sur la détection des objectifs atteints dans le mode niveaux (il y a l'air d'y avoir un délai) suite à l'opti et refactor du moteur de jeu
- [ ] Bug graphique suite à l'opti du draw
- [x] Améliorer les performances graphiques -> Optimiser le rendu de la grille et des Snake (rendu différentiel, uniquement redessiner ce qui change)
- [x] Améliorer algorithme détection IA bloquée : se baser aussi sur les actions exécutée (pas seulement les positions) ? -> Non
- [x] Ajout tests unitaires
- [x] Améliorer algorithme détection IA bloquée
- [x] Centrer la grille sur le Canvas
- [x] Affichage temps de chargement engine + ajout gestion chargement modèle DQN
- [x] Améliorer et simplifier code moteur de jeu
- [x] Améliorer contrôle joueur sur les labyrinthes
- [x] Correction bug avec auto retry
- [x] Mode sombre

### Précédentes versions

- [x] Eviter de placer les joueurs trop près des murs -> direction inversée si trop près d'un mur
- [x] Bug lors de la création d'une partie en mode en ligne (quelquefois) : message "Erreur est survenue" ou "Chargement" et partie bloquée
- [x] Corriger message "Une erreur est survenue" lors du lancement d'une partie en mode en ligne
- [x] Plantage en utilisant le mode de prédictions côté clients
- [x] Eviter de placer une pomme dans un cul-de-sac peu importe sa taille (actuellement uniquement les cul-de-sac d'une case sont évités)
- [x] Détection du blocage des IAs
- [x] Correction bug des seeds ne donnant pas les mêmes parties (seed d'une partie recommencée sur une partie initiale)
- [x] Prédictions pour le mode en ligne (améliore la fluidité) - Pas vraiment OK, à revoir si possible
- [x] Correction animation mort Snake quand partie terminée
- [x] Contrôles sur mobile via défilement doigt
- [x] Barre défilement classement
- [x] Séparer le code de la méthode draw de GameUI en plusieurs classes Component
- [x] Défilement classement roulette/glisser
- [x] Seeds pour les grilles/jeu
- [x] Tests unitaires
- [x] Empêcher les fruits de popper dans des cases entourés de 3 murs
- [x] Optimiser flood fill
- [x] Bug avec les workers : les Snake semblent "popper"
- [x] Performances lorsque plusieurs Snake sur une seule grille (problème affichage texte drawSnakeInfos et aussi la fonction isCaseSurrounded de la classe Grid corrigés)
- [x] Correction vitesse démarrage partie si fps > 60
- [x] Idée type de niveau : atteindre le score avant les adversaires
- [x] Corriger l'algorithme de génération de murs à des positions aléatoires (empêcher les blocages possibles)
- [x] hue-rotate ne fonctionne pas sur Microsoft Edge et Safari -> pas de changement de couleur des Snake possible (workaround trouvé avec le Snake pointé par la flèche + détection et texte différent)
- [x] Animations
- [x] Labyrinthes
- [x] Multithreading
- [x] MVC (architecture client-serveur)
- [x] Jeu multi-joueur en ligne (création d'un programme serveur avec socket.io)

#### Autres idées
- [ ] (Menu affichant les contrôles du jeu)
- [-] (Afficher difficulté niveaux)
- [x] Bonus dans le mode niveaux (pièces obtenues en fonction du score/temps (1.75 fois ce qui est demandé dans l'objectif) permettant d'acheter des bonus (passer dernier niveau ou activer le mode assistant IA))
- [x] Animation mort Snake
- [x] Skin vrai serpent

## Déclaration de licence

Copyright (C) 2019-2025 Eliastik (eliastiksofts.com)

Ce programme est un logiciel libre ; vous pouvez le redistribuer ou le modifier suivant les termes de la GNU General Public License telle que publiée par la Free Software Foundation ; soit la version 3 de la licence, soit (à votre gré) toute version ultérieure.

Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS AUCUNE GARANTIE ; sans même la garantie tacite de QUALITÉ MARCHANDE ou d'ADÉQUATION à UN BUT PARTICULIER. Consultez la GNU General Public License pour plus de détails.

Vous devez avoir reçu une copie de la GNU General Public License en même temps que ce programme ; si ce n'est pas le cas, consultez http://www.gnu.org/licenses.

----

Copyright (C) 2019-2025 Eliastik (eliastiksofts.com)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
