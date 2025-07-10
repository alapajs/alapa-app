const webpack = require("webpack");
const config = require("../webpack.config.js"); // adjust path if needed
const { Logger } = require("alapa");

function runWebpack() {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        return reject(err); // fatal webpack error
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        return reject(new Error(info.errors.join("\n")));
      }

      if (stats.hasWarnings()) {
        Logger.warn("⚠️ Webpack warnings:\n", info.warnings.join("\n"));
      }

      Logger.log(stats.toString({ colors: true }));
      resolve("✅ Webpack build completed successfully.");
    });
  });
}

module.exports = { runWebpack };
