function gameTest() {
  var games = [];

  for(var i = 0; i < 20; i++) {
    var grid = new Grid(3, 3, false, false);
    var snake = new Snake(RIGHT, 1, grid, PLAYER_IA, IA_LEVEL_HIGH);

    games.push(new Game(grid, snake, 1, document.getElementById("gameDiv"), true, false, false, 400, 300, true, OUTPUT_GRAPHICAL));
  }

  var group = new GameGroup(games);
  group.start();

  group.onStop(function() {
    // group.killAll();
    console.log(group.getWinners());
  });
}

gameTest();
