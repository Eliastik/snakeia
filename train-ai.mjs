import Grid from "./src/engine/Grid.js";
import Constants from "./src/engine/Constants.js";
import Snake from "./src/engine/Snake.js";
import GameEngine from "./src/engine/GameEngine.js";
import SnakeAIUltra from "./src/engine/ai/SnakeAIUltra.js";
import fs from "fs";

// import tf from "@tensorflow/tfjs-node";
// Uncomment to enable GPU, and comment above import
import tf from "@tensorflow/tfjs-node-gpu";

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

// Settings
const NUM_EPISODES              = 30000;
const TRAIN_EVERY               = 10;
const MAX_TICKS                 = 500;
const INITAL_GRID_WIDTH         = 10;
const INITAL_GRID_HEIGHT        = 10;
const SAVE_CHECKPOINT_MODELS    = true;
const ENABLE_TENSORBOARD_LOGS   = true;
const INCREASE_GRID_SIZE_EACH   = -1; // Increase grid size each X episodes. -1 to disable
const EPISODES_TYPES            = ["DEFAULT", "BORDER_WALLS", "RANDOM_WALLS"];
// OR:
// const EPISODES_TYPES         = ["DEFAULT", "BORDER_WALLS", "RANDOM_WALLS", "OPPONENTS", "MAZE"];
const AI_LEVEL_OPPONENTS        = Constants.AiLevel.DEFAULT;
const NUMBER_OPPONENTS          = 5;
const TRAINING_SEED             = 1;
const GRID_SEED                 = 2;
const GAME_SEED                 = 3;
const MODEL_SAVE_DIRECTORY      = `models/${timestamp}`;
// End of settings

// Setup and run training
const tensorboardSummaryWriter = tf.node.summaryFileWriter("./models/logs");
const theSnakeAI = new SnakeAIUltra(true, null, TRAINING_SEED);
await theSnakeAI.setup(ENABLE_TENSORBOARD_LOGS ? tensorboardSummaryWriter : null);

let totalScore = 0;
let totalReward = 0;

let currentGridSeed = GRID_SEED;
let currentGameSeed = GAME_SEED;
let currentGridWidth = INITAL_GRID_WIDTH;
let currentGridHeight = INITAL_GRID_HEIGHT;

async function executeTrainingEpisode(currentEpisodeType, episode) {
  const randomWalls = currentEpisodeType === "RANDOM_WALLS";
  const borderWalls = currentEpisodeType === "BORDER_WALLS";
  const maze = currentEpisodeType === "MAZE";
  const opponents = currentEpisodeType === "OPPONENTS";

  const theGrid = new Grid(currentGridWidth, currentGridHeight, randomWalls, borderWalls, maze, null, false, currentGridSeed, currentGameSeed);
  const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.CUSTOM, false, "TheAI", theSnakeAI);

  const theSnakes = [theSnake];

  let currentTotalScore = 0;
  let currentTotalReward = 0;

  if (opponents) {
    for (let i = 0; i < NUMBER_OPPONENTS; i++) {
      const theOpponentSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, AI_LEVEL_OPPONENTS, false, `TheOpponentAI${i}`, null);
      theSnakes.push(theOpponentSnake);
    }
  }

  const gameEngine = new GameEngine(theGrid, theSnakes);

  await gameEngine.init();
  gameEngine.paused = false;

  let tick = 0;

  while (!gameEngine.gameFinished && !gameEngine.gameOver && !theSnake.gameOver && tick <= MAX_TICKS) {
    const currentReward = await executeTick(theSnake, gameEngine, tick);

    currentTotalReward += currentReward;
    totalReward += currentReward;

    tick++;
  }

  await theSnakeAI.train();

  console.log(`Game n°${episode} finished - Episode type: ${currentEpisodeType} - Score: ${theSnake.score} - Epsilon: ${theSnakeAI.epsilon.toFixed(3)} - Grid size: ${currentGridWidth} x ${currentGridHeight} - Random walls: ${randomWalls} - Border walls: ${borderWalls} - Maze: ${maze} - Opponents: ${opponents}`);

  // Save the score into the Tensorflow logs
  if (ENABLE_TENSORBOARD_LOGS) {
    tensorboardSummaryWriter.scalar("score", theSnake.score, episode);
  }

  // Count score
  currentTotalScore += theSnake.score;
  totalScore += theSnake.score;

  return { currentTotalReward, currentTotalScore };
}

