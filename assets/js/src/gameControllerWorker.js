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
function GameControllerWorker(game, ui) {
    GameController.call(this, game, ui);

    this.worker = new Worker("assets/js/src/gameEngineWorker.js");

    this.init = function() {
        if(window.Worker) {
            if(this.worker instanceof Worker) {
                this.worker.postMessage(["init", game]);

                var self = this;

                this.worker.onmessage = function(e) {
                    var data = e.data;

                    if(data.length > 1) {
                        var grid;

                        if(data[1].hasOwnProperty("grid")) {
                            grid = Object.assign(new Grid(), data[1]["grid"]);
                            data[1]["grid"] = grid;
                        }

                        if(data[1].hasOwnProperty("snakes")) {
                            for(var i = 0; i < data[1]["snakes"].length; i++) {
                                data[1]["snakes"][i].grid = grid;
                                data[1]["snakes"][i] = Object.assign(new Snake(), data[1]["snakes"][i]);

                                for(var j = 0; j < data[1]["snakes"][i].queue.length; j++) {
                                    data[1]["snakes"][i].queue[j] = Object.assign(new Position(), data[1]["snakes"][i].queue[j]);
                                }
                            }
                        }

                        self.update(data[0], data[1]);
                    }
                };
            } else {
                if(this.gameUI != null) {
                    this.update("init", {
                        "errorOccured": true
                    });
                }
            }
        }
    };

    this.reset = function() {
        if(this.worker instanceof Worker) this.worker.postMessage(["reset"]);
    };

    this.start = function() {
        if(this.worker instanceof Worker) this.worker.postMessage(["start"]);
    };

    this.stop = function() {
        if(this.worker instanceof Worker) this.worker.postMessage(["stop"]);
    };

    this.finish = function(finish) {
        if(this.worker instanceof Worker) this.worker.postMessage([(finish ? "finish" : "stop")]);
    };

    this.pause = function() {
        if(this.worker instanceof Worker) this.worker.postMessage(["pause"]);
    };

    this.kill = function() {
        if(this.worker instanceof Worker) this.worker.postMessage(["kill"]);
    };

    this.tick = function() {
        if(this.worker instanceof Worker) this.worker.postMessage(["tick"]);
    };

    this.exit = function() {
        if(this.worker instanceof Worker) this.worker.postMessage(["exit"]);
    };

    this.key = function(key) {
        if(this.worker instanceof Worker) this.worker.postMessage(["key", key]);
    };
}

GameControllerWorker.prototype = Object.create(GameController).prototype;
GameControllerWorker.prototype.constructor = GameControllerWorker;