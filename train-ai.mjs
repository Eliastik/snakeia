import Grid from "./src/engine/Grid.js";
import Constants from "./src/engine/Constants.js";
import Snake from "./src/engine/Snake.js";
import GameEngine from "./src/engine/GameEngine.js";
import SnakeAIUltra from "./src/engine/ai/SnakeAIUltra.js";
import cliProgress from "cli-progress";
import fs from "fs";
import process from "process";

// import tf from "@tensorflow/tfjs-node";
// Uncomment to enable GPU, and comment above import
import tf from "@tensorflow/tfjs-node-gpu";

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

// Settings
const EPISODES_TYPES            = ["DEFAULT"];
// OR:
// const EPISODES_TYPES         = ["DEFAULT", "BORDER_WALLS", "RANDOM_WALLS", "OPPONENTS", "MAZE"];
const NUM_EPISODES_PER_TYPE     = 5;
const MAX_EPISODES              = "auto"; // number OR "auto"
const TRAIN_EVERY               = 15;
const MAX_TICKS                 = 1000;
const INITAL_GRID_WIDTH         = 5;
const INITAL_GRID_HEIGHT        = 5;
const GRID_INCREASE_INCREMENT   = 5;
const ENABLE_TENSORBOARD_LOGS   = true;
const AI_LEVEL_OPPONENTS        = Constants.AiLevel.DEFAULT;
const NUMBER_OPPONENTS          = 5;
const TRAINING_SEED             = 1;
const GRID_SEED                 = 2;
const GAME_SEED                 = 3;
const MODEL_SAVE_DIRECTORY      = `models/${timestamp}`;
const SAVE_CHECKPOINT_MODELS    = true;
const EXPORT_MEMORY             = true; // Export memory
// Path to a model to load before beginning training (for fine tuning)
// Example: file://models/2025-06-29T20-08-14-389Z/5x5_RANDOM_WALLS
const LOAD_MODEL_PATH           = null;
// End of settings

// Setup and run training
const tensorboardSummaryWriter = tf.node.summaryFileWriter("./models/logs");

const multiBar = new cliProgress.MultiBar({
  format: "Training |{bar}| {percentage}% | ETA: {eta_formatted} | Elapsed time: {duration_formatted} | Episode {value}/{total}",
  hideCursor: false,
  barCompleteChar: "\u2588",
  barIncompleteChar: "\u2591",
  clearOnComplete: false,
  stopOnComplete: true,
  forceRedraw: true
});

const theSnakeAI = new SnakeAIUltra(true, LOAD_MODEL_PATH, TRAINING_SEED, {
  log: (text) => multiBar.log(text),
  info: (text) => multiBar.log(text),
  warn: (text) => multiBar.log(`[WARNING] ${text}`),
  error: (text) => multiBar.log(`[ERROR] ${text}`)
});

await theSnakeAI.setup(ENABLE_TENSORBOARD_LOGS ? tensorboardSummaryWriter : null);

const currentMaxEpisodes = getMaxEpisodesCount();

const progressBar = multiBar.create(currentMaxEpisodes, 0);

let totalScore = 0;
let totalReward = 0;

let currentGridSeed = GRID_SEED;
let currentGameSeed = GAME_SEED;
let currentGridWidth = INITAL_GRID_WIDTH;
let currentGridHeight = INITAL_GRID_HEIGHT;

function getMaxEpisodesCount() {
  if(MAX_EPISODES === "auto") {
    const staticTypesCount = EPISODES_TYPES.filter(t => t !== "INCREASE_GRID_SIZE").length;
    const hasIncreaseGridSize = EPISODES_TYPES.find(type => type === "INCREASE_GRID_SIZE");

    let gridSteps = 1;

    if(hasIncreaseGridSize) {
      const gridRangeW = Math.ceil((theSnakeAI.modelWidth - INITAL_GRID_WIDTH) / GRID_INCREASE_INCREMENT);
      const gridRangeH = Math.ceil((theSnakeAI.modelHeight - INITAL_GRID_HEIGHT) / GRID_INCREASE_INCREMENT);

      gridSteps = Math.max(gridRangeW, gridRangeH) + 1;
    }

    return gridSteps * staticTypesCount * NUM_EPISODES_PER_TYPE;
  }

  return MAX_EPISODES;
}

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

  if(opponents) {
    for(let i = 0; i < NUMBER_OPPONENTS; i++) {
      const theOpponentSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, AI_LEVEL_OPPONENTS, false, `TheOpponentAI${i}`, null);
      theSnakes.push(theOpponentSnake);
    }
  }

  const gameEngine = new GameEngine(theGrid, theSnakes, null, null, null, null, null, true);

  await gameEngine.init();
  gameEngine.paused = false;

  let tick = 0;

  theSnakeAI.beginEpisode();

  while(!gameEngine.gameFinished && !gameEngine.gameOver && !theSnake.gameOver && tick <= MAX_TICKS) {
    const currentReward = await executeTick(theSnake, gameEngine, tick);

    currentTotalReward += currentReward;
    totalReward += currentReward;

    tick++;
  }

  await theSnakeAI.train();

  multiBar.log(`Game n°${episode} finished - Episode type: ${currentEpisodeType} - Score: ${theSnake.score} - Epsilon: ${theSnakeAI.epsilon.toFixed(3)} - Grid size: ${currentGridWidth} x ${currentGridHeight} - Random walls: ${randomWalls} - Border walls: ${borderWalls} - Maze: ${maze} - Opponents: ${opponents}\n`);

  // Save the score into the Tensorflow logs
  if(ENABLE_TENSORBOARD_LOGS) {
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

  const done = gameEngine.gameFinished || gameEngine.gameOver || theSnake.gameOver || currentTick + 1 >= MAX_TICKS;
  const currentReward = theSnakeAI.calculateReward(theSnake, currentState, done);

  await theSnakeAI.step(theSnake, currentState, done);

  if(currentTick % TRAIN_EVERY === 0) {
    await theSnakeAI.train();

    if(ENABLE_TENSORBOARD_LOGS) {
      tensorboardSummaryWriter.scalar("reward", currentReward, theSnakeAI.currentEpoch);
      tensorboardSummaryWriter.scalar("qValue", theSnakeAI.currentQValue, theSnakeAI.currentEpoch);
    }
  }

  return currentReward;
}

