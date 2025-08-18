import { ServerConfiguration } from "alapa";
import routes from "../apps/routes";
import apiRoute from "../api/routes";
const getTrustedProxies = () => {
  const trustedProxies = process.env.TRUSTED_PROXIES;
  if (!trustedProxies) return undefined;
  if (trustedProxies === "true") return true;
  if (trustedProxies === "false") return false;
  if (trustedProxies.trim() === "") return undefined;
  return trustedProxies.split(",").map((proxy) => proxy.trim());
};

// Server configuration
export const serverConfig: ServerConfiguration = {
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || "127.0.0.1",
  routes: routes,
  apiRoutes: apiRoute,
  trustedProxies: getTrustedProxies(),
  compression: true,
  https: {
    enabled: false,
    keyPath: "",
    certPath: "",
    caPath: "",
  },
};
