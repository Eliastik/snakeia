import fs from "fs";
import process from "process";
import { once } from "events";
import { setImmediate } from "timers/promises";
import Grid from "./src/engine/Grid.js";
import Constants from "./src/engine/Constants.js";
import Snake from "./src/engine/Snake.js";
import GameEngine from "./src/engine/GameEngine.js";
import SnakeAIUltra from "./src/engine/ai/SnakeAIUltra.js";
import cliProgress from "cli-progress";
import { encode, decodeAsync } from "@msgpack/msgpack";

// import tf from "@tensorflow/tfjs-node";
// Uncomment to enable GPU, and comment above import
import tf from "@tensorflow/tfjs-node-gpu";

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

// Settings
const EPISODES_TYPES            = ["DEFAULT", "INCREASE_GRID_SIZE"];
// OR:
// const EPISODES_TYPES         = ["DEFAULT", "BORDER_WALLS", "RANDOM_WALLS", "OPPONENTS", "MAZE", "INCREASE_GRID_SIZE"];
const NUM_EPISODES_PER_TYPE     = 1000;
const MAX_EPISODES              = "auto"; // number OR "auto"
const TRAIN_EVERY               = 30;
const MAX_TICKS                 = 1000;
const INITAL_GRID_WIDTH         = 5;
const INITAL_GRID_HEIGHT        = 5;
const GRID_INCREASE_INCREMENT   = 5;
const MAX_GRID_WIDTH            = 25;
const MAX_GRID_HEIGHT           = 25;
const ENABLE_TENSORBOARD_LOGS   = true;
const AI_LEVEL_OPPONENTS        = Constants.AiLevel.DEFAULT;
const NUMBER_OPPONENTS          = 5;
const TRAINING_SEED             = 1;
const GRID_SEED                 = 2;
const GAME_SEED                 = 3;
const MODEL_SAVE_DIRECTORY      = `models/${timestamp}`;
const SAVE_CHECKPOINT_MODELS    = true;
const EXPORT_MEMORY             = false;
const LOAD_MODEL_PATH           = null;
const LOAD_HYPERPARAMETERS      = false;
const LOAD_MEMORY               = false;
const NUM_PARALLEL_ENVS         = 3;
// End of settings

const tensorboardSummaryWriter = tf.node.summaryFileWriter("./models/logs");

class MultiBarCustom extends cliProgress.MultiBar {
  log(text) {
    super.log(`[${new Date().toISOString()}] ${text}`);
    this.update();
  }
}

const multiBar = new MultiBarCustom({
  format: "{task} |{bar}| {percentage}% | ETA: {eta_formatted} | Elapsed time: {duration_formatted} | {step} {value}/{total}",
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
}, {
  readJSON: async (location) => {
    const binPath = location.replace(".json", ".bin");

    if(fs.existsSync(binPath)) {
      const stream = fs.createReadStream(binPath, {
        highWaterMark: 64 * 1024 * 1024
      });

      return await decodeAsync(stream);
    }

    const stream = fs.createReadStream(location, { encoding: "utf8" });

    let data = "";
    
    for await(const chunk of stream) {
      data += chunk;
    }

    return JSON.parse(data);
  }
}, LOAD_HYPERPARAMETERS, LOAD_MEMORY);

const currentMaxEpisodes = getMaxEpisodesCount();
const progressBar = multiBar.create(currentMaxEpisodes, 0, {
  task: "Training",
  step: "Episode"
});

await theSnakeAI.setup(ENABLE_TENSORBOARD_LOGS ? tensorboardSummaryWriter : null);
multiBar.update();

let totalScore = 0;
let totalReward = 0;

let currentGridSeed = GRID_SEED;
let currentGameSeed = GAME_SEED;
let currentGridWidth = INITAL_GRID_WIDTH;
let currentGridHeight = INITAL_GRID_HEIGHT;

// Counter for unique instance IDs across all envs and episodes
let instanceCounter = 0;

