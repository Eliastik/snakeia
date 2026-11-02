import Grid from "../src/engine/Grid.js";
import Position from "../src/engine/Position.js";
import Constants from "../src/engine/Constants.js";
import GameUtils from "../src/engine/GameUtils.js";
import SnakeAIUltra from "../src/engine/ai/SnakeAIUltra.js";
import BFSRewardStrategy from "../src/engine/ai/rewards/BFSRewardStrategy.js";
import PotentialRewardStrategy from "../src/engine/ai/rewards/PotentialRewardStrategy.js";
import SimpleRewardStrategy from "../src/engine/ai/rewards/SimpleRewardStrategy.js";
import Snake from "../src/engine/Snake.js";
import GameEngine from "../src/engine/GameEngine.js";
import SnakeAI from "../src/engine/ai/SnakeAI.js";
import "@tensorflow/tfjs-node";

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
    theGrid.setFruits(1);

    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing
    const currentState = theSnakeAI.getStateRaw(theSnake);

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
    theGrid.setFruits(1);

    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing
    const currentState = theSnakeAI.getStateRaw(theSnake);

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
    theGrid.setFruits(1);

    const theSnakeAI = new SnakeAIUltra();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing
    const currentState = theSnakeAI.getStateRaw(theSnake);

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
    theSnakeAI.rewardStrategy = new BFSRewardStrategy();

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 1, direction: Constants.Direction.RIGHT });

    for(let i = 0; i < 2; i++) {
        engine.doTick();
    }

    expect(theSnake.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, theSnakeAI.getStateRaw(theSnake))).toBe(Constants.AIRewards.GAME_OVER);
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
    theSnakeAI.rewardStrategy = new BFSRewardStrategy();

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 1, direction: Constants.Direction.RIGHT });

    for(let i = 0; i < 2; i++) {
        engine.doTick();
    }

    expect(theSnake.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, theSnakeAI.getStateRaw(theSnake))).toBe(Constants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND);
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
    theSnakeAI.rewardStrategy = new BFSRewardStrategy();

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 2, direction: Constants.Direction.RIGHT });

    for(let i = 0; i < 2; i++) {
        engine.doTick();
    }

    expect(theSnake.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, theSnakeAI.getStateRaw(theSnake))).toBe(Constants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND);
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
    theSnakeAI.rewardStrategy = new BFSRewardStrategy();
    theSnakeAI.enableStateRotation = false; // Disable state rotation for testing

    const currentState = theSnakeAI.getStateRaw(theSnake);

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 2, direction: Constants.Direction.RIGHT });
    
    engine.doTick();

    expect(theSnake.gameOver).toBe(false);
    expect(theSnake.score).toBe(1);
    expect(theSnakeAI.calculateReward(theSnake, currentState)).toBe(Constants.AIRewards.FRUIT_EATEN);

    expect(theSnakeAI.calculateReward(theSnake, currentState, true)).toBe(Constants.AIRewards.FRUIT_EATEN);
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
    theSnakeAI.rewardStrategy = new BFSRewardStrategy();
    const currentState = theSnakeAI.getStateRaw(theSnake);

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 2, direction: Constants.Direction.RIGHT });
    
    engine.doTick();

    expect(theSnake.gameOver).toBe(false);
    expect(theSnake.score).toBe(0);
    expect(theSnakeAI.calculateReward(theSnake, currentState).toFixed(3)).toBe("-0.051");

    expect(theSnakeAI.calculateReward(theSnake, currentState, true)).toBe(Constants.AIRewards.MOVE);
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
    theSnakeAI.rewardStrategy = new BFSRewardStrategy();
    const currentState = theSnakeAI.getStateRaw(theSnake);

    expect(engine.gameOver).toBe(true);
    expect(theSnakeAI.calculateReward(theSnake, currentState, true)).toBe(-0.004);
});

