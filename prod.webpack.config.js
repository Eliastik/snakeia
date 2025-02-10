const path         = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

const estlintOptions = {
  overrideConfigFile: "eslint.config.mjs",
  configType: "flat"
};

const config = [
  {
    entry: "./src/index.js",
    mode: "production",
    performance: { hints: false },
    output: {
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, "dist"),
      filename: "SnakeIA.js",
      library: "SnakeIA",
      libraryTarget: "umd",
      globalObject: "typeof self !== \"undefined\" ? self : this"
    },
    plugins: [new ESLintPlugin(estlintOptions)],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|libs)/,
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
  },
  {
    entry: "./src/node-index.js",
    mode: "production",
    performance: { hints: false },
    output: {
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, "dist"),
      filename: "SnakeIA-node.js",
      library: "SnakeIA",
      libraryTarget: "umd",
      globalObject: "typeof self !== \"undefined\" ? self : this"
    },
    plugins: [new ESLintPlugin(estlintOptions)],
    target: "node",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|libs)/,
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
  },
  {
    entry: "./src/engine/GameEngineWorker.js",
    mode: "production",
    performance: { hints: false },
    output: {
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, "dist"),
      filename: "GameEngineWorker.js"
    },
    plugins: [new ESLintPlugin(estlintOptions)],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|libs)/,
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
  }];

module.exports = config;