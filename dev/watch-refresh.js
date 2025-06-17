const { refreshBrowsers, Logger } = require("alapa");
const chokidar = require("chokidar");
const viewDirect = process.env.VIEW_DIR || "views";
const assetsDirect = process.env.STATIC_DIR || "static";

const frontendPaths = [viewDirect, assetsDirect];
const watcher = chokidar.watch(frontendPaths, {
  //   ignored: /(^|[\/\\])\../,
  persistent: true,
});

// watcher.on("ready", () => {
//   const watchedDirs = watcher.getWatched();
//   console.log("🕵️ Chokidar is watching the following directories:");
//   for (const dir in watchedDirs) {
//     console.log("📁", path.resolve(dir));
//   }
// });

watcher.on("change", (event, filePath) => {
  refreshBrowsers();
});

watcher.on("error", (error) => {
  Logger.error("❌ Chokidar error:", error);
});