test("calculate reward - grid with no fruits does not throw", async () => {
    const theGrid = new Grid(10, 10, false, true, false, [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ]);
    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    theGrid.init();
    await theSnake.init();

    const theSnakeAI = new SnakeAIUltra();
    const warnings = [];
    const testLogger = { warn: (msg) => { warnings.push(msg); }, info: () => {}, debug: () => {}, error: () => {} };

    theSnakeAI.rewardStrategy = new BFSRewardStrategy(testLogger);
    const currentState = theSnakeAI.getStateRaw(theSnake);

    expect(theSnakeAI.rewardStrategy.logger).toBe(testLogger);
    expect(theSnakeAI.calculateReward(theSnake, currentState)).toBe(Constants.AIRewards.MOVE);
    expect(warnings.length).toBe(1);
    expect(warnings[0]).toContain("No fruit detected");
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

test("conv2d initializers are reproducible for the same seed", () => {
    const firstAI = new SnakeAIUltra(true, null, 123);
    const secondAI = new SnakeAIUltra(true, null, 123);
    const firstModel = firstAI.createModel();
    const secondModel = secondAI.createModel();

    const getConvolutionKernels = model => model.layers
        .filter(layer => layer.getClassName() === "Conv2D")
        .map(layer => layer.getWeights()[0].arraySync());

    expect(getConvolutionKernels(firstModel)).toEqual(getConvolutionKernels(secondModel));

    firstModel.dispose();
    secondModel.dispose();
});

test("restoring the training RNG updates existing and future replay buffers", () => {
    const theSnakeAI = new SnakeAIUltra(true, null, 123);
    const restoredRng = () => 0.5;

    theSnakeAI.memory.changeEnvironment("existing");
    theSnakeAI.setTrainingRng(restoredRng);

    expect(theSnakeAI.trainingRng).toBe(restoredRng);
    expect(theSnakeAI.memory.rng).toBe(restoredRng);
    expect(theSnakeAI.memory.buffers.get("existing").rng).toBe(restoredRng);

    theSnakeAI.memory.changeEnvironment("future");

    expect(theSnakeAI.memory.buffers.get("future").rng).toBe(restoredRng);
});

const BORDRED_GRID_10x5 = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

test("potential reward - potential is bounded and needs a single flood fill", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(5, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(10, 5, false, false, false, BORDRED_GRID_10x5, false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theGrid.init();
  await theSnake.init();

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });
  const currentState = theSnakeAI.getStateRaw(theSnake);

  const fill = strategy.floodFillFromHead(theSnake);
  expect(fill.reachArea).toBe(22);
  expect(fill.closestFruitDistance).toBe(-1);

  const phi = strategy.spaceWeight * (fill.reachArea / (10 * 5));
  expect(phi).toBeGreaterThan(0);
  expect(phi).toBeLessThanOrEqual(strategy.distanceWeight + strategy.spaceWeight);

  const reward = strategy.calculateReward(theSnake, currentState, false, "env-single");
  expect(strategy.floodFillCount).toBe(2);
  expect(reward).toBeCloseTo(Constants.AIRewards.MOVE + strategy.gamma * phi, 6);
  expect(strategy.potentialCache.get("env-single")).toBeCloseTo(phi, 6);

  strategy.potentialCache.set("env-single", phi);
  strategy.floodFillCount = 0;
  const rewardAgain = strategy.calculateReward(theSnake, currentState, false, "env-single");
  expect(strategy.floodFillCount).toBe(1);
  expect(rewardAgain).toBeCloseTo(Constants.AIRewards.MOVE + (strategy.gamma - 1) * phi, 6);
});

test("potential reward - shaping stays bounded on a move", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(5, 2)).mockReturnValueOnce(new Position(9, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(12, 5, false, false, false, [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ], false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });

  const stateBefore = theSnakeAI.getStateRaw(theSnake);
  engine.doTick();
  expect(theSnake.getHeadPosition().x).toBe(8);

  const reward = strategy.calculateReward(theSnake, stateBefore, false, "env-move");
  expect(reward).toBeCloseTo(Constants.AIRewards.MOVE + strategy.lastShaping, 6);
  expect(Math.abs(reward - Constants.AIRewards.MOVE)).toBeLessThanOrEqual(strategy.distanceWeight + strategy.spaceWeight);
});

