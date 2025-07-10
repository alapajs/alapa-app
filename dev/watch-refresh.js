const { refreshBrowsers, Logger } = require("alapa");
const chokidar = require("chokidar");
const { runCommand } = require("./run-command");
const viewDir = process.env.VIEW_DIR || "views";
const assetsDir = process.env.STATIC_DIR || "static";
const publicDir = process.env.PUBLIC_DIR || "public";

const frontendPaths = [viewDir, assetsDir, publicDir];

const watcher = chokidar.watch(frontendPaths, {
  //   ignored: /(^|[\/\\])\../,
  persistent: true,
});

watcher.on("change", async (filePath) => {
  if (filePath.startsWith(publicDir)) {
    generateStaticFile();
  } else {
    refreshBrowsers();
  }
});

watcher.on("error", (error) => {
  Logger.error("❌ Chokidar error:", error);
});

//Watch Public

const generateStaticFile = async () => {
  Logger.info(
    `🔄 Detected changes in '${publicDir}'. Regenerating static assets...`
  );
  try {
    await runCommand("npm run webpack");
    Logger.success("✅ Static files generated successfully.");
    refreshBrowsers(); // Optional: Live reload
  } catch (e) {
    Logger.error("❌ Failed to generate static files:", e);
  }
};