async function executeTick(theSnake, gameEngine, currentTick) {
  const currentState = theSnakeAI.getState(theSnake);

  gameEngine.doTick();

  const currentReward = theSnakeAI.calculateReward(theSnake, currentState);
  const done = gameEngine.gameFinished || gameEngine.gameOver || theSnake.gameOver || currentTick + 1 >= MAX_TICKS;

  await theSnakeAI.step(theSnake, currentState, done);

  if (currentTick % TRAIN_EVERY === 0) {
    await theSnakeAI.train();

    if (ENABLE_TENSORBOARD_LOGS) {
      tensorboardSummaryWriter.scalar("reward", currentReward, theSnakeAI.currentEpoch);
      tensorboardSummaryWriter.scalar("qValue", theSnakeAI.currentQValue, theSnakeAI.currentEpoch);
    }
  }

  return currentReward;
}

async function saveModel(subDirectory = "") {
  const fullPath = `${MODEL_SAVE_DIRECTORY}/${subDirectory}`;

  console.log(`Saving model to ${fullPath}...`);

  fs.mkdirSync(fullPath, { recursive: true });

  // Synchronize target model with main model when the training is finished
  theSnakeAI.synchronizeTargetNetwork();

  await theSnakeAI.saveModel(`file://${fullPath}`);

  console.log(`Model saved to ${fullPath} directory`);
}

async function train() {
  for (const currentEpisodeType of EPISODES_TYPES) {
    const startTime = performance.now();
    const currentMaxEpisodes = NUM_EPISODES / EPISODES_TYPES.length;

    let currentEpisodeTypeScore = 0;
    let currentEpisodeTypeReward = 0;

    for (let episode = 1; episode <= currentMaxEpisodes; episode++) {
      if (INCREASE_GRID_SIZE_EACH > -1 && episode % INCREASE_GRID_SIZE_EACH == 0) {
        currentGridWidth = Math.min(theSnakeAI.modelWidth, currentGridWidth + 5);
        currentGridHeight = Math.min(theSnakeAI.modelHeight, currentGridHeight + 5);
      }

      const { currentTotalReward, currentTotalScore } = await executeTrainingEpisode(currentEpisodeType, episode);

      currentEpisodeTypeReward += currentTotalReward;
      currentEpisodeTypeScore += currentTotalScore;

      // Increase random seed
      currentGridSeed++;
      currentGameSeed++;

      // Reduce the epsilon
      theSnakeAI.epsilon = Math.max(
        theSnakeAI.epsilonMin,
        theSnakeAI.epsilonMax - ((episode / currentMaxEpisodes) * (theSnakeAI.epsilonMax - theSnakeAI.epsilonMin))
      );
    }

    console.log(`Episode type ${currentEpisodeType} finished! Average score: ${currentEpisodeTypeScore / currentMaxEpisodes} - Average reward: ${currentEpisodeTypeReward / currentMaxEpisodes} - Time: ${performance.now() - startTime} ms`);

    // Reset the epsilon
    theSnakeAI.epsilon = 0.5;

    // Save the intermediate model
    if(SAVE_CHECKPOINT_MODELS) {
      await saveModel(currentEpisodeType);
    }
  }
}

const trainStartTime = performance.now();

await train();

console.log(`Training finished! Average score: ${totalScore / NUM_EPISODES} - Average reward: ${totalReward / NUM_EPISODES} - Time: ${performance.now() - trainStartTime} ms`);

await saveModel();