async function saveModel(fullPath) {
  multiBar.log(`Saving model to ${fullPath}...\n`);
  multiBar.update();

  theSnakeAI.synchronizeTargetNetwork();

  await theSnakeAI.mainModel.save(`file://${fullPath}`);

  multiBar.log(`Model saved to ${fullPath} directory\n`);
  multiBar.update();
}

async function saveMetadata(fullPath) {
  const metadataJSON = JSON.stringify(await theSnakeAI.exportMetadata(), null, 0);

  fs.writeFileSync(`${fullPath}/metadata.json`, metadataJSON);

  multiBar.log(`Metadata saved to ${fullPath} directory\n`);
  multiBar.update();
}

async function saveMemory(fullPath) {
  const checkpointJSON = JSON.stringify(await theSnakeAI.exportMemory(), null, 0);

  fs.writeFileSync(`${fullPath}/memory.json`, checkpointJSON);

  multiBar.log(`Memory saved to ${fullPath} directory\n`);
  multiBar.update();
}

async function saveState(subDirectory = "") {
  const fullPath = `${MODEL_SAVE_DIRECTORY}/${subDirectory}`;

  fs.mkdirSync(fullPath, { recursive: true });

  // Synchronize target model with main model when the training is finished
  await saveModel(fullPath);

  await saveMetadata(fullPath);

  if(EXPORT_MEMORY) {
    await saveMemory(fullPath);
  }
}

function getNextEpisodeType(currentEpisodeType) {
  const nextEpisodeTypeIndex = (EPISODES_TYPES.indexOf(currentEpisodeType) + 1) % EPISODES_TYPES.length;
  return EPISODES_TYPES[nextEpisodeTypeIndex];
}

async function train() {
  let currentEpisodeType = EPISODES_TYPES[0];
  let currentEpisodeNumber = 1;

  while(currentEpisodeNumber <= currentMaxEpisodes) {
    const startTime = performance.now();

    let currentEpisodeTypeScore = 0;
    let currentEpisodeTypeReward = 0;

    for(let episode = 1; episode <= NUM_EPISODES_PER_TYPE; episode++) {
      if(currentEpisodeType === "INCREASE_GRID_SIZE") {
        currentGridWidth = Math.min(theSnakeAI.modelWidth, currentGridWidth + GRID_INCREASE_INCREMENT);
        currentGridHeight = Math.min(theSnakeAI.modelHeight, currentGridHeight + GRID_INCREASE_INCREMENT);

        currentEpisodeType = getNextEpisodeType(currentEpisodeType);
      }
      
      theSnakeAI.changeEnvironment(`${currentGridWidth}x${currentGridHeight}_${currentEpisodeType}`);

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
    
      progressBar.increment();
      multiBar.update();

      currentEpisodeNumber++;
    }

    multiBar.log(`Episode type ${currentEpisodeType} finished! Average score: ${currentEpisodeTypeScore / currentMaxEpisodes} - Average reward: ${currentEpisodeTypeReward / currentMaxEpisodes} - Time: ${performance.now() - startTime} ms\n`);
    multiBar.update();

    // Reset the epsilon
    theSnakeAI.epsilonMax = 0.75;
    theSnakeAI.epsilon = 0.75;

    // Save the intermediate model
    if(SAVE_CHECKPOINT_MODELS) {
      await saveState(theSnakeAI.currentEnv, true);
    }

    currentEpisodeType = getNextEpisodeType(currentEpisodeType);
  }
}

const trainStartTime = performance.now();

await train();

multiBar.log(`Training finished! Average score: ${totalScore / currentMaxEpisodes} - Average reward: ${totalReward / currentMaxEpisodes} - Time: ${performance.now() - trainStartTime} ms\n`);
multiBar.update();

await saveState();

progressBar.stop();
multiBar.stop();

process.exit();