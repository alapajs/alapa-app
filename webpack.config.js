const path = require("path");

module.exports = {
  entry: "./.alapa/web/index.js",
  output: {
    path: path.resolve(__dirname, "static", "js"),
    filename: "app.js",
  },
};
