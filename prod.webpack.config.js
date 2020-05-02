const path = require("path");

const config = {
  entry: {
    SnakeIA: "./src/index.js",
    GameEngineWorker: "./src/gameEngineWorker.js"
  },
  mode: "production",
  performance: { hints: false },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
};

module.exports = config;