function getMaxEpisodesCount() {
  if(MAX_EPISODES === "auto") {
    const staticTypesCount = EPISODES_TYPES.filter(t => t !== "INCREASE_GRID_SIZE").length;
    const hasIncreaseGridSize = EPISODES_TYPES.find(type => type === "INCREASE_GRID_SIZE");

    let gridSteps = 1;

    if(hasIncreaseGridSize) {
      const gridRangeW = Math.ceil((Math.min(MAX_GRID_WIDTH, theSnakeAI.modelWidth) - INITAL_GRID_WIDTH) / GRID_INCREASE_INCREMENT);
      const gridRangeH = Math.ceil((Math.min(MAX_GRID_HEIGHT, theSnakeAI.modelHeight) - INITAL_GRID_HEIGHT) / GRID_INCREASE_INCREMENT);
      gridSteps = Math.max(gridRangeW, gridRangeH) + 1;
    }

    return gridSteps * staticTypesCount * NUM_EPISODES_PER_TYPE;
  }

  return MAX_EPISODES;
}

function createEnv(episodeType, seedOffset = 0) {
  const randomWalls = episodeType === "RANDOM_WALLS";
  const borderWalls = episodeType === "BORDER_WALLS";
  const maze = episodeType === "MAZE";
  const opponents = episodeType === "OPPONENTS";

  const theGrid = new Grid(
    currentGridWidth, currentGridHeight,
    randomWalls, borderWalls, maze,
    null, false,
    currentGridSeed + seedOffset,
    currentGameSeed + seedOffset
  );

  const theSnake = new Snake(
    Constants.Direction.BOTTOM, 3, theGrid,
    Constants.PlayerType.AI, Constants.AiLevel.CUSTOM,
    false, "TheAI", theSnakeAI
  );

  const theSnakes = [theSnake];

  if(opponents) {
    for(let i = 0; i < NUMBER_OPPONENTS; i++) {
      theSnakes.push(new Snake(
        Constants.Direction.BOTTOM, 3, theGrid,
        Constants.PlayerType.AI, AI_LEVEL_OPPONENTS,
        false, `TheOpponentAI${i}`, null
      ));
    }
  }

  return {
    snake: theSnake,
    theSnakes,
    gameEngine: null,
    episodeType,
    envId: `${currentGridWidth}x${currentGridHeight}_${episodeType}`,
    instanceId: `${currentGridWidth}x${currentGridHeight}_${episodeType}_${instanceCounter++}`
  };
}

async function executeTickBatch(envs, currentTick) {
  const rawStates = envs.map(env => theSnakeAI.getStateRaw(env.snake));

  const currentStates = envs.map(env => theSnakeAI.getState(env.snake, env.instanceId));

  const actions = theSnakeAI.aiBatch(
    envs.map(env => env.snake),
    envs.map(env => env.instanceId),
    currentStates
  );

  envs.forEach((env, i) => {
    env.snake.lastAction = actions[i];
    env.snake._precomputedAction = actions[i];
  });

  envs.forEach(env => {
    const scoreBefore = env.snake.score;

    env.gameEngine.doTick();

    if(env.snake.score > scoreBefore) {
      theSnakeAI.resetFrameStack(env.instanceId);
    }
  });

  let batchTotalReward = 0;

  for(let i = 0; i < envs.length; i++) {
    const { snake, gameEngine } = envs[i];
    const done = gameEngine.gameFinished || gameEngine.gameOver || snake.gameOver || currentTick + 1 >= MAX_TICKS;

    const reward = theSnakeAI.calculateReward(snake, rawStates[i], done);
    batchTotalReward += reward;

    theSnakeAI.step(snake, currentStates[i], done, reward, actions[i], envs[i].instanceId);
  }

  if(currentTick % TRAIN_EVERY === 0) {
    await theSnakeAI.train();

    if(ENABLE_TENSORBOARD_LOGS) {
      tensorboardSummaryWriter.scalar("reward", batchTotalReward / envs.length, theSnakeAI.currentEpoch);
      tensorboardSummaryWriter.scalar("qValue", theSnakeAI.currentQValue, theSnakeAI.currentEpoch);
    }
  }

  return batchTotalReward;
}