test("potential reward - potential increases while the snake approaches the fruit", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(4, 2)).mockReturnValueOnce(new Position(9, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(12, 5, false, false, false, [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ], false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });

  let stateBefore = theSnakeAI.getStateRaw(theSnake);
  engine.doTick();
  const reward1 = strategy.calculateReward(theSnake, stateBefore, false, "env-approach");
  const phi1 = strategy.lastPhi;
  expect(theSnake.getHeadPosition().x).toBe(7);
  expect(phi1).toBeGreaterThan(0);
  expect(reward1).toBeGreaterThan(Constants.AIRewards.MOVE);

  stateBefore = theSnakeAI.getStateRaw(theSnake);
  engine.doTick();
  const reward2 = strategy.calculateReward(theSnake, stateBefore, false, "env-approach");
  expect(theSnake.getHeadPosition().x).toBe(8);
  expect(strategy.lastPhi).toBeGreaterThan(phi1);
  expect(strategy.lastShaping).toBeGreaterThan(0);
  expect(reward2).toBeCloseTo(Constants.AIRewards.MOVE + strategy.lastShaping, 6);
});

test("potential reward - potential decreases while the snake runs away from the fruit", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(14, 2)).mockReturnValueOnce(new Position(4, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(20, 5, false, false, false, [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ], false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });

  const fruit = theGrid.fruitPositions[0];
  expect(fruit.x).toBe(4);
  expect(theSnake.getHeadPosition().x).toBe(16);

  let stateBefore = theSnakeAI.getStateRaw(theSnake);
  engine.doTick();
  expect(theSnake.getHeadPosition().x).toBe(17);

  strategy.calculateReward(theSnake, stateBefore, false, "env-retreat");
  const phiBefore = strategy.lastPhi;

  stateBefore = theSnakeAI.getStateRaw(theSnake);
  engine.doTick();
  const reward = strategy.calculateReward(theSnake, stateBefore, false, "env-retreat");

  expect(theSnake.getHeadPosition().x).toBe(18);
  expect(strategy.lastPhi).toBeLessThan(phiBefore);
  expect(strategy.lastShaping).toBeLessThan(0);
  expect(reward).toBeLessThan(Constants.AIRewards.MOVE);
});

test("potential reward - fruit eaten keeps the legacy value, shaping stays bounded", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(5, 2));
  mockRandom.mockReturnValueOnce(new Position(8, 2));
  mockRandom.mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(10, 5, false, false, false, BORDRED_GRID_10x5, false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

  const gameEngineOptions = new Map();
  gameEngineOptions.set("paused", false);
  const engine = new GameEngine(theGrid, [theSnake], gameEngineOptions);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05, includeSurrounded: true });

  const stateBefore = theSnakeAI.getStateRaw(theSnake);
  engine.doTick();
  expect(theSnake.getHeadPosition().x).toBe(8);
  expect(theSnake.score).toBe(1);

  const reward = strategy.calculateReward(theSnake, stateBefore, false, "env-eat");

  expect(reward - strategy.lastShaping).toBeCloseTo(Constants.AIRewards.FRUIT_EATEN, 6);
  expect(Math.abs(strategy.lastShaping)).toBeLessThanOrEqual(strategy.distanceWeight + strategy.spaceWeight);
  expect(reward).toBeGreaterThan(0);
});

test("potential reward - a terminal transition always has zero potential", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(5, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(10, 5, false, false, false, BORDRED_GRID_10x5, false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theGrid.init();
  await theSnake.init();

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });
  const state = theSnakeAI.getStateRaw(theSnake);

  strategy.floodFillCount = 0;
  const rewardFirst = strategy.calculateReward(theSnake, state, true, "env-term");
  expect(strategy.floodFillCount).toBe(0);
  expect(rewardFirst).toBe(Constants.AIRewards.MOVE);

  strategy.potentialCache.set("env-term", 0.1234);
  const rewardSecond = strategy.calculateReward(theSnake, state, true, "env-term");
  expect(rewardSecond).toBeCloseTo(Constants.AIRewards.MOVE - 0.1234, 6);
  expect(strategy.potentialCache.has("env-term")).toBe(false);
  expect(strategy.floodFillCount).toBe(0);
});

