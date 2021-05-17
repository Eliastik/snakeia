module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    babelOptions: {
      configFile: "./babel.config.json",
    }
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
