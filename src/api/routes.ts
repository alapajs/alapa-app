import { Request, Router, Response } from "alapa";
import { Users } from "../models/user";
const apiRoutes = new Router();

apiRoutes.get("users", async (req: Request, res: Response) => {
  const users = Users.find();
  res.api({
    status: "success",
    data: users,
    message: "Users retrieved successfully",
  });
});

export default apiRoutes;
