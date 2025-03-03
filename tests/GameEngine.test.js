// SnakeIA GameEngine test
import Grid from "../src/engine/Grid.js";
import Position from "../src/engine/Position.js";
import Constants from "../src/engine/Constants.js";
import Snake from "../src/engine/Snake.js";
import GameEngine from "../src/engine/GameEngine.js";
import SnakeAI from "../src/engine/ai/SnakeAI.js";
import GameUtils from "../src/engine/GameUtils.js";

test("snake stuck horizontally - auto detection", async () => {
  const theGrid = new Grid(5, 5, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.MOCK);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid.width * 2 * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("snake stuck horizontally - auto detection - inverse action", async () => {
  class SnakeAICustom extends SnakeAI {
    ai(_snake) {
      return Constants.Key.LEFT;
    }
  }

  const theGrid = new Grid(5, 5, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.CUSTOM, false, "TheAI", new SnakeAICustom());
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid.width * 2 * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("snake stuck horizontally - auto detection - grid 5 x 50", async () => {
  const theGrid = new Grid(5, 50, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.MOCK);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid.height * 2 * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("snake stuck vertically - auto detection", async () => {
  const theGrid = new Grid(5, 5, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.MOCK);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid.height * 2 * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("snake stuck vertically - auto detection - inverse action", async () => {
  class SnakeAICustom extends SnakeAI {
    ai(_snake) {
      return Constants.Key.UP;
    }
  }

  const theGrid = new Grid(5, 5, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.CUSTOM, false, "TheAI", new SnakeAICustom());
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid.height * 2 * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("snake stuck vertically - auto detection - grid 5 x 50", async () => {
  const theGrid = new Grid(5, 50, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.MOCK);
  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  for(let i = 0; i < theGrid.height * 2 * engine.aiStuckLimit + 1; i++) {
    engine.doTick();
  }

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("snake stuck with repetitive action - auto detection", async () => {
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

  expect(engine.gameOver).toBe(true);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(true);
});

test("eating fruit should reset the stuck counter", async () => {
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

  function allPositionsOccupied() {
    const restrictedArea = Array.from({ length: 2 }, (_, dx) => 
      Array.from({ length: 4 }, (_, dy) => new Position(5 + dx, 4 + dy))
    ).flat();

    return restrictedArea.every(pos =>
      theSnake.queue.some(sq => sq.equals(pos)) || pos.equals(theGrid.fruitPos)
    );
  }

  const mockRandom = jest.fn();
  mockRandom.mockReturnValueOnce(new Position(5, 2)).mockImplementation(() => {
    if(allPositionsOccupied()) {
      return new Position(GameUtils.randRange(0, theGrid.width - 1), GameUtils.randRange(0, theGrid.height - 1));
    }
    
    return new Position(GameUtils.randRange(5, 6), GameUtils.randRange(4, 7));
  });

  jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

  const engine = new GameEngine(theGrid, [theSnake]);
  await engine.init();
  engine.paused = false;
  engine.started = true;

  while(!allPositionsOccupied() && !engine.gameOver) {
    console.log(theGrid.toString());
    engine.doTick();
  }

  expect(engine.gameOver).toBe(false);
  expect(theSnake.isAIStuck(engine.aiStuckLimit, engine.aiStuckLimit)).toBe(false);
  expect(theSnake.stuckCounter).toBe(0);
});

test("fruit eaten should increase score", async () => {
    const theGrid = new Grid(10, 5, false, false, false, null, false);

    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);

    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(5, 2)).mockReturnValueOnce(new Position(8, 2)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.score).toBe(0);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 2, direction: Constants.Direction.RIGHT });
    
    engine.doTick();

    expect(theSnake.gameOver).toBe(false);
    expect(engine.gameOver).toBe(false);
    expect(theSnake.score).toBe(1);
});

test("gold fruit eaten should increase score by 3", async () => {
    const theGrid = new Grid(10, 5, false, false, false, null, false);

    const theSnake = new Snake(Constants.Direction.LEFT, 3, theGrid);
    
    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(4, 1)).mockReturnValueOnce(new Position(4, 3)).mockReturnValue(new Position(2, 2)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);

    // Trigger gold fruit
    jest.spyOn(GameUtils, "randRange").mockImplementation(() => 1);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.score).toBe(0);
    expect(theSnake.getHeadPosition()).toEqual({ x: 2, y: 1, direction: Constants.Direction.LEFT });
    
    engine.doTick();

    expect(theSnake.gameOver).toBe(false);
    expect(engine.gameOver).toBe(false);
    expect(theSnake.score).toBe(3);
});

test("wall should end game", async () => {
    const theGrid = new Grid(10, 5, false, true, false, null, false);

    const theSnake = new Snake(Constants.Direction.RIGHT, 3, theGrid);
    
    const mockRandom = jest.fn();
    mockRandom.mockReturnValueOnce(new Position(5, 1)).mockReturnValueOnce(new Position(5, 3)).mockReturnValue(new Position(2, 2)).mockReturnValue(new Position(1, 1));
    jest.spyOn(Grid.prototype, "getRandomPosition").mockImplementation(mockRandom);
    
    const engine = new GameEngine(theGrid, [theSnake]);
    await engine.init();
    engine.paused = false;
    engine.started = true;

    expect(theSnake.errorInit).toBe(false);
    expect(theSnake.score).toBe(0);
    expect(theSnake.getHeadPosition()).toEqual({ x: 7, y: 1, direction: Constants.Direction.RIGHT });
    
    for(let i = 0; i < 2; i++) {
      engine.doTick();
    }

    expect(theSnake.gameOver).toBe(true);
    expect(engine.gameOver).toBe(true);
    expect(theSnake.score).toBe(0);
});