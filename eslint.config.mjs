import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
    ignores: ["**/libs/*"]
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
        },

        parser: babelParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            babelOptions: {
                configFile: "./babel.config.json",
            },
        },
    },
    rules: {
        indent: ["error", 2],
        "linebreak-style": ["error", "unix"],
        quotes: ["warn", "double"],
        semi: ["error", "always"],
        "no-var": ["error"],
        "no-eval": ["error"],
        "prefer-const": ["error"],
        "no-implicit-globals": ["error"],
        "prefer-arrow-callback": ["error"],
        "no-unused-vars": ["warn"]
    }
}, {
    ignores: ["**/libs/*", "**/tests/*", "service-worker.js", "eslint.config.mjs", "**/dist/*"]
}];