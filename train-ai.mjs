import Grid from "./src/engine/Grid.js";
import Constants from "./src/engine/Constants.js";
import Snake from "./src/engine/Snake.js";
import GameEngine from "./src/engine/GameEngine.js";
import SnakeAIUltra from "./src/engine/ai/SnakeAIUltra.js";

// import "@tensorflow/tfjs-node";
import "@tensorflow/tfjs-node-gpu"; // Uncomment to enable GPU

// Settings
const NUM_EPISODES = 10000;
const TRAIN_EVERY = 10;
const MAX_TICKS = 750;
const INITAL_GRID_WIDTH = 10;
const INITAL_GRID_HEIGHT = 10;
const EPISODES_TYPES = ["DEFAULT", "BORDER_WALLS", "RANDOM_WALLS", "OPPONENTS", "INCREASE_SIZE"]; // TODO add Maze training?
const CHANGE_TYPES_EACH_X_EPISODES = 150;
const AI_LEVEL_OPPONENTS = Constants.AiLevel.DEFAULT;
const NUMBER_OPPONENTS = 5;

// Setup and run training
const theSnakeAI = new SnakeAIUltra(true);
await theSnakeAI.setup();

let totalScore = 0;
let totalReward = 0;

let currentGridSeed = 1;
let currentGameSeed = 2;
let currentEpisodeTypeIndex = 0;
let currentEpisodeType = "DEFAULT";
let currentGridWidth = INITAL_GRID_WIDTH;
let currentGridHeight = INITAL_GRID_HEIGHT;

const startTime = performance.now();

for(let episode = 1; episode <= NUM_EPISODES; episode++) {
  const randomWalls = currentEpisodeType === "RANDOM_WALLS";
  const borderWalls = currentEpisodeType === "BORDER_WALLS";
  const maze = currentEpisodeType === "MAZE";
  const opponents = currentEpisodeType === "OPPONENTS";

  const theGrid = new Grid(currentGridWidth, currentGridHeight, randomWalls, borderWalls, maze, null, false, currentGridSeed, currentGameSeed);
  const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.CUSTOM, false, "TheAI", theSnakeAI);

  const theSnakes = [theSnake];

  if(opponents) {
    for(let i = 0; i < NUMBER_OPPONENTS; i++) {
      const theOpponentSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, AI_LEVEL_OPPONENTS, false, `TheOpponentAI${i}`, null);
      theSnakes.push(theOpponentSnake);
    }
  }

  const gameEngine = new GameEngine(theGrid, theSnakes);

  await gameEngine.init();
  gameEngine.paused = false;

  let tick = 0;

  while(!gameEngine.gameFinished && !gameEngine.gameOver && tick <= MAX_TICKS) {
    const currentState = theSnakeAI.getState(theSnake);

    gameEngine.doTick();

    await theSnakeAI.step(theSnake, currentState);

    if(tick % TRAIN_EVERY === 0) {
      await theSnakeAI.train();
    }

    tick++;

    totalReward += theSnakeAI.calculateReward(theSnake, currentState);
  }

  await theSnakeAI.train();

  console.log(`Game n°${episode} finished - Episode type: ${currentEpisodeType} - Score: ${theSnake.score} - Grid size: ${currentGridWidth} x ${currentGridHeight} - Random walls: ${randomWalls} - Border walls: ${borderWalls} - Maze: ${maze} - Opponents: ${opponents}`);

  // Change games conditions each X episodes
  if(episode % CHANGE_TYPES_EACH_X_EPISODES === 0) {
    currentEpisodeTypeIndex++;
    currentEpisodeType = EPISODES_TYPES[currentEpisodeTypeIndex % EPISODES_TYPES.length];

    if(currentEpisodeType === "INCREASE_SIZE") {
      currentGridWidth = Math.min(100, currentGridWidth + 5);
      currentGridHeight = Math.min(100, currentGridHeight + 5);
      currentEpisodeType = "DEFAULT";
    }
  }

  totalScore += theSnake.score;

  currentGridSeed++;
  currentGameSeed++;

  // Reduce the epsilon
  if(theSnakeAI.epsilon > theSnakeAI.epsilonMin) {
    theSnakeAI.epsilon *= theSnakeAI.epsilonDecay;
  }
}

console.log(`Training finished! Average score: ${totalScore / NUM_EPISODES} - Average reward: ${totalReward / NUM_EPISODES} - Time: ${performance.now() - startTime} ms`);

console.log("Saving model...");

await theSnakeAI.model.save("file://models");

console.log("Model saved to models directory");