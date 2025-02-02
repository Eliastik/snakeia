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
import "../assets/locales/init.js";
import "../assets/locales/menu.js";
import "../assets/locales/engine.js";
import "../main.js";
import GameConstants from "./engine/Constants.js";
import Event from "./engine/Event.js";
import Reactor from "./engine/Reactor.js";
import Grid from "./engine/Grid.js";
import Snake from "./engine/Snake.js";
import GameGroup from "./engine/GameGroup.js";
import GameUtils from "./engine/GameUtils.js";
import Position from "./engine/Position.js";
import GameEngine from "./engine/GameEngine.js";
import { Game } from "./Shim.js";
import GameController from "./engine/GameController.js";
import GameControllerWorker from "./engine/GameControllerWorker.js";
import GameControllerSocket from "./engine/GameControllerSocket.js";
import GameUI from "./ui/GameUI.js";
import OnlineClient from "./engine/OnlineClient.js";

export { GameConstants, Event, Reactor, Grid, Snake, GameGroup, GameUtils, Position, GameEngine, Game, GameController, GameControllerWorker, GameControllerSocket, GameUI, OnlineClient };