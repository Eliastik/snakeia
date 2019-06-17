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
function gameTest() {
  var games = [];

  for(var i = 0; i < 20; i++) {
    var grid = new Grid(20, 20);
    var snake = new Snake(RIGHT, 1, grid, PLAYER_IA, IA_LEVEL_HIGH);

    games.push(new Game(grid, snake, 1, document.getElementById("gameDiv"), true, false, false, 400, 300));
  }

  var group = new GameGroup(games);
  group.start();

  group.onStop(function() {
    // group.killAll();
    console.log(group.getWinners());
  });
}

gameTest();
