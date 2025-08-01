const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
require("dotenv").config();
const { ENV } = require("alapa/dist/shared/constant/environment");

const production = ENV == "production";
module.exports = {
  entry: "./.alapa/web/index.js", // Make sure this is correct
  output: {
    path: path.resolve(__dirname, "static", "js"),
    filename: "app.js",
  },
  mode: production ? "production" : "development", // Use development mode by default
  module: {
    rules: [
      {
        test: /\.js$/, // This applies to all .js files
        exclude: /node_modules/, // Excludes node_modules
        use: {
          loader: "babel-loader", // Use Babel loader
          options: {
            presets: ["@babel/preset-env"], // Transpile modern JS to older syntax for browser compatibility
          },
        },
      },
      {
        test: /\.scss$/, // This applies to all .scss files
        use: [
          MiniCssExtractPlugin.loader, // Extracts the CSS to a separate file
          "css-loader", // Resolves CSS imports
          "sass-loader", // Compiles SCSS to CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../../static/css/styles.css", // Output CSS file in the correct location
    }),

    new webpack.EnvironmentPlugin([
      "DEV_SERVER_PORT",
      "NODE_ENV",
      "PORT",
      "APP_URL",
      "HOST",
      "APP_NAME",
    ]),
  ],
};