test("potential reward - game over keeps the legacy death penalty", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(4, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(10, 5, false, false, false, BORDRED_GRID_10x5, false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theGrid.init();
  await theSnake.init();
  theSnake.gameOver = true;

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });
  const state = theSnakeAI.getStateRaw(theSnake);
  const head = theSnake.getHeadPosition();

  strategy.floodFillCount = 0;

  const neighbours = [
    new Position(head.x + 1, head.y),
    new Position(head.x - 1, head.y),
    new Position(head.x, head.y + 1),
    new Position(head.x, head.y - 1),
  ];
  for(const neighbour of neighbours) {
    theGrid.set(Constants.CaseType.WALL, neighbour);
  }

  const rewardTrapped = strategy.calculateReward(theSnake, state, false, "env-die");

  expect(rewardTrapped).toBe(Constants.AIRewards.GAME_OVER);
  expect(strategy.floodFillCount).toBe(0);
  expect(strategy.potentialCache.size).toBe(0);

  theGrid.set(Constants.CaseType.EMPTY, new Position(head.x + 1, head.y));
  const rewardOpen = strategy.calculateReward(theSnake, state, false, "env-die");
  expect(rewardOpen).toBe(Constants.AIRewards.GAME_OVER_WITH_EMPTY_CASES_AROUND);
  expect(strategy.potentialCache.size).toBe(0);
});

test("potential reward - gold fruits are valued closer than normal fruits", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(12, 5, false, false, false, [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ], false);

  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theGrid.init();
  await theSnake.init();

  const options = { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0, goldBonus: 3, includeSurrounded: false };

  for(let y = 0; y < theGrid.height; y++) {
    for(let x = 0; x < theGrid.width; x++) {
      const value = theGrid.getXY(x, y);
      if(value === Constants.CaseType.FRUIT || value === Constants.CaseType.FRUIT_GOLD) {
        theGrid.set(Constants.CaseType.EMPTY, new Position(x, y));
      }
    }
  }

  const head = theSnake.getHeadPosition();

  let fruitPosition = null;
  for(let y = 0; y < theGrid.height && fruitPosition === null; y++) {
    for(let x = 0; x < theGrid.width; x++) {
      if(theGrid.getXY(x, y) !== Constants.CaseType.EMPTY) continue;
      const distance = Math.abs(x - head.x) + Math.abs(y - head.y);
      if(distance > options.goldBonus + 1) {
        fruitPosition = new Position(x, y);
        break;
      }
    }
  }

  expect(fruitPosition).not.toBeNull();

  const strategy = new PotentialRewardStrategy(null, options);

  theGrid.set(Constants.CaseType.FRUIT, fruitPosition);
  const fillNormal = strategy.floodFillFromHead(theSnake);
  const phiNormal = strategy.computePotential(theSnake);
  expect(fillNormal.closestFruitDistance).toBeGreaterThan(options.goldBonus);
  expect(phiNormal).toBeCloseTo(options.distanceWeight * (1 - fillNormal.closestFruitDistance / fillNormal.diameter), 6);

  theGrid.set(Constants.CaseType.FRUIT_GOLD, fruitPosition);
  const fillGold = strategy.floodFillFromHead(theSnake);
  const phiGold = strategy.computePotential(theSnake);

  expect(fillGold.closestFruitDistance).toBe(fillNormal.closestFruitDistance - options.goldBonus);
  expect(phiGold).toBeCloseTo(options.distanceWeight * (1 - fillGold.closestFruitDistance / fillGold.diameter), 6);
  expect(phiGold).toBeGreaterThan(phiNormal);
});

test("potential reward - unreachable fruits contribute nothing", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(1, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(10, 5, false, false, false, [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 1, 1, 1, 3, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 3, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 3, 2, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ], false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theGrid.init();
  await theSnake.init();

  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05, includeSurrounded: false });
  const fill = strategy.floodFillFromHead(theSnake);
  expect(fill.closestFruitDistance).toBe(-1);

  const phi = strategy.computePotential(theSnake);
  expect(phi).toBeCloseTo(0.05 * (fill.reachArea / (10 * 5)), 6);

  expect(phi).toBeLessThan(strategy.distanceWeight + strategy.spaceWeight);
});

