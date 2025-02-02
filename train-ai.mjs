import Grid from "./src/engine/Grid.js";
import Constants from "./src/engine/Constants.js";
import Snake from "./src/engine/Snake.js";
import GameEngine from "./src/engine/GameEngine.js";
import SnakeAIUltra from "./src/engine/ai/SnakeAIUltra.js";

// import "@tensorflow/tfjs-node";
import "@tensorflow/tfjs-node-gpu"; // Uncomment to enable GPU

const NUM_EPISODES = 5000;
const TRAIN_EVERY = 10;
const MAX_TICKS = 500;

const theSnakeAI = new SnakeAIUltra(true);
const startTime = performance.now();

let totalScore = 0;
let totalReward = 0;

for(let episode = 1; episode <= NUM_EPISODES; episode++) {
  const theGrid = new Grid(10, 10, false, false, false, null, false, 1, 2);
  const theSnake = new Snake(Constants.Direction.BOTTOM, 3, theGrid, Constants.PlayerType.AI, Constants.AiLevel.CUSTOM, false, "TheAI", theSnakeAI);
  const gameEngine = new GameEngine(theGrid, [theSnake]);

  gameEngine.init();
  gameEngine.paused = false;

  let tick = 0;

  while(!gameEngine.gameFinished && !gameEngine.gameOver && tick <= MAX_TICKS) {
    const currentState = theSnakeAI.getState(theSnake);

    await gameEngine.doTick();

    await theSnakeAI.step(theSnake, currentState);

    if(tick % TRAIN_EVERY === 0) {
      await theSnakeAI.train();
    }

    tick++;

    totalReward += theSnakeAI.calculateReward(theSnake, currentState);
  }

  await theSnakeAI.train();

  console.log(`Game n°${episode} finished - Score: ${theSnake.score}`);

  totalScore += theSnake.score;

  if(theSnakeAI.epsilon > theSnakeAI.epsilonMin) {
    theSnakeAI.epsilon *= theSnakeAI.epsilonDecay;
  }
}

console.log(`Training finished! Average score: ${totalScore / NUM_EPISODES} - Average reward: ${totalReward / NUM_EPISODES} - Time: ${performance.now() - startTime} ms`);

console.log("Saving model...");

await theSnakeAI.model.save("file://models");

console.log("Model saved to models directory");