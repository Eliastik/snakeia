function gameTest() {
  var games = [];

  for(var i = 0; i < 5; i++) {
    console.log(i);
    var grid = new Grid(20, 20, false, false);
    var snake = new Snake(RIGHT, 1, grid, PLAYER_IA, IA_LEVEL_HIGH);

    games.push(new Game(grid, snake, 10, document.getElementById("gameDiv"), true, OUTPUT_GRAPHICAL, false, false, true));
  }

  var group = new GameGroup(games);
  group.start();

  group.onStop(function() {
    group.killAll();
    console.log(group.getWinners());
  });
}

gameTest();
