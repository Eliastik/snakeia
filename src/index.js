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
import GameConstants from "./engine/Constants";
import Event from "./engine/Event";
import Reactor from "./engine/Reactor";
import Grid from "./engine/Grid";
import Snake from "./engine/Snake";
import GameGroup from "./engine/GameGroup";
import GameUtils from "./engine/GameUtils";
import Position from "./engine/Position";
import GameEngine from "./engine/GameEngine";
import { Game } from "./Shim";
import GameController from "./engine/GameController";
import GameControllerWorker from "./engine/GameControllerWorker";
import GameControllerSocket from "./engine/GameControllerSocket";
import GameUI from "./ui/GameUI";
import OnlineClient from "./engine/OnlineClient";

export { GameConstants, Event, Reactor, Grid, Snake, GameGroup, GameUtils, Position, GameEngine, Game, GameController, GameControllerWorker, GameControllerSocket, GameUI, OnlineClient };