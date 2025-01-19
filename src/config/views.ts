import { ViewConfiguration } from "alapa";
export const viewConfig: ViewConfiguration = {
  staticFilesPath: process.env.STATIC_DIR || "static",
  dir: process.env.VIEW_DIR || "views",
  extensions: "html",
};
