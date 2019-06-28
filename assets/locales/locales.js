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
i18next.use(window.i18nextBrowserLanguageDetector).init({
  resources: {
    en: {
      "translation": {
        "lang": {
          "fr": "Français",
          "en": "English"
        },
        "update": {
          "updateAvailable": "An update of the application is available",
          "version": "Version",
          "of": "of",
          "current": "You currently have the version",
          "versionDate": "{{date, MM/DD/YYYY}}",
          "download": "Download the update",
          "getURL": "Get the URL of the download",
          "getChanges": "Get the list of changes",
          "URLToDownload": "Download URL:",
          "noChanges": "No change indicated.",
          "changes": "Changes in the new version:"
        },
        "menu": {
          "selectGame": "Select a game mode:",
          "iaSoloBtn": "Solo IA",
          "joueurSolo": "Solo player",
          "joueurVsIa": "Player VS IA",
          "iaVsIa": "IA VS IA",
          "iaBattleRoyale": "Battle Royale IA",
          "version": "Version",
          "versionDate": "{{date, MM/DD/YYYY}}",
          "by": "By",
          "infos": "More informations",
          "readme": "Readme file",
          "source": "Download the source",
          "language": "Language:"
        },
        "settings": {
          "title": "Game settings:",
          "gridSize": "Grid size:",
          "placeholderHeight": "Height",
          "placeholderWidth": "Width",
          "invalidHeight": "This value must be between 5 and 100",
          "invalidWidth": "This value must be between 5 and 100",
          "options": "Others options:",
          "borderWalls": "Surround the grid with walls",
          "generateWalls": "Generate walls at random positions",
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
          "invalidSpeed": "This value must be at least equal to or greater than 1",
          "progressiveSpeed": "Increase the speed progressively",
          "customSpeed": "Custom speed:",
          "placeholderCustomSpeed": "Enter the speed…",
          "invalidCustomSpeed": "This value must be at least equal to or greater than 1",
          "customSpeedHelp": "The higher the number, the slower the game speed, and inversely",
          "iaLevel": "AI level:",
          "iaLevelSelect": {
            "low": "Low",
            "normal": "Normal",
            "high": "High"
          },
          "invalidIALevel": "This value is invalid",
          "autoRetry": "Make the AI restart its game after a Game Over",
          "numberIA": "Number of AI:",
          "placeholderNumberIA": "Enter the number…",
          "invalidIANumber": "This value must be between 2 and 100",
          "validate": "Validate",
          "reset": "Reset",
          "backToMenu": "Back to the menu"
        },
        "game": {
          "backToMenu": "Back to the menu"
        }
      }
    },
    fr: {
      "translation": {
        "lang": {
          "fr": "Français",
          "en": "English"
        },
        "update": {
          "updateAvailable": "Une mise à jour de l'application est disponible",
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
          "iaSoloBtn": "IA solo",
          "joueurSolo": "Joueur solo",
          "joueurVsIa": "Joueur VS IA",
          "iaVsIa": "IA VS IA",
          "iaBattleRoyale": "IA Battle Royale",
          "version": "Version",
          "versionDate": "{{date, DD/MM/YYYY}}",
          "by": "Par",
          "infos": "Plus d'infos",
          "readme": "Fichier Lisez-moi",
          "source": "Télécharger la source",
          "language": "Langue :",
        },
        "settings": {
          "title": "Paramètres de la partie :",
          "gridSize": "Taille de la grille :",
          "placeholderHeight": "Hauteur",
          "placeholderWidth": "Largeur",
          "invalidHeight": "Cette valeur doit être comprise entre 5 et 100",
          "invalidWidth": "Cette valeur doit être comprise entre 5 et 100",
          "options": "Autres options :",
          "borderWalls": "Entourer la grille de murs",
          "generateWalls": "Générer des murs à des positions aléatoires",
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
          "invalidSpeed": "Cette valeur doit être au moins égale ou supérieure à 1",
          "progressiveSpeed": "Augmenter la vitesse progressivement",
          "customSpeed": "Vitesse personnalisée :",
          "placeholderCustomSpeed": "Entrez la vitesse…",
          "invalidCustomSpeed": "Cette valeur doit être au moins égale ou supérieure à 1",
          "customSpeedHelp": "Plus le nombre est élevé, plus la vitesse du jeu est lente, et inversement",
          "iaLevel": "Niveau de l'IA :",
          "iaLevelSelect": {
            "low": "Faible",
            "normal": "Normal",
            "high": "Élevé"
          },
          "invalidIALevel": "Cette valeur est invalide",
          "autoRetry": "Faire que l'IA recommence auto sa partie après un Game Over",
          "numberIA": "Nombre d'IA :",
          "placeholderNumberIA": "Entrez le nombre…",
          "invalidIANumber": "Cette valeur doit être comprise entre 2 et 100",
          "validate": "Valider",
          "reset": "Réinitialiser",
          "backToMenu": "Retour au menu"
        },
        "game": {
          "backToMenu": "Retour au menu"
        }
      }
    }
  },
  fallbackLng: ['en', 'fr'],
  load: 'languageOnly',
  detection: {
    order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lng',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage'],
  },
}, function(err, t) {
  translateContent();
});

function listTranslations(languages) {
  document.getElementById("languageSelect").innerHTML = "";

  for(var i = 0; i < languages.length; i++) {
    document.getElementById("languageSelect").innerHTML = document.getElementById("languageSelect").innerHTML + '<option data-i18n="lang.' + languages[i] + '" value="'+ languages[i] +'"></option>';
  }

  document.getElementById("languageSelect").value = i18next.language.substr(0, 2);
}

function translateContent() {
  listTranslations(i18next.languages);

  var i18nList = document.querySelectorAll("[data-i18n]");
  i18nList.forEach(function(v) {
    v.innerHTML = window.i18next.t(v.dataset.i18n);
  });

  document.getElementById("dateTxt").innerHTML = window.i18next.t("menu.versionDate", { date: new Intl.DateTimeFormat(i18next.language).format(new Date(DATE_VERSION)) });

  document.getElementById("heightGrid").placeholder = window.i18next.t("settings.placeholderHeight");
  document.getElementById("widthGrid").placeholder = window.i18next.t("settings.placeholderWidth");
  document.getElementById("customSpeed").placeholder = window.i18next.t("settings.placeholderCustomSpeed");
  document.getElementById("numberIA").placeholder = window.i18next.t("settings.placeholderNumberIA");

  document.getElementById("appDownloadURLGet").title = window.i18next.t("update.getURL");
  document.getElementById("appUpdateChanges").title = window.i18next.t("update.getChanges");

  document.getElementById("appUpdateDateLocalized").innerHTML = window.i18next.t("update.versionDate", { date: new Intl.DateTimeFormat(i18next.language).format(new Date(document.getElementById("appUpdateDate").innerHTML)) });
}

document.getElementById("languageSelect").onchange = function() {
  i18next.changeLanguage(document.getElementById("languageSelect").value, function(err, t) {
    translateContent();
  });
};
