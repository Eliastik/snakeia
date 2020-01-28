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
function GameGroup(games) {
    this.games = games == undefined ? [] : games;
    this.reactor = new Reactor();
    this.reactor.registerEvent("onStart");
    this.reactor.registerEvent("onPause");
    this.reactor.registerEvent("onContinue");
    this.reactor.registerEvent("onStop");
    this.reactor.registerEvent("onReset");
    this.reactor.registerEvent("onExit");
    this.reactor.registerEvent("onScoreIncreased");
    
    this.init();
}

GameGroup.prototype.init = function() {
    var self = this;

    for(var i = 0; i < this.games.length; i++) {
        if(i == 0) {
            self.games[i].enableKeyMenu = true;
        }

        this.games[i].onPause(function(v) {
            return function() {
                self.pauseAll(v);
            };
        }(i));

        this.games[i].onContinue(function(v) {
            return function() {
                self.startAll(v);
            };
        }(i));

        this.games[i].onExit(function(v) {
            return function() {
                self.checkExit(v);
            };
        }(i));

        this.games[i].onStop(function(v) {
            return function() {
                self.checkStop(v);
            };
        }(i));

        this.games[i].onReset(function(v) {
            return function() {
                self.resetAll(v);
            };
        }(i));

        this.games[i].onScoreIncreased(function(v) {
            return function() {
                self.checkOnScoreIncreased(v);
            };
        }(i));
    }
};

GameGroup.prototype.start = function() {
    this.startAll(null);
};

GameGroup.prototype.startAll = function(game) {
    for(var i = 0; i < this.games.length; i++) {
        if(this.games[i].paused && !this.games[i].starting && (game == null || i != game)) {
            this.games[i].start();
        }
    }

    this.reactor.dispatchEvent("onStart");
};

GameGroup.prototype.onStart = function(callback) {
    this.reactor.addEventListener("onStart", callback);
};

GameGroup.prototype.pauseAll = function(game) {
    for(var i = 0; i < this.games.length; i++) {
        if(!this.games[i].paused && (game == null || i != game)) {
            this.games[i].pause();
        }
    }

    this.reactor.dispatchEvent("onPause");
};

GameGroup.prototype.onPause = function(callback) {
    this.reactor.addEventListener("onPause", callback);
};

GameGroup.prototype.resetAll = function(game) {
    for(var i = 0; i < this.games.length; i++) {
        if(!this.games[i].isReseted && (game == null || i != game)) {
            this.games[i].reset();
        }
    }

    this.reactor.dispatchEvent("onReset");
};

GameGroup.prototype.onReset = function(callback) {
    this.reactor.addEventListener("onReset", callback);
};

GameGroup.prototype.checkExit = function(game) {
    allExited = true;

    for(var i = 0; i < this.games.length; i++) {
        if(!this.games[i].exited) {
            allExited = false;
        }
    }

    if(allExited) {
        this.reactor.dispatchEvent("onExit");
    } else {
        this.startAll(game);
    }
};

GameGroup.prototype.onExit = function(callback) {
    this.reactor.addEventListener("onExit", callback);
};

GameGroup.prototype.checkStop = function() {
    allStopped = true;

    for(var i = 0; i < this.games.length; i++) {
        if(!this.games[i].gameOver) {
            allStopped = false;
        }
    }

    if(allStopped) {
        this.reactor.dispatchEvent("onStop");
    }
};

GameGroup.prototype.onStop = function(callback) {
    this.reactor.addEventListener("onStop", callback);
};

GameGroup.prototype.stopAll = function(finished) {
    for(var i = 0; i < this.games.length; i++) {
        if(finished) {
            this.games[i].finish(true);
        } else {
            this.games[i].stop();
        }
    }
};

GameGroup.prototype.killAll = function() {
    for(var i = 0; i < this.games.length; i++) {
        this.games[i].kill();
    }
};

GameGroup.prototype.checkOnScoreIncreased = function() {
    this.reactor.dispatchEvent("onScoreIncreased");
};

GameGroup.prototype.onScoreIncreased = function(callback) {
    this.reactor.addEventListener("onScoreIncreased", callback);
};

GameGroup.prototype.setDisplayFPS = function(value) {
    for(var i = 0; i < this.games.length; i++) {
        this.games[i].setDisplayFPS(value);
    }
};

GameGroup.prototype.setNotification = function(notification) {
    for(var i = 0; i < this.games.length; i++) {
        this.games[i].setNotification(notification.copy());
    }
};

GameGroup.prototype.closeNotification = function() {
    for(var i = 0; i < this.games.length; i++) {
        this.games[i].setNotification(null);
    }
};

GameGroup.prototype.errorOccurred = function() {
    for(var i = 0; i < this.games.length; i++) {
        if(this.games[i].errorOccurred) return true;
    }

    return false;
};

GameGroup.prototype.getWinners = function() {
    winners = [];
    index = [];
    maxScore = -1;

    for(var i = 0; i < this.games.length; i++) {
        for(var j = 0; j < this.games[i].snakes.length; j++) {
            if(this.games[i].snakes[j].score > maxScore) {
                maxScore = this.games[i].snakes[j].score;
            }
        }
    }

    if(maxScore >= 0) {
        var idx = 0;

        for(var i = 0; i < this.games.length; i++) {
            for(var j = 0; j < this.games[i].snakes.length; j++) {
                if(this.games[i].snakes[j].score >= maxScore) {
                    winners.push(this.games[i].snakes[j]);
                    index.push(idx);
                }

                idx++;
            }
          }
    }

    return {
        winners: winners,
        score: maxScore,
        index: index
    }
};