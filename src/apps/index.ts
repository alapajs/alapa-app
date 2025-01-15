import { Router, Request, Response, Controller, Param } from "alapa";

const indexRoute = new Router();

indexRoute.get("/", async (req: Request, res: Response) => {
  res.render("index");
});

export class TestController extends Controller {
  getIndex(req: Request, res: Response) {
    res.send("Hello World");
  }
  @Param("id/edit")
  get_Index(req: Request, res: Response) {
    res.send("View");
  }
  postAbout(req: Request, res: Response) {
    res.send("About Page POST");
  }
  putAbout(req: Request, res: Response) {
    res.send("About Page PUT");
  }
  deleteAbout(req: Request, res: Response) {
    res.send("About Page DELETE");
  }
  patchAbout(req: Request, res: Response) {
    res.send("About Page PATCH");
  }
  headAbout(req: Request, res: Response) {
    res.send("About Page HEAD");
  }
  optionsAbout(req: Request, res: Response) {
    res.send("About Page OPTIONS");
  }
  getContactAbout(req: Request, res: Response) {
    res.send("Contact Page");
  }
}

export default indexRoute;
