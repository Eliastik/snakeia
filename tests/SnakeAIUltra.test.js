import Grid from "../src/engine/Grid.js";
import Position from "../src/engine/Position.js";
import Constants from "../src/engine/Constants.js";
import GameUtils from "../src/engine/GameUtils.js";
import SnakeAIUltra from "../src/engine/ai/SnakeAIUltra.js";
import Snake from "../src/engine/Snake.js";
import GameEngine from "../src/engine/GameEngine.js";
import SnakeAI from "../src/engine/ai/SnakeAI.js";
import "@tensorflow/tfjs-node";
import { t } from "i18next";

beforeAll(() => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
});

test("get state from ai test - test 1", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ], // Custom grid
    false);
    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(4, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    theGrid.init();
    await theSnake.init();
    theGrid.setFruit();

    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing
    const currentState = theSnakeAI.getState(theSnake);

    expect(theSnake.errorInit).toBe(false);
    expect(theGrid.grid).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    expect(currentState.snakesLayer).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 1, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    expect(currentState.fruitsAndWallsLayer).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
});

test("get state from ai test - test 2", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
      [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
      ], // Custom grid
    false);
    const theSnake = new Snake(Constants.Direction.LEFT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(4, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    theGrid.init();
    await theSnake.init();
    theGrid.setFruit();

    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing
    const currentState = theSnakeAI.getState(theSnake);

    expect(theSnake.errorInit).toBe(false);
    expect(theGrid.grid).toEqual([
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 1, 1, 1, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 2, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ]);
    expect(currentState.snakesLayer).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 1, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    expect(currentState.fruitsAndWallsLayer).toEqual([
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 1, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ]);
});

test("get state from ai test - test 3", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
      [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 4, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 4, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 4, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
      ], // Custom grid
    false);
    const theSnake = new Snake(Constants.Direction.LEFT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(4, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(2, 2)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

    // Trigger gold fruit
    jest.spyOn(GameUtils, "randRange").mockImplementation(() => 1);
    
    theGrid.init();
    await theSnake.init();
    theGrid.setFruit();

    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing
    const currentState = theSnakeAI.getState(theSnake);

    expect(theSnake.errorInit).toBe(false);
    expect(theGrid.grid).toEqual([
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 6, 1, 1, 1, 0, 0, 0, 4, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 4, 3],
        [3, 0, 0, 0, 2, 0, 0, 0, 4, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ]);
    expect(currentState.snakesLayer).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 1, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    expect(currentState.fruitsAndWallsLayer).toEqual([
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 2, 0, 0, 0, 0, 0, 0, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 3, 3],
        [3, 0, 0, 0, 1, 0, 0, 0, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ]);
});

test("state to tensor - test 1", async () => {
    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.modelHeight = 8;
    theSnakeAI.modelWidth = 8;

    const currentState = {
        snakesLayer: [
            [0, 0, 0, 0, 0],
            [3, 2, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        fruitsAndWallsLayer: [
            [3, 3, 3, 3, 3],
            [3, 0, 0, 0, 3],
            [3, 0, 0, 0, 3],
            [3, 0, 1, 0, 3],
            [3, 3, 3, 3, 3]
        ]
    };

    const tensorState = theSnakeAI.stateToTensor(currentState);
    const arrayData = tensorState.arraySync();

    expect(arrayData).toEqual([
        [[ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]],
        [[ 3, 3 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 3 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]],
        [[ 0, 3 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 3 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]],
        [[ 0, 3 ], [ 0, 0 ], [ 0, 1 ], [ 0, 0 ], [ 0, 3 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]],
        [[ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]],
        [[ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]],
        [[ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]],
        [[ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ], [ -1, -1 ]]
    ]);
});

test("state to tensor - test 2", async () => {
    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.modelHeight = 5;
    theSnakeAI.modelWidth = 5;

    const currentState = {
        snakesLayer: [
            [0, 0, 0, 0, 0],
            [3, 2, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        fruitsAndWallsLayer: [
            [3, 3, 3, 3, 3],
            [3, 0, 0, 0, 3],
            [3, 0, 0, 0, 3],
            [3, 0, 1, 0, 3],
            [3, 3, 3, 3, 3]
        ]
    };

    const tensorState = theSnakeAI.stateToTensor(currentState);
    const arrayData = tensorState.arraySync();

    expect(arrayData).toEqual([
        [[ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ]],
        [[ 3, 3 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ], [ 0, 3 ]],
        [[ 0, 3 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 3 ]],
        [[ 0, 3 ], [ 0, 0 ], [ 0, 1 ], [ 0, 0 ], [ 0, 3 ]],
        [[ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ], [ 0, 3 ]]
    ]);
});

test("calculate reward - game over reward when there are no empty cases around", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
    [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ], // Custom grid
    false);

    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(5, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    const theSnakeAI = new SnakeAIUltra();

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 1, direction: Constants.Direction.RIGHT });

    for(let i = 0; i < 2; i++) {
        engine.doTick();
    }

    expect(theSnake.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, theSnakeAI.getState(theSnake))).toBe(Constants.AIRewards.GAME_OVER);
});

