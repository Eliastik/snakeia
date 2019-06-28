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
        "menu": {
          "selectGame": "Select a game mode:",
          "iaSoloBtn": "Solo IA",
          "joueurSolo": "Solo player",
          "joueurVsIa": "Player VS IA",
          "iaVsIa": "IA VS IA",
          "iaBattleRoyale": "Battle Royale IA",
          "version": "Version",
          "versionDate": "{{date, MM/DD/YYYY}}",
          "par": "By",
          "infos": "More informations",
          "readme": "Readme file",
          "source": "Download the source",
          "language": "Language:"
        }
      }
    },
    fr: {
      "translation": {
        "lang": {
          "fr": "Français",
          "en": "English"
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
          "par": "Par",
          "infos": "Plus d'infos",
          "readme": "Fichier Lisez-moi",
          "source": "Télécharger la source",
          "language": "Langue :"
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
}

document.getElementById("languageSelect").onchange = function() {
  i18next.changeLanguage(document.getElementById("languageSelect").value, function(err, t) {
    translateContent();
  });
};