test("potential reward - potentials are isolated per environment instance", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(4, 2)).mockReturnValue(new Position(1, 1));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(10, 5, false, false, false, BORDRED_GRID_10x5, false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theGrid.init();
  await theSnake.init();

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });
  const state = theSnakeAI.getStateRaw(theSnake);
  const phi = strategy.computePotential(theSnake);

  const idA = "env-A";
  const idB = "env-B";

  const rewardA1 = strategy.calculateReward(theSnake, state, false, idA);
  expect(strategy.potentialCache.get(idA)).toBeCloseTo(phi, 6);
  expect(rewardA1).toBeCloseTo(Constants.AIRewards.MOVE + strategy.gamma * phi, 6);

  const rewardB1 = strategy.calculateReward(theSnake, state, false, idB);
  expect(rewardB1).toBeCloseTo(Constants.AIRewards.MOVE + strategy.gamma * phi, 6);

  const rewardA2 = strategy.calculateReward(theSnake, state, false, idA);
  expect(rewardA2).toBeCloseTo(Constants.AIRewards.MOVE + (strategy.gamma - 1) * phi, 6);

  strategy.reset(idA);
  expect(strategy.potentialCache.has(idA)).toBe(false);
  expect(strategy.potentialCache.has(idB)).toBe(true);
  strategy.resetAll();
  expect(strategy.potentialCache.size).toBe(0);
});

test("reward strategy wiring - default strategy and switching", () => {
  const warnings = [];
  const testLogger = {
    warn: (msg) => warnings.push(msg),
    info: () => {},
    debug: () => {},
    error: () => {},
  };

  const theSnakeAI = new SnakeAIUltra(true, null, null, testLogger);

  expect(theSnakeAI.rewardStrategyName).toBe("potential");
  expect(theSnakeAI.rewardStrategy instanceof PotentialRewardStrategy).toBe(true);
  expect(theSnakeAI.rewardStrategy.gamma).toBe(theSnakeAI.gamma);
  expect(theSnakeAI.rewardStrategyOptions.distanceWeight).toBe(theSnakeAI.rewardStrategyOptions.distanceWeight);
  expect(theSnakeAI.rewardStrategyManuallySet).toBe(false);

  const bfs = theSnakeAI.setRewardStrategy("bfs");
  expect(theSnakeAI.rewardStrategyName).toBe("bfs");
  expect(bfs instanceof BFSRewardStrategy).toBe(true);
  expect(theSnakeAI.rewardStrategyManuallySet).toBe(true);

  theSnakeAI.setRewardStrategy("simple");
  expect(theSnakeAI.rewardStrategy instanceof SimpleRewardStrategy).toBe(true);

  warnings.length = 0;
  theSnakeAI.setRewardStrategy("strategie-inconnue");
  expect(theSnakeAI.rewardStrategy instanceof BFSRewardStrategy).toBe(true);
  expect(warnings.length).toBe(1);
  expect(warnings[0]).toContain("Unknown reward strategy");
});

test("reward strategy wiring - beginEpisode resets the potential of the instance", () => {
  const theSnakeAI = new SnakeAIUltra();
  const strategy = theSnakeAI.setRewardStrategy("potential");

  strategy.potentialCache.set("env-1", 0.2);
  strategy.potentialCache.set("env-2", 0.3);

  theSnakeAI.beginEpisode("env-1");

  expect(strategy.potentialCache.has("env-1")).toBe(false);
  expect(strategy.potentialCache.has("env-2")).toBe(true);
});

