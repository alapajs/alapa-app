import { Router } from "alapa";
import healthRoutes from "./health/router";
const apiRoutes = new Router();

apiRoutes.use(healthRoutes);

export default apiRoutes;
