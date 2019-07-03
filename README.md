<img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/assets/images/logo/logo.png" width="300" alt="SnakeIA" />
<img src="https://raw.githubusercontent.com/Eliastik/snakeia/master/screenshot.png" width="640" alt="Screenshot" />

# English

A Snake version with an artificial intelligence. This version has many game modes. You can play against the AI, or let it play alone. A Battle Royale mode is also available, this mode sees between 2 and 100 AI fight! Many settings are available to vary the games.

Game programmed in pure JavaScript (no JQuery or other JavaScript frameworks) and object oriented.

* Online version of this game: [www.eliastiksofts.com/snakeia/demo](http://www.eliastiksofts.com/snakeia/demo/)
* Github repository: [https://github.com/Eliastik/snakeia](https://github.com/Eliastik/snakeia)

## About this game

* Version: 1.2
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* License: GNU GPLv3 (see LICENCE.txt file)

### Credits

* Uses the library [Lowlight.Astar](https://github.com/lowlighter/astar) under [MIT](https://opensource.org/licenses/mit-license.php) license
* Uses the library [i18next](https://github.com/i18next/i18next) (with the module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) under [MIT](https://opensource.org/licenses/mit-license.php) license for the translation engine
* Uses graphic elements from [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728) and [Snake](https://www.flaticon.com/free-icon/snake_194210) (changed)
* Uses the font [Delius](https://www.fontsquirrel.com/fonts/delius) under SIL Open Font License
* Uses the CSS framework [Bootstrap 4](https://getbootstrap.com/) and the theme [Flat UI](https://designmodo.github.io/Flat-UI/)

## Changelog

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

Une version du Snake dotée d'une intelligence artificielle. Cette version est dotée de nombreux modes de jeu. Vous pouvez notamment jouer contre l'IA, ou la laisser jouer seule. Un mode Battle Royale est également disponible, ce mode voit s'affronter entre 2 et 100 IA ! De nombreux paramétrages sont disponibles pour varier les parties.

Jeu programmé en JavaScript pur (pas de JQuery ni d'autres frameworks JavaScript) et en orienté objet.

* Version en ligne de ce jeu : [www.eliastiksofts.com/snakeia/demo](http://www.eliastiksofts.com/snakeia/demo/)
* Dépôt Github : [https://github.com/Eliastik/snakeia](https://github.com/Eliastik/snakeia)

## À propos du jeu

* Version du jeu : 1.2
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* Licence : GNU GPLv3 (voir le fichier LICENCE.txt)

### Crédits

* Utilise la bibliothèque logicielle [Lowlight.Astar](https://github.com/lowlighter/astar) sous licence [MIT](https://opensource.org/licenses/mit-license.php)
* Utilise la bibliothèque logicielle [i18next](https://github.com/i18next/i18next) (avec le module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) sous licence [MIT](https://opensource.org/licenses/mit-license.php) pour le moteur de traduction
* Utilise des éléments graphiques venant de [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728) et [Snake](https://www.flaticon.com/free-icon/snake_194210) (modifié)
* Utilise la police de caractères [Delius](https://www.fontsquirrel.com/fonts/delius) sous licence SIL Open Font License
* Utilise le framework CSS [Bootstrap 4](https://getbootstrap.com/) et le thème [Flat UI](https://designmodo.github.io/Flat-UI/)

## Journal des changements

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

* Améliorer l'IA pour l'empêcher de se bloquer (difficile, essais effectués) - niveau Ultra

### Fait :

* Corriger l'algorithme de génération de murs à des positions aléatoires (empêcher les blocages possibles)

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
