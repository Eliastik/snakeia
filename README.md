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
It is developed using the TensorFlow.js framework. The [principal class of this AI is available here](https://github.com/Eliastik/snakeia/blob/master/src/engine/ai/SnakeAIUltra.js) ([complete folder here](https://github.com/Eliastik/snakeia/tree/master/src/engine/ai)).

Other AI modes include:

* Random: Performs random actions.
* Low: A basic heuristic (rule-based) AI.
* Normal: Uses the A* algorithm (pathfinding), but does not support torus mode.
* High: Uses the A* algorithm with torus mode enabled and falls back to the Low mode heuristics if it gets stuck.

## About this game

* Version: 3.2.0
* Version date: 05/08/2026
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* License: GNU GPLv3 (see LICENCE.txt file)

### Credits

* Uses the JavaScript library [Lowlight.Astar](https://github.com/lowlighter/astar) under [MIT](https://opensource.org/licenses/mit-license.php) license
* Uses the JavaScript library [Socket.IO client](https://github.com/socketio/socket.io-client) under [MIT](https://github.com/socketio/socket.io-client/blob/master/LICENSE) license
* Uses the JavaScript library [i18next](https://github.com/i18next/i18next) (with the module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) under [MIT](https://opensource.org/licenses/mit-license.php) license for the translation engine
* Uses the Tensorflow.js framework for Ultra AI mode
* Uses Three.js for the 3D rendering engine
* Uses the CSS framework [Bootstrap 4](https://getbootstrap.com/) and the theme [Flat UI](https://designmodo.github.io/Flat-UI/)
* Uses the CSS library [balloon.css](https://kazzkiq.github.io/balloon.css/) under [MIT](https://github.com/kazzkiq/balloon.css/blob/master/LICENSE) license
* Uses graphic elements from [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728), [Trophy](https://www.flaticon.com/free-icon/cup_625398), [Clock](https://www.flaticon.com/free-icon/clock_214288), [Snake](https://www.flaticon.com/free-icon/snake_194210) (changed), [Rank](https://www.flaticon.com/free-icon/ranking_2665632) (changed)
* Uses the font [Delius](https://www.fontsquirrel.com/fonts/delius) under SIL Open Font License
* The "tropical" graphic skin uses as a base a [picture from here](https://commons.wikimedia.org/wiki/File:Gunther%27s_Racer_Coluber_gracilis_Snake_snake_by_Dr._Raju_Kasambe_(23).jpg) under Creative Commons Attribution-Share Alike 4.0 International license, [this picture](https://www.piqsels.com/fr/public-domain-photo-zbzjp) under [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en) license and [this picture](https://commons.wikimedia.org/wiki/File:Red_brick_wall_texture.JPG) under Creative Commons Attribution-Share Alike 3.0 Unported license
* Uses a 3D model of an apple created by [bariacg](https://sketchfab.com/bariacg), available on [Sketchfab website](https://sketchfab.com/3d-models/apple-8cc60d44baec49558156ac767839c2ed), licensed under [Creative Commons Attribution-NonCommercial 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

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

Training AI requires a powerful machine with a dedicated graphics card (it is possible to run the training without a graphics card, but it will be very slow).

Training requires the following versions of dependencies — other versions **are not compatible** (due to limitations of the version of TensorFlow.js used):

- Node.js 22
- CUDA 12.8 (for training on an NVIDIA GPU)
- cuDNN 8 (for training on an NVIDIA GPU)

You will need to install the CUDA Toolkit and cuDNN yourself from the NVIDIA website (requires an NVIDIA developer account):

- CUDA Toolkit 12.8: [https://developer.nvidia.com/cuda-12-8-0-download-archive](https://developer.nvidia.com/cuda-12-8-0-download-archive)
- cuDNN 8: [https://developer.nvidia.com/rdp/cudnn-archive](https://developer.nvidia.com/rdp/cudnn-archive) (**select "Download cuDNN v8.9.7 (December 5, 2023), for CUDA 12.x"**)

You must then add the installed folders to your system PATH so that TensorFlow.js can find them.

To train the AI, first install the dependencies:

````
npm install
````

Then run the following command:

```
npm run train-ai
```

On Nvidia GPUs, running the following command will prevent the system from allocating all available VRAM by default (only the necessary VRAM will be allocated):

```
TF_GPU_ALLOCATOR=cuda_malloc_async TF_FORCE_GPU_ALLOW_GROWTH=true node train-ai.mjs
```

You can customize the training settings in the train-ai.mjs script.

### Troubleshooting during training:

- If you encounter an error similar to the following: TypeError: (0, util_1.isNullOrUndefined) is not a function
  This may be because you are using a version of NodeJS that is too recent. The version of Tensorflow.js used is not compatible with versions of NodeJS higher than 22 (only for the training part).
- You may encounter memory issues when training AI on very large grids.
  To avoid this, you can force NodeJS to allocate more memory by launching the training as follows:
  ```
  node --max-old-space-size=16384 train-ai.mjs
  ```
  Customize the pre-allocated memory value (here 16384 for 16 GB of RAM).

# Français

Une version du Snake dotée d'une intelligence artificielle. Cette version est dotée de nombreux modes de jeu. Vous pouvez notamment jouer contre l'IA, ou la laisser jouer seule. Un mode Battle Royale est également disponible, ce mode voit s'affronter entre 2 et 100 IA ! De nombreux paramétrages sont disponibles pour varier les parties. Un mode Niveaux (pour le joueur et l'IA) est également disponible, il s'agit d'un série de niveau dotés d'un objectif particulier à accomplir (obtenir un score minimal, obtenir un score en un certain temps, …). Des niveaux téléchargeables sont disponibles.

Un mode de jeu en ligne est disponible ! Des serveurs sont déjà ouverts pour que vous puissiez jouer avec d'autres joueurs. Ce dépôt fourni le client ainsi que le moteur de jeu utilisé par le programme serveur. Plus d'informations sur le dépôt [SnakeIA Server](https://github.com/Eliastik/snakeia-server).

Jeu programmé en JavaScript pur et en orienté objet.

* Version en ligne de ce jeu : [www.eliastiksofts.com/snakeia/demo](http://www.eliastiksofts.com/snakeia/demo/)
* Dépôt Github : [https://github.com/Eliastik/snakeia](https://github.com/Eliastik/snakeia)

# À propos des IA (Intelligences Artificielles)

Le jeu propose plusieurs modes d’IA capables de jouer de manière autonome.

Le mode IA Ultra est une intelligence artificielle entraînée avec l’algorithme de Deep Q-Learning, amélioré par plusieurs optimisations telles que les Dueling Layers, le Double Q-Learning, les Noisy Networks, le Prioritized Experience Replay, et d'autres encore.

Elle a été développée grâce au framework TensorFlow.js. La [classe principale de cette IA est disponible ici](https://github.com/Eliastik/snakeia/blob/master/src/engine/ai/SnakeAIUltra.js) ([dossier complet ici](https://github.com/Eliastik/snakeia/tree/master/src/engine/ai)).

Les autres modes d’IA sont :

* Aléatoire : Effectue des actions au hasard.
* Faible : Une IA basique utilisant des heuristiques (basée sur des règles).
* Normale : Une IA utilisant l’algorithme de recherche de chemin A*, mais sans mode tore.
* Élevée : Une IA basée sur A* avec le mode tore activé, et qui utilise les heuristiques du mode Faible si elle se retrouve bloquée.

## À propos du jeu

* Version du jeu : 3.2.0
* Date de version : 08/05/2026
* Made in France by Eliastik - [eliastiksofts.com](http://eliastiksofts.com) - Contact : [eliastiksofts.com/contact](http://eliastiksofts.com/contact)
* Licence : GNU GPLv3 (voir le fichier LICENCE.txt)

### Crédits

* Utilise la bibliothèque logicielle JavaScript [Lowlight.Astar](https://github.com/lowlighter/astar) sous licence [MIT](https://opensource.org/licenses/mit-license.php)
* Utilise la bibliothèque logicielle JavaScript [Socket.IO client](https://github.com/socketio/socket.io-client) sous licence [MIT](https://github.com/socketio/socket.io-client/blob/master/LICENSE)
* Utilise la bibliothèque logicielle JavaScript [i18next](https://github.com/i18next/i18next) (avec le module [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)) sous licence [MIT](https://opensource.org/licenses/mit-license.php) pour le moteur de traduction
* Utilise le framework Tensorflow.js pour le mode d'IA ultra
* Utilise Three.js pour le moteur de rendu 3D
* Utilise le framework CSS [Bootstrap 4](https://getbootstrap.com/) et le thème [Flat UI](https://designmodo.github.io/Flat-UI/)
* Utilise la bibliothèque logicielle CSS [balloon.css](https://kazzkiq.github.io/balloon.css/) sous licence [MIT](https://github.com/kazzkiq/balloon.css/blob/master/LICENSE)
* Utilise des éléments graphiques venant de [Flaticon](https://www.flaticon.com) : [Brick wall](https://www.flaticon.com/free-icon/brick-wall_1833083), [Apple](https://www.flaticon.com/free-icon/apple_135728), [Trophy](https://www.flaticon.com/free-icon/cup_625398), [Clock](https://www.flaticon.com/free-icon/clock_214288), [Snake](https://www.flaticon.com/free-icon/snake_194210) (modifié), [Rank](https://www.flaticon.com/free-icon/ranking_2665632) (modifié)
* Utilise la police de caractères [Delius](https://www.fontsquirrel.com/fonts/delius) sous licence SIL Open Font License
* Le skin graphique "tropical" utilise comme base une [photo venant d'ici](https://commons.wikimedia.org/wiki/File:Gunther%27s_Racer_Coluber_gracilis_Snake_snake_by_Dr._Raju_Kasambe_(23).jpg) sous licence Creative Commons Attribution-Share Alike 4.0 International, [cette photo](https://www.piqsels.com/fr/public-domain-photo-zbzjp) sous licence [Creative Commons Zero](https://creativecommons.org/publicdomain/zero/1.0/deed.en) et [cette photo](https://commons.wikimedia.org/wiki/File:Red_brick_wall_texture.JPG) sous licence Creative Commons Attribution-Share Alike 3.0 Unported
* Utilise un modèle 3D de pomme réalisé par [bariacg](https://sketchfab.com/bariacg) et disponible sur le [site Sketchfab](https://sketchfab.com/3d-models/apple-8cc60d44baec49558156ac767839c2ed), sous [licence Creative Commons Attribution-NonCommercial 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

## Journal des changements

Voir [CHANGELOG.md](CHANGELOG.md).

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

L'entrainement de l'IA nécessite une machine puissante avec une carte graphique dédiée (il est possible de lancer l'entrainement sans carte graphique, mais il sera très lent).

L'entrainement nécessite les versions de dépendances suivantes - les autres versions ne **sont pas compatibles** (limitation de la version de Tensorflow.js utilisée) :

- NodeJS 22
- CUDA Toolkit 12.8 (pour l'entrainement via un GPU NVIDIA)
- cuDNN 8 (pour l'entrainement via un GPU NVIDIA)

Vous devrez instaler Cuda Toolkit et cuDNN vous même depuis le site de Nvidia (nécessite un compte développeur Nvidia) :

- CUDA Toolkit 12.8 : [https://developer.nvidia.com/cuda-12-8-0-download-archive](https://developer.nvidia.com/cuda-12-8-0-download-archive)
- cuDNN 8 : [https://developer.nvidia.com/rdp/cudnn-archive](https://developer.nvidia.com/rdp/cudnn-archive) (**choisir Download cuDNN v8.9.7 (December 5th, 2023), for CUDA 12.x**)

Il faut ensuite ajouter les dossiers installés dans votre PATH système pour que Tensorflow.js puisse les trouver.

Pour entraîner l’IA, commencez par installer les dépendances :

```
npm install
```

Puis lancez la commande suivante :

```
npm run train-ai
```

Sur les GPU Nvidia, lancer la commande suivante permettra d'éviter d'allouer toute la VRAM disponible par défaut (seule la VRAM nécessaire sera allouée) :

```
TF_GPU_ALLOCATOR=cuda_malloc_async TF_FORCE_GPU_ALLOW_GROWTH=true node train-ai.mjs
```

Vous pouvez personnaliser les paramètres d'entraînement dans le fichier `train-ai.mjs`.

### Résolution de problèmes lors de l'entrainement :

- Si vous rencontrez une erreur similaire à l'erreur suivante : TypeError: (0 , util_1.isNullOrUndefined) is not a function
  C'est possiblement car vous utilisez une version de NodeJS trop récente. La version de Tensorflow.js utilisée n'est pas compatible avec les versions des NodeJS supérieures à 22 (uniquement pour la partie entrainement)
- Il est possible que vous rencontrez des problèmes de mémoire lors de l'entrainement de l'IA sur de très grandes grilles
  Pour les éviter, vous pouvez forcer NodeJS à allouer plus de mémoire en lançant l'entrainement comme suit :
  ```
  node --max-old-space-size=16384 train-ai.mjs
  ```
  Personnalisez la valeur de mémoire pré-allouée (ici 16384 pour 16 Go de RAM)

## TO-DO list

### Prochaines versions

- [ ] Finaliser l'entraînement de l'IA Deep-Q-Learning : optimisation mémoire et perfs pour faire fonctionner les plus gros environnements + sûrement d'autres trucs
- [x] Corriger memory leak ThreeJS
- [x] Améliorer l'adaptation aux appareils mobiles :
  - [x] Rendu graphique : appliquer la bonne résolution (aujourd'hui c'est flou à cause de l'échelle de résolution sur mobile - voir : https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
  - [x] Plein écran auto au lancement d'une partie ? (uniquement sur mobile !)
  - [x] Ajouter information concernant : il est possible de déplacer le Snake en faisant glisser le doigt sur l'écran vers la direction souhaitée (ne l'afficher que sur mobile)
    - [x] Voir s'il faut ajouter le même type d'info sur desktop (possibilité de bouger avec les flèches ou z/q/s/d...)
    - [x] A afficher sur l'écran de chargement de partie + compteur avant partie (+ peut être menu pause ?) -> les deux
  - [x] Corriger soucis restants :
    - [x] Bug fullscreen puis sortie full screen : le canvas ne revient pas à la taille de base
    - [x] Quelques petits bugs liés à la mise à l'échelle
- [x] Optimiser redraw grille 3D (quand murs, léger lag sur mobiles)
- [x] A check => bug possible Online : les pseudos ne s'affichent plus dans le classement
- [x] Bug : attendre que le moteur 3D soit initialisé avant d'initialiser la partie (parfois il met du temps alors que la partie commence en parallèle avec le compteur de départ)
- [x] Ajouter plus de pommes si plusieurs Snake présent (par exemple une pomme par Snake, plafond à X pommes au bout d'un moment)
- [x] Possibilité de plusieurs séries de niveaux
- [ ] Ajouter pomme en argent (+2 score) ?
- [ ] Autres effets graphiques à ajouter à la version 3D ? (idées)
  - [x] Ne plus faire en sorte que le Snake regarde la pomme derrière lui : système de champ de vision (yeux qui bougent vers le fruit que s'il est dans son champ de vision, devant lui)
  - [ ] Effet normal map d'écailles sur les Snakes
  - [ ] Agrandir taille des yeux
  - [ ] Textures rayures (basée sur la couleur)
  - [ ] Améliorer l'animation de mort des Snakes (avec particules ?)
  - [ ] Effet "tilt shift" ?
  - [ ] Meilleures textures que le damier gris ? (idée : plusieurs environnements type plaine avec herbe, banquise avec glace, désert etc...)
  - [ ] Afficher une couronne animée au Snake qui lead la partie ?
  - [ ] Animation quand un Snake mange une pomme ?

### Prochaine version (3.1)

- [x] Ajouter plus d'effets visuels à la version 3D
  - [x] Animation yeux Snakes
  - [x] Animation pommes
- [x] Opti l'anti aliasing sur la version 3D (anti aliasing post processing plutôt que MSAA ? Pour que ce soit plus fluide sur les appareils faibles)

### Prochaine version (3.0)

- [x] Améliorer l'IA (défi : machine learning -> deep Q-learning)
  - [x] Récupération du modèle : API à appeler qui retourne la version + date version + URL vers le modèle / éventuellement une liste de version pour choisir la version du modèle ?
    - [x] Vérifier que ça ne casse pas la partie serveur => il faut gérer pour que ça charge un modèle par défaut
    - [x] Permettre de charger une URL personnalisée
    - [x] Afficher plus d'infos sur les modèles
    - [x] Côté serveur : paramètre pour l'API liste des modèles + URL modèle personnalisée ?
  - [x] Corriger les pommes qui disparaissent en fin de partie (pour permettre d'avoir le vrai état de fin)
  - [x] Afficher informations sur les niveaux de l'IA
- [x] Bug graphique suite à l'opti du draw
- [x] Rendu 3D (le rendu 2D reste sélectionnable/par défaut ?)
- [x] Mettre à jour socket.io
  - [x] Bug en chargeant la liste des salles après avoir quitté une partie
- [x] Bug sur la détection des objectifs atteints dans le mode niveaux (il y a l'air d'y avoir un délai) suite à l'opti et refactor du moteur de jeu
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

Copyright (C) 2019-2026 Eliastik (eliastiksofts.com)

Ce programme est un logiciel libre ; vous pouvez le redistribuer ou le modifier suivant les termes de la GNU General Public License telle que publiée par la Free Software Foundation ; soit la version 3 de la licence, soit (à votre gré) toute version ultérieure.

Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS AUCUNE GARANTIE ; sans même la garantie tacite de QUALITÉ MARCHANDE ou d'ADÉQUATION à UN BUT PARTICULIER. Consultez la GNU General Public License pour plus de détails.

Vous devez avoir reçu une copie de la GNU General Public License en même temps que ce programme ; si ce n'est pas le cas, consultez http://www.gnu.org/licenses.

----

Copyright (C) 2019-2026 Eliastik (eliastiksofts.com)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
