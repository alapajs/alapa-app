import { Controller, Request, Response, Params, RouteNameSuffix } from "alapa";

export class PostController extends Controller {
  // Handles GET /posts/:postId/active
  @Params("postId/active")
  get_Index(req: Request, res: Response) {
    res.send("Active posts");
  }

  // Handles GET /posts/:postId/draft
  @Params("postId/draft")
  get_Index_(req: Request, res: Response) {
    res.send("Draft posts");
  }

  // Handles GET /posts/:postId/trashed
  @RouteNameSuffix("trashed")
  @Params("postId/trashed")
  get___Index___(req: Request, res: Response) {
    res.send("Trashed posts");
  }
}
