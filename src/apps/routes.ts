import { Router } from "alapa";
import indexRoute from "./index";
const routes = new Router();

routes.use(indexRoute).name("home");

// routes.use((err:any,req:Request,res:Response,next:NextFunction)=>)

export default routes;
