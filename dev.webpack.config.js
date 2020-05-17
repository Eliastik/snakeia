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
    filename: "[name].js",
    library: "SnakeIA",
    libraryTarget: "umd"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  }
};

module.exports = config;