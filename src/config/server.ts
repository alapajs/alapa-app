import { ServerConfiguration } from "alapa";
import routes from "../apps/routes";
import apiRoute from "../api/routes";

// Server configuration
export const serverConfig: ServerConfiguration = {
  port: 3000,
  host: "localhost",
  routes: routes,
  apiRoutes: apiRoute,
  proxy: false,
  compression: true,
  https: {
    enabled: false,
    keyPath: "",
    certPath: "",
    caPath: "",
  },
};
