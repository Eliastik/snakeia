function gameTest() {
  var grid = new Grid(20, 20, false, false);
  var snake = new Snake(RIGHT, 1, grid, PLAYER_IA, IA_LEVEL_HIGH);

  var grid2 = new Grid(20, 20, false, false);
  var snake2 = new Snake(RIGHT, 1, grid2, PLAYER_HUMAN);

  group = new GameGroup([new Game(grid, snake, 10, document.getElementById("gameDiv"), true, OUTPUT_GRAPHICAL, false, false, true), new Game(grid2, snake2, 10, document.getElementById("gameDiv"), true, OUTPUT_GRAPHICAL, true, false, true)]);
  group.start();
  console.log(group);
}

gameTest();