async function executeTrainingEpisode(currentEpisodeType, episode) {
  const envs = await Promise.all(
    Array.from({ length: NUM_PARALLEL_ENVS }, async (_, i) => {
      const env = createEnv(currentEpisodeType, i);

      const gameEngine = new GameEngine(
        env.theSnakes[0].grid, env.theSnakes,
        null, null, null, null, null, true, null
      );

      await gameEngine.init();
      gameEngine.paused = false;
      env.gameEngine = gameEngine;

      theSnakeAI.changeEnvironment(env.envId, theSnakeAI.extractEnvFeaturesFromGrid(env.theSnakes[0].grid));

      return env;
    })
  );

  envs.forEach(env => theSnakeAI.beginEpisode(env.instanceId));

  let currentTotalReward = 0;
  let tick = 0;

  while(tick <= MAX_TICKS) {
    const activeEnvs = envs.filter(env =>
      !env.gameEngine.gameFinished &&
      !env.gameEngine.gameOver &&
      !env.snake.gameOver
    );

    if(activeEnvs.length === 0) break;

    const tickReward = await executeTickBatch(activeEnvs, tick);
    currentTotalReward += tickReward;
    totalReward += tickReward;

    tick++;
  }

  // Final train at end of episode
  await theSnakeAI.train();

  const avgScore = envs.reduce((sum, env) => sum + env.snake.score, 0) / envs.length;
  const maxScore = Math.max(...envs.map(env => env.snake.score));

  multiBar.log(
    `Game n°${episode} finished - Type: ${currentEpisodeType} - ` +
    `Avg score: ${avgScore.toFixed(2)} - Max score: ${maxScore} - ` +
    `Epsilon: ${theSnakeAI.epsilon.toFixed(3)} - ` +
    `Grid: ${currentGridWidth}x${currentGridHeight} - ` +
    `Parallel envs: ${NUM_PARALLEL_ENVS}\n`
  );

  if(ENABLE_TENSORBOARD_LOGS) {
    tensorboardSummaryWriter.scalar("score", avgScore, episode);
    tensorboardSummaryWriter.scalar("score_max", maxScore, episode);
  }

  totalScore += avgScore;

  // Increment seeds by NUM_PARALLEL_ENVS to avoid reusing the same seeds
  currentGridSeed += NUM_PARALLEL_ENVS;
  currentGameSeed += NUM_PARALLEL_ENVS;

  return { currentTotalReward, currentTotalScore: avgScore };
}

async function saveModel(fullPath, isFinal = false) {
  multiBar.log(`Saving model to ${fullPath}...\n`);

  theSnakeAI.synchronizeTargetNetwork(true);

  if(theSnakeAI.targetModel) {
    theSnakeAI.targetModel.dispose();
    theSnakeAI.targetModel = null;
  }

  await theSnakeAI.mainModel.save(`file://${fullPath}`);

  if(theSnakeAI.enableDoubleDQN && !isFinal) {
    theSnakeAI.targetModel = theSnakeAI.createModel();
    theSnakeAI.targetModel.setWeights(theSnakeAI.mainModel.getWeights());
  }

  multiBar.log(`Model saved to ${fullPath} directory\n`);
}

function saveMetadata(fullPath) {
  multiBar.log(`Saving metadata to ${fullPath} directory...\n`);

  const metadataJSON = JSON.stringify(theSnakeAI.exportMetadata(), null, 0);
  fs.writeFileSync(`${fullPath}/metadata.json`, metadataJSON);

  multiBar.log(`Metadata saved to ${fullPath} directory\n`);
}

async function saveMemory(fullPath) {
  const startTime = Date.now();

  multiBar.log("Exporting memory...\n");
  const exportedMemory = theSnakeAI.exportMemory();

  multiBar.log(`Encoding memory (${theSnakeAI.memory.size()} entries)...\n`);
  const encodedMemory = encode(exportedMemory);

  const totalBytes = encodedMemory.length;
  const totalMB = totalBytes / 1024 / 1024;

  multiBar.log(`Encoded size: ${totalMB.toFixed(2)} MB\n`);

  const filePath = `${fullPath}/memory.bin`;

  const CHUNK_SIZE = 256 * 1024 * 1024;
  const YIELD_EVERY = 16;

  const stream = fs.createWriteStream(filePath, {
    highWaterMark: 512 * 1024 * 1024
  });

  stream.on("error", err => multiBar.log(`[ERROR] Save stream error: ${err}\n`));

  let written = 0;
  let chunkIndex = 0;

  const saveBar = multiBar.create(Math.round((totalBytes / 1024 / 1024) * 100) / 100, 0, {
    task: "Saving memory",
    step: "MB written:"
  });
  multiBar.update();

  for(let offset = 0; offset < totalBytes; offset += CHUNK_SIZE) {
    const chunk = encodedMemory.subarray(offset, offset + CHUNK_SIZE);

    written += chunk.length;
    chunkIndex++;

    if(!stream.write(chunk)) {
      await once(stream, "drain");
    }

    saveBar.update(Math.round((written / 1024 / 1024) * 100) / 100);
    multiBar.update();

    if(chunkIndex % YIELD_EVERY === 0) {
      await new Promise(r => setImmediate(r));
    }
  }

  stream.end();

  await once(stream, "finish");

  stream.close();
  saveBar.stop();
  multiBar.remove(saveBar);

  const duration = (Date.now() - startTime) / 1000;
  const speed = totalMB / duration;

  multiBar.log(
    `Memory saved (${totalMB.toFixed(2)} MB) in ${duration.toFixed(2)}s (${speed.toFixed(0)} MB/s)\n`
  );
}

async function saveState(isFinal = false, subDirectory = "") {
  const fullPath = `${MODEL_SAVE_DIRECTORY}/${subDirectory}`;

  fs.mkdirSync(fullPath, { recursive: true });

  await saveModel(fullPath, isFinal);

  saveMetadata(fullPath);

  if(EXPORT_MEMORY) await saveMemory(fullPath);
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
        currentGridWidth = Math.min(Math.min(MAX_GRID_WIDTH, theSnakeAI.modelWidth), currentGridWidth + GRID_INCREASE_INCREMENT);
        currentGridHeight = Math.min(Math.min(MAX_GRID_HEIGHT, theSnakeAI.modelHeight), currentGridHeight + GRID_INCREASE_INCREMENT);
        currentEpisodeType = getNextEpisodeType(currentEpisodeType);
      }

      const { currentTotalReward, currentTotalScore } = await executeTrainingEpisode(currentEpisodeType, episode);

      currentEpisodeTypeReward += currentTotalReward;
      currentEpisodeTypeScore += currentTotalScore;

      // Reduce epsilon
      theSnakeAI.epsilon = Math.max(
        theSnakeAI.epsilonMin,
        theSnakeAI.epsilonMax - ((episode / currentMaxEpisodes) * (theSnakeAI.epsilonMax - theSnakeAI.epsilonMin))
      );

      progressBar.increment();
      multiBar.update();

      currentEpisodeNumber++;
    }

    multiBar.log(
      `Episode type ${currentEpisodeType} finished! ` +
      `Average score: ${currentEpisodeTypeScore / NUM_EPISODES_PER_TYPE} - ` +
      `Average reward: ${currentEpisodeTypeReward / NUM_EPISODES_PER_TYPE} - ` +
      `Time: ${performance.now() - startTime} ms\n`
    );

    // Reset epsilon for next episode type
    theSnakeAI.epsilonMax = 0.75;
    theSnakeAI.epsilon = 0.75;

    if(SAVE_CHECKPOINT_MODELS && currentEpisodeNumber <= currentMaxEpisodes) {
      await saveState(false, theSnakeAI.currentEnv);
    }

    currentEpisodeType = getNextEpisodeType(currentEpisodeType);
  }
}

const trainStartTime = performance.now();

await train();

multiBar.log(
  "Training finished! " +
  `Average score: ${totalScore / currentMaxEpisodes} - ` +
  `Average reward: ${totalReward / currentMaxEpisodes} - ` +
  `Time: ${performance.now() - trainStartTime} ms\n`
);

await saveState(true);

progressBar.stop();
multiBar.stop();

process.exit();