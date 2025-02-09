import Grid from "./src/engine/Grid.js";
import Constants from "./src/engine/Constants.js";
import Snake from "./src/engine/Snake.js";
import GameEngine from "./src/engine/GameEngine.js";
import SnakeAIUltra from "./src/engine/ai/SnakeAIUltra.js";

// import tf from "@tensorflow/tfjs-node";
// Uncomment to enable GPU, and comment above import
import tf from "@tensorflow/tfjs-node-gpu";

// Settings
const NUM_EPISODES = 10000;
const TRAIN_EVERY = 10;
const MAX_TICKS = 750;
const INITAL_GRID_WIDTH = 10;
const INITAL_GRID_HEIGHT = 10;
const EPISODES_TYPES = ["DEFAULT"];
// OR:
// const EPISODES_TYPES = ["DEFAULT", "BORDER_WALLS", "RANDOM_WALLS", "OPPONENTS", "MAZE", "INCREASE_SIZE"];
const CHANGE_TYPES_EACH_X_EPISODES = 500;
const AI_LEVEL_OPPONENTS = Constants.AiLevel.DEFAULT;
const NUMBER_OPPONENTS = 5;
const ENABLE_TENSORBOARD_LOGS = true;

// Setup and run training
const tensorboardSummaryWriter = tf.node.summaryFileWriter("./models/logs");
const theSnakeAI = new SnakeAIUltra(true);
await theSnakeAI.setup(ENABLE_TENSORBOARD_LOGS ? tensorboardSummaryWriter : null);

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

    const currentReward = theSnakeAI.calculateReward(theSnake, currentState);

    await theSnakeAI.step(theSnake, currentState);

    if(tick % TRAIN_EVERY === 0) {
      await theSnakeAI.train();

      if(ENABLE_TENSORBOARD_LOGS) {
        tensorboardSummaryWriter.scalar("reward", currentReward, theSnakeAI.currentEpoch);
        tensorboardSummaryWriter.scalar("qValue", theSnakeAI.currentQValue, theSnakeAI.currentEpoch);
      }
    }

    tick++;

    totalReward += currentReward;
  }

  await theSnakeAI.train();

  console.log(`Game n°${episode} finished - Episode type: ${currentEpisodeType} - Score: ${theSnake.score} - Grid size: ${currentGridWidth} x ${currentGridHeight} - Random walls: ${randomWalls} - Border walls: ${borderWalls} - Maze: ${maze} - Opponents: ${opponents}`);

  if(ENABLE_TENSORBOARD_LOGS) {
    tensorboardSummaryWriter.scalar("score", theSnake.score, episode);
  }

  // Change games conditions each X episodes
  if(episode % CHANGE_TYPES_EACH_X_EPISODES === 0) {
    currentEpisodeTypeIndex++;
    currentEpisodeType = EPISODES_TYPES[currentEpisodeTypeIndex % EPISODES_TYPES.length];

    if(currentEpisodeType === "INCREASE_SIZE") {
      currentGridWidth = Math.min(theSnakeAI.modelWidth, currentGridWidth + 5);
      currentGridHeight = Math.min(theSnakeAI.modelHeight, currentGridHeight + 5);
      currentEpisodeType = "DEFAULT";
    }
  }

  totalScore += theSnake.score;

  currentGridSeed++;
  currentGameSeed++;

  // Reduce the epsilon
  theSnakeAI.epsilon = Math.max(
    theSnakeAI.epsilonMin,
    theSnakeAI.epsilonMax - ((episode / NUM_EPISODES) * (theSnakeAI.epsilonMax - theSnakeAI.epsilonMin))
  );
}

console.log(`Training finished! Average score: ${totalScore / NUM_EPISODES} - Average reward: ${totalReward / NUM_EPISODES} - Time: ${performance.now() - startTime} ms`);

console.log("Saving model...");

// Synchronize target model with main model when the training is finished
theSnakeAI.synchronizeTargetNetwork();

await theSnakeAI.saveModel("file://models");

console.log("Model saved to models directory");