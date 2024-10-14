import { Router } from "alapa";
import indexRoute from "./index";
const routes = new Router();

routes.use(indexRoute).name("home");

export default routes;
