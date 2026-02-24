import { Router } from "alapa";
import { HealthController } from "./Controller";
const healthRoutes = new Router();

healthRoutes.controller("health", HealthController);

export default healthRoutes;
