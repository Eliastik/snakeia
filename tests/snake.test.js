// SnakeIA snake test
import Grid from "../src/engine/Grid";
import Position from "../src/engine/Position";
import Constants from "../src/engine/Constants";
import GameUtils from "../src/engine/GameUtils";
import Snake from "../src/engine/Snake";
import GameEngine from "../src/engine/GameEngine";

const theGrid = new Grid(10, 10, false, true);
theGrid.init();

const theGrid2 = new Grid(3, 3, false, true);
theGrid2.init();

const theGrid3 = new Grid(5, 5, true, false, false,
  [
    [3, 3, 3, 3, 3],
    [3, 0, 3, 3, 3],
    [3, 0, 3, 3, 3],
    [3, 0, 3, 3, 3],
    [3, 3, 3, 3, 3]
  ], // Custom grid
false);
theGrid3.init();

const theGrid4 = new Grid(5, 5, true, false, false,
  [
    [3, 3, 3, 3, 3],
    [3, 0, 0, 0, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3]
  ], // Custom grid
false);
theGrid4.init();

test("snakes put next to a wall/dead position", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(6, 5)).mockReturnValueOnce(new Position(2, 3)).mockReturnValueOnce(new Position(3, 5));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theSnake.init();

  const theSnake2 = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theSnake2.init();

  const theSnake3 = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theSnake3.init();

  expect(theSnake.getHeadPosition().direction).toBe(Constants.Direction.LEFT);
  expect(theSnake2.getHeadPosition().direction).toBe(Constants.Direction.RIGHT);
  expect(theSnake3.getHeadPosition().direction).toBe(Constants.Direction.LEFT);
});

test("not enough free space to put a snake", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid2);
  theSnake.init();

  expect(theSnake.errorInit).toBe(true);
});

test("not enough free space to put a snake horizontally - auto detection", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 3));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid3);
  theSnake.init();

  expect(theSnake.errorInit).toBe(false);
  expect(theSnake.getHeadPosition().direction).toBe(Constants.Direction.DOWN);
});

test("not enough free space to put a snake vertically - auto detection", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.DOWN, 3, theGrid4);
  theSnake.init();

  expect(theSnake.errorInit).toBe(false);
  expect(theSnake.getHeadPosition().direction).toBe(Constants.Direction.LEFT);
});

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