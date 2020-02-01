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
// Exports engine classes
module.exports = {
    LocalesInit: require("../assets/locales/init"),
    LocalesMenu: require("../assets/locales/menu"),
    LocalesEngine: require("../assets/locales/engine"),
    Main: require("../main"),
    GameConstants: require("./constants"),
    Event: require("./event"),
    Reactor: require("./reactor"),
    Grid: require("./grid"),
    Snake: require("./snake"),
    GameGroup: require("./gameGroup"),
    GameUtils: require("./gameUtils"),
    Position: require("./position"),
    GameEngine: require('./gameEngine'),
    Game: require("./shim"),
    Button: require("./button"),
    GameController: require("./gameController"),
    GameControllerWorker: require("./gameControllerWorker"),
    GameGroup: require("./gameGroup"),
    GameUI: require("./gameUI"),
    ImageLoader: require("./imageLoader"),
    NotificationMessage: require("./notificationMessage")
};