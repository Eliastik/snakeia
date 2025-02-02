// SnakeIA Grid test
import Grid from "../src/engine/Grid.js";
import Position from "../src/engine/Position.js";
import Constants from "../src/engine/Constants.js";
import GameUtils from "../src/engine/GameUtils.js";

const theGrid = new Grid(10, 5, false, false, false,
  [
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0]
  ], // Custom grid
false);
theGrid.init();

const theGrid2 = new Grid(10, 5, false, false, false,
  [
    [3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 4, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 4, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 3, 0, 0, 0, 0, 0],
    [4, 4, 4, 3, 3, 0, 0, 0, 0, 0]
  ], // Custom grid
false);
theGrid2.init();

const theGrid3 = new Grid(10, 5, false, false, false,
  [
    [3, 3, 0, 0, 0, 0, 0, 1, 1, 1],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0]
  ], // Custom grid
false);
theGrid3.init();

const theGrid4 = new Grid(10, 5, false, false, false,
  [
    [3, 3, 3, 3, 0, 0, 0, 1, 1, 1],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 4, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 0, 0, 0, 0]
  ], // Custom grid
false);
theGrid4.init();

const theGrid5 = new Grid(10, 5, false, false, false,
  [
    [3, 3, 3, 3, 0, 0, 0, 1, 1, 1],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 6]
  ], // Custom grid
false);
theGrid5.init();

const theGrid6 = new Grid(10, 6, false, false, false,
  [
    [4, 4, 4, 0, 3, 3, 3, 1, 1, 1],
    [4, 0, 4, 0, 3, 0, 3, 0, 0, 0],
    [4, 0, 4, 0, 3, 0, 3, 0, 0, 0],
    [4, 0, 4, 0, 3, 0, 3, 0, 0, 0],
    [4, 0, 4, 0, 3, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ], // Custom grid
false);
theGrid6.init();

const theGrid7 = new Grid(10, 6, false, false, false,
  [
    [4, 4, 4, 0, 3, 3, 3, 1, 1, 1],
    [4, 0, 4, 0, 3, 0, 3, 0, 0, 0],
    [4, 0, 4, 0, 3, 0, 3, 0, 0, 0],
    [4, 2, 4, 0, 3, 6, 3, 0, 0, 0],
    [4, 0, 4, 0, 3, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ], // Custom grid
false);
theGrid7.init();

const theGrid8 = new Grid(5, 5, true, false, false,
  [
    [3, 3, 3, 3, 3],
    [3, 0, 0, 0, 3],
    [3, 1, 1, 1, 3],
    [3, 0, 6, 1, 3],
    [3, 3, 3, 3, 3]
  ], // Custom grid
false);
theGrid8.init();

const theGrid9 = new Grid(10, 6, false, false, false,
  [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 1, 1, 1, 0, 0, 0, 4, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 4, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 4, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
  ], // Custom grid
false);
theGrid9.init();

const theGrid10 = new Grid(10, 6, false, false, false,
  [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 4, 4, 4, 0, 0, 0, 1, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 1, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 1, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
  ], // Custom grid
false);
theGrid10.init();

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
  mockRandom.mockReturnValueOnce(new Position(1, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValueOnce(new Position(4, 1)).mockReturnValue(new Position(2, 0));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid3.setFruit();
  expect(theGrid3.get(new Position(1, 1))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid3.get(new Position(4, 3))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid3.get(new Position(4, 1))).toBe(Constants.CaseType.FRUIT);
});

test("corridor detection fruit test", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(2, 1)).mockReturnValueOnce(new Position(4, 2)).mockReturnValueOnce(new Position(3, 1)).mockReturnValueOnce(new Position(1, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValueOnce(new Position(2, 0)).mockReturnValue(new Position(5, 0));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid4.setFruit();
  expect(theGrid4.get(new Position(2, 1))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid4.get(new Position(4, 2))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid4.get(new Position(3, 1))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid4.get(new Position(1, 1))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid4.get(new Position(4, 3))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid4.get(new Position(5, 0))).toBe(Constants.CaseType.FRUIT);
});

test("corridor detection fruit test 2", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(3, 1)).mockReturnValueOnce(new Position(2, 0)).mockReturnValue(new Position(5, 0));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid5.setFruit();
  expect(theGrid5.get(new Position(3, 1))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid5.get(new Position(5, 0))).toBe(Constants.CaseType.FRUIT);
});

test("corridor detection fruit test 3", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(5, 3)).mockReturnValueOnce(new Position(5, 4)).mockReturnValueOnce(new Position(1, 3)).mockReturnValueOnce(new Position(1, 4)).mockReturnValue(new Position(7, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid6.setFruit();
  expect(theGrid6.get(new Position(5, 3))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid6.get(new Position(5, 4))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid6.get(new Position(1, 3))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid6.get(new Position(1, 4))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid6.get(new Position(7, 1))).toBe(Constants.CaseType.FRUIT);
});

test("corridor detection fruit test 4", () => {
  expect(theGrid7.detectCorridor(new Position(1, 3))).toBe(true);
  expect(theGrid7.detectCorridor(new Position(5, 3))).toBe(true);
  expect(theGrid7.detectCorridor(new Position(5, 5))).toBe(false);
  expect(theGrid7.detectCorridor(new Position(1, 4))).toBe(true);
  expect(theGrid7.detectCorridor(new Position(8, 3))).toBe(false);
  expect(theGrid7.detectCorridor(new Position(7, 0))).toBe(false);
  expect(theGrid7.detectCorridor(new Position(0, 0))).toBe(false);
  expect(theGrid7.detectCorridor(new Position(5, 0))).toBe(false);
});

test("corridor detection fruit test 5", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 3)).mockReturnValueOnce(new Position(2, 1)).mockReturnValueOnce(new Position(2, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid8.setFruit();
  expect(theGrid8.get(new Position(1, 3))).toBe(Constants.CaseType.FRUIT);
  expect(theGrid8.get(new Position(2, 1))).toBe(Constants.CaseType.EMPTY);
  expect(theGrid8.detectCorridor(new Position(2, 3))).toBe(false);
  expect(theGrid8.get(new Position(2, 3))).toBe(Constants.CaseType.FRUIT_GOLD);
});

test("corridor detection fruit test 6", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(8, 2)).mockReturnValueOnce(new Position(7, 4)).mockReturnValue(new Position(2, 4));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid9.setFruit();
  expect(theGrid9.get(new Position(8, 2))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid9.get(new Position(7, 4))).toBe(Constants.CaseType.SURROUNDED);
  expect(theGrid9.detectCorridor(new Position(2, 4))).toBe(false);
  expect(theGrid9.get(new Position(2, 4))).toBe(Constants.CaseType.FRUIT);
});

test("corridor detection fruit test 7", () => {
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(8, 2));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  theGrid10.setFruit();
  expect(theGrid10.get(new Position(8, 2))).toBe(Constants.CaseType.FRUIT);
  expect(theGrid10.detectCorridor(new Position(8, 2))).toBe(false);
});