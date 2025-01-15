import { Router } from "alapa";
import indexRoute, { TestController } from "./index";
const routes = new Router();

routes.use(indexRoute).name("home");

routes.controller("hello", TestController);

// routes.use((err:any,req:Request,res:Response,next:NextFunction)=>)

export default routes;
