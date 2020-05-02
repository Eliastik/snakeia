const path = require("path");

const config = {
  entry: {
    SnakeIA: "./src/index.js",
    GameEngineWorker: "./src/gameEngineWorker.js"
  },
  mode: "development",
  performance: { hints: false },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  }
};

module.exports = config;