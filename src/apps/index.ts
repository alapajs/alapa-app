import { Router, Request, Response } from "alapa";

const indexRoute = new Router();

indexRoute.get("/", async (req: Request, res: Response) => {
  res.render("index");
});

export default indexRoute;
