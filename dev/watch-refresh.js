const { refreshBrowsers, Logger } = require("alapa");
const chokidar = require("chokidar");
const { runCommand } = require("./run-command");
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

//Watch Public

const watchPublic = chokidar.watch("public", {
  // ignored: /(^|[\/\\])\../, // Uncomment to ignore dotfiles
  persistent: true,
});

watchPublic.on("change", async (event, filePath) => {
  Logger.info("🔄 Detected changes in 'public'. Regenerating static assets...");
  try {
    await runCommand("npm run webpack");
    Logger.success("✅ Static files generated successfully.");
    refreshBrowsers(); // Optional: Live reload
  } catch (e) {
    Logger.error("❌ Failed to generate static files:", e);
  }
});

watchPublic.on("error", (error) => {
  Logger.error("❌ Chokidar error:", error);
});