test("calculate reward - game over reward when there are 1 empty case around", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
    [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ], // Custom grid
    false);

    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(5, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    const theSnakeAI = new SnakeAIUltra();

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 1, direction: Constants.Direction.RIGHT });

    for(let i = 0; i < 2; i++) {
        engine.doTick();
    }

    expect(theSnake.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, theSnakeAI.getState(theSnake))).toBe(Constants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND);
});

test("calculate reward - game over reward when there are 2 empty cases around", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
    [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ], // Custom grid
    false);

    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(5, 2)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    const theSnakeAI = new SnakeAIUltra();

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 2, direction: Constants.Direction.RIGHT });

    for(let i = 0; i < 2; i++) {
        engine.doTick();
    }

    expect(theSnake.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, theSnakeAI.getState(theSnake))).toBe(Constants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND);
});

test("calculate reward - fruit eaten", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
    [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ], // Custom grid
    false);

    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(5, 2)).mockReturnValueOnce(new Position(8, 2)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing
    const currentState = theSnakeAI.getState(theSnake);

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 2, direction: Constants.Direction.RIGHT });
    
    engine.doTick();

    expect(theSnake.gameOver).toBe(false);
    expect(theSnake.score).toBe(1);
    expect(theSnakeAI.calculateReward(theSnake, currentState)).toBe(Constants.AIRewards.FRUIT_EATEN);
});

test("calculate reward - move", async () => {
    const theGrid = new Grid(10, 5, false, false, false,
    [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ], // Custom grid
    false);

    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(5, 2)).mockReturnValueOnce(new Position(9, 2)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    const theSnakeAI = new SnakeAIUltra();
    const currentState = theSnakeAI.getState(theSnake);

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 2, direction: Constants.Direction.RIGHT });
    
    engine.doTick();

    expect(theSnake.gameOver).toBe(false);
    expect(theSnake.score).toBe(0);
    expect(theSnakeAI.calculateReward(theSnake, currentState)).toBe(Constants.AIRewards.MOVE);
    expect(theSnakeAI.calculateReward(theSnake, currentState, true)).not.toBe(Constants.AIRewards.STUCK);
});

test("calculate reward - stuck", async () => {
    class SnakeAICustom extends SnakeAI {
    
        actionsStep = [Constants.Key.BOTTOM, Constants.Key.BOTTOM, Constants.Key.BOTTOM, Constants.Key.RIGHT, Constants.Key.UP, Constants.Key.UP, Constants.Key.UP, Constants.Key.LEFT];
        actionStepCounter = 0;

        ai(_snake) {
            const action = this.actionsStep[this.actionStepCounter];
            this.actionStepCounter = (this.actionStepCounter + 1) % this.actionsStep.length;
            return action;
        }
    }

    const theGrid = new Grid(10, 10, false, false, false, null, false, 1, 2);
    const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.CUSTOM, false, "TheAI", new SnakeAICustom());
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    for(let i = 0; i < theGrid.height * 2 * engine.aiStuckLimit + 1; i++) {
        engine.doTick();
    }

    const theSnakeAI = new SnakeAIUltra();
    const currentState = theSnakeAI.getState(theSnake);

    expect(engine.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, currentState, true)).toBe(Constants.AIRewards.STUCK);
});

test("action to key test 1", async () => {
    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.numberOfPossibleActions = 3;

    const theGrid = new Grid(10, 5, false, false, false);
    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    theGrid.init();
    await theSnake.init();

    expect(theSnakeAI.actionToKey(theSnake, Constants.AIActions.CONTINUE)).toBe(Constants.Key.RIGHT);
});

test("action to key test 2", async () => {
    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.numberOfPossibleActions = 3;

    const theGrid = new Grid(10, 5, false, false, false);
    const theSnake = new Snake(Constants.Direction.LEFT, 3, theGrid);

    theGrid.init();
    await theSnake.init();

    expect(theSnakeAI.actionToKey(theSnake, Constants.AIActions.CONTINUE)).toBe(Constants.Key.LEFT);
});

test("action to key test 3", async () => {
    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.numberOfPossibleActions = 3;

    const theGrid = new Grid(10, 5, false, false, false);
    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    theGrid.init();
    await theSnake.init();

    expect(theSnakeAI.actionToKey(theSnake, Constants.AIActions.TURN_RIGHT)).toBe(Constants.Key.BOTTOM);
});