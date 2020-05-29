// SnakeIA grid test
import Grid from "../src/engine/Grid";
import Position from "../src/engine/Position";
import Constants from "../src/engine/Constants";
import GameUtils from "../src/engine/GameUtils";

const theGrid = new Grid(10, 5, false, false, false,
  [
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0]
  ], // Custom grid
false);

const theGrid2 = new Grid(10, 5, false, false, false,
  [
    [3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 4, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 4, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 3, 0, 0, 0, 0, 0],
    [4, 4, 4, 3, 3, 0, 0, 0, 0, 0]
  ], // Custom grid
false);

const theGrid3 = new Grid(10, 5, false, false, false,
  [
    [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0]
  ], // Custom grid
false);

beforeAll(() => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
});

test("surrounded fruit test", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(4, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid.setFruit();
  expect(theGrid.get(new Position(4, 1))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid.get(new Position(4, 3))).toBe(Constants.CaseType.SURROUNDED);
});

test("surrounded fruit test 2", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(2, 2)).mockReturnValueOnce(new Position(1, 1)).mockReturnValue(new Position(5, 0));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid2.setFruit();
  expect(theGrid2.get(new Position(2, 2))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid2.get(new Position(1, 1))).toBe(Constants.CaseType.SURROUNDED);
});

test("surrounded by 3 walls fruit test", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(2, 0));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid3.setFruit();
  expect(theGrid3.get(new Position(1, 1))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid3.get(new Position(4, 3))).toBe(Constants.CaseType.SURROUNDED);
});