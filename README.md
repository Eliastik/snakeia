<img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/assets/images/logo/logo.png" width="300" alt="SnakeIA" />
<p><img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/screenshot.png" width="400" alt="Screenshot" /> <img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/screenshot2.png" width="400" alt="Screenshot" /></p>

# English

A Snake version with an artificial intelligence. This version has many game modes. You can play against the AI, or let it play alone. A Battle Royale mode is also available, this mode sees between 2 and 100 AI fight! Many settings are available to vary the games. A Levels mode (for the player and the AI) is also available, it's a series of level with a particular goal to achieve (get a minimum score, get a score in time, …). Downloadable levels are available.

Game programmed in pure JavaScript (no JQuery or other JavaScript frameworks) and object oriented.

* Online version of this game: [www.eliastiksofts.com/snakeia/demo](http://www.eliastiksofts.com/snakeia/demo/)
* Github repository: [https://github.com/Eliastik/snakeia](https://github.com/Eliastik/snakeia)

## About this game

* Version: 1.4
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* License: GNU GPLv3 (see LICENCE.txt file)

### Credits

* Uses the JavaScript library [Lowlight.Astar](https://github.com/lowlighter/astar) under [MIT](https://opensource.org/licenses/mit-license.php) license
* Uses the JavaScript library [i18next](https://github.com/i18next/i18next) (with the module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) under [MIT](https://opensource.org/licenses/mit-license.php) license for the translation engine
* Uses the CSS framework [Bootstrap 4](https://getbootstrap.com/) and the theme [Flat UI](https://designmodo.github.io/Flat-UI/)
* Uses the CSS library [balloon.css](https://kazzkiq.github.io/balloon.css/) under [MIT](https://github.com/kazzkiq/balloon.css/blob/master/LICENSE) license
* Uses graphic elements from [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728), [Trophy](https://www.flaticon.com/free-icon/cup_625398) and [Snake](https://www.flaticon.com/free-icon/snake_194210) (changed)
* Uses the font [Delius](https://www.fontsquirrel.com/fonts/delius) under SIL Open Font License

## Changelog

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

# Français

Une version du Snake dotée d'une intelligence artificielle. Cette version est dotée de nombreux modes de jeu. Vous pouvez notamment jouer contre l'IA, ou la laisser jouer seule. Un mode Battle Royale est également disponible, ce mode voit s'affronter entre 2 et 100 IA ! De nombreux paramétrages sont disponibles pour varier les parties. Un mode Niveaux (pour le joueur et l'IA) est également disponible, il s'agit d'un série de niveau dotés d'un objectif particulier à accomplir (obtenir un score minimal, obtenir un score en un certain temps, …). Des niveaux téléchargeables sont disponibles.

Jeu programmé en JavaScript pur (pas de JQuery ni d'autres frameworks JavaScript) et en orienté objet.

* Version en ligne de ce jeu : [www.eliastiksofts.com/snakeia/demo](http://www.eliastiksofts.com/snakeia/demo/)
* Dépôt Github : [https://github.com/Eliastik/snakeia](https://github.com/Eliastik/snakeia)

## À propos du jeu

* Version du jeu : 1.4
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* Licence : GNU GPLv3 (voir le fichier LICENCE.txt)

### Crédits

* Utilise la bibliothèque logicielle JavaScript [Lowlight.Astar](https://github.com/lowlighter/astar) sous licence [MIT](https://opensource.org/licenses/mit-license.php)
* Utilise la bibliothèque logicielle JavaScript [i18next](https://github.com/i18next/i18next) (avec le module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) sous licence [MIT](https://opensource.org/licenses/mit-license.php) pour le moteur de traduction
* Utilise le framework CSS [Bootstrap 4](https://getbootstrap.com/) et le thème [Flat UI](https://designmodo.github.io/Flat-UI/)
* Utilise la bibliothèque logicielle CSS [balloon.css](https://kazzkiq.github.io/balloon.css/) sous licence [MIT](https://github.com/kazzkiq/balloon.css/blob/master/LICENSE)
* Utilise des éléments graphiques venant de [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728), [Trophy](https://www.flaticon.com/free-icon/cup_625398), [Clock](https://www.flaticon.com/free-icon/clock_214288) et [Snake](https://www.flaticon.com/free-icon/snake_194210) (modifié)
* Utilise la police de caractères [Delius](https://www.fontsquirrel.com/fonts/delius) sous licence SIL Open Font License

## Journal des changements

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

## TO-DO list

### À faire :

* Améliorer l'IA pour l'empêcher de se bloquer (essais effectués) - niveau Ultra

### Fait :

* Performances lorsque plusieurs Snake sur une seule grille (problème affichage texte drawSnakeInfos corrigé)
* Correction vitesse démarrage partie si fps > 60
* Idée type de niveau : atteindre le score avant les adversaires
* Corriger l'algorithme de génération de murs à des positions aléatoires (empêcher les blocages possibles)

### Problèmes :

* hue-rotate ne fonctionne pas sur Microsoft Edge et Safari -> pas de changement de couleur des Snake possible
* Performances lorsque plusieurs Snake sur une seule grille (aux algorithmes d'IA -> nombreuses IA)

## Déclaration de licence

Copyright (C) 2019 Eliastik (eliastiksofts.com)

Ce programme est un logiciel libre ; vous pouvez le redistribuer ou le modifier suivant les termes de la GNU General Public License telle que publiée par la Free Software Foundation ; soit la version 3 de la licence, soit (à votre gré) toute version ultérieure.

Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS AUCUNE GARANTIE ; sans même la garantie tacite de QUALITÉ MARCHANDE ou d'ADÉQUATION à UN BUT PARTICULIER. Consultez la GNU General Public License pour plus de détails.

Vous devez avoir reçu une copie de la GNU General Public License en même temps que ce programme ; si ce n'est pas le cas, consultez http://www.gnu.org/licenses.

----

Copyright (C) 2019 Eliastik (eliastiksofts.com)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
