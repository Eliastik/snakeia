// SnakeIA GameEngine test
import Grid from "../src/engine/Grid";
import Constants from "../src/engine/Constants";
import Snake from "../src/engine/Snake";
import GameEngine from "../src/engine/GameEngine";

test("snake stuck horizontally - auto detection", () => {
  const theGrid5 = new Grid(5, 5, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid5, Constants.PlayerType.AI, Constants.AiLevel.MOCK);
  const engine = new GameEngine(theGrid5, [theSnake]);
  engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid5.width * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("snake stuck vertically - auto detection", () => {
  const theGrid6 = new Grid(5, 5, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid6, Constants.PlayerType.AI, Constants.AiLevel.MOCK);
  const engine = new GameEngine(theGrid6, [theSnake]);
  engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid6.height * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});