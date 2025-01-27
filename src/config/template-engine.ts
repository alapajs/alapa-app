import { TemplateEngineConfiguration } from "alapa";
export const templateEngineConfig: TemplateEngineConfiguration = {
  staticFilesPath: process.env.STATIC_DIR || "static",
  viewDir: process.env.VIEW_DIR || "views",
  fileExtensions: "html",
  formatOutPutOnDev: process.env.FORMAT_OUTPUT_ON_DEV === "true",
  minifyOutputOnProd: process.env.MINIFY_OUTPUT_ON_PROD === "true",
};