test("reward strategy wiring - metadata round trip restores the strategy", async () => {
  const theSnakeAI = new SnakeAIUltra(true, null, 123);
  theSnakeAI.setRewardStrategy("simple", { distanceWeight: 0.25 });

  const metadata = theSnakeAI.exportMetadata();
  expect(metadata.trainingConfig.rewardStrategyName).toBe("simple");
  expect(metadata.trainingConfig.rewardStrategyOptions.distanceWeight).toBe(0.25);

  const restoredAI = new SnakeAIUltra(true, null, 123, {
    info: () => {},
    warn: () => {},
    error: () => {}
  }, {
    readJSON: async () => metadata
  });
  await restoredAI.loadMetadata("metadata.json");

  expect(restoredAI.rewardStrategyName).toBe("simple");
  expect(restoredAI.rewardStrategy instanceof SimpleRewardStrategy).toBe(true);
  expect(restoredAI.rewardStrategyOptions.distanceWeight).toBe(0.25);
});

test("potential reward - discounted shaping telescopes and cannot inflate the return", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(8, 5)).mockReturnValueOnce(new Position(16, 5)).mockReturnValue(new Position(16, 5));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const rows = [];
  for(let y = 0; y < 10; y++) {
    rows.push(new Array(20).fill(0));
  }
  for(let x = 0; x < 20; x++) {
    rows[0][x] = 3;
    rows[9][x] = 3;
  }
  for(let y = 0; y < 10; y++) {
    rows[y][0] = 3;
    rows[y][19] = 3;
  }

  const theGrid = new Grid(20, 10, false, false, false, rows, false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  const theSnakeAI = new SnakeAIUltra();
  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });
  const instanceId = "env-telescoping";

  const shapings = [];
  let potentialLast = 0;

  for(let i = 0; i < 4; i++) {
    const stateBefore = theSnakeAI.getStateRaw(theSnake);
    engine.doTick();

    expect(theSnake.gameOver).toBe(false);

    const reward = strategy.calculateReward(theSnake, stateBefore, false, instanceId);
    expect(reward).toBeCloseTo(Constants.AIRewards.MOVE + strategy.lastShaping, 6);

    shapings.push(strategy.lastShaping);
    potentialLast = strategy.lastPhi;
  }

  let discountedSum = 0;
  for(let i = 0; i < shapings.length; i++) {
    discountedSum += Math.pow(strategy.gamma, i) * shapings[i];
  }

  const telescoped = Math.pow(strategy.gamma, shapings.length) * potentialLast;

  expect(discountedSum).toBeCloseTo(telescoped, 10);
  expect(Math.abs(discountedSum)).toBeLessThanOrEqual(strategy.distanceWeight + strategy.spaceWeight);

  const doneReward = strategy.calculateReward(theSnake, theSnakeAI.getStateRaw(theSnake), true, instanceId);

  expect(strategy.lastPhi).toBe(0);
  expect(doneReward).toBeCloseTo(Constants.AIRewards.MOVE - potentialLast, 6);

  let discountedSumWithTerminal = discountedSum + Math.pow(strategy.gamma, shapings.length) * strategy.lastShaping;
  expect(discountedSumWithTerminal).toBeCloseTo(0, 10);
});

test("potential reward - the potential collapses when the snake is trapped", async () => {
  jest.spyOn(GameUtils, "randRange").mockImplementation(() => -1);
  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(4, 2));
  jest.spyOn(Grid.prototype, "getRandomPosition").mockReset().mockImplementation(mockRandom);

  const theGrid = new Grid(10, 5, false, false, false, BORDRED_GRID_10x5.map(row => [...row]), false);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
  theGrid.init();
  await theSnake.init();

  for(let y = 1; y <= 3; y++) {
    for(let x = 1; x <= 8; x++) {
      if(theGrid.getXY(x, y) === Constants.CaseType.EMPTY) {
        theGrid.grid[y][x] = Constants.CaseType.WALL;
      }
    }
  }

  const strategy = new PotentialRewardStrategy(null, { gamma: 0.99, distanceWeight: 0.10, spaceWeight: 0.05 });

  const fill = strategy.floodFillFromHead(theSnake);
  expect(fill.reachArea).toBe(1);
  expect(fill.diameter).toBe(0);
  expect(fill.closestFruitDistance).toBe(-1);
  
  const phi = strategy.computePotential(theSnake);
  expect(phi).toBeLessThanOrEqual(strategy.spaceWeight / (10 * 5));
});