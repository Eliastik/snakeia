// SnakeIA snake test
import Grid from "../src/engine/Grid";
import Position from "../src/engine/Position";
import Constants from "../src/engine/Constants";
import GameUtils from "../src/engine/GameUtils";
import Snake from "../src/engine/Snake";

const theGrid = new Grid(10, 10, false, true);
theGrid.init();

const theGrid2 = new Grid(3, 3, false, true);
theGrid2.init();

beforeAll(() => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
});

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

  expect(theSnake.init()).toBe(false);
  expect(theSnake.errorInit).toBe(true);
});