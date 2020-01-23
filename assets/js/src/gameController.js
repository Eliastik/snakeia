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
function GameController(engine, ui) {
    this.gameUI = ui;
    this.gameEngine = engine;
    // Copy of game engine variables
    this.snakes;
    this.paused;
    this.isReseted;
    this.exited;
    this.gameOver;
    this.starting;
    // Events
    this.reactor = new Reactor();
    this.reactor.registerEvent("onStart");
    this.reactor.registerEvent("onPause");
    this.reactor.registerEvent("onContinue");
    this.reactor.registerEvent("onReset");
    this.reactor.registerEvent("onStop");
    this.reactor.registerEvent("onExit");
    this.reactor.registerEvent("onKill");
    this.reactor.registerEvent("onScoreIncreased");
    this.reactor.registerEvent("onUpdate");

    this.init();
}

GameController.prototype.init = function() {
    var self = this;

    this.gameEngine.onReset(function() {
        self.update("reset");
        self.reactor.dispatchEvent("onReset");
    });

    this.gameEngine.onStart(function() {
        self.update("start");
        self.reactor.dispatchEvent("onStart");
    });

    this.gameEngine.onPause(function() {
        self.update("pause");
        self.reactor.dispatchEvent("onPause");
    });

    this.gameEngine.onContinue(function() {
        self.update("continue");
        self.reactor.dispatchEvent("onContinue");
    });

    this.gameEngine.onStop(function() {
        self.update("stop");
        self.reactor.dispatchEvent("onStop");
    });

    this.gameEngine.onExit(function() {
        self.update("exit");
        self.reactor.dispatchEvent("onExit");
    });

    this.gameEngine.onKill(function() {
        self.update("kill");
        self.reactor.dispatchEvent("onKill");
    });

    this.gameEngine.onScoreIncreased(function() {
        self.update("scoreIncreased");
        self.reactor.dispatchEvent("onScoreIncreased");
    });

    this.gameEngine.onUpdate(function() {
        self.update("update");
        self.reactor.dispatchEvent("onUpdate");
    });
};

GameController.prototype.getNBPlayer = function(type) {
    return this.gameEngine.getNBPlayer(type);
};

GameController.prototype.getPlayer = function(num, type) {
    return this.gameEngine.getPlayer(num, type);
};

GameController.prototype.getNBSnakes = function() {
    return this.gameEngine.snakes.length;
};

GameController.prototype.reset = function() {
    this.gameEngine.reset();
};

GameController.prototype.start = function() {
    this.gameEngine.start();
};

GameController.prototype.stop = function() {
    this.gameEngine.stop();
};

GameController.prototype.finish = function(finish) {
    this.gameEngine.stop(finish);
};

GameController.prototype.pause = function() {
    this.gameEngine.pause();
};

GameController.prototype.kill = function() {
    this.gameEngine.kill();
};

GameController.prototype.tick = function() {
    this.gameEngine.tick();
};

GameController.prototype.exit = function() {
    this.gameEngine.exit();
};

GameController.prototype.setDisplayFPS = function(display) {
    this.gameUI.setDisplayFPS(display);
};

GameController.prototype.setNotification = function(notification) {
    this.gameUI.setNotification(notification);
};

GameController.prototype.setTimeToDisplay = function(time) {
    this.gameUI.setTimeToDisplay(time);
};

GameController.prototype.update = function(message, data) {
    if(this.gameUI != null && this.gameEngine != null) {
        this.gameUI.snakes = this.gameEngine.snakes;
        this.gameUI.grid = this.gameEngine.grid;
        this.gameUI.speed = this.gameEngine.speed;
        this.gameUI.offsetFrame = 0;
        this.gameUI.countBeforePlay = this.gameEngine.countBeforePlay;
        this.gameUI.paused = this.gameEngine.paused;
        this.gameUI.exited = this.gameEngine.exited;

        if(this.gameEngine.killed) {
            this.gameUI.setKill();
        }

        this.gameUI.isReseted = this.gameEngine.isReseted;
        this.gameUI.gameOver = this.gameEngine.gameOver;
        this.gameUI.gameFinished = this.gameEngine.gameFinished; // only used if 2 and more snakes
        this.gameUI.gameMazeWin = this.gameEngine.gameMazeWin; // used in maze mode
        this.gameUI.scoreMax = this.gameEngine.scoreMax;
        this.gameUI.errorOccured = this.gameEngine.errorOccured;
        this.gameUI.enablePause = this.gameEngine.enablePause;
        this.gameUI.enableRetry = this.gameEngine.enableRetry;
        this.gameUI.ticks = this.gameEngine.ticks;
        this.gameUI.initialSpeed = this.gameEngine.initialSpeed;
        this.gameUI.numFruit = this.gameEngine.numFruit;
        this.gameUI.getInfos = false;
        this.gameUI.getInfosGame = false;
        this.gameUI.confirmExit = false;
        this.gameUI.confirmReset = false;

        this.snakes = this.gameEngine.snakes;
        this.paused = this.gameEngine.paused;
        this.isReseted = this.gameEngine.isReseted;
        this.exited = this.gameEngine.exited;
        this.gameOver = this.gameEngine.gameOver;
        this.starting = this.gameEngine.starting;
    }
};

GameController.prototype.setBestScore = function(score) {
    this.gameUI.setBestScore(score);
};

GameController.prototype.key = function(key) {
    this.gameEngine.lastKey = key;
};

GameController.prototype.onReset = function(callback) {
    this.reactor.addEventListener("onReset", callback);
};

GameController.prototype.onStart = function(callback) {
    this.reactor.addEventListener("onStart", callback);
};

GameController.prototype.onContinue = function(callback) {
    this.reactor.addEventListener("onContinue", callback);
};

GameController.prototype.onStop = function(callback) {
    this.reactor.addEventListener("onStop", callback);
};

GameController.prototype.onPause = function(callback) {
    this.reactor.addEventListener("onPause", callback);
};

GameController.prototype.onExit = function(callback) {
    this.reactor.addEventListener("onExit", callback);
};

GameController.prototype.onKill = function(callback) {
    this.reactor.addEventListener("onKill", callback);
};

GameController.prototype.onScoreIncreased = function(callback) {
    this.reactor.addEventListener("onScoreIncreased", callback);
};