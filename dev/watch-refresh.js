const { connectToRefreshSocket, Logger } = require("alapa");
const chokidar = require("chokidar");
const { runWebpack } = require("./webpack");
const viewDir = process.env.VIEW_DIR || "views";
const assetsDir = process.env.STATIC_DIR || "static";
const publicDir = process.env.PUBLIC_DIR || "public";

let refreshSocket = undefined;

// Since connectToRefreshSocket is a Promise, just use `.then()` directly
connectToRefreshSocket.then((socket) => {
  refreshSocket = socket;
});

const frontendPaths = [viewDir, assetsDir, publicDir];

const watcher = chokidar.watch(frontendPaths, {
  //   ignored: /(^|[\/\\])\../,
  persistent: true,
});

watcher.on("change", async (filePath) => {
  if (filePath.startsWith(publicDir)) {
    generateStaticFile();
  } else {
    refreshSocket.emit("changes");
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
    await runWebpack();
    Logger.success("✅ Static files generated successfully.");
    refreshSocket.emit("changes"); // Optional: Live reload
  } catch (e) {
    Logger.error("❌ Failed to generate static files:", e);
  }
};
