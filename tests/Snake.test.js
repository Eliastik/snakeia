// SnakeIA Snake test
import Grid from "../src/engine/Grid.js";
import Position from "../src/engine/Position.js";
import Constants from "../src/engine/Constants.js";
import Snake from "../src/engine/Snake.js";

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

test("snakes put next to a wall/dead position", async () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(6, 5)).mockReturnValueOnce(new Position(2, 3)).mockReturnValueOnce(new Position(3, 5));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  await theSnake.init();

  const theSnake2 = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  await theSnake2.init();

  const theSnake3 = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  await theSnake3.init();

  expect(theSnake.getHeadPosition().direction).toBe(Constants.Direction.LEFT);
  expect(theSnake2.getHeadPosition().direction).toBe(Constants.Direction.RIGHT);
  expect(theSnake3.getHeadPosition().direction).toBe(Constants.Direction.LEFT);
});

test("not enough free space to put a snake", async () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid2);
  await theSnake.init();

  expect(theSnake.errorInit).toBe(true);
});

test("not enough free space to put a snake horizontally - auto detection", async () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 3));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid3);
  await theSnake.init();

  expect(theSnake.errorInit).toBe(false);
  expect(theSnake.getHeadPosition().direction).toBe(Constants.Direction.DOWN);
});

test("not enough free space to put a snake vertically - auto detection", async () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const theSnake = new Snake(Constants.Direction.DOWN, 3, theGrid4);
  await theSnake.init();

  expect(theSnake.errorInit).toBe(false);
  expect(theSnake.getHeadPosition().direction).toBe(Constants.Direction.LEFT);
});