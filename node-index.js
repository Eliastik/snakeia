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
    GameConstants: require("./assets/js/src/constants"),
    Event: require("./assets/js/src/event"),
    Reactor: require("./assets/js/src/reactor"),
    Grid: require("./assets/js/src/grid"),
    Snake: require("./assets/js/src/snake"),
    GameGroup: require("./assets/js/src/gameGroup"),
    GameUtils: require("./assets/js/src/gameUtils"),
    Position: require("./assets/js/src/position"),
    GameEngine: require('./assets/js/src/gameEngine'),
    Game: require("./assets/js/src/shim").Game,
};