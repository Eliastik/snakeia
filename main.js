function gameTest() {
  var grid = new Grid(28, 20, false, false);
  var snake = new Snake(RIGHT, 1, grid, PLAYER_IA, IA_LEVEL_HIGH);
  game = new Game(grid, snake, 10, document.getElementById("gameDiv"), true, OUTPUT_GRAPHICAL, false, false, true);
  game.start();

  var grid2 = new Grid(28, 20, false, false);
  var snake2 = new Snake(RIGHT, 1, grid2, PLAYER_HUMAN);
  game2 = new Game(grid2, snake2, 10, document.getElementById("gameDiv"), true, OUTPUT_GRAPHICAL, true, false, true);
  game2.start();

  game.onPause(function() {
    if(!game2.paused) {
      game2.pause();
    }
  });

  game2.onPause(function() {
    if(!game.paused) {
      game.pause();
    }
  });

  game.onContinue(function() {
    if(game2.paused) {
      game2.start();
    }
  });

  game2.onContinue(function() {
    if(game.paused) {
      game.start();
    }
  });

  game.onExit(function() {
    if(game2.exited) {
      console.log("All games exited");
      game.kill();
      game2.kill();
    }
  });

  game2.onExit(function() {
    if(game.exited) {
      console.log("All games exited");
      game.kill();
      game2.kill();
    }
  });

  game.onStop(function() {
    if(game2.gameOver) {
      console.log("All games over");
      game.kill();
      game2.kill();
    }
  });

  game2.onStop(function() {
    if(game.gameOver) {
      console.log("All games over");
      game.kill();
      game2.kill();
    }
  });
}

gameTest